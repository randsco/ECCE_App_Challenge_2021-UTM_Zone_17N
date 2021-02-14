import { BaseEffect } from './base-effect';
import { AnimationProps } from './types';
export declare class FadeInEffect extends BaseEffect {
    constructor(option?: any);
    initProps(): AnimationProps;
    animateProps(): AnimationProps;
    endProps(): AnimationProps;
}
