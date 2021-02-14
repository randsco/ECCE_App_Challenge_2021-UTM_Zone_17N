/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux } from 'jimu-core';
import { LayoutItemProps, WidgetProps } from '../types';
declare class _WidgetRenderer extends React.PureComponent<LayoutItemProps & WidgetProps, {
    error: string;
}> {
    ref: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    private loadWidgetClass;
    componentDidMount(): void;
    componentDidUpdate(): void;
    /**
     * Must add an extra div to keep the aspect ratio.
     * https://www.w3schools.com/howto/howto_css_aspect_ratio.asp
     */
    renderWidgetContent(): JSX.Element;
    getStyle(): import("jimu-core").SerializedStyles;
    onMouseDown(evt: any): void;
    render(): JSX.Element;
}
export declare const WidgetRenderer: ReactRedux.ConnectedComponent<typeof _WidgetRenderer, Pick<React.ClassAttributes<_WidgetRenderer> & LayoutItemProps & WidgetProps, "ref" | "children" | "aspectRatio" | "className" | "draggable" | "onClick" | "onDoubleClick" | "key" | "layoutId" | "layoutItemId" | "resizable" | "isInSection" | "showDefaultTools" | "selectable" | "forbidContextMenu" | "forbidToolbar" | "forceAspectRatio" | "resizeObserver"> & LayoutItemProps>;
export {};
