/// <reference types="seamless-immutable" />
/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, Immutable, ImmutableObject, ProxyJson, ThemeVariables, ReactRedux, DataSource } from 'jimu-core';
import { ProxySettingConfig } from '../types';
export interface ProxySettingPopupProps {
    isOpen: boolean;
    className?: string;
    onFinish: () => Promise<void>;
    onCancel: () => void;
    onToggle: () => void;
}
interface ExtraProps {
    intl: IntlShape;
    theme: ThemeVariables;
}
interface State {
    getAppConfigAction: any;
    isLoading: boolean;
    isError: boolean;
    proxyConfigs: ImmutableObject<{
        [sourceUrl: string]: ProxySettingConfig;
    }>;
    needProxyDataSources: {
        [sourceUrl: string]: {
            dataSources: DataSource[];
            isPremium: boolean;
            isSubscriber: boolean;
        };
    };
}
interface StateToProps {
    appProxies: ImmutableObject<{
        [proxyId: string]: ProxyJson;
    }>;
}
declare class _ProxySettingPopup extends React.PureComponent<ProxySettingPopupProps & ExtraProps & StateToProps, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ProxySettingPopupProps & ExtraProps & StateToProps): void;
    componentWillUnmount(): void;
    getProxyConfigFromAppProxyJsons: () => Promise<{
        proxyConfigs: Immutable.ImmutableObject<{
            [sourceUrl: string]: ProxySettingConfig;
        }>;
        needProxyDataSources: {
            [sourceUrl: string]: {
                dataSources: DataSource[];
                isPremium: boolean;
                isSubscriber: boolean;
            };
        };
    }>;
    registerApp: () => Promise<any>;
    createProxies: (proxyConfigs: Immutable.ImmutableObject<{
        [sourceUrl: string]: ProxySettingConfig;
    }>) => Promise<Immutable.ImmutableObject<{
        [proxyId: string]: ProxyJson;
    }>>;
    getAppRootUrl: () => string;
    getAppUrl: () => string;
    onProxyConfigChange: (proxyConfigs: Immutable.ImmutableObject<{
        [sourceUrl: string]: ProxySettingConfig;
    }>) => void;
    onFinish: () => void;
    getTostStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const ProxySettingPopup: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<ProxySettingPopupProps & ExtraProps & StateToProps & React.RefAttributes<_ProxySettingPopup>, "theme">>>> & {
    WrappedComponent: React.ComponentType<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<ProxySettingPopupProps & ExtraProps & StateToProps & React.RefAttributes<_ProxySettingPopup>, "theme">>>;
}, Pick<import("react-intl").WithIntlProps<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<ProxySettingPopupProps & ExtraProps & StateToProps & React.RefAttributes<_ProxySettingPopup>, "theme">>>, "ref" | "theme" | "children" | "className" | "key" | "isOpen" | "forwardedRef" | "onToggle" | "onCancel" | "onFinish"> & ProxySettingPopupProps>;
export {};
