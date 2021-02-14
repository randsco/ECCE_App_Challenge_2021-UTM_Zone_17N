import * as React from 'react';
import { AnimationSetting } from './types';
export declare const AnimationContext: React.Context<AnimationContextProps>;
export declare type AnimationContextProps = {
    trigger: string;
    setting: AnimationSetting;
    inheritedOneByOneSetting: AnimationSetting;
    playId: symbol;
    delay?: number;
    revert?: boolean;
    depth: number;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
};
