import { ExpressionPart, ExpressionFunctions, ExpressionPartGoup } from '../types/expression';
import { DataSourceTypes } from '../data-sources/data-source-interface';
import { UseDataSource } from '../types/app-config';
import { RepeatedDataSource } from '../repeat-data-source-context';
import { ImmutableArray } from 'seamless-immutable';
import { IntlShape } from 'react-intl';
export declare const localDataSourceTypes: DataSourceTypes[];
export declare const EXPRESSION_LOAD_PREFIX = "EXPRESSION_RESOLVER";
export declare enum errorCode {
    ParamType = "INVALID_PARAM_TYPE",
    ParamNumber = "INVALID_NUMBER_OF_PARAMS",
    FuncType = "INVALID_FUNCTION_TYPE",
    NeedRecord = "NEED_RECORD",
    NeedDataSource = "NEED_DATA_SOURCE"
}
export declare function getFunctionResult(parts: ExpressionPartGoup[], func: ExpressionFunctions, repeatedDataSource: RepeatedDataSource | RepeatedDataSource[]): Promise<number>;
export declare function getLocalDsFunctionResult(part: ExpressionPartGoup, func: ExpressionFunctions): Promise<number>;
export declare function groupPartsByFunction(parts: ExpressionPart[] | ImmutableArray<ExpressionPart>): ExpressionPartGoup[];
export declare function getWhetherExpUseRecord(partsGroupByFunction: ExpressionPartGoup[]): boolean;
export declare function resolveFieldAndFunctionParts(partsGroupByFunction: ExpressionPartGoup[], useDataSources: ImmutableArray<UseDataSource>, repeatedDataSource: RepeatedDataSource | RepeatedDataSource[], whetherFormatData: boolean, intl?: IntlShape): Promise<ExpressionPart>[];
export declare function resolveFunctions(p: ExpressionPartGoup, useDataSources: ImmutableArray<UseDataSource>, repeatedDataSource: RepeatedDataSource | RepeatedDataSource[]): Promise<number | string>;
export declare function resolveOneFunction(p: ExpressionPartGoup, repeatedDataSource: RepeatedDataSource | RepeatedDataSource[]): Promise<number | string>;
export declare function calculatePostfixExpression(parts: ExpressionPart[], whetherFormatData: boolean): string | number;
export declare function calculate(n1: string | number, n2: string | number, operator: string | number): number | string;
export declare function getPostfixParts(parts: ExpressionPart[]): ExpressionPart[];
