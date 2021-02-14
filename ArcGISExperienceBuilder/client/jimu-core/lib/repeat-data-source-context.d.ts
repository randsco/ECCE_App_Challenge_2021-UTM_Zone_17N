import * as React from 'react';
import { DataRecord } from './data-sources/data-source-interface';
export interface RepeatedDataSource {
    widgetId: string;
    dataSourceId: string;
    recordIndex: number;
    record: DataRecord;
}
export declare function RepeatedDataSourceProvider({ data, children }: {
    data: RepeatedDataSource | RepeatedDataSource[];
    children: React.ReactElement;
}): JSX.Element;
export declare const RepeatedDataSourceConsumer: React.Consumer<any>;
interface WithRepeatedDataSourceComponentProps {
    repeatedDataSource: RepeatedDataSource | RepeatedDataSource[];
}
export declare function withRepeatedDataSource<T>(Component: React.ComponentType<T>): React.ComponentType<Omit<T, keyof WithRepeatedDataSourceComponentProps>>;
export {};
