/// <reference types="react" />
/** @jsx jsx */
import { React, IMLayoutItemJson, BoundingBox } from 'jimu-core';
import { LayoutItemProps } from '../../types';
interface OwnProps {
    layoutItem: IMLayoutItemJson;
    index: number;
    space: number;
    children?: any;
}
export declare class ColumnItem extends React.PureComponent<LayoutItemProps & OwnProps> {
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
