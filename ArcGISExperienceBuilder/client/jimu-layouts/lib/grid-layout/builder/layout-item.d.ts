/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, IMSizeModeLayoutJson, LayoutItemConstructorProps } from 'jimu-core';
import { LayoutItemProps } from '../../types';
import { StateToLayoutItemProps } from 'jimu-layouts/layout-runtime';
interface OwnProps {
    onItemDragStart: (id: any) => void;
    onItemDragEnd: (id: any) => void;
}
interface State {
    dragoverSide: 'top' | 'bottom' | 'left' | 'right';
}
declare type GridItemProps = LayoutItemProps & StateToLayoutItemProps & OwnProps;
declare class GridItem extends React.PureComponent<GridItemProps, State> {
    fakeLayouts: IMSizeModeLayoutJson;
    constructor(props: any);
    hasEmbedLayout(): boolean;
    onItemDragStart: () => void;
    onItemDragEnd: () => void;
    onDragOver: (draggingItem: LayoutItemConstructorProps, draggingElement: HTMLElement, containerRect: ClientRect, itemRect: ClientRect, clientX: number, clientY: number) => void;
    onDrop: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, clientX: number, clientY: number) => void;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof GridItem, Pick<React.ClassAttributes<GridItem> & LayoutItemProps & StateToLayoutItemProps & OwnProps, "ref" | "children" | "aspectRatio" | "className" | "draggable" | "onClick" | "onDoubleClick" | "key" | "layoutId" | "layoutItemId" | "resizable" | "isInSection" | "showDefaultTools" | "selectable" | "forbidContextMenu" | "forbidToolbar" | "forceAspectRatio" | "resizeObserver" | "onItemDragStart" | "onItemDragEnd"> & LayoutItemProps & OwnProps>;
export default _default;
