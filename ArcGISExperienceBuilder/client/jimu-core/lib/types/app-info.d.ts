import { ImmutableObject } from 'seamless-immutable';
import { IItem } from '@esri/arcgis-rest-types';
export interface AppInfo extends Partial<IItem> {
    name: string;
    text?: any;
    username?: string;
    thumbnail?: string;
}
export declare type IMAppInfo = ImmutableObject<AppInfo>;
export interface AppCreationInfo {
    template: string;
    name: string;
    description: string;
    tags?: string[];
    folder?: string;
    shareWithWebmap?: boolean;
    shareWithWebscene?: boolean;
    webmap?: string;
    webscene?: string;
    type?: string;
    snippet?: string;
    typeKeywords?: Array<string>;
}
