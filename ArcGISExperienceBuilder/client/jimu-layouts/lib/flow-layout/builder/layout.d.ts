/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, LayoutInfo, LayoutItemConstructorProps, appActions, IMThemeVariables, IMLayoutItemJson, IMAppConfig, LayoutTransformFunc } from 'jimu-core';
import * as SVG from 'svg.js';
import { LayoutProps, StateToLayoutProps, PageContextProps } from 'jimu-layouts/layout-runtime';
import { DropHandlers } from '../../builder/types';
import { FlowLayoutSetting } from '../../types';
interface State {
    isDragover: boolean;
    isLoadingTemplate: boolean;
}
declare class Layout extends React.PureComponent<LayoutProps & StateToLayoutProps, State> implements DropHandlers {
    ref: HTMLElement;
    guideDragOverRef: HTMLElement;
    widgetListBtnRef: HTMLElement;
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
    maxPageWidth: number;
    builderTheme: IMThemeVariables;
    pageContext: PageContextProps;
    layoutTransform: LayoutTransformFunc;
    state: State;
    blockReference: HTMLDivElement;
    blockReference2: HTMLDivElement;
    templateReference: HTMLDivElement;
    mousedownX: number;
    mousedownY: number;
    constructor(props: any);
    componentDidMount(): void;
    activate: (e: React.MouseEvent) => void;
    onMouseDown: (e: any) => void;
    onDragOver(draggingItem: LayoutItemConstructorProps, draggingElement: HTMLElement, containerRect: Partial<ClientRect>, itemRect: Partial<ClientRect>, clientX: number, clientY: number): void;
    toggleDragoverEffect(value: boolean, draggingItem: LayoutItemConstructorProps): void;
    onDragEnter(draggingItem: LayoutItemConstructorProps): void;
    onDragLeave(): void;
    onDrop(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect): Promise<void> | appActions.LayoutChangedAction;
    addWidgetToLayout(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, width: number, insertIndex: number, appConfig?: IMAppConfig): void;
    onDropAtBoundary: (draggingItem: LayoutItemConstructorProps, itemRect: ClientRect, insertIndex: number) => void;
    collectBounds(layoutInfo: LayoutInfo): (ClientRect & {
        id: string;
    })[];
    createItem(item: IMLayoutItemJson, total: number, index: number, layoutSetting: FlowLayoutSetting): JSX.Element;
    onWidgetItemSelected: (item: LayoutItemConstructorProps) => void;
    onBlockTemplateSelected: (template: any) => void;
    onScreenTemplateSelected: (template: any) => void;
    onPageTemplateSelected: (templatePageJson: any) => void;
    getActionStyle(): import("jimu-core").SerializedStyles;
    getStyle(): import("jimu-core").SerializedStyles;
    createActions(blockOnly: boolean): JSX.Element;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof Layout, Pick<React.ClassAttributes<Layout> & LayoutProps & StateToLayoutProps, "ref" | "style" | "className" | "key" | "visible" | "layouts" | "isItemAccepted" | "isInSection" | "isInWidget" | "isRepeat" | "isPageItem" | "itemDraggable" | "itemResizable" | "itemSelectable" | "droppable" | "showDefaultTools" | "onItemClick" | "ignoreMinHeight"> & LayoutProps>;
export default _default;
