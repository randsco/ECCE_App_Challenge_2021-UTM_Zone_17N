/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { CropParam, CropPosition, CropType } from 'jimu-ui';
interface State {
    modal: boolean;
    crop: any;
    zoom: number;
    aspect: number;
    showGrid: boolean;
    zoomSpeed: number;
    croppedAreaPixels: any;
    loading?: boolean;
}
interface Props {
    onCancelCrop?: any;
    onConfirmCrop?: any;
    onFailCrop?: any;
    widgetId?: string;
    widgetArea?: ClientRect;
    image: string;
    imageFormat?: string;
    cropParam?: CropParam;
    cropZoom?: number;
    crop?: CropPosition;
    cropType?: CropType;
    originId?: string;
}
export { CropParam, CropType };
export declare class ImageCrop extends React.Component<Props, State> {
    eidtInfoStyle: {
        width: string;
        height: string;
        margin: number;
    };
    constructor(props: any);
    onCropChange: (crop: any) => void;
    onCropAreaComplete: (croppedArea: any, croppedAreaPixels: any) => void;
    onZoomChange: (zoom: any) => void;
    onConfirmCrop: (svgViewBox: string, svgPath: string, cropShape: any) => void;
    render(): React.ReactPortal;
}
