import { JimuMapView, JimuMapViewConstructorOptions } from './views/jimu-map-view';
import { JimuMapViewGroup } from './views/jimu-map-view-group';
/**
 * The `MapViewManager` is used to manage jimumapview, including create/get/set/destroy jimumapview instance.
 * Please always use `MapViewManager.getInstance()` to use this class. For example, to get a jimumapview, you can use `MapViewManager.getInstance().getJimuMapViewById(dsId)`
 * For widget developer, `MapViewManager.getInstance()` in both of the widget and widget's setting return the same instance.
 *
 * To use jimumapview, the recommended way is to use `JimuMapViewComponent`, which is more easy to use.
 */
export declare class MapViewManager {
    static _instance: MapViewManager;
    static getInstance(): MapViewManager;
    /** @ignore */
    private jimuMapViewGroups;
    /**
     * Return the jimumapview instance by id
     */
    getJimuMapViewById(id: string): JimuMapView;
    /** @ignore */
    getJimuMapViewGroup(mapWidgetId: string): JimuMapViewGroup;
    /**
     * When start to create the jimumapview instance, this method will set the jimumapview instance status as `LOADING` first,
     * after the create process is done, set the status as `LOADED`, if an error occurs, set the status as `FAILED`.
     */
    createJimuMapView(jimuMapViewConstructorOptions: JimuMapViewConstructorOptions): Promise<JimuMapView>;
    /** @ignore */
    addJimuMapView(jimuMapView: JimuMapView): void;
    /**
     * update the jimumapview instance
     */
    setJimuMapView(jimuMapView: JimuMapView): void;
    /**
     * destroy the jimumapview instance by id,
     */
    destroyJimuMapView(jimuMapViewId: string): void;
}
