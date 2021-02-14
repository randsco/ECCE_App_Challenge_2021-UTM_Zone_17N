import { AnimationSetting } from 'jimu-core';
export declare function useOneByOneAnimation(option: {
    effect: AnimationSetting;
    isInSection: boolean;
}): {
    setting: AnimationSetting;
    trigger: string;
    inheritedOneByOneSetting: AnimationSetting;
    playId: symbol;
    depth: number;
    revert: boolean;
    onAnimationEnd: () => void;
};
