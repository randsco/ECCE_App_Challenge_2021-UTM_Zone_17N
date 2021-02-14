import { IMAppConfig, IMSizeModeLayoutJson, BrowserSizeMode, LayoutInfo, PagePart } from 'jimu-core';
/**
 * Return the pending widgets/sections in the current size mode.
 * @param appConfig
 * @param pageId
 * @param sizeMode
 * @param pagePart
 */
export declare function getPendingLayoutItemsInPage(appConfig: IMAppConfig, pageId: string, sizeMode: BrowserSizeMode, pagePart: PagePart): LayoutInfo[];
/**
 * Return the pending widgets/sections from other size mode.
 * The pending means: the widgets/sections are in page's other mode but are not in the current mode (passed in)
 * @param appConfig
 * @param pageId
 * @param type
 * @param sizeMode
 */
export declare function getPendingLayoutItemsFromOtherSizeModeInPage(appConfig: IMAppConfig, pageId: string, sizeMode: BrowserSizeMode, pagePart: PagePart): LayoutInfo[];
/**
 * Return the pending widgets/sections in the current size mode.
 * @param appConfig
 * @param dialogId
 * @param sizeMode
 */
export declare function getPendingLayoutItemsInDialog(appConfig: IMAppConfig, dialogId: string, sizeMode: BrowserSizeMode): LayoutInfo[];
/**
 * Return the pending widgets/sections from other size mode.
 * The pending means: the widgets/sections are in dialog's other mode but are not in the current mode (passed in)
 * @param appConfig
 * @param dialogId
 * @param sizeMode
 */
export declare function getPendingLayoutItemsFromOtherSizeModeInDialog(appConfig: IMAppConfig, dialogId: string, sizeMode: BrowserSizeMode): LayoutInfo[];
/**
 * Return the pending widgets/sections in the current size mode.
 * @param appConfig
 * @param layoutId
 * @param sizeMode the current size mode
 */
export declare function getPendingLayoutItemsInLayoutWithDeep(appConfig: IMAppConfig, layoutId: string, sizeMode: BrowserSizeMode): LayoutInfo[];
/**
 * Return the pending widgets/sections.
 * The pending means: the widgets/sections are in layout's other mode but are not in the current mode (passed in).
 * @param appConfig
 * @param pageId
 * @param type
 * @param sizeMode
 */
export declare function getPendingLayoutItemsFromOtherSizeMode(appConfig: IMAppConfig, layout: IMSizeModeLayoutJson, sizeMode: BrowserSizeMode, thisWidgetIds?: any, thisSectionIds?: any): LayoutInfo[];
