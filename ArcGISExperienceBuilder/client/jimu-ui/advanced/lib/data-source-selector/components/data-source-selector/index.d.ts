/// <reference types="react" />
/** @jsx jsx */
import { React, DataSourceJson, ImmutableObject, IntlShape, ReactRedux, IMDataSourceInfo, UseDataSource } from 'jimu-core';
import { DataSourceListProps } from '../../types';
/**
 * The DataSourceSelector props
 */
export interface DataSourceSelectorProps extends Omit<DataSourceListProps, 'isDataSourceInited' | 'onCloseClick' | 'changeInitStatus' | 'disableSelection' | 'disableRemove'> {
    /**
     * Label of button, default is `defaultMessages.setDataSource`
     */
    buttonLabel?: string;
    /**
     * Whether or not to enable data source use
     */
    useDataSourcesEnabled?: boolean;
    /**
     * Whether or not to show toggle data button, will hide toggle data button if the value is true
     */
    mustUseDataSource?: boolean;
    /**
     * Whether or not to show data source list panel after clicking a selected data source
     */
    disableDataSourceList?: boolean;
    /**
     * Whether or not to allow to select data view,
     * the props will make data view dropdwon disabled.
     */
    disableDataView?: boolean;
    /**
     * Whether or not to hide the data view dropdwon,
     * the props will make data view dropdwon hidden.
     */
    hideDataView?: boolean;
    /**
     * Whether or not to close data source list panel after selecting data sources are changed
     */
    closeDataSourceListOnChange?: boolean;
    /**
     * Callback when toggle data button is clicked
     */
    onToggleUseDataEnabled?: (useDataSourcesEnabled: boolean) => void;
    /**
     * Before selecting, the component will call this method to check if it can continue selecting
     */
    disableSelection?: (useDataSources: UseDataSource[]) => boolean;
    /**
     * Before remove, the component will call this method to check if it can continue removing
     */
    disableRemove?: (useDataSources: UseDataSource[]) => boolean;
    /**
     * @ignore
     * Only used by theme
     */
    className?: string;
}
/**
 * @ignore
 */
interface StateExtraProps {
    dataSources: ImmutableObject<{
        [dsId: string]: DataSourceJson;
    }>;
    dataSourcesInfo: ImmutableObject<{
        [dsId: string]: IMDataSourceInfo;
    }>;
}
/**
 * @ignore
 */
interface ExtraProps {
    intl: IntlShape;
}
/**
 * A component to select data source for other components or widgets.
 */
export declare const DataSourceSelector: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<DataSourceSelectorProps & StateExtraProps & ExtraProps>> & {
    WrappedComponent: React.ComponentType<DataSourceSelectorProps & StateExtraProps & ExtraProps>;
}, Pick<import("react-intl").WithIntlProps<DataSourceSelectorProps & StateExtraProps & ExtraProps>, "className" | "onChange" | "useDataSources" | "forwardedRef" | "widgetId" | "isMultiple" | "types" | "buttonLabel" | "useDataSourcesEnabled" | "disableRemove" | "fromRootDsIds" | "fromDsIds" | "hideHeader" | "hideTypeDropdown" | "disableAddData" | "disableSelection" | "mustUseDataSource" | "disableDataSourceList" | "disableDataView" | "hideDataView" | "closeDataSourceListOnChange" | "onToggleUseDataEnabled"> & DataSourceSelectorProps>;
export {};
