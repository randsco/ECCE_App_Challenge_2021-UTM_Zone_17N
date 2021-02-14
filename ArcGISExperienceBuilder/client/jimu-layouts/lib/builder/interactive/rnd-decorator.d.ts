/// <reference types="react" />
/** @jsx jsx */
import { React, IMLayoutItemJson, IMState } from 'jimu-core';
import { LayoutItemProps } from 'jimu-layouts/layout-runtime';
export interface RndOptions {
    layoutItem: IMLayoutItemJson;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    restrict?: boolean;
    gridSize?: number;
    useDragHandler?: boolean;
    forceAspectRatio?: boolean;
    aspectRatio?: number;
    style?: any;
    className?: any;
    onResizeStart?: (id: string, initWidth: number, initHeight: number) => void;
    onResizing?: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd?: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onDragStart?: (id: string) => void;
    onDragging?: (id: string, dx: number, dy: number) => void;
    onDragEnd?: (id: string, dx: number, dy: number) => void;
}
interface RndWrapperProps {
    isInlineEditing: boolean;
    supportRepeat: boolean;
    isLayoutWidget: boolean;
    selected: boolean;
}
export declare function mapStateToRndWrapperProps(state: IMState, ownProps: LayoutItemProps & RndOptions): RndWrapperProps;
export declare function withRnd(autoSelect?: boolean): (WrappedComponent: React.ComponentClass<LayoutItemProps & {
    disableResizing?: boolean;
    isDragging?: boolean;
    isResizing?: boolean;
}>) => React.ComponentClass<RndOptions & LayoutItemProps & {
    [x: string]: any;
    widgetId?: string;
}, any>;
export {};
