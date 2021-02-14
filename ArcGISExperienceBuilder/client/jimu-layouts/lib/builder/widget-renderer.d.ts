/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { PageContextProps, LayoutItemProps, WidgetProps } from 'jimu-layouts/layout-runtime';
declare type Props = LayoutItemProps & WidgetProps;
export declare class WidgetRendererInBuilder extends React.PureComponent<Props> {
    pageContext: PageContextProps;
    mask(): JSX.Element;
    getStyle(): import("jimu-core").SerializedStyles;
    getPlaceholderStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
