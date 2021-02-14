import { IMAppConfig } from 'jimu-core';
export declare function getSectionIdsFromPage(pageId: string, appConfig: IMAppConfig): string[];
/**
 * return all child views of parent view,
 * e.g., page_1 -> section_1 -> view_1 -> section_2 -> view_2 -> section_3 -> view_3
 * input view_1, return [view_2, view_3],
 * input view_2, return [view_3],
 * input view_undefiled, return []
 */
export declare function getAllChildViewIds(parentViewId: string, appConfig: IMAppConfig): string[];
export declare function getSectionIdsFromView(viewId: string, appConfig: IMAppConfig): string[];
export declare function getViewInfoFromSection(sectionId: string, appConfig: IMAppConfig): ViewInfo[];
export interface ViewInfo {
    id: string;
    label: string;
}
export declare function checkURL(str: string): 'httpError' | 'invalidUrlError';
