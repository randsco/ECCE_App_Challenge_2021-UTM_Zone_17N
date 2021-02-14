import * as React from 'react';
import { AnimationProps } from '../animation';
export declare enum TransitionDirection {
    Horizontal = "H",
    Vertical = "V"
}
export declare enum TransitionType {
    Cube = "CUBE",
    Cover = "COVER",
    Fade = "FADE",
    Push = "PUSH",
    Box = "BOX",
    None = "None"
}
export interface TransitionContainerProps {
    children: React.ReactNode | React.ReactNode[];
    /**
     * If use progress to navigate the contents
     */
    useProgress?: boolean;
    /**
     * If navigate in predefined step
     */
    useStep?: boolean;
    /**
     * Navigation progress whose value is from 0.0 to 1.0
     */
    progress?: number;
    /**
     * The content index which is active before navigation.
     */
    previousIndex?: number;
    /**
     * The content index which is active after navigation.
     */
    currentIndex?: number;
    /**
     * Direction of the transition. TransitionDirection.Horizontal or TransitionDirection.Vertical.
     */
    direction?: TransitionDirection;
    /**
     * Type of the transition effect. Includes:
     * TransitionType.Cube
     * TransitionType.Cover
     * TransitionType.Fade
     * TransitionType.Push
     * TransitionType.Box
     * TransitionType.None
     */
    transitionType?: TransitionType;
    /**
     * Used in builder to preview the transition effect.
     */
    playId?: symbol;
    /**
     * Used to specify if the widgets animation should be played.
     */
    withOneByOne?: boolean;
    loop?: boolean;
}
export interface TransitionHandler {
    /**
     * Calculate transition props of all items
     * @param i index of the item
     * @param progress the progress of the transition
     * @param currentIndex currently selected item
     * @param previousIndex previously selected item
     * @param isInitTransitionStyle only useful in continuous change. Move the current view to the start point if it is ture
     */
    getTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    /**
     * Interpolate styles for current and previous item.
     * Interpolate can only be invoked in the render method of react-spring
     * @param props
     * @param isCurrent
     * @param progress
     */
    transform(props: AnimationProps, i: number, currentIndex: number, previousIndex: number, progress: number): string;
}
