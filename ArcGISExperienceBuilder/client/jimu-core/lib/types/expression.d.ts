import { ImmutableObject } from 'seamless-immutable';
/**
 * Single expression.
 */
export interface Expression {
    name: string;
    parts: ExpressionPart[];
}
/**
 * Single immutable expression.
 */
export declare type IMExpression = ImmutableObject<Expression>;
/**
 * Multiple expressions.
 */
export interface ExpressionMap {
    [expressionId: string]: Expression;
}
/**
 * Multiple immutable expressions.
 */
export declare type IMExpressionMap = ImmutableObject<ExpressionMap>;
/**
 * @ignore
 */
export declare type ExpressionPartGoup = ExpressionPart & {
    parts?: ExpressionPartGoup[];
};
/**
 * A part of one single expression.
 */
export interface ExpressionPart {
    type: ExpressionPartType;
    exp: string;
    dataSourceId?: string;
    jimuFieldName?: string;
    /**
     * We can get a feature set from one data source, even with only one feature in the set.
     * When a single feature is needed, we will use the first line of the feature set as default.
     * However, if `isFromRepeatedDataSourceContext` is `true`, we will use the feature provided by the repeated data source context.
     */
    isFromRepeatedDataSourceContext?: boolean;
}
/**
 * Types of the expression part.
 */
export declare enum ExpressionPartType {
    /**
     * The part is a string.
     */
    String = "STRING",
    /**
     * The part is a number.
     */
    Number = "NUMBER",
    /**
     * The part is a layer's field and it can be resolved to the field's value when associated with a specific record (e.g. selected record).
     */
    Field = "FIELD",
    /**
     * The part is a statistical function, e.g. average, sum.
     */
    Function = "FUNCTION",
    /**
     * The part is an operator, e.g. +, -.
     */
    Operator = "OPERATOR",
    /**
     * @ignore
     */
    Unknown = "UNKNOWN"
}
/**
 * Function types.
 */
export declare enum ExpressionFunctions {
    Average = "AVERAGE",
    Count = "COUNT",
    Sum = "SUM",
    Max = "MAX",
    Min = "MIN"
}
