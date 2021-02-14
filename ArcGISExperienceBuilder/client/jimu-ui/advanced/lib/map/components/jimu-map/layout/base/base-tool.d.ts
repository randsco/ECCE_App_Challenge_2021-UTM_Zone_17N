/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape } from 'jimu-core';
import { Modifiers } from 'jimu-ui';
import { UIComponent, UIComponentProps } from './ui-component';
import { ToolJson } from '../config';
export interface BaseToolProps extends UIComponentProps {
    toolJson: ToolJson;
    toolName: string;
    isMobile?: boolean;
    intl?: IntlShape;
    activeToolName: string;
    onActiveToolNameChange: (activeToolName: string) => void;
}
export interface IconType {
    icon: React.ComponentClass<React.SVGAttributes<SVGElement>>;
    onIconClick?: (evt?: React.MouseEvent<any>) => void;
}
export declare abstract class BaseTool<P extends BaseToolProps, S extends unknown> extends UIComponent<P, S> {
    iconContainer: HTMLElement;
    toolName: string;
    isContainedToMobilePanel: boolean;
    generation?: number;
    modifiers: Modifiers;
    constructor(props: any);
    private _cssStyle;
    abstract getTitle(): string;
    abstract getIcon(): IconType;
    abstract getExpandPanel(): JSX.Element;
    onShowPanel(): void;
    onClosePanel(): void;
    destroy(): void;
    static getIsNeedSetting(): boolean;
    private _onIconClick;
    private _getContent;
    private _initIconContainer;
    private onResize;
    private _renderPCTool;
    private _renderMobileTool;
    private getExpandPanelPlacementClassName;
    render(): JSX.Element;
}
