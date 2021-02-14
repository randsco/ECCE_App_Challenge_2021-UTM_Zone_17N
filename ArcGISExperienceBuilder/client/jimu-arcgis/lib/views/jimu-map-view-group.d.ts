import { JimuMapView } from './jimu-map-view';
export declare type JimuMapClass = {
    switchMap: () => Promise<any>;
    fullScreenMap: () => void;
};
/** @ignore */
export declare class JimuMapViewGroup {
    mapWidgetId: string;
    jimuMapViews: {
        [id: string]: JimuMapView;
    };
    mapWidgetInstance: JimuMapClass;
    constructor(mapWidgetId: string);
    setMapWidgetInstance(mapWidgetInstance: JimuMapClass): void;
    addJimuMapView(jimuMapView: JimuMapView): void;
    setJimuMapView(jimuMapView: JimuMapView): void;
    removeJimuMapView(jimuMapView: JimuMapView): void;
    getActiveJimuMapView(): JimuMapView;
    switchMap: () => Promise<any>;
    fullScreenMap: () => void;
}
