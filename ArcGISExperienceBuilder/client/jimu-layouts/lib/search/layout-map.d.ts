import { IMAppConfig, BrowserSizeMode, LayoutInfo } from 'jimu-core';
import { LayoutNode, LayoutMap } from '../types';
/**
 * Generate the layout map from the root layout id
 * @param appConfig
 * @param rootLayoutId
 */
export declare function generateLayoutMap(rootLayoutId: string, appConfig: IMAppConfig, browserSizeMode: BrowserSizeMode): LayoutMap;
/**
 * Find the lowest ancestor layout or the one below root layout.
 * @param layoutMap
 * @param node
 * @param targetLayoutId
 */
export declare function findLowestAncestor(layoutMap: LayoutMap, node: LayoutNode, targetLayoutId?: string): LayoutNode;
/**
 * Find parent layout item in current page.
 * @param layoutInfo
 */
export declare function findParentLayoutItem(layoutInfo: LayoutInfo, appConfig: IMAppConfig, rootLayoutId: string, browserSizeMode: BrowserSizeMode): LayoutInfo;
