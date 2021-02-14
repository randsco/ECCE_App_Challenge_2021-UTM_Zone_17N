/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux } from 'jimu-core';
import { LayoutItemProps, StateToLayoutItemProps } from '../../types';
declare type GridItemProps = LayoutItemProps & StateToLayoutItemProps;
declare class GridItem extends React.PureComponent<GridItemProps> {
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof GridItem, Pick<React.ClassAttributes<GridItem> & LayoutItemProps & StateToLayoutItemProps, "ref" | "children" | "aspectRatio" | "className" | "draggable" | "onClick" | "onDoubleClick" | "key" | "layoutId" | "layoutItemId" | "resizable" | "isInSection" | "showDefaultTools" | "selectable" | "forbidContextMenu" | "forbidToolbar" | "forceAspectRatio" | "resizeObserver"> & LayoutItemProps>;
export default _default;
