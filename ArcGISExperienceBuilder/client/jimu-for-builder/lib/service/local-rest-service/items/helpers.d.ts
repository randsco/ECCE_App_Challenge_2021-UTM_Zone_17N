import { IRequestOptions } from '@esri/arcgis-rest-request';
import { IItemAdd, IItemUpdate, IItem } from '@esri/arcgis-rest-types';
import { IUserRequestOptions } from '@esri/arcgis-rest-auth';
/**
 * Base options interface for making authenticated requests for items.
 */
export interface IUserItemOptions extends IUserRequestOptions {
    /**
     * Unique identifier of the item.
     */
    id: string;
    /**
     * Item owner username. If not present, `authentication.username` is utilized.
     */
    owner?: string;
}
export interface IFolderIdOptions extends IUserRequestOptions {
    /**
     * Unique identifier of the folder.
     */
    folderId: string;
    /**
     * Item owner username. If not present, `authentication.username` is utilized.
     */
    owner?: string;
}
export declare type ItemRelationshipType = 'Map2Service' | 'WMA2Code' | 'Map2FeatureCollection' | 'MobileApp2Code' | 'Service2Data' | 'Service2Service' | 'Map2AppConfig' | 'Item2Attachment' | 'Item2Report' | 'Listed2Provisioned' | 'Style2Style' | 'Service2Style' | 'Survey2Service' | 'Survey2Data' | 'Service2Route' | 'Area2Package' | 'Map2Area' | 'Service2Layer' | 'Area2CustomPackage';
export interface IItemRelationshipOptions extends IRequestOptions {
    /**
     * Unique identifier of the item.
     */
    id: string;
    /**
     * The type of relationship between the two items.
     */
    relationshipType: ItemRelationshipType | ItemRelationshipType[];
    /**
     * The direction of the relationship. Either forward (from origin -> destination) or reverse (from destination -> origin).
     */
    direction?: 'forward' | 'reverse';
}
export interface IManageItemRelationshipOptions extends IUserRequestOptions {
    originItemId: string;
    destinationItemId: string;
    relationshipType: ItemRelationshipType;
}
export interface IItemResourceOptions extends IUserItemOptions {
    /**
     * New resource filename.
     */
    name?: string;
    /**
     * Text input to be added as a file resource.
     */
    content?: string;
    /**
     * Controls whether access to the file resource is restricted to the owner or inherited from the sharing permissions set for the associated item.
     */
    private?: boolean;
    /**
     * Object to store
     */
    resource?: any;
}
export interface ICreateUpdateItemOptions extends IUserRequestOptions {
    /**
     * The owner of the item. If this property is not present, `item.owner` will be passed, or lastly `authentication.username`.
     */
    owner?: string;
    /**
     * Id of the folder to house the item.
     */
    folderId?: string;
    /**
     * The file to be uploaded. If uploading a file, the request must be a multipart request.
     */
    file?: any;
    dataUrl?: string;
    /**
     * The text content for the item to be submitted.
     */
    text?: string;
    /**
     * If true, the file is uploaded asynchronously. If false, the file is uploaded synchronously.
     */
    async?: boolean;
    /**
     * If true, the file is uploaded in multiple parts.
     */
    multipart?: boolean;
    /**
     * The filename being uploaded in multipart mode. Required if multipart=true.
     */
    filename?: string;
    /**
     * If true, overwrite the existing file.
     */
    overwrite?: boolean;
}
export interface IItemDataOptions extends IRequestOptions {
    /**
     * Used to request binary data.
     */
    file?: boolean;
}
export interface IItemPartOptions extends IUserItemOptions {
    /**
     * The file part to be uploaded.
     */
    file: any;
    partNum: number;
}
export interface IUpdateItemResponse {
    success: boolean;
    id: string;
}
export interface IItemResourceResponse {
    success: boolean;
    itemId: string;
    owner: string;
    folder: string;
}
export interface IAddFolderResponse {
    /**
     * Success or failure of request.
     */
    success: boolean;
    /**
     * Information about created folder: its alphanumeric id, name, and owner's name.
     */
    folder: {
        id: string;
        title: string;
        username: string;
    };
}
export interface IMoveItemResponse {
    /**
     * Success or failure of request.
     */
    success: boolean;
    /**
     * Alphanumeric id of moved item.
     */
    itemId: string;
    /**
     * Name of owner of item.
     */
    owner: string;
    /**
     * Alphanumeric id of folder now housing item.
     */
    folder: string;
}
/**
 * Serialize an item and its data into a json format accepted by the Portal API for create and update operations
 *
 * @param item Item to be serialized
 * @returns a formatted json object to be sent to Portal
 */
export declare function serializeItem(item: IItemAdd | IItemUpdate | IItem): any;
/**
 * requestOptions.owner is given priority, requestOptions.item.owner will be checked next. If neither are present, authentication.username will be assumed.
 */
export declare function determineOwner(requestOptions: any): string;
