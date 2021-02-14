declare const Embed: any;
import { Expression as ExpressionValue } from 'jimu-core';
export interface ExpressionFormatValue {
    uniqueid: string;
    dsid: string;
    name: string;
    expression?: ExpressionValue;
}
export declare const EXPRESSION_ATTRIBUTES: string[];
export declare class RichExpression extends Embed {
    static blotName: string;
    static tagName: string;
    domNode: any;
    declareClass: 'Expression';
    static create(value?: ExpressionFormatValue): any;
    static formats(domNode: any): {};
    static value(domNode: any): any;
    format(name: any, value: any): void;
}
export {};
