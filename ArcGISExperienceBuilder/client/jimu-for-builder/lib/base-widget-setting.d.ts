/// <reference types="react" />
import { React, IMState } from 'jimu-core';
import { AllWidgetSettingProps, WidgetSettingProps } from './props';
export default class BaseWidgetSetting<P extends AllWidgetSettingProps<unknown> = AllWidgetSettingProps<unknown>, S = unknown> extends React.PureComponent<P, S> {
    /**
     * By default, the props in "WidgetSettingInjectedProps" will be injected into widget setting props. To map more props, please use this function.
     */
    static mapExtraStateProps: (state: IMState, ownProps: Partial<AllWidgetSettingProps<unknown>>) => any;
}
export interface WidgetSettingStaticMethods {
    mapExtraStateProps?: (state: IMState, ownProps: Partial<AllWidgetSettingProps<any>>) => any;
}
export declare type RawWidgetSettingType = (React.ComponentClass<AllWidgetSettingProps<any>> | React.FunctionComponent<AllWidgetSettingProps<any>>) & WidgetSettingStaticMethods;
export declare type WrappedWidgetSettingType = (React.ComponentClass<WidgetSettingProps> | React.FunctionComponent<WidgetSettingProps>) & WidgetSettingStaticMethods;
