/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, ImmutableObject, WidgetJson } from 'jimu-core';
interface DataSourceRemoveWarningProps {
    dataSourceId: string;
    isOpen: boolean;
    className?: string;
    toggle: () => void;
}
interface ExtraProps {
    intl: IntlShape;
}
interface StateToProps {
    widgets: ImmutableObject<{
        [widgetId: string]: WidgetJson;
    }>;
}
interface State {
    selectedWidgets: string[];
    getAppConfigAction: any;
    proxySettingUtils: any;
}
declare class _DataSourceRemoveWarningPopup extends React.PureComponent<DataSourceRemoveWarningProps & ExtraProps & StateToProps, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onCloseRemoveOptions: (e: any) => void;
    onCheckboxBtnClick: (selected: any, e: any) => void;
    onRemove: (e: any) => Promise<void>;
    stopPropagation: (e: any) => void;
    render(): JSX.Element;
}
export declare const DataSourceRemoveWarningPopup: React.FC<import("react-intl").WithIntlProps<Pick<React.ClassAttributes<_DataSourceRemoveWarningPopup> & DataSourceRemoveWarningProps & ExtraProps & StateToProps, "ref" | "className" | "key" | "intl" | "toggle" | "isOpen" | "dataSourceId"> & DataSourceRemoveWarningProps>> & {
    WrappedComponent: React.ComponentType<Pick<React.ClassAttributes<_DataSourceRemoveWarningPopup> & DataSourceRemoveWarningProps & ExtraProps & StateToProps, "ref" | "className" | "key" | "intl" | "toggle" | "isOpen" | "dataSourceId"> & DataSourceRemoveWarningProps>;
};
export {};
