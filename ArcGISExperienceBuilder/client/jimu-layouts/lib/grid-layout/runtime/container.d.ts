/// <reference types="react" />
import { React, ReactRedux, IMState } from 'jimu-core';
import { ContainerProps, GridItemJson } from '../types';
interface StateToContainerProps {
    layoutItem: GridItemJson;
    subContainerIds: string;
}
declare class ContainerClass extends React.PureComponent<ContainerProps & StateToContainerProps> {
    ref: HTMLElement;
    createItems(idArray: string[], subContainerArray: string[]): any[];
    render(): JSX.Element;
}
export declare function mapStateToContainerProps(state: IMState, ownProps: ContainerProps): StateToContainerProps;
export declare const GridContainer: ReactRedux.ConnectedComponent<typeof ContainerClass, Pick<React.ClassAttributes<ContainerClass> & ContainerProps & StateToContainerProps, "ref" | "key" | "layoutId" | "layoutItemId" | "splitterSize" | "splitterColor"> & ContainerProps>;
export {};
