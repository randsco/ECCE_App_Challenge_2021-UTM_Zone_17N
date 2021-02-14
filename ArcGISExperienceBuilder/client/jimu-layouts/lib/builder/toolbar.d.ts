/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, IMLayoutItemJson } from 'jimu-core';
import { ToolItemConfig } from '../types';
export interface ToolbarProps {
    tools: (ToolItemConfig | ToolItemConfig[])[];
    layoutId: string;
    layoutItem: IMLayoutItemJson;
    parentRef: HTMLElement;
    theme: ThemeVariables;
    formatMessage: (id: string) => string;
}
interface State {
    activeItem?: string;
    toggleOn?: boolean;
}
export declare class Toolbar extends React.PureComponent<ToolbarProps, State> {
    state: State;
    constructor(props: any);
    onItemClick(value: string): void;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
