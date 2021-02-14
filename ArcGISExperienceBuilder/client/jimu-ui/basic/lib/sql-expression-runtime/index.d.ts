/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, DataSource, IMSqlExpression, QueryScope } from 'jimu-core';
/**
 * SqlExpressionRuntime properties
 */
export interface SqlExpressionRuntimeProps {
    /**
     * Imutable sql expression.
     */
    expression: IMSqlExpression;
    /**
     * Decide the data sourece's filters when source type is unique or multiple.
     * Default value is `InRuntimeView`.
     */
    queryScope?: QueryScope;
    /**
     * Decide the data sourece's filters when source type is unique or multiple.
     * Valid when queryScope is `InRuntimeView`.
     * It's used to exclude filter of current widget.
     */
    widgetId: string;
    /**
     * selected data source.
     * Feature layers, feature layers used in web maps, and feature service URLs are supported.
     */
    dataSource: DataSource;
    onChange: (sqlExprObj: IMSqlExpression) => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * @ignore
 */
interface IntlProps {
    intl: IntlShape;
}
/**
 * A component for end users to execute filters at runtime.
 * It supports filter functionality in widgets to display and customize the ask-for-value filters configured by SQL expression builder in the setting.
 */
export declare const SqlExpressionRuntime: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<SqlExpressionRuntimeProps & IntlProps>>>;
export default SqlExpressionRuntime;
