import { AppConfig } from '../types/app-config';
export interface ReplaceOperator {
    matchFunction: any;
    matchHandle: any;
}
export declare function getRealAppResourceUrl(): string;
export declare function appendPortalInfoToResource(appConfig: AppConfig, token: string): Promise<AppConfig>;
export declare function cleanPortalInfoFromResource(appConfig: AppConfig): AppConfig;
export declare function replaceAppConfigNodeValue(appConfig: AppConfig, replaceOperator: ReplaceOperator): Promise<AppConfig>;
