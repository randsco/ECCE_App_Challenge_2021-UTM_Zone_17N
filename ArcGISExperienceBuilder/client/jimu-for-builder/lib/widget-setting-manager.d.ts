import * as React from 'react';
import { WidgetItemSettingProps } from './props';
import { i18n } from 'jimu-core';
import { RawWidgetSettingType, WrappedWidgetSettingType } from './base-widget-setting';
export default class WidgetSettingManager {
    static instance: WidgetSettingManager;
    static getInstance(): WidgetSettingManager;
    constructor();
    private settings;
    private getWidgetUri;
    private getWidgetManifestByUri;
    updateWidgetCache(uri: string, obj: any): void;
    getWidgetSettingClass(widgetId: string): WrappedWidgetSettingType;
    deleteWidgetSettingClass(widgetId: string): void;
    getItemSettingClass(widgetId: string): React.ComponentClass<WidgetItemSettingProps, any>;
    getSettingI18nMessagesByUri(widgetUri: string): i18n.I18nMessages;
    deleteAllWidgetSettingClasses(): void;
    loadWidgetSettingClass(widgetId: string): Promise<WrappedWidgetSettingType>;
    private checkWidgetUriInConfig;
    private loadWidgetSettingClassByUri;
    loadRawSettingClass(uri: string): Promise<RawWidgetSettingType>;
    loadI18nMessagesForSetting(uri: string): Promise<i18n.I18nMessages>;
    loadWidgetSettingDependency(uri: string): Promise<void>;
    loadItemSettingClass(widgetId: string): Promise<React.ComponentClass<WidgetItemSettingProps>>;
    private loadItemSettingClassByUri;
    loadRawItemSettingClass(uri: any): Promise<React.ComponentClass<WidgetItemSettingProps>>;
    injectWidgetSettingProps(uri: string): WrappedWidgetSettingType;
    private onStoreChange;
}
