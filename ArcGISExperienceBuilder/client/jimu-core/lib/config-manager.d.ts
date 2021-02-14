import { AppConfig, IMAppConfig } from './types/app-config';
import { IntlShape } from 'react-intl';
export default class ConfigManager {
    static instance: ConfigManager;
    static getInstance(options: {
        intl: IntlShape;
    }): ConfigManager;
    constructor(options: any);
    intl: IntlShape;
    loadAppConfig(): Promise<IMAppConfig>;
    private initTrackingManager;
    private _loadAndProcessAppConifg;
    processWebTierPortalConfig(appConfig: AppConfig): Promise<boolean>;
    processRawConfig(appConfig: AppConfig): Promise<AppConfig>;
    private loadAppInfo;
    private setDocumentTitle;
    loadRawAppConfig(): Promise<AppConfig>;
    /**
     * By default, app can load app config from:
     *  ?config=<url>: relative or absolute URL
     *  ?id=<app id>: the item id.
     *  /:appId?:
     */
    loadAppConfigWithDefault(): Promise<AppConfig>;
    loadAppConfigFromLocalServer(appId: string): Promise<AppConfig>;
    loadAppConfigFromPortal(appId: string): Promise<AppConfig>;
    private _handleAuthError;
    applyAppConfigProcessorExtension(appConfig: AppConfig): Promise<AppConfig>;
    loadAllWidgetsManifest(appConfig: AppConfig): Promise<AppConfig>;
    processAppConfigAfterLoad(appConfig: AppConfig): void;
    handlePortalResourceInConfig(appConfig: AppConfig): Promise<AppConfig>;
    handleEmbedMode(appConfig: AppConfig): void;
    addDefaultPageStructure(appConfig: AppConfig): void;
    fixAllIds(appConfig: AppConfig): void;
    fixId(section: any): void;
    fixWidgetUri(appConfig: AppConfig): void;
    fixThemeUri(appConfig: AppConfig): void;
    addWidgetContext(appConfig: AppConfig): void;
    addDefaultValues(appConfig: AppConfig): AppConfig;
    addDefaultPageVisible(appConfig: AppConfig): void;
    addDefaultLabelAndIcon(appConfig: AppConfig): void;
}
