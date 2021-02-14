/// <reference types="react" />
/** @jsx jsx */
import { jimuHistory, IMUrlParameters, React, LinkTo, ReactRedux, IMDialogJson, IMDialogInfos } from 'jimu-core';
import { ButtonProps } from './button';
export * from './_link-tip';
export declare type LinkTarget = '_self' | '_blank' | '_parent' | '_top';
export interface LinkProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Custom html element to use as the link element.
     *
     * @default "a"
     */
    tag?: React.ElementType;
    /**
     * Callback fired when the root element is clicked.
     */
    onClick?: (evt: React.MouseEvent<HTMLLinkElement>) => void;
    /**
     * Sets the value of the native `target` property on the \<a\> element.
     * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
     */
    target?: LinkTarget;
    replace?: boolean;
    history?: jimuHistory.History;
    to?: LinkTo;
    queryObject?: IMUrlParameters;
    innerRef?: React.Ref<HTMLButtonElement>;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
    customStyle?: CustromStyle;
    themeStyle?: ButtonProps;
}
interface StateProps {
    dialogJson: IMDialogJson;
    currentDialogJson: IMDialogJson;
    dispatch?: any;
    currentPageId: string;
    currentDialogId: string;
    isPageDlg: boolean;
    currentPageDlgId: string;
    dialogInfos: IMDialogInfos;
}
interface CustromStyle {
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
    visitedStyle?: React.CSSProperties;
}
interface State {
    isTipPopperOpen: boolean;
    handleHrefChange: boolean;
}
export declare const isModifiedEvent: (event: any) => boolean;
export declare class _LinkComponent extends React.PureComponent<LinkProps & StateProps, State> {
    static count: number;
    href: string;
    id: string;
    constructor(props: any);
    componentWillUnmount(): void;
    isToWebAddress: () => boolean;
    isToTopWindow: () => boolean;
    stopGoingToOtherSite: () => boolean;
    handleClick: (event: any) => void;
    isHrefCanBeChanged(tryToOpenAnchoredDlg?: boolean): boolean;
    isCurrentDlgCanBeClosed(): boolean;
    clearSelection(): void;
    render(): JSX.Element;
}
export declare const _ConnectedLink: ReactRedux.ConnectedComponent<React.ComponentClass<any, any>, Pick<any, string | number | symbol> & LinkProps>;
export declare const _Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLButtonElement>>;
export declare const Link: React.ComponentType<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<LinkProps & React.RefAttributes<HTMLButtonElement>, "theme">>>;
