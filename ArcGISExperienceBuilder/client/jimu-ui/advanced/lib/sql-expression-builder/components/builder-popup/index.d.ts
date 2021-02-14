/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, IMSqlExpression, DataSource, SqlExpressionMode } from 'jimu-core';
/**
 * The SqlExpressionBuilderPopup properties
 */
export interface SqlExpressionBuilderPopupProps {
    /**
     * Sql expression mode, includes `ALL` and `SIMPLE` mode.
     * Default value is `ALL`.
     */
    mode?: SqlExpressionMode;
    /**
     * Immutable sql expression.
     */
    expression: IMSqlExpression;
    /**
     * Selected data source.
     * Feature layers, feature layers used in web maps, and feature service URLs are supported.
     */
    dataSource: DataSource;
    isOpen: boolean;
    toggle: (isOpen?: boolean) => void;
    onChange: (expression: IMSqlExpression) => void;
    /**
     * @ignore
     */
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
/**
 * A component that provides a modal to get `sql` and `displaySQL` to query and display a certain data source, respectively.
 * The user can configure multiple clauses and clause sets with the AND/OR logic operator.
 * Every clause includes:
 *   field selector, operator selector, (data) source type selector with the default input style.
 *   Additional options: case sensitive and more input settings, with the latter including no user input, display label and ask for values options.
 */
export declare const SqlExpressionBuilderPopup: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<React.PropsWithChildren<import("react-intl").WithIntlProps<SqlExpressionBuilderPopupProps & IntlProps>>, "theme">>;
export default SqlExpressionBuilderPopup;
