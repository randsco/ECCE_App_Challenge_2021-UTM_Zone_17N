/// <reference types="react" />
import { React, ImmutableArray, ExtentChangeMessage, UseDataSource } from 'jimu-core';
import { MapLoadStatus, ShareViewPoint } from './mapbase';
import { JimuMapProps } from '../index';
import { JimuMapView, JimuMapViewGroup, DefaultMapInfo } from 'jimu-arcgis';
interface Props {
    baseWidgetProps: JimuMapProps;
    startLoadModules: boolean;
    fullScreenMap: () => void;
    isDefaultMap?: boolean;
    defaultMapInfo?: DefaultMapInfo;
    onViewPointChanged?: (viewPoint: __esri.Viewpoint) => void;
    onExtentChanged?: (extent: __esri.Extent) => void;
    onActiveViewChange?: (activeView: JimuMapView) => void;
    onViewGroupCreate?: (viewGroup: JimuMapViewGroup) => void;
}
interface MapContainerStyle {
    opacity: number;
    zIndex: number;
}
interface State {
    currentMapIndex?: 0 | 1;
    multiMapStyle?: MapContainerStyle[];
    firstMapDsId?: string;
    secondMapDsId?: string;
    useAnimation: boolean;
    useDataSources?: ImmutableArray<UseDataSource>;
    currentJimuMapView?: JimuMapView;
}
export default class MultiSourceMap extends React.PureComponent<Props, State> {
    isReIniting: boolean;
    mutableStatePropsMap: {
        [propKey: string]: string[];
    };
    useMapWidgetIds: ImmutableArray<string>;
    constructor(props: any);
    reInitWidgetInstance: (restoreData: any) => void;
    componentDidMount(): void;
    static getChangedState: (firstMapDsId: any, secondMapDsId: any, useDataSources: any) => State;
    static getDerivedStateFromProps(newProps: Props, prevState: State): State;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    changeInitialMapDataSourceID: (dataSourceId: string, callBack?: any) => void;
    startChangeInitialMapAnimation: (callBack?: any) => void;
    switchMap: () => Promise<any>;
    handleMutableStatePropsChanged: (dataSourceId: string, propKey: string, value?: any) => void;
    handleViewChanged: (shareViewPoint: ShareViewPoint) => void;
    handleExtentChanged: (dataSourceId: string, extentMessage: ExtentChangeMessage) => void;
    handleMapLoaded: (dataSourceId: string, mapLoadStatus: MapLoadStatus) => void;
    handleJimuMapViewCreated: () => void;
    confirmJimuMapViewIsActive: () => void;
    setActiveJimuMapView(jimuMapView: JimuMapView, isActive: boolean): void;
    isShowMapSwitchBtn: () => boolean;
    getCurrentVisibleDsId: () => string;
    handleViewGroupCreate: (viewGroup: JimuMapViewGroup) => void;
    render(): JSX.Element;
}
export {};
