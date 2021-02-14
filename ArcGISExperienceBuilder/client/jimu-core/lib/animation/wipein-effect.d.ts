import { BaseEffect } from './base-effect';
import { AnimationProps, AnimationDirection } from './types';
export declare class WipeInEffect extends BaseEffect {
    direction: AnimationDirection;
    constructor(option?: any);
    getClipProp(): "clipTop" | "clipRight" | "clipLeft" | "clipBottom";
    initProps(): AnimationProps;
    animateProps(): AnimationProps;
    endProps(): AnimationProps;
}
