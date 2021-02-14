/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
interface OwnProps {
    layoutId: string;
    direction: string;
    prevItemId: string;
    nextItemId: string;
    size: number;
    color: string;
}
export declare class Splitter extends React.PureComponent<OwnProps> {
    ref: HTMLElement;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
