/// <reference types="react" />
import { React, ImmutableArray, IntlShape, UseDataSource } from 'jimu-core';
import { IMLinkParam } from '../../types';
/**
 * The LinkSettingPopup props
 */
export interface LinkSettingPopupProps {
    /**
     * The setting result
     */
    linkParam?: IMLinkParam;
    /**
     * Callback when cancel setting
     */
    onSettingCancel?: () => void;
    /**
     * Callback when confirm setting
     */
    onSettingConfirm?: (linkParam: IMLinkParam) => void;
    /**
     * Whether to show the setting popup
     */
    isOpen: boolean;
    /**
     * @ignore
     * @deprecated
     * Same with `isOpen`
     */
    showDialog: boolean;
    /**
     * @ignore
     */
    intl: IntlShape;
    /**
     * Use widget id to get widget context, e.g. whether widget is in repeated data source context.
     */
    widgetId?: string;
    /**
     * @ignore
     */
    isLinkPageSetting?: boolean;
    /**
     * @ignore
     */
    useDataSources?: ImmutableArray<UseDataSource>;
    /**
     * The popup shows next to left panel of builder or right panel of builder
     */
    pisition?: 'right' | 'left';
    /**
     * The title of the popup
     */
    title?: string;
}
/**
 * A component to set link, such as link to a view, a page or url
 */
export declare const LinkSettingPopup: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>, "theme">>;
