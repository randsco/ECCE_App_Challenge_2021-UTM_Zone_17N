/// <reference types="seamless-immutable" />
import { IMDataSourceJson, Immutable, ServiceDefinition } from 'jimu-core';
import { DataSource, DataSourceConstructorOptions } from '../data-source-interface';
import { AbstractSetDataSource } from './abstract-set-data-source';
/**
 * Layer from ArcGIS JS API, which may contain sublayers.
 */
export declare type FolderLayer = __esri.MapImageLayer | __esri.TileLayer | __esri.GroupLayer | __esri.Sublayer;
export interface LayerFolderDataSourceConstructorOptions extends DataSourceConstructorOptions {
    layer?: FolderLayer;
}
/**
 * Data source which contains multiple layers, like a layer folder,
 * please see {@link SupportedLayerServiceTypes} to find supported layer service types.
 */
export declare abstract class AbstractLayerFolderDataSource extends AbstractSetDataSource {
    private serviceDefinition;
    layer?: FolderLayer;
    constructor(options: LayerFolderDataSourceConstructorOptions);
    ready(): Promise<DataSource[]>;
    getServiceDefinition(): ServiceDefinition;
    protected _createChildDataSources(): Promise<DataSource[]>;
    private _loadLayer;
    fetchSchema(): Promise<Immutable.ImmutableObject<import("jimu-core").DataSourceSchema>>;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    getSubLayers(): (__esri.Sublayer | __esri.Layer)[];
    getOriginalDataId(): string | number;
    protected _getWhetherLayerIsSupported(layer: __esri.Layer | __esri.Sublayer, layerDefinition: ServiceDefinition): boolean;
    protected _fetchLayerDefinitionFromSubLayer(subLayer: __esri.Sublayer | __esri.Layer): Promise<ServiceDefinition>;
    protected _getDsJsonsFromSupportedLayers(res: {
        def: ServiceDefinition;
        url?: string;
        layer?: __esri.Layer | __esri.Sublayer;
    }[], dsJsonInConfig: IMDataSourceJson): {
        dsJson: IMDataSourceJson;
        layer?: __esri.Sublayer | __esri.Layer;
    }[];
    protected _getDsJsonsFromSingleLayerDefinition(url: string, layerDefinition: ServiceDefinition, dsJsonInConfig: IMDataSourceJson): IMDataSourceJson[];
    protected _getDsJsonsFromSingleLayer(layer: __esri.Layer | __esri.Sublayer, dsJsonInConfig: IMDataSourceJson): IMDataSourceJson[];
    /**
     * The function is used to generate jimuChildId from JS API layer object or layer definiton fetched from Rest API.
     * So please pass in one of the two parameters and left the other null.
     *
     * jimuChildId is the id to distinguish between different child data sources in a parent data source.
     * Besides jimuChildId, every child data source has a data source id, which consists of parent data source id and jimuChildId.
     *
     * jimuChildId is generated from original data (kinds of items and services in online/portal).
     * If consider data source mapping, the jimuChildId will not change after mapping. It will be the same as when the data source was added for the first time.
     *
     * The rules to generate jimuChildId is as following function:
     * 1. if pass in a JS API layer, will prioritize the use of layer's id as jimuChildId
     * 2. if pass in a layer definition, will prioritize the use of layer definition's name as jimuChildId
     *
     * For example:
     * 1. Pass in JS API layer and id of the layer is 'world cities 123', parent data source of the layer data source is ds1,
     *    jimuChildId will be 'world_cities_123', data source id of the layer data source will be 'ds1-world_cities_123'.
     * 2. Pass in layer definition and id of the definition is 0 and name of the definition is 'wild fires 456', parent data source of the layer data source is ds1,
     *    jimuChildId will be 'wild_fires_456', data source id of the layer data source will be 'ds1-wild_fires_456'.
     */
    private _getJimuChildIdByJSAPILayerOrLayerDefinition;
}
