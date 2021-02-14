/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { ToolItemConfig, StateToLayoutProps } from '../types';
import { ToolbarContextProps } from './toolbar-context';
interface Props {
    uid: string;
    tools: ToolItemConfig[];
}
export declare class ToolbarGroup extends React.PureComponent<Props> {
    contextProps: ToolbarContextProps;
    ref: HTMLDivElement;
    reference: HTMLDivElement;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleOutsideClick;
    getBaseStyle(): import("jimu-core").SerializedStyles;
    getPopStyle(): import("jimu-core").SerializedStyles;
    getValue(target: any, props: any): any;
    togglePopToolItems(e?: React.MouseEvent<HTMLDivElement>): void;
    onItemClick(toolConfig: ToolItemConfig, props: any): void;
    createToolItem(toolConfig: ToolItemConfig, props: StateToLayoutProps, index: number): JSX.Element;
    getGroupMenu(selectedTool: ToolItemConfig, visibleTools: ToolItemConfig[]): JSX.Element;
    render(): JSX.Element;
}
export {};
