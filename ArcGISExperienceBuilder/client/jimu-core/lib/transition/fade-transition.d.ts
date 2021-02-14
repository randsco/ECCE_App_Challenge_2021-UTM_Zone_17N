import { AnimationProps } from '../animation';
import { TransitionHandler } from './types';
export declare class FadeTransition implements TransitionHandler {
    getTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean, progress?: number): AnimationProps;
    getDiscreteTransitionProps(i: number, currentIndex: number, previousIndex: number): AnimationProps;
    getContinuousTransitionProps(i: number, currentIndex: number, previousIndex: number, progress?: number): AnimationProps;
    transform(props: AnimationProps, i: number, currentIndex: number, previousIndex: number, progress: number): string;
}
