import { TransitionType } from 'jimu-core';
export interface TransitionMetaInfo {
    type: TransitionType;
    icon?: any;
    supportDirection?: boolean;
}
export declare const transitionInfos: TransitionMetaInfo[];
