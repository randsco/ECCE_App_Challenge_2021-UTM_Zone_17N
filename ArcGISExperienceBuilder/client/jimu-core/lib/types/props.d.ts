import * as React from 'react';
import { IMAppConfig, IMWidgetJson } from './app-config';
import { RuntimeInfo, IMRuntimeInfos, IMUser, MutableStatePropsVersion } from './state';
import { IntlShape } from 'react-intl';
import { IMThemeVariables } from './theme';
import { RepeatedDataSource } from '../repeat-data-source-context';
import * as jimuForBuilderModules from 'jimu-for-builder';
import { LayoutEntry } from 'jimu-layouts/layout-builder';
/** All widget properties */
export declare type AllWidgetProps<T> = WidgetProps & WidgetInjectedProps<T>;
export interface WidgetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
    widgetId: string;
    layoutId?: string;
    layoutItemId?: string;
}
export interface BuilderSupportModules {
    /** The library to support builder capability. */
    jimuForBuilderLib: typeof jimuForBuilderModules;
    /** If a widget has an embedded layout, it will receive this property and can use it to render the layout. */
    LayoutEntry?: typeof LayoutEntry;
    /** If a widget has some modules that should only be loaded when it is loaded in builder, these modules will be injected here. */
    widgetModules?: any;
}
/** The properties injected by framework. */
export declare type WidgetInjectedProps<T> = Omit<IMWidgetJson, 'config'> & RuntimeInfo & {
    dispatch: any;
    config: T;
    portalUrl?: string;
    portalSelf?: any;
    locale: string;
    intl: IntlShape;
    theme: IMThemeVariables;
    appI18nMessages: any;
    i18nMessages: any;
    /**
     * A widget can have internal state, just like a normal react component. To do this, the widget can put the state in `this.state`, or put the state
     * in app store by publishing `widgetStatePropChange` action. The state properties are saved here.
     *
     * When should widget put state here?
     *  * Widget may have: main widget class, extensions, message actions, data actions, and all of these
     *    components may need to communicate with each other. In this case, a widget can put the shared data here for communication.
     *  * A widget can put any data here if it doesn't want to put in `this.state`.
     */
    stateProps: any;
    /** If a widget `supportRepeat` and is put into a repeater (e.g. list), it will receive this property. */
    repeatedDataSource: RepeatedDataSource | RepeatedDataSource[];
    /**
     * We can put some objects here that are hard to immute.
     */
    mutableStateProps: any;
    /**
     * This property is used to trigger re-render when properties are changed, because the property may be mutable and cannot be triggered re-render.
     */
    mutableStatePropsVersion: MutableStatePropsVersion;
    token?: string;
    user?: IMUser;
    /** When widget is launched in builder, it will receive this property. */
    builderSupportModules?: BuilderSupportModules;
};
/** @ignore */
export interface LayoutStateProps {
    dispatch?: any;
    appConfig?: IMAppConfig;
    widgetsRuntimeInfo?: IMRuntimeInfos;
}
