/// <reference types="seamless-immutable" />
/// <reference types="react" />
/** @jsx jsx */
import { React, ActionSettingProps, SerializedStyles, ImmutableObject, DataSource, IMDataSourceInfo, ThemeVariables, Immutable, DataSourceJson, UseDataSource, IMFieldSchema, ReactRedux, IMSqlExpression } from 'jimu-core';
interface StateExtraProps {
    dataSources: ImmutableObject<{
        [dsId: string]: DataSourceJson;
    }>;
    dataSourcesInfo: ImmutableObject<{
        [dsId: string]: IMDataSourceInfo;
    }>;
}
interface ExtraProps {
    theme?: ThemeVariables;
}
interface States {
    isShowLayerList: boolean;
    currentLayerType: 'trigger' | 'action';
    isSqlExprShow: boolean;
    Button: any;
    Icon: any;
    Switch: any;
    Collapse: any;
    SettingSection: any;
    SettingRow: any;
    FieldSelector: any;
    AllDataSourceTypes: any;
    DataSourceSelector: any;
    ArcGISDataSourceTypes: any;
    SqlExpressionBuilderPopup: any;
    DSSelectorTypes: any;
}
interface Config {
    messageUseDataSource: UseDataSource;
    actionUseDataSource: UseDataSource;
    sqlExprObj?: IMSqlExpression;
    enabledDataRelationShip?: boolean;
}
export declare type IMConfig = ImmutableObject<Config>;
declare class _SelectDataRecordActionSetting extends React.PureComponent<ActionSettingProps<IMConfig> & ExtraProps & StateExtraProps, States> {
    modalStyle: any;
    constructor(props: any);
    static defaultProps: {
        config: Immutable.ImmutableObject<{
            messageUseDataSource: any;
            actionUseDataSource: any;
            sqlExprObj: any;
            enabledDataRelationShip: boolean;
        }>;
    };
    getInitConfig: () => {
        messageUseDataSource: Immutable.ImmutableObject<UseDataSource>;
        actionUseDataSource: Immutable.ImmutableObject<UseDataSource>;
        sqlExprObj: Immutable.ImmutableObject<import("jimu-core").SqlExpression>;
    };
    checkAndGetInitUseDataSource: (widgetId: string, oldUseDataSource: Immutable.ImmutableObject<UseDataSource>) => any;
    componentDidMount(): void;
    getStyle(theme: ThemeVariables): SerializedStyles;
    handleTriggerLayerChange: (useDataSources: UseDataSource[]) => void;
    handleActionLayerChange: (useDataSources: UseDataSource[]) => void;
    handleTriggerLayerSelected: (currentSelectedDs: UseDataSource) => void;
    handleActionLayerSelected: (currentSelectedDs: UseDataSource) => void;
    handleRemoveLayerForTriggerLayer: () => void;
    handleRemoveLayerForActionLayer: () => void;
    showSqlExprPopup: () => void;
    toggleSqlExprPopup: () => void;
    onSqlExprBuilderChange: (sqlExprObj: IMSqlExpression) => void;
    onMessageFieldSelected: (allSelectedFields: IMFieldSchema[], ds: DataSource) => void;
    onActionFieldSelected: (allSelectedFields: IMFieldSchema[], ds: DataSource) => void;
    swicthEnabledDataRelationShip: (checked: any) => void;
    checkTrigerLayerIsSameToActionLayer: () => boolean;
    getDsRootIdsByWidgetId: (wId: string) => Immutable.ImmutableArray<any>;
    getDsIdsByWidgetId: (wId: string) => Immutable.ImmutableArray<any> | Immutable.ImmutableArray<string>;
    getDsSelectorSourceData: (widgetId: string, useDataSource: Immutable.ImmutableObject<UseDataSource>) => {
        isReadOnly: boolean;
        useDataSources: Immutable.ImmutableArray<any>;
        fromRootDsIds: Immutable.ImmutableArray<any>;
        fromDsIds: Immutable.ImmutableArray<any>;
    };
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<React.SFC<import("emotion-theming/types/helper").AddOptionalTo<Pick<ActionSettingProps<Immutable.ImmutableObject<Config>> & ExtraProps & StateExtraProps & React.RefAttributes<_SelectDataRecordActionSetting>, "ref" | "theme" | "key" | "intl" | "dataSourcesInfo" | "widgetId" | "dataSources" | "onSettingChange" | "actionId" | "messageWidgetId" | "messageType" | "onDisableDoneBtn"> & Partial<Pick<ActionSettingProps<Immutable.ImmutableObject<Config>> & ExtraProps & StateExtraProps & React.RefAttributes<_SelectDataRecordActionSetting>, "config">> & Partial<Pick<{
    config: Immutable.ImmutableObject<{
        messageUseDataSource: any;
        actionUseDataSource: any;
        sqlExprObj: any;
        enabledDataRelationShip: boolean;
    }>;
}, never>>, "theme">>, Pick<import("emotion-theming/types/helper").AddOptionalTo<Pick<ActionSettingProps<Immutable.ImmutableObject<Config>> & ExtraProps & StateExtraProps & React.RefAttributes<_SelectDataRecordActionSetting>, "ref" | "theme" | "key" | "intl" | "dataSourcesInfo" | "widgetId" | "dataSources" | "onSettingChange" | "actionId" | "messageWidgetId" | "messageType" | "onDisableDoneBtn"> & Partial<Pick<ActionSettingProps<Immutable.ImmutableObject<Config>> & ExtraProps & StateExtraProps & React.RefAttributes<_SelectDataRecordActionSetting>, "config">> & Partial<Pick<{
    config: Immutable.ImmutableObject<{
        messageUseDataSource: any;
        actionUseDataSource: any;
        sqlExprObj: any;
        enabledDataRelationShip: boolean;
    }>;
}, never>>, "theme">, "ref" | "theme" | "key" | "intl" | "widgetId" | "config" | "onSettingChange" | "actionId" | "messageWidgetId" | "messageType" | "onDisableDoneBtn"> & ActionSettingProps<Immutable.ImmutableObject<Config>>>;
export default _default;
