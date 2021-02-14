import { UrlParameters, IMUrlParameters } from '../types/url-parameters';
import { Location, LinkResult, LinkTo, UrlProtocol } from '../types/common';
import { IMAppConfig, AppConfig } from '../types/app-config';
import { SectionNavInfo } from '../types/state';
export declare function parsePath(path: string): Location;
export declare function isAbsoluteUrl(url: string): boolean;
export interface DataSourceSelectionInfo {
    [dsId: string]: {
        selectionType: 'index' | 'id';
        selection: number[] | string[];
    };
}
export declare function getDataSourceInfosFromQueryObject(queryObject: UrlParameters): DataSourceSelectionInfo;
export declare function getSectionNavInfoFromQueryObject(queryObject: UrlParameters, appConfig: AppConfig | IMAppConfig): {
    [sectionId: string]: SectionNavInfo;
};
export declare function getAppIdPageIdFromUrl(location?: Location): {
    appId: string;
    pageId: string;
};
/**
 * the path may be:
 *  ->app id is null:
 *  :rootPath
 *  :rootPath/index.html
 *  :rootPath/page
 *  :rootPath/page/:pageId
 *  :rootPath/page/page => page id is "page"

    -> app is not null, page id is null
 *  :rootPath/:appId, this means we can't have a app whose id is "page"
 *  :rootPath/:appId/index.html => page id is null
 *  :rootPath/:appId/page => page id is null

    -> both are not null
 *  :rootPath/:appId/page/:pageId
 */
export declare function parseAppPath(pathName?: string): {
    appId: string;
    pageId: string;
};
export declare function getPageLink(pageId: string): {
    path: string;
    qo: {
        page: string;
    };
};
export declare function getPageLinkUrl(pageId: string, qo?: Partial<UrlParameters>): string;
export declare function getFolder(url: string): string;
export declare function getFixedRootPath(): string;
export declare function getAbsoluteRootUrl(): string;
export declare function createLocation(currentLocation: Location, to: string): Location;
export declare function createHref(location: Location): string;
export declare function getHrefFromLinkTo(linkResult: LinkTo, queryObject: IMUrlParameters, currentLocation?: Location, keepQueryObjectDlg?: boolean): string;
export declare function getLinkResultFromHref(href: string): LinkResult;
export declare function updateQueryStringParameter(uri: any, key: any, value: any): string;
export declare function getProtocol(url: string): UrlProtocol;
export declare function setProtocol(url: string, protocol: UrlProtocol): string;
export declare function setLocationProtocal(url: string): string;
export declare function getUrlHost(url: string): string;
export declare function removeSearchFromUrl(url: string): string;
export declare function appendQueryParam(url: string, key: string, val: string): string;
export declare function normalize(url: string): string;
export interface GetAppUrlParameter {
    appId: string;
    isTemplate?: boolean;
    isArcGisOnlineTemplate?: boolean;
    isPortalRequest?: boolean;
    isDraft?: boolean;
    defaultTemplateName?: string;
}
export declare function getAppUrl(getAppUrlParameter: GetAppUrlParameter): string;
export declare function getExperienceBuilderOnlineUrl(): any;
export declare function getArcgisOnlineUrl(): any;
