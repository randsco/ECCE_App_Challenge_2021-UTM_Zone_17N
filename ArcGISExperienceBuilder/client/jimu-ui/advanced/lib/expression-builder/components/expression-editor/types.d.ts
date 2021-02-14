import { ExpressionPart } from 'jimu-core';
export interface ExpSelection {
    partId: string;
    type: ExpSelectionType;
    toStart?: boolean;
    startOffset?: number;
}
export interface InnerExpSelection {
    partId: string;
    startOffset: number;
    endOffset: number;
    contentLength: number;
}
export interface EditItem {
    part: ExpressionPart;
    isReplacing: boolean;
    startOffset: number;
}
export interface EditResult {
    [index: string]: EditItem;
}
export interface PopoverItem {
    id: string;
    content: string;
    type: PopoverType;
}
export declare const EXP_PART_PREFIX = "part";
export declare const EXP_CONTAINER_PREFIX = "expression";
export declare enum ExpSelectionType {
    Part = "PART",
    Char = "CHAR"
}
export declare enum PopoverType {
    Field = "FIELD",
    DataSource = "DATASOURCE",
    Function = "FUNCTION"
}
