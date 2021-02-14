import { AnimationProps } from '../animation';
import { TransitionHandler, TransitionDirection } from './types';
export declare class CubeTransition implements TransitionHandler {
    private isRTL;
    private direction;
    constructor(isRTL?: boolean, direction?: TransitionDirection);
    initState(progress: number, i: number, currentIndex: number, previousIndex: number): [number, number];
    getContinuousOrigin(i: number, currentIndex: number, previousIndex: number): string;
    getDiscreteOrigin(i: number, currentIndex: number, previousIndex: number, loop: boolean): string;
    getTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    getDiscreteTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean): AnimationProps;
    getContinuousTransitionProps(i: number, currentIndex: number, previousIndex: number, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    transform(props: AnimationProps, i: number, currentIndex: number, previousIndex: number, progress: number): string;
}
