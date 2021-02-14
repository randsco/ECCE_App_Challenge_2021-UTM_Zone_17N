import { ImmutableObject } from 'jimu-core';
export interface IconGroup {
    [iconKey: string]: string;
}
export interface IconGroups {
    [groupKey: string]: IconGroup;
}
export interface IconList {
    groups: IconGroups;
}
export declare type IMIconGroup = ImmutableObject<IconGroup>;
export declare type IMIconGroups = ImmutableObject<IconGroups>;
export declare type PublicIconGroupType = 'general' | 'arrows' | 'sns';
export declare type ConfigurableOption = 'color' | 'size' | 'all' | 'none';
export interface PreviewOptions {
    color?: boolean;
    size?: boolean;
    autoFlip?: boolean;
}
