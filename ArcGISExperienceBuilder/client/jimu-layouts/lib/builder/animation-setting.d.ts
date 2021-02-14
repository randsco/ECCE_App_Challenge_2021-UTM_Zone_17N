/// <reference types="react" />
/** @jsx jsx */
import { React, LayoutInfo, ImmutableObject, ReactRedux, AnimationPlayMode, AnimationSetting, TransitionType, TransitionDirection } from 'jimu-core';
import { CommonLayoutItemSetting } from 'jimu-layouts/layout-runtime';
interface OwnProps {
    layoutId: string;
    layoutItemId: string;
    onSettingChange?: (layoutInfo: LayoutInfo, setting: any) => void;
    formatMessage: (id: string) => string;
}
interface StateProps {
    setting: ImmutableObject<CommonLayoutItemSetting>;
    isWidget: boolean;
    isLayoutWidget: boolean;
    isSection: boolean;
    transitionType?: TransitionType;
    transitionDirection?: TransitionDirection;
    sectionId?: string;
}
interface State {
    animationType: 'in' | 'transition';
}
declare class LayoutItemAnimationSetting extends React.PureComponent<OwnProps & StateProps, State> {
    modalStyle: any;
    constructor(props: any);
    hasAnimationEffect(): boolean;
    onTransitionSettingChange: (setting: any) => void;
    onEffectSettingChange: (mode: AnimationPlayMode, efffectSetting: AnimationSetting) => void;
    onSectionOneByOneEffectSettingChange: (efffectSetting: AnimationSetting) => void;
    previewAnimation: (mode: AnimationPlayMode) => void;
    previewTransition: (withOneByOne?: boolean) => void;
    previewTransitionAndOnebyOne: () => void;
    previewOneByOneInSection: () => void;
    onPlayModeChange: (mode: AnimationPlayMode) => void;
    switchToIn: () => void;
    switchToTransition: () => void;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof LayoutItemAnimationSetting, Pick<React.ClassAttributes<LayoutItemAnimationSetting> & OwnProps & StateProps, "ref" | "key" | "formatMessage" | "onSettingChange" | "layoutId" | "layoutItemId"> & OwnProps>;
export default _default;
