/// <reference types="react" />
/** @jsx jsx */
import { React, IMSizeModeLayoutJson, LayoutItemConstructorProps, IMThemeVariables } from 'jimu-core';
import { PageContextProps, LayoutItemProps, LayoutContextProps } from 'jimu-layouts/layout-runtime';
interface State {
    showModal: boolean;
    isBusy: boolean;
}
export declare class WidgetPlaceholder extends React.PureComponent<LayoutItemProps, State> {
    ref: HTMLElement;
    btnRef: HTMLElement;
    pageContext: PageContextProps;
    layoutContext: LayoutContextProps;
    fakeLayouts: IMSizeModeLayoutJson;
    constructor(props: any);
    getStyle(builderTheme: IMThemeVariables): import("jimu-core").SerializedStyles;
    toggleModal: (e: any) => void;
    closeModal: () => void;
    canDrop(draggingItem: LayoutItemConstructorProps): boolean;
    toggleDragoverEffect: (isDragover: boolean, draggingItem: LayoutItemConstructorProps) => void;
    onDrop: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect) => void;
    newWidget(uri: string): Promise<void>;
    setWidget: (item: LayoutItemConstructorProps) => void;
    getPopupStyle(): import("jimu-core").SerializedStyles;
    getModalStyle(): import("jimu-core").SerializedStyles;
    isItemAccepted: (item: LayoutItemConstructorProps) => boolean;
    render(): JSX.Element;
}
export {};
