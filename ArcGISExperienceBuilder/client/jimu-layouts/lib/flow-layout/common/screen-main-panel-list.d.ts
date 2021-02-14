/// <reference types="react" />
/** @jsx jsx */
import { React, ScreenTransitionType, ImmutableArray, IMThemeVariables } from 'jimu-core';
import type { LayoutProps } from 'jimu-layouts/layout-runtime';
export interface Props {
    pageId: string;
    activeIndex: number;
    viewHeight?: number;
    headerHeight: number;
    screens: ImmutableArray<string>;
    isSmallSize: boolean;
    transitionType: ScreenTransitionType;
    layoutEntry: React.ComponentType<LayoutProps>;
    isDesignMode?: boolean;
    formatMessage?: (id: string) => string;
    builderTheme?: IMThemeVariables;
}
export declare function ScreenMainPanelList(props: Props): JSX.Element;
