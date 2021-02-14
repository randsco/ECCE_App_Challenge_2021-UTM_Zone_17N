/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, IntlShape, ImmutableArray } from 'jimu-core';
import { ISearchOptions } from '@esri/arcgis-rest-portal';
import { ItemTypes, ItemCategory, SortField, SortOrder, IItemWithPortalUrl } from '../../types';
/**
 * The ItemSelector props
 */
export interface ItemSelectorProps {
    portalUrl: string;
    itemType: ItemTypes | ImmutableArray<ItemTypes>;
    className?: string;
    /**
     * Sort field
     */
    sortField?: SortField;
    /**
     * Sort order
     */
    sortOrder?: SortOrder;
    /**
     * Selected items
     */
    selectedItems?: IItemWithPortalUrl[];
    /**
     * One item may contain multiple data sources, items in the array mean that some of data sources in the item are selected
     */
    partSelectedItems?: IItemWithPortalUrl[];
    searchValue?: string;
    /**
     * Can only select at most one item
     */
    isRadio?: boolean;
    /**
     * My content, my organization, my group or public
     */
    category?: ItemCategory;
    /**
     * Only list items in the folder, only works when category is my content,
     * list all items from my content if the value is null or undefined
     */
    folderId?: string;
    /**
     * Only list items in these groups, only works when category is my group,
     * list all items from all my groups if the value is null or undefined
     */
    groupId?: string;
    /**
     * Return the position item detial popup should be in
     */
    getDetailPosition?: () => {
        t: string;
        b: string;
        l: string;
        r: string;
        h: string;
        w: string;
    };
    /**
     * Callback when click one item to select it
     */
    onSelect?: (allSelectedItems: IItemWithPortalUrl[], latestSelectedItem?: IItemWithPortalUrl) => void;
    /**
     * Callback when click one item co unselect it
     */
    onRemove?: (allSelectedItems: IItemWithPortalUrl[], latestRemovedItem?: IItemWithPortalUrl) => void;
}
interface State {
    loaded: boolean;
    items: IItemWithPortalUrl[];
    showDetailItem: IItemWithPortalUrl;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
export declare class _ItemSelector extends React.PureComponent<ItemSelectorProps & ExtraProps, State> {
    __unmount: boolean;
    pageStart: number;
    pageSize: number;
    contentNode: HTMLDivElement;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ItemSelectorProps, prevState: State): void;
    componentWillUnmount(): void;
    isItemTypeSame(prevItemType: ItemTypes | ImmutableArray<ItemTypes>, itemType: ItemTypes | ImmutableArray<ItemTypes>): boolean;
    getRealGroupIds(): string[];
    getAllGroupIds(): string[];
    setItems: (type: ItemTypes | ImmutableArray<ItemTypes>, sort: SortField, order: SortOrder, groupIds?: string[], folderId?: string, search?: string, isMore?: boolean) => void;
    getSearchRequestOptions: (type: ItemTypes | ImmutableArray<ItemTypes>, sort: SortField, order: SortOrder, livingAtlasGroupId?: string, groupIds?: string[], folderId?: string, search?: string, isMore?: boolean) => ISearchOptions;
    getPortalUrl: () => string;
    fetchLivingAtlasGroupId: () => Promise<string>;
    getWhetherItemSelected: (item: IItemWithPortalUrl) => boolean;
    getWhetherItemPartSelected: (item: IItemWithPortalUrl) => boolean;
    onScroll: (e: any) => void;
    onShowDetailClicked: (e: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => void;
    onCloseDetailClicked: () => void;
    onAddDataClicked: (e: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => void;
    onRemoveDataClicked: (e: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => void;
    render(): JSX.Element;
}
/**
 * A component to select portal [item](https://developers.arcgis.com/rest/users-groups-and-items/item.htm)
 */
export declare const ItemSelector: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>>;
export default ItemSelector;
