/// <reference types="seamless-immutable" />
import { BoundingBox, IMLayoutJson, Immutable, BrowserSizeMode, IMBoundingBox } from 'jimu-core';
import { FixedLayoutItemSetting } from '../types';
interface Pos {
    x: number;
    y: number;
    w: number;
    h: number;
}
export declare function sortLayoutItems(layout: IMLayoutJson): string[];
export declare function fixedLayoutTransform(layout: IMLayoutJson, fromSizeMode: BrowserSizeMode, toSizeMode: BrowserSizeMode): IMLayoutJson;
/**
 * Convert a layout to a small size(width) layout.
 *
 * Return the new layout.
 *
 *
 * @param layout
 * @param convertToColumn
 * @param appConfig
 */
export declare function autoResponseToDevice(layout: IMLayoutJson, deviceWidth: number): IMLayoutJson;
export declare function intersects(p1: Pos, p2: Pos): boolean;
export declare function contains(p1: Pos, p2: Pos): boolean;
export declare function mergePos(p1: Pos, p2: Pos): Pos;
export declare function getAbsolutePos(b: BoundingBox, containerWidth: number, containerHeight: number): Pos;
export declare function generateResizingBBoxStyle(initRect: ClientRect, containerRect: ClientRect, delta: {
    dx: number;
    dy: number;
    dw: number;
    dh: number;
}, autoFlip?: boolean): any;
export declare function generateBBoxStyle(bbox: IMBoundingBox, setting: FixedLayoutItemSetting): any;
export declare function flipAutoProps(autoProps: {
    left?: boolean;
    right?: boolean;
}): Immutable.ImmutableObject<{
    left?: boolean;
    right?: boolean;
}>;
export declare function flipBBox(bbox: BoundingBox): Immutable.ImmutableObject<BoundingBox>;
export declare function applyPositionSetting(bbox: IMBoundingBox, itemSetting: FixedLayoutItemSetting, isResizing?: boolean): any;
export declare function forceAspectRatio(bbox: IMBoundingBox, itemSetting: FixedLayoutItemSetting): boolean;
/**
 * Do not change the autoProps value except that value is empty.
 */
export declare function applySnapResult(bbox: any, containerRect: any, snapResult: any): IMBoundingBox;
export {};
