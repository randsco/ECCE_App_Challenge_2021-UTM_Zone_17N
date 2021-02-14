/// <reference types="react" />
import { React, LayoutItemJson } from 'jimu-core';
export declare enum Direction {
    Horizontal = "H",
    Vertical = "V"
}
export interface ContainerProps {
    layoutId: string;
    layoutItemId: string;
    splitterSize: number;
    splitterColor: string;
}
export declare type GridItemJson = LayoutItemJson & {
    parentId?: string;
    direction?: Direction;
    items?: string[];
};
export interface GridContextProps {
    showSplitter: boolean;
    splitterSize: number;
    splitterColor: string;
}
export declare const DEFAULT_GRID_SETTING: GridContextProps;
export declare const GridContext: React.Context<GridContextProps>;
