import * as React from 'react';
import { IMWidgetJson, WidgetJson, AppConfig } from './types/app-config';
import { WidgetManifest } from './types/manifest';
import { WidgetProps } from './types/props';
import { WrappedWidgetType } from './base-widget';
import DataSourceManager from './data-source-manager';
import { I18nMessages } from './i18n';
import { LayoutItemConstructorProps } from './types/common';
export default class WidgetManager {
    private static instance;
    static getInstance(): WidgetManager;
    dsManager: DataSourceManager;
    constructor();
    private widgets;
    updateWidgetCache(uri: string, obj: any): void;
    widgetListInfo: LayoutItemConstructorProps[];
    getWidgetListInfo(): Promise<LayoutItemConstructorProps[]>;
    getWidgetClass(widgetId: string): React.ComponentType<WidgetProps>;
    getWidgetClassByUri(widgetUri: string): React.ComponentType<WidgetProps>;
    destroyWidget(widgetId: string): void;
    destroyAllWidgets(): void;
    private checkWidgetUriInConfig;
    loadWidgetClass(widgetId: string): Promise<React.ComponentType<WidgetProps>>;
    loadWidgetClassByUri(widgetUri: string): Promise<React.ComponentType<WidgetProps>>;
    loadRawClass(uri: string): Promise<React.ComponentType<WidgetProps>>;
    /**
     * Do not load the default string messages
     */
    loadWidgetTranslation(uri: string, manifest: WidgetManifest): Promise<I18nMessages>;
    openWidget(widgetId: string): void;
    closeWidget(widgetId: string): void;
    appWidgetClassWrapperExtension(WidgetClass: React.ComponentType<WidgetProps>, manifest: WidgetManifest): React.ComponentType<WidgetProps>;
    /**
     *
     * @param widgetJson Only `uri` is required
     */
    handleNewWidgetJson(widgetJson: WidgetJson): Promise<WidgetJson>;
    isAllowLoad(uri: string): Promise<boolean>;
    loadWidgetManifest(uri: string): Promise<WidgetManifest>;
    processWidgetManifest(widgetJson: WidgetJson): Promise<WidgetManifest>;
    /**
     *
     * @param widgetJson
     * @param appConfig pass appConfig only when the first time load. For the later added widgets, we don't need to upgrade the config
     */
    registerManifestProps(widgetJson: IMWidgetJson, appConfig?: AppConfig): Promise<void>;
    unRegisterManifestProps(widgetId: string): void;
    loadWidgetDefaultConfig(uri: string): Promise<any>;
    loadWidgetDependency(uri: string): Promise<void>;
    injectWidgetProps(uri: string): Promise<WrappedWidgetType>;
    private loadWidgetBuilderSupportModules;
    private onStoreChange;
}
