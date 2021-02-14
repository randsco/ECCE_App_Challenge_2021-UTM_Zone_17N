/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
interface Props {
    theme: ThemeVariables;
    formatMessage: (id: string, values?: {
        [key: string]: any;
    }) => string;
    onItemSelect: (pageJson: any) => void;
}
export declare class PageTemplateList extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
