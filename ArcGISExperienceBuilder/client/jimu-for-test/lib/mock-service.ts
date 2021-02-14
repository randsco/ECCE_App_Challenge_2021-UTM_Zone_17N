import { ArcGISServerInfo, ServiceDefinition, ServiceManager } from 'jimu-core';
import { IQueryFeaturesResponse } from '@esri/arcgis-rest-feature-layer';

export interface MockQuery{
  url: string;
  result: IQueryFeaturesResponse;
  delay?: number;
}

export interface MockFeatureLayerData{
  url: string;
  serverInfo: ArcGISServerInfo;
  layerDefinition: ServiceDefinition;
  queries?: MockQuery[];
}

export function mockFeatureLayer(mockData: MockFeatureLayerData){
  const serverInfoUrl = ServiceManager.getInstance().getArcGISServerUrlFromServiceUrl(mockData.url);

  fetchMock.mockResponse(req => {
    const reqUrl = decodeURIComponent(req.url);
    if (reqUrl === serverInfoUrl) {
      return Promise.resolve(JSON.stringify(mockData.serverInfo));
    } else if (reqUrl.split('?')[0] === mockData.url) {
      return Promise.resolve(JSON.stringify(mockData.layerDefinition)); // schema
    } else {
      const query = mockData.queries && mockData.queries.find(q => decodeURIComponent(q.url) === reqUrl);
      if(query){
        if(query.delay){
          return new Promise(resolve => {
            setTimeout(() => {
              return resolve(JSON.stringify(query.result));
            }, query.delay)
          });
        }else{
          return Promise.resolve(JSON.stringify(query.result));
        }
      }else{
        console.log(`${reqUrl} is not mocked.`);
        return Promise.resolve({status: 404});
      }
    }
  })
}

export interface MockLayer{
  url: string; // layer url, e.g. https://xxx/arcgis/rest/services/xxx/FeatureServer/0.
  layerDefinition: ServiceDefinition;
}

export interface MockServiceData{
  url: string; // service url, e.g. https://xxx/arcgis/rest/services/xxx/FeatureServer.
  serverInfo: ArcGISServerInfo;
  serviceDefinition: ServiceDefinition;
  layers?: MockLayer[];
}

/**
 * Mock feature service, map service or scene service.
 */
export function mockService(mockData: MockServiceData){
  const serverInfoUrl = ServiceManager.getInstance().getArcGISServerUrlFromServiceUrl(mockData.url);

  fetchMock.mockResponse(req => {
    const reqUrl = decodeURIComponent(req.url);
    if (reqUrl === serverInfoUrl) {
      return Promise.resolve(JSON.stringify(mockData.serverInfo));
    } else if (reqUrl.split('?')[0] === mockData.url) {
      return Promise.resolve(JSON.stringify(mockData.serviceDefinition));
    } else {
      const layer = mockData.layers && mockData.layers.find(l => reqUrl.split('?')[0] === l.url);
      if(layer){
        return Promise.resolve(JSON.stringify(layer.layerDefinition));
      }else{
        console.log(`${reqUrl} is not mocked.`);
        return Promise.resolve({status: 404});
      }
    }
  })
}
