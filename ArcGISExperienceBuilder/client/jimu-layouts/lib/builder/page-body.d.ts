/// <reference types="react" />
/** @jsx jsx */
import { PagePart, BrowserSizeMode, IMPageJson, ImmutableObject } from 'jimu-core';
import { PageContextProps } from 'jimu-layouts/layout-runtime';
export interface PageBodyProps {
    pageJson: IMPageJson;
    renderedPageId: string;
    activePagePart: PagePart;
    browserSizeMode: BrowserSizeMode;
    pageContext: ImmutableObject<PageContextProps>;
    visible: boolean;
}
export declare function PageBody(props: PageBodyProps): JSX.Element;
