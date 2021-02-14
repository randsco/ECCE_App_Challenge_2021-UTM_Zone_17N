/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, ReactRedux } from 'jimu-core';
export interface OwnProps {
    widgetId: string;
    icon: string;
    message: string;
    style?: any;
    autoFlip?: boolean;
}
export interface StateProps {
    isSelected: boolean;
}
export interface ThemeProps {
    theme: ThemeVariables;
}
export declare type Props = OwnProps & StateProps & ThemeProps;
export declare class _WidgetPlaceholder extends React.PureComponent<Props> {
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const WidgetPlaceholder: ReactRedux.ConnectedComponent<React.SFC<import("emotion-theming/types/helper").AddOptionalTo<OwnProps & StateProps & ThemeProps & React.RefAttributes<_WidgetPlaceholder>, "theme">>, Pick<import("emotion-theming/types/helper").AddOptionalTo<OwnProps & StateProps & ThemeProps & React.RefAttributes<_WidgetPlaceholder>, "theme">, "ref" | "style" | "theme" | "icon" | "key" | "widgetId" | "autoFlip" | "message"> & OwnProps>;
