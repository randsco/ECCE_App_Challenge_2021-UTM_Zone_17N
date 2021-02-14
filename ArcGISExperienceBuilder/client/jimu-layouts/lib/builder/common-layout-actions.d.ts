import { LayoutItemConstructorProps, LayoutInfo, IMAppConfig, LayoutItemJson, ClipboardItem } from 'jimu-core';
export declare function getRootLayoutId(): string;
export declare function pendLayoutItem(layoutInfo: LayoutInfo): void;
export declare function duplicateLayoutItem(layoutInfo: LayoutInfo): void;
export declare function pasteLayoutItem(clipboardItem: ClipboardItem, targetLayoutId: string): void;
export declare function pasteToFixedLayout(clipboardItem: ClipboardItem, targetLayoutId: string, containerRect?: ClientRect): void;
export declare function pasteToFlowLayout(clipboardItem: ClipboardItem, targetLayoutId: string): void;
export declare function findCorespondingLayoutItem(appConfig: IMAppConfig, target: LayoutItemJson, anotherLayoutId: string): LayoutInfo;
/**
 * Add widget or section to a layout, either dragging from the widget list or dragging an existing one.
 */
export declare function addItemToLayout(appConfig: IMAppConfig, item: LayoutItemConstructorProps, parentLayoutInfo: LayoutInfo, containerRect: ClientRect, itemRect: ClientRect, insertIndex?: number): Promise<{
    layoutInfo: LayoutInfo;
    updatedAppConfig: IMAppConfig;
}>;
export declare function mergeWidgetsIntoColumn(appConfig: IMAppConfig, draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, refLayoutInfo: LayoutInfo, side: 'top' | 'bottom'): Promise<{
    layoutInfo: LayoutInfo;
    updatedAppConfig: IMAppConfig;
}>;
export declare function supportFloating(layoutInfo: LayoutInfo): boolean;
export declare function supportSinking(layoutInfo: LayoutInfo): boolean;
export declare function floatingLayoutItem(layoutInfo: LayoutInfo, clientRect: ClientRect, area: number): void;
export declare function sinkingLayoutItem(layoutInfo: LayoutInfo, clientRect: ClientRect): void;
/**
 * Add a block into flow layout which contains the draggingItem
 * @param draggingItem
 * @param parentLayoutInfo
 * @param containerRect
 * @param itemRect
 * @param width
 * @param insertIndex
 * @param appConfig
 */
export declare function addBlockToFlowLayout(draggingItem: LayoutItemConstructorProps, parentLayoutInfo: LayoutInfo, containerRect: ClientRect, itemRect: ClientRect, width: number, insertIndex: number, appConfig?: IMAppConfig): Promise<void>;
