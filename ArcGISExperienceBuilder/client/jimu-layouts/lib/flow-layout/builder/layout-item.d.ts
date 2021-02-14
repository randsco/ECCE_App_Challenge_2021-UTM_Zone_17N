/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, IMLayoutItemJson, IMSizeModeLayoutJson, IMThemeVariables, LayoutItemConstructorProps } from 'jimu-core';
import { LayoutItemProps, PageContextProps, ToolbarConfig } from 'jimu-layouts/layout-runtime';
import { FlowLayoutItemSetting } from '../../types';
import { StateToFlowItemProps } from '../layout-utils';
interface OwnProps {
    layouts: IMSizeModeLayoutJson;
    layoutItem: IMLayoutItemJson;
    builderTheme: IMThemeVariables;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    gutter: number;
    editingSectionId?: string;
    formatMessage: (id: string) => string;
    children?: any;
    onDropAtBoundary: (draggingItem: LayoutItemConstructorProps, itemRect: ClientRect, insertIndex: number) => void;
}
interface State {
    isResizing: boolean;
    dh: number;
    showBlockTemplatePopup: boolean;
    showScreenTemplatePopup: boolean;
    referenceElem: HTMLElement;
}
declare class FlowLayoutItem extends React.PureComponent<LayoutItemProps & StateToFlowItemProps & OwnProps, State> {
    state: State;
    fakeTopLayouts: IMSizeModeLayoutJson;
    fakeBottomLayouts: IMSizeModeLayoutJson;
    minHeight: number;
    initHeight: number;
    pageContext: PageContextProps;
    contextMenus: ToolbarConfig;
    reference: HTMLDivElement;
    constructor(props: any);
    onResizeStart: (id: string, initWidth: number, initHeight: number) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
    calHeight(itemSetting: FlowLayoutItemSetting): string;
    toggleBlockTemplatePopup: () => void;
    toggleScreenTemplatePopup: () => void;
    removeLayoutItem: () => void;
    moveLayoutItemUp: () => void;
    moveLayoutItemDown: () => void;
    createContextMenu(): JSX.Element;
    switchSetting: () => void;
    onTemplateBlockSelected: (template: any) => void;
    onTemplateScreenGroupSelected: (template: any) => void;
    getStyle(itemSetting: FlowLayoutItemSetting): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof FlowLayoutItem, Pick<React.ClassAttributes<FlowLayoutItem> & LayoutItemProps & StateToFlowItemProps & OwnProps, "ref" | "index" | "children" | "aspectRatio" | "className" | "draggable" | "onClick" | "onDoubleClick" | "key" | "gutter" | "layouts" | "formatMessage" | "builderTheme" | "layoutId" | "layoutItemId" | "resizable" | "isInSection" | "showDefaultTools" | "editingSectionId" | "selectable" | "forbidContextMenu" | "forbidToolbar" | "forceAspectRatio" | "resizeObserver" | "layoutItem" | "isLast" | "onDropAtBoundary" | "isFirst"> & LayoutItemProps & OwnProps>;
export default _default;
