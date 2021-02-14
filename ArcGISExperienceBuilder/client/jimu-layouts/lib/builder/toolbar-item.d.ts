/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { ToolItemConfig } from '../types';
import { ToolbarContextProps } from './toolbar-context';
export declare const DEFAULT_ICON_SIZE = 16;
interface State {
    showPopper: boolean;
}
export declare class ToolbarItem extends React.PureComponent<ToolItemConfig & {
    uid: string;
    isInGroup?: boolean;
}, State> {
    contextProps: ToolbarContextProps;
    reference: HTMLDivElement;
    constructor(props: any);
    select(e: React.MouseEvent): void;
    getValue(target: any, props: any): any;
    getStyle(): import("jimu-core").SerializedStyles;
    separatorStyle(): import("jimu-core").SerializedStyles;
    togglePopper: () => void;
    render(): JSX.Element;
}
export {};
