import { IItem } from '@esri/arcgis-rest-types';
import { IMDataSourceJson } from 'jimu-core';
export declare function isSubscriber(item: IItem, serviceUrl: string): boolean;
export declare function isPremium(item: IItem, serviceUrl: string): boolean;
export declare function getDsJsonFromItem(item: IItem, AllDataSourceTypes: any): IMDataSourceJson;
