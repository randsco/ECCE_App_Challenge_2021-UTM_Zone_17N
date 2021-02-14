/// <reference types="react" />
/** @jsx jsx */
import { React, IMFieldSchema, IntlShape, DataSource, CodedValue, SqlClause, ClauseOperator, ClauseSourceType, ClauseCascade, ClauseValueOptions, ClauseLabelDisplay, ClauseDisplayType, SqlExpressionMode } from 'jimu-core';
import { ClauseInputEditor, ClauseDisplayFormat, SqlExpressionSizeMode } from 'jimu-ui/basic/sql-expression-runtime';
interface SqlExprClauseProps {
    mode: SqlExpressionMode;
    sizeMode: SqlExpressionSizeMode;
    id: string;
    clause: SqlClause;
    dataSource: DataSource;
    isHosted?: boolean;
    onChange: (clause: SqlClause, id: string) => void;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    rerender: boolean;
    supportCaseSensitive: boolean;
    supportAskForValue: boolean;
    isValueLabelPanelShown: boolean;
}
export declare class _SqlExprClause extends React.PureComponent<SqlExprClauseProps & IntlProps, State> {
    _isMounted: boolean;
    operatorList: ClauseOperator[];
    displayTypeList: ClauseDisplayFormat;
    codedValues: CodedValue[];
    fieldObj: IMFieldSchema;
    labelRef: any;
    constructor(props: any);
    getFieldObj: () => void;
    getCodedValues(): CodedValue[];
    _updateTwoStates: (operator: ClauseOperator, sourceType: ClauseSourceType, rerender?: boolean) => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: SqlExprClauseProps, prevState: State): void;
    componentWillMount(): void;
    i18nMessage: (id: string) => string;
    isCascadeSupported: () => boolean;
    _updateCaseSensitiveState(operator: ClauseOperator, sourceType: ClauseSourceType): void;
    _updateAskForValueState(operator: ClauseOperator, sourceType: ClauseSourceType): void;
    getOperatorsByField: (field: IMFieldSchema) => ClauseOperator[];
    deleteClause: () => void;
    toggleCaseSensitive: () => void;
    duplicateClause: () => void;
    toggleValueLabelPanel: () => void;
    getLabel: () => string;
    onAskForValueOptsChange: (options: Record<string, any>) => void;
    onLabelBlur: (value: string, isDisplayLabel?: boolean) => void;
    onLabelChange: (label: string) => void;
    setValueLabelStatus: (type: ClauseDisplayType) => void;
    _getAskForValueOptions: () => {
        label: any;
        display: ClauseLabelDisplay;
        hint: string;
        cascade: ClauseCascade;
    };
    /*** field ***/
    onFieldChange: (allSelectedFields: IMFieldSchema[]) => void;
    _updateOptionsByField: (field: IMFieldSchema, operator?: ClauseOperator) => ClauseValueOptions;
    /*** operator ***/
    onOperatorChange: (operator: ClauseOperator) => void;
    _updateOptionsByOperator: (field: IMFieldSchema, operator: ClauseOperator, jimuFieldName: string) => ClauseValueOptions;
    /*** value ***/
    onValueOptsChange: (valueOptions: ClauseValueOptions) => void;
    /*** source type ***/
    onSourceTypeSelect: (sourceType: ClauseSourceType) => void;
    /*** style type ***/
    onInputTypeSelect: (inputEditor: ClauseInputEditor) => void;
    getValueOptions: () => ClauseValueOptions;
    getControllers: (clause: any, normalOperators: any) => JSX.Element;
    onChanged: (options: Record<string, any>) => void;
    render(): JSX.Element;
}
declare const SqlExpressionClause: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<SqlExprClauseProps & IntlProps>>>;
export default SqlExpressionClause;
