import { IMDataSourceInfo, DataSource, DataSourceJson } from 'jimu-core';
/** @ignore */
export interface JimuLayerViewConstructorOptions {
    view: __esri.LayerView;
    type: string;
    layerDataSourceId: string;
    jimuMapViewId: string;
    jimuLayerId: string;
    rootJimuLayerId: string;
    layer: any;
    layerIndex: number;
    parentJimuLayerViewId: string;
}
/**
 * The base class JimuLayerView.
 */
export declare class JimuLayerView {
    /**
     * The id of the JimuLayerView instance.
     */
    id: string;
    /**
     * The view is __esri.LayerView.
     */
    view: __esri.LayerView;
    /** @ignore */
    type: string;
    /**
     * The layerDataSourceId is the corresponding datasource id.
     */
    layerDataSourceId: string;
    /**
     * The jimuMapViewId is the corresponding JimuMapView instance id.
     */
    jimuMapViewId: string;
    /** @ignore */
    jimuLayerId: string;
    /**
     * The layer is the corresponding layer object in ArcGIS JavaScript API View.map.
     */
    layer: any;
    /** @ignore */
    layerIndex?: number;
    /** @ignore */
    parentJimuLayerViewId: string;
    /** @ignore */
    private dataSourceInfoObserver;
    /** @ignore */
    private layerDataSourceJsonObserver;
    /** @ignore */
    private runTimeIsHidden;
    constructor(options: JimuLayerViewConstructorOptions);
    /** @ignore */
    onLayerDataSourceInfoChange(preDsInfo: IMDataSourceInfo, dsInfo: IMDataSourceInfo): void;
    /** @ignore */
    onLayerDatasourceJsonChange(preDsJson: DataSourceJson, dsJson: DataSourceJson): void;
    /** @ignore */
    getLayerDataSource(): DataSource;
    /** @ignore */
    selectFeaturesByIds(ids: string[]): void;
    selectFeatureById(id: string): void;
    /**
     * Destroy the JimuLayerView instance.
     */
    destroy(): void;
}
