import { AllDataSourceTypes } from './../../types';
import { DataSource, IMDataSourceJson, ImmutableArray } from 'jimu-core';
export declare function traverseGetToUseDss(parentDs: DataSource, toUseDss: DataSource[], toUseTypes: ImmutableArray<string>): void;
export declare function getWhetherUseDataSource(dsJson: IMDataSourceJson, toUseTypes: ImmutableArray<string>): boolean;
export declare function getToUseChildDss(rootDss: DataSource[], toUseTypes: ImmutableArray<string>): Promise<{
    [rootDsId: string]: DataSource[];
}>;
export declare function getSortedLabels(labels: string[]): string[];
export declare function getAddedDataTypes(types: ImmutableArray<AllDataSourceTypes>): ImmutableArray<AllDataSourceTypes>;
export declare function getOutputTypes(types: ImmutableArray<AllDataSourceTypes>): ImmutableArray<AllDataSourceTypes>;
/**
 * Return all root data sources, which self is [to-use data sources](./components/ds-added-data.tsx) or which contains to-use child data sources.
 */
export declare function getAllToUseRootDss(toUseRootDss: DataSource[], toUseChildDss: {
    [rootDsId: string]: DataSource[];
}): DataSource[];
/**
 * Return all [to-use data sources](./components/ds-added-data.tsx).
 */
export declare function getAllToUseDss(toUseRootDss: DataSource[], toUseChildDss: {
    [rootDsId: string]: DataSource[];
}): DataSource[];
