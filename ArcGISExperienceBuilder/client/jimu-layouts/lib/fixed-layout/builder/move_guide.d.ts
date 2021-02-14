import * as SVG from 'svg.js';
import { IMThemeVariables } from 'jimu-core';
export declare const enum FixedSides {
    Left = 0,
    Top = 1,
    Right = 2,
    Bottom = 3,
    None = 4
}
export interface RndDelta {
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface SnapResult {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
}
/**
 * When resizing in RTL, the resize edge should be flipped. That means if you resize by dragging the right edge,
 * the interactjs will move the left edge.
 * @param dx
 * @param dw
 */
export declare function flipDelta(dx: number, dw: number): {
    x: number;
    w: number;
};
/**
 * Moves a widget by the given delta and return the snapped result.
 */
export declare function moveGuide(containerRect: ClientRect, draggingBound: ClientRect, delta: RndDelta, shiftKey: boolean, siblingBounds: ClientRect[], autoProps: {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
}, xDraw?: SVG.Doc, yDraw?: SVG.Doc, theme?: IMThemeVariables): RndDelta & SnapResult;
export declare function snapVBoundary(containerRect: ClientRect, draggingBound: ClientRect, delta: RndDelta, autoProps: {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
}): {
    dy: number;
    dh: number;
    snapToTop: boolean;
    snapToBottom: boolean;
};
export declare function snapHBoundary(containerRect: ClientRect, draggingBound: ClientRect, delta: RndDelta, autoProps: {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
}): {
    dx: number;
    dw: number;
    snapToLeft: boolean;
    snapToRight: boolean;
};
export declare function edgeSnapGuide(draggingBound: ClientRect, delta: RndDelta, siblingBounds: Array<ClientRect>, direction: 'v' | 'h', draw?: SVG.Doc, theme?: IMThemeVariables): {
    deltaPos: number;
    deltaSize: number;
    overridePos: boolean;
    overrideSize: boolean;
};
export declare function distanceSnapGuide(draggingBound: ClientRect, delta: RndDelta, siblingBounds: Array<ClientRect>, direction: 'v' | 'h', draw?: SVG.Doc, theme?: IMThemeVariables): {
    deltaPos: number;
    deltaSize: number;
    overridePos: boolean;
    overrideSize: boolean;
};
export declare function calSnapDistance(draggingBound: ClientRect, delta: RndDelta, siblingBounds: Array<ClientRect>, direction: 'h' | 'v', fixedSide: FixedSides): {
    previous: number;
    next: number;
    involvedRects: Array<ClientRect>;
};
