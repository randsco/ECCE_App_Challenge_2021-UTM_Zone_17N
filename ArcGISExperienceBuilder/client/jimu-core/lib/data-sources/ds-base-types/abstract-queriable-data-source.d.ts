import { IMDataViewJson } from 'jimu-core';
import { AbstractDataSource } from './abstract-data-source';
import { QueriableDataSource, DataSourceConstructorOptions, DataSourceStatus, QueryOptions, QueryResult, DataRecord, QueryParams, IMQueryParams, WidgetDataSourcePair } from '../data-source-interface';
export declare abstract class AbstractQueriableDataSource extends AbstractDataSource implements QueriableDataSource {
    count: number;
    lastUpdateTime: Date;
    private lastQueryId;
    private lastQueryParams;
    private lastCountQueryParams;
    private lastRefreshTime;
    /**
     * data will be cached here, not this.records.
     *
     * When selectRecordById, some selected records may be put in this.records, so they are not in the pages.
     */
    private pages;
    private pagePromises;
    private countPromise;
    private byIdPromise;
    private autoRefreshHandle;
    constructor(options: DataSourceConstructorOptions);
    getCurrentQueryParams(excludeOption?: WidgetDataSourcePair): any;
    getRuntimeQueryParams(excludeWidgetId?: string): QueryParams;
    private getCurrentQueryParamsByQuery;
    private getMergedWidgetQueries;
    getCurrentQueryId(): string;
    getRealQueryParams(query: QueryParams, flag: 'query' | 'load', options?: QueryOptions): QueryParams;
    /**
     * the data source's query is a data view config as well.
     *  */
    protected getDataViewConfig(): IMDataViewJson;
    private mergeQueryWithConfigQuery;
    updateQueryParams(query: QueryParams, widgetId: string): void;
    getQueryPageSize(): number;
    getMaxRecordCount(): number;
    private getQueryWithoutPage;
    private checkClearLocalCache;
    getRecordsByPage(page: number, pageSize: number): DataRecord[];
    getPagesData(): {
        [page: number]: DataRecord[];
    };
    setPagesData(pages: {
        [page: number]: DataRecord[];
    }): void;
    private clearDataNotAddVersion;
    clearData(): void;
    /**
     * get continuious page records
     */
    getRecords(): DataRecord[];
    getRealQueryPages(page: number, pageSize: number): number[];
    /**
     * the page/pageSize in query will not be used in the actual query
     */
    load(query: QueryParams, options?: QueryOptions): Promise<DataRecord[]>;
    /**
     * the resolved boolean means whether the query result is used (only the last query update records)
     * @param realQuery
     * @param page
     */
    private loadByPage;
    loadCount(query: QueryParams, options?: QueryOptions): Promise<number>;
    query(query: QueryParams, options?: QueryOptions): Promise<QueryResult>;
    queryCount(query: QueryParams, options?: QueryOptions): Promise<QueryResult>;
    loadById(id: string, refresh?: boolean): Promise<DataRecord>;
    queryById(id: string): Promise<DataRecord>;
    getAutoRefreshInterval(): number;
    getLastRefreshTime(): Date;
    startAutoRefresh(): void;
    stopAutoRefresh(): void;
    /**
     * Not ready yet.
     * @param record
     */
    addRecord?(record: DataRecord): Promise<DataRecord>;
    /**
     * Not ready yet.
     * @param record
     */
    updateRecord?(record: DataRecord): Promise<DataRecord>;
    /**
     * Not ready yet.
     * @param record
     */
    deleteRecord?(index: number): Promise<void>;
    getSaveStatus(): DataSourceStatus;
    setSaveStatus(status: DataSourceStatus): void;
    getMainDataSource(): QueriableDataSource;
    getDataViews(): QueriableDataSource[];
    getDataView(dataViewId: string): QueriableDataSource;
    abstract getConfigQueryParams(): QueryParams;
    abstract getRemoteQueryParams(): QueryParams;
    abstract mergeQueryParams(baseQuery: QueryParams, newQuery: QueryParams): QueryParams;
    protected doAdd?(record: DataRecord): Promise<DataRecord>;
    protected doUpdateRecord?(record: DataRecord): Promise<DataRecord>;
    protected doDeleteRecord?(index: number): Promise<void>;
    protected abstract doQuery(query: IMQueryParams): Promise<QueryResult>;
    protected abstract doQueryCount(query: IMQueryParams): Promise<QueryResult>;
    protected abstract doQueryById(id: string): Promise<DataRecord>;
}
