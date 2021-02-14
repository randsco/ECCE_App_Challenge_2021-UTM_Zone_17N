import { IGeometry, GeometryType, IFeature } from '@esri/arcgis-rest-types';
import { IAttachmentInfo } from '@esri/arcgis-rest-feature-layer';
// only used as types
import { DataSourceManager, IMDataSourceJson, IMDataSourceSchema, IMReversedDataSourceSchema, IntlShape, IMDataSourceInfo, ServiceDefinition, ImmutableObject } from 'jimu-core';
import { JimuFeatureLayerView } from 'jimu-arcgis'; // only used as type
import { IMFieldSchema } from '../types/app-config';
/**
 * All data source status are here, including data source instance status and data status (for QueriableDataSource).
 * * Instance status includes: NotCreated, Created, CreateError. <br/>
 *    When a data source is requested to be created, it is set to `NotCreated` at first.
 *    If a data source has never been used, there is no data source status.
 * * Data status includes: Unloaded, Loading, Loaded, LoadError. <br/>
 *    When a QueriableDataSource is created, it is set as `Unloaded` at first.
 *    If `load()` is invoked, it will be set as `Loading`. If data is returned, it will be set as `Loaded`.
 *    If an error occurs, it will be set as `LoadError`.
 */
export enum DataSourceStatus {
  // Instance status.
  NotCreated = 'NOT_CREATED',
  Created = 'CREATED',
  CreateError = 'CREATE_ERROR',

  // Data status.
  Unloaded = 'UNLOADED',
  Loading = 'LOADING',
  Loaded = 'LOADED',
  LoadError = 'LOAD_ERROR',

  // Save status.
  /** @ignore */
  Saving = 'SAVING',
  /** @ignore */
  Saved = 'SAVED',
  /** @ignore */
  SaveError = 'SAVE_ERROR',

  // For remote push data sources.
  /** @ignore */
  Closed = 'CLOSED',
  /** @ignore */
  Connecting = 'CONNECTING',
  /** @ignore */
  Connected = 'CONNECTED',
  /** @ignore */
  Closing = 'CLOSING',

  // For client DS, we don't define status.
}

/**
 * The data source types that `jimu-core` supports.
 */
export enum DataSourceTypes {
  /** @ignore */
  SimpleLocal = 'SIMPLE_LOCAL',
  /** @ignore */
  CSV = 'CSV',

  /**
   * FeatureLayer data source is a `QueriableDataSource`, which is used to query ArcGIS feature service.
   * See {@link FeatureLayerDataSource}
   */
  FeatureLayer = 'FEATURE_LAYER',
  /**
   * See {@link SceneLayerDataSource}
   */
  SceneLayer = 'SCENE_LAYER',

  FeatureSet = 'FEATURE_SET',

  /**
   * GroupLayer data source is a data source set that may have child data sources. It is from group layer in a map service or a webmap/webscene.
   */
  GroupLayer = 'GROUP_LAYER',

  /**
   * FeatureService data source is a data source set that may have child data sources. It is from the feature service.
   */
  FeatureService = 'FEATURE_SERVICE',

  /**
   * GroupLayer data source is a data source set that may have child data sources. It is from the map service.
   */
  MapService = 'MAP_SERVICE',
  /**
   * SceneLayer data source is a data source set that may have child data sources. It is from the scene service.
   */
  SceneService = 'SCENE_SERVICE'
}


/**
 * For now, we only support some layer service types.
 */
export enum SupportedLayerServiceTypes {
  // single layer service under map service or feature service
  FeatureLayer = 'Feature Layer',
  Table = 'Table',
  GroupLayer = 'Group Layer',

  // single layer service under scene service
  SceneLayerPoint = 'Point',
  SceneLayer3DObject = '3DObject'
}

/**
 * For now, we only support some service types.
 */
export enum SupportedServiceTypes {
  // [Feature Service](https://developers.arcgis.com/rest/services-reference/feature-service.htm)
  FeatureService = 'FeatureServer',
  // [Map Service](https://developers.arcgis.com/rest/services-reference/hosted-map-service.htm)
  MapService = 'MapServer',
  // [Scene Service](https://developers.arcgis.com/rest/services-reference/scene-service.htm)
  SceneService = 'SceneServer'
}

/**
 * For now, we only support some portal item types.
 * Please see [Items and item types](https://developers.arcgis.com/rest/users-groups-and-items/items-and-item-types.htm).
 */
export enum SupportedItemTypes {
  WebMap = 'Web Map',
  WebScene = 'Web Scene',
  FeatureService = 'Feature Service',
  MapService = 'Map Service',
  SceneService = 'Scene Service',
  FeatureCollection = 'Feature Collection'
}

/**
 * For now, we only support some layer types.
 * Please see [Layer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html).
 */
export enum SupportedLayerTypes {
  FeatureLayer = 'feature',
  MapImageLayer = 'map-image',
  TileLayer = 'tile',
  GroupLayer = 'group',
  SceneLayer = 'scene'
}

/**
 * Data source factory is used to create data source.
 */
export interface DataSourceFactory {
  createDataSource: (options: DataSourceConstructorOptions) => DataSource;
}

/**
 * A data record represents a record in a data source.
 */
export interface DataRecord {
  /** A reference of the data source object that has this record. */
  dataSource: DataSource;

  /**
   * The data is a plain object. The format is {key: value}, and the key is "jimuFieldName".
   *
   * The data before mapping use this schema: {fieldName: value}. We need to return this schema: {jimuFieldName: value}.
   */
  getData: () => any;

  /** @ignore */
  getDataBeforeMapping: () => any;

  getFormattedData: (intl: IntlShape) => any;

  getFieldValue: (jimuFieldName: string) => any;
  getFormattedFieldValue: (jimuFieldName: string, intl: IntlShape) => string;

  /** @ignore */
  convertBeforeMappingDataToData: (beforeMappingData: any) => any;

  /**
   * Return the data in JSON format, which is used to serialize data, and the key is "jimuFieldName".
   */
  toJson: () => any;

  getId: () => string;
  setId: (id: string) => void;

  getGeometry: () => IGeometry;

}

/** @ignore */
export interface AttachmentInfo extends IAttachmentInfo {
  url?: string;
}

/** @ignore */
export interface AttachmentQueryOptions{
  attachmentTypes: string[];
  url: string;
  featureId: number | string;
}

// Refer to: https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-FeatureSet.html
export interface DataRecordSet{
  records: DataRecord[];
  // The jimuFieldName.
  fields?: string[];

  // The data source that the data record set comes from.
  dataSource?: DataSource;
}

export interface QueryResult{
  // The query parameters that generate the result.
  queryParams: IMQueryParams;

  records?: DataRecord[];
  // The jimuFieldName.
  fields?: string[];

  count?: number;
}

/**
 * Query scope defines which data is returned when the query is executed in addition to the query parameters.
 */
export enum QueryScope{
  /** Use the query parameters directly to query. */
  InAllData = 'IN_ALL_DATA',

  /** Use the query parameters and the filters configured in exb to query. */
  InRemoteConfigView = 'IN_REMOTE_CONFIG_VIEW',

  /** Use the query parameters and the configured filters in data source and filters configured in exb to query. */
  InConfigView = 'IN_CONFIG_VIEW',

  /** Use all of the appliyed query parameters to query. */
  InRuntimeView = 'IN_RUNTIME_VIEW'
}

export interface QueryOptions{
  scope?: QueryScope;

  /** For load only.
   *  For local data source, you can use local id as widget id.
   */
  widgetId?: string;

  /** Force the query even if  the query parameters have not changed. */
  refresh?: boolean;

  /**
   * When execute query, the matched query is excluded.
   * Valid in runtime scope only.
   */
  excludeQuery?: WidgetDataSourcePair;
}

export interface WidgetDataSourcePair{
  dataSourceId: string;
  widgetId: string;
}

/** The base query parameter interface. */
export interface QueryParams{
  // The first page is 1, not 0.
  page?: number;
	pageSize?: number;
}
export type IMQueryParams = ImmutableObject<QueryParams>;

export interface SqlQueryParams extends QueryParams{
  where?: string;
	outFields?: string[];
	orderByFields?: string[];
	groupByFieldsForStatistics?: string[];
}
export type IMSqlQueryParams = ImmutableObject<SqlQueryParams>;

/**
 * Query parameters for featuer layer.
 */
export interface FeatureLayerQueryParams extends SqlQueryParams{
	objectIds?: number[];
	geometry?: Geometry;
	returnGeometry?: boolean;
	geometryPrecision?: number;
	outStatistics?: StatisticDefinition[];
	returnZ?: boolean;
  returnM?: boolean;
  gdbVersion?: string;
	sqlFormat?: 'none' | 'standard' | 'native';
}
export type IMFeatureLayerQueryParams = ImmutableObject<FeatureLayerQueryParams>;

export interface StatisticDefinition{
	statisticType: 'count' | 'sum' | 'min' | 'max' | 'avg' | 'stddev' | 'var';
	onStatisticField: string;
	outStatisticFieldName: string;
}

export interface Geometry{
  spatialReference: SpatialReference;
}

export interface SpatialReference{
  wkid?: number;
  wkt?: string;
}

interface ParentDataSource{
  getChildDataSources?: () => DataSource[];

  /**
   * Get child data source by `jimuChildId`, you can get `jimuChildId` by using `getJimuChildId()`.
   * @ignore
   */
  getChildDataSource?: (jimuChildId: string) => DataSource;

  /**
   * Get the actual data source id by `jimuChildId`.
   * @ignore
   */
  getChildDataSourceId?: (jimuChildId: string) => string;

  /**
   * The jimu child id is similar to the jimuFieldName, and widgets should use the jimuChildId instead of the childId to make data mapping work.
   */
  getJimuChildId?: (childId: string) => string[];
}

interface ChildDataSource{
  /**
   * Null means it's root data source.
   */
  parentDataSource: DataSource;

  jimuChildId: string;

  getRootDataSource: () => DataSource;
}

interface DataViewOperations{
  /** Return all data views created from a main data source. */
  getDataViews: () => DataSource[];
  getDataView: (dataViewId: string) => DataSource;
}

interface LocalDataSourceOperations{
  /** Return all local data sources created from a main data source or data view. */
  getLocalDataSources: () => DataSource[];
  getLocalDataSource: (localId: string) => DataSource;
}

/**
 * The data views will share the schema of the main data source it belongs to.
 */
interface DataViewDataSource{
  belongToDataSource?: DataSource;
  getMainDataSource: () => DataSource;

  /**
   * The data view id configured in Json.
   */
  dataViewId?: string;
}

/**
 * The interface for all data sources.
 *
 * Conceptually, we have four types of data sources but all of them are created as data source object:
 * * Main data source: the data source user added in data panel.
 * * Data view: the data view user created in data panel.
 * * Local data source: when multiple widgets connnect to a main data source or a data view, they'll share the same data records. If you need to
 *    use a local data copy, you can create a local data source from a main data source by using `DataSourceManager.getInstance().createLocalDataSource()`.
 * * Local data view: a local data source created from a data view.
 *
 * Data view, local data source or local data view derived from the same main data source will share the same schema, same selection records, but may have different data records,
 * the schema is in main data source only.
 *
 * To share the selection between data source and view, we create a selection data view when create the data source, the selection data source view id is: `${dataSourceId}-selection`.
 * When select, the selected records are copied to the selection data view.
 *
 */
export interface DataSource extends ParentDataSource, ChildDataSource, DataViewDataSource, DataViewOperations, LocalDataSourceOperations {
  /**
   * These 3 properties are in app config.
   * Put them here for ease of use.
   */
  id: string;
  type: string;

  /**
   * The data source JSON object in app config.
   */
  getDataSourceJson: () => IMDataSourceJson;
  setDataSourceJson: (dsJson: IMDataSourceJson) => void;
  getLabel: () => string;

  dataSourceManager: DataSourceManager;

  /**
   * Whether a data source contains child data sources.
   * A dataset data source should create its all child data sources before parsing `ready()`.
   */
  isDataSourceSet: boolean;

  /**
   * True means the data source is a data view.
   * For local data source, this is false even the local data source is created from a data view.
   */
  isDataView: boolean;

  /**
   * True means the data source is a local data source.
   */
  isLocal: boolean;

  localId?: string;

  /**
   * The data schema is in "dataSourceJson",
   *    * For data source, use "jimuName" as key, and save the actual field name in the object.
   *    * For data source set, use "jimuChildId" as key, and save the actual child id in the object.
   * In many cases, we need to use the actual "childId" or "fieldName" to access info, so we can use this method to get a reverse schema for ease of use.
   */
  /** @ignore */
  getReversedConfigSchema: () => IMReversedDataSourceSchema;

  getRecord: (index: number) => DataRecord;
  getRecordById: (id: string) => DataRecord;
  getRecords: () => DataRecord[];
  setRecords: (records: DataRecord[]) => void;
  getSelectedRecords?: () => DataRecord[];
  getSelectedRecordIndexes?: () => number[];
  getSelectedRecordIds?: () => string[];
  nextRecord?: () => DataRecord;
  prevRecord?: () => DataRecord;

  /**
   * Select record by index.
   */
  selectRecord?: (index: number) => void;
  selectRecords?: (indexes: number[]) => void;

  /** The total records count depends on the current query */
  count?: number;

  /**
   * JsonData may come from SSR, and the data uses jimuFieldName as key.
   */
  /** @ignore */
  setJsonData: (jsonData: any[]) => void;

  /**
   * When select record by id, we can pass in the records. So when the selected records are not in the data source, we can add them in.
   */
  selectRecordById?: (id: string, record?: DataRecord) => void;
  selectRecordsByIds?: (ids: string[], records?: DataRecord[]) => void;

  clearData?: () => void;
  clearSelection?: () => void;

  /**
   * The schema returned here is the merged result of the configured schema and the fetched schema.
   */
  getSchema: () => IMDataSourceSchema;
  setSchema: (schema: IMDataSourceSchema) => void;

  /**
   * The schema contains all fields defined in the actual service, this method will return the fields
   * user configured in the data source/data view.
   */
  getSelectedFields: () => { [jimuName: string]: IMFieldSchema };

  /**
   * Fetch data schema from an actual data source. If it's a statistic data source, we won't fetch schema.
   */
  fetchSchema: () => Promise<IMDataSourceSchema>;

  getFetchedSchema: () => IMDataSourceSchema;
  setFetchedSchema: (schema: IMDataSourceSchema) => void;

  getStatus: () => DataSourceStatus;
  setStatus?: (status: DataSourceStatus) => void;

  getCountStatus: () => DataSourceStatus;
  setCountStatus?: (status: DataSourceStatus) => void;

  getVersion: () => number;
  addVersion?: () => void;

  getIdField: () => string;

  destroy: () => void;

  /**
   * Ready is resolved means the data source instance is ready for use.
   */
  ready: () => Promise<void | any>;

  getInfo: () => IMDataSourceInfo;

  /**
   * Return null means the data source is a non-spatial data source.
   * @ignore
   */
  getGeometryType: () => GeometryType;

  /**
   * For most of the widget output data source, it has an original data source from which it's generated.
   * For the configured data source, return null.
   * @ignore
   */
  getOriginDataSources?: () => DataSource[];

  /**
   * Return the derived data views and local data sources.
   */
  getAllDerivedDataSources: () => DataSource[];

  /**
   * Selecting records through URL parameters may cause the selected records not in data source's selection view (data source's records).
   * Call this method will make sure the selected records by URL are in data source's selection view (data source's records)
   */
  makeSureSelectedRecords: () => Promise<void>;
}

/**
 * `QueriableDataSource` extends `DataSource` and add query capability. A queriable data source must
 * have an `URL` to execute the query.
 *
 * The current default query implementation supports pagination. It allows mulitple widgets to apply queries on the same data source,
 * all of which are merged by using the `AND` logic operator.
 *
 * When execute a query, in addition to the passed in query parameters, all configured queries and
 * all other widgets applied queries are merged by using the `AND` logic operator.
 *
 * When a query is executed against a data view, the query from its main data source is used as well.
 */
export interface QueriableDataSource extends DataSource {
  url: string;
  lastUpdateTime: Date;

  /**
   * Execute the query against the service and update the internal data records, pagination is supported.
   * When call this method, the real query is returnd by `getRealQueryParams`.
   *
   * Pagination:
   * The pagination properties in the passed in query parameter may be not the same as the real query pagination that is sent to the service.
   * The real query pagination is defined in the data source setting.
   *
   * @param query is the widget's query.
   */
  load(query: QueryParams, options?: QueryOptions): Promise<DataRecord[]>;

  /**
   * Load record by id, do not consider other queries.
   * @param id
   */
  loadById(id: string, refresh?: boolean): Promise<DataRecord>;

  /** Load the records count. */
  loadCount(query: QueryParams, options?: QueryOptions): Promise<number>;

  /**
   * Update the data source query without executing the actual query.
   */
  updateQueryParams(query: QueryParams, widgetId: string): void;

  /**
   * Get the current query parameters. The current query parameters contain all applied queries.
   */
  getCurrentQueryParams(excludeOption?: WidgetDataSourcePair): QueryParams;
  getCurrentQueryId(): string;

  /** Get the queries applied in runtime. If the excludeWidgetId is passed in, the queries of this widget will be excluded.*/
  getRuntimeQueryParams(excludeWidgetId?: string): QueryParams;
  /**
   * Get the user config query parameters.
   */
  getConfigQueryParams(): QueryParams;

  /** Get the query parameters configured in remote (not in exb). */
  getRemoteQueryParams(): QueryParams;

  /**
   * Merge the new query to base query by using `AND`, and return the merged result.
   * If any query is undefined/null, it will be ignored.
   * @param baseQuery
   * @param newQuery
   */
  mergeQueryParams(baseQuery: QueryParams, newQuery: QueryParams): QueryParams;

  /**
   * When do query/load, we do not fire the query request directly. Instead, we'll consider the data source's config/current query parameter.
   *  * For load: we'll merge the configured query parameter if it has, and all widget applied queries.
   *  * For query, we'll merge the current query parameter and the configured query parameter it has.
   *
   * @param query
   * @param flag
   * @param options
   */
  getRealQueryParams(query: QueryParams, flag: 'query' | 'load', options?: QueryOptions): QueryParams;

  /**
   * Execute query against the service only, do NOT update the internal data records.
   * The actural query parameters are generated by `getRealQueryParams`.
   *
   * To query count, please use `queryCount`.
   * @param query
   */
  query(query: QueryParams, options?: QueryOptions): Promise<QueryResult>;

  queryById(id: string): Promise<DataRecord>;

  queryCount(query: QueryParams, options?: QueryOptions): Promise<QueryResult>;

  /**
   * The page size here defines the records this method returns, which are not the actual query pageSize. Will use a fixed pageSize to query and cache data.
   */
  getRecordsByPage(page: number, pageSize: number): DataRecord[];

  getPagesData(): {[page: number]: DataRecord[]};
  setPagesData(pages: {[page: number]: DataRecord[]}): void;

  /**
   * Get real query page depends on the widget's request page.
   */
  getRealQueryPages(pageSize: number, page: number): number[];

  getQueryPageSize(): number;

  /**
   * Null means there is no record count limit, and will return all records from the service.
   */
  getMaxRecordCount(): number;

  addRecord?: (record: DataRecord) => Promise<DataRecord>;
  updateRecord?: (record: DataRecord) => Promise<DataRecord>;
  deleteRecord?: (index: number) => Promise<void>;

  // TODO add/update/delete multiple records
  /** @ignore */
  getSaveStatus: () => DataSourceStatus;
  /** @ignore */
  setSaveStatus?: (status: DataSourceStatus) => void;

  /** Override parent interface to get correct type. */
  getDataViews: () => QueriableDataSource[];
  getDataView: (dataViewId: string) => QueriableDataSource;
  getMainDataSource: () => QueriableDataSource;

  /** If the return value > 0, auto refresh is enabled. */
  getAutoRefreshInterval: () => number;
  getLastRefreshTime: () => Date;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
}

/** @ignore */
export interface LoadableDataSource extends DataSource {
  url: string;

  /**
   * Load all data records.
   */
  load(): Promise<DataRecord[]>;
}

export interface DataSourceConstructorOptions {
  /** The data source id. */
  id: string;

  /**
   * dataSourceJson or belongToDataSource is either-or option.
   * Pass dataSourceJson will create a main data source.
   * Pass belongToDataSource will create data view or local data source.
   */
  dataSourceJson?: IMDataSourceJson;

  /** Data source that the to-be-created data source belongs to. */
  belongToDataSource?: DataSource;

  /**
   * If dataViewId exists, a data view will be created.
   */
  dataViewId?: string;

  /**
   * if localId exists, a local data source will be created.
   */
  localId?: string;

  dataSourceManager?: DataSourceManager;

  parentDataSource?: DataSource;
  jimuChildId?: string;
}

/**
 * @ignore
 */
export class DataSourceError extends Error {
  dataSourceId: string;
  constructor(id, message){
    super(message);
    this.dataSourceId = id;
  }
}

/** @ignore */
export interface CodedValue{
  value: string | number;
  label: string;
}

/************************************************************* Data sources ***********************************************/

export interface FeatureDataRecord extends DataRecord{
  feature: IFeature | __esri.Graphic;
  dataSource: FeatureLayerDataSource | FeatureSetDataSource | SceneLayerDataSource;
  attachmentInfos: AttachmentInfo[];
  queryAttachments: (attachmentTypes?: string[]) => Promise<AttachmentInfo[]>;
  getSymbolPreviewHTML: () => Promise<HTMLElement>;
  getData: () => {[key: string]: any};
  getFormattedFieldValue: (jimuFieldName: string, intl: IntlShape) => string;
  getDataBeforeMapping: () => {[key: string]: any};
  getOriginData: () => {[key: string]: any};
  toJson: () => IFeature | __esri.Graphic;
  getId: () => string;
  setId: (id: string) => void;
  getGeometry: () => Geometry;
}

export interface SimpleLocalDataSource extends DataSource{
  type: DataSourceTypes.SimpleLocal;
  updateAllRecoreds: (records: DataRecord[]) => void;
  addRecord: (record: DataRecord) => DataRecord;
  updateRecord: (record: DataRecord) => void;
  deleteRecord: (index: number) => void;
}
export interface CsvDataSource extends LoadableDataSource{
  type: DataSourceTypes.CSV;
  doLoad: () => Promise<DataRecord[]>;
}

interface FeatureLayerGDBVersion{
  getGDBVersion: () => string;
  changeGDBVersion: (gdbVersion: string) => void;
}
export interface FeatureLayerDataSource extends QueriableDataSource, FeatureLayerGDBVersion{
  type: DataSourceTypes.FeatureLayer;
  url: string;
  jimuFeatureLayerViews?: {[jimuFeatureLayerViewId: string]: JimuFeatureLayerView};
  portalUrl?: string;
  itemId?: string;
  layerId?: string;
  layer?: __esri.FeatureLayer;
  load(query: FeatureLayerQueryParams, options?: QueryOptions): Promise<DataRecord[]>;
  loadCount(query: FeatureLayerQueryParams, options?: QueryOptions): Promise<number>;
  query: (queryProperties: FeatureLayerQueryParams) => Promise<QueryResult>;
  queryCount: (queryProperties: FeatureLayerQueryParams) => Promise<QueryResult>;
  queryById: (id: string) => Promise<FeatureDataRecord>;
  selectRecordById: (id: string, record?: FeatureDataRecord) => void;
  selectRecordsByIds: (ids: string[], records?: FeatureDataRecord[]) => void;
  getIdField: () => string;
  getGeometryType: () => GeometryType;
  setJsonData: (data: (IFeature | __esri.Graphic)[]) => void;
  getConfigQueryParams: () => FeatureLayerQueryParams;
  mergeQueryParams: (baseQuery: FeatureLayerQueryParams, newQuery: FeatureLayerQueryParams) => FeatureLayerQueryParams;
  getRealQueryParams: (query, flag: 'query' | 'load', options?: QueryOptions) => FeatureLayerQueryParams;
  addRecord: (record: FeatureDataRecord) => Promise<FeatureDataRecord>;
  fetchSchema: () => Promise<IMDataSourceSchema>;
  getLayerDefinition: () => ServiceDefinition;
  getFieldCodedValueList: (jimuFieldName: string, record?: FeatureDataRecord) => CodedValue[];
  getRootLayerDataSource: () => DataSource;
  getOriginalDataId: () => string | number;
  setAssociatedDataSource: (associatedDataSource: SceneLayerDataSource) => void;
  getAssociatedDataSource: () => SceneLayerDataSource;
}

export interface FeatureSetDataSource extends DataSource{
  type: DataSourceTypes.FeatureSet;
  getIdField: () => string;
  setJsonData: (data: (IFeature | __esri.Graphic)[]) => void;
  addRecord: (record: FeatureDataRecord) => void;
}

export interface GroupLayerDataSource extends DataSource{
  type: DataSourceTypes.GroupLayer;
  layer?: __esri.GroupLayer | __esri.Sublayer;
  getServiceDefinition: () => ServiceDefinition;
  getOriginalDataId: () => string | number;
}

export interface FeatureServiceDataSource extends DataSource{
  type: DataSourceTypes.FeatureService;
  getServiceDefinition: () => ServiceDefinition;
  getOriginalDataId: () => string | number;
}

export interface MapServiceDataSource extends DataSource{
  type: DataSourceTypes.MapService;
  layer?: __esri.MapImageLayer | __esri.TileLayer;
  getServiceDefinition: () => ServiceDefinition;
  getOriginalDataId: () => string | number;
}

export interface SceneServiceDataSource extends DataSource{
  type: DataSourceTypes.SceneService;
  getServiceDefinition: () => ServiceDefinition;
}

export interface SceneLayerDataSource extends Omit<FeatureLayerDataSource, 'type' | 'layer' | 'getAssociatedDataSource' | 'setAssociatedDataSource'>{
  type: DataSourceTypes.SceneLayer;
  getAssociatedDataSource: () => FeatureLayerDataSource;
  layer?: __esri.SceneLayer;
}

/**
 * @ignore
 * @deprecated
 */
export interface FeatureQueryDataSource extends FeatureLayerDataSource{}

/************************************************************* Data sources ***********************************************/
