/** @jsx jsx */
import { React, css, jsx, classNames, IMSizeModeLayoutJson, LayoutItemConstructorProps, IMLayoutJson, polished } from 'jimu-core';
import { DropArea } from 'jimu-layouts/layout-builder';
import * as SVG from 'svg.js';
import { utils } from 'jimu-layouts/layout-runtime';
import { hooks } from 'jimu-ui';
import { calInsertPositionForRow, calInsertPositionForColumn, useInsertSyncWidgetToLayout } from '../utils';
import { BASE_LAYOUT_NAME } from '../../../common/consts';
const { useState, useRef, useEffect, forwardRef } = React;

export interface DropZoneProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'placeholder'> {
  widgetId: string;
  placeholder?: {
    color: string;
    size: number[]
  }
  vertical?: boolean;
  childClass: string;
  layout: IMLayoutJson;
  layouts: IMSizeModeLayoutJson;
}

const style = css`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: transparent;
    z-index: -1;
    > .drop-area {
      width: 100%;
      height: 100%;
    }
    > .overlay {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      background: transparent;
      z-index: -1;
      &.hide {
        display: none;
      }
    }
  `;

//Drag and insert a widget to the specified `layout`
export const DrapZone = forwardRef((props: DropZoneProps, ref) => {
  const { widgetId, layout, layouts, vertical, childClass, placeholder, className, ...others } = props;
  const { color, size: [long, short] } = placeholder;
  const nodeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVG.Doc>(null);
  const referenceIdRef = useRef<string>(null);
  const childRectsRef = useRef<Array<ClientRect & { id: string }>>(null);
  const overlayNodeRef = useRef<HTMLDivElement>(null);
  const dropAreaRef = useRef<SVG.Rect>(null);
  const [dragover, setDragover] = useState<boolean>(false);
  const handleRef = hooks.useForkRef(nodeRef, ref);

  useEffect(() => {
    overlayRef.current = SVG(overlayNodeRef.current);
  }, []);


  const collectBounds = () => {
    childRectsRef.current = [];

    const domRect: ClientRect | DOMRect = nodeRef.current.getBoundingClientRect();
    const children = nodeRef.current.parentNode.querySelectorAll(`.${childClass}`);

    if (children && children.length) {
      children.forEach((node) => {
        const itemId = node.getAttribute('data-layoutitemid');
        if (layout.order && layout.order.indexOf(itemId) >= 0) {
          const rect = utils.relativeClientRect(node.getBoundingClientRect(), domRect);
          rect.id = itemId;
          childRectsRef.current.push(rect);
        }
      });
    }

    if (!vertical) {
      childRectsRef.current.sort((a, b) => a.left - b.left);
    } else {
      childRectsRef.current.sort((a, b) => a.top - b.top);
    }
  }

  const toggleDragoverEffect = (value: boolean) => {
    if (value) {
      referenceIdRef.current = null;
      collectBounds();
    }
    setDragover(value);
  }

  const onDragOver = (_, __, containerRect: Partial<ClientRect>, itemRect: Partial<ClientRect>) => {
    let rect = itemRect;
    const childRects = childRectsRef.current;

    const height = nodeRef.current.offsetHeight;
    const width = nodeRef.current.offsetWidth;

    if (childRects && childRects.length) {
      if (!vertical) {
        const { insertX, refId } = calInsertPositionForRow(containerRect as ClientRect, rect, childRects);
        referenceIdRef.current = refId;
        rect = {
          left: insertX - short / 2 + nodeRef.current.scrollLeft,
          width: short,
          top: (height - long) / 2 + nodeRef.current.scrollTop,
          height: long,
        };
      } else {
        const { insertY, refId } = calInsertPositionForColumn(containerRect as ClientRect, rect, childRects);
        referenceIdRef.current = refId;
        rect = {
          top: insertY - long / 2 + nodeRef.current.scrollTop,
          width: long,
          left: (width - long) / 2 + nodeRef.current.scrollLeft,
          height: short,
        };
      }
    } else {
      if (!vertical) {
        rect = {
          left: containerRect.width / 2 - short / 2,
          width: short,
          top: (height - long) / 2 + nodeRef.current.scrollTop,
          height: long,
        };
      } else {
        rect = {
          top: containerRect.height / 2 - short / 2,
          width: long,
          left: short / 2,
          height: short,
        };
      }
    }

    if (!dropAreaRef.current) {
      dropAreaRef.current = overlayRef.current
        .rect(rect.width, rect.height)
        .fill(polished.rgba(color, 1))
        .stroke('none')
        .attr({
          x: rect.left,
          y: rect.top,
        });
    } else {
      dropAreaRef.current.move(rect.left, rect.top).size(rect.width, rect.height);
      if (!dropAreaRef.current.visible()) {
        dropAreaRef.current.show();
      }
    }
  }

  const insertSyncWidgetToLayout = useInsertSyncWidgetToLayout(widgetId, BASE_LAYOUT_NAME);

  const onDrop = (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect) => {
    if (dropAreaRef.current) {
      dropAreaRef.current.hide();
    }

    let insertIndex = 0;
    if (referenceIdRef.current) {
      insertIndex = (layout.order && layout.order.indexOf(referenceIdRef.current)) || 0;
    } else if (layout.order) {
      insertIndex = layout.order.length;
    }

    insertSyncWidgetToLayout(layout, draggingItem, containerRect, itemRect, insertIndex);

    referenceIdRef.current = null;
    childRectsRef.current = [];
  }


  return <div
    className={classNames('drop-zone', className)}
    ref={handleRef}
    {...others}
    css={style}>
    <DropArea
      style={style}
      className="drop-area"
      layouts={layouts}
      highlightDragover={true}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onToggleDragoverEffect={toggleDragoverEffect}
    />
    <div className={classNames('overlay', { hide: !dragover })} ref={overlayNodeRef} />
  </div>

})
