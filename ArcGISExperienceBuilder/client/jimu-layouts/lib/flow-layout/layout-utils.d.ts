import { IMState, IMLayoutItemJson } from 'jimu-core';
export declare type StateToFlowItemProps = {
    isEmpty: boolean;
    padding: number;
    selected: boolean;
};
export declare function mapStateToFlowItemProps(state: IMState, ownProps: {
    layoutItem: IMLayoutItemJson;
    layoutId: string;
}): StateToFlowItemProps;
export declare function getWidthFromSetting(setting: any): string;
