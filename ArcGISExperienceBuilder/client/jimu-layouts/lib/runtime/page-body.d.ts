/// <reference types="react" />
/** @jsx jsx */
import { IMPageJson, BrowserSizeMode } from 'jimu-core';
import { PageContextProps } from '../builder/page-context';
export interface PageBodyProps {
    pageJson: IMPageJson;
    pageContext: PageContextProps;
    visible: boolean;
    browserSizeMode: BrowserSizeMode;
}
export declare function PageBody(props: PageBodyProps): JSX.Element;
