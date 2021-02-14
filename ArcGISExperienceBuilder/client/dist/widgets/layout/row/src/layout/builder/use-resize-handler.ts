import { React, IMLayoutJson, LayoutItemJson } from 'jimu-core';
import { getAppConfigAction } from 'jimu-for-builder';
import { IMChildRect, TOTAL_COLS } from '../types';
import { resizeItem } from './utils';

export function useResizeHandler(ref: HTMLElement, layout: IMLayoutJson, flipLeftRight: boolean): {
  isResizing: boolean,
  resizingRects: IMChildRect[],
  onResizeStart: (id: string) => void,
  onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void,
  onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) => void,
} {
  const elementRef = React.useRef<HTMLElement>();
  const rectRef = React.useRef<ClientRect>();
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizingRects, setResizingRects] = React.useState(null);
  elementRef.current = ref;

  const onResizeStart = React.useCallback((id: string) => {
    rectRef.current = elementRef.current.getBoundingClientRect();
    setIsResizing(true);
  }, []);

  const onResizing = React.useCallback((id: string, x: number, y: number, dw: number, dh: number) => {
    const colWidth = rectRef.current.width / TOTAL_COLS;
    let deltaX = Math.round(x / colWidth);
    let deltaW = Math.round(dw / colWidth);

    if (flipLeftRight) {
      deltaX = -deltaX;
      deltaW = -deltaW;
    }

    const resizingRects = resizeItem(id, deltaX, deltaW, this.childRects);
    setResizingRects(resizingRects);
  }, []);

  const onResizeEnd = React.useCallback((id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) => {
    const colWidth = rectRef.current.width / TOTAL_COLS;
    let deltaX = Math.round(x / colWidth);
    let deltaW = Math.round(dw / colWidth);

    if (flipLeftRight) {
      deltaX = -deltaX;
      deltaW = -deltaW;
    }

    const appConfigAction = getAppConfigAction();
    const resizingRects = resizeItem(id, deltaX, deltaW, this.childRects);
    resizingRects.forEach((rectItem) => {
      const rect: any = {
        left: rectItem.left,
        width: rectItem.width,
        height: rectItem.id === id ? Math.round(rectItem.height + dh) : Math.round(rectItem.height),
      };
      appConfigAction.editLayoutItemBBox(
        {
          layoutId: layout.id,
          layoutItemId: rectItem.id,
        },
        rect,
      );
    });
    appConfigAction.exec();

    setIsResizing(false);
    setResizingRects(null);
  }, []);

  return {isResizing, resizingRects, onResizeStart, onResizing, onResizeEnd};
}