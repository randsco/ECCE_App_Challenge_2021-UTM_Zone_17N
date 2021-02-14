/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { IItem } from '@esri/arcgis-rest-types';
/**
 * The ItemDetail props
 */
export interface ItemDetailProps {
    /**
     * Portal [item](https://developers.arcgis.com/rest/users-groups-and-items/item.htm)
     */
    item: IItem;
    portalUrl: string;
    style?: React.CSSProperties;
    className?: string;
    onClose: () => void;
}
/**
 * A component to show the detail of a portal [item](https://developers.arcgis.com/rest/users-groups-and-items/item.htm)
 */
export declare const ItemDetail: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>>;
export default ItemDetail;
