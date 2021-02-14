/// <reference types="seamless-immutable" />
import { AbstractSetDataSource, DataSourceConstructorOptions, LayerFolderDataSourceConstructorOptions, DataSourceTypes as JimuCoreDataSourceTypes, FeatureLayerDataSourceConstructorOptions, SceneLayerDataSourceConstructorOptions } from 'jimu-core/data-source';
import { IMDataSourceJson, Immutable, DataSource } from 'jimu-core';
import { DataSourceTypes, MapDataSource, MapChildDataSource } from '../arcgis-data-source-interface';
export interface MapDataSourceConstructorOptions extends DataSourceConstructorOptions {
    map?: __esri.Map;
}
export declare class MapDataSourceImpl extends AbstractSetDataSource implements MapDataSource {
    type: DataSourceTypes.Map | DataSourceTypes.WebMap | DataSourceTypes.WebScene;
    map: __esri.Map;
    protected _childDataSourcesPromise: Promise<MapChildDataSource[]>;
    Map: typeof __esri.Map;
    FeatureLayer: typeof __esri.FeatureLayer;
    constructor(options: MapDataSourceConstructorOptions);
    ready(): Promise<MapChildDataSource[]>;
    fetchSchema(): Promise<Immutable.ImmutableObject<import("jimu-core").DataSourceSchema>>;
    /**
     * Find data source with a specific layer.
     * The specific layer can be direct child layer of the map or descendant layer of the map.
     *
     * @param layerId layer id of the specific layer
     * @param layerUrl layer url of the specific layer, with layerId in then end (e.g. https://xxx/arcgis/rest/services/xxx/MapServer/1).
     * @param rootLayerId layer id of the root layer, root layer is the direct child layer of the map, at the same time, is the ancestor layer of the specific layer.
     *
     * For example, we have a map which has a map service layer A and we want to get the data source with feature layer B (B is a sublayer of the map service layer),
     * we should call `mapDataSource.getDataSourceByLayer(idOfLayerB, urlOfLayerB, idOfLayerA)`.
     *
     * We need root layer id because:
     * 1. A map can add one same service as layer multiple times and we need to get the unique root layer by id.
     * 2. Sublayers under one service can not have duplicated id or url.
     *
     */
    getDataSourceByLayer(layerId: string, layerUrl: string, rootLayerId: string): DataSource;
    /**
     * Return all descendant data sources with specific data source type.
     */
    getDataSourcesByType(type: JimuCoreDataSourceTypes | DataSourceTypes): DataSource[];
    protected _createChildDataSources(): Promise<MapChildDataSource[]>;
    protected _getFixedLayerId(layer: __esri.Layer, ds?: DataSource): string;
    protected _deepSearchDataSourceByLayer(dataSource: DataSource, layerId: string, layerUrl: string): DataSource;
    protected _traverseToGetDataSourcesByType(type: JimuCoreDataSourceTypes | DataSourceTypes, dataSource: DataSource, dataSourcesWithSpecificType: DataSource[]): void;
    protected _traverseToCreateLayerForDataSource(dataSource: DataSource, newLayers: __esri.Layer[]): void;
    protected _getWhetherNeedToCreateLayer(dataSource: DataSource): boolean;
    protected _isDataSourceWithLayer(dataSource: DataSource, layerId: string, layerUrl: string): boolean;
    protected _createMap(): void;
    /**
     * If get data source options from table, will not pass `layer`.
     */
    protected _getDataSourceConstructorOptions(id: string, url: string, dsJsonInConfig: IMDataSourceJson, layer?: __esri.Layer): Promise<(LayerFolderDataSourceConstructorOptions | FeatureLayerDataSourceConstructorOptions | SceneLayerDataSourceConstructorOptions)[]>;
}
