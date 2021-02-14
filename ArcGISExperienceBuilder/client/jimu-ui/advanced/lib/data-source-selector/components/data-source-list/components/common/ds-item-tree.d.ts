/// <reference types="react" />
import { DataSource, React, ImmutableArray, IntlShape, UseDataSource } from 'jimu-core';
interface State {
    inAllToUseDss: (dataSource: Partial<DataSource>) => boolean;
}
interface Props {
    ds: DataSource;
    /**
     * All [to-use data sources](../ds-add-data.tsx).
     * Use the array to get whether a data source can be list here and select.
     */
    allToUseDss: DataSource[];
    intl: IntlShape;
    widgetId?: string;
    isMultiple?: boolean;
    label?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    onChange?: (useDataSources: UseDataSource[]) => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
}
export default class DsItemTree extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidUpdate(prevProps: Props): void;
    renderDsItem: (ds: DataSource) => JSX.Element;
    renderDsLabel: (label: string) => JSX.Element;
    getChildDataSources: (ds: DataSource) => DataSource[];
    getLabel: (ds: DataSource) => string;
    render(): JSX.Element;
}
export {};
