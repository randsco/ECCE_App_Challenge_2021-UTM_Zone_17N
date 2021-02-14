/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, LayoutTransformFunc, IMLayoutItemJson } from 'jimu-core';
import { LayoutProps, StateToLayoutProps, FlowLayoutSetting } from '../../types';
declare class Layout extends React.PureComponent<LayoutProps & StateToLayoutProps> {
    layoutTransform: LayoutTransformFunc;
    constructor(props: any);
    _createItem(item: IMLayoutItemJson, index: number, layoutSetting: FlowLayoutSetting): JSX.Element;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof Layout, Pick<React.ClassAttributes<Layout> & LayoutProps & StateToLayoutProps, "ref" | "style" | "className" | "key" | "visible" | "layouts" | "isItemAccepted" | "isInSection" | "isInWidget" | "isRepeat" | "isPageItem" | "itemDraggable" | "itemResizable" | "itemSelectable" | "droppable" | "showDefaultTools" | "onItemClick" | "ignoreMinHeight"> & LayoutProps>;
export default _default;
