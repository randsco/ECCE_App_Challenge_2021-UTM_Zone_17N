import { Expression } from 'jimu-core';
import { ExpSelection, EditResult } from '../components/expression-editor/types';
export declare function addToEndOfOneEditablePart(expression: Expression, newChars: string, currentPartIndex: number): {
    editResult: EditResult;
    selection: ExpSelection;
};
export declare function addToStartOfOneEditablePart(expression: Expression, newChars: string, currentPartIndex: number): {
    editResult: EditResult;
    selection: ExpSelection;
};
export declare function addToMiddleOfOneEditablePart(expression: Expression, newChars: string, currentPartIndex: number, startOffset: number): {
    editResult: EditResult;
    selection: ExpSelection;
};
export declare function addToEndOfOneUneditablePart(expression: Expression, newChars: string, partIndexSelectionBefore: number): {
    editResult: EditResult;
    selection: ExpSelection;
};
export declare function removeCharactersFromEditablePart(expression: Expression, currentPartIndex: number, startIndex: number, endIndex: number): {
    editResult: EditResult;
    selection: ExpSelection;
};
export declare function removePartsFromUneditableParts(expression: Expression, startIndex: number, endIndex: number): {
    editResult: EditResult;
    selection: ExpSelection;
};
export declare function getSelectionStartOffsetWithoutMerge(expression: Expression, partIndex: number): number;
