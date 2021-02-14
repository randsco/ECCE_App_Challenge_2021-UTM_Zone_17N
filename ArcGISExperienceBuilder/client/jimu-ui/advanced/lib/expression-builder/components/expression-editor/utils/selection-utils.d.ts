import { ExpressionPart } from 'jimu-core';
import { InnerExpSelection, ExpSelection, EditResult } from '../types';
export declare function getWhetherNodeAfterRange(range: Range, node: HTMLElement): boolean;
export declare function getWhetherNodeBeforeRange(range: Range, node: HTMLElement): boolean;
export declare function moveSelectionByPart(partId: string, toStart: boolean, container: HTMLElement): void;
export declare function moveSelectionByCharacter(partId: string, startOffset: number, container: HTMLElement): void;
export declare function createRange(node: Node, chars: {
    count: number;
}, range?: Range): Range;
export declare function getSelectionRange(): Range;
export declare function getSelectionPosInnerPart(externalId: string, container: HTMLElement): InnerExpSelection;
export declare function getPartIdOfSelection(externalId: string): string;
export declare function getPreviousNodeOfSelection(externalId: string): HTMLElement;
export declare function getNextNodeOfSelection(externalId: string): HTMLElement;
export declare function getSiblingOfExpSelection(externalId: string, partId: string, useNextSibling: boolean, isRemoving: boolean, parts: ExpressionPart[]): ExpSelection;
export declare function getStartPartIndexOfRangeSelection(externalId: string): number;
export declare function getEndPartIndexOfRangeSelection(externalId: string, parts?: ExpressionPart[]): number;
/**
 *
 * @param exteranlId expression editor node id
 * @param isInEditablePart whether is in an editable part
 * @param editResult add or remove result
 * @param parts new parts after add or remove
 * @param innerSelection selection position inner one part
 * @param moveCharacterNumber removed character number after remmove
 */
export declare function getExpSelectionAndEitablePart(exteranlId: string, isInEditablePart: boolean, editResult: EditResult, parts: ExpressionPart[], innerSelection: InnerExpSelection, moveCharacterNumber?: number): ExpSelection;
