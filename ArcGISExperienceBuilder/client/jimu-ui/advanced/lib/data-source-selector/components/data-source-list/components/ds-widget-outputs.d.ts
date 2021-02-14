/// <reference types="react" />
import { DataSource, React, IMWidgetJson, ImmutableArray, IntlShape, ImmutableObject, DataSourceJson, UseDataSource } from 'jimu-core';
import { AllDataSourceTypes } from '../../../types';
interface State {
    selectedTypes: ImmutableArray<AllDataSourceTypes>;
    toUseRootDss: {
        [widgetId: string]: DataSource[];
    };
    toUseChildDss: {
        [rootDsId: string]: DataSource[];
    };
    toUseWidgets: IMWidgetJson[];
    hasErrorSelectedDss: boolean;
}
interface Props {
    isDataSourceInited: boolean;
    dataSources: ImmutableObject<{
        [dsId: string]: DataSourceJson;
    }>;
    types: ImmutableArray<AllDataSourceTypes>;
    intl: IntlShape;
    searchValue: string;
    widgetId?: string;
    isMultiple?: boolean;
    hideTypeDropdown?: boolean;
    fromDsIds?: ImmutableArray<string>;
    fromRootDsIds?: ImmutableArray<string>;
    useDataSources?: ImmutableArray<UseDataSource>;
    onChange?: (useDataSources: UseDataSource[]) => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
}
export default class DataSourceWidgetOutputs extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    componentWillUnmount(): void;
    initData: () => void;
    setToUseDataSources: (usedTypes: ImmutableArray<AllDataSourceTypes>, fromRootDsIds: ImmutableArray<string>, fromDsIds: ImmutableArray<string>, searchValue: string) => void;
    setSelectedType: (types: ImmutableArray<AllDataSourceTypes>) => void;
    setHasErrorDss: (hasErrorDss: boolean) => void;
    getRootDss: () => {
        [widgetId: string]: DataSource[];
    };
    getToUseWidgets: (toUseRootDss: {
        [widgetId: string]: DataSource[];
    }, toUseChildDss: {
        [rootDsId: string]: DataSource[];
    }) => IMWidgetJson[];
    getToUseRootDss: (usedTypes: ImmutableArray<string>, fromRootDsIds: ImmutableArray<string>, fromDsIds: ImmutableArray<string>, searchValue: string) => {
        [widgetId: string]: DataSource[];
    };
    getToUseChildDss: (usedTypes: ImmutableArray<string>, fromRootDsIds: ImmutableArray<string>, fromDsIds: ImmutableArray<string>, searchValue: string) => Promise<{
        [rootDsId: string]: DataSource[];
    }>;
    getToUseChildDssByWidgetId: (wId: string) => {
        [rootDsId: string]: DataSource[];
    };
    getWhetherShowList: () => boolean;
    getWhetherShowRootDss: () => boolean;
    getWhetherShowChildDss: () => boolean;
    render(): JSX.Element;
}
export {};
