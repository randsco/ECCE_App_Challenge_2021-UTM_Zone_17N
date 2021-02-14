import * as React from 'react';
import type { History } from 'history';
import type { Location } from './types/common';
export declare const browserHistory: import("history").BrowserHistory<object>;
export declare const HistoryProvider: (props: any) => JSX.Element;
export declare function withHistory<T extends React.ComponentClass<any, any>>(Component: any): T;
/**
 * Change the query url using queryObject, only the passed in params will be updated.
 *  * To replace all query params, set `replaceQueryObject=true`
 *  * To remove a query param, set the param as null
 * @param queryObject can be partial of query object
 * @param replace replace the browser history
 * @param replaceQueryObject replace the queryObject instead of merge
 */
export declare function changeQueryObject(queryObject: any, replace?: boolean, replaceQueryObject?: boolean): void;
/**
 *
 * @param queryObject can be partial of query object
 */
export declare function replaceQueryObject(queryObject: any, replace?: boolean): void;
export declare function changePage(pageId: string): void;
export declare function changeView(sectionId: string, viewId: string): void;
export declare function changeDialog(dialogId: string): void;
export declare function changeQueryObjectByDataRecordIds(dsId: string, ids: string[]): void;
export declare function changeQueryObjectByDataRecordIndexes(dsId: string, indexes: number[]): void;
export { History, Location };
