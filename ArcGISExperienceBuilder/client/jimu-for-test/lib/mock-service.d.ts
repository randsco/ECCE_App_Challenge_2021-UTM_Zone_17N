import { ArcGISServerInfo, ServiceDefinition } from 'jimu-core';
import { IQueryFeaturesResponse } from '@esri/arcgis-rest-feature-layer';
export interface MockQuery {
    url: string;
    result: IQueryFeaturesResponse;
    delay?: number;
}
export interface MockFeatureLayerData {
    url: string;
    serverInfo: ArcGISServerInfo;
    layerDefinition: ServiceDefinition;
    queries?: MockQuery[];
}
export declare function mockFeatureLayer(mockData: MockFeatureLayerData): void;
export interface MockLayer {
    url: string;
    layerDefinition: ServiceDefinition;
}
export interface MockServiceData {
    url: string;
    serverInfo: ArcGISServerInfo;
    serviceDefinition: ServiceDefinition;
    layers?: MockLayer[];
}
/**
 * Mock feature service, map service or scene service.
 */
export declare function mockService(mockData: MockServiceData): void;
