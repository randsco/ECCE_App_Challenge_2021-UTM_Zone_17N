/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, DataSource, ImmutableArray, SqlClause, SqlClauseSet, IMSqlExpression } from 'jimu-core';
interface SqlExpressionClauseSetRuntimeProps {
    id: string;
    /**
     * The complete sql expression. It's used to get cascade sql for specific clause
     */
    expression: IMSqlExpression;
    clauseSet: SqlClauseSet;
    dataSource: DataSource;
    isHosted?: boolean;
    onChange: (clause: SqlClauseSet, id: string) => void;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    partsArray: ImmutableArray<SqlClause | SqlClauseSet>;
}
export declare class _SqlExprClauseSetRuntime extends React.PureComponent<SqlExpressionClauseSetRuntimeProps & IntlProps, State> {
    constructor(props: any);
    componentDidUpdate(prevProps: SqlExpressionClauseSetRuntimeProps, prevState: State): void;
    i18nMessage: (id: string) => string;
    onClauseChange: (clause: SqlClause, id: string) => void;
    render(): JSX.Element;
}
declare const SqlExpressionClauseSetRuntime: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<SqlExpressionClauseSetRuntimeProps & IntlProps>>>;
export default SqlExpressionClauseSetRuntime;
