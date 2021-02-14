/// <reference types="react" />
/** @jsx jsx */
import { LinkResult, ThemeNavType, IconResult, ThemeBoxStyles, Color, ImmutableArray } from 'jimu-core';
import { NavProps } from './nav';
import { IconPosition, BoxShadowStyle } from '../types';
import { LinkTarget } from './link';
export declare type IconButtonStyles = Omit<ThemeBoxStyles, 'shadow'> & {
    icon?: {
        size?: string;
        color?: Color;
    };
    size: string;
    shadow: BoxShadowStyle;
};
export interface IconButtonStylesByState {
    default?: IconButtonStyles;
    hover?: IconButtonStyles;
    active?: IconButtonStyles;
    disabled?: IconButtonStyles & {
        opacity?: number;
    };
    focus?: IconButtonStyles;
}
export interface NavigationVariant {
    root?: IconButtonStyles;
    item?: IconButtonStylesByState;
}
export interface NavigationItem extends LinkResult {
    name?: string;
    icon?: IconResult;
    target?: LinkTarget;
    subs?: NavigationItem[];
}
export interface NavigationProps extends Omit<NavProps, 'vertical'> {
    vertical?: boolean;
    isActive?: (value: NavigationItem) => boolean;
    data?: NavigationItem[] | ImmutableArray<NavigationItem>;
    type?: ThemeNavType;
    scrollable?: boolean;
    showText?: boolean;
    showIcon?: boolean;
    showTitle?: boolean;
    /**
     * Alternate icons are enabled only when `showIcon` is `true `and no icon is defined in `data[i]`
     */
    alternateIcon?: IconResult;
    /**
      * Active icon will be enabled when item is actived
      */
    activedIcon?: IconResult;
    iconPosition?: IconPosition;
}
export declare const useNavMenuStyle: (gap: string) => import("jimu-core").SerializedStyles;
export declare const Navigation: (props: NavigationProps) => JSX.Element;
