/// <reference types="react" />
/// <reference types="seamless-immutable" />
/** @jsx jsx */
import { React, FieldSchema, IMFieldSchema, DataSource, ImmutableArray, ImmutableObject, Immutable, IMUseDataSource, IntlShape, IMDataSourceSchema, JimuFieldType, IMThemeVariables, UseDataSource } from 'jimu-core';
import { SelectProps } from 'jimu-ui';
interface State {
    selectedDs: DataSource;
    isFromRepeatedDs: boolean;
    searchValue: string;
}
interface FieldSelectorInnerProps {
    dataSources: DataSource[];
    types?: ImmutableArray<JimuFieldType>;
    selectedFields?: ImmutableArray<string> | ImmutableObject<{
        [dataSourceId: string]: string[];
    }>;
    hiddenFields?: ImmutableArray<string> | ImmutableObject<{
        [dataSourceId: string]: string[];
    }>;
    isDataSourceDropDownHidden?: boolean;
    isSearchInputHidden?: boolean;
    isSelectedFromRepeatedDataSourceContext?: boolean;
    useDropdown?: boolean;
    isMultiple?: boolean;
    placeHolder?: string;
    dropdownProps?: SelectProps;
    widgetId?: string;
    useSelectionDataView?: boolean;
    usePopulatedDataView?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (allSelectedFields: IMFieldSchema[], ds: DataSource, isSelectedFromRepeatedDataSourceContext: boolean) => void;
    getDefaultField?: (field: IMFieldSchema | {
        [dataSourceId: string]: IMFieldSchema;
    }) => void;
}
interface ExtraProps {
    intl: IntlShape;
    theme: IMThemeVariables;
}
declare class _FieldSelectorInner extends React.PureComponent<FieldSelectorInnerProps & ExtraProps, State> {
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: FieldSelectorInnerProps, prevState: State): void;
    getWhetherArrayIsShallowEqual: (arr1: any[], arr2: any[]) => boolean;
    getDefaultSelectedDs: (dataSources: DataSource[], selectedFields: Immutable.ImmutableArray<string> | Immutable.ImmutableObject<{
        [dataSourceId: string]: string[];
    }>) => DataSource;
    hasSelectedFields: () => boolean;
    /**
     * If have selected fields,
     */
    getDsFromSelectedFieldsAndUseDss: (dataSources: DataSource[], selectedFields: Immutable.ImmutableArray<string> | Immutable.ImmutableObject<{
        [dataSourceId: string]: string[];
    }>) => DataSource;
    getDefaultFieldFromDs(dataSources: DataSource[], selectedFields: ImmutableArray<string> | ImmutableObject<{
        [dataSourceId: string]: string[];
    }>): IMFieldSchema | {
        [dataSourceId: string]: IMFieldSchema;
    };
    getOneDefaultFieldFromDs(ds: DataSource): IMFieldSchema;
    getAreFromMultipleDss: (dataSources: DataSource[], selectedFields: Immutable.ImmutableArray<string> | Immutable.ImmutableObject<{
        [dataSourceId: string]: string[];
    }>) => boolean;
    getDsLabel: (ds: ImmutableObject<DataSource> | DataSource) => string;
    getSelectedFields: (selectedDs: DataSource, dataSources: DataSource[], selectedFields: Immutable.ImmutableArray<string> | Immutable.ImmutableObject<{
        [dataSourceId: string]: string[];
    }>, isMultiple: boolean) => ImmutableArray<string>;
    getSelectedUseDataSource: () => IMUseDataSource;
    getWhetherJimuNameIsInHiddenFields: (jimuName: string) => boolean;
    getFieldsFromSchema: (schema: IMDataSourceSchema, notUseFilter?: boolean) => Immutable.ImmutableObject<{
        [jimuName: string]: FieldSchema;
    }>;
    getUseDataSources: (dataSources: DataSource[]) => ImmutableArray<UseDataSource>;
    onSelectedUseDsChange: (useDataSource: IMUseDataSource, isSelectedFromRepeatedDataSourceContext: boolean) => void;
    onSearchChange: (e: any) => void;
    onFieldClick: (f: IMFieldSchema) => void;
    onSelectedFieldsChange: (f: IMFieldSchema, selectedDs: DataSource, dataSources: DataSource[], selectedFields: Immutable.ImmutableArray<string> | Immutable.ImmutableObject<{
        [dataSourceId: string]: string[];
    }>, isSelectedFromRepeatedDataSourceContext: boolean, isMultiple: boolean) => void;
    render(): JSX.Element;
}
export declare const FieldSelectorInner: React.FC<import("react-intl").WithIntlProps<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<FieldSelectorInnerProps & ExtraProps & React.RefAttributes<_FieldSelectorInner>, "theme">>>> & {
    WrappedComponent: React.ComponentType<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<FieldSelectorInnerProps & ExtraProps & React.RefAttributes<_FieldSelectorInner>, "theme">>>;
};
export {};
