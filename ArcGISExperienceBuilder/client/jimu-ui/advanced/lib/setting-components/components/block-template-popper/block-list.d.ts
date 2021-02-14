/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
interface Props {
    referenceElement: HTMLElement;
    theme: ThemeVariables;
    onItemSelect: (blockIndex: number) => void;
}
export declare class BlockList extends React.PureComponent<Props> {
    getStyle(): import("jimu-core").SerializedStyles;
    createBlock(template: any, index: any): JSX.Element;
    render(): JSX.Element;
}
export {};
