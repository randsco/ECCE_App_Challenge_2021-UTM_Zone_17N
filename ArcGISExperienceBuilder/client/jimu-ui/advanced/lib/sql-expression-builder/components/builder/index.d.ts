/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, DataSource, SqlExpressionMode, IMSqlExpression, QueryScope } from 'jimu-core';
export interface SqlExpressionBuilderProps {
    /**
     * Imutable sql expression.
     */
    expression: IMSqlExpression;
    dataSource: DataSource;
    onChange: (sqlExprObj: IMSqlExpression) => void;
    /**
     * Sql expression mode, includes `ALL` and `SIMPLE` mode.
     * Default value is `ALL`.
     */
    mode?: SqlExpressionMode;
    /**
     * Decide the data sourece's filters when source type is unique or multiple.
     * Default value is `IN_CONFIG_VIEW`.
     */
    queryScope?: QueryScope;
    /**
     * @ignore
     * Valid when queryScope is `InRuntimeView`.
     * It's used to exclude filter of current widget, for custom filter at runtime in the furture.
     */
    widgetId?: string;
    /**
     * @ignore
     */
    noScrollForList?: boolean;
    style?: React.CSSProperties;
    className?: string;
}
/**
 * @ignore
 */
interface IntlProps {
    intl: IntlShape;
}
/**
 * A component allowing users to get `sql` and `displaySQL` to query and display a certain data source, respectively.
 * The user can configure multiple clauses and clause sets with the AND/OR logic operator.
 * Every clause includes:
 *   field selector, operator selector, (data) source type selector with the default input style.
 *   Additional options: case sensitive and more input settings, with the latter including no user input, display label and ask for values options.
 */
export declare const SqlExpressionBuilder: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<SqlExpressionBuilderProps & IntlProps>>>;
export default SqlExpressionBuilder;
