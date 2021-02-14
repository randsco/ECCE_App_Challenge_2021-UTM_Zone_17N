/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LinearUnit } from 'jimu-ui';
import { FixedLayoutItemSetting, LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItemSettingProps } from '../../builder/types';
interface Props {
    heightMode: LayoutItemSizeModes;
    widthMode: LayoutItemSizeModes;
}
export declare class ItemPositionSetting extends React.PureComponent<LayoutItemSettingProps & Props> {
    flipLeftRight: boolean;
    constructor(props: any);
    getStyle(): import("jimu-core").SerializedStyles;
    inputUnit(prop: string): JSX.Element;
    updateBBox: (prop: string, value: LinearUnit) => void;
    getSizeOfContainer(): ClientRect;
    getSizeOfItem(): ClientRect;
    querySelector(selector: string): HTMLElement;
    switchAuto(side: string, otherSize: string, originValue: boolean): void;
    checkAutoProps(itemSetting: FixedLayoutItemSetting): {
        leftAuto: boolean;
        rightAuto: boolean;
        topAuto: boolean;
        bottomAuto: boolean;
    };
    checkOrigin(leftAuto: boolean, rightAuto: boolean, topAuto: boolean, bottomAuto: boolean): {
        left: boolean;
        right: boolean;
        top: boolean;
        bottom: boolean;
    };
    /**
     * When width is custom, only one of the left and right can set to custom.
     * @param prop
     * @param relatedProp
     * @param side
     */
    allowChangeAutoProps(side: 'width' | 'height'): boolean;
    getOrigin(left: boolean, top: boolean, right: boolean, bottom: boolean): string;
    render(): JSX.Element;
}
export {};
