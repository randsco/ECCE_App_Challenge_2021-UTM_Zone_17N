export declare const DropIndicatorSize = 10;
export declare function calInsertPositionForColumn(boundingRect: ClientRect, centerY: number, childRects: Array<ClientRect & {
    id: string;
}>, indicatorSize: number): {
    insertY: number;
    refId: string;
};
