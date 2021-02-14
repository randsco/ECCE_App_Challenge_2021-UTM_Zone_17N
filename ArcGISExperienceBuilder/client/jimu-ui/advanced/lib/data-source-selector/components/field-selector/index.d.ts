/// <reference types="react" />
import { React, IMFieldSchema, DataSource, ImmutableArray, ImmutableObject, JimuFieldType, UseDataSource } from 'jimu-core';
import { SelectProps } from 'jimu-ui';
/**
 * The FieldSelector props
 */
export interface FieldSelectorProps {
    /**
     * Data sources only supports feature layer.
     * If your data source is inited, please use `dataSources`, or use `useDataSources`.
     */
    useDataSources?: ImmutableArray<UseDataSource>;
    dataSources?: DataSource[];
    /**
     * Field type.
     */
    types?: ImmutableArray<JimuFieldType>;
    /**
     * Selected fields, use object when selected fields are from multiple data sources.
     */
    selectedFields?: ImmutableArray<string> | ImmutableObject<{
        [dataSourceId: string]: string[];
    }>;
    /**
     * Fields which should be hidden, use object when selected fields are from multiple data sources.
     */
    hiddenFields?: ImmutableArray<string> | ImmutableObject<{
        [dataSourceId: string]: string[];
    }>;
    /**
     * Whether or not to hide the data source dropdown, the dropdown is used to change the data source when multiple data sources are passed.
     */
    isDataSourceDropDownHidden?: boolean;
    /**
     * Whether or not to hide the search input, the input is used to filter fields.
     */
    isSearchInputHidden?: boolean;
    /**
     * Whether selected fields are from repeated data source context.
     */
    isSelectedFromRepeatedDataSourceContext?: boolean;
    /**
     * Whether or not to use dropdown to show the field list. If true, it will show dropdown, otherwise it will not use dropdown.
     */
    useDropdown?: boolean;
    /**
     * Whether or not to support multiple selection.
     */
    isMultiple?: boolean;
    /**
     * Placeholder for dropdown, if `useDropdown` is true.
     */
    placeHolder?: string;
    /**
     * Dropdown props, if `useDropdown` is true.
     */
    dropdownProps?: SelectProps;
    /**
     * Use widget id to get widget context, e.g., whether widget is in repeated data source context.
     */
    widgetId?: string;
    /**
     * Whether to use selection data view.
     */
    useSelectionDataView?: boolean;
    /**
     * Whether to use populated data view.
     */
    usePopulatedDataView?: boolean;
    /**
     * @ignore
     */
    className?: string;
    /**
     * @ignore
     */
    style?: React.CSSProperties;
    /**
     * Callback when selected fields change.
     */
    onChange?: (allSelectedFields: IMFieldSchema[], ds: DataSource, isSelectedFromRepeatedDataSourceContext: boolean) => void;
    /**
     * The function will be called once the component is mounted or when data sources are changed,
     * one field will be passed to it.
     */
    getDefaultField?: (field: IMFieldSchema | {
        [dataSourceId: string]: IMFieldSchema;
    }) => void;
}
/**
 * A component to select field from a data source.
 */
export declare class FieldSelector extends React.PureComponent<FieldSelectorProps, unknown> {
    render(): JSX.Element;
}
