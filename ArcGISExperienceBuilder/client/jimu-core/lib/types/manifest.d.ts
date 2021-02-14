import { ImmutableObject } from 'seamless-immutable';
import { MessageType } from '../message/message-base-types';
import { Size, WidgetType } from './common';
import { ExtensionPoints } from '../extension-spec/extension-spec';
import { ThemeThemeColors } from './theme';
/** The base interface for both widgets and themes. */
export interface Manifest {
    /** The name must be unique and same as folder name. */
    name: string;
    /** This should be same as the `_widgetLabel` value in translation/default.ts */
    label: string;
    /** The widget/theme version. */
    version: string;
    /** The framework version that the widget/theme depends on. */
    exbVersion: string;
    /**
     * This property is added in runtime.
     *
     * Save the current locale only, but not the default locale.
     * The default string should be written in manifest.
     * There are some conventional keys:
     * _widgetLabel: the widget label.
     * _action_<action name>_label: the action label.
     * _ext_<extension name>_label: the extension label.
     * _layout_<layout name>_label: the layout label.
     *  */
    i18nMessages: any;
    author?: string;
    description?: string;
    copyright?: string;
    license?: string;
}
export interface MessageActionProperty {
    name: string;
    /** The action class uri, relative to `src` folder. */
    uri: string;
    /** The action setting class uri, relative to `src` folder. */
    settingUri?: string;
    label: string;
}
/** @ignore */
export interface DataActionProperty {
    name: string;
    uri: string;
    label: string;
}
export interface WidgetManifest extends Manifest {
    properties?: WidgetManifestProperties;
    /** Extensions provided by the widget. */
    extensions?: ExtensionProperties[];
    /** The message types published by the widget. */
    publishMessages: MessageType[];
    /** The message actions provided by the widget.  */
    messageActions: MessageActionProperty[];
    /** @ignore */
    dataActions: DataActionProperty[];
    /**
     * As a convention, the default locale must be the first.
     **/
    translatedLocales: string[];
    /**
     * When a widget get loaded, the dependency will be loaded first.
     * Use this property, a widget can load some 3rd party libraries.
     *
     * To do this, a widget can define its own dependency by providing an `DependencyDefine` extension,
     * or just put the absolute library URL here.
     *
     * Known dependency:
     *    jimu-arcgis: will load jimu-arcgis package that will load ArcGIS JavaScript API.
     */
    dependency?: string | string[];
    settingDependency?: string | string[];
    /** The size when widget is added into an app. */
    defaultSize?: Size;
    widgetType?: WidgetType;
    /** Valid only when the `hasEmbeddedLayout` is true. */
    layouts?: Array<{
        name: string;
        label: string;
        type?: string;
    }>;
}
export interface ExtensionProperties {
    point: ExtensionPoints;
    /** The extension class URI, relative to `src` folder. */
    uri: string;
    name: string;
    label: string;
}
export interface WidgetManifestProperties {
    /**
     * These properties will be set by webpack automatically.
     */
    /** If `runtime/widget.tsx` exists, this property is true. */
    hasMainClass: boolean;
    /** If `config.json` exists, this property is true. */
    hasConfig: boolean;
    /** If `setting/setting.tsx` exists, this property is true. */
    hasSettingPage: boolean;
    /** ignore */
    hasLayoutItemSettingPage: boolean;
    /** If `runtime/builder-support.tsx` exists, this property is true. */
    hasBuilderSupportModule: boolean;
    /**
     * If false, builder will not load the setting page.
     * If a widget supports inline editing, the widget may not need to show setting page even though it has config.
     * In this case, it can set this property as false.
     */
    hasConfigInSettingPage: boolean;
    /** If true, an edit button will show when widget is selected. */
    supportInlineEditing: boolean;
    /** If true, the widget can be put in a list. */
    supportRepeat: boolean;
    /** If true, the framework will create the layouts for the widget, see `layouts` property. */
    hasEmbeddedLayout: boolean;
    /** If true, the children layout items are constrained in the widget. */
    lockChildren: boolean;
    /** @ignore */
    passDataSourceToChildren: boolean;
    /** If true, the widget will be shown in the `MapViewSelector`. */
    canCreateMapView: boolean;
    /** By default, a widget is constrained in the layout. Set this property as true will make the widget overflow out of the layout. */
    canCrossLayoutBoundary?: boolean;
    /** By default is false, a widget does not have background. The background set in the layout style will take effect.
     *  If it is true, the background setting in layout style will be hidden.
    */
    coverLayoutBackground?: boolean;
    /** Whether flip the icon on RTL, default is false */
    flipIcon?: boolean;
    /**
     * Default value is false.
     *
     * When user click a widget, we can activate the widget (change the widget state to active), but not all widget needs this active state.
     * So, for performance reason, we do not activate a widget by default.
     *
     * When this property is true, and when a widget is activated, we'll use `deactivateOtherWidgets` to check whether deactivate other widgets.
     */
    needActiveState?: boolean;
    /**
     * Default value is true. For map widget, we can set this as false to enable other widgets to interact with map.
     * True, means when this widget is activated, all other widgets will be deactived.
     * False, means when this widget is activated, will not change other widget's state.
     *
     * This means there may be more than one active widget.
     */
    deactivateOtherWidgets?: boolean;
    /**
     * This indicates whether a step-by-step guide is available for the widget.
     * If true, the help tooltip for the widget will include a button to start the guide.
     * The steps of the guide should be defined in widget's `builder-support.tsx` file as a component named and exported as: "WidgetGuide".
     */
    hasGuide?: boolean;
    watchViewportVisibility?: boolean;
}
export declare type IMWidgetManifest = ImmutableObject<WidgetManifest>;
export interface ThemeStyleFilesProperty {
    /** Whether the theme has css style. */
    css: boolean;
    /** Whether the theme has CSS-in-JS style. */
    js: boolean;
}
export interface ThemeManifest extends Manifest {
    /** The theme's theme color. */
    colors?: ThemeThemeColors;
    styleFiles?: ThemeStyleFilesProperty;
}
export declare type IMThemeManifest = ImmutableObject<ThemeManifest>;
