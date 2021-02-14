/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { IItem } from '@esri/arcgis-rest-types';
export interface DataBadgeProps {
    /**
     * Portal [item](https://developers.arcgis.com/rest/users-groups-and-items/item.htm).
     */
    item?: IItem;
    /**
     * If do not have item info, pass in item id and portal url, will fetch item info use them.
     */
    itemId?: string;
    portalUrl?: string;
    /**
     * If use a service, pass in service url instead of item.
     */
    url?: string;
    /**
     * @ignore only used by theme
     */
    className?: string;
}
export declare const DataBadge: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>>;
export default DataBadge;
