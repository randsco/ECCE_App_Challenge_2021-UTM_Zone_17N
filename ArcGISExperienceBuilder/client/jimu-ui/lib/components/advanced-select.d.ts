/// <reference types="react" />
/** @jsx jsx */
import { React, DataSource, IMFieldSchema, IntlShape, CodedValue, ClauseValuePair, DataSourceManager, ImmutableArray, ReactRedux } from 'jimu-core';
import { DropdownButtonProps } from './dropdown-button';
import { DropdownMenuProps } from './dropdown-menu';
interface AdvancedSelectProps {
    field: IMFieldSchema;
    dataSource: DataSource;
    values?: ImmutableArray<ClauseValuePair>;
    excludeValues?: ImmutableArray<ClauseValuePair>;
    isEmptyOptionHidden?: boolean;
    onChange: (valueObj: ClauseValuePair[]) => void;
    pageSize?: number;
    isMultiple?: boolean;
    codedValues?: CodedValue[];
    sql?: string;
    style?: React.CSSProperties;
    className?: string;
    /**
     * Defines the size of the dropdown button. The button will take the default size if the value is `undefined`.
     * @default "default"
     */
    size?: 'default' | 'sm' | 'lg';
    /**
     * Whether to put the select options panel to body
     */
    appendToBody?: boolean;
    /**
     * Control multi-select's z-index,
     * but if appendToBody is true, it'll be invalid
     */
    zIndex?: number;
    /**
     * if `true`, the dropdown will take the full width of its parent container.
     */
    fluid?: boolean;
    /**
     * Applies to the internal DropdownButton component, except `size` property.
     * @see {@link DropdownButtonProps} for details.
     */
    buttonProps?: Omit<DropdownButtonProps, 'size'>;
    /**
     * Applies to the internal DropdownMenu component.
     * @see {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
    isOpen?: boolean;
    toggle?: (isOpen?: boolean) => void;
}
interface IntlProps {
    intl: IntlShape;
}
interface DatasourceProps {
    datasourceInfo: any;
    datasourceBelongInfo: any;
}
interface AdvancedSelectState {
    loaded: boolean;
    isNumberField: boolean;
    isSelectedListShown: boolean;
    isOpen: boolean;
    pageSize: number;
    currentList: any[];
    queryMode: QueryMode;
    count: number;
    page: number;
    list: any[];
    searchCount: number;
    searchPage: number;
    searchList: any[];
    sql: string;
    codedvalues: CodedValue[];
}
declare enum QueryMode {
    Remote = "REMOTE",
    LocalBySearch = "LOCAL_BY_SEARCH",
    RemoteBySearch = "REMOTE_BY_SEARCH"
}
export declare class _AdvancedSelectInner extends React.PureComponent<AdvancedSelectProps & IntlProps & DatasourceProps, AdvancedSelectState> {
    _isMounted: boolean;
    dsManager: DataSourceManager;
    dataSource: DataSource;
    dataSourceForSearch: DataSource;
    buttonRef: any;
    searchRef: any;
    modifiers: any;
    fieldLength: number;
    isHosted: boolean;
    listRef: HTMLDivElement;
    localDsRandomId: string;
    isRTL: boolean;
    static contextType: React.Context<import("./query-scope-context").QueryScopeContextProps>;
    static count: number;
    constructor(props: any);
    getSqlByCascadeAndExcludedValues: () => string;
    getIncludedCodedValues: () => CodedValue[];
    i18nMessage: (id: string, values?: any) => string;
    componentDidMount(): void;
    componentWillUnmount(): void;
    createDatasources: () => void;
    destroyDatasources: () => void;
    componentDidUpdate(prevProps: AdvancedSelectProps & DatasourceProps, prevStates: AdvancedSelectState): void;
    updateCount: () => void;
    updateList: (page?: number) => void;
    updateSearchCount: (sql: string) => void;
    updateSearchList: (sql?: string, page?: number) => void;
    getKeyWhere: () => string;
    stopPropagation: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onTogglePopper: (evt: any) => void;
    isItemChecked: (value: any) => boolean;
    onItemClick: (item: ClauseValuePair, willActive: boolean) => void;
    onScroll: (e: any) => void;
    loadNextPageData: () => void;
    loadMoreData: () => void;
    onTextChange: (value: any) => void;
    isDataEmpty: () => boolean;
    isSearchMoreBtnShown: () => boolean;
    getSelectLabel: () => string;
    showSelectedList: (isShown: boolean) => void;
    unCheckAll: () => void;
    getDropdownMenuStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const _AdvancedSelect: ReactRedux.ConnectedComponent<typeof _AdvancedSelectInner, Pick<React.ClassAttributes<_AdvancedSelectInner> & AdvancedSelectProps & IntlProps & DatasourceProps, "size" | "values" | "ref" | "style" | "zIndex" | "className" | "onChange" | "key" | "intl" | "toggle" | "fluid" | "isOpen" | "buttonProps" | "menuProps" | "dataSource" | "codedValues" | "sql" | "isMultiple" | "appendToBody" | "pageSize" | "field" | "excludeValues" | "isEmptyOptionHidden"> & AdvancedSelectProps>;
export declare const AdvancedSelect: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<AdvancedSelectProps & IntlProps>>>;
export {};
