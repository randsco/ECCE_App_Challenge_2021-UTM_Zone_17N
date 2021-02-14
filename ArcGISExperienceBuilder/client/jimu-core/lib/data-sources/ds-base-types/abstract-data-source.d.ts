import { DataSourceManager, IMDataSourceJson, IMDataSourceSchema, IMReversedDataSourceSchema, IMDataSourceInfo, IMFieldSchema } from 'jimu-core';
import { GeometryType } from '@esri/arcgis-rest-types';
import { DataSource, DataSourceConstructorOptions, DataRecord, DataSourceStatus } from '../data-source-interface';
/**
 * Include the common implementations for datasource.
 */
export declare abstract class AbstractDataSource implements DataSource {
    id: string;
    type: string;
    dataViewId: string;
    localId: string;
    private fetchedSchema;
    private schema;
    private reverseSchema;
    private dataSourceJson;
    private originDataSourceJson;
    private _url;
    isDataView: boolean;
    belongToDataSource: DataSource;
    isLocal: boolean;
    dataSourceManager: DataSourceManager;
    isDataSourceSet: boolean;
    parentDataSource: DataSource;
    jimuChildId: string;
    protected records: DataRecord[];
    constructor(options: DataSourceConstructorOptions);
    get url(): string;
    set url(u: string);
    getLabel(): string;
    getDataSourceJson(): IMDataSourceJson;
    setDataSourceJson(dsJson: IMDataSourceJson): void;
    traverseToMergeDataSourceJson(baseDsJson: IMDataSourceJson, newDsJson: IMDataSourceJson): IMDataSourceJson;
    getSchema(): IMDataSourceSchema;
    getSelectedFields(): {
        [jimuName: string]: IMFieldSchema;
    };
    setSchema(schema: IMDataSourceSchema): void;
    fetchSchema(): Promise<IMDataSourceSchema>;
    getFetchedSchema(): IMDataSourceSchema;
    setFetchedSchema(fetchedSchema: IMDataSourceSchema): void;
    getGeometryType(): GeometryType;
    /** @ignore */
    getReversedConfigSchema(): IMReversedDataSourceSchema;
    setRecords(records: DataRecord[]): void;
    setJsonData(data: any[]): void;
    /**
     * @param schema
     */
    private getOneReversedConfigSchema;
    getStatus(): DataSourceStatus;
    setStatus(status: DataSourceStatus): void;
    getCountStatus(): DataSourceStatus;
    setCountStatus(status: DataSourceStatus): void;
    getVersion(): number;
    addVersion(): void;
    getRecords(): DataRecord[];
    private getSelectionDataView;
    getSelectedRecords(): DataRecord[];
    getSelectedRecordIndexes(): number[];
    getSelectedRecordIds(): string[];
    nextRecord(): DataRecord;
    prevRecord(): DataRecord;
    getRecord(index: number): DataRecord;
    getRecordById(id: string): DataRecord;
    clearSelection(): void;
    private clearOneDsSelection;
    private updateSelectionStateAndChangeUrl;
    selectRecord(index: number): void;
    selectRecords(indexes: number[]): void;
    selectRecordById(id: string, record?: DataRecord): void;
    selectRecordsByIds(ids: string[], records?: DataRecord[]): void;
    makeSureSelectedRecords(): Promise<void>;
    /**
     *
     * @param selection
     */
    protected copySelectionToDataView(selection: DataRecord[]): void;
    getInfo(): IMDataSourceInfo;
    clearData(): void;
    getIdField(): string;
    getRootDataSource(): DataSource;
    ready(): Promise<void | any>;
    getOriginDataSources(): DataSource[];
    getMainDataSource(): DataSource;
    getDataViews(): DataSource[];
    getDataView(dataViewId: string): DataSource;
    getLocalDataSources(): DataSource[];
    getLocalDataSource(localId: string): DataSource;
    getAllDerivedDataSources(): DataSource[];
    destroy(): void;
}
