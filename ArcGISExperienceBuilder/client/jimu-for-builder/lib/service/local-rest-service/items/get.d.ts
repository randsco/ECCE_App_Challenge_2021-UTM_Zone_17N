import { IRequestOptions } from '@esri/arcgis-rest-request';
import { IItem } from '@esri/arcgis-rest-types';
import { IItemDataOptions } from './helpers';
export declare function getItemData(id: string, requestOptions?: IItemDataOptions, isArcGisOnlineRequest?: boolean): Promise<any>;
export declare function getItem(id: string, requestOptions?: IRequestOptions, isArcGisOnlineRequest?: boolean): Promise<IItem>;
export declare function getItemResources(id: string, requestOptions?: IRequestOptions, isArcGisOnlineRequest?: boolean): Promise<any>;
