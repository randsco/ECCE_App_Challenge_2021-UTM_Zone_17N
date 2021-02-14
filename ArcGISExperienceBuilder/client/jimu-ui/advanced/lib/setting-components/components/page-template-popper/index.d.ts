/// <reference types="react" />
/** @jsx jsx */
import { React, IMThemeVariables, PageMode } from 'jimu-core';
export interface PageTemplatePopperProps {
    pageMode?: PageMode;
    isHeader?: boolean;
    isFooter?: boolean;
    theme: IMThemeVariables;
    referenceElement: HTMLElement;
    formatMessage: (id: string, values?: {
        [key: string]: any;
    }) => string;
    onItemSelect: (item: any) => void;
    onClose: () => void;
}
interface State {
    open: boolean;
}
export declare class PageTemplatePopper extends React.PureComponent<PageTemplatePopperProps, State> {
    contentRef: HTMLElement;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleOutsideClick;
    togglePopper: () => void;
    onItemSelect: (templateJson: any) => void;
    render(): JSX.Element;
}
export {};
