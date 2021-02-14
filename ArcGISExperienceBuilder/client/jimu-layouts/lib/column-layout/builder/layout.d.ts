/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, LayoutItemJson, LayoutItemConstructorProps, IMThemeVariables } from 'jimu-core';
import { DropHandlers } from '../../builder/types';
import { LayoutProps, StateToLayoutProps } from 'jimu-layouts/layout-runtime';
import * as SVG from 'svg.js';
interface State {
    isDragover: boolean;
}
declare class Layout extends React.PureComponent<LayoutProps & StateToLayoutProps, State> implements DropHandlers {
    ref: HTMLElement;
    guideDragOverRef: HTMLElement;
    guideDragOverDraw: SVG.Doc;
    dropArea: SVG.Rect;
    boundingRect: ClientRect;
    isDragging: boolean;
    childRects: Array<ClientRect & {
        id: string;
    }>;
    domRect: ClientRect;
    resizingRect: ClientRect;
    referenceId: string;
    theme: IMThemeVariables;
    builderTheme: IMThemeVariables;
    state: State;
    constructor(props: any);
    componentDidMount(): void;
    onItemResizeStart(id: string): void;
    onItemResizing: () => void;
    onItemResizeEnd(id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson): void;
    onDragOver(draggingItem: LayoutItemConstructorProps, draggingElement: HTMLElement, containerRect: Partial<ClientRect>, itemRect: Partial<ClientRect>): void;
    toggleDragoverEffect(value: boolean): void;
    onDragEnter(): void;
    onDragLeave(): void;
    onDrop(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect): void;
    collectBounds(id: string): (ClientRect & {
        id: string;
    })[];
    createItem(itemId: string, index: number, layoutSetting: any): JSX.Element;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof Layout, Pick<React.ClassAttributes<Layout> & LayoutProps & StateToLayoutProps, "ref" | "style" | "className" | "key" | "visible" | "layouts" | "isItemAccepted" | "isInSection" | "isInWidget" | "isRepeat" | "isPageItem" | "itemDraggable" | "itemResizable" | "itemSelectable" | "droppable" | "showDefaultTools" | "onItemClick" | "ignoreMinHeight"> & LayoutProps>;
export default _default;
