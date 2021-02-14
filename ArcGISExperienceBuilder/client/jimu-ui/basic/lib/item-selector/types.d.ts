import { SupportedItemTypes } from 'jimu-core';
import { IItem } from '@esri/arcgis-rest-types';
export { SupportedItemTypes as ItemTypes };
export declare enum ItemCategory {
    MyContent = "MY_CONTENT",
    MyGroup = "MY_GROUP",
    MyOrganization = "MY_ORGANIZATION",
    Public = "PUBLIC",
    LivingAtlas = "LIVING_ATLAS"
}
export declare enum SortField {
    Modified = "modified",
    Title = "title",
    Views = "numViews"
}
export declare enum SortOrder {
    Desc = "desc",
    Asc = "asc"
}
export interface ItemFolder {
    id: string;
    title: string;
    created?: number;
    username?: string;
}
export interface IItemWithPortalUrl extends IItem {
    portalUrl: string;
}
