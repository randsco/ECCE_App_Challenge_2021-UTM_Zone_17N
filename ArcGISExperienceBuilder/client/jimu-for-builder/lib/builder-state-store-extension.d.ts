/// <reference types="seamless-immutable" />
import { IMRuntimeInfos, ImmutableObject, Immutable, LayoutInfo } from 'jimu-core';
import { IMState } from 'jimu-core';
import { extensionSpec } from 'jimu-core';
import { ToolbarConfig } from 'jimu-layouts/layout-runtime';
interface BuilderState {
    templateName: string;
    showChooseWidgetPopup: boolean;
    currentAppId: string;
    widgetsSettingRuntimeInfo?: IMRuntimeInfos;
    widgetsSettingClassStatus: ImmutableObject<{
        [widgetUri: string]: boolean;
    }>;
    widgetSettingI18nMessages: ImmutableObject<{
        [widgetName: string]: any;
    }>;
    refreshAppList: boolean;
    toolbarConfig?: ToolbarConfig;
    currentGuideId?: string;
    contentToDelete?: LayoutInfo;
}
declare type IMBuilderState = ImmutableObject<BuilderState>;
/**
 * To simplify the builder widgets communication, we store a shared state in store
 */
declare module 'jimu-core/lib/types/state' {
    interface State {
        builder?: IMBuilderState;
    }
}
declare module 'jimu-core' {
    interface State {
        builder?: IMBuilderState;
    }
}
declare enum ActionKeys {
    SelectTemplate = "SELECT_TEMPLATE",
    OpenChooseWidgetPopup = "OPEN_CHOOSE_WIDGET_POPUP",
    CloseChooseWidgetPopup = "CLOSE_CHOOSE_WIDGET_POPUP",
    WidgetSettingClassLoaded = "WIDGET_SETTING_CLASS_LOADED",
    WidgetItemSettingClassLoaded = "WIDGET_ITEM_SETTING_CLASS_LOADED",
    WidgetsRemoved = "WIDGETS_REMOVED",
    WidgetsAdded = "WIDGETS_ADDED",
    ChangeCurrentApp = "CHANGE_CURRENT_APP",
    RefreshAppList = "REFRSH_APPLIST",
    SetLayoutTools = "SET_LAYOUT_TOOLS",
    StartGuide = "START_GUIDE",
    StopGuide = "STOP_GUIDE",
    WidgetSettingI18nMessageLoaded = "WIDGET_SETTING_I18N_MESSAGE_LOADED",
    ConfirmDeleteContentChanged = "CONFIRM_DELETE_CONTENT_CHANGED"
}
export interface SelectTemplateAction {
    type: ActionKeys.SelectTemplate;
    templateName: string;
}
export interface ShowChooseWidgetPopupAction {
    type: ActionKeys.OpenChooseWidgetPopup;
    layoutId: string;
    layoutItemId: string;
}
export interface CloseChooseWidgetPopupAction {
    type: ActionKeys.CloseChooseWidgetPopup;
}
export interface WidgetSettingClassLoadedAction {
    type: ActionKeys.WidgetSettingClassLoaded;
    wigetUri: string;
}
export interface WidgetItemSettingClassLoadedAction {
    type: ActionKeys.WidgetItemSettingClassLoaded;
    widgetUri: string;
}
export interface WidgetsAddedAction {
    type: ActionKeys.WidgetsAdded;
    widgets: {
        widgetId: string;
        widgetUri: string;
    }[];
}
export interface WidgetsRemovedAction {
    type: ActionKeys.WidgetsRemoved;
    widgetIds: string[];
}
export interface ChangeCurrentAppAction {
    type: ActionKeys.ChangeCurrentApp;
    appId: string;
}
export interface RefreshAppListAction {
    type: ActionKeys.RefreshAppList;
    isRefresh: boolean;
}
export interface SetLayoutToolsAction {
    type: ActionKeys.SetLayoutTools;
    tools: ToolbarConfig;
}
export interface StartGuideAction {
    type: ActionKeys.StartGuide;
    guideId: string;
}
export interface StopGuideAction {
    type: ActionKeys.StopGuide;
}
export interface WidgetSettingI18nMessageLoadedAction {
    type: ActionKeys.WidgetSettingI18nMessageLoaded;
    widgetName: string;
    i18nMessages: any;
}
export interface ConfirmDeleteContentChangedAction {
    type: ActionKeys.ConfirmDeleteContentChanged;
    itemToDelete: LayoutInfo;
}
declare type ActionTypes = SelectTemplateAction | ShowChooseWidgetPopupAction | CloseChooseWidgetPopupAction | WidgetSettingClassLoadedAction | WidgetsAddedAction | WidgetsRemovedAction | RefreshAppListAction | ChangeCurrentAppAction | WidgetItemSettingClassLoadedAction | SetLayoutToolsAction | StartGuideAction | StopGuideAction | WidgetSettingI18nMessageLoadedAction | ConfirmDeleteContentChangedAction;
export { ActionKeys as BuilderStateActionTypes };
declare const actions: {
    selectTemplate: (templateName: string) => SelectTemplateAction;
    refreshAppListAction: (isRefresh: boolean) => RefreshAppListAction;
    openChooseWidgetPopup: (layoutId: string, layoutItemId: string) => ShowChooseWidgetPopupAction;
    closeChooseWidgetPopup: () => CloseChooseWidgetPopupAction;
    widgetSettingClassLoaded: (wigetUri: string) => {
        type: ActionKeys;
        wigetUri: string;
    };
    widgetItemSettingClassLoaded: (widgetUri: string) => {
        type: ActionKeys;
        widgetUri: string;
    };
    widgetsAdded: (widgets: {
        widgetId: string;
        widgetUri: string;
    }[]) => {
        type: ActionKeys;
        widgets: {
            widgetId: string;
            widgetUri: string;
        }[];
    };
    widgetsRemoved: (widgetIds: string[]) => {
        type: ActionKeys;
        widgetIds: string[];
    };
    changeCurrentApp: (appId: string) => ChangeCurrentAppAction;
    setLayoutTools: (tools: ToolbarConfig) => SetLayoutToolsAction;
    startGuide: (guideId: string) => StartGuideAction;
    stopGuide: () => StopGuideAction;
    widgetSettingI18nMessageLoaded: (widgetName: string, i18nMessages: any) => WidgetSettingI18nMessageLoadedAction;
    confirmDeleteContentChanged: (itemToDelete: LayoutInfo) => ConfirmDeleteContentChangedAction;
};
export { actions as builderActions, ActionKeys as builderActionKeys };
export default class BuilderStateReduxStoreExtension implements extensionSpec.ReduxStoreExtension {
    id: string;
    getActions(): any[];
    getInitLocalState(): IMBuilderState;
    getReducer(): (builderState: IMBuilderState, action: ActionTypes, builderFullState: IMState) => Immutable.ImmutableObject<BuilderState>;
    getStoreKey(): string;
}
