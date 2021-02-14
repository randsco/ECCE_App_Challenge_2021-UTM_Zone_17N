import { AnimationSetting, AnimationType } from 'jimu-core';
export declare function useAnimation(option: {
    effect: AnimationSetting;
}): {
    type: AnimationType;
    trigger: string;
    playId: symbol;
    revert: boolean;
    onAnimationEnd: () => void;
};
