/// <reference types="react" />
import { AllWidgetProps, WidgetProps, React, WidgetContext, WidgetManifest, UseDataSource, ImmutableArray, DataSource, i18n, ImmutableObject, UrlParameters, ThemeVariables } from 'jimu-core';
import { IntlShape } from 'react-intl';
interface Props {
    id?: string;
    icon?: string;
    label?: string;
    visible?: boolean;
    index?: number;
    uri?: string;
    itemId?: string;
    context?: WidgetContext;
    manifest?: WidgetManifest;
    version?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    dataSources?: {
        [dsId: string]: DataSource;
    };
    outputDataSource?: string[];
    outputDataSources?: string[];
    dispatch?: any;
    config?: any;
    messages?: i18n.I18nMessages;
    intl?: IntlShape;
    isClassLoaded?: boolean;
    state?: 'opened' | 'active' | 'closed';
    windowState?: 'normal' | 'minimized' | 'maximized';
    queryObject?: ImmutableObject<UrlParameters>;
    theme?: Partial<ThemeVariables>;
}
declare type FuncWidget = (props: WidgetProps) => JSX.Element;
declare type ClassWidget = React.ComponentClass<WidgetProps>;
declare type Widget = FuncWidget | ClassWidget;
export declare function wrapWidget(WidgetClass: Widget, props?: Props): React.ComponentClass<WidgetProps & Partial<AllWidgetProps<unknown>>>;
export {};
