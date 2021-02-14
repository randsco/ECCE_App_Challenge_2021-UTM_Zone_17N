/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { React, ImmutableArray, Expression, IMFieldSchema, DataSource, Immutable, ImmutableObject, JimuFieldType, UseDataSource, IntlShape } from 'jimu-core';
interface Props {
    useDataSources: ImmutableArray<UseDataSource>;
    expression: Expression | ImmutableObject<Expression>;
    intl: IntlShape;
    widgetId?: string;
    types?: ImmutableArray<JimuFieldType>;
    onChange: (expression: Expression) => void;
}
interface State {
    FieldSelector: any;
}
export declare const DEFAULT_DATA_VIEW_ID = "USE_MAIN_DATA_SOURCE";
export default class AttributeTab extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getSelectedFields: () => {
        fields: Immutable.ImmutableArray<string> | Immutable.ImmutableObject<{
            [dataSourceId: string]: string[];
        }>;
        isSelectedFromRepeatedDataSourceContext: boolean;
    };
    onSelectedFieldsChange: (allSelectedFields: IMFieldSchema[], ds: DataSource, isFromRepeatedDataSourceContext: boolean) => void;
    render(): JSX.Element;
}
export {};
