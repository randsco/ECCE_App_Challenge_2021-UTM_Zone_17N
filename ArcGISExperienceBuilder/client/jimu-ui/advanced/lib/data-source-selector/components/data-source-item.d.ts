/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, ImmutableObject, WidgetJson, ReactRedux } from 'jimu-core';
import { DataSourceItemProps } from '../types';
interface StateExtraProps {
    widgets?: ImmutableObject<{
        [widgetId: string]: WidgetJson;
    }>;
}
interface ExtraProps {
    intl: IntlShape;
}
export declare const DataSourceItem: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<DataSourceItemProps & ExtraProps & StateExtraProps>> & {
    WrappedComponent: React.ComponentType<DataSourceItemProps & ExtraProps & StateExtraProps>;
}, Pick<import("react-intl").WithIntlProps<DataSourceItemProps & ExtraProps & StateExtraProps>, "className" | "forwardedRef" | "dataSourceJson" | "isRenameInputShown" | "isMappingIconShown" | "onMappingIconClick" | "onRename" | "isMoreIconShown" | "isCloseIconShown" | "isRelatedWidgetsShown" | "isErrorIconShown" | "isSelected" | "isHideable" | "onDataSourceItemClick" | "onCloseIconClick" | "onMoreIconClick" | "onToggleHidden" | "onChildDataIconClick" | "onRelatedWidgetsIconClick"> & DataSourceItemProps>;
export {};
