import { ServiceDefinition, IMDataSourceSchema } from 'jimu-core';
import { IFeature, GeometryType } from '@esri/arcgis-rest-types';
import { IQueryFeaturesOptions } from '@esri/arcgis-rest-feature-layer';
import { AbstractQueriableDataSource } from '../ds-base-types';
import { DataSourceConstructorOptions, DataSourceTypes, QueryResult, CodedValue, FeatureLayerDataSource, FeatureDataRecord, IMFeatureLayerQueryParams, FeatureLayerQueryParams, DataSource, QueryOptions, WidgetDataSourcePair, SceneLayerDataSource } from '../data-source-interface';
export interface FeatureLayerDataSourceConstructorOptions extends DataSourceConstructorOptions {
    layer?: __esri.FeatureLayer;
    associatedDataSource?: SceneLayerDataSource;
}
export declare class FeatureLayerDataSourceImpl extends AbstractQueriableDataSource implements FeatureLayerDataSource {
    portalUrl?: string;
    itemId?: string;
    layerId?: string;
    layer?: __esri.FeatureLayer;
    private layerDefinition;
    private associatedDataSource;
    type: DataSourceTypes.FeatureLayer;
    createFeatureLayerPromise: Promise<__esri.FeatureLayer>;
    constructor(options: FeatureLayerDataSourceConstructorOptions);
    setAssociatedDataSource(associatedDataSource: SceneLayerDataSource): void;
    getAssociatedDataSource(): SceneLayerDataSource;
    getIdField(): string;
    getGeometryType(): GeometryType;
    setJsonData(data: (IFeature | __esri.Graphic)[]): void;
    doQuery(queryProperties: IMFeatureLayerQueryParams): Promise<QueryResult>;
    doQueryCount(queryProperties: IMFeatureLayerQueryParams): Promise<QueryResult>;
    private _doQueryCountByLayer;
    private _doQueryCountByUrl;
    doQueryById(id: string): Promise<FeatureDataRecord>;
    queryById(id: string): Promise<FeatureDataRecord>;
    getConfigQueryParams(): FeatureLayerQueryParams;
    mergeQueryParams(baseQuery: FeatureLayerQueryParams, newQuery: FeatureLayerQueryParams): FeatureLayerQueryParams;
    getCurrentQueryParams(excludeOption?: WidgetDataSourcePair): FeatureLayerQueryParams;
    getRealQueryParams(query: any, flag: 'query' | 'load', options?: QueryOptions): FeatureLayerQueryParams;
    getRemoteQueryParams(): FeatureLayerQueryParams;
    private applyGDBVersionAndFix;
    /**
     * Some query params are not supported according to the feature service capability, we'll fix it here.
     */
    fixQueryParam(q: IMFeatureLayerQueryParams): IMFeatureLayerQueryParams;
    addRecord(record: FeatureDataRecord): Promise<FeatureDataRecord>;
    fetchSchema(): Promise<IMDataSourceSchema>;
    private createFeatureLayer;
    private fetchSchemaWithoutLayer;
    private fetchSchemaWithLayer;
    private updateLayerDefinitionByLayer;
    getLayerDefinition(): ServiceDefinition;
    getFieldCodedValueList(jimuFieldName: string, record?: FeatureDataRecord): CodedValue[];
    getGDBVersion(): string;
    changeGDBVersion(gdbVersion: string): void;
    /**
     * Return data source which original data is a root layer in webmap/webscene or a root serivce.
     * Root service is a whole service rather than a single layer under the service, such as https://sampleserver6.arcgisonline.com/arcgis/rest/services/911CallsHotspot/MapServer .
     */
    getRootLayerDataSource(): DataSource;
    getOriginalDataId(): string | number;
    private _getUpdatedLayerDefinition;
    private _getOrderByArray;
    /**
     * Convert IMFeatureLayerQueryParams to IQueryFeaturesOptions, to query features by service url.
     */
    changeJimuQueryToRestJSQuery(queryProperties: IMFeatureLayerQueryParams): IQueryFeaturesOptions;
    /**
     * Convert IMFeatureLayerQueryParams to __esri.Query | __esri.QueryProperties, to query features by layer (instance of ArcGIS JS API FeatureLayer class).
     */
    changeJimuQueryToJSAPILayerQuery(queryProperties: IMFeatureLayerQueryParams): Promise<__esri.Query | __esri.QueryProperties>;
    private _doQueryByUrl;
    private _doQueryByLayer;
    private _q;
}
