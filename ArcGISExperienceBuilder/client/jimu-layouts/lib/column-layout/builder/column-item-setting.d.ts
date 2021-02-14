/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LinearUnit } from 'jimu-ui';
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItemSettingProps } from '../../builder/types';
export default class ColumnItemSetting extends React.PureComponent<LayoutItemSettingProps> {
    updateBBox: (prop: string, value: LinearUnit) => void;
    updateAspectSetting: (heightMode?: string) => void;
    updateAlignSelf: (e: any) => void;
    updateHeightMode: (mode: LayoutItemSizeModes) => void;
    updateWidthMode: (mode: LayoutItemSizeModes) => void;
    updateAspectRatio: (newRatio: any) => void;
    getSizeOfContainer(): ClientRect;
    getSizeOfItem(): ClientRect;
    querySelector(selector: string): HTMLElement;
    formatMessage: (id: string) => string;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
