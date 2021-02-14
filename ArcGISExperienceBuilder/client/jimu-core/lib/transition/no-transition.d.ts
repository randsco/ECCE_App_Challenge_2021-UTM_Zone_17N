import { AnimationProps } from '../animation';
import { TransitionHandler } from './types';
export declare class NoTransition implements TransitionHandler {
    getTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean, progress?: number): AnimationProps;
    transform(props: AnimationProps, i: number, currentIndex: number, previousIndex: number, progress: number): string;
}
