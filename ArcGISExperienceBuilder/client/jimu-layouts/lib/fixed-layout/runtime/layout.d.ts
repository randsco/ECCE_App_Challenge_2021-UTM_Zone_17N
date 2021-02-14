/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, LayoutTransformFunc, IMLayoutJson } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from '../../types';
import { PageContextProps } from '../../builder/page-context';
declare class FixedLayoutViewer extends React.PureComponent<LayoutProps & StateToLayoutProps> {
    layoutTransform: LayoutTransformFunc;
    pageContext: PageContextProps;
    createItem(layout: IMLayoutJson, itemId: string, index: number, transformed: boolean): JSX.Element;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof FixedLayoutViewer, Pick<React.ClassAttributes<FixedLayoutViewer> & LayoutProps & StateToLayoutProps, "ref" | "style" | "className" | "key" | "visible" | "layouts" | "isItemAccepted" | "isInSection" | "isInWidget" | "isRepeat" | "isPageItem" | "itemDraggable" | "itemResizable" | "itemSelectable" | "droppable" | "showDefaultTools" | "onItemClick" | "ignoreMinHeight"> & LayoutProps>;
export default _default;
