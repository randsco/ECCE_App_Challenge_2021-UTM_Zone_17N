/// <reference types="react" />
/** @jsx jsx */
import { React, AppMode, IntlShape } from 'jimu-core';
import { ToolConfig } from '../config';
import { LayoutJson, HiddenElementNames } from './config';
import { JimuMapView } from 'jimu-arcgis';
interface LayoutProps {
    layoutConfig: LayoutJson;
    toolConfig: ToolConfig;
    jimuMapView: JimuMapView;
    isMobile: boolean;
    appMode: AppMode;
    widgetHeight?: number;
    intl?: IntlShape;
}
interface LayoutState {
    activeToolName: string;
    toolsContentInMobileExpandPanel?: JSX.Element;
    hiddenElementNames: HiddenElementNames;
}
export default class Layout extends React.PureComponent<LayoutProps, LayoutState> {
    contentRef: HTMLElement;
    constructor(props: any);
    getStyle(): import("jimu-core").SerializedStyles;
    getMaxHeightForPcExpand: (widgetHeight: number) => number;
    handleActiveNameChange: (activeToolName: string) => void;
    handSetHiddenElementNames: (elementNames: HiddenElementNames) => void;
    getLayoutContent: (layoutJson: LayoutJson) => JSX.Element;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
