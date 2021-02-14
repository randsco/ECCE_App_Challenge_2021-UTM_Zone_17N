/// <reference types="seamless-immutable" />
/// <reference types="react" />
/** @jsx jsx */
import { React, DataSourceJson, ThemeVariables, ImmutableObject, ImmutableArray, IntlShape, IMDataSourceInfo, UseDataSource, Immutable, DataViewJson, IMDataViewJson } from 'jimu-core';
import { AllDataSourceTypes } from '../../../types';
export declare const DefaultDataViewId = "USE_MAIN_DATA_SOURCE";
interface State {
    isDataSourceInited: boolean;
    modalType: 'none' | 'ds';
    SidePopper: any;
}
interface Props {
    types: ImmutableArray<AllDataSourceTypes>;
    widgetId?: string;
    fromRootDsIds?: ImmutableArray<string>;
    buttonLabel?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    isMultiple?: boolean;
    closeDataSourceListOnChange?: boolean;
    fromDsIds?: ImmutableArray<string>;
    hideHeader?: boolean;
    hideTypeDropdown?: boolean;
    disableAddData?: boolean;
    disableDataSourceList?: boolean;
    disableDataView?: boolean;
    hideDataView?: boolean;
    onChange?: (useDataSources: UseDataSource[]) => void;
    disableSelection?: (useDataSources: UseDataSource[]) => boolean;
    disableRemove?: (useDataSources: UseDataSource[]) => boolean;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
interface StateExtraProps {
    dataSources: ImmutableObject<{
        [dsId: string]: DataSourceJson;
    }>;
    dataSourcesInfo: ImmutableObject<{
        [dsId: string]: IMDataSourceInfo;
    }>;
}
declare class _SetDsBtnDsList extends React.PureComponent<Props & ExtraProps & StateExtraProps, State> {
    __unmount: boolean;
    DefaultDataView: IMDataViewJson;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Props & ExtraProps & StateExtraProps): void;
    changeInitStatus: (isInited: boolean) => void;
    disableSelection: () => boolean;
    disableRemove: () => boolean;
    onModalClose: () => void;
    onMainDsChanged: (useDataSources: UseDataSource[]) => void;
    onMainDsRemoved: (mainDataSourceId: string) => void;
    onDataViewChanged: (mainDataSourceId: string, dataViews: ImmutableArray<DataViewJson>) => void;
    toggleDsList: () => void;
    getWhetherShowPlaceholder: () => boolean;
    groupUseDssByMainDataSource: (useDataSources: ImmutableArray<UseDataSource>) => {
        [mainDataSourceId: string]: Immutable.ImmutableArray<DataViewJson>;
    };
    render(): JSX.Element;
}
declare const _default: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<Props & ExtraProps & StateExtraProps & React.RefAttributes<_SetDsBtnDsList>, "theme">>;
/**
 * @ignore
 */
export default _default;
