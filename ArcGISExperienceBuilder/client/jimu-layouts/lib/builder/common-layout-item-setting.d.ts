/// <reference types="react" />
/** @jsx jsx */
import { React, LayoutInfo } from 'jimu-core';
interface ExtraProps {
    formatMessage: (id: string) => string;
}
export default class CommonLayoutItemSetting extends React.PureComponent<{
    layoutId: string;
    layoutItemId: string;
    isSection: boolean;
    onStyleChange: (layoutInfo: LayoutInfo, style: any) => void;
    onSettingChange?: (layoutInfo: LayoutInfo, setting: any) => void;
    style: any;
    setting?: any;
} & ExtraProps> {
    updateStyle(key: any, value: any): void;
    onBackgroundStyleChange: (config: any) => void;
    updateBorder: (bd: any) => void;
    updateRadius: (value: any) => void;
    updateShadow: (value: any) => void;
    formatMessage: (id: string) => string;
    allowCoverBackground(): boolean;
    render(): JSX.Element;
}
export {};
