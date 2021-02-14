import { ImmutableArray, ImmutableObject } from 'seamless-immutable';
/**
 * SQL expression mode for `SqlExpressionBuilder`.
 */
export declare enum SqlExpressionMode {
    /**
     * All functions.
     */
    All = "ALL",
    /**
     * Ask for value panel is hidden. User  can only use default input style for specific source type.
     */
    Simple = "SIMPLE"
}
/**
 * Clause logic connector, includes AND and OR.
 */
export declare enum ClauseLogic {
    And = "AND",
    Or = "OR"
}
/**
 * Clause cascade type.
 * None: display all unique values of this field.
 * Previous: display values filtered by previous expressions (clauses).
 * All: display values filtered by all other expressions (clauses).
 */
export declare enum ClauseCascade {
    None = "NONE",
    Previous = "PREVIOUS",
    All = "ALL"
}
/**
 * Clause operator for all types of field, includes numeric, string and date.
 */
export declare enum ClauseOperator {
    StringOperatorIs = "STRING_OPERATOR_IS",
    StringOperatorIsNot = "STRING_OPERATOR_IS_NOT",
    StringOperatorContains = "STRING_OPERATOR_CONTAINS",
    StringOperatorDoesNotContain = "STRING_OPERATOR_DOES_NOT_CONTAIN",
    StringOperatorStartsWith = "STRING_OPERATOR_STARTS_WITH",
    StringOperatorDoesNotStartWith = "STRING_OPERATOR_DOES_NOT_START_WITH",
    StringOperatorEndsWith = "STRING_OPERATOR_ENDS_WITH",
    StringOperatorDoesNotEndWith = "STRING_OPERATOR_DOES_NOT_END_WITH",
    StringOperatorIsAnyOf = "STRING_OPERATOR_IS_ANY_OF",
    StringOperatorIsNoneOf = "STRING_OPERATOR_IS_NONE_OF",
    StringOperatorIsBlank = "STRING_OPERATOR_IS_BLANK",
    StringOperatorIsNotBlank = "STRING_OPERATOR_IS_NOT_BLANK",
    NumberOperatorIs = "NUMBER_OPERATOR_IS",
    NumberOperatorIsNot = "NUMBER_OPERATOR_IS_NOT",
    NumberOperatorIsAtLeast = "NUMBER_OPERATOR_IS_AT_LEAST",
    NumberOperatorIsAtMost = "NUMBER_OPERATOR_IS_AT_MOST",
    NumberOperatorIsLessThan = "NUMBER_OPERATOR_IS_LESS_THAN",
    NumberOperatorIsGreaterThan = "NUMBER_OPERATOR_IS_GREATER_THAN",
    NumberOperatorIsBetween = "NUMBER_OPERATOR_IS_BETWEEN",
    NumberOperatorIsNotBetween = "NUMBER_OPERATOR_IS_NOT_BETWEEN",
    NumberOperatorIsAnyOf = "NUMBER_OPERATOR_IS_ANY_OF",
    NumberOperatorIsNoneOf = "NUMBER_OPERATOR_IS_NONE_OF",
    NumberOperatorIsBlank = "NUMBER_OPERATOR_IS_BLANK",
    NumberOperatorIsNotBlank = "NUMBER_OPERATOR_IS_NOT_BLANK",
    DateOperatorIsOn = "DATE_OPERATOR_IS_ON",
    DateOperatorIsNotOn = "DATE_OPERATOR_IS_NOT_ON",
    DateOperatorIsIn = "DATE_OPERATOR_IS_IN",
    DateOperatorIsNotIn = "DATE_OPERATOR_IS_NOT_IN",
    DateOperatorIsBefore = "DATE_OPERATOR_IS_BEFORE",
    DateOperatorIsAfter = "DATE_OPERATOR_IS_AFTER",
    DateOperatorIsOnOrBefore = "DATE_OPERATOR_IS_ON_OR_BEFORE",
    DateOperatorIsOnOrAfter = "DATE_OPERATOR_IS_ON_OR_AFTER",
    DateOperatorIsInTheLast = "DATE_OPERATOR_IS_IN_THE_LAST",
    DateOperatorIsNotInTheLast = "DATE_OPERATOR_IS_NOT_IN_THE_LAST",
    DateOperatorIsBetween = "DATE_OPERATOR_IS_BETWEEN",
    DateOperatorIsNotBetween = "DATE_OPERATOR_IS_NOT_BETWEEN",
    DateOperatorIsBlank = "DATE_OPERATOR_IS_BLANK",
    DateOperatorIsNotBlank = "DATE_OPERATOR_IS_NOT_BLANK"
}
/**
 * Clause source type.
 * It depends on the field type and specific operator.
 */
export declare enum ClauseSourceType {
    UserInput = "USER_INPUT",
    Field = "FIELD",
    SingleSelectFromUnique = "UNIQUE",
    MultipleSelectFromUnique = "MULTIPLE",
    SingleSelectFromPredefined = "UNIQUE_PREDEFINED",
    MultipleSelectFromPredefined = "MULTIPLE_PREDEFINED"
}
/**
 * Value label pair for clause.
 */
export interface ClauseValuePair {
    value: number | string;
    label: string;
    alias?: string;
    selected?: boolean;
}
export declare const EMPTY_OPTION_VALUE = "-empty-";
/**
 * Clause type.
 */
export declare enum ClauseType {
    /**
     * Single clause.
     */
    Single = "SINGLE",
    /**
     * Clause set.
     */
    Set = "SET"
}
/**
 * Value options for clause.
 */
export interface ClauseValueOptions {
    /**
     * Source type: input, field, unique, multiple, etc.
     */
    sourceType: ClauseSourceType;
    /**
     * Decide which input style to apply to the UI for specific source type.
     */
    inputEditor: string;
    /**
     * Value for clause, it could have multiple `ClauseValuePair` in array.
     */
    value: ClauseValuePair[];
    /**
     * Only for clause verification logic check, not necessary for configuration.
     */
    isValid?: boolean;
}
export declare type IMClauseValueOptions = ImmutableObject<ClauseValueOptions>;
/**
 * Arrangement for label and clause input.
 */
export declare enum ClauseLabelDisplay {
    Inline = "INLINE",
    Block = "BLOCK"
}
/**
 * Details of ask for value options.
 */
export interface ClauseAskForValueOptions {
    /**
     * Label has three values:
     *  null:   use i18n to display the label.
     *  ``:     do not display label.
     *  string: display custom label configured.
     */
    label: string;
    hint: string;
    cascade?: ClauseCascade;
    display?: ClauseLabelDisplay;
}
export declare type IMClauseAskForValueOptions = ImmutableObject<ClauseAskForValueOptions>;
export declare enum ClauseDisplayType {
    /**
     * Not display clause at runtime.
     */
    'None' = "NONE",
    /**
     * Display clause as askforvalue options set.
     */
    'UseAskForValue' = "USE_ASK_FOR_VALUE",
    /**
     * Only display clause's display label at runtime which does not allow user input.
     */
    'UseLabel' = "USE_LABEL"
}
/**
 * SQL clause.
 */
export interface SqlClause {
    type: ClauseType;
    jimuFieldName: string;
    operator: ClauseOperator;
    valueOptions: ClauseValueOptions;
    /**
     * For unHosted service & string field.
     */
    caseSensitive?: boolean;
    /**
     * displayType is used for endUser.
     */
    displayType: ClauseDisplayType;
    /**
     * Whether endUser can see and edit the input editor for clause.
     */
    askForValueOptions?: ClauseAskForValueOptions;
    /**
     * Only show label to endUser for current clause.
     * null: use i18n to display the label.
     * string: display custom label configured.
     */
    displayLabel?: string;
}
export declare type IMSqlClause = ImmutableObject<SqlClause>;
/**
 * SQL Clause Set.
 * It includes one or more SQL clauses.
 */
export interface SqlClauseSet {
    type: ClauseType;
    /**
     * Logic operator for every clauses inside a clause set.
     */
    logicalOperator: ClauseLogic;
    /**
     * It only supports multiple clauses for previous version.
     */
    parts: ImmutableArray<SqlClause | SqlClauseSet>;
}
export declare type IMSqlClauseSet = ImmutableObject<SqlClauseSet>;
/**
 * SQL Expression.
 */
export interface SqlExpression {
    sql: string;
    displaySQL?: string;
    logicalOperator: ClauseLogic;
    parts: (SqlClause | SqlClauseSet)[];
}
export declare type IMSqlExpression = ImmutableObject<SqlExpression>;
/**
 * SQL result.
 * SQL is used to query on a service.
 * displaySQL is used for UI.
 */
export interface SqlResult {
    sql: string;
    displaySQL: string;
}
/**
 * @ignore
 */
export declare enum OrderRule {
    Asc = "ASC",
    Desc = "DESC"
}
/**
 * @ignore
 */
export interface OrderByOption {
    jimuFieldName: string;
    order: OrderRule;
}
