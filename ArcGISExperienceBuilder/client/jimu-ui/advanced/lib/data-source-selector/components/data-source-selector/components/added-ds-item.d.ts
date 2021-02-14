/// <reference types="seamless-immutable" />
/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, IntlShape, ImmutableArray, DataViewJson, IMDataViewJson, Immutable, ImmutableObject } from 'jimu-core';
import { MultiSelectItem } from 'jimu-ui';
interface Props {
    mainDataSourceId: string;
    /**
     * Selected data views.
     */
    dataViews: ImmutableArray<DataViewJson>;
    intl: IntlShape;
    DefaultDataView: IMDataViewJson;
    isMultiple?: boolean;
    disableDataSourceList?: boolean;
    disableAddData?: boolean;
    disableDataView?: boolean;
    hideDataView?: boolean;
    hideRemove?: boolean;
    className?: string;
    onChange?: (mainDataSourceId: string, dataViews: ImmutableArray<DataViewJson>) => void;
    onRemove?: (mainDataSourceId: string) => void;
    onClick?: () => void;
}
interface State {
    isViewSettingOpen: boolean;
    isViewSelectOpen: boolean;
    settingDataView: IMDataViewJson;
    getAppConfigAction: any;
}
/**
 * @ignore
 */
export default class DsItem extends React.PureComponent<Props & {
    theme: ThemeVariables;
}, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onRemove: (e: any) => void;
    onDataViewChange: (e: any) => void;
    onMultiDataViewChange: (e: any, value: string | number) => void;
    formatMessage: (id: string, values?: {
        [key: string]: any;
    }) => string;
    getDsLabel: (dataSourceId: string) => string;
    getWhetherItemError: (dataSourceId: string) => boolean;
    getAllDataViews: () => Immutable.ImmutableObject<{
        [dvId: string]: DataViewJson;
    }>;
    getMultiSelectItems: (dataViews: Immutable.ImmutableObject<{
        [dvId: string]: DataViewJson;
    }>) => ImmutableArray<MultiSelectItem>;
    getCreateViewButton: () => JSX.Element;
    getSelectedValueForSingleSelect: () => string;
    getMultiSelectSelectedString: (values: Array<string | number>) => string;
    onDataViewClick: (e: any, dataView: IMDataViewJson) => void;
    onCreateViewClick: () => void;
    toggleViewSetting: () => void;
    toggleViewSelect: () => void;
    stopPropagation: (e: any) => void;
    onDataViewSettingApply: (dataView: IMDataViewJson) => void;
    editQuery: (dataView: IMDataViewJson) => void;
    editDataView: (dataView: IMDataViewJson) => void;
    render(): JSX.Element;
}
export {};
