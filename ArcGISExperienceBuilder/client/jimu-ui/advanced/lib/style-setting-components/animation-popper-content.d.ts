/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, AnimationPlayMode, AnimationSetting } from 'jimu-core';
interface OwnProps {
    effectSetting: AnimationSetting;
    oneByOneSetting: AnimationSetting;
    onSettingChange: (mode: AnimationPlayMode, setting: AnimationSetting) => void;
    previewEnabled?: boolean;
    supportOneByOne?: boolean;
    supportAsOne?: boolean;
    onPreviewClicked?: (mode: AnimationPlayMode) => void;
    formatMessage: (id: string) => string;
}
interface State {
    asOneOpened: boolean;
    oneByOneOpened: boolean;
}
interface StateToProps {
    selectedWidgetLabel: string;
}
declare class AnimationPopperContent extends React.PureComponent<OwnProps & StateToProps, State> {
    constructor(props: any);
    onAsOneSettingChange: (setting: AnimationSetting) => void;
    onOneByOneSettingChange: (setting: AnimationSetting) => void;
    previewAsOne: () => void;
    previewOneByOne: () => void;
    toggleAsOneOpened: () => void;
    toggleOneByOneOpened: () => void;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof AnimationPopperContent, Pick<React.ClassAttributes<AnimationPopperContent> & OwnProps & StateToProps, "ref" | "key" | "formatMessage" | "effectSetting" | "oneByOneSetting" | "supportAsOne" | "supportOneByOne" | "previewEnabled" | "onSettingChange" | "onPreviewClicked"> & OwnProps>;
export default _default;
