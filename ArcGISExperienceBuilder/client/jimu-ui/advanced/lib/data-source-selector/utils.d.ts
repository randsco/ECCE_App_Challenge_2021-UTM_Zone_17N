import { ImmutableObject, WidgetJson, IMWidgetJson, IMDataSourceJson, IntlShape, DataSource, IMAppConfig, IMDataSourceInfo, ImmutableArray, DataSourceJson } from 'jimu-core';
/**
 * Get widgets which are using a specific data source or data views of the data source (if the data source is main data source).
 */
export declare function getWidgetsUsingDsOrItsViews(dsId: string, allWidgets: ImmutableObject<{
    [widgetId: string]: WidgetJson;
}>): IMWidgetJson[];
/**
 * Get widgets which are using:
 * 1. a specific data source, or,
 * 2. data views of the data source (if the data source is main data source), or,
 * 3. descendant data sources of the data source, or,
 * 4. data views of descendant data sources
 */
export declare function getWidgetsUsingDsOrItsDescendantDss(dsId: string, allWidgets: ImmutableObject<{
    [widgetId: string]: WidgetJson;
}>): IMWidgetJson[];
/**
 * Get widgets which are using one specific main data source or one specific data view.
 */
export declare function getWidgetsUsingOneDsOrOneView(dsId: string, allWidgets: ImmutableObject<{
    [widgetId: string]: WidgetJson;
}>): IMWidgetJson[];
/**
 * Get following data source id:
 * 1. the passed data source id, and,
 * 2. data views of the data source (if the data source is main data source), and,
 * 3. descendant data sources of the data source, and,
 * 4. data views of descendant data sources
 */
export declare function getDescendantDssAndViews(dsId: string): string[];
export declare function isFuzzySearch(label: string, searchValue: string): boolean;
export declare function isFuzzyFromDsIds(dsJson: IMDataSourceJson, fromDsIds: ImmutableArray<string>): boolean;
export declare function getOutputDssFromOriginDs(ds: DataSource): DataSource[];
export declare function getAppConfig(): IMAppConfig;
export declare function getDsIcon(dsJson: IMDataSourceJson): any;
export declare function getDsTypeString(dsType: string, intl: IntlShape): string;
export declare function getWhetherDataSourceIsInited(dataSources: ImmutableObject<{
    [dsId: string]: DataSourceJson;
}>, dataSourcesInfo: ImmutableObject<{
    [dsId: string]: IMDataSourceInfo;
}>): boolean;
export declare function editDataSourceJson(dsJson: IMDataSourceJson): IMDataSourceJson;
/**
 * Return original data's url.
 * 1. If data source is from an item, will return item detail url,
 * else will return service url.
 * 2. When need to return service url, if the service is a hosted service, will return service url with corresponding token,
 * else will return service url without token.
 * (When need to return item detail url, will never add token to url. Because user can login in item detail page.)
 */
export declare function getOriginalDataUrl(dsJson: IMDataSourceJson): string;
