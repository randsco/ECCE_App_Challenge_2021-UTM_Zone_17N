/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, DataSource, CodedValue, SqlClause, ClauseValueOptions, IMFieldSchema, IMSqlExpression } from 'jimu-core';
interface SqlExprClauseRuntimeProps {
    id: string;
    /**
     * The complete sql expression. It's used to get cascade sql for specific clause
     */
    expression: IMSqlExpression;
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
}
export declare class _SqlExprClauseRuntime extends React.PureComponent<SqlExprClauseRuntimeProps & IntlProps, State> {
    codedValues: CodedValue[];
    fieldObj: IMFieldSchema;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    getCodedValues: () => CodedValue[];
    onValueOptsChange: (valueOptions: ClauseValueOptions) => void;
    render(): JSX.Element;
}
declare const SqlExpressionClauseRuntime: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<SqlExprClauseRuntimeProps & IntlProps>>>;
export default SqlExpressionClauseRuntime;
