/// <reference types="react" />
/** @jsx jsx */
import { React, IMThemeVariables } from 'jimu-core';
export interface ScreenTemplatePopperProps {
    theme: IMThemeVariables;
    referenceElement: HTMLElement;
    onItemSelect: (item: any) => void;
    onClose: () => void;
}
interface State {
    open: boolean;
}
export declare class ScreenTemplatePopper extends React.PureComponent<ScreenTemplatePopperProps, State> {
    contentRef: HTMLElement;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleOutsideClick;
    getStyle(): import("jimu-core").SerializedStyles;
    togglePopper: () => void;
    render(): JSX.Element;
}
export {};
