/// <reference types="seamless-immutable" />
import { Immutable, IMLayoutJson, IMBoundingBox, IMState, IMAppConfig, IMThemeVariables, IMLayoutItemJson, BrowserSizeMode, PagePart, LayoutItemConstructorProps, BoundingBox } from 'jimu-core';
import { WidgetProps, LayoutProps, LayoutItemProps, StateToLayoutProps, StateToLayoutItemProps, LayoutItemSizeModes } from './types';
export declare const emptyFunc: () => void;
export declare function autoBindHandlers(el: Record<string, any>, fns: Array<string>): void;
/**
 * Get the maximum id of the layout item which can be converted to a number.
 * @param layoutMap
 */
export declare function getMaximumId(layoutMap: IMLayoutJson): number;
/**
 * Checks if `value` is classified as a percentage value
 * @param value
 */
export declare function isPercentage(value: any): boolean;
/**
 * Checks if `value` is classified as a finite number
 * @param value
 */
export declare function isNumber(value: any): boolean;
export declare function getValueOfBBox(bbox: BoundingBox, prop: string): string;
/**
 * Convert the value to percentage value in respect to the total
 * @param value
 * @param total
 */
export declare function toRatio(value: number, total: number): string;
/**
 * Convert a percentage value to pixel in respect to the total
 * @param ratio
 * @param total
 */
export declare function fromRatio(ratio: number | string, total: number): number;
export declare function mapStateToLayoutProps(state: IMState, ownProps: LayoutProps): StateToLayoutProps;
export declare function mapStateToLayoutItemProps(state: IMState, ownProps: LayoutItemProps): StateToLayoutItemProps;
export declare function mapStateToWidgetProps(state: IMState, ownProps: LayoutItemProps): WidgetProps;
export declare function isWidgetHasEmbeddedLayout(widgetId: string, appConfig: IMAppConfig): boolean;
export declare function isFunctionalWidget(widgetId: string, appConfig: IMAppConfig): boolean;
export declare function isWidgetPlaceholder(appConfig: IMAppConfig, item: LayoutItemConstructorProps): boolean;
/**
 * Replace the values of bounding box b1 with values of b2, try to keep the unit of each property.
 * @param b1
 * @param b2
 * @param containerRect
 */
export declare function replaceBoundingBox(b1: IMBoundingBox, b2: ClientRect, containerRect: ClientRect): IMBoundingBox;
/**
 * Update a property of the bounding box
 * @param prop
 * @param b
 * @param newValue
 * @param containerRect
 */
export declare function updateBoundingBoxProp(prop: string, b: IMBoundingBox, newValue: number | string, containerRect: ClientRect): Immutable.ImmutableObject<BoundingBox>;
export declare function relativeClientRect(r1: ClientRect, r2: ClientRect): ClientRect & {
    id: string;
};
export declare function getBuilderThemeVariables(): IMThemeVariables;
export declare function isRTL(): boolean;
export declare function parseAspectRatio(ratio: number | string): number;
export declare function expandStyleArray(dataArray: Array<number>): [number, number, number, number];
export declare function calHeightOfLayoutItem(containerHeight: number, layoutItem: IMLayoutItemJson): {
    height?: number;
    setting: any;
};
export declare function getAppConfig(): IMAppConfig;
export declare function getCurrentSizeMode(): BrowserSizeMode;
export declare function getCurrentPageId(): string;
export declare function getCurrentDialogId(): string;
export declare function getActivePagePart(): PagePart;
export declare function getCurrentDialogRootLayoutId(): string;
export declare function getCurrentPageRootLayoutId(): string;
export declare function getHeaderRootLayoutId(): string;
export declare function getFooterRootLayoutId(): string;
/**
 * Check if rect1 contains rect2
 * @param rect1
 * @param rect2
 */
export declare function contains(rect1: ClientRect, rect2: ClientRect): boolean;
export declare function intersects(r1: ClientRect, r2: ClientRect): boolean;
export declare function getLayoutItemSizeMode(side: 'width' | 'height', bbox: IMBoundingBox, autoProps: any): LayoutItemSizeModes;
export declare function gcd(x: number, y: number): number;
export declare function handleOnebyOneAnimation(props: any): {
    isParentPlaying?: undefined;
    isParentRevert?: undefined;
    isParentEnableScroll?: undefined;
    parentAnimationStyle?: undefined;
    parentPlayId?: undefined;
} | {
    isParentPlaying: any;
    isParentRevert: any;
    isParentEnableScroll: any;
    parentAnimationStyle: any;
    parentPlayId: any;
};
