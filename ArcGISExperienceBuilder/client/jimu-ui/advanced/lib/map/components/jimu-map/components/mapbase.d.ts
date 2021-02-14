/// <reference types="react" />
import { React, DataSourceManager, ExtentChangeMessage, ImmutableObject } from 'jimu-core';
import { IMJimuMapConfig, InitialMapState } from '../config';
import { MapDataSource } from 'jimu-arcgis/arcgis-data-source';
import { JimuMapView, DefaultMapInfo } from 'jimu-arcgis';
import { JimuMapProps } from '../index';
interface Props {
    isDefaultMap?: boolean;
    baseWidgetProps: JimuMapProps;
    startLoadModules: boolean;
    dataSourceId: string;
    defaultMapInfo?: DefaultMapInfo;
    onViewChanged?: (shareViewPoint: ShareViewPoint) => void;
    onMutableStatePropsChanged?: (dataSourceId: string, propKey: string, value?: any) => void;
    onExtentChanged?: (dataSourceId: string, message: ExtentChangeMessage) => void;
    onMapLoaded?: (dataSourceId: string, mapLoadStatus: MapLoadStatus) => void;
    onJimuMapViewCreated?: () => void;
}
export interface ShareViewPoint {
    dataSourceId: string;
    viewpoint: __esri.Viewpoint;
}
export declare enum MapLoadStatus {
    Loading = "LOADING",
    Loadok = "LOADOK",
    LoadError = "LOADERROR"
}
export interface HighLightHandle {
    layerId: string;
    handle: __esri.Handle;
}
interface State {
    dataSourceId: string;
    mapDs?: MapDataSource;
    preMapDs?: MapDataSource;
    isModulesLoaded?: boolean;
    mapLoadStatus?: MapLoadStatus;
    mapBaseJimuMapView: JimuMapView;
    widthBreakpoint: string;
    widgetHeight: number;
}
export default class MapBase extends React.PureComponent<Props, State> {
    mapContainer: HTMLDivElement;
    widgetContainer: HTMLDivElement;
    Geometry: typeof __esri.Geometry;
    InitialViewProperties: typeof __esri.InitialViewProperties;
    TileLayer: typeof __esri.TileLayer;
    Basemap: typeof __esri.Basemap;
    MapView: typeof __esri.MapView;
    SceneView: typeof __esri.SceneView;
    Extent: typeof __esri.geometry.Extent;
    Viewpoint: typeof __esri.Viewpoint;
    PortalItem: typeof __esri.PortalItem;
    Portal: typeof __esri.Portal;
    WebMap: typeof __esri.WebMap;
    WebScene: typeof __esri.WebScene;
    mapView: __esri.MapView;
    sceneView: __esri.SceneView;
    extentWatch: __esri.WatchHandle;
    highLightHandles: {
        [layerId: string]: __esri.Handle;
    };
    mapBaseViewEventHandles: {
        [eventName: string]: __esri.Handle;
    };
    dsManager: DataSourceManager;
    onExtented: any;
    isReceiveExtentChange: boolean;
    constructor(props: any);
    startRenderMap: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    analysisMapView: () => Promise<void>;
    analysisSceneView: () => Promise<void>;
    static getDerivedStateFromProps(nextProps: Props, prevState: State): {
        dataSourceId: string;
        mapLoadStatus: MapLoadStatus;
    };
    componentWillUnmount(): void;
    generateViewPointFromInitialMapState: (initialMapState: ImmutableObject<InitialMapState>) => __esri.Viewpoint;
    cloneMap: (dataSource: MapDataSource) => __esri.WebMap | __esri.WebScene;
    getInitViewPointForDefaultWebMap: () => __esri.Viewpoint;
    getDefaultWebMap: () => __esri.WebMap;
    initMapView: () => void;
    initSceneView: () => void;
    updateMapView: (config: IMJimuMapConfig) => void;
    updateSceneView: (config: IMJimuMapConfig) => void;
    bindMapBaseViewEvent: (mapBaseView: __esri.MapView | __esri.SceneView) => void;
    getMapDsId: () => string;
    onDataSourceCreated: (dataSource: MapDataSource) => void;
    onCreateDataSourceFailed: (err: any) => void;
    setViewPoint: (viewPoint: any) => void;
    getMapLoadStatus: () => MapLoadStatus;
    getViewPoint: () => __esri.Viewpoint;
    getViewType: () => string;
    goToTilt: (tilt: any) => void;
    goHome: (useAmination?: boolean) => Promise<any>;
    getMapBaseInitViewPoint: () => __esri.Viewpoint;
    formatMessage: (id: string) => string;
    handleDisableWheel: () => void;
    getLayoutConfig: () => import("../layout/config").LayoutJson;
    onResize: (width: any, height: any) => void;
    getMapSwitchForErrorMap: () => JSX.Element;
    render(): JSX.Element;
}
export {};
