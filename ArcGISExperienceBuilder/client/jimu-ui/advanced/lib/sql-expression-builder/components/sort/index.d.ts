/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, OrderByOption, ThemeVariables, IMUseDataSource, ImmutableArray } from 'jimu-core';
export interface SortProps {
    onChange: (sortData: Array<OrderByOption>, index?: number) => void;
    value: ImmutableArray<OrderByOption>;
    useDataSource: IMUseDataSource;
    onDelete?: (sortData: Array<OrderByOption>, index?: number) => void;
    onSelect?: (sortData: Array<OrderByOption>, index?: number) => void;
    onSortButtonClick?: (sortData: Array<OrderByOption>, index?: number) => void;
    onAddOption?: (sortData: Array<OrderByOption>) => void;
    theme?: ThemeVariables;
    className?: string;
}
interface ExtraProps {
    intl: IntlShape;
}
export interface SortState {
    option: OrderByOption;
}
export declare const Sort: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<SortProps & ExtraProps>>>;
export {};
