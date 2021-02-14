import * as React from 'react';
import { ImmutableObject } from 'seamless-immutable';
import { IMCustomThemeJson, PageJson, IMDialogJson, IMAppConfig } from './types/app-config';
import { IMThemeVariables, ThemeVariables } from './types/theme';
import { UrlParameters } from './types/url-parameters';
import { IntlShape } from 'react-intl';
import { LoadingType } from './types/common';
import * as jimuUIModule from 'jimu-ui';
interface StateProps {
    dispatch?: any;
    appConfigLoaded: boolean;
    customTheme: IMCustomThemeJson;
    themeName: string;
    appPath: string;
    queryObject: UrlParameters;
    themeVariables: IMThemeVariables;
    pages: ImmutableObject<{
        [pageId: string]: PageJson;
    }>;
    isRTL: boolean;
    isBusy: boolean;
    loadingType: LoadingType;
    dialogJson: IMDialogJson;
    currentDialogId: string;
    hasNewVersion: boolean;
    userLocaleChanged: boolean;
    hasPrivilege: boolean;
    privilegeError: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    PageRenderClass: any;
    /**
     * store pages that have been rendered
     *
     * Only one page will be visible, all other pages will be hidden
     *  */
    pageStatus: ImmutableObject<{
        [pageId: string]: boolean;
    }>;
    preloadWidgetsLoaded: boolean;
    error: string;
    jimuUI: typeof jimuUIModule;
}
declare class AppRootComponent extends React.PureComponent<StateProps & IntlProps, State> {
    constructor(props: any);
    private getLayoutEntryPath;
    private getPageRenderClass;
    private getJimuUI;
    componentDidMount(): void;
    componentWillUnmount(): void;
    loadPreloadWidgets(appConfig: IMAppConfig): Promise<void>;
    componentDidUpdate(): void;
    getPageId(): string;
    getDialogId(): string;
    getKeyboardComponent: () => JSX.Element;
    render(): JSX.Element;
    renderPrivilegeError(): JSX.Element;
    renderReloadAlert(theme: ThemeVariables): JSX.Element;
    onDismiss(): void;
    reload(): void;
    getThemeNode(): any;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<Pick<React.ClassAttributes<AppRootComponent> & StateProps & IntlProps, "ref" | "key" | "intl"> & IntlProps>> & {
    WrappedComponent: React.ComponentType<Pick<React.ClassAttributes<AppRootComponent> & StateProps & IntlProps, "ref" | "key" | "intl"> & IntlProps>;
};
export default _default;
