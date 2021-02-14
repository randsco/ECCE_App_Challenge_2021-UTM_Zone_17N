import * as React from 'react';
import { AnimationHanlder } from './types';
export interface Props {
    ref: React.RefObject<HTMLDivElement>;
    enable: boolean;
    isParentPlaying?: boolean;
    parentAnimationStyle?: any;
}
/**
 * 1. If the one by one animation is playing, use animationStyle directly.
 * @param props
 * @param ref
 */
export declare function useInheritAnimation(props: Props): [any, AnimationHanlder];
