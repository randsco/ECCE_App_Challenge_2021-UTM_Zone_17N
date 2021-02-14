export declare function calInsertPositionForColumn(boundingRect: ClientRect, itemRect: Partial<ClientRect>, childRects: Array<ClientRect & {
    id: string;
}>): {
    insertY: number;
    refId: string;
};
