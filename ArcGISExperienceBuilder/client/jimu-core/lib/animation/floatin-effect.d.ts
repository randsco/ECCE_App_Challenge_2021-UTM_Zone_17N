import { BaseEffect } from './base-effect';
import { AnimationProps, AnimationDirection } from './types';
export declare class FloatInEffect extends BaseEffect {
    direction: AnimationDirection;
    constructor(option?: any);
    from(): {
        offsetX: number;
        offsetY: number;
    };
    initProps(): AnimationProps;
    animateProps(): AnimationProps;
    endProps(): AnimationProps;
}
