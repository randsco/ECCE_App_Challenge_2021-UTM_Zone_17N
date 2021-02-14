import { isEqual as isDeepEqual, get as getValue } from 'lodash-es';
import { Size, BrowserSizeMode } from '../types/common';
import { IMAppConfig, IMFieldSchema } from '../types/app-config';
import { ImmutableArray } from 'seamless-immutable';
import { IntlShape } from 'react-intl';
export { getValue, isDeepEqual };
declare type WidgetPanelCallBack = 'onOpen' | 'onClose' | 'onActive' | 'onDeActive';
export declare function getWidgetCallbackNamesFromWidgetState(widgetState: any, prevWidgetState: any): WidgetPanelCallBack[] | WidgetPanelCallBack;
export declare function getPanelCallbackNamesFromPanelState(panelState: any, prevPanelState: any): WidgetPanelCallBack[] | WidgetPanelCallBack;
export declare function isTouchDevice(): boolean;
export declare function getBrowserSizeMode(size: Size): BrowserSizeMode;
export declare function findViewportSize(appConfig: IMAppConfig, browserSizeMode: BrowserSizeMode): Size;
export declare function getSizeModeWidth(sizeMode: BrowserSizeMode): number;
export declare function loadstyle(url: string, beforeId?: string): Promise<unknown>;
export declare function applyMixins(derivedCtor: any, baseCtors: any[]): void;
/**
 * check whether the two array contain the same items, don't consider the order
 * @param arr1
 * @param arr2
 */
export declare function isArrayContainSameItems(arr1: string[], arr2: string[]): boolean;
export declare function isArrayContainSameItems(arr1: number[], arr2: number[]): boolean;
/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 */
export declare function hyphenateStyleName(name: any): any;
export declare function styleObjectToString(styles: any): string;
export declare function tryGet<T>(getFn: () => T, waitTime?: number, tryInterval?: number): Promise<T>;
/**
 * Please use this as the first part of the local storage key if you need to save something in local storage.
 */
export declare function getLocalStorageAppKey(): string;
export declare const getUID: () => string;
export declare const getUUID: () => string;
export declare const calculateDigits: (n: number) => number;
export declare const getOverlayUniqueId: (type: 'popper' | 'modal', overlays?: ImmutableArray<string>) => string;
/**
 * the i18n string use this format: ${key}
 * @param obj
 * @param intl
 * @param defaultMessages
 */
export declare function replaceI18nPlaceholdersInObject(obj: any, intl: IntlShape, defaultMessages: any): any;
export declare function checkUpdate(): Promise<boolean>;
/** Hide loading and show app */
export declare function showApp(): void;
/**
 * Get intl options from field schema
 * @param fieldSchema
 */
export declare const getIntlOption: (fieldSchema: IMFieldSchema) => Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
declare type MemorizeFunc = (Object: any) => any;
export declare function memoize(func: MemorizeFunc): MemorizeFunc;
