import { ExpressionPart, ImmutableArray, UseDataSource, IMUseDataSource, BrowserSizeMode } from 'jimu-core';
import { EditResult } from '../types';
export declare function getNodeByPartId(partId: string, container: HTMLElement): HTMLElement;
export declare function getWhetherNodeIsParentOfParts(id: string): boolean;
export declare function getPartIdByChildNode(externalId: string, node: HTMLElement): string;
export declare function getSortedKeys(obj: Record<string, unknown>): string[];
export declare function getPartIdByIndex(externalId: string, index: number): string;
export declare function getIndexByPartId(exteranlId: string, partId: string): number;
export declare function getInernalId(externalId: string, id: string): string;
export declare function getWhetherIsPartId(externalId: string, id: string): boolean;
/**
 * unmergeable part: string, field and operator
 *
 * mergeable part means that if a character added to the start or the end of the part, the character can be merged to the part,
 * e.g., 123 -> 123A (one number part -> one unkown part)
 * unmergeable part means that if a character added to the start or the end of the part, the character can not be merged to the part,
 * e.g., "123" -> "123"A (one string part -> one string part and one unknown part)
 *
 * unmergeable part should have a specail character or stable pattern, to mark the start of the part and the end of the part,
 * e.g., string part is using " and field part is using {}
 */
export declare function isPartUnmergeable(part: ExpressionPart): boolean;
/**
 * unmergeable character: operator, ", {
 *
 * mergeable character means that if the character added to the start or the end of one part, the character can be merged to the part,
 * e.g., 123 -> 123A (one number part -> one unkown part)
 * unmergeable character means that if the character added to the start or the end of one part, the character can not be merged to the part,
 * e.g., 123 -> 123+ (one number part -> one number part and one operator part)
 * e.g., 123 -> "123 (editor will automatically complete the quotation marks) -> ""123 (one number part -> one string part and one number part)
 * e.g., 123 -> 123{} (editor will automatically complete the  curly braces) -> 123{} (one number part -> one number part and one field part)
 */
export declare function isCharacterUnmergeable(char: string): boolean;
export declare function isNumberVariable(n: any): boolean;
export declare function getNewCharacterFromExpressionString(previousExpressionString: string, expressionString: string): string;
export declare function triggerInputEvent(element: HTMLElement): void;
export declare function isCharDoubleQuotationMarker(char: string): boolean;
export declare function isCharFrontCurlyBracket(char: string): boolean;
export declare function isCharPostCurlyBracket(char: string): boolean;
export declare function isField(exp: string): boolean;
export declare function isFunction(exp: string): boolean;
export declare function isString(exp: string): boolean;
export declare function isNumber(exp: string): boolean;
export declare function isOperator(exp: string): boolean;
export declare function isNeedDataSourceFunction(functionName: string): boolean;
export declare function getJimuFieldNameFromAlias(dataSourceId: string, alias: string): string;
export declare function areFunctionParts(parts: ExpressionPart[]): boolean;
export declare function getAddedPartIndexes(editResult: EditResult): number[];
export declare function getRemovedPartIndexes(editResult: EditResult): number[];
export declare function addAutoAddedDataViews(widgetId: string, allUseDataSources: ImmutableArray<UseDataSource>, browserSizeMode: BrowserSizeMode, usePopulatedDataView: boolean): ImmutableArray<UseDataSource>;
export declare function getRealUseDataSources(tempSelectUseDs: IMUseDataSource, allUseDataSources: ImmutableArray<UseDataSource>): IMUseDataSource;
