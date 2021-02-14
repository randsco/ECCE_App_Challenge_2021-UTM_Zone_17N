import { DataSourceJson } from '../../types/app-config';
import { DataSourceInfo } from '../../types/state';
import { Expression } from '../../types/expression';
export declare const dataSources: {
    [dsId: string]: DataSourceJson;
};
export declare const dataSourcesInfo: {
    [dsId: string]: DataSourceInfo;
};
export declare const oneOperatorPart: Expression;
export declare const oneFunctionWithoutChildExp: Expression;
export declare const oneFunctionWithChildExp: Expression;
export declare const twoFunctions: Expression;
export declare const functionWithChildFunction: Expression;
export declare const functionsWithChildFunctionAndParentheses: Expression;
export declare const oneUnknowPart: Expression;
export declare const twoNumberPartsAndOneOpertorPart: Expression;
export declare const oneFunctionPart: Expression;
export declare const oneWrongNameFunctionPart: Expression;
export declare const oneFunctionPartWithOneNumberChildPart: Expression;
export declare const numberPartsWithoutParentheses: Expression;
export declare const numberPartsWithOneParentheses: Expression;
export declare const numberPartsWithMoreParentheses: Expression;
export declare const numberPartsWithMoreParenthesesAndOneString: Expression;
export declare const avgFunctionWithNumberParts: Expression;
export declare const avgMaxMinFunctionWithNumberParts: Expression;
export declare const minFunctionWithSelectedFieldPart: Expression;
