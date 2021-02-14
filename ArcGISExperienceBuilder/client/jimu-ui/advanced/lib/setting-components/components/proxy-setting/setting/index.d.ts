/// <reference types="react" />
import { React, ImmutableObject, IntlShape, DataSource } from 'jimu-core';
import { ProxySettingConfig, IMProxySettingConfig } from '../types';
interface ProxySettingProps {
    className?: string;
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
    onChange: (proxyConfigs: ImmutableObject<{
        [sourceUrl: string]: ProxySettingConfig;
    }>) => void;
}
interface ExtraProps {
    intl: IntlShape;
}
export declare class _ProxySetting extends React.PureComponent<ProxySettingProps & ExtraProps, unknown> {
    columnName: {
        authorized: string;
        subscriberContent: string;
        credits: string;
        requestLimit: string;
        requestInterval: string;
    };
    onProxyChange: (sourceUrl: string, proxyConfig: IMProxySettingConfig) => void;
    render(): JSX.Element;
}
export declare const ProxySetting: React.FC<import("react-intl").WithIntlProps<ProxySettingProps & ExtraProps>> & {
    WrappedComponent: React.ComponentType<ProxySettingProps & ExtraProps>;
};
export {};
