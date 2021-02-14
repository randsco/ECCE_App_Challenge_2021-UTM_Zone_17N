/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
interface Props {
    aspect?: number;
    zoom?: number;
    crop?: any;
    image?: string;
    onCropChange?: any;
    zoomSpeed?: number;
    maxZoom?: number;
    onZoomChange?: any;
    minZoom?: number;
    onCropComplete?: any;
    showGrid?: boolean;
    style?: any;
    classes?: any;
    onImgError?: any;
    onCancelCrop?: any;
    onConfirmCrop?: any;
    widgetArea?: ClientRect;
    widgetId?: string;
    svgViewBox?: string;
    svgPath?: string;
    cropShape?: string;
    loading?: boolean;
}
interface State {
    cropSize: any;
    minZoom?: number;
    maxZoom?: number;
}
export declare class Cropper extends React.Component<Props, State> {
    image: any;
    container: HTMLDivElement;
    containerRect: any;
    imageSize: {
        width: number;
        height: number;
        naturalWidth: number;
        naturalHeight: number;
    };
    dragStartPosition: {
        x: number;
        y: number;
    };
    dragStartCrop: {
        x: number;
        y: number;
    };
    lastPinchDistance: number;
    rafDragTimeout: any;
    rafZoomTimeout: any;
    screenWidth: number;
    screenHeight: number;
    constructor(props: any);
    getStyle: () => import("jimu-core").SerializedStyles;
    static defaultProps: {
        zoom: number;
        aspect: number;
        maxZoom: number;
        minZoom: number;
        showGrid: boolean;
        style: {};
        classes: {};
        zoomSpeed: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any): void;
    preventZoomSafari: (e: any) => any;
    cleanEvents: () => void;
    onImgLoad: () => void;
    computeSizes: () => void;
    static getMousePoint: (e: any) => {
        x: number;
        y: number;
    };
    static getTouchPoint: (touch: any) => {
        x: number;
        y: number;
    };
    onMouseDown: (e: any) => void;
    onMouseMove: (e: any) => void;
    onTouchStart: (e: any) => void;
    onTouchMove: (e: any) => void;
    onDragStart: ({ x, y }: {
        x: any;
        y: any;
    }) => void;
    onDrag: ({ x, y }: {
        x: any;
        y: any;
    }) => void;
    onDragStopped: () => void;
    onPinchStart(e: any): void;
    onPinchMove(e: any): void;
    onWheel: (e: any) => void;
    getPointOnContainer: ({ x, y }: {
        x: any;
        y: any;
    }, zoom?: any) => {
        x: number;
        y: number;
    };
    getPointOnImage: ({ x, y }: {
        x: any;
        y: any;
    }) => {
        x: number;
        y: number;
    };
    setNewZoom: (zoom: any, point: any) => void;
    emitCropData: () => void;
    recomputeCropPosition: () => void;
    onImgError: () => void;
    onResize: (width: any, height: any) => void;
    render(): JSX.Element;
}
export {};
