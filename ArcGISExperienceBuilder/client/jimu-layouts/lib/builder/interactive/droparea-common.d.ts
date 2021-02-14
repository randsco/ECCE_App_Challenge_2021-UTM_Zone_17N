/// <reference types="react" />
import { IMSizeModeLayoutJson, LayoutItemConstructorProps } from 'jimu-core';
import { LayoutContextProps, PageContextProps } from 'jimu-layouts/layout-runtime';
export interface DropAreaContext {
    props: DropAreaProps;
    layoutId: string;
    pageContext: PageContextProps;
    layoutContext: LayoutContextProps;
}
export interface DropAreaProps {
    layouts: IMSizeModeLayoutJson;
    isPlaceholder?: boolean;
    highlightDragover?: boolean;
    className?: string;
    style?: any;
    isRepeat?: boolean;
    children?: React.ReactNode;
    onToggleDragoverEffect?: (isDragover: boolean, draggingItem?: LayoutItemConstructorProps) => void;
    onDragEnter?: (draggingItem: LayoutItemConstructorProps) => void;
    onDragOver?: (draggingItem: LayoutItemConstructorProps, draggingElement: HTMLElement, containerRect: ClientRect, itemRect: ClientRect, clientX: number, clientY: number) => void;
    onDragLeave?: (draggingItem: LayoutItemConstructorProps) => void;
    onDrop?: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, clientX: number, clientY: number) => void;
}
export declare function createItemFromInteractEvent(dragElement: HTMLElement): LayoutItemConstructorProps;
export declare function createItemFromLayoutInfo(layoutId: any, layoutItemId: any): LayoutItemConstructorProps;
export declare function createItemFromH5DragEvent(): LayoutItemConstructorProps;
export declare function isDraggingItemAccepted(draggingItem: LayoutItemConstructorProps, layoutContext: LayoutContextProps, props: DropAreaProps, layoutId: string): boolean;
