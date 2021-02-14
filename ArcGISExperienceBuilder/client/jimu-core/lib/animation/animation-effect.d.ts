import * as React from 'react';
import { AnimationType, AnimationDirection, AnimationEffectType } from './types';
export interface AnimationProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Animation type, includes:
     * AnimationType.FadeIn
     * AnimationType.FlyIn
     * AnimationType.ZoomIn
     * AnimationType.WipeIn
     * AnimationType.SpinIn
     * AnimationType.FloatIn
     */
    type: AnimationType;
    children: React.ReactElement | React.ReactNode;
    /**
     * AnimationTriggerType
     */
    trigger?: string;
    /**
     * If it is `true`, the component will be transparent. Combined with manual trigger
     */
    revert?: boolean;
    style?: any;
    /**
     * Is playing one by one animation
     */
    isParentPlaying?: boolean;
    isParentRevert?: boolean;
    isParentEnableScroll?: boolean;
    parentAnimationStyle?: any;
    /**
     * If provided and its value is different from previous one, animation will play automatically
     */
    parentPlayId?: symbol;
    className?: string;
    /**
     * Set animation effects. Inclues:
     * AnimationEffectType.Default
     * AnimationEffectType.Gentle
     * AnimationEffectType.Wobbly
     * AnimationEffectType.Stiff
     * AnimationEffectType.Slow
     * AnimationEffectType.Molasses
     */
    configType?: AnimationEffectType;
    /**
     * Direction of the animation. Only some of the animation types support direction.
     */
    direction?: AnimationDirection;
    /**
     * If provided and its value is different from previous one, animation will play automatically
     */
    playId?: symbol;
    onAnimationStart?: () => void;
    /**
     * Callback function when the animation is end
     */
    onAnimationEnd?: () => void;
}
export declare const Animation: React.ForwardRefExoticComponent<AnimationProps & React.RefAttributes<HTMLDivElement>>;
