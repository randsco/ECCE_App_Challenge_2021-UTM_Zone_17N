/// <reference types="react" />
import { React, MessageManager, MessageType, MessageAction, ActionSettingProps, IMMessageActionJson } from 'jimu-core';
export default class AppMessageManager {
    static instance: AppMessageManager;
    static getInstance(): AppMessageManager;
    private actionSettings;
    getAllActions(): MessageAction[];
    getAction(widgetId: string, actionName: string): MessageAction;
    getAppMessageManager(): MessageManager;
    getFilteredActions(messageType: MessageType): MessageAction[];
    getConvertedSettingUri(actionId: string, settingUri: string): string;
    loadActionSettingClass(actionJson: IMMessageActionJson, actionSettingUri: string): Promise<React.ComponentClass<ActionSettingProps<unknown>>>;
    loadRawSettingClass(uri: string): Promise<React.ComponentClass<ActionSettingProps<unknown>>>;
    injectActionSettingProps(WrappedComponent: any, i18nMessages: any, actionWidgetId: string): React.ComponentClass<ActionSettingProps<unknown>>;
    registerActionRawSettingClass(uri: string, rawSettingClass: any): void;
    getActionRawSettingClass(uri: string): React.ComponentClass<ActionSettingProps<unknown>, any>;
}
