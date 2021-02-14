/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableArray, IMDataSourceJson, IntlShape, ImmutableObject, DataSourceJson } from 'jimu-core';
import { AllDataSourceTypes, DataSourceListProps } from '../../types';
interface State {
    isExternalDsShown: boolean;
    getAppConfigAction: any;
    searchValue: string;
}
interface ExtraProps {
    intl: IntlShape;
}
interface StateExtraProps {
    dataSources: ImmutableObject<{
        [dsId: string]: DataSourceJson;
    }>;
}
declare class _DataSourceList extends React.PureComponent<DataSourceListProps & ExtraProps & StateExtraProps, State> {
    externalDsStyle: {
        width: string;
        height: string;
        maxWidth: string;
        margin: number;
    };
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    showExternalDs: () => void;
    onSelectDataFinished: (dsJsons: IMDataSourceJson[]) => void;
    onSelectDataCanceled: () => void;
    onToggleExternalDs: () => void;
    onSearchValueChange: (e: any) => void;
    getWhetherOnlyUseAddedData(types: ImmutableArray<AllDataSourceTypes>): boolean;
    getWhetherOnlyUseWidgetOutput(types: ImmutableArray<AllDataSourceTypes>): boolean;
    getWhetherOneTypeIsOutput(type: string): boolean;
    ExternalDs: JSX.Element;
    render(): JSX.Element;
}
export declare const DataSourceList: React.FC<import("react-intl").WithIntlProps<Pick<React.ClassAttributes<_DataSourceList> & DataSourceListProps & ExtraProps & StateExtraProps, "ref" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "isMultiple" | "types" | "disableRemove" | "isDataSourceInited" | "fromRootDsIds" | "fromDsIds" | "hideHeader" | "hideTypeDropdown" | "disableAddData" | "disableSelection" | "onCloseClick" | "changeInitStatus"> & DataSourceListProps>> & {
    WrappedComponent: React.ComponentType<Pick<React.ClassAttributes<_DataSourceList> & DataSourceListProps & ExtraProps & StateExtraProps, "ref" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "isMultiple" | "types" | "disableRemove" | "isDataSourceInited" | "fromRootDsIds" | "fromDsIds" | "hideHeader" | "hideTypeDropdown" | "disableAddData" | "disableSelection" | "onCloseClick" | "changeInitStatus"> & DataSourceListProps>;
};
export {};
