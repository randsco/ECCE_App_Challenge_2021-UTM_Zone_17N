/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, ScreenTransitionType } from 'jimu-core';
import { LayoutItemSettingProps } from '../../builder/types';
interface StateToProps {
    transitionType: ScreenTransitionType;
    panelTransitionType: ScreenTransitionType;
}
interface State {
    showSidePanel: boolean;
}
declare class ScreenGroupSetting extends React.PureComponent<LayoutItemSettingProps & StateToProps, State> {
    constructor(props: any);
    onTransitionTypeChange: (type: ScreenTransitionType) => void;
    onPanelTransitionTypeChange: (type: ScreenTransitionType) => void;
    getAnimBoxStyle(): import("jimu-core").SerializedStyles;
    getSidePopperStyle(): import("jimu-core").SerializedStyles;
    toggleSidePanel: () => void;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof ScreenGroupSetting, Pick<React.ClassAttributes<ScreenGroupSetting> & LayoutItemSettingProps & StateToProps, "ref" | "style" | "key" | "formatMessage" | "onSettingChange" | "layoutId" | "additionalInfo" | "layoutItem" | "isLockLayout" | "onStyleChange" | "onPosChange"> & LayoutItemSettingProps>;
export default _default;
