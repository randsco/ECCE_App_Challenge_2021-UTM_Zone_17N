import { FeatureLayerDataSource, IMDataSourceInfo, FeatureLayerQueryParams, FeatureDataRecord } from 'jimu-core';
import { JimuLayerView, JimuLayerViewConstructorOptions } from './jimu-layer-view';
/** @ignore */
export interface JimuFeatureLayerViewOptions extends JimuLayerViewConstructorOptions {
    view: __esri.FeatureLayerView;
}
/**
 * The JimuFeatureLayerView extends from the JimuLayerView.
 */
export declare class JimuFeatureLayerView extends JimuLayerView {
    /**
     * The view is __esri.FeatureLayerView.
     * If the layer is from mapservice, view = null
     */
    view: __esri.FeatureLayerView;
    /** @ignore */
    highLightHandle: any;
    /** @ignore */
    updateWatchHandle: any;
    /** @ignore */
    features: __esri.Graphic[];
    /** @ignore */
    isReservePopup: boolean;
    /**
     * @ignore
     * virtualLayer is used highlight layer in mapservice
     */
    virtualLayer: __esri.FeatureLayer;
    /** @ignore */
    selectedIds: string;
    /** @ignore */
    localDefinitionExpression: string;
    /** @ignore */
    originalGdbVersion: any;
    /** @ignore */
    private appModeObserver;
    constructor(options: JimuFeatureLayerViewOptions);
    /**
     * @ignore
     * this queries from client
     * @param query
     */
    doQuery(query: any): Promise<__esri.Graphic[]>;
    /** @ignore */
    doQueryById(id: string): Promise<__esri.Graphic>;
    /** @ignore */
    mergeQuery(baseQuery: __esri.Query | __esri.QueryProperties, newQuery: __esri.Query | __esri.QueryProperties): __esri.Query | __esri.QueryProperties;
    setRefreshIntervalForLayer(refreshInterval: number): void;
    /** @ignore */
    setDefinitionExpressionForLayer(query: FeatureLayerQueryParams): void;
    /** @ignore */
    setLocalDefinitionExpression(localDefinitionExpression: string): void;
    /** @ignore */
    highLightSelectedFeatures(): void;
    /** @ignore */
    highLightSelectedFeaturesWithVirtualLayer(): void;
    /** @ignore */
    highLightFeatures(features: __esri.Graphic[] | number[]): void;
    /** @ignore */
    clearHighLight(): void;
    /** @ignore */
    selectFeatureById(id: string, record?: FeatureDataRecord): void;
    /** @ignore */
    selectFeaturesByIds(ids: string[], records?: FeatureDataRecord[]): void;
    /** @ignore */
    onAppModeInfoChange(preDsInfo: IMDataSourceInfo, dsInfo: IMDataSourceInfo): void;
    /** @ignore */
    onLayerDataSourceInfoChange(preDsInfo: IMDataSourceInfo, dsInfo: IMDataSourceInfo): void;
    /** @ignore */
    getViewForMap(): __esri.MapView | __esri.SceneView;
    /** @ignore */
    handleFeatureNavigationAtPopUp(id: string): void;
    /** @ignore */
    moveFeatureToCenter(id: string): Promise<void>;
    /** @ignore */
    getCenterPoint(geometry: __esri.Geometry): __esri.Point;
    /** @ignore */
    getSelectedRecordIds(): string[];
    /** @ignore */
    getIdField(): string;
    /** @ignore */
    getLayerDataSource(): FeatureLayerDataSource;
    /** @ignore */
    selectRecordsByQuery(query: FeatureLayerQueryParams): Promise<__esri.Graphic[]>;
    /** @ignore */
    getObjectIdField(fields: __esri.Field[], objectIdFieldName: string): __esri.Field;
    /** @ignore */
    getRendererForVirtualLayer(geometryType: string): {
        type: string;
        symbol: {
            type: string;
            style: string;
            color: __esri.Color;
            size: string;
            outline: {
                color: __esri.Color;
                width: number;
            };
            width?: undefined;
            symbolLayers?: undefined;
        };
    } | {
        type: string;
        symbol: {
            type: string;
            color: __esri.Color;
            width: number;
            style: string;
            size?: undefined;
            outline?: undefined;
            symbolLayers?: undefined;
        };
    } | {
        type: string;
        symbol: {
            type: string;
            color: number[];
            style: string;
            outline: {
                color: __esri.Color;
                width: number;
            };
            size?: undefined;
            width?: undefined;
            symbolLayers?: undefined;
        };
    } | {
        type: string;
        symbol: {
            type: string;
            symbolLayers: {
                type: string;
                material: {
                    color: __esri.Color;
                };
            }[];
            style?: undefined;
            color?: undefined;
            size?: undefined;
            outline?: undefined;
            width?: undefined;
        };
    };
}
