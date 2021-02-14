/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LayoutItemProps, ToolbarConfig } from 'jimu-layouts/layout-runtime';
interface ChildEmement {
    children?: Element | React.ReactNode;
}
export interface OwnProps {
    isBlock?: boolean;
    toolItems?: ToolbarConfig;
    contextMenuItems?: ToolbarConfig;
    isParentPlaying?: boolean;
    isParentRevert?: boolean;
    isParentEnableScroll?: boolean;
    parentAnimationStyle?: any;
    parentPlayId?: symbol;
}
export interface DragEventHandlers {
    restrict?: boolean;
    useDragHandler?: boolean;
    onDragStart?: (layoutItemId: string) => void;
    onDragging?: (layoutItemId: string, dx: number, dy: number) => void;
    onDragEnd?: (layoutItemId: string, dx: number, dy: number) => void;
}
export interface ResizeEventHandlers {
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    resizable?: boolean;
    keepAspectRatio?: boolean;
    aspectRatio?: number;
    onResizeStart?: (layoutItemId: string, initWidth: number, initHeight: number) => void;
    onResizing?: (layoutItemId: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
    onResizeEnd?: (layoutItemId: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
}
declare type LayoutItemInBuilderProps = LayoutItemProps & DragEventHandlers & ResizeEventHandlers & OwnProps;
export default function LayoutItemInBuilder(props: LayoutItemInBuilderProps & ChildEmement): JSX.Element;
export {};
