/// <reference types="react" />
/** @jsx jsx */
import { React, LayoutItemJson, IMLayoutItemJson, BoundingBox } from 'jimu-core';
import { LayoutItemProps, StateToLayoutItemProps } from '../../types';
interface OwnProps {
    layoutItem: IMLayoutItemJson;
    activeIds?: string;
    index: number;
    space: number;
    editingSectionId?: string;
    children?: any;
    onResizeStart: (id: string) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) => void;
}
interface State {
    isResizing: boolean;
    dw: number;
    dh: number;
}
export declare class ColumnItem extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps & OwnProps, State> {
    initWidth: number;
    initHeight: number;
    state: State;
    onResizeStart: (id: string, initW: number, initH: number) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
    isStretchInCrossAxis(): boolean;
    calHeight(itemSetting: any, bbox: BoundingBox): {
        height: string;
        flex: string;
        flexShrink?: undefined;
    } | {
        height: string;
        flex?: undefined;
        flexShrink?: undefined;
    } | {
        flex: string;
        height?: undefined;
        flexShrink?: undefined;
    } | {
        height: string;
        flexShrink: number;
        flex?: undefined;
    };
    getStyle(layoutSetting: any, isStretch: boolean): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
