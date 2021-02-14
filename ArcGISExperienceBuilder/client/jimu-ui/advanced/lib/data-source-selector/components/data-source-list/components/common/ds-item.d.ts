/// <reference types="react" />
import { React, DataSource, ImmutableArray, IntlShape, UseDataSource, WidgetJson } from 'jimu-core';
interface Props {
    intl: IntlShape;
    ds: DataSource;
    widgetId?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    isMultiple?: boolean;
    onChange?: (useDataSources: UseDataSource[]) => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
    className?: string;
}
interface State {
}
export default class DsItem extends React.PureComponent<Props, State> {
    getWhetherSelected: () => boolean;
    getParentWidget: (widgetId: string) => WidgetJson;
    getUseDsWithoutFields: (useDs: UseDataSource) => UseDataSource;
    getUseDs: () => UseDataSource;
    getDsLabel: (ds: DataSource) => string;
    onItemClick: (e: any) => void;
    onDsSelected: (selectedDs: UseDataSource) => void;
    onDsRemoved: (removedDs: UseDataSource) => void;
    render(): JSX.Element;
}
export {};
