import { LayoutInfo, IMAppLayouts, AppLayouts } from 'jimu-core';
/**
 * Remove the item id from its parent's content
 * @param layoutInfo
 * @param deleteFromLayout
 * @param layouts
 */
export declare function removeItemFromParent(layoutInfo: LayoutInfo, deleteFromLayout: boolean, layouts: IMAppLayouts): IMAppLayouts;
export declare function createEmptyLayoutItem(layoutId: string, layouts: IMAppLayouts): {
    layoutInfo: LayoutInfo;
    layouts: IMAppLayouts;
};
export declare function cleanupRuntimeLayouts(layouts: AppLayouts): AppLayouts;
