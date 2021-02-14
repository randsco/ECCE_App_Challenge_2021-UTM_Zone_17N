/// <reference types="react" />
/// <reference types="seamless-immutable" />
import { React, Expression, ExpressionPart, ExpressionFunctions, ImmutableArray, IMFieldSchema, DataSource, IntlShape, DataSourceManager, UseDataSource, ImmutableObject, Immutable } from 'jimu-core';
import { ExpSelection } from '../types';
interface Props {
    expression: Expression;
    useDataSources: ImmutableArray<UseDataSource>;
    externalId: string;
    expSelection: ExpSelection;
    inEditablePart: boolean;
    container: HTMLElement;
    intl: IntlShape;
    widgetId: string;
    /**
     * e: new expression
     * partId: id of added new part
     * isReplacing: if true, will replace a existed part with new part (only when is in editable part and the part is field or function)
     */
    onSelect: (e: Expression, partId: string, isReplacing: boolean) => void;
}
interface State {
    active: ExpEditorHelperTabs;
    FieldSelector: any;
}
declare enum ExpEditorHelperTabs {
    Fields = "FIELDS",
    Functions = "FUNCTIONS"
}
export default class ExpEditorHelper extends React.PureComponent<Props, State> {
    dsManager: DataSourceManager;
    __unmount: boolean;
    ExpEditorHelperTabs: {
        FIELDS: string;
        FUNCTIONS: string;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    getTab: (tab: ExpEditorHelperTabs) => JSX.Element;
    getSelectedFields: () => Immutable.ImmutableObject<{
        [dataSourceId: string]: string[];
    }>;
    getSelectedFunction: () => ExpressionFunctions;
    onFunctionSelect: (functionName: ExpressionFunctions) => void;
    onFieldSelect: (allSelectedFields: IMFieldSchema[], ds: DataSource, isFromRepeatedDataSourceContext: boolean) => void;
    onActiveTabChange: (tab: ExpEditorHelperTabs) => void;
    getSelectionPartId: () => string;
    changeExpression: (newParts: ExpressionPart[], expression: Expression) => void;
    getNewPartIndex: (newParts: ExpressionPart[], expression: Expression, isReplacing: boolean) => number;
    getEditingPartIndex: () => number;
    getIsReplacing: () => boolean;
    render(): JSX.Element;
}
export {};
