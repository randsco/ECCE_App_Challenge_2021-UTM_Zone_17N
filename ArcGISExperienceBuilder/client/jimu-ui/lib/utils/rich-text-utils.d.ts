/// <reference types="seamless-immutable" />
import { IMExpressionMap, Immutable, Expression, RepeatedDataSource, MultipleExpressionResolveResults, ImmutableObject, ExpressionPart } from 'jimu-core';
import { LinkParam } from 'jimu-ui/advanced/setting-components';
export declare type IMLinkParamMap = ImmutableObject<{
    [id: string]: LinkParam;
}>;
export declare const EXP_TAG_REGEXP: RegExp;
export declare const LINK_TAG_REGEP: RegExp;
export declare const DATA_EXPRESSION_REGEXP: RegExp;
export declare const DATA_LINK_REGEXP: RegExp;
export declare const DATA_UNIQUE_ID_REGEXP: RegExp;
export declare const HREF_REGEXP: RegExp;
/**
 * Capture all regular expression matching results
 *
 * @param string
 * @param regexp Must have a global label
 */
export declare const matchAll: (string: string, regexp: RegExp) => string[];
/**
 * Decode and parse the encoded object string as an object
 *
 * @param encodeString %7B%22foo%22%3A1%2C%22bar%22%3A2%7D
 * @returns {foo: 1, bar: 2}
 */
export declare const convertEncodeObject: (encodeString: string) => Expression | LinkParam;
/**
 * Get expression information from exp tag string
 *
 * Note: If there are multiple data-expressions, only return the first
 * @param html e.g: <exp data-expression="%7B%22name%22%3A%22value%22%7D">{Rank}</exp>
 */
export declare const getExpressionInfo: (html: string) => Expression;
/**
 * Get link information from the attribute data-link of a tag string
 *
 * Note: If there are multiple data-link, only return the first
 * @param html e.g: <a data-link="%7B%22name%22%3A%22value%22%7D">{Rank}</a>
 */
export declare const getLinkInfo: (html: string) => LinkParam;
/**
 * Get uniqueid from html string
 *
 * Note: If there are multiple data-uniqueid, only return the first
 * @param html e.g: <exp/a data-uniqueid="foo">{Rank}</exp/a>
 */
export declare const getUniqueId: (html: string) => string;
/**
 * Get all data-expression from html, associate it with a uniqueid and return it as an object
 *
 * @param html <p>ddd<exp data-uniqueid="e3c" data-expression="%7B%22name%22%3A%22value%22%7D">{Rank}</exp>abc</p>
 * @returns {e3c: {name: value}}
 */
export declare const getExpressions: (html: string) => IMExpressionMap;
/**
 * Get all data-link from html, associate it with a uniqueid and return it as an object
 *
 * @param html <a href="#" target="_blank" data-uniqueid="9721" data-link="%7B%22name%22%3A%22value%22%7D">link</a>abc</p>
 * @returns {9721: {name: value}}
 */
export declare const getLinks: (html: string) => IMLinkParamMap;
/**
 * Get all data-expression attribute values and data-link.expression values from HTML strings
 *
 * @param html
 * <p>ddd<exp data-uniqueid="e3c" data-expression="%7B%22name%22%3A%22value%22%7D">{Rank}</exp>
 * <a href="#" target="_blank" data-uniqueid="9721" data-link="{%7B%22name%22%3A%22value%22%7D">link</a></p>
 * @returns  {e3c: {name: value}, 9721: {name: value}}
 */
export declare const getAllExpressions: (html: string) => IMExpressionMap;
export declare const getRecords: (repeatedDataSource: RepeatedDataSource) => {
    [x: string]: import("jimu-core").DataRecord;
};
/**
 * Whether it is a valid expression value
 * @param value
 */
export declare const isValidExpressionValue: (value: string) => boolean;
/**
 * Replace <exp data-uniqueid="id_1"></exp> in HTML strings with corresponding values based on uniqueID
 *
 * @param html <p> ddd <exp data-uniqueid="e3c" data-dsid="ds_1" data-expression="{name: value}">{Rank}</exp></p>
 * @param values {e3c: 'foo'}
 * @returns <p> ddd foo</p>
 */
export declare const replaceHtmlExpression: (html: string, values: Immutable.ImmutableObject<{
    [id: string]: string;
}>) => string;
/**
 *  Calculate the specific value of href in html and replace it
 *
 * @param html <p> ddd <a href="#" target="_blank" data-uniqueid="9721" data-dsid="ds_2" data-link="{name:value}">link</a></p>
 * @param values {9721: 'foo'}
 * @returns <p> ddd  <a href="foo" target="_blank" data-uniqueid="9721" data-dsid="ds_2" data-link="{name:value}">link</a></p>
 */
export declare const replaceHtmlLinkHref: (html: string, values: Immutable.ImmutableObject<{
    [id: string]: string;
}>) => string;
export declare const getExpressionValues: (results: MultipleExpressionResolveResults) => Immutable.ImmutableObject<{
    [id: string]: string;
}>;
/**
 * Find the node of the specified nodeName from the inside out recursion, and encounter the specified container stop
 * @param node
 * @param targetNodeName
 * @param container
 */
export declare const findNode: (node: HTMLElement, targetNodeName: string, container: HTMLElement) => any;
export declare const shouldJumpLinkwithBrowserHistory: (evt: React.MouseEvent<HTMLLinkElement>, node?: HTMLLinkElement) => boolean;
export declare const isBlankRichText: (text: string) => boolean;
/**
 * Edit parts of all expressions, including <exp> and <a>.
 */
export declare const editExpressionPart: (html: string, editor: (partIndex: number, expression: Expression) => ExpressionPart) => string;
