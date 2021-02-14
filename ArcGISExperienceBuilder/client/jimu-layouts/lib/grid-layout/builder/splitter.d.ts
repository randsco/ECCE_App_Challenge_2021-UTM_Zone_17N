/// <reference types="react" />
/** @jsx jsx */
import { React, IMThemeVariables } from 'jimu-core';
interface OwnProps {
    layoutId: string;
    direction: string;
    prevItemId: string;
    nextItemId: string;
    size: number;
    color: string;
    onResizeEnd: (dx: number, dy: number, prevItemId: string, nextItemId: string) => void;
}
export declare class Splitter extends React.PureComponent<OwnProps> {
    ref: HTMLElement;
    interactable: Interact.Interactable;
    componentDidMount(): void;
    bindSplitHandler: () => void;
    restrictResizing(prevItemRect: ClientRect, nextItemRect: ClientRect, dx: number, dy: number): {
        x: number;
        y: number;
    };
    getStyle(builderTheme: IMThemeVariables): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
