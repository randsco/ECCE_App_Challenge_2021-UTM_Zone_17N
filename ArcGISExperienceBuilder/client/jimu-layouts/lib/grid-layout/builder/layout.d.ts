/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, LayoutItemConstructorProps } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from 'jimu-layouts/layout-runtime';
import { DropHandlers } from '../../builder/types';
declare class GridLayout extends React.PureComponent<LayoutProps & StateToLayoutProps> implements DropHandlers {
    constructor(props: any);
    onDragOver(): void;
    onDragEnter(): void;
    onDragLeave(): void;
    onDrop(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect): void;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof GridLayout, Pick<React.ClassAttributes<GridLayout> & LayoutProps & StateToLayoutProps, "ref" | "style" | "className" | "key" | "visible" | "layouts" | "isItemAccepted" | "isInSection" | "isInWidget" | "isRepeat" | "isPageItem" | "itemDraggable" | "itemResizable" | "itemSelectable" | "droppable" | "showDefaultTools" | "onItemClick" | "ignoreMinHeight"> & LayoutProps>;
export default _default;
