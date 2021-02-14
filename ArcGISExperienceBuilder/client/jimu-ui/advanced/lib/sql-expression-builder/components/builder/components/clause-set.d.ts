/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, DataSource, SqlClause, ClauseLogic, SqlClauseSet, SqlExpressionMode } from 'jimu-core';
import { SqlExpressionSizeMode } from 'jimu-ui/basic/sql-expression-runtime';
interface SqlExprClauseSet {
    mode: SqlExpressionMode;
    sizeMode: SqlExpressionSizeMode;
    id: string;
    clauseSet: SqlClauseSet;
    dataSource: DataSource;
    isHosted?: boolean;
    onChange: (clauseSet: SqlClauseSet, id: string) => void;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
export declare class _SqlExprClauseSet extends React.PureComponent<SqlExprClauseSet & IntlProps, unknown> {
    LogicalOperator: ClauseLogic;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    addClause: (clause?: SqlClause) => void;
    duplicateClauseSet: () => void;
    deleteClauseSet: () => void;
    changeAndOR: (logicalOperator: ClauseLogic) => void;
    onClauseChange: (clause: SqlClause, id: string) => void;
    onChange: (options: any) => void;
    render(): JSX.Element;
}
declare const SqlExpressionClauseSet: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<SqlExprClauseSet & IntlProps>>>;
export default SqlExpressionClauseSet;
