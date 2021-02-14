import { SceneLayerDataSource, IMDataSourceInfo, FeatureLayerQueryParams, FeatureDataRecord } from 'jimu-core';
import { JimuLayerView, JimuLayerViewConstructorOptions } from './jimu-layer-view';
/** @ignore */
export interface JimuSceneLayerViewOptions extends JimuLayerViewConstructorOptions {
    view: __esri.SceneLayerView;
}
/**
 * The JimuSceneLayerView extends from the JimuLayerView.
 */
export declare class JimuSceneLayerView extends JimuLayerView {
    /**
     * The view is __esri.SceneLayerView.
     */
    view: __esri.SceneLayerView;
    /** @ignore */
    highLightHandle: any;
    /** @ignore */
    updateWatchHandle: any;
    /** @ignore */
    features: __esri.Graphic[];
    /** @ignore */
    isReservePopup: boolean;
    /** @ignore */
    selectedIds: string;
    /** @ignore */
    localDefinitionExpression: string;
    constructor(options: JimuSceneLayerViewOptions);
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
    getLayerDataSource(): SceneLayerDataSource;
    /** @ignore */
    selectRecordsByQuery(query: FeatureLayerQueryParams): Promise<__esri.Graphic[]>;
    /** @ignore */
    getObjectIdField(fields: __esri.Field[], objectIdFieldName: string): __esri.Field;
}
