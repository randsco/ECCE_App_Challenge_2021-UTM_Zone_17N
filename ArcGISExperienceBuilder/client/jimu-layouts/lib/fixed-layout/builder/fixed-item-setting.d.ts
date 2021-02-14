/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { FixedLayoutItemSetting } from '../../types';
import { LinearUnit } from 'jimu-ui';
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItemSettingProps } from '../../builder/types';
interface State {
    enableToolbar: boolean;
}
export default class FloatingItemSetting extends React.PureComponent<LayoutItemSettingProps, State> {
    itemSetting: FixedLayoutItemSetting;
    flipLeftRight: boolean;
    ref: HTMLDivElement;
    constructor(props: any);
    componentDidMount(): void;
    updateBBox: (prop: string, value: LinearUnit) => void;
    updateMode: (prop: string, value: LayoutItemSizeModes) => void;
    updateLockParent: (e: any) => void;
    getSizeOfContainer(): ClientRect;
    getSizeOfItem(): ClientRect;
    querySelector(selector: string): HTMLElement;
    toggleHeightMode: () => void;
    getAspectRatio(): string;
    updateAspectRatio: (newRatio: any) => void;
    sizeModeOptions(): JSX.Element[];
    /**
     * 1. In a scrolling page
     * 2. In a screen view
     * 3. The first block is not a screen section, or it's not in the first view
     */
    supportAnimation(): boolean;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
