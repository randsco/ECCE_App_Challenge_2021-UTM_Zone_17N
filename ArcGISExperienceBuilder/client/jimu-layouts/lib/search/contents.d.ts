import { IMAppConfig, IMLayoutJson, LayoutItemType, IMLayoutItemJson, LayoutInfo, BrowserSizeMode, ContainerType, IMSizeModeLayoutJson, LayoutItemJson } from 'jimu-core';
export declare function findLayoutItem(appConfig: IMAppConfig, layoutInfo: LayoutInfo): IMLayoutItemJson;
/**
 * Find the sectionId that contains the specified view. Return null if not find.
 * @param viewId
 */
export declare function findSectionId(appConfig: IMAppConfig, viewId: string): string;
/**
 * Find the viewId that contains the specified layoutId. Return null if no such view.
 * @param layoutId
 */
export declare function findParentViewId(appConfig: IMAppConfig, layoutId: string): string;
export declare function getContentIdInLayoutItem(item: IMLayoutItemJson): string;
/**
 * return the content ids in the layout. Do not consider the embedded layouts
 * @param layoutJson
 */
export declare function getContentsInLayout(layoutJson: IMLayoutJson, type: LayoutItemType, withPending?: boolean): string[];
/**
 * Return the content ids in a layout, consider the layout widget, the normal widget that has embed layout, and views, screens
 * @param appConfig
 * @param layoutId the layout to search
 * @param type content type
 * @param sizeMode the sizeMode to search
 * @param withPending will include the pending content if true
 */
export declare function getContentsInLayoutRecursive(appConfig: IMAppConfig, layoutId: string, type: LayoutItemType, sizeMode: BrowserSizeMode, withPending?: boolean): string[];
/**
 * Return the content ids in a layout, consider the layout widget only in the layout,
 * do not consider the normal widget that has embed layout,
 * do not consider the views in the section
 * do not consider the screen
 * @param appConfig
 * @param layoutId
 * @param type
 */
export declare function getContentsInLayoutWithLayoutWidgetOnly(appConfig: IMAppConfig, layoutId: string, type: LayoutItemType, sizeMode: BrowserSizeMode, withPending?: boolean): string[];
/**
 * Return the layout item that holds the content.
 * A content is not allowed to be put in multiple items.
 * @param layoutJson
 * @param widgetId
 */
export declare function getContainerLayoutItem(layoutJson: IMLayoutJson, id: string, type: LayoutItemType): IMLayoutItemJson;
/**
 * Return the layout item ids in a layout
 * @param appConfig
 * @param layoutId
 * @param withPending
 */
export declare function getLayoutItemIds(appConfig: IMAppConfig, layoutId: string, withPending?: boolean): string[];
export declare function getLayoutInfosByType(layoutJson: IMLayoutJson, type: LayoutItemType, withPending?: boolean): LayoutInfo[];
/**
 * Find a widget id that use the layoutId
 * @param appConfig
 * @param layoutId
 */
export declare function getWidgetIdThatUseTheLayoutId(appConfig: IMAppConfig, layoutId: string): string;
/**
 * Return the container that holds the widget, consider the widgets in layout widgets
 * @param appConfig
 * @param widgetId
 */
export declare function getContentContainerInfo(appConfig: IMAppConfig, id: string, type: LayoutItemType, sizeMode: BrowserSizeMode): {
    type: ContainerType;
    id: string;
};
/**
 * Return the widget/section ids in the page, consider the sections/widgets in layout widget
 * @param appConfig
 * @param pageId
 */
export declare function getContentsInPageBody(appConfig: IMAppConfig, pageId: string, type: LayoutItemType, browserSizeMode: BrowserSizeMode): string[];
/**
 * Return the widget/section ids in the dialog, consider the sections/widgets in layout widget
 * @param appConfig
 * @param dialogId
 */
export declare function getContentsInDialog(appConfig: IMAppConfig, dialogId: string, type: LayoutItemType, browserSizeMode: BrowserSizeMode): string[];
/**
 * Return the widget/section ids in the screen, consider the sections/widgets in layout widget
 * @param appConfig
 * @param screenId
 */
export declare function getContentsInScreen(appConfig: IMAppConfig, screenId: string, type: LayoutItemType, browserSizeMode: BrowserSizeMode): string[];
/**
 * Return the widget/section ids in the view, consider the sections in layout widget
 * @param appConfig
 * @param viewId
 */
export declare function getContentsInView(appConfig: IMAppConfig, viewId: string, type: LayoutItemType, browserSizeMode: BrowserSizeMode): string[];
export declare function getContentsInPageHeader(appConfig: IMAppConfig, type: LayoutItemType, browserSizeMode: BrowserSizeMode): string[];
export declare function getContentsInPageFooter(appConfig: IMAppConfig, type: LayoutItemType, browserSizeMode: BrowserSizeMode): string[];
/**
 * Return the layoutId for specific sizeMode. If the sizeMode does not exist, return the main sizeMode layoutId.
 * @param layouts
 * @param browserSizeMode
 * @param mainSizeMode
 */
export declare function findLayoutId(layouts: IMSizeModeLayoutJson, browserSizeMode: BrowserSizeMode, mainSizeMode: BrowserSizeMode): string;
/**
 * In one layout, one widget/section is NOT allowed be put in more than one layout item.
 * However, in widget that has layouts, one widget/section may be put in multiple layouts.
 *
 * if `sizeMode` is passed in, return the items in the size mode only, else return all items
 * @param appConfig
 * @param type
 * @param id
 * @param sizeMode
 */
export declare function getLayoutInfosHoldcontent(appConfig: IMAppConfig, type: LayoutItemType, id: string, sizeMode?: BrowserSizeMode): LayoutInfo[];
/**
 * Find a widget id (parent widget id) that the widget layout contains the widgetId/sectionId.
 * Return the direct parent only.
 * @param appConfig
 * @param id the widget/section id
 * @param type
 * @param sizeMode
 */
export declare function getParentWidgetIdOfContent(appConfig: IMAppConfig, id: string, type: LayoutItemType, sizeMode: BrowserSizeMode): string;
/**
 * Get children widgets/sections in a widget, find one level only. Includes all size mode
 * @param appConfig
 * @param parentWidgetId
 * @param type
 */
export declare function getChildrenContents(appConfig: IMAppConfig, parentWidgetId: string, type: LayoutItemType, withPending: boolean): string[];
/**
 * Return the layoutInfo for the widget/section, there may be multiple layoutInfos for the widget/section.
 *
 * One widget/section is allowed to be put in one layout only one time, but it's allowed be put in multile layouts.
 * There are 2 cases for multiple layouts:
 *    * One widget/section is allowed to be put in multiple size mode (this function is for one size mode only, so we don't consider this case)
 *    * In one size mode, one widget (i.e. List widget) may have multiple state layouts to hold the same widget.
 * @param appConfig
 * @param contentId
 * @param type
 */
export declare function getContentLayoutInfosInOneSizeMode(appConfig: IMAppConfig, contentId: string, type: LayoutItemType, sizeMode: BrowserSizeMode): LayoutInfo[];
/**
 * Return the size mode of the layout. Because under one size mode, only widget may have multiple layouts,
 * and this function is used only for widgets that have layouts, so pass widget id to make the search easy.
 * @param appConfig
 * @param layoutId
 * @param widgetId
 */
export declare function getBrowserSizeModeByLayoutIdAndWidgetId(appConfig: IMAppConfig, layoutId: string, widgetId: string): BrowserSizeMode;
/**
 * Get the size mode that the layout belongs to
 */
export declare function getBrowserSizeModeByLayoutId(appConfig: IMAppConfig, layoutId: string): BrowserSizeMode;
/**
 * Find all layoutInfos that the content id, section or widget, is equal to each other in the widget on the browserSizeMode
 *
 * @param appConfig
 * @param layoutInfo
 * @param parentWidgetId
 * @param sizeMode
 */
export declare function getRelatedLayoutInfosInWidgetByLayoutInfo(appConfig: IMAppConfig, layoutInfo: LayoutInfo, parentWidgetId: string, sizeMode: BrowserSizeMode): LayoutInfo[];
/**
 * Same as `getRelatedLayoutInfosInWidgetByLayoutInfo`, but return the layout items
 * @param appConfig
 * @param layoutInfo
 * @param parentWId
 * @param browserSizeMode
 */
export declare function getRelatedLayoutItemsInWidgetByLayoutInfo(appConfig: IMAppConfig, layoutInfo: LayoutInfo, parentWId: string, browserSizeMode: BrowserSizeMode): LayoutItemJson[];
export declare function checkIsLayoutInfoInWidget(appConfig: IMAppConfig, parentWId: string, layoutInfo: LayoutInfo): boolean;
/**
 * Return the widget/section ids that in the same container with the widget
 * @param appConfig
 * @param widgetId
 */
export declare function getContentsInTheSameContainer(appConfig: IMAppConfig, id: string, type: LayoutItemType, retType: LayoutItemType, sizeMode: BrowserSizeMode): string[];
