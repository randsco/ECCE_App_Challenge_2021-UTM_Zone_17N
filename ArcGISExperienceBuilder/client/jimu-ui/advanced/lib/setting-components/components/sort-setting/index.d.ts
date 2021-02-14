/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, OrderByOption, ThemeVariables, IMUseDataSource, ImmutableArray } from 'jimu-core';
interface ExtraProps {
    intl: IntlShape;
}
export interface SortSettingOption {
    ruleOptionName: string;
    rule: Array<OrderByOption>;
    isEditOptionName?: boolean;
}
export interface SortSettingProps {
    onChange: (sortData: Array<SortSettingOption>, index?: number) => void;
    useDataSource: IMUseDataSource;
    value: ImmutableArray<SortSettingOption>;
    theme?: ThemeVariables;
    className?: string;
}
export interface SortSettingState {
    option: SortSettingOption;
}
export declare const SortSetting: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<SortSettingProps & ExtraProps>>>;
export {};
