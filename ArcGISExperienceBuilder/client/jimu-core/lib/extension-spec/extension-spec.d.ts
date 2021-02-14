/// <reference types="react" />
import { AppConfig } from '../types/app-config';
import { WidgetProps } from '../types/props';
import { IMState } from '../types/state';
import { Resource } from '../types/common';
import { LayoutContextToolProps, LayoutTransformFunc, LayoutItemTransformFunc } from '../types/layout';
import { WidgetManifest } from '../types/manifest';
export declare enum ExtensionPoints {
    /**
     * The extension for this EP will be invoked after app config is loaded.
     * Pass in the loaded app config into this extension and this extension should return the processed app config
     *
     * Extension for this EP should implement IAppConfigProcessorExtension interface.
     */
    AppConfigProcessor = "APP_CONFIG_PROCESSOR",
    /**
     * The extension for this EP will be invoked after widget class is loaded and core props have been injected.
     *
     * Extension for this EP should implement IWidgetClassWrapperExtension interface.
     */
    WidgetClassWrapper = "WIDGET_CLASS_WRAPPER",
    /**
     * The extension for this EP is used to get the config service, which is used to save/load app config.
     *
     * Extension for this EP should implement IAppConfigServiceExtension interface.
     */
    AppConfigService = "APP_CONFIG_SERVICE",
    /**
     * The extension for this EP is used to extent the redux store.
     *
     * Extension for this EP should implement IReduxStoreExtension interface.
     */
    ReduxStore = "REDUX_STORE",
    /**
     * The extension for this EP is used to define dependency.
     *
     * Extension for this EP should implement IDependencyDefine interface.
     */
    DependencyDefine = "DEPENDENCY_DEFINE",
    /**
     * Is used to find data source factory.
     * Because ds factory is heavy so app can't load all ds factories.
     * So, we define this extension and app will load all of these extensions and use this extension to load factory.
     */
    DataSourceFactoryUri = "DATA_SOURCE_FACTORY_URI",
    ContextTool = "CONTEXT_TOOL",
    LayoutTransformer = "LAYOUT_TRANSFORMER"
}
export declare const EP_SUPPORT_MULTIPLE_EXTENTIONS: ExtensionPoints[];
export interface BaseExtension {
    index?: number;
    /**
     * the unique id. For widget's provided extension, the id is: widgetId + extensionName
     */
    id: string;
    name?: string;
    label?: string;
    /**
     * The widget id that provides the extension.  No widget id means the extension is provide by jimu.
     */
    widgetId?: string;
    destroy?: () => void;
}
export declare class DummyExtension implements BaseExtension {
    index?: number;
    id: string;
    name?: string;
    widgetId?: string;
    label?: string;
}
export interface AppConfigProcessorExtension extends BaseExtension {
    process: (appConfig: AppConfig) => Promise<AppConfig>;
}
export interface WidgetClassWrapperExtension extends BaseExtension {
    wrap: (WidgetClass: React.ComponentType<WidgetProps>, manifest: WidgetManifest) => React.ComponentClass<WidgetProps>;
}
export interface AppConfigServiceExtension extends BaseExtension {
    loadAppConfig: () => Promise<AppConfig>;
}
export interface ReduxStoreExtension extends BaseExtension {
    getActions: () => string[];
    getStoreKey: () => string;
    getInitLocalState: () => any;
    /**
     * The reducer should return local state
     */
    getReducer: () => (localState: any, action: any, state: IMState) => any;
}
export interface DependencyDefine extends BaseExtension {
    getDependencyKey: () => string;
    getResources: () => Resource[];
}
export interface DataSourceFactoryUri extends BaseExtension {
    getFactoryUri: (dataSourceType: any) => string;
}
export interface ContextTool extends BaseExtension {
    getGroupId(): string;
    getIcon(): React.ComponentClass<React.SVGAttributes<SVGElement>>;
    getTitle(): string;
    onClick?: (props: LayoutContextToolProps, evt?: React.MouseEvent<any>) => void;
    visible?: (props: LayoutContextToolProps) => void;
    checked?: (props: LayoutContextToolProps) => void;
    disabled?: (props: LayoutContextToolProps) => void;
    /**
     * The layout toolbar should call this method to check the return. If the return is not null, layout tool bar should render the returned component
     */
    getSettingPanel(props: LayoutContextToolProps): React.ComponentClass<unknown>;
}
export interface LayoutTransformer extends BaseExtension {
    layoutType: string;
    transformLayout: LayoutTransformFunc;
    transformLayoutItem: LayoutItemTransformFunc;
}
