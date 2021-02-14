/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { FlowLayoutItemSetting, LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItemSettingProps } from '../../builder/types';
import { LinearUnit } from 'jimu-ui';
export default class FloatingItemSetting extends React.PureComponent<LayoutItemSettingProps> {
    itemSetting: FlowLayoutItemSetting;
    updateWidth: (value: LinearUnit) => void;
    updateBBoxWidth: (value: LinearUnit) => void;
    updateHeight: (value: LinearUnit) => void;
    updateOffsetX: (value: number) => void;
    updateOffsetY: (value: number) => void;
    updateHeightMode: (mode: LayoutItemSizeModes) => void;
    updateFloatingArea(value: number): void;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
