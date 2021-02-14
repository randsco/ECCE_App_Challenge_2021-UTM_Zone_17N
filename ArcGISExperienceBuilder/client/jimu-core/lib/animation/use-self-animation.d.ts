import * as React from 'react';
import { AnimationType, AnimationHanlder, AnimationDirection, AnimationEffectType } from './types';
export interface Props {
    type: AnimationType;
    ref: React.RefObject<HTMLDivElement>;
    trigger?: string;
    revert?: boolean;
    configType?: AnimationEffectType;
    direction?: AnimationDirection;
    playId?: symbol;
    isParentPlaying?: boolean;
    isParentRevert?: boolean;
    parentPlayId?: symbol;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
}
/**
 * Process animation state of a widget configured on itself
 * @param props
 * @param ref
 */
export declare function useSelfAnimation(props: Props): [any, AnimationHanlder];
