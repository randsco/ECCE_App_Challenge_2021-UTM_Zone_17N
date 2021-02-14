/// <reference types="react" />
/** @jsx jsx */
import { React, PageJson, ImmutableObject, BrowserSizeMode, IMThemeVariables, PagePart, IMHeaderJson, IMFooterJson, LayoutInfo, IntlShape, ClipboardItem, DialogJson, IMDialogJson } from 'jimu-core';
import { PageContextProps } from 'jimu-layouts/layout-runtime';
interface PageProps {
    intl: IntlShape;
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
    mainSizeMode: BrowserSizeMode;
    browserSizeMode: BrowserSizeMode;
    theme: IMThemeVariables;
    minHeight: number;
    activePagePart: PagePart;
    clipboardItem: ClipboardItem;
    dialogs: ImmutableObject<{
        [dlgId: string]: DialogJson;
    }>;
    currentDialogId?: string;
    splashDialogJson: IMDialogJson;
    isSplashClosed: boolean;
    pageDialogId: string;
    pageDialogJson: IMDialogJson;
    isPageDlgClosed: boolean;
    urlDialogJson: IMDialogJson;
}
export declare class PageRenderer extends React.PureComponent<PageProps & StateToProps> {
    static displayName: string;
    pageRef: HTMLElement;
    pageContext: ImmutableObject<PageContextProps>;
    activeLayoutInfo: LayoutInfo;
    keyBindings: {
        [key: string]: any;
    };
    constructor(props: any);
    startPaste: () => void;
    isMac: () => boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: PageProps): void;
    clearSelection: (e: any) => void;
    formatMessage: (id: string, values?: any) => string;
    getPageStyle(): import("jimu-core").SerializedStyles;
    updatePageContext(): void;
    render(): JSX.Element;
    renderHeader(): JSX.Element;
    renderFooter(): JSX.Element;
    renderPageBody(renderedPageId: string): JSX.Element;
    renderDialog(): JSX.Element;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<Pick<React.ClassAttributes<PageRenderer> & PageProps & StateToProps, "ref" | "key" | "intl" | "dialogId" | "pageStatus"> & PageProps>> & {
    WrappedComponent: React.ComponentType<Pick<React.ClassAttributes<PageRenderer> & PageProps & StateToProps, "ref" | "key" | "intl" | "dialogId" | "pageStatus"> & PageProps>;
};
export default _default;
