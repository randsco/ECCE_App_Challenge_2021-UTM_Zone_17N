/// <reference types="react" />
/** @jsx jsx */
import { React, AnimationPlayMode, AnimationSetting } from 'jimu-core';
interface OwnProps {
    effectSetting: AnimationSetting;
    oneByOneSetting: AnimationSetting;
    supportAsOne?: boolean;
    supportOneByOne?: boolean;
    previewEnabled?: boolean;
    onSettingChange: (mode: AnimationPlayMode, setting: AnimationSetting) => void;
    onPreviewClicked?: (mode: AnimationPlayMode) => void;
    formatMessage: (id: string) => string;
}
interface State {
    showSidePanel: boolean;
}
export declare class AnimationSettingComponent extends React.PureComponent<OwnProps, State> {
    static defaultProps: Partial<OwnProps>;
    constructor(props: any);
    toggleSidePanel: () => void;
    previewAnimation: (e: any) => void;
    getAnimBoxStyle(): import("jimu-core").SerializedStyles;
    getSidePopperStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
