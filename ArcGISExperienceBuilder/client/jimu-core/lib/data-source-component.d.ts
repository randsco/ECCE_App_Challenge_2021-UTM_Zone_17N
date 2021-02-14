import * as React from 'react';
import { IMDataSourceInfo } from './types/state';
import { DataSource, QueryParams, QueryScope } from './data-sources/data-source-interface';
import DataSourceManager from './data-source-manager';
import { IMDataSourceJson, IMUseDataSource } from './types/app-config';
import { AppMode } from './types/common';
export interface DataRenderFunction {
    /**
     * @param ds the data source
     * @param info the data source info
     * @param query the passed in query
     */
    (ds: DataSource, info: IMDataSourceInfo, query: QueryParams): React.ReactNode;
}
/**
 * The DataSourceComponent properties
 */
export interface DataSourceComponentProps {
    useDataSource: IMUseDataSource;
    /**
     * Pass widgetId/localId if need to execute the query.
     *
     * For main data source or data view, please use widgetId.
     * For local data source, please use localId. The recommended localId is: widgetId + ???
     */
    widgetId?: string;
    localId?: string;
    /**
     * Whether query record count when query data records.
     */
    queryCount?: boolean;
    /**
     * @ignore
     * Force query even if the query parameter does not change.
     */
    refresh?: boolean;
    /**
     * Query parameters of queriable data source.
     * The component does not execute a query without query property.
     * To execute a query without adding new filter, please use an empty object: {}.
     */
    query?: QueryParams;
    queryScope?: QueryScope;
    /**
     * If one of your children component's render depends on data source, please use this render function.
     * Otherwise, even if the data record in the data source is changed, your children will not be re-rendered
     * unless you connect the data source info in the children owner component to re-render the owner component.
     *
     * See here for the difference between parent and owner context: https://gist.github.com/jimfb/0eb6e61f300a8c1b2ce7.
     */
    children?: DataRenderFunction | React.ReactNode;
    onDataSourceInfoChange?: (info: IMDataSourceInfo) => void;
    /**
     * If one data source is used by mutiple widgets, every widget will receive the onDataSourceCreated callback.
     */
    onDataSourceCreated?: (ds: DataSource) => void;
    onCreateDataSourceFailed?: (err: any) => void;
}
interface DataSourceComponentStateProps {
    dataSource: DataSource;
    dataSourceInfo: IMDataSourceInfo;
    dataSourceJson: IMDataSourceJson;
    rootDataSourceJson?: IMDataSourceJson;
    dataSourceManager: DataSourceManager;
    belongToDataSourceInfo?: IMDataSourceInfo;
    appMode: AppMode;
}
declare type AllProps = DataSourceComponentProps & DataSourceComponentStateProps;
declare class DataSourceComponentInner extends React.PureComponent<AllProps> {
    componentDidMount(): void;
    componentDidUpdate(prevProps: AllProps): void;
    render(): {};
    doQuery(): void;
    handleAutoRefresh(): void;
    createDataSource(): void;
}
/**
 * A react component that makes data source easy to use.
 * In most cases, you can pass in `useDataSource` and `query`, and render the query result by using
 * a render function as a child component. The query result records are put into data source `records` property
 * (Internally, it calls `load()` method).
 */
export declare const DataSourceComponent: import("react-redux").ConnectedComponent<typeof DataSourceComponentInner, Pick<React.ClassAttributes<DataSourceComponentInner> & DataSourceComponentProps & DataSourceComponentStateProps, "ref" | "children" | "key" | "query" | "useDataSource" | "widgetId" | "localId" | "queryCount" | "refresh" | "queryScope" | "onDataSourceInfoChange" | "onDataSourceCreated" | "onCreateDataSourceFailed"> & DataSourceComponentProps>;
export default DataSourceComponent;
