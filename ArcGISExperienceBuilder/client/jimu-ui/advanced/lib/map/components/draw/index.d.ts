/// <reference types="react" />
import { React, ResizeObserver, IntlShape } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
export declare type DrawToolClass = {
    sketch: __esri.Sketch;
    complete: () => Promise<void>;
};
export declare enum CreateToolType {
    Point = "point",
    Polyline = "polyline",
    Polygon = "polygon",
    Rectangle = "rectangle",
    Circle = "circle"
}
export interface DrawProps {
    intl?: IntlShape;
    className?: string;
    jimuMapView: JimuMapView;
    layer?: __esri.GraphicsLayer | __esri.FeatureLayer;
    availableCreateTools?: CreateToolType[];
    creationMode?: 'single' | 'continuous' | 'update';
    isActive?: boolean;
    onDrawToolCreated?: (drawTool: DrawToolClass) => void;
    onDrawEnd?: (graphic: __esri.Graphic) => void;
    onGraphicEdited?: (result: {
        type: 'deleted' | 'modified';
        graphic: __esri.Graphic;
    }) => void;
    onDrawToolCleared?: () => void;
}
interface DrawStates {
    apiLoaded: boolean;
    currentSymbol: any;
    isPanelOpened: boolean;
    containerWidth: number;
    popperGeneration: number;
}
export declare class _Draw extends React.PureComponent<DrawProps, DrawStates> {
    container: HTMLElement;
    toolbarContainer: HTMLElement;
    btnContainer: HTMLElement;
    collapseBtnContainer: HTMLElement;
    resizeObserver: ResizeObserver;
    SketchClass: typeof __esri.Sketch;
    GraphicsLayer: typeof __esri.GraphicsLayer;
    jsonUtils: typeof __esri.jsonUtils;
    sketch: __esri.Sketch;
    layer: __esri.GraphicsLayer;
    activeTools: string[];
    currentActiveTool: any;
    pointSymbol: any;
    polygonSymbol: any;
    polylineSymbol: any;
    onGraphicEdited: any;
    isSymbolChanging: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: DrawProps, prevState: DrawStates): void;
    insertCustomDom: () => void;
    componentWillUnmount(): void;
    complete: () => Promise<void>;
    deactivate: () => void;
    clearGraphics: () => void;
    getCurrentSymbol: (newActiveTool: string) => any;
    handlePointSymbolChanged: (symbol: any) => void;
    handlePolylineSymbolChanged: (symbol: any) => void;
    handlePolygonSymbolChanged: (symbol: any) => void;
    onDrawToolContainerCreated: (ref: any) => void;
    render(): JSX.Element;
}
export declare const Draw: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>>;
export {};
