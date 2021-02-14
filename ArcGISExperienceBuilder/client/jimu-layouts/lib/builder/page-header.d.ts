/// <reference types="react" />
/** @jsx jsx */
import { PagePart, IMHeaderJson, BrowserSizeMode, ImmutableObject } from 'jimu-core';
import { PageContextProps } from 'jimu-layouts/layout-runtime';
export interface PageHeaderProps {
    header: IMHeaderJson;
    activePagePart: PagePart;
    headerVisible: boolean;
    browserSizeMode: BrowserSizeMode;
    mainSizeMode: BrowserSizeMode;
    pageContext: ImmutableObject<PageContextProps>;
}
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
