import { IRequestOptions, IParams } from '@esri/arcgis-rest-request';
import { IItem } from '@esri/arcgis-rest-types';
import { ISearchOptions, SearchQueryBuilder, ISearchResult, IUserItemOptions, IUpdateItemOptions, IUpdateItemResponse, ICreateItemOptions, ICreateItemResponse, IItemDataOptions, IItemResourceOptions, IItemResourceResponse, ISharingResponse, IMoveItemOptions, IMoveItemResponse, IGetUserOptions, IGetUserTagsResponse, IGroup } from '@esri/arcgis-rest-portal';
export declare function searchItems(search: string | ISearchOptions | SearchQueryBuilder, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<ISearchResult<IItem>>;
export declare function removeItem(requestOptions: IUserItemOptions): Promise<{
    success: boolean;
    itemId: string;
}>;
export declare function updateItem(requestOptions: IUpdateItemOptions): Promise<IUpdateItemResponse>;
export declare function updateAppThumbnail(requestOptions: IUpdateItemOptions): Promise<IUpdateItemResponse>;
export declare function createItem(requestOptions: ICreateItemOptions): Promise<ICreateItemResponse>;
export declare function getItem(id: string, requestOptions?: IRequestOptions, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<IItem>;
export declare function getItemData(id: string, requestOptions?: IItemDataOptions, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<any>;
export declare function getItemResources(id: string, requestOptions?: IRequestOptions, isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): Promise<any>;
export declare function addItemResource(requestOptions: IItemResourceOptions): Promise<IItemResourceResponse>;
export declare function updateItemResource(requestOptions: IItemResourceOptions): Promise<IItemResourceResponse>;
export declare function shareItemWithGroup(requestOptions: IParams): Promise<ISharingResponse>;
export declare function unshareItemWithGroup(requestOptions: IParams): Promise<ISharingResponse>;
export declare function itemsgroups(requestOptions: IParams): Promise<ISharingResponse>;
export declare function removeItemResource(requestOptions: IItemResourceOptions): Promise<{
    success: boolean;
}>;
export declare function getItemsGroups(requestOptions: IParams): Promise<ISharingResponse>;
export declare function moveItem(requestOptions: IMoveItemOptions): Promise<IMoveItemResponse>;
export declare function getUserTags(requestOptions: IGetUserOptions): Promise<IGetUserTagsResponse>;
export declare function searchGroup(requestOptions: ISearchOptions | SearchQueryBuilder): Promise<ISearchResult<IGroup>>;
export declare function getUserContent(requestOptions: IParams): any;
export declare function getResourceOrigin(isArcGisOnlineRequest?: boolean, isPortalRequest?: boolean): string;
