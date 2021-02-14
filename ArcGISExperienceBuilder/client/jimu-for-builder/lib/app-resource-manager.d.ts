import { AppConfig, ResourceType, AjaxState } from 'jimu-core';
import { IItemResourceResponse } from '@esri/arcgis-rest-portal';
export interface ResourceItemInfo {
    id?: string;
    appId?: string;
    file?: Blob | string;
    fileName?: string;
    fileFormat?: string;
    originalName?: string;
    url?: string;
    resourcesPrefix?: string;
    blobUrl?: string;
    resourceUrl?: string;
    type?: ResourceType;
    status?: AjaxState;
    widgetId?: string;
    size?: number;
    created?: number;
    owner?: string;
    promise?: Promise<any>;
}
export interface ImageResourceItemInfo extends ResourceItemInfo {
    width?: number;
    height?: number;
    referedIds?: string[];
    originId?: string;
    isUseCompress?: boolean;
}
interface ResourcesInDraft {
    imageResources?: {
        [id: string]: ImageResourceItemInfo;
    };
}
export declare class AppResourceManager {
    static _instance: AppResourceManager;
    static getInstance(): any;
    private resourceMap;
    private blobToResourceMap;
    private resourcesInDraft;
    getResourcesInDraft: () => ResourcesInDraft;
    setResourcesInDraft: (resourcesInDraft: ResourcesInDraft) => void;
    getResourceItem(resourceKey: string): ResourceItemInfo;
    getResourceMap(): any;
    setResourceItem(resourceKey: string, resourceItemInfo: ResourceItemInfo): void;
    clearResources(appId: any): void;
    getAppId(): string;
    addAppItemResource(resourceItemInfo: ResourceItemInfo): Promise<IItemResourceResponse>;
    getAppItemResources(resourceItemInfo: ResourceItemInfo): Promise<any>;
    updateAppItemResource(resourceItemInfo: ResourceItemInfo): Promise<IItemResourceResponse>;
    removeAppItemResource(resourceItemInfo: ResourceItemInfo): Promise<any>;
    getLocalCacheResourceUrl(resourceItemInfo: ResourceItemInfo): Promise<ResourceItemInfo>;
    getBlobByBlobUrl(blobUrl: any): Promise<any>;
    getResourcePrefix(resourceItemInfo: ResourceItemInfo): string;
    upLoadFileToResource(resourceItemInfo: ResourceItemInfo): Promise<any>;
    setAppConfigLocalFileToResource(appConfig: AppConfig): Promise<any>;
    uploadImageConfigFileToPortal(imageResourcesConfig: any, appConfig: AppConfig): Promise<any>;
    setConfigLocalFileToResource(config: any): Promise<any>;
    checkResourcesUploadStatus(checkResources: Array<string>): Promise<AjaxState>;
    uploadAppConfigFileToPortal(appID: string, appConfig: AppConfig, owner: string): Promise<void>;
    getConfigFromItemResource(appID: string): Promise<AppConfig>;
    setResourceItemInfoStatus(resourceItemInfo: ResourceItemInfo, status: AjaxState): void;
    getResourcesInAppConfig: (appConfig: AppConfig) => Promise<Array<ResourceItemInfo>>;
    setImageResourcesInDraft: (imageResources: {
        [id: string]: ImageResourceItemInfo;
    }) => void;
    getImageResourcesInDraft: (appId: string, widgetId?: string) => Promise<{
        [id: string]: ImageResourceItemInfo;
    }>;
    updateImageResourceItemInfo: (imageResourceItemInfo: ImageResourceItemInfo) => void;
    uploadImageResourcesConfig: (imageResources: {
        [id: string]: ImageResourceItemInfo;
    }) => Promise<any>;
    cleanValueInImageResourcesConfig: (appId: string, unnecessaryResourceArr: any[]) => Promise<any[]>;
    removeUnnecessaryResources(appId: any): void;
}
export {};
