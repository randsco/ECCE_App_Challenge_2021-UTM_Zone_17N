export interface ResizeHandlerProps {
    layoutItemId: string;
    onResizeStart?: (id: string, initWidth: number, initHeight: number) => void;
    onResizing?: (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
    onResizeEnd?: (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
}
export declare const GLOBAL_RESIZING_CLASS_NAME = "interactjs-resizing";
export declare function bindResizeHandler(interactable: Interact.Interactable, resizeHandlerProps: ResizeHandlerProps): Interact.Interactable;
export declare function setIsResizing(value: boolean): void;
export declare function isResizing(): boolean;
