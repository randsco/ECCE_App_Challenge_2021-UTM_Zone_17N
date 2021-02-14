/// <reference types="react" />
/** @jsx jsx */
import { React, IMScreenJson, ScreenTransitionType, ScreenTriggerType } from 'jimu-core';
import type { LayoutProps } from 'jimu-layouts/layout-runtime';
export declare type Props = {
    index: number;
    isLast: boolean;
    viewHeight?: number;
    headerHeight: number;
    screenId: string;
    refElement: HTMLDivElement;
    layoutEntry: React.ComponentType<LayoutProps>;
    isActive: boolean;
    transitionType: ScreenTransitionType;
    screenTransitionType: ScreenTransitionType;
    triggerType: ScreenTriggerType;
    stretched: boolean;
    verticalSpace: string;
    isSmallSize: boolean;
    onHeightChange: (index: number, height: number) => void;
    onInterctionChange: (index: number, isIntersecting: boolean) => void;
};
export declare function getSidePanelStyle(props: IMScreenJson, viewHeight: number, headerHeight: number, isActive: boolean, verticalSpace: string, stretched: boolean, transitionType: ScreenTransitionType, screenTransitionType: ScreenTransitionType, isSmallSize: boolean): import("jimu-core").SerializedStyles;
export declare function ScreenSidePanel(props: Props): JSX.Element;
