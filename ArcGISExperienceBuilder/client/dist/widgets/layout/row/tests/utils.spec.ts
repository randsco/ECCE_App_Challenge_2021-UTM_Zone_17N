/*eslint-disable camelcase, @typescript-eslint/naming-convention*/
import { resizeItem, insertItem, snapLeft } from '../src/layout/builder/utils';
import { ChildRect, TOTAL_COLS } from '../src/layout/types';
import { LayoutItemConstructorProps, WidgetType } from 'jimu-core';

jest.mock('jimu-core', () => {
  return {
    ...(jest.requireActual('jimu-core')),
    WidgetManager: {
      getInstance: () => {
        return {
          handleNewWidgetJson: widgetJson => Promise.resolve({
            ...widgetJson,
            manifest: {
              widgetType: WidgetType.Layout,
              properties: {
              },
              i18nMessages: {}
            },
            _originManifest: {},
          })
        }
      }
    },
    getAppStore: () => {
      return {
        getState: () => {
          return { browserSizeMode: 'LARGE' }
        }
      }
    }
  }
});

let rects: ChildRect[];

describe('Test snapLeft', () => {
  describe('empty rects', () => {
    beforeEach(() => {
      rects = [];
    });

    it('should not change the position', () => {
      const draggingItem = {
        layoutInfo: { layoutId: '0', layoutItemId: '0' }
      } as LayoutItemConstructorProps;
      let result = snapLeft('0', draggingItem, 4, 2, 5, rects);
      expect(result).toBe(4);

      result = snapLeft('0', draggingItem, 0, 5, 2, rects);
      expect(result).toBe(0);

      result = snapLeft('0', draggingItem, 9, 3, 11, rects);
      expect(result).toBe(9);
    });
  });

  describe('one item', () => {
    beforeEach(() => {
      rects = [
        {
          id: '1',
          left: 2,
          width: 4,
        },
      ];
    });

    it('should work if draggingItem is already in the layout', () => {
      const draggingItem = {
        layoutInfo: { layoutId: '0', layoutItemId: '1' }
      } as LayoutItemConstructorProps;
      let result = snapLeft('0', draggingItem, 1, 4, 1, rects);
      expect(result).toBe(1);
      result = snapLeft('0', draggingItem, 2, 4, 5, rects);
      expect(result).toBe(2);
      result = snapLeft('0', draggingItem, 6, 4, 8, rects);
      expect(result).toBe(6);
      result = snapLeft('0', draggingItem, 8, 4, 10, rects);
      expect(result).toBe(8);
    });

    it('should work if draggingItem is from another layout', () => {
      const draggingItem = {
        layoutInfo: { layoutId: '1', layoutItemId: '0' }
      } as LayoutItemConstructorProps;
      let result = snapLeft('0', draggingItem, 0, 2, 1, rects);
      expect(result).toBe(0);
      result = snapLeft('0', draggingItem, 1, 2, 1, rects);
      expect(result).toBe(0);
      result = snapLeft('0', draggingItem, 1, 3, 3, rects);
      expect(result).toBe(2);
      result = snapLeft('0', draggingItem, 1, 3, 2, rects);
      expect(result).toBe(2);
      result = snapLeft('0', draggingItem, 4, 4, 7, rects);
      expect(result).toBe(6);
      result = snapLeft('0', draggingItem, 4, 4, 5, rects);
      expect(result).toBe(6);
      result = snapLeft('0', draggingItem, 6, 4, 7, rects);
      expect(result).toBe(6);
    });
  });

  describe('case from use bug', () => {
    it('should snap to the available item', () => {
      const rects = [
        {
          id: '1',
          left: 0,
          width: 3,
        },
        {
          id: '2',
          left: 3,
          width: 6,
        },
        {
          id: '3',
          left: 6,
          width: 9,
        },
      ];
      const draggingItem = {
        layoutInfo: { layoutId: '0', layoutItemId: '2' }
      } as LayoutItemConstructorProps;
      const result = snapLeft('0', draggingItem, 4, 3, 6, rects);
      expect(result).toBe(6);
    })
  });

  describe('multiple items', () => {
    beforeEach(() => {
      rects = [
        {
          id: '1',
          left: 1,
          width: 1,
        },
        {
          id: '2',
          left: 4,
          width: 3,
        },
        {
          id: '3',
          left: 8,
          width: 2,
        },
        {
          id: '4',
          left: 11,
          width: 1,
        },
      ];
    });

    it('should work if draggingItem is already in the layout', () => {
      const draggingItem = {
        layoutInfo: { layoutId: '0', layoutItemId: '2' }
      } as LayoutItemConstructorProps;
      let result = snapLeft('0', draggingItem, 0, 3, 0, rects);
      expect(result).toBe(0);
      result = snapLeft('0', draggingItem, 0, 3, 1, rects);
      expect(result).toBe(1);
      result = snapLeft('0', draggingItem, 3, 3, 4, rects);
      expect(result).toBe(3);
      result = snapLeft('0', draggingItem, 6, 3, 7, rects);
      expect(result).toBe(5);
      result = snapLeft('0', draggingItem, 9, 3, 9, rects);
      expect(result).toBe(10);
      result = snapLeft('0', draggingItem, 9, 3, 10, rects);
      expect(result).toBe(10);
      result = snapLeft('0', draggingItem, 9, 3, 11, rects);
      expect(result).toBe(10);
    });

    it('should work if draggingItem is from another layout', () => {
      rects = [
        {
          id: '1',
          left: 0,
          width: 2,
        },
        {
          id: '2',
          left: 2,
          width: 5,
        },
        {
          id: '3',
          left: 7,
          width: 4,
        },
      ];
      const draggingItem = {
        layoutInfo: { layoutId: '1', layoutItemId: '2' }
      } as LayoutItemConstructorProps;
      let result = snapLeft('0', draggingItem, 0, 3, 0, rects);
      expect(result).toBe(0);
      result = snapLeft('0', draggingItem, 0, 3, 1, rects);
      expect(result).toBe(2);
      result = snapLeft('0', draggingItem, 1, 3, 2, rects);
      expect(result).toBe(2);
      result = snapLeft('0', draggingItem, 2, 3, 4, rects);
      expect(result).toBe(2);
      result = snapLeft('0', draggingItem, 3, 3, 5, rects);
      expect(result).toBe(7);
      result = snapLeft('0', draggingItem, 6, 3, 7, rects);
      expect(result).toBe(7);
      result = snapLeft('0', draggingItem, 9, 3, 10, rects);
      expect(result).toBe(11);
    });

    it('should work if draggingItem is in layout', () => {
      rects = [
        {
          id: '1',
          left: 0,
          width: 3,
        },
        {
          id: '2',
          left: 4,
          width: 2,
        },
        {
          id: '3',
          left: 8,
          width: 3,
        },
      ];
      const draggingItem = {
        layoutInfo: { layoutId: '0', layoutItemId: '3' }
      } as LayoutItemConstructorProps;
      let result = snapLeft('0', draggingItem, 3, 3, 4, rects);
      expect(result).toBe(4);
      result = snapLeft('0', draggingItem, 3, 3, 5, rects);
      expect(result).toBe(6);
    });

    it('should work if draggingItem is in layout 2', () => {
      rects = [
        {
          id: '1',
          left: 0,
          width: 3,
        },
        {
          id: '2',
          left: 4,
          width: 2,
        },
        {
          id: '3',
          left: 6,
          width: 3,
        },
      ];
      const draggingItem = {
        layoutInfo: { layoutId: '0', layoutItemId: '3' }
      } as LayoutItemConstructorProps;
      const result = snapLeft('0', draggingItem, 4, 3, 5, rects);
      expect(result).toBe(6);
    });
  });
});

describe('Test resize item', () => {
  describe('one item', () => {
    beforeEach(() => {
      rects = [
        {
          id: '1',
          left: 2,
          width: 4,
        },
      ];
    });

    it('should not exceed left side', () => {
      const result = resizeItem('1', -4, 0, rects);
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(6);
    });

    it('should be >= 1', () => {
      const result = resizeItem('1', 4, 0, rects);
      expect(result[0].left).toBe(5);
      expect(result[0].width).toBe(1);
    });

    it('should work if resize at left to increase', () => {
      const result = resizeItem('1', -1, 0, rects);
      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(5);
    });

    it('should work if resize at left to decrease', () => {
      const result = resizeItem('1', 2, 0, rects);
      expect(result[0].left).toBe(4);
      expect(result[0].width).toBe(2);
    });

    it('should not exceed right side', () => {
      const result = resizeItem('1', 0, 8, rects);
      expect(result[0].left).toBe(2);
      expect(result[0].width).toBe(TOTAL_COLS - 2);
    });

    it('should work if resize at right to increase', () => {
      const result = resizeItem('1', 0, 3, rects);
      expect(result[0].left).toBe(2);
      expect(result[0].width).toBe(7);
    });

    it('should work if resize at right to decrease', () => {
      const result = resizeItem('1', 0, -2, rects);
      expect(result[0].left).toBe(2);
      expect(result[0].width).toBe(2);
    });

    it('should >= 1 if resize at right to decrease', () => {
      const result = resizeItem('1', 0, -5, rects);
      expect(result[0].left).toBe(2);
      expect(result[0].width).toBe(1);
    });
  });

  describe('multiple items', () => {
    beforeEach(() => {
      rects = [
        {
          id: '1',
          left: 1,
          width: 1,
        },
        {
          id: '2',
          left: 4,
          width: 3,
        },
        {
          id: '3',
          left: 8,
          width: 2,
        },
        {
          id: '4',
          left: 11,
          width: 1,
        },
      ];
    });

    it('should not exceed left side', () => {
      const result = resizeItem('1', -4, 0, rects);
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(2);
    });

    it('should be >= 1', () => {
      const result = resizeItem('1', 4, 0, rects);
      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(1);
    });

    it('should use gaps', () => {
      const result = resizeItem('2', -2, 0, rects);

      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(1);

      expect(result[1].left).toBe(2);
      expect(result[1].width).toBe(5);
    });

    it('should use all gaps', () => {
      const result = resizeItem('2', -3, 0, rects);

      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(1);

      expect(result[1].left).toBe(1);
      expect(result[1].width).toBe(6);
    });

    it('should use all gaps, dont exceed boundary', () => {
      const result = resizeItem('2', -4, 0, rects);

      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(1);

      expect(result[1].left).toBe(1);
      expect(result[1].width).toBe(6);
    });

    it('should use gaps 2', () => {
      const result = resizeItem('3', -3, 0, rects);

      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(1);

      expect(result[1].left).toBe(2);
      expect(result[1].width).toBe(3);

      expect(result[2].left).toBe(5);
      expect(result[2].width).toBe(5);
    });

    it('should use all gaps 2', () => {
      const result = resizeItem('3', -4, 0, rects);

      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(1);

      expect(result[1].left).toBe(1);
      expect(result[1].width).toBe(3);

      expect(result[2].left).toBe(4);
      expect(result[2].width).toBe(6);
    });

    it('should compact previous item', () => {
      const result = resizeItem('3', -5, 0, rects);

      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(1);

      expect(result[1].left).toBe(1);
      expect(result[1].width).toBe(2);

      expect(result[2].left).toBe(3);
      expect(result[2].width).toBe(7);
    });

    it('should compact previous item, but remain its min size', () => {
      const result = resizeItem('3', -6, 0, rects);

      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(1);

      expect(result[1].left).toBe(1);
      expect(result[1].width).toBe(2);

      expect(result[2].left).toBe(3);
      expect(result[2].width).toBe(7);
    });

    it('should increase normal at right side', () => {
      const result = resizeItem('2', 0, 1, rects);

      expect(result[1].left).toBe(4);
      expect(result[1].width).toBe(4);
    });

    it('should decrease normal at right side', () => {
      const result = resizeItem('2', 0, -2, rects);

      expect(result[1].left).toBe(4);
      expect(result[1].width).toBe(1);
    });

    it('should decrease normal at right side, but remain its min size', () => {
      const result = resizeItem('2', 0, -3, rects);

      expect(result[1].left).toBe(4);
      expect(result[1].width).toBe(1);
    });

    it('should use following gaps', () => {
      const result = resizeItem('2', 0, 2, rects);

      expect(result[1].left).toBe(4);
      expect(result[1].width).toBe(5);

      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should use following gaps 2', () => {
      const result = resizeItem('2', 0, 3, rects);

      expect(result[1].left).toBe(4);
      expect(result[1].width).toBe(5);

      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should use following gaps 3', () => {
      const result = resizeItem('1', 0, 4, rects);

      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(5);

      expect(result[1].left).toBe(6);
      expect(result[1].width).toBe(3);

      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should compact following items', () => {
      const result = resizeItem('1', 0, 5, rects);

      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(6);

      expect(result[1].left).toBe(7);
      expect(result[1].width).toBe(2);

      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });
  });
});

describe('Test insert item', () => {
  describe('empty layout', () => {
    it('should assign left property properly', () => {
      const result = insertItem(
        {
          id: '1',
          width: 5,
        },
        1,
        [],
      );
      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(5);
    });

    it('should not exceed right boundary', () => {
      const result = insertItem(
        {
          id: '1',
          width: 5,
        },
        8,
        [],
      );
      expect(result[0].left).toBe(8);
      expect(result[0].width).toBe(4);
    });

    it('should not exceed left boundary', () => {
      const result = insertItem(
        {
          id: '1',
          width: 5,
        },
        -4,
        [],
      );
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(5);
    });
  });

  describe('bug cases', () => {
    it('1', () => {
      const rects = [{
        id: '1',
        left: 0,
        width: 3,
      }, {
        id: '2',
        left: 6,
        width: 3,
      }];
      const result = insertItem(
        {
          id: '4',
          width: 3,
        },
        6,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(3);

      expect(result[1].id).toBe('4');
      expect(result[1].left).toBe(3);
      expect(result[1].width).toBe(3);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(6);
      expect(result[2].width).toBe(3);
    });

    it('2', () => {
      const rects = [{
        id: '1',
        left: 0,
        width: 3,
      }, {
        id: '2',
        left: 7,
        width: 3,
      }];
      const result = insertItem(
        {
          id: '4',
          width: 3,
        },
        10,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(3);

      expect(result[1].id).toBe('2');
      expect(result[1].left).toBe(6);
      expect(result[1].width).toBe(3);

      expect(result[2].id).toBe('4');
      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(3);
    });

    it('should move the right most element', () => {
      const rects = [{
        id: '1',
        left: 0,
        width: 3,
      }, {
        id: '2',
        left: 9,
        width: 3,
      }];
      const result = insertItem(
        {
          id: '4',
          width: 3,
        },
        11,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(3);

      expect(result[1].id).toBe('2');
      expect(result[1].left).toBe(6);
      expect(result[1].width).toBe(3);

      expect(result[2].id).toBe('4');
      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(3);
    });
  });

  describe('enough space to insert', () => {
    let rects: ChildRect[];

    beforeEach(() => {
      rects = [{
        id: '1',
        left: 0,
        width: 2,
      }, {
        id: '2',
        left: 5,
        width: 1,
      }, {
        id: '3',
        left: 9,
        width: 2,
      }];
    });

    it('should use space', () => {
      const result = insertItem(
        {
          id: '4',
          width: 2,
        },
        2,
        rects,
      );
      expect(result[1].id).toBe('4');
      expect(result[1].left).toBe(2);
      expect(result[1].width).toBe(2);
    });

    it('should use space 2', () => {
      const result = insertItem(
        {
          id: '4',
          width: 2,
        },
        3,
        rects,
      );
      expect(result[1].id).toBe('4');
      expect(result[1].left).toBe(3);
      expect(result[1].width).toBe(2);
    });

    it('should use space 3', () => {
      const result = insertItem(
        {
          id: '4',
          width: 3,
        },
        6,
        rects,
      );
      expect(result[2].id).toBe('4');
      expect(result[2].left).toBe(6);
      expect(result[2].width).toBe(3);
    });

    it('should use space 4', () => {
      const eRects = [{
        id: '1',
        left: 6,
        width: 4,
      }];
      const result = insertItem(
        {
          id: '4',
          width: 6,
        },
        6,
        eRects,
      );
      expect(result[0].id).toBe('4');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(6);
    });
  });

  describe('take gaps', () => {
    let rects: ChildRect[];

    beforeEach(() => {
      rects = [{
        id: '1',
        left: 1,
        width: 3,
      }, {
        id: '2',
        left: 6,
        width: 2,
      }, {
        id: '3',
        left: 10,
        width: 1,
      }];
    });

    it('should use following gap, insert at start', () => {
      const result = insertItem(
        {
          id: '4',
          width: 2,
        },
        0,
        rects,
      );
      expect(result[0].id).toBe('4');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(2);

      expect(result[1].id).toBe('1');
      expect(result[1].left).toBe(2);
      expect(result[1].width).toBe(3);
    });

    it('should use following gap, insert at start 2', () => {
      const result = insertItem(
        {
          id: '4',
          width: 4,
        },
        0,
        rects,
      );
      expect(result[0].id).toBe('4');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(4);

      expect(result[1].id).toBe('1');
      expect(result[1].left).toBe(4);
      expect(result[1].width).toBe(3);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(7);
      expect(result[2].width).toBe(2);
    });

    it('should use following gap, insert at start 3', () => {
      const result = insertItem(
        {
          id: '4',
          width: 6,
        },
        0,
        rects,
      );
      expect(result[0].id).toBe('4');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(6);

      expect(result[1].id).toBe('1');
      expect(result[1].left).toBe(6);
      expect(result[1].width).toBe(3);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].id).toBe('3');
      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should use following gap, insert at center', () => {
      const result = insertItem(
        {
          id: '4',
          width: 3,
        },
        5,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(3);

      expect(result[1].id).toBe('4');
      expect(result[1].left).toBe(5);
      expect(result[1].width).toBe(3);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(8);
      expect(result[2].width).toBe(2);

      expect(result[3].id).toBe('3');
      expect(result[3].left).toBe(10);
      expect(result[3].width).toBe(1);
    });

    it('should use following gap, insert at center 2', () => {
      const result = insertItem(
        {
          id: '4',
          width: 4,
        },
        5,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(3);

      expect(result[1].id).toBe('4');
      expect(result[1].left).toBe(5);
      expect(result[1].width).toBe(4);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].id).toBe('3');
      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should use previous gap, if following gap is not enough', () => {
      const result = insertItem(
        {
          id: '4',
          width: 5,
        },
        5,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(1);
      expect(result[0].width).toBe(3);

      expect(result[1].id).toBe('4');
      expect(result[1].left).toBe(4);
      expect(result[1].width).toBe(5);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].id).toBe('3');
      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should use previous gap, if following gap is not enough', () => {
      const result = insertItem(
        {
          id: '4',
          width: 6,
        },
        5,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(3);

      expect(result[1].id).toBe('4');
      expect(result[1].left).toBe(3);
      expect(result[1].width).toBe(6);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].id).toBe('3');
      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should decrease width, if gaps are greater or equal to min span', () => {
      const result = insertItem(
        {
          id: '3',
          width: 4,
        },
        5,
        [{
          id: '1',
          left: 1,
          width: 4,
        }, {
          id: '2',
          left: 5,
          width: 6,
        }],
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(4);

      expect(result[1].id).toBe('3');
      expect(result[1].left).toBe(4);
      expect(result[1].width).toBe(2);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(6);
      expect(result[2].width).toBe(6);
    });
  });

  describe('compact items', () => {
    let rects: ChildRect[];

    beforeEach(() => {
      rects = [{
        id: '1',
        left: 0,
        width: 6,
      }, {
        id: '2',
        left: 7,
        width: 4,
      }, {
        id: '3',
        left: 11,
        width: 1,
      }];
    });

    it('should compact following item', () => {
      const result = insertItem(
        {
          id: '4',
          width: 4,
        },
        6,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(6);

      expect(result[1].id).toBe('4');
      expect(result[1].left).toBe(6);
      expect(result[1].width).toBe(2);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(8);
      expect(result[2].width).toBe(3);

      expect(result[3].id).toBe('3');
      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should compact following item 2', () => {
      const result = insertItem(
        {
          id: '4',
          width: 4,
        },
        0,
        rects,
      );
      expect(result[0].id).toBe('4');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(2);

      expect(result[1].id).toBe('1');
      expect(result[1].left).toBe(2);
      expect(result[1].width).toBe(5);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(7);
      expect(result[2].width).toBe(4);

      expect(result[3].id).toBe('3');
      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should compact previous item', () => {
      const result = insertItem(
        {
          id: '4',
          width: 4,
        },
        11,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(6);

      expect(result[1].id).toBe('2');
      expect(result[1].left).toBe(6);
      expect(result[1].width).toBe(3);

      expect(result[2].id).toBe('4');
      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(2);

      expect(result[3].id).toBe('3');
      expect(result[3].left).toBe(11);
      expect(result[3].width).toBe(1);
    });

    it('should compact previous item', () => {
      const result = insertItem(
        {
          id: '4',
          width: 4,
        },
        12,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(6);

      expect(result[1].id).toBe('2');
      expect(result[1].left).toBe(6);
      expect(result[1].width).toBe(3);

      expect(result[2].id).toBe('3');
      expect(result[2].left).toBe(9);
      expect(result[2].width).toBe(1);

      expect(result[3].id).toBe('4');
      expect(result[3].left).toBe(10);
      expect(result[3].width).toBe(2);
    });
  });

  describe('compact items, full size', () => {
    let rects: ChildRect[];

    beforeEach(() => {
      rects = [{
        id: '1',
        left: 0,
        width: 6,
      }, {
        id: '2',
        left: 6,
        width: 3,
      }, {
        id: '3',
        left: 9,
        width: 2,
      }, {
        id: '4',
        left: 11,
        width: 1,
      }];
    });

    it('should compact nearby item', () => {
      const result = insertItem(
        {
          id: '5',
          width: 4,
        },
        0,
        rects,
      );
      expect(result[0].id).toBe('5');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(2);

      expect(result[1].id).toBe('1');
      expect(result[1].left).toBe(2);
      expect(result[1].width).toBe(4);
    });

    it('should compact nearby item 2', () => {
      const result = insertItem(
        {
          id: '5',
          width: 4,
        },
        6,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(5);

      expect(result[1].id).toBe('5');
      expect(result[1].left).toBe(5);
      expect(result[1].width).toBe(2);

      expect(result[2].id).toBe('2');
      expect(result[2].left).toBe(7);
      expect(result[2].width).toBe(2);
    });

    it('should compact nearby item 3', () => {
      const result = insertItem(
        {
          id: '5',
          width: 4,
        },
        9,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(5);

      expect(result[1].id).toBe('2');
      expect(result[1].left).toBe(5);
      expect(result[1].width).toBe(2);

      expect(result[2].id).toBe('5');
      expect(result[2].left).toBe(7);
      expect(result[2].width).toBe(2);
    });

    it('should compact nearby item 4', () => {
      const result = insertItem(
        {
          id: '5',
          width: 4,
        },
        12,
        rects,
      );
      expect(result[0].id).toBe('1');
      expect(result[0].left).toBe(0);
      expect(result[0].width).toBe(5);

      expect(result[1].id).toBe('2');
      expect(result[1].left).toBe(5);
      expect(result[1].width).toBe(2);

      expect(result[2].id).toBe('3');
      expect(result[2].left).toBe(7);
      expect(result[2].width).toBe(2);

      expect(result[3].id).toBe('4');
      expect(result[3].left).toBe(9);
      expect(result[3].width).toBe(1);

      expect(result[4].id).toBe('5');
      expect(result[4].left).toBe(10);
      expect(result[4].width).toBe(2);
    });
  });

  describe('unable to insert', () => {
    let rects: ChildRect[];

    beforeEach(() => {
      rects = [{
        id: '1',
        left: 0,
        width: 2,
      }, {
        id: '2',
        left: 2,
        width: 1,
      }, {
        id: '3',
        left: 3,
        width: 2,
      }, {
        id: '4',
        left: 5,
        width: 2,
      }, {
        id: '5',
        left: 7,
        width: 2,
      }, {
        id: '6',
        left: 9,
        width: 1,
      }, {
        id: '7',
        left: 10,
        width: 2,
      }];
    });

    it('should not insert', () => {
      const result = insertItem(
        {
          id: '8',
          width: 4,
        },
        0,
        rects,
      );
      expect(result.length).toBe(7);
    });
  });
});
