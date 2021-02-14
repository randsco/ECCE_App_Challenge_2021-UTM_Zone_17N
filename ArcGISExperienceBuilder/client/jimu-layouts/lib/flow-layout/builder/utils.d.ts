import { LayoutInfo, IMAppConfig } from 'jimu-core';
import { Template } from 'jimu-for-builder/templates';
export declare function addTemplateRow(layoutId: string, layoutItemId: string, layoutTemplate: Template): Promise<LayoutInfo>;
export declare function addTemplateScreenGroup(layoutId: string, layoutItemId: string, screenGroupTemplate: Template): Promise<LayoutInfo>;
export declare function isFirstNonFloatingItem(layoutInfo: LayoutInfo): boolean;
export declare function isLastNonFloatingItem(layoutInfo: LayoutInfo): boolean;
/**
 * Move a layout item down in the scrolling page, take the floating item into account.
 * @param layoutInfo
 */
export declare function moveDown(appConfig: IMAppConfig, layoutInfo: LayoutInfo): IMAppConfig;
/**
 * Move a layout item up in the scrolling page, take the floating item into account.
 * @param layoutInfo
 */
export declare function moveUp(appConfig: IMAppConfig, layoutInfo: LayoutInfo): IMAppConfig;
