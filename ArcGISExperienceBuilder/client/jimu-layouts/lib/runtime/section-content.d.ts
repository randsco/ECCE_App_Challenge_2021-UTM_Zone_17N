/// <reference types="react" />
/** @jsx jsx */
import { React, AnimationPlayMode, TransitionType, TransitionDirection, IMSectionNavInfo, ImmutableArray } from 'jimu-core';
import { LayoutProps } from '../types';
interface Props {
    views: ImmutableArray<string>;
    navInfo: IMSectionNavInfo;
    animationPreview: boolean;
    playMode: AnimationPlayMode;
    currentIndex: number;
    previousIndex: number;
    progress: number;
    loop: boolean;
    viewTransition: {
        type: TransitionType;
        direction: TransitionDirection;
    };
    layoutEntryComponent: React.ComponentClass<LayoutProps>;
    viewVisibilityContext: React.ComponentClass;
}
export declare function SectionContent(props: Props): JSX.Element;
export {};
