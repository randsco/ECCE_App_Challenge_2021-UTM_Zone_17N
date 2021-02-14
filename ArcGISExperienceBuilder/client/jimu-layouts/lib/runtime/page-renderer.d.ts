/// <reference types="react" />
/** @jsx jsx */
import { React, PageJson, ImmutableObject, ReactRedux, BrowserSizeMode, IMThemeVariables, IMHeaderJson, IMFooterJson, IMDialogJson } from 'jimu-core';
import { PageContextProps } from '../builder/page-context';
interface PageProps {
    dialogId?: string;
    /**
     * store pages that have been rendered
     *
     * Only one page will be visible, all other pages will be hidden
     *  */
    pageStatus: ImmutableObject<{
        [pageId: string]: boolean;
    }>;
}
interface StateToProps {
    pages: ImmutableObject<{
        [pageId: string]: PageJson;
    }>;
    header: IMHeaderJson;
    headerVisible?: boolean;
    footer: IMFooterJson;
    footerVisible?: boolean;
    browserSizeMode: BrowserSizeMode;
    mainSizeMode: BrowserSizeMode;
    theme: IMThemeVariables;
    splashDialogJson: IMDialogJson;
    isSplashClosed: boolean;
    pageDialogId: string;
    pageDialogJson: IMDialogJson;
    isPageDlgClosed: boolean;
    urlDialogJson: IMDialogJson;
}
declare class PageRenderer extends React.PureComponent<PageProps & StateToProps> {
    static displayName: string;
    pageContext: PageContextProps;
    pageRef: HTMLElement;
    constructor(props: any);
    componentDidUpdate(prevProps: PageProps): void;
    render(): JSX.Element;
    renderHeader(): JSX.Element;
    renderFooter(): JSX.Element;
    renderPageBody(renderedPageId: string, theme: IMThemeVariables): JSX.Element;
    renderDialog(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof PageRenderer, Pick<React.ClassAttributes<PageRenderer> & PageProps & StateToProps, "ref" | "key" | "dialogId" | "pageStatus"> & PageProps>;
export default _default;
