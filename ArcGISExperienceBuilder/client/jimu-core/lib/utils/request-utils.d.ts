import { UserSession } from '@esri/arcgis-rest-auth';
export declare function requestWrapper(desUrl: string, promiseFunc: (session: UserSession) => Promise<any>, retryLimit?: number, urlForGetSession?: string): Promise<any>;
