export declare function isSupportLanguage(): boolean;
/**
 *
 * @param helpKey reference helop-doc build-apps part
 */
export declare function getBuildAppsHelpLink(helpKey: string): Promise<string>;
export declare function getHomeHelpLink(): Promise<string>;
export declare function getWhatsNewLink(): Promise<string>;
/**
 *
 * @param helpKey the name prop in the widget manifest
 * include section and layout widget
 */
export declare function getWidgetHelpLink(helpKey: string): Promise<string>;
