/* eslint-disable prefer-const */
import {
  Immutable,
  LayoutItemConstructorProps,
  LayoutInfo,
} from 'jimu-core';
import { MIN_SPAN, TOTAL_COLS, ChildRect, IMChildRect } from '../types';

export function canDrop(rects: IMChildRect[]): boolean {
  let used = 0;
  let bigItems = 0;

  rects.forEach(item => {
    used += item.width;
    if (item.width >= 3) {
      bigItems += 1;
    }
  });

  return TOTAL_COLS - used >= MIN_SPAN || bigItems >= TOTAL_COLS - used;
}

function indexOfChildRect(id: string, rects: IMChildRect[]): number {
  let index = -1;
  rects.some((item, idx) => {
    if (item.id === id) {
      index = idx;
      return true;
    }
  });
  return index;
}

/**
 * Calculate the insert position using current mouse position
 * @param droppableLayoutId layoutId of the container
 * @param draggingItem
 * @param itemLeft column index of the item
 * @param itemWidth num of columns
 * @param value column index of the mouse
 * @param allRects
 */
export function snapLeft(
  droppableLayoutId: string,
  draggingItem: LayoutItemConstructorProps,
  itemLeft: number,
  itemWidth: number,
  value: number,   // cursor left
  allRects: ChildRect[]
) {
  let left;
  const layoutInfo = draggingItem.layoutInfo || ({} as LayoutInfo);
  const sameLayout = layoutInfo.layoutId === droppableLayoutId;
  const conflict = allRects.some(cItem => {
    if (sameLayout && cItem.id === layoutInfo.layoutItemId) {
      return false;
    }
    return (
      (cItem.left >= itemLeft && cItem.left < itemLeft + itemWidth) ||
      (itemLeft >= cItem.left && itemLeft < cItem.left + cItem.width)
    );
  });
  if (!conflict) { // enough space
    return itemLeft;
  }
  allRects.some((cItem, index) => {
    if (sameLayout && cItem.id === layoutInfo.layoutItemId) {
      return false;
    }
    const mouseInCItem = value >= cItem.left && value <= cItem.left + cItem.width;

    if (mouseInCItem) {
      if (value >= cItem.left && value < cItem.left + cItem.width / 2) {
        left = cItem.left;
        return true;
      } else {
        left = cItem.left + cItem.width;
        return true;
      }
    } else {
      // there must be an item that interact with dragging item
      if (itemLeft < cItem.left && itemLeft + itemWidth > cItem.left) {
        let available = 0;
        if (index === 0) {
          available = cItem.left;
        } else {
          let previousItem;
          for (let j = index - 1; j >= 0; j -= 1) {
            previousItem = allRects[j];
            if (!sameLayout || previousItem.id !== layoutInfo.layoutItemId) {
              break;
            }
          }
          if (previousItem) {
            available = cItem.left - (previousItem.left + previousItem.width);
          } else {
            available = cItem.left;
          }
        }
        if (available >= itemWidth) {
          left = cItem.left - itemWidth;
        } else {
          left = cItem.left - available;
        }
        return true;
      }
      if (itemLeft > cItem.left && itemLeft < cItem.left + cItem.width) {
        left = cItem.left + cItem.width;
        return true;
      }
    }
  });
  return left;
}

/**
 *
 * @param id id of the item being resized
 * @param dx num of columns resized at the left side
 * @param dw num of columns resized at the right side
 * @param rects all row items' position and size
 */
// TODO use Immutable IMChildRect
export function resizeItem(id: string, dx: number, dw: number, allRects: ChildRect[]): IMChildRect[] {
  const rects = allRects.map(item => Immutable(item));
  const index = indexOfChildRect(id, rects);

  if (dx > 0) {
    // resize at the left side, decrease width
    const target = rects[index];
    const delta = Math.min(dx, target.width - 1);
    rects[index] = target.set('left', target.left + delta).set('width', target.width - delta);
    return rects;
  }
  if (dx < 0) {
    // resize at the left side, increase width
    let previousSize = 0;
    for (let i = 0; i < index; i += 1) {
      previousSize += Math.min(rects[i].width, MIN_SPAN);
    }
    const totalAvailable = rects[index].left - previousSize;
    const toExpand = Math.abs(dx);

    if (totalAvailable > 0) {
      let expanded = 0;
      // 1. use gaps available
      for (let i = index; i >= 0; i -= 1) {
        const current = rects[i];
        let gap = 0;
        if (i > 0) {
          const previous = rects[i - 1];
          gap = current.left - (previous.left + previous.width);
        } else {
          gap = current.left;
        }
        if (gap === 0) {
          continue;
        }
        const toMove = expanded + gap >= toExpand ? toExpand - expanded : gap;
        rects[index] = rects[index].set('width', rects[index].width + toMove);
        for (let j = i; j <= index; j += 1) {
          rects[j] = rects[j].set('left', rects[j].left - toMove);
        }

        if (expanded + gap >= toExpand) {
          return rects;
        }
        expanded += gap;
      }

      // 2. compact previous items
      if (index > 0) {
        for (let i = index - 1; i >= 0; i -= 1) {
          const current = rects[i];
          const gap = current.width - MIN_SPAN;
          if (gap <= 0) {
            continue;
          }
          const toMove = expanded + gap >= toExpand ? toExpand - expanded : gap;
          rects[index] = rects[index].set('width', rects[index].width + toMove);
          rects[i] = current.set('width', current.width - toMove);
          for (let j = i + 1; j <= index; j += 1) {
            rects[j] = rects[j].set('left', rects[j].left - toMove);
          }

          if (expanded + gap >= toExpand) {
            return rects;
          }
          expanded += gap;
        }
      }
    }
    return rects;
  }

  if (dw < 0) {
    // resize at the right side, decrease width
    const delta = Math.min(Math.abs(dw), rects[index].width - 1);
    rects[index] = rects[index].set('width', rects[index].width - delta);
    return rects;
  }

  if (dw > 0) {
    // resize at the right side, increase width
    let nextSize = 0;
    for (let i = index + 1; i < rects.length; i += 1) {
      nextSize += Math.min(rects[i].width, MIN_SPAN);
    }
    const totalAvailable = TOTAL_COLS - (rects[index].left + rects[index].width) - nextSize;
    const toExpand = dw;

    if (totalAvailable > 0) {
      let expanded = 0;
      // 1. use gaps available
      for (let i = index; i < rects.length; i += 1) {
        const current = rects[i];
        let gap = 0;
        if (i !== rects.length - 1) {
          const next = rects[i + 1];
          gap = next.left - (current.left + current.width);
        } else {
          gap = TOTAL_COLS - (current.left + current.width);
        }
        if (gap === 0) {
          continue;
        }
        const toMove = expanded + gap >= toExpand ? toExpand - expanded : gap;
        rects[index] = rects[index].set('width', rects[index].width + toMove);
        for (let j = index + 1; j <= i; j += 1) {
          rects[j] = rects[j].set('left', rects[j].left + toMove);
        }

        if (expanded + gap >= toExpand) {
          return rects;
        }
        expanded += gap;
      }

      // 2. compact following items
      if (index !== rects.length - 1) {
        for (let i = index + 1; i < rects.length; i += 1) {
          const current = rects[i];
          const gap = current.width - MIN_SPAN;
          if (gap <= 0) {
            continue;
          }
          const toMove = expanded + gap >= toExpand ? toExpand - expanded : gap;
          rects[index] = rects[index].set('width', rects[index].width + toMove);
          rects[i] = current.set('width', current.width - toMove);
          for (let j = index + 1; j <= i; j += 1) {
            rects[j] = rects[j].set('left', rects[j].left + toMove);
          }

          if (expanded + gap >= toExpand) {
            return rects;
          }
          expanded += gap;
        }
      }
    }
    return rects;
  }

  return rects;
}

/**
 * @param id id of the item being moved
 * @param x position to move
 * @param rects all row items' position and size
 */
export function moveItem(id: string, x: number, allRects: ChildRect[]): IMChildRect[] {
  const rects = allRects.map(item => Immutable(item));
  const index = indexOfChildRect(id, rects);
  const target = rects[index];

  rects.splice(index, 1); // clear the space taken by target item
  return insertItem(target, x, rects);
}

export function insertItem(rect: ChildRect, pos: number, allRects: ChildRect[]): IMChildRect[] {
  const rects = allRects.map(item => Immutable(item));
  let target = Immutable(rect);
  const x = Math.max(pos, 0);
  target = target.set('left', x);
  if (!rects || rects.length === 0) {
    target = target.set('width', Math.min(target.width, TOTAL_COLS - target.left));
    return [target];
  }

  let insertIndex = rects.length; // rect index that target will insert before
  let end; // the right most column
  const checkpoint = () => {
    if (insertIndex === 0) {
      used = rects[insertIndex].left;
      end = used;
    } else {
      const previous = rects[insertIndex - 1];
      used =
        insertIndex < rects.length
          ? rects[insertIndex].left - (previous.left + previous.width)
          : TOTAL_COLS - (previous.left + previous.width);
      end = previous.left + previous.width + used;
    }
  };

  rects.some((r, index) => {
    if (x <= r.left) {
      insertIndex = index;
      return true;
    }
  });
  let used = insertIndex < rects.length ? rects[insertIndex].left - x : TOTAL_COLS - x;

  if (used >= target.width) {
    rects.splice(insertIndex, 0, target);
    return rects;
  }

  // 0. Is there enough space before the insert pos
  const oldUsed = used;
  checkpoint();
  if (used >= target.width) {
    target = target.set('left', end - target.width);
    rects.splice(insertIndex, 0, target);
    return rects;
  }
  used = oldUsed;

  // 1. take the following gaps
  for (let i = insertIndex; i < rects.length; i += 1) {
    const current = rects[i];
    let gap = 0;
    if (i !== rects.length - 1) {
      const next = rects[i + 1];
      gap = next.left - (current.left + current.width);
    } else {
      gap = TOTAL_COLS - (current.left + current.width);
    }
    if (gap === 0) {
      continue;
    }
    const toMove = used + gap >= target.width ? target.width - used : gap;

    for (let j = insertIndex; j <= i; j += 1) {
      rects[j] = rects[j].set('left', rects[j].left + toMove);
    }

    if (used + gap >= target.width) {
      rects.splice(insertIndex, 0, target);
      return rects;
    }
    used += gap;
  }
  // check gaps
  checkpoint();

  if (used >= target.width) {
    target = target.set('left', end - target.width);
    rects.splice(insertIndex, 0, target);
    return rects;
  }

  // 2. take the previous gaps
  for (let i = insertIndex - 1; i >= 0; i -= 1) {
    const current = rects[i];
    let gap = 0;
    if (i > 0) {
      const previous = rects[i - 1];
      gap = current.left - (previous.left + previous.width);
    } else {
      gap = current.left;
    }
    if (gap === 0) {
      continue;
    }
    const toMove = used + gap >= target.width ? target.width - used : gap;

    for (let j = i; j <= insertIndex - 1; j += 1) {
      rects[j] = rects[j].set('left', rects[j].left - toMove);
    }

    if (used + gap >= target.width) {
      target = target.set('left', end - target.width);
      rects.splice(insertIndex, 0, target);
      return rects;
    }
    used += gap;
  }

  // check gaps
  checkpoint();

  if (used >= MIN_SPAN) {
    target = target.set('left', end - used).set('width', used);
    rects.splice(insertIndex, 0, target);
    return rects;
  }

  // 3. gaps is not enough for the target rect, compact following items
  if (insertIndex !== rects.length) {
    for (let i = insertIndex; i < rects.length; i += 1) {
      const current = rects[i];
      const gap = current.width - MIN_SPAN;
      if (gap <= 0) {
        continue;
      }
      const toMove = used + gap >= MIN_SPAN ? MIN_SPAN - used : gap;
      rects[i] = current.set('width', current.width - toMove);
      for (let j = insertIndex; j <= i; j += 1) {
        rects[j] = rects[j].set('left', rects[j].left + toMove);
      }

      if (used + gap >= MIN_SPAN) {
        target = target.set('left', rects[insertIndex].left - MIN_SPAN).set('width', MIN_SPAN);
        rects.splice(insertIndex, 0, target);
        return rects;
      }
      used += gap;
    }
  }

  // check gaps
  checkpoint();

  if (used >= MIN_SPAN) {
    target = target.set('left', end - used).set('width', used);
    rects.splice(insertIndex, 0, target);
    return rects;
  }

  // 4. compact previous items
  for (let i = insertIndex - 1; i >= 0; i -= 1) {
    const current = rects[i];
    const gap = current.width - MIN_SPAN;
    if (gap <= 0) {
      continue;
    }
    const toMove = used + gap >= MIN_SPAN ? MIN_SPAN - used : gap;
    rects[i] = current.set('width', current.width - toMove);
    for (let j = i + 1; j <= insertIndex - 1; j += 1) {
      rects[j] = rects[j].set('left', rects[j].left - toMove);
    }

    if (used + gap >= MIN_SPAN) {
      target = target.set('left', end - MIN_SPAN).set('width', MIN_SPAN);
      rects.splice(insertIndex, 0, target);
      return rects;
    }
    used += gap;
  }

  return rects;
}
