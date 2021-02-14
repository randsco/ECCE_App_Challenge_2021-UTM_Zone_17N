/// <reference types="react" />
import { IMDataSourceJson, ImmutableArray, ImmutableObject, UrlParameters, IMUser, IntlShape, IMThemeVariables, IMLayoutItemJson, LayoutInfo, BoundingBox, DataSourceJson, IMWidgetJson, WidgetJson } from 'jimu-core';
/** All widget setting props */
export declare type AllWidgetSettingProps<T> = WidgetSettingProps & WidgetSettingInjectedProps<T>;
export interface SettingChangeFunction {
    (widgetJson: Partial<WidgetJson>, outputDataSourcesJson?: DataSourceJson[]): void;
}
export interface WidgetSettingProps extends React.HTMLAttributes<HTMLDivElement> {
    widgetId: string;
    /**
     * On config change, set the changed properties only.
     * To delete the existing property, set the property as null. */
    onSettingChange: SettingChangeFunction;
}
/** @ignore */
export interface WidgetItemSettingProps {
    layout: IMLayoutItemJson;
    onSettingChange: (layoutInfo: LayoutInfo, setting: any) => void;
    onPosChange: (layoutInfo: LayoutInfo, bbox: BoundingBox) => void;
}
export declare type IMUseDataSourcesJson = ImmutableArray<ImmutableObject<{
    dataSourceJson: IMDataSourceJson;
    rootDataSourceId?: string;
    fields?: string[];
}>>;
export declare type WidgetSettingInjectedProps<T> = Omit<IMWidgetJson, 'config'> & {
    dispatch: any;
    queryObject: ImmutableObject<UrlParameters>;
    config: T;
    locale: string;
    appI18nMessages: any;
    intl: IntlShape;
    token?: string;
    user?: IMUser;
    theme: IMThemeVariables;
    portalUrl?: string;
    portalSelf?: any;
};
