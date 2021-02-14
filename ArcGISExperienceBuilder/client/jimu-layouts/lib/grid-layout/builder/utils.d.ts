import { LayoutItemConstructorProps, LayoutInfo, IMAppConfig } from 'jimu-core';
import { Direction } from '../types';
export declare function addItemToGrid(appConfig: IMAppConfig, item: LayoutItemConstructorProps, parentLayoutInfo: LayoutInfo, referenceItemId: string, side: 'top' | 'bottom' | 'left' | 'right'): Promise<{
    layoutInfo: LayoutInfo;
    updatedAppConfig: IMAppConfig;
}>;
export declare function updateGridItemSize(dx: number, dy: number, containerRect: ClientRect, layoutId: string, prevItemId: string, nextItemId: string, direction: Direction): void;
