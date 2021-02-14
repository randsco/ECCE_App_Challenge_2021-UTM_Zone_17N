/// <reference types="react" />
import { DataSource, React, ImmutableArray, IntlShape, DataSourceManager, UseDataSource } from 'jimu-core';
interface State {
    isTypeDropdownOpen: boolean;
    selectedErrorDss: string[];
}
interface Props {
    intl: IntlShape;
    rootDss: DataSource[];
    allToUseDss: DataSource[];
    widgetId?: string;
    showErrorDss?: boolean;
    useDataSources?: ImmutableArray<UseDataSource>;
    isMultiple?: boolean;
    onChange?: (useDataSources: UseDataSource[]) => void;
    changeHasErrorSelectedDss?: (hasErrorDss: boolean) => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
}
export default class DsList extends React.PureComponent<Props, State> {
    dsManager: DataSourceManager;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    getWhetherShowSingleDss: () => boolean;
    getSelectedErrorDss: () => string[];
    render(): JSX.Element;
}
export {};
