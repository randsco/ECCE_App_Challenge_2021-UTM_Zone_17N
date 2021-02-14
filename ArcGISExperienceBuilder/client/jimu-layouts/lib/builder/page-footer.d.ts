/// <reference types="react" />
/** @jsx jsx */
import { PagePart, IMFooterJson, BrowserSizeMode, ImmutableObject } from 'jimu-core';
import { PageContextProps } from 'jimu-layouts/layout-runtime';
export interface PageFooterProps {
    footer: IMFooterJson;
    activePagePart: PagePart;
    footerVisible: boolean;
    browserSizeMode: BrowserSizeMode;
    mainSizeMode: BrowserSizeMode;
    pageContext: ImmutableObject<PageContextProps>;
}
export declare function PageFooter(props: PageFooterProps): JSX.Element;
