import { ExpressionPart, ExpressionPartType, ImmutableArray, UseDataSource, BrowserSizeMode } from 'jimu-core';
import { EditResult, PopoverItem } from '../types';
export declare function getExps(expressionString: string): string[];
/**
 * return an array which members are string exps and other exps not split
 *
 * e.g. ['"abc"+123+{f1}+AVG({f2})'] -> ['"abc"', '+123+{f1}+AVG({f2})']
 *
 */
export declare function handleStringExps(e: string): string[];
/**
 * return an array which is split by curly brackets
 *
 * e.g. ['"abc"', '+123+{f1}+AVG({f2})'] -> ['"abc"', '+123+', '{f1}', '+AVG(', '{f2}', ')']
 */
export declare function handleFieldExps(e: string[]): string[];
/**
 * return an array which is split by operators and front curly bracket: + - * / , ( ) { space
 *
 * e.g. ['"abc"', '+123+', '{f1}', '+AVG(', '{f2}', ')'] -> ['"abc"', '+', '123', '+', '{f1}', '+', 'AVG', '(', '{f2}', ')']
 *
 */
export declare function handleOperatoExps(e: string[]): string[];
/**
 *
 * @param externalId expression editor node id
 * @param parts expression parts
 * @param newCharacters input characters
 * @param isInEditablePart whether is in an editable part
 * @param dsIds data source id
 * @param range
 * @param nextNodeOfSelection next node of selection
 */
export declare function addCharactersToParts(externalId: string, parts: ExpressionPart[], newCharacters: string, isInEditablePart: boolean, dsIds: string[], range: Range, nextNodeOfSelection: HTMLElement): EditResult;
export declare function applyEditResultToParts(editResult: EditResult, parts?: ExpressionPart[]): ExpressionPart[];
export declare function getWhetherPartNeedPopover(type: ExpressionPartType): boolean;
export declare function getExpressionPart(exp: string, dataSourceId?: string, isFromRepeatedDataSourceContext?: boolean, jimuFieldName?: string): ExpressionPart;
/**
 *
 * @param externalId expression editor node id
 * @param parts expression parts
 * @param startIndex start part index
 * @param endIndex end part index
 */
export declare function removeParts(externalId: string, parts: ExpressionPart[], startIndex: number, endIndex: number): EditResult;
/**
 *
 * @param externalId expression editor node id
 * @param parts expression parts
 * @param partId part id which is editing
 * @param startIndex start character index
 * @param endIndex end character index
 */
export declare function removeCharactersFromOnePart(externalId: string, parts: ExpressionPart[], partId: string, startIndex: number, endIndex: number): EditResult;
export declare function getPopoverItems(externalId: string, partId: string, parts: ExpressionPart[], useDataSources: ImmutableArray<UseDataSource>, widgetId: string, browserSizeMode: BrowserSizeMode): PopoverItem[];
export declare function getPopoverTarget(externalId: string, isInEditablePart: boolean, parts: ExpressionPart[]): string;
