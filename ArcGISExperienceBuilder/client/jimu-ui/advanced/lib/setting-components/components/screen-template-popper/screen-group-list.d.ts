/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, AppConfig } from 'jimu-core';
export declare type ScreenGroupTemplate = {
    label: string;
    icon: string;
    config: Partial<AppConfig>;
};
interface Props {
    referenceElement: HTMLElement;
    theme: ThemeVariables;
    onItemSelect: (template: any) => void;
}
interface State {
    templates: any;
}
export declare class ScreenGroupList extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidMount(): void;
    getStyle(): import("jimu-core").SerializedStyles;
    createBlock(template: any, index: any): JSX.Element;
    render(): JSX.Element;
}
export {};
