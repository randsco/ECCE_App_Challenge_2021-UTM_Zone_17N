import { ServiceInfo, ArcGISServerInfo } from './types/common';
import { ServiceDefinition } from './types/service-definition';
export default class ServiceManager {
    static instance: ServiceManager;
    static getInstance(): ServiceManager;
    private servicesInfo;
    private servicesInfoPromise;
    private arcGISServersInfo;
    private arcGISServersInfoPromise;
    getServiceInfo(url: string): ServiceInfo;
    setServiceInfo(url: string, info: ServiceInfo): void;
    getServerInfo(serverUrl: string): ArcGISServerInfo;
    getServerInfoByServiceUrl(serviceUrl: string): ArcGISServerInfo;
    fetchServiceInfo(url: string): Promise<ServiceInfo>;
    isHostedServiceInSamePortal(url: string): Promise<boolean>;
    fetchArcGISServerInfo(serviceUrl: string): Promise<ArcGISServerInfo>;
    getArcGISServerUrlFromServiceUrl(serviceUrl: string): string;
    /**
     * return true if it's hosted service
     * @param url
     */
    isHostedService(url: string): Promise<boolean>;
    /**
     * Only return definitions of child layers (not including all descendant layers).
     * Instead of tree structure, all descendant layers in a service are in an array.
     * This method is used to find child layers from a service.
     * @param {string[]} urls Urls of all child layers (including all descendant layers).
     */
    fetchChildLayerDefinitionsFromUrls(urls: string[]): Promise<{
        [url: string]: ServiceDefinition;
    }>;
    /**
     * Return all child layer ids of group layers, including all descendant layers.
     */
    private _getAllChildLayerIdsOfGroupLayer;
    /**
     * Only return child layer ids of group layers, not including all descendant layers.
     */
    private _getChildLayerIdsFromGroupLayerDefinitions;
}
