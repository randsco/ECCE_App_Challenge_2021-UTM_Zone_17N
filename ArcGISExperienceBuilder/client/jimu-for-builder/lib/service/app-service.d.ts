import { AppCreationInfo, AppConfig, IMAppConfig } from 'jimu-core';
import { IItem, IItemUpdate } from '@esri/arcgis-rest-types';
import { IParams } from '@esri/arcgis-rest-request';
import { ISearchOptions, ISharingResponse, ICreateItemResponse, IMoveItemOptions, IMoveItemResponse, IGetUserTagsResponse, IGroup, SearchQueryBuilder, ISearchResult } from '@esri/arcgis-rest-portal';
export declare function createAppByItemTemplate(appId: string, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<string>;
export declare function createTemplateByApp(appId: string, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<string>;
/**
 *title: The translated string of 'Untitled experience'
 *lable: The default template's name
*/
export declare function createAppByDefaultTemplate(title: string, lable: string): Promise<IItem>;
export declare function duplicateApp(appId: string, type: string, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<boolean>;
export declare function getAppItemData(appId: string, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<any>;
export declare function searchApp(searchOption: ISearchOptions, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<ISearchResult<IItem>>;
export declare function getItemInfo(id: string, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<IItem>;
export declare function updateAppItem(itemParam: IItemUpdate): Promise<void>;
export declare function updateAppThumbnails(itemParam: IItemUpdate, owner?: string): Promise<void>;
export declare function deleteApp(appId: string): Promise<{
    itemId: string;
    success: boolean;
}>;
export declare function saveApp(appId: string, appConfig: IMAppConfig, owner?: string): Promise<void>;
export declare function publishApp(appId: string, appConfig: IMAppConfig, typeKeywords: Array<string>, owner: string, url: string): Promise<void>;
export declare function getFolders(requestOption: IParams): Promise<any>;
export declare function addToFavorites(params: IParams): Promise<ISharingResponse>;
export declare function removeFromFavorites(params: IParams): Promise<ISharingResponse>;
export declare function getItemGroups(params: IParams): Promise<ISharingResponse>;
export declare function duplicateRelatedDataInApp(newAppId: any, originalAppId: any, isArcGisOnlineRequest?: boolean, isCreateNew?: boolean, isPortalRequest?: boolean): Promise<boolean>;
export declare function createAppItemForDuplicate(appInfo: AppCreationInfo): Promise<ICreateItemResponse>;
export declare function changeItemsFolder(params: IMoveItemOptions): Promise<IMoveItemResponse>;
export declare function getUsersTags(username: string): Promise<IGetUserTagsResponse>;
export declare function searchGroups(requestOptions: ISearchOptions | SearchQueryBuilder): Promise<ISearchResult<IGroup>>;
export declare function getDefaultTemplateConfig(appInfo: AppCreationInfo): Promise<AppConfig>;
