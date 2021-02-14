import { AnimationSetting, AnimationType, AnimationPlayMode } from 'jimu-core';
/**
 * Use this hook to update animation trigger and playId.
 * Update playId when
 * 1. isPreview and playmode is not one by one
 * 2. switch from edit mode to live view mode
 * 3. page turns into view
 *
 * By default the trigger is AnimationTriggerType.Manual. Update trigger to
 * AnimationTriggerType.ScrollIntoView when
 * 1. switch from edit mode to live view mode, after animation finished
 * 2. page turns into view, after animation finished
 * @param option
 */
export declare function useAnimation(option: {
    effect: {
        [key: string]: AnimationSetting;
    };
    isPreview: boolean;
    previewId: symbol;
    playMode: AnimationPlayMode;
    isParentPlaying: boolean;
}): {
    type: AnimationType;
    trigger: string;
    playId: symbol;
    revert: boolean;
    onAnimationEnd: () => void;
};
