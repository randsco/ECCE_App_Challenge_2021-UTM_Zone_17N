import { ThemeVariables, IconResult, IMState } from 'jimu-core';
import { ColorResult, RGBColor } from 'jimu-ui/basic/color-picker';
import { LinearUnit } from '../types';
import { LinkTarget } from '../components/link';
export declare const COLOR_VARIABLE_REGEX: RegExp;
export declare const isTransparentColor: (color: string) => boolean;
export declare const toColorString: (color: ColorResult) => string;
export declare const toRgba: (color: RGBColor) => string;
export declare const isValidColor: (color: string) => boolean | RegExpMatchArray;
export declare const setRef: (ref: any, value: any) => void;
export declare const isColorVariable: (color: string) => boolean;
export declare const getColorValue: (color: string, theme?: ThemeVariables) => any;
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
export declare const createChainedFunction: (...funcs: any[]) => any;
export declare function toLinearUnit(cssValue: string | number): LinearUnit;
export declare function stringOfLinearUnit(cssValue: string | number | LinearUnit): string;
export declare const toIconResult: (icon: any, filename: string, size?: number) => IconResult;
export declare const isOutOrTopTargetLink: (href: string, target?: LinkTarget) => boolean;
export declare const capitalizeFirstLetter: (string: string) => string;
/**
 * Check if the specified widget is selected
 * @param widgetId
 */
export declare const isWidgetSelected: (widgetId: string, state?: IMState) => boolean;
