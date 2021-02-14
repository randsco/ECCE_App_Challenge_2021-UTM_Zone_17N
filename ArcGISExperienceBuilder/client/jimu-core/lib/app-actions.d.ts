import { AppConfig, IMAppConfig } from './types/app-config';
import { IMState, AppContext, AppRuntimeInfo, IMJimuMapViewInfo, SectionNavInfo, IMDataSourceInfo, IMMapWidgetInfo, DialogInfos } from './types/state';
import { Selection, ClipboardItem, LayoutInfo } from './types/layout';
import { AppMode, BrowserSizeMode, PagePart, LoadingType } from './types/common';
import { UrlParameters } from './types/url-parameters';
import { DataSourceStatus, QueryParams } from './data-sources/data-source-interface';
import { IUser } from '@esri/arcgis-rest-types';
import { I18nMessages } from './i18n';
import { IMThemeVariables } from './types/theme';
import { AppInfo } from './types/app-info';
import { AnimationPlayMode } from './animation';
export declare enum ActionKeys {
    InitStoreExtensionState = "INIT_STORE_EXTENSION_STATE",
    AppConfigLoaded = "APPCONFIG_LOADED",
    AppConfigChanged = "APPCONFIG_CHANGED",
    ThemeVariablesChanged = "THEME_VARIABLES_CHANGED",
    SetPortalUrl = "SET_PORTAL_URL",
    SetPortalInfo = "SET_PORTAL_INFO",
    SetPortalSelf = "SET_PORTAL_SELF",
    WidgetClassLoaded = "WIDGET_CLASS_LOADED",
    WidgetConfigLoaded = "WIDGET_CONFIG_LOADED",
    WidgetConfigUpgraded = "WIDGET_CONFIG_UPGRADED",
    OpenWidget = "OPEN_WIDGET",
    OpenWidgets = "OPEN_WIDGETS",
    CloseWidget = "CLOSE_WIDGET",
    CloseWidgets = "CLOSE_WIDGETS",
    SetWidgetIsInlineEditingState = "SET_WIDGET_IS_INLINE_EDITING_STATE",
    SetWidgetPreloadProps = "SET_WIDGET_PRELOAD_PROPS",
    ActivateWidget = "ACTIVATE_WIDGET",
    SetAppInBuilder = "SET_APP_IN_BUILDER",
    LayoutClassLoaded = "LAYOUT_CLASS_LOADED",
    AppContextInit = "APP_CONTEXT_INIT",
    I18nMessagesLoaded = "I18N_MESSAGES_LOADED",
    QueryObjectChanged = "QUERY_OBJECT_CHANGED",
    AppModeChanged = "APP_MODE_CHANGED",
    SelectionChanged = "SELECTION_CHANGED",
    AppRuntimeInfoInit = "APP_RUNTIME_INFO_INIT",
    CurrentPageChanged = "CURRENT_PAGE_CHANGED",
    CurrentDialogChanged = "CURRENT_DIALOG_CHANGED",
    DialogInfosChanged = "DIALOG_INFOS_CHANGED",
    ClipboardChanged = "CLIPBOARD_CHANGED",
    AppPathChanged = "APP_PATH_CHANGED",
    AppIdChanged = "APP_ID_CHANGED",
    AppInfoChanged = "APP_INFO_CHANGED",
    NetworkStatusChanged = "NETWORK_STATUS_CHANGED",
    DataSourceStatusChanged = "DATA_SOURCE_STATUS_CHANGED",
    DataSourceCountStatusChanged = "DATA_SOURCE_COUNT_STATUS_CHANGED",
    DataSourceInstanceStatusChanged = "DATA_SOURCE_INSTANCE_STATUS_CHANGED",
    DataSourceSaveStatusChanged = "DATA_SOURCE_SAVE_STATUS_CHANGED",
    DataSourceVersionAdded = "DATA_SOURCE_VERSION_ADDED",
    DataSourceSelectedIndexesChanged = "DATA_SOURCE_SELECTED_INDEXES_CHANGED",
    DataSourceSelectedIdsChanged = "DATA_SOURCE_SELECTED_IDS_CHANGED",
    SetDataSourcePreloadData = "SET_DATA_SOURCE_PRELOAD_DATA",
    SetDataNeedRefresh = "SET_DATA_NEED_REFRESH",
    UpdateWidgetQuery = "UPDATE_WIDGET_QUERY",
    ChangeDataSourceGDBVersion = "CHANGE_DATA_SOURCE_GDB_VERSION",
    ClearDataSourceInfo = "CLEARE_DATA_SOURCE_INFO",
    UpdateDataSourceInfo = "UPDATE_DATA_SOURCE_INFO",
    JimuMapViewAdded = "JIMU_MAPVIEW_ADDED",
    JimuMapViewRemoved = "JIMU_MAPVIEW_REMOVED",
    JimuMapViewUpdated = "JIMU_MAPVIEW_UPDATED",
    MapWidgetInfoAdded = "MAP_WIDGET_INFO_ADDED",
    MapWidgetInfoRemoved = "MAP_WIDGET_INFO_REMOVED",
    MapWidgetInfoUpdated = "MAP_WIDGET_INFO_UPDATED",
    RequestAutoControlMapWidget = "REQUEST_AUTO_CONTROL_MAP_WIDGET",
    ReleaseAutoControlMapWidget = "RELEASE_AUTO_CONTROL_MAP_WIDGET",
    WidgetStatePropChange = "WIDGET_STATE_PROP_CHANGE",
    WidgetMutableStatePropChange = "WIDGET_MUTABLE_STATE_PROP_CHANGE",
    SessionStart = "SESSION_START",
    UserSignIn = "USER_SIGN_IN",
    UserSignOut = "USER_SIGN_OUT",
    BrowserSizeModeChanged = "BROWSER_SIZE_MODE_CHANGED",
    UpdateStoreState = "UPDATE_STORE_STATE",
    ActivePagePartChanged = "ACTIVE_PAGE_PART_CHANGED",
    OpenOverlay = "OPEN_OVERLAY",
    CloseOverlay = "CLOSE_OVERLAY",
    ActiveOverlay = "ACTIVE_OVERLAY",
    SetIsBusy = "SET_IS_BUSY",
    ZoomScaleChanged = "ZOOM_SCALE_CHANGED",
    LayoutChanged = "LAYOUT_CHANGED",
    SectionNavInfoChanged = "SECTION_NAV_INFO_CHANGED",
    SetupAnimationPreview = "SETUP_ANIMATION_PREVIEW",
    ClearAnimationPreview = "CLEAR_ANIMATION_PREVIEW",
    SetHasNewVersion = "SET_HAS_NEW_VERSION",
    ScreenGroupNavInfoChanged = "SCREEN_GROUP_NAV_INFO_CHANGE",
    UserLocaleChanged = "USER_LOCALE_CHANGED",
    HasPrivilegeChanged = "HAS_PRIVILEGE_CHANGED",
    ScreenPanelVisibleChange = "SCREEN_PANEL_VISIBLE_CHANGE"
}
export declare type ActionTypes = AppConfigLoadedAction | AppConfigChangedAction | AppIdChangedAction | SetPortalSelfAction | WidgetClassLoadedAction | WidgetConfigUpgradedAction | WidgetConfigLoadedAction | OpenWidgetAction | OpenWidgetsAction | CloseWidgetAction | CloseWidgetsAction | AppRuntimeInfoInitAction | ThemeVariablesChangedAction | AppInfoChangedAction | ActivateWidgetAction | CurrentDialogChangedAction | DialogInfosChangedAction | AppContextInitAction | I18nMessagesLoadedAction | QueryObjectChangedAction | SetAppInBuilderAction | DataSourceInstanceStatusChangeAction | AppModeChangedAction | InitAction | LayoutClassLoadedAction | DataSourceStatusChangeAction | DataSourceCountStatusChangeAction | DataSourceVersionChangeAction | InitStoreExtensionStateAction | WidgetStatePropChangeAction | WidgetMutableStatePropChangeAction | SetPortalUrlAction | SetPortalInfoAction | DataSourceSelectedIndexChangeAction | DataSourceSelectedIdsChangeAction | JimuMapViewAddedAction | JimuMapViewRemovedAction | JimuMapViewUpdatedAction | SessionStartAction | UserSignInAction | UserSignOutAction | BrowserSizeModeChangedAction | SetWidgetIsInlineEditingStateAction | DataSourceSaveStatusChangeAction | SetWidgetPreloadPropsAction | SetDataSourcePreloadDataAction | AppPathChangedAction | NetworkStatusChangedAction | SelectionChangedAction | UpdateStoreStateAction | CurrentPageChangedAction | UpdateDataSourceInfoAction | ActivePagePartChangedAction | OpenOverlayAction | CloseOverlayAction | ActiveOverlayAction | ChangeDataSourceGDBVersionAction | CleareDataSourceInfoAction | SetIsBusyAction | ZoomScaleChangedAction | LayoutChangedAction | ClipboardChangedAction | SectionNavInfoChangedAction | SetDataNeedRefreshAction | UpdateWidgetQueryAction | SetupAnimationPreviewAction | ClearAnimationPreviewAction | SetHasNewVersionAction | ScreenGroupNavInfoChangedAction | UserLocaleChangedAction | HasPrivilegeChangedAction | RequestAutoControlMapWidgetAction | ReleaseAutoControlMapWidgetAction | MapWidgetInfoAddedAction | MapWidgetInfoRemovedAction | MapWidgetInfoUpdatedAction | ScreenPanelVisibleChangeAction;
interface InitAction {
    type: '@@INIT';
}
export interface InitStoreExtensionStateAction {
    type: ActionKeys.InitStoreExtensionState;
    extensionId: string;
}
export interface AppConfigLoadedAction {
    type: ActionKeys.AppConfigLoaded;
    appConfig: AppConfig;
}
export interface AppConfigChangedAction {
    type: ActionKeys.AppConfigChanged;
    appConfig: IMAppConfig;
}
export interface AppIdChangedAction {
    type: ActionKeys.AppIdChanged;
    appId: string;
}
export interface WidgetClassLoadedAction {
    type: ActionKeys.WidgetClassLoaded;
    widgetUri: string;
}
export interface WidgetConfigUpgradedAction {
    type: ActionKeys.WidgetConfigUpgraded;
    widgetId: string;
    config: any;
}
export interface WidgetConfigLoadedAction {
    type: ActionKeys.WidgetConfigLoaded;
    widgetId: string;
    config: any;
}
export interface OpenWidgetAction {
    type: ActionKeys.OpenWidget;
    widgetId: string;
}
export interface OpenWidgetsAction {
    type: ActionKeys.OpenWidgets;
    widgetIds: string[];
}
export interface ActivateWidgetAction {
    type: ActionKeys.ActivateWidget;
    widgetId: string;
}
export interface CloseWidgetAction {
    type: ActionKeys.CloseWidget;
    widgetId: string;
}
export interface CloseWidgetsAction {
    type: ActionKeys.CloseWidgets;
    widgetIds: string[];
}
export interface AppContextInitAction {
    type: ActionKeys.AppContextInit;
    appContext: AppContext;
}
export interface I18nMessagesLoadedAction {
    type: ActionKeys.I18nMessagesLoaded;
    key: string;
    messages: I18nMessages;
}
export interface QueryObjectChangedAction {
    type: ActionKeys.QueryObjectChanged;
    query: UrlParameters;
}
export interface SetAppInBuilderAction {
    type: ActionKeys.SetAppInBuilder;
}
export interface AppModeChangedAction {
    type: ActionKeys.AppModeChanged;
    mode: AppMode;
}
export interface AppPathChangedAction {
    type: ActionKeys.AppPathChanged;
    path: string;
}
export interface AppInfoChangedAction {
    type: ActionKeys.AppInfoChanged;
    appInfo: Partial<AppInfo>;
}
export interface LayoutClassLoadedAction {
    type: ActionKeys.LayoutClassLoaded;
    layoutName: string;
}
export interface DataSourceStatusChangeAction {
    type: ActionKeys.DataSourceStatusChanged;
    dataSourceId: string;
    status: DataSourceStatus;
}
export interface DataSourceCountStatusChangeAction {
    type: ActionKeys.DataSourceCountStatusChanged;
    dataSourceId: string;
    countStatus: DataSourceStatus;
}
export interface DataSourceInstanceStatusChangeAction {
    type: ActionKeys.DataSourceInstanceStatusChanged;
    dataSourceId: string;
    status: DataSourceStatus;
}
export interface DataSourceSaveStatusChangeAction {
    type: ActionKeys.DataSourceSaveStatusChanged;
    dataSourceId: string;
    saveStatus: DataSourceStatus;
}
export interface DataSourceVersionChangeAction {
    type: ActionKeys.DataSourceVersionAdded;
    dataSourceId: string;
}
export interface ChangeDataSourceGDBVersionAction {
    type: ActionKeys.ChangeDataSourceGDBVersion;
    dataSourceId: string;
    gdbVersion: string;
}
export interface CleareDataSourceInfoAction {
    type: ActionKeys.ClearDataSourceInfo;
    dataSourceId: string;
}
export interface UpdateDataSourceInfoAction {
    type: ActionKeys.UpdateDataSourceInfo;
    dataSourceId: string;
    dataSourceInfo: IMDataSourceInfo;
}
export interface DataSourceSelectedIndexChangeAction {
    type: ActionKeys.DataSourceSelectedIndexesChanged;
    dataSourceId: string;
    selectedIndexes: number[];
}
export interface DataSourceSelectedIdsChangeAction {
    type: ActionKeys.DataSourceSelectedIdsChanged;
    dataSourceId: string;
    selectedIds: string[];
}
export interface SetDataNeedRefreshAction {
    type: ActionKeys.SetDataNeedRefresh;
    dataSourceId: string;
    refresh: boolean;
}
export interface UpdateWidgetQueryAction {
    type: ActionKeys.UpdateWidgetQuery;
    dataSourceId: string;
    widgetId: string;
    query: QueryParams;
}
export interface JimuMapViewAddedAction {
    type: ActionKeys.JimuMapViewAdded;
    jimuMapViewId: string;
    jimuMapViewInfo: IMJimuMapViewInfo;
}
export interface JimuMapViewUpdatedAction {
    type: ActionKeys.JimuMapViewUpdated;
    jimuMapViewId: string;
    jimuMapViewInfo: IMJimuMapViewInfo;
}
export interface JimuMapViewRemovedAction {
    type: ActionKeys.JimuMapViewRemoved;
    jimuMapViewId: string;
}
export interface RequestAutoControlMapWidgetAction {
    type: ActionKeys.RequestAutoControlMapWidget;
    mapWidgetId: string;
    autoControlWidgetId: string;
}
export interface ReleaseAutoControlMapWidgetAction {
    type: ActionKeys.ReleaseAutoControlMapWidget;
    mapWidgetId: string;
}
export interface MapWidgetInfoAddedAction {
    type: ActionKeys.MapWidgetInfoAdded;
    mapWidgetId: string;
    mapWidgetInfo: IMMapWidgetInfo;
}
export interface MapWidgetInfoRemovedAction {
    type: ActionKeys.MapWidgetInfoRemoved;
    mapWidgetId: string;
}
export interface MapWidgetInfoUpdatedAction {
    type: ActionKeys.MapWidgetInfoUpdated;
    mapWidgetId: string;
    mapWidgetInfo: IMMapWidgetInfo;
}
export interface WidgetStatePropChangeAction {
    type: ActionKeys.WidgetStatePropChange;
    widgetId: string;
    propKey: string;
    value: any;
}
export interface WidgetMutableStatePropChangeAction {
    type: ActionKeys.WidgetMutableStatePropChange;
    widgetId: string;
    propKey: string;
}
export interface SetPortalUrlAction {
    type: ActionKeys.SetPortalUrl;
    portalUrl: string;
}
export interface SetPortalInfoAction {
    type: ActionKeys.SetPortalInfo;
    portalUrl: string;
    clientId?: string;
}
export interface DataSourceSelectedIndexesChangeAction {
    type: ActionKeys.DataSourceSelectedIndexesChanged;
    dataSourceId: string;
    selectedIndexes: number[];
}
export interface SessionStartAction {
    type: ActionKeys.SessionStart;
    token: string;
}
export interface UserSignInAction {
    type: ActionKeys.UserSignIn;
    user: IUser;
}
export interface UserSignOutAction {
    type: ActionKeys.UserSignOut;
}
export interface BrowserSizeModeChangedAction {
    type: ActionKeys.BrowserSizeModeChanged;
    browserSizeMode: BrowserSizeMode;
}
export interface SetWidgetIsInlineEditingStateAction {
    type: ActionKeys.SetWidgetIsInlineEditingState;
    widgetId: string;
    isInlineEditing: boolean;
}
export interface SetWidgetPreloadPropsAction {
    type: ActionKeys.SetWidgetPreloadProps;
    widgetId: string;
    props: any;
}
export interface SetDataSourcePreloadDataAction {
    type: ActionKeys.SetDataSourcePreloadData;
    dataSourceId: string;
    data: any[];
}
export interface NetworkStatusChangedAction {
    type: ActionKeys.NetworkStatusChanged;
    isOffLine: boolean;
}
export interface SelectionChangedAction {
    type: ActionKeys.SelectionChanged;
    selection: Selection;
}
export interface ClipboardChangedAction {
    type: ActionKeys.ClipboardChanged;
    item: ClipboardItem;
}
export interface UpdateStoreStateAction {
    type: ActionKeys.UpdateStoreState;
    state: IMState;
}
export interface AppRuntimeInfoInitAction {
    type: ActionKeys.AppRuntimeInfoInit;
    info: Partial<AppRuntimeInfo>;
}
export interface ThemeVariablesChangedAction {
    type: ActionKeys.ThemeVariablesChanged;
    theme: IMThemeVariables;
}
export interface SetPortalSelfAction {
    type: ActionKeys.SetPortalSelf;
    portalSelf: any;
}
export interface CurrentPageChangedAction {
    type: ActionKeys.CurrentPageChanged;
    pageId: string;
}
export interface CurrentDialogChangedAction {
    type: ActionKeys.CurrentDialogChanged;
    dialogId: string;
}
export interface DialogInfosChangedAction {
    type: ActionKeys.DialogInfosChanged;
    dialogInfos: DialogInfos;
}
export interface ActivePagePartChangedAction {
    type: ActionKeys.ActivePagePartChanged;
    part: PagePart;
}
export interface OpenOverlayAction {
    type: ActionKeys.OpenOverlay;
    id: string;
}
export interface CloseOverlayAction {
    type: ActionKeys.CloseOverlay;
    id: string;
}
export interface ActiveOverlayAction {
    type: ActionKeys.ActiveOverlay;
    id: string;
}
export interface SetIsBusyAction {
    type: ActionKeys.SetIsBusy;
    isBusy: boolean;
    loadingType: LoadingType;
}
export interface ZoomScaleChangedAction {
    type: ActionKeys.ZoomScaleChanged;
    zoomScale: number;
}
export interface LayoutChangedAction {
    type: ActionKeys.LayoutChanged;
    appConfig: IMAppConfig;
    selection: Selection;
}
export interface SectionNavInfoChangedAction {
    type: ActionKeys.SectionNavInfoChanged;
    sectionId: string;
    navInfo: SectionNavInfo;
}
export interface ScreenGroupNavInfoChangedAction {
    type: ActionKeys.ScreenGroupNavInfoChanged;
    screenGroupId: string;
    activeIndex: number;
    scrollIntoView: boolean;
}
export interface ScreenPanelVisibleChangeAction {
    type: ActionKeys.ScreenPanelVisibleChange;
    screenId: string;
    visible: boolean;
}
export interface SetupAnimationPreviewAction {
    type: ActionKeys.SetupAnimationPreview;
    data: {
        layoutInfo?: LayoutInfo;
        pageId?: string;
        playMode?: AnimationPlayMode;
        id: symbol;
    };
}
export interface ClearAnimationPreviewAction {
    type: ActionKeys.ClearAnimationPreview;
}
export interface SetHasNewVersionAction {
    type: ActionKeys.SetHasNewVersion;
    hasNew: boolean;
}
export interface UserLocaleChangedAction {
    type: ActionKeys.UserLocaleChanged;
    isChanged: boolean;
}
export interface HasPrivilegeChangedAction {
    type: ActionKeys.HasPrivilegeChanged;
    error: string;
}
export declare function appConfigLoaded(appConfig: any): AppConfigLoadedAction;
export declare function appConfigChanged(appConfig: IMAppConfig): AppConfigChangedAction;
export declare function appPathChanged(path: string): AppPathChangedAction;
export declare function appInfoChanged(appInfo: Partial<AppInfo>): AppInfoChangedAction;
export declare function appIdChanged(appId: string): AppIdChangedAction;
export declare function widgetClassLoaded(widgetUri: string): WidgetClassLoadedAction;
export declare function widgetConfigUpgraded(widgetId: string, config: any): WidgetConfigUpgradedAction;
export declare function widgetConfigLoaded(widgetId: string, config: any): WidgetConfigLoadedAction;
export declare function openWidget(widgetId: string): OpenWidgetAction;
export declare function openWidgets(widgetIds: string[]): OpenWidgetsAction;
export declare function closeWidget(widgetId: any): CloseWidgetAction;
export declare function closeWidgets(widgetIds: any): CloseWidgetsAction;
export declare function activateWidget(widgetId: any): ActivateWidgetAction;
export declare function initAppContext(appContext: AppContext): AppContextInitAction;
export declare function i18nMessagesLoaded(key: string, messages: I18nMessages): I18nMessagesLoadedAction;
export declare function queryObjectChanged(query: UrlParameters): QueryObjectChangedAction;
export declare function setAppInBuilder(): SetAppInBuilderAction;
export declare function appModeChanged(mode: AppMode): AppModeChangedAction;
export declare function layoutClassLoaded(layoutName: any): LayoutClassLoadedAction;
export declare function dataSourceStatusChanged(dataSourceId: string, status: DataSourceStatus): DataSourceStatusChangeAction;
export declare function dataSourceCountStatusChanged(dataSourceId: string, status: DataSourceStatus): DataSourceCountStatusChangeAction;
export declare function dataSourceInstanceStatusChanged(dataSourceId: string, status: DataSourceStatus): DataSourceInstanceStatusChangeAction;
export declare function dataSourceSaveStatusChanged(dataSourceId: string, saveStatus: DataSourceStatus): DataSourceSaveStatusChangeAction;
export declare function dataSourceVersionAdded(dataSourceId: string): DataSourceVersionChangeAction;
/**
 * To change to the default gdb version, set the version to null.
 * @param dataSourceId
 * @param gdbVersion
 */
export declare function changeDataSourceGDBVersion(dataSourceId: string, gdbVersion: string): ChangeDataSourceGDBVersionAction;
export declare function clearDataSourceInfo(dataSourceId: string): CleareDataSourceInfoAction;
export declare function updateDataSourceInfo(dataSourceId: string, dataSourceInfo: IMDataSourceInfo): UpdateDataSourceInfoAction;
export declare function setDataNeedRefresh(dataSourceId: string, refresh: boolean): SetDataNeedRefreshAction;
export declare function updateWidgetQuery(dataSourceId: string, widgetId: string, query: QueryParams): UpdateWidgetQueryAction;
export declare function jimuMapViewAdded(jimuMapViewId: string, jimuMapViewInfo: IMJimuMapViewInfo): JimuMapViewAddedAction;
export declare function jimuMapViewUpdated(jimuMapViewId: string, jimuMapViewInfo: IMJimuMapViewInfo): JimuMapViewUpdatedAction;
export declare function jimuMapViewRemoved(jimuMapViewId: string): JimuMapViewRemovedAction;
export declare function requestAutoControlMapWidget(mapWidgetId: string, autoControlWidgetId: string): RequestAutoControlMapWidgetAction;
export declare function releaseAutoControlMapWidget(mapWidgetId: string): ReleaseAutoControlMapWidgetAction;
export declare function MapWidgetInfoAdded(mapWidgetId: string, mapWidgetInfo: IMMapWidgetInfo): MapWidgetInfoAddedAction;
export declare function MapWidgetInfoUpdated(mapWidgetId: string, mapWidgetInfo: IMMapWidgetInfo): MapWidgetInfoUpdatedAction;
export declare function MapWidgetInfoRemoved(mapWidgetId: string): MapWidgetInfoRemovedAction;
export declare function initStoreExtensionState(extensionId: string): InitStoreExtensionStateAction;
export declare function widgetStatePropChange(widgetId: string, propKey: string, value: any): WidgetStatePropChangeAction;
export declare function widgetMutableStatePropChange(widgetId: string, propKey: string): WidgetMutableStatePropChangeAction;
export declare function setPortalUrl(portalUrl: string): SetPortalUrlAction;
export declare function setPortalInfo(portalUrl: string, clientId?: string): SetPortalInfoAction;
export declare function dataSourceSelectedIndexesChanged(dataSourceId: string, indexes: number[]): DataSourceSelectedIndexesChangeAction;
export declare function dataSourceSelectedIdsChanged(dataSourceId: string, ids: string[]): DataSourceSelectedIdsChangeAction;
export declare function sessionStart(token: string): SessionStartAction;
export declare function userSignIn(user: IUser): UserSignInAction;
export declare function userSignOut(): UserSignOutAction;
export declare function browserSizeModeChanged(browserSizeMode: BrowserSizeMode): BrowserSizeModeChangedAction;
export declare function setWidgetIsInlineEditingState(widgetId: string, isInlineEditing: boolean): SetWidgetIsInlineEditingStateAction;
export declare function setWidgetPreloadProps(widgetId: string, props: any): SetWidgetPreloadPropsAction;
export declare function setDataSourcePreloadData(dataSourceId: string, data: any[]): SetDataSourcePreloadDataAction;
export declare function networkStatusChanged(isOffLine: boolean): NetworkStatusChangedAction;
export declare function currentPageChanged(pageId: string): CurrentPageChangedAction;
export declare function currentDialogChanged(dialogId: string): CurrentDialogChangedAction;
export declare function dialogInfosChanged(dialogInfos: DialogInfos): DialogInfosChangedAction;
export declare function selectionChanged(selection: Selection): SelectionChangedAction;
export declare function clipboardChanged(item: ClipboardItem): ClipboardChangedAction;
export declare function updateStoreState(state: IMState): UpdateStoreStateAction;
export declare function appRuntimeInfoInit(info: Partial<AppRuntimeInfo>): AppRuntimeInfoInitAction;
export declare function themeVariablesChanged(theme: IMThemeVariables): ThemeVariablesChangedAction;
export declare function setPortalSelf(portalSelf: any): SetPortalSelfAction;
export declare function activePagePartChanged(part: any): ActivePagePartChangedAction;
export declare function openOverlay(id: string): OpenOverlayAction;
export declare function closeOverlay(id: string): CloseOverlayAction;
export declare function activeOverlay(id: string): ActiveOverlayAction;
export declare function zoomScaleChange(zoomScale: number): ZoomScaleChangedAction;
export declare function setIsBusy(isBusy: boolean, loadingType?: LoadingType): SetIsBusyAction;
export declare function layoutChanged(appConfig: IMAppConfig, selection: Selection): LayoutChangedAction;
export declare function sectionNavInfoChanged(sectionId: string, navInfo: SectionNavInfo): SectionNavInfoChangedAction;
export declare function screenGroupNavInfoChanged(screenGroupId: string, activeIndex: number, scrollIntoView?: boolean): ScreenGroupNavInfoChangedAction;
export declare function screenPanelVisibleChanged(screenId: string, visible: boolean): ScreenPanelVisibleChangeAction;
export declare function setupAnimationPreview(data: {
    layoutInfo: LayoutInfo;
    pageId: string;
    dialogid: string;
    playMode: AnimationPlayMode;
    id: symbol;
}): SetupAnimationPreviewAction;
export declare function clearAnimationPreview(): ClearAnimationPreviewAction;
export declare function setHasNewVersion(hasNew: boolean): SetHasNewVersionAction;
export declare function userLocaleChanged(isChanged: boolean): UserLocaleChangedAction;
export declare function hasPrivilegeChanged(error: string): HasPrivilegeChangedAction;
export {};
