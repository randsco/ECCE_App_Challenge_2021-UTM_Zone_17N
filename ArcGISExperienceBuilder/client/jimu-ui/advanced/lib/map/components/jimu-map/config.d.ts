import { ImmutableObject } from 'jimu-core';
export declare type ToolConfig = {
    [key: string]: boolean;
};
export interface InitialMapState {
    viewPoint: __esri.Viewpoint;
    viewType: '2d' | '3d';
    extent: __esri.Extent;
    rotation: number;
}
export declare type JimuMapConfig = {
    disableScroll?: boolean;
    disablePopUp?: boolean;
    initialMapDataSourceID?: string;
    toolConifg?: ToolConfig;
    initialMapState?: InitialMapState;
    canPlaceHolder?: boolean;
    placeholderImage?: string;
    layoutIndex: number;
    selectionHighlightColor?: string;
};
export declare type IMJimuMapConfig = ImmutableObject<JimuMapConfig>;
