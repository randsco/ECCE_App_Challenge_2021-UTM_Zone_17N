import { ImmutableObject } from 'jimu-core';
/**
 * Config of one proxy item. Will use the config to create app proxy after clicking save button.
 */
export interface ProxySettingConfig {
    sourceUrl: string;
    hitsPerInterval?: number;
    intervalSeconds?: number;
}
export declare type IMProxySettingConfig = ImmutableObject<ProxySettingConfig>;
