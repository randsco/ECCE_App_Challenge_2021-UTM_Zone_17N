import { IMAppConfig, IMSizeModeLayoutJson } from './app-config';
import { ImmutableObject, ImmutableArray } from 'seamless-immutable';
import { UrlParameters } from './url-parameters';
import { DataSourceStatus, QueryParams } from '../data-sources/data-source-interface';
import { AppMode, WidgetState, LayoutItemConstructorProps, BrowserSizeMode, PagePart, LoadingType } from './common';
import { Selection, ClipboardItem, LayoutInfo } from './layout';
import { IUser } from '@esri/arcgis-rest-types';
import { I18nMessages } from '../i18n';
import JimuConfig from './jimu-config';
import { IMThemeVariables } from './theme';
import { IMAppInfo } from './app-info';
import { AnimationPlayMode } from '../animation';
/**
 * Widget runtime info.
 */
export interface RuntimeInfo {
    isClassLoaded?: boolean;
    /** @ignore */
    isItemClassLoaded?: boolean;
    /** Whether a widget is in inlineEditing state. */
    isInlineEditing?: boolean;
    state?: WidgetState;
    windowState?: 'normal' | 'minimized' | 'maximized';
}
export declare type IMRuntimeInfo = ImmutableObject<RuntimeInfo>;
export declare type IMRuntimeInfos = ImmutableObject<{
    [id: string]: IMRuntimeInfo;
}>;
export declare type IMI18nMessages = ImmutableObject<I18nMessages>;
/** @ignore */
export declare type IMLayoutState = ImmutableObject<{
    [clazz: string]: boolean;
}>;
/** This interface defines the properties that are not changed after the app loaded. */
export interface AppContext {
    /** @ignore */
    isInPortal: boolean;
    /** The locale that the experience will use. Use the user's profile for sign-in users, use browser's locale for anonymous users. */
    locale: string;
    isRTL: boolean;
    /** The best match translation locale. All of the supported translations can be found this way: import {translatedLocales} from 'jimu-core'. */
    translatedLocale: string;
    isTouchDevice: boolean;
    /** Whether the app is builder. */
    /** @ignore */
    isBuilder: boolean;
    /** Whether the app is loaded in builder. */
    isInBuilder: boolean;
    /** @ignore */
    isSite: boolean;
    jimuConfig: JimuConfig;
}
/**
 * The data source info.
 */
export interface DataSourceInfo {
    instanceStatus: DataSourceStatus;
    status: DataSourceStatus;
    countStatus: DataSourceStatus;
    /** @ignore */
    saveStatus?: DataSourceStatus;
    /**
     * Although one data source has one selection only, but to widgets that can listen to the selection change, we'll save selection into main data source and all its views.
     */
    selectedIndexes?: ImmutableArray<number>;
    selectedIds?: ImmutableArray<string>;
    /**
     * Whenever a data source is changed on the client side, the version need +1. The version will be 1 when the data is loaded for the first time.
     */
    version?: number;
    /**
     * The query parameters widgets applied to the data source.
     * The query does not have page info.
     */
    widgetQueries?: ImmutableObject<{
        [widgetId: string]: QueryParams;
    }>;
    /**
     * For queriable data source only.
     * For static data, the data does not need refresh.
     * For auto refresh data, the data requires refresh when the refresh interval is arrived.
     */
    needRefresh?: boolean;
    /**
     * For feature layer only.
     * See:
     *  https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
     *  https://developers.arcgis.com/rest/services-reference/version-management-service.htm
     * The gdb version used when query/add/update feature layer.
     */
    gdbVersion?: string;
}
export declare enum JimuMapViewStatus {
    Loading = "LOADING",
    Loaded = "LOADED",
    Failed = "FAILED"
}
export interface JimuMapViewInfo {
    id: string;
    mapWidgetId: string;
    isActive?: boolean;
    datasourceId: string;
    status: JimuMapViewStatus;
}
export interface MapWidgetInfo {
    mapWidgetId?: string;
    autoControlWidgetId?: string;
}
export interface SectionNavInfo {
    visibleViews?: string[];
    currentViewId?: string;
    previousViewId?: string;
    progress?: number;
    useProgress?: boolean;
    useStep?: boolean;
    playId?: symbol;
    withOneByOne?: boolean;
}
export declare type IMJimuMapViewInfo = ImmutableObject<JimuMapViewInfo>;
export declare type IMMapWidgetInfo = ImmutableObject<MapWidgetInfo>;
export declare type IMDataSourceInfo = ImmutableObject<DataSourceInfo>;
export declare type IMUser = ImmutableObject<IUser>;
export declare type IMSelection = ImmutableObject<Selection>;
export declare type IMSectionNavInfo = ImmutableObject<SectionNavInfo>;
interface DialogInfo {
    canClose: boolean;
    checked?: boolean;
    isClosed: boolean;
    alertVersion?: number;
}
export declare type DialogInfos = {
    [dialogId: string]: DialogInfo;
};
export declare type IMDialogInfos = ImmutableObject<DialogInfos>;
export interface AppRuntimeInfo {
    appMode: AppMode;
    /** The current rendered page. */
    currentPageId: string;
    /** @ignore */
    currentDialogId: string;
    sectionNavInfos: {
        [sectionId: string]: IMSectionNavInfo;
    };
    /** active screen of each screenGroup */
    screenGroupNavInfos: {
        [screenGroupId: string]: {
            activeIndex: number;
            scrollIntoView: boolean;
        };
    };
    /** @ignore this is the layout being edited. */
    activeLayout?: IMSizeModeLayoutJson;
    /** @ignore the page part that is active, default value is 'body'. */
    activePagePart: PagePart;
    /** The current selection. */
    selection: IMSelection;
    clipboard: ClipboardItem;
    /** @ignore */
    draggingWidget?: LayoutItemConstructorProps;
    /** @ignore */
    dragoverLayoutId?: string;
    /** @ignore Show loading mask when isBusy is true. */
    isBusy?: boolean;
    loadingType?: LoadingType;
    /** @ignore */
    zoomScale?: number;
    /**
     * @ignore
     * Manage closed-releated info of all closed dialogs.
     * Purpose:
     *  splash and page dialogs should display once only when builder/app loads unless it is triggered by TOC.
     *  Confirmation checkbox should control all linked widgets.
     */
    dialogInfos: IMDialogInfos;
    animationPreview?: {
        pageId?: string;
        dialogId?: string;
        layoutInfo?: LayoutInfo;
        playMode?: AnimationPlayMode;
        id: symbol;
    };
    screenPanelStates?: {
        [key: string]: boolean;
    };
}
export declare type IMAppRuntimeInfo = ImmutableObject<AppRuntimeInfo>;
export declare type MutableStatePropsVersion = {
    [propKey: string]: number;
};
export declare type WidgetsMutableStateVersion = {
    [widgetId: string]: MutableStatePropsVersion;
};
/** The redux store state. */
export interface State {
    /**
     * The portal url that the app will connect to, without the ending slash, looking like this:
     *  http://esridevbeijing.maps.arcgis.com
     *  http://abc.com/portal
     *
     * If appConfig has portalUrl, it will be copied to this property, or we'll
     * get portalUrl through other logic, such as from browser URL, from user Input, etc.
     *
     * portalUrl can be null although the portalUrl in app config will always be set in builder for now.
     */
    portalUrl?: string;
    clientId?: string;
    portalSelf: any;
    isNetworkOffLine: boolean;
    browserSizeMode: BrowserSizeMode;
    appConfig: IMAppConfig;
    appContext: ImmutableObject<AppContext>;
    appRuntimeInfo: IMAppRuntimeInfo;
    appInfo: IMAppInfo;
    hasNewVersion?: boolean;
    /**
     * The current path in URL, includes page/p1
     */
    appPath: string;
    /**
     * For online/portal edition, appId is the itemId.
     * For dev edition, appId is like 1,2,3.
     * For download and deployed out app, the appId is null.
     * When use ?config=<> to load app, the app id is the config url.
     */
    appId: string;
    widgetsRuntimeInfo: IMRuntimeInfos;
    widgetsClassStatus: ImmutableObject<{
        [widgetUri: string]: boolean;
    }>;
    /**
     * @ignore
     * The properties returned by getPreloadPros.
     * We put the properties in state because when widget is rendered in server, we need to pass these properties to client.
     */
    widgetsPreloadProps: {
        [widgetId: string]: ImmutableObject<any>;
    };
    /**
     * @ignore
     * The data here use jimuFieldName as key.
     */
    dataSourcesPreloadData: {
        [dsId: string]: ImmutableObject<any[]>;
    };
    queryObject: ImmutableObject<UrlParameters>;
    appI18nMessages: IMI18nMessages;
    dataSourcesInfo: ImmutableObject<{
        [dsId: string]: IMDataSourceInfo;
    }>;
    jimuMapViewsInfo: ImmutableObject<{
        [jimuMapViewId: string]: IMJimuMapViewInfo;
    }>;
    mapWidgetsInfo: ImmutableObject<{
        [mapWidgetId: string]: IMMapWidgetInfo;
    }>;
    widgetsState: ImmutableObject<{
        [widgetId: string]: any;
    }>;
    widgetsMutableStateVersion: ImmutableObject<WidgetsMutableStateVersion>;
    token?: string;
    user?: IMUser;
    theme: IMThemeVariables;
    /** @ignore */
    overlays: ImmutableArray<string>;
    /** When user locale change, we'll let user refresh */
    userLocaleChanged: boolean;
    hasPrivilege: boolean;
    privilegeError: string;
}
export declare type IMState = ImmutableObject<State>;
/** @ignore */
interface StateHistory {
    past: IMState[];
    future: IMState[];
}
/** @ignore */
export declare type IMHistoryState = ImmutableObject<StateHistory>;
export {};
