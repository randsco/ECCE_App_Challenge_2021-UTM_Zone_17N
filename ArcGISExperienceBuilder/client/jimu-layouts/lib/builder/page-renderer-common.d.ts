import { IMThemeVariables, ImmutableObject } from 'jimu-core';
export declare const RESIZE_HANDLER_HEIGHT = 16;
export declare const DEFAULT_HEADER_HEIGHT = 75;
export declare const resizeHandlerStyle: import("jimu-core").SerializedStyles;
export declare const maskStyle: import("jimu-core").SerializedStyles;
export declare function editBtnStyle(theme: IMThemeVariables): import("jimu-core").SerializedStyles;
export declare function editHeader(): void;
export declare function editFooter(): void;
export declare function editBody(): void;
export declare function getHeaderLayoutId(): string;
export declare function getFooterLayoutId(): string;
export declare function getPageLayoutId(pageId: string): string;
export declare function getDialogLayoutId(dialogId: string): string;
export declare function getVisiblePageId(pageStatus: ImmutableObject<{
    [pageId: string]: boolean;
}>): string;
