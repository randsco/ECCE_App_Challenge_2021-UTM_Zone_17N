import * as React from 'react';
import { AllWidgetProps, WidgetProps } from './types/props';
import { IMState } from './types/state';
import { DataSource } from './data-sources/data-source-interface';
import { BaseVersionManager } from './version-manager';
export default class BaseWidget<P extends AllWidgetProps<unknown> = AllWidgetProps<unknown>, S = unknown> extends React.PureComponent<P, S> {
    /**
     * By default, the props in "WidgetInjectedProps" will be injected into widget props. To map more props, please use this function.
     */
    static mapExtraStateProps: (state: IMState, ownProps: Partial<AllWidgetProps<any>>) => any;
    /**
     * When widget is rendered in server side, to fetch data to render, we can use this method.
     *
     * This function can return some props, which are put in app store so it can be passed to client.
     * Please make sure the returned props are plain object.
     *
     * @param state
     * @param allProps
     * @param dataSources the widget required data sources. we can use the data source to load data.
     *      If we call `dataSource.load()`, the fechted data will be saved in app store and be passed to client as well.
     */
    static preloadData: (state: IMState, allProps: Partial<AllWidgetProps<any>>, dataSources: {
        [dsId: string]: DataSource;
    }) => Promise<any>;
    static versionManager: BaseVersionManager;
}
export interface WidgetStaticMethods {
    mapExtraStateProps?: (state: IMState, ownProps: Partial<AllWidgetProps<any>>) => any;
    /**
     * When widget is rendered in server side, to fetch data to render, we can use this method.
     *
     * This function can return some props, which are put in app store so it can be passed to client.
     * Please make sure the returned props are plain object.
     *
     * @param state
     * @param allProps
     * @param dataSources the widget required data sources. we can use the data source to load data.
     *      If we call `dataSource.load()`, the fechted data will be saved in app store and be passed to client as well.
     */
    preloadData?: (state: IMState, allProps: Partial<AllWidgetProps<any>>, dataSources: {
        [dsId: string]: DataSource;
    }) => Promise<any>;
    versionManager?: BaseVersionManager;
}
export declare type RawWidgetType = (React.ComponentClass<AllWidgetProps<any>> | React.FunctionComponent<AllWidgetProps<any>>) & WidgetStaticMethods;
export declare type WrappedWidgetType = (React.ComponentClass<WidgetProps> | React.FunctionComponent<WidgetProps>) & WidgetStaticMethods;
