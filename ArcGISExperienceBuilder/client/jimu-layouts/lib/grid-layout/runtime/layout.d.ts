/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from '../../types';
declare class GridLayout extends React.PureComponent<LayoutProps & StateToLayoutProps> {
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof GridLayout, Pick<React.ClassAttributes<GridLayout> & LayoutProps & StateToLayoutProps, "ref" | "style" | "className" | "key" | "visible" | "layouts" | "isItemAccepted" | "isInSection" | "isInWidget" | "isRepeat" | "isPageItem" | "itemDraggable" | "itemResizable" | "itemSelectable" | "droppable" | "showDefaultTools" | "onItemClick" | "ignoreMinHeight"> & LayoutProps>;
export default _default;
