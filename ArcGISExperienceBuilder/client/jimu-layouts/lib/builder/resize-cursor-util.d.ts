/**
 * The arrow of zero degree is the same as the y axis points to the bottom of the viewport.
 * @param rotation in degree, greater than 0 if rotate clockwise
 * @param initAngle in degree
 */
export declare function getCursor(rotation: number, initAngle: number): "ew-resize" | "nesw-resize" | "ns-resize" | "nwse-resize";
