/// <reference types="react" />
import { React, ReactRedux, IMState } from 'jimu-core';
import { ContainerProps, GridItemJson } from '../types';
interface StateToContainerProps {
    layoutItem: GridItemJson;
    subContainerIds: string;
}
interface State {
    draggingItemId: string;
}
declare class ContainerClass extends React.PureComponent<ContainerProps & StateToContainerProps, State> {
    ref: HTMLElement;
    state: State;
    onResizeEnd: (dx: number, dy: number, prevItemId: string, nextItemId: string) => void;
    onItemDragStart: (id: any) => void;
    onItemDragEnd: () => void;
    createItems(idArray: string[], subContainerArray: string[]): any[];
    render(): JSX.Element;
}
export declare function mapStateToContainerProps(state: IMState, ownProps: ContainerProps): StateToContainerProps;
export declare const GridContainer: ReactRedux.ConnectedComponent<typeof ContainerClass, Pick<React.ClassAttributes<ContainerClass> & ContainerProps & StateToContainerProps, "ref" | "key" | "layoutId" | "layoutItemId" | "splitterSize" | "splitterColor"> & ContainerProps>;
export {};
