/// <reference types="react" />
import { React, ImmutableArray, ExpressionFunctions, Expression, DataSourceManager, FieldSchema, ExpressionPart, IntlShape, ImmutableObject, ExpressionPartGoup, UseDataSource, IMUseDataSource } from 'jimu-core';
interface Props {
    useDataSources: ImmutableArray<UseDataSource>;
    expression: Expression | ImmutableObject<Expression>;
    intl: IntlShape;
    widgetId?: string;
    onChange: (expression: Expression) => void;
}
interface State {
    selectedDsId: string;
    selectedJimuFieldName: string;
    selectedFunction: ExpressionFunctions;
    MainDataAndViewSelector: any;
    DataViewPriority: any;
}
export default class StatisticsTab extends React.PureComponent<Props, State> {
    dsManager: DataSourceManager;
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    componentWillUnmount(): void;
    getWhetherExpressionIsFuncAndHasOnePart: (groupedParts: ExpressionPartGoup[]) => boolean;
    hasNoParamAndDsEnabled: (part: ExpressionPartGoup) => boolean;
    hasOneParamAndDsEnabled: (part: ExpressionPartGoup) => boolean;
    getWhetherUseSelectedDs: (part: ExpressionPart) => boolean;
    getDefaultDsId: () => string;
    getDefaultFunc: () => ExpressionFunctions;
    getDefaultJimuName: (fields: {
        [jimuName: string]: FieldSchema;
    }) => string;
    getDataSourceId: () => string;
    getSelectedFieldName: (fields: {
        [jimuName: string]: FieldSchema;
    }, fieldJimuName: string) => string;
    getSelectedJimuFieldName: () => string;
    getSelectedFunction: () => string;
    getNumberFields: (dsId: string) => {
        [jimuName: string]: FieldSchema;
    };
    getDsLabel: (dsId: string) => string;
    getSelectedUseDataSource: () => IMUseDataSource;
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFunctionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChange: () => void;
    onSelectedUseDsChange: (useDataSource: IMUseDataSource) => void;
    render(): JSX.Element;
}
export {};
