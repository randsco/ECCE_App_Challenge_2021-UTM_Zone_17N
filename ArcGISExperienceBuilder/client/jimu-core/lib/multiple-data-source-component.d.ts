import * as React from 'react';
import { IMDataSourceInfo } from './types/state';
import { DataSource } from './data-sources/data-source-interface';
import { UseDataSource } from './types/app-config';
import { ImmutableArray } from 'jimu-core';
interface DataRenderFunction {
    (dss: {
        [dataSourceId: string]: DataSource;
    }, infos: {
        [dataSourceId: string]: IMDataSourceInfo;
    }): React.ReactNode;
}
export interface MultipleDataSourceComponentProps {
    useDataSources?: ImmutableArray<UseDataSource>;
    /**
     * Need to pass widgetId/localId if use data source component to do query.
     *
     * For global ds/view, please use widgetId.
     * For local ds/view, please use localId. The recommended localId is: widgetId + ???
     */
    widgetId?: string;
    localId?: string;
    queries?: {
        [dataSourceId: string]: any;
    };
    children?: DataRenderFunction | React.ReactNode;
    onDataSourceInfoChange?: (infos: {
        [dataSourceId: string]: IMDataSourceInfo;
    }) => void;
    onDataSourceCreated?: (dss: {
        [dataSourceId: string]: DataSource;
    }) => void;
}
interface ExtraProps {
    [dsId: string]: IMDataSourceInfo;
}
declare type AllProps = MultipleDataSourceComponentProps & ExtraProps;
export declare class MultipleDataSourceComponentInner extends React.PureComponent<AllProps, unknown> {
    handleDataSourceCreated: () => void;
    handleDataSourceInfoChange: () => void;
    getDataSources: () => {};
    getDataSourcesInfo: () => {};
    hasLoadedDataSources: () => boolean;
    MemoDataSourceComponents: React.MemoExoticComponent<({ useDataSources, queries, widgetId, localId }: {
        useDataSources: ImmutableArray<UseDataSource>;
        queries: {
            [dataSourceId: string]: any;
        };
        widgetId: string;
        localId: string;
    }) => JSX.Element>;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<any, Pick<unknown, never> & MultipleDataSourceComponentProps>;
export default _default;
