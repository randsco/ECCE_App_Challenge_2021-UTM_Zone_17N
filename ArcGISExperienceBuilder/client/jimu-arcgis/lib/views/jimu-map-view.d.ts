import { JimuMapViewStatus, FeatureLayerQueryParams } from 'jimu-core';
import { JimuLayerView } from './layers/jimu-layer-view';
import { JimuFeatureLayerView } from './layers/jimu-feature-layer-view';
import { JimuSceneLayerView } from './layers/jimu-scene-layer-view';
/**
 * @ignore
 * JimuMapViewConstructorOptions is used in constructor of JimuMapView, to initiate a JimuMapView instance.
 */
export interface JimuMapViewConstructorOptions {
    /**
     * The widget id to create the JimuMapView instance.
     */
    mapWidgetId: string;
    /** @ignore */
    isActive?: boolean;
    /**
     * The id of the datasource selected to create the map.
     */
    datasourceId: string;
    /**
     * The view is arcgis api 4.x view, including __esri.MapView or __esri.SceneView.
     */
    view: __esri.MapView | __esri.SceneView;
    /** @ignore */
    isEnablePopup?: boolean;
}
/**
 * JimuMapView is the view for developers to develop the related map function.
 * For example, developers can use the view property of the JimuMapView instance to get the original arcgis api 4.x view, then use
 * the original view to develop the related map function. At the same time,
 * JimuMapView also provides properties such as `isActive`, `status`, etc. to indicate the current status in the map widget.
 */
export declare class JimuMapView {
    /**
     * The id of the JimuMapView instance.
     */
    id: string;
    /**
     * The id of the widget which creates the JimuMapView instance.
     */
    mapWidgetId: string;
    /**
     * The isActive property indicates whether the map in the map widget is accessible.
     * For example, for single-source map, isActive is always true;
     * for multi-source map, there are two JimuMapView instances in it.
     * The property isActive is true for the JimuMapView instance above, and false for the one beneath;
     * after clicking on the switch-map tool, the isActive properties will switch.
     */
    isActive?: boolean;
    /**
     * The id of the datasource selected to create the map.
     */
    datasourceId: string;
    /**
     * The view is arcgis api 4.x view, including __esri.MapView or __esri.SceneView.
     */
    view: __esri.MapView | __esri.SceneView;
    /**
     * The status for the JimuMapView instance.
     */
    status: JimuMapViewStatus;
    /**
     * The union for all JimuLayerView instances.
     */
    jimuLayerViews?: {
        [jimuLayerViewId: string]: JimuLayerView;
    };
    /**
     * @ignore
     * The max layer index in mapview.
     */
    maxLayerIndex?: number;
    /** @ignore */
    private jimuLayerViewLoadPromises;
    /** @ignore */
    private isEditing;
    /** @ignore */
    private isEnablePopup;
    /** @ignore */
    private isEnableHighlight;
    /** @ignore */
    private jimuMapViewLoadPromise;
    constructor(options: JimuMapViewConstructorOptions);
    /** @ignore */
    startEdit(): void;
    /** @ignore */
    exitEdit(): void;
    /** @ignore */
    getIsEditing(): boolean;
    /** @ignore */
    enablePopup(): void;
    /** @ignore */
    disablePopup(): void;
    /** @ignore */
    getIsEnablePopup(): boolean;
    /** @ignore */
    enableHighlight(): void;
    /** @ignore */
    disableHighlight(): void;
    /** @ignore */
    getIsEnableHighlight(): boolean;
    /** @ignore */
    setIsActive(isActive: boolean): void;
    /** @ignore */
    private initView;
    /** @ignore */
    private onClick;
    /** @ignore */
    private getJimuLayerViewId;
    /** @ignore */
    private clearAllJimuLayerViewsSelectRecord;
    /** @ignore */
    createJimuLayerViews(): Promise<JimuLayerView[]>;
    /** @ignore */
    private addJimuLayerView;
    /** @ignore */
    whenJimuMapViewLoaded(): Promise<JimuMapView>;
    /** @ignore */
    private whenAllJimuLayerViewsLoaded;
    /** @ignore */
    getParentLayerViews(jimuLayerViewId: any): JimuLayerView[];
    /** @ignore */
    findParentLayerView(parentJimuLayerViewId: string, parentLayerViews: JimuLayerView[]): void;
    /** @ignore */
    getChildLayerViews(jimuLayerViewId: any): JimuLayerView[];
    /** @ignore */
    findChildLayerView(parentJimuLayerViewId: string, childLayerViews: JimuLayerView[]): void;
    /** @ignore */
    updateMaxLayerIndex(): number;
    /** @ignore */
    createJimuLayerViewInlayersOfGroupLayer(layer: any, parentJimuLayerViewId: any, rootJimuLayerId: any, rootLayerId: any): void;
    /** @ignore */
    createJimuLayerViewInSublayersOfImageLayer(layer: any, parentJimuLayerViewId: any, rootJimuLayerId: any, rootLayerId: any): void;
    /** @ignore */
    getJimuLayerViewLoadPromiseById(jimuLayerViewId: string): Promise<JimuLayerView>;
    /** @ignore */
    clearSelectedFeatures: () => void;
    /** @ignore */
    selectFeaturesByGraphic(graphic: __esri.Graphic, spatialRelationship: string): Promise<any>;
    /** @ignore */
    getSelectRecordsByQueryPromise: (tempJimuFeatureLayerView: JimuFeatureLayerView | JimuSceneLayerView, query: FeatureLayerQueryParams) => Promise<__esri.Graphic[]>;
    /**
     * Destroy the JimuMapView instance, and also destroy the arcgis 4.x view at the same time.
     */
    destroy(): void;
}
