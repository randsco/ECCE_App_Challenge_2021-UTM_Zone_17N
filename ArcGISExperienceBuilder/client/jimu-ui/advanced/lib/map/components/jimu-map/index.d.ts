/// <reference types="react" />
import { React, UseDataSource, ImmutableArray, AppMode, IntlShape } from 'jimu-core';
import MultiSourceMap from './components/multisourcemap';
import { JimuMapView, JimuMapViewGroup, JimuMapClass } from 'jimu-arcgis';
import { InitialMapState, ToolConfig, IMJimuMapConfig } from './config';
export { InitialMapState, ToolConfig, IMJimuMapConfig };
export interface JimuMapProps {
    className?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    jimuMapConfig?: IMJimuMapConfig;
    id: string;
    appMode?: AppMode;
    intl?: IntlShape;
    onViewPointChanged?: (viewPoint: __esri.Viewpoint) => void;
    onExtentChanged?: (extent: __esri.Extent) => void;
    onActiveViewChange?: (activeView: JimuMapView) => void;
    onViewGroupCreate?: (viewGroup: JimuMapViewGroup) => void;
}
interface States {
    startLoadModules: boolean;
}
export declare class __JimuMap extends React.PureComponent<JimuMapProps, States> implements JimuMapClass {
    parentContainer: HTMLElement;
    container: HTMLElement;
    containerClientRect: ClientRect | DOMRect;
    multiSourceMapInstance: MultiSourceMap;
    constructor(props: any);
    startRenderMap: () => void;
    componentDidMount(): void;
    getPlaceHolderImage: () => string;
    fullScreenMap: () => void;
    handleViewGroupCreate: (viewGroup: JimuMapViewGroup) => void;
    switchMap: () => Promise<any>;
    setMultiSourceMapInstance: (instance: MultiSourceMap) => void;
    render(): JSX.Element;
}
export declare const JimuMap: React.ComponentType<Pick<import("react-intl").WithIntlProps<any>, string | number | symbol> & JimuMapProps>;
