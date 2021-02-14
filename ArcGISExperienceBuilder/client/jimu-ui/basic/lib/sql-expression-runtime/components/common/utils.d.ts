import { ImmutableArray, SqlClause, SqlClauseSet, DataSource, IMFieldSchema, IMSqlExpression, SqlExpression } from 'jimu-core';
/**
 * @ignore
 */
export declare function getClauseArrayByChange(partArray: ImmutableArray<SqlClause | SqlClauseSet>, clause: SqlClause | SqlClauseSet, id: string): ImmutableArray<SqlClause | SqlClauseSet>;
/**
 * @ignore
 */
export declare function getCamelCase(name: string): string;
/**
 * @ignore
 * Get ArcGIS SQL for current clause if it's configured as askForValue = true.
 * Only use for CascadeSupportedList
 */
export declare function getCascadeSQL(sqlExprObj: IMSqlExpression, clause: SqlClause, clauseId: string, dataSource: DataSource): string;
/**
 * Get all jimu field names from a SQL Expression.
 * The jimu field names should be binded to the data source for widget.
 */
export declare function getJimuFieldNamesBySqlExpression(sqlExprObj: IMSqlExpression): string[];
/**
 * It's used to check whether a sql expression object is valid or not.
 */
export declare function isSqlExpressionValid(sqlExprObj: IMSqlExpression): boolean;
/**
 * @ignore
 * Get clause label by i18n or custom label.
 */
export declare function getClauseLabel(clause: any, fieldObj: IMFieldSchema, operator: any): string;
/**
 * @ignore
 */
export declare function getClauseDefaultLabel(clause: any, fieldObj: IMFieldSchema, operator: any): string;
/**
 * @ignore
 */
export declare function updateSQLExpressionByVersion(sqlExpression: IMSqlExpression, version: string, dataSource: DataSource): SqlExpression;
