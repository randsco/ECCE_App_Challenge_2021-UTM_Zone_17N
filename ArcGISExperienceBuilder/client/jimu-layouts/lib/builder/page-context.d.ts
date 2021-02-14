/// <reference types="react" />
import { React, IMThemeVariables, BrowserSizeMode } from 'jimu-core';
export declare const PageContext: React.Context<PageContextProps>;
export declare type PageContextProps = {
    rootLayoutId?: string;
    isHeader?: boolean;
    isFooter?: boolean;
    isDialog?: boolean;
    pageId?: string;
    builderTheme?: IMThemeVariables;
    theme?: IMThemeVariables;
    mainSizeMode: BrowserSizeMode;
    browserSizeMode: BrowserSizeMode;
    viewOnly?: boolean;
    maxWidth?: number;
    formatMessage?: (id: string, values?: any) => string;
    dialogId?: string;
};
export declare const ViewportVisibilityContext: React.Context<boolean>;
export declare const PageVisibilityContext: React.Context<boolean>;
export declare const ViewVisibilityContext: React.Context<ViewVisibilityContextProps>;
export declare type ViewVisibilityContextProps = {
    isInView?: boolean;
    isInCurrentView?: boolean;
};
export declare const ScreenGroupContext: React.Context<string>;
