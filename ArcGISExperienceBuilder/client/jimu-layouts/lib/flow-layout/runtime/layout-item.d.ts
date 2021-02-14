/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, IMLayoutItemJson } from 'jimu-core';
import { LayoutItemProps, FlowLayoutItemSetting } from '../../types';
import { StateToFlowItemProps } from '../layout-utils';
interface OwnProps {
    index: number;
    layoutItem: IMLayoutItemJson;
    gutter: number;
}
declare class FlowLayoutItem extends React.PureComponent<LayoutItemProps & StateToFlowItemProps & OwnProps> {
    calHeight(itemSetting: FlowLayoutItemSetting): string;
    getStyle(itemSetting: FlowLayoutItemSetting): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof FlowLayoutItem, Pick<React.ClassAttributes<FlowLayoutItem> & LayoutItemProps & StateToFlowItemProps & OwnProps, "ref" | "index" | "children" | "aspectRatio" | "className" | "draggable" | "onClick" | "onDoubleClick" | "key" | "gutter" | "layoutId" | "layoutItemId" | "resizable" | "isInSection" | "showDefaultTools" | "selectable" | "forbidContextMenu" | "forbidToolbar" | "forceAspectRatio" | "resizeObserver" | "layoutItem"> & LayoutItemProps & OwnProps>;
export default _default;
