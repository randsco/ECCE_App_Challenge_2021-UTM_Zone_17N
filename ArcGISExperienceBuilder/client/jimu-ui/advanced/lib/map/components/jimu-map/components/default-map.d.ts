/// <reference types="react" />
import { React } from 'jimu-core';
import { JimuMapProps } from '../index';
import MultiSourceMap from './multisourcemap';
import { JimuMapViewGroup, DefaultMapInfo, JimuMapView } from 'jimu-arcgis';
interface Props {
    baseWidgetProps: JimuMapProps;
    startLoadModules: boolean;
    fullScreenMap: () => void;
    isDefaultMap?: boolean;
    setMultiSourceMapInstance: (instance: MultiSourceMap) => void;
    onViewPointChanged?: (viewPoint: __esri.Viewpoint) => void;
    onExtentChanged?: (extent: __esri.Extent) => void;
    onActiveViewChange?: (activeView: JimuMapView) => void;
    onViewGroupCreate?: (viewGroup: JimuMapViewGroup) => void;
}
interface State {
    defaultMapInfo: DefaultMapInfo;
}
export default class DefaultMap extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
