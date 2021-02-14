/// <reference types="react" />
import { Modifiers } from './core';
import { Modifier, VirtualElement } from '@popperjs/core';
export declare type TargetType = string | HTMLElement | VirtualElement | React.RefObject<any> | (() => any);
export declare const canUseDOM: () => boolean;
export declare const isVirtalReference: (target: any) => boolean;
export declare const isReactRefObj: (target: any) => boolean;
export declare const findDOMElements: (target: any) => any;
export declare const isArrayOrNodeList: (els: any) => boolean;
export declare const getTarget: (target: TargetType) => HTMLElement;
export declare const flipPlacementForRTL: (placement: any, isRTL?: boolean) => any;
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
export declare const isOutBoundary: (node1: Element, node2: Element) => boolean;
/**
 * Check whether the node exceeds the boundary of CSS selector node
 * @param selector A sss selector
 */
export declare const outSelectorNodeBoundary: (selector: string, node: HTMLElement) => boolean;
export declare const isBody: (container: TargetType) => boolean;
export declare const getLastModifier: (modifiers: Modifiers, name: string) => Partial<Modifier<any, any>>;
export declare const isModifierEnabled: (modifiers: Modifiers, name: string) => boolean;
export declare const filterModifierEnabled: (modifiers: Modifiers, name: string) => Modifiers;
export declare const openOverlay: (uniqueId: any) => void;
export declare const activeOverlay: (uniqueId: any) => void;
export declare const closeOverlay: (uniqueId: any) => void;
