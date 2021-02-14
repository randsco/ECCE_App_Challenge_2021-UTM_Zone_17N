import { IMTreeItemJson } from './tree-item';
/**
 * The default matcher is to match the filterText prop by item's label
 * @param filterText The text you want to match
 * @param item The tree you want to search
 */
export declare const defaultMatcher: (filterText: string, item: IMTreeItemJson) => boolean;
/**
 * To search a node if it's exist
 * @param tree The tree you want to search
 * @param filter The text you want to search
 * @param matcher The way you want to search
 */
export declare const findNode: (tree: IMTreeItemJson, filter: string, matcher: any) => boolean;
/**
 * Filter another tree by your filter and matcher
 * @param tree The tree you want to search
 * @param filter The text you want to search
 * @param matcher The way you want to search
 */
export declare const filterTree: (tree: IMTreeItemJson, filter: string, matcher?: (filterText: string, item: IMTreeItemJson) => boolean) => IMTreeItemJson;
/**
 * Expand all nodes those match your condition, and return the expanded tree
 * @param tree The tree you want to expand
 * @param filter The text you want to search
 * @param matcher The way you want to search
 */
export declare const expandFilteredNodes: (tree: IMTreeItemJson, filter: string, matcher?: (filterText: string, item: IMTreeItemJson) => boolean) => IMTreeItemJson;
/**
 * Expand all nodes those by expandIds, and return the expanded tree
 * @param tree The tree you want to expand
 * @param expandIds The item ids those you want to expand
 */
export declare const expandNodesByExpandIds: (tree: IMTreeItemJson, expandIds: string[]) => IMTreeItemJson;
/**
 * Activate all nodes those by activeIds, and return the activated tree
 * @param tree The tree you want to activate
 * @param activeIds The item ids those you want to activate
 */
export declare const activeNodesByActiveIds: (tree: IMTreeItemJson, activeIds: string[]) => IMTreeItemJson;
/**
 * Activate and expand all nodes those by activeIds, and return the activated and expanded tree
 * @param tree The tree you want to activate and expand
 * @param activeIds The item ids those you want to activate and expand
 */
export declare const activeAndExpandNodesByActiveIds: (tree: IMTreeItemJson, activeIds: string[]) => IMTreeItemJson;
/**
 * Get all expanded item ids of the tree
 * @param tree
 */
export declare const fetchAllExpandIds: (tree: IMTreeItemJson) => string[];
