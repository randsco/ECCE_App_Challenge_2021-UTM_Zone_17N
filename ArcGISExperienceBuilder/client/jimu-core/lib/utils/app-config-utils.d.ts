import { WidgetContext, IMAppConfig, IMWidgetJson, WidgetJson, IMMessageActionJson, AppConfig } from '../types/app-config';
import { WidgetManifest } from '../types/manifest';
import { IMState } from '../types/state';
export declare function getWidgetContext(uri: string): WidgetContext;
export declare function addWidgetManifestProperties(manifest: WidgetManifest): WidgetManifest;
export declare function addWidgetDefaultLabelAndIcon(appConfig: IMAppConfig, widgetJson: WidgetJson): void;
export declare function addLayoutLabel(appConfig: AppConfig): void;
/**
 * we use <type_number> format to generate key.
 * @param type:
 */
export declare function getUniqueId(appConfig: IMAppConfig, type: 'page' | 'view' | 'section' | 'widget' | 'screen' | 'screenGroup' | 'layout' | 'dialog' | 'dataSource' | 'messageConfig' | 'appProxy'): string;
/**
 * we use `<label> <index>` format to generate unique label.
 * @param type:
 * @param label: the i18n label
 *
 */
export declare function getUniqueLabel(appConfig: IMAppConfig | AppConfig, type: 'page' | 'view' | 'section' | 'widget' | 'screen' | 'screenGroup' | 'dialog' | 'layout', label: string): string;
export declare function getAllWidgets(appConfig: IMAppConfig): IMWidgetJson[];
export declare function getWidgetMessageActionJsons(appConfig: IMAppConfig | AppConfig, widgetId: string, actionName: string): IMMessageActionJson[];
export declare function isTwoViewsInSaveSection(appConfig: IMAppConfig | AppConfig, viewId1: string, viewId2: string): boolean;
/**
 * Add id property to layout since it's removed in cleanup
 * @param appConfig
 */
export declare function fixLayoutIds(appConfig: AppConfig): void;
export declare function updateStateWhenAppConfigChange(state: IMState, appConfig: IMAppConfig): IMState;
export * from './resource-utils';
