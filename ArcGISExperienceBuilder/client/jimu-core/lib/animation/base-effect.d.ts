import { AnimationHanlder, AnimationProps, AnimationType } from './types';
export declare const DEFAULT_ANIMATION_PROPS: Partial<AnimationProps>;
export declare abstract class BaseEffect implements AnimationHanlder {
    option: any;
    type: AnimationType;
    constructor(type: AnimationType, option?: any);
    abstract initProps(): AnimationProps;
    abstract animateProps(): AnimationProps;
    abstract endProps(): AnimationProps;
    generateProps(props: AnimationProps): AnimationProps;
    getConfigType(): any;
    transform(props: AnimationProps, offsetX: string, offsetY: string): string;
    clippath(props: AnimationProps): string;
    propsOnXY(_x: number, _y: number): AnimationProps;
    hasMoveEffect(): boolean;
}
export declare function interpolateTransform(props: AnimationProps, translateX: string, translateY: string): string;
export declare function interpolateClippath(props: AnimationProps): string;
