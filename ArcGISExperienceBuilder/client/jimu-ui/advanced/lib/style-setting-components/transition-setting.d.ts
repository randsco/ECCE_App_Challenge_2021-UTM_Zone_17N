/// <reference types="react" />
/** @jsx jsx */
import { React, AnimationSetting, TransitionType, TransitionDirection } from 'jimu-core';
import { TransitionMetaInfo } from 'jimu-for-builder';
interface OwnProps {
    transition: {
        type: TransitionType;
        direction: TransitionDirection;
    };
    transitionLabel?: string;
    showOneByOne?: boolean;
    oneByOneEffect?: AnimationSetting;
    onTransitionChange: ({ type: TransitionType, direction: TransitionDirection }: {
        type: any;
        direction: any;
    }) => void;
    onOneByOneChange?: (AnimationSetting: any) => void;
    onPreviewTransitionClicked: () => void;
    onPreviewOneByOneClicked?: () => void;
    onPreviewAsAWhoneClicked: () => void;
    formatMessage: (id: string) => string;
}
interface State {
    showSidePanel: boolean;
}
export declare class TransitionSetting extends React.PureComponent<OwnProps, State> {
    static defaultProps: Partial<OwnProps>;
    modalStyle: any;
    constructor(props: any);
    toggleSidePanel: () => void;
    previewTransition: (e: any) => void;
    createTransitionCard(metaInfo: TransitionMetaInfo, index: number): JSX.Element;
    createDirectionChooser(): JSX.Element;
    getSidePopperStyle(): import("jimu-core").SerializedStyles;
    getAnimBoxStyle(): import("jimu-core").SerializedStyles;
    onTransitionTypeChanged: (value: any) => void;
    onDirectionChanged: (e: any) => void;
    previewOneByOneEffect: () => void;
    onPreviewAsAWhoneClicked: (e: any) => void;
    onOnebyOneSettingChange: (mode: any, setting: any) => void;
    render(): JSX.Element;
}
export {};
