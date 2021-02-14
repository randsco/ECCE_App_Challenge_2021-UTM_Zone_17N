import { LayoutItemType } from 'jimu-core';
export declare const GLOBAL_DRAGGING_CLASS_NAME = "interactjs-dragging";
export declare const GLOBAL_H5_DRAGGING_CLASS_NAME = "exb-h5-dragging";
export declare const LIMITED_BOUNDARY_CLASS_NAME = "limited-drag-boundary";
export interface DragHandlerProps {
    rootLayoutId: () => string;
    layoutId: string;
    layoutItemId: string;
    itemType: LayoutItemType;
    useDragHandler: boolean;
    restrict: () => boolean;
    onDragStart?: (id: string) => void;
    onDragging?: (id: string, dx: number, dy: number) => void;
    onDragEnd?: (id: string, dx: number, dy: number) => void;
}
export declare function bindDragHandler(interactable: Interact.Interactable & {
    styleCursor: (boolean: any) => Interact.Interactable;
}, dragHandlerProps: DragHandlerProps): Interact.Interactable;
export declare function setIsDragging(value: boolean): void;
export declare function isDragging(): boolean;
