/// <reference types="react" />
import { React, IconResult } from 'jimu-core';
import { IconButtonStyles, IconButtonStylesByState } from './navigation';
export interface NavIconButtonGroupVariant {
    root?: IconButtonStyles;
    item?: IconButtonStylesByState;
}
export declare type NavIconButtonGroupVariants = {
    [key in NavButtonGroupType]?: NavIconButtonGroupVariant;
};
export interface NavIconButtonGroup {
    variants?: NavIconButtonGroupVariants;
}
export declare type NavButtonGroupType = 'default' | 'primary' | 'tertiary';
export interface NavButtonGroupProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Display components vertically or not
     */
    vertical?: boolean;
    /**
     * Be invoked when click on `previous` or `next` button
     */
    onChange?: (previous: boolean) => void;
    /**
     * If `true`, disable `next` button
     */
    disableNext?: boolean;
    /**
     * If `true`, disable `previous` button
     */
    disablePrevious?: boolean;
    /**
     * The type of `previous` and `next` button
     */
    type?: NavButtonGroupType;
    /**
     * If `true`, display the button as a circle
     */
    circle?: boolean;
    /**
     * The icon of `previous` button
     */
    previousIcon?: IconResult;
    /**
     * The icon of `next` button
     */
    nextIcon?: IconResult;
    /**
     * The text of `previous` button
     */
    previousText?: string;
    /**
     * The title of `previous` button
     */
    previousTitle?: string;
    /**
     * The text of `next` button
     */
    nextText?: string;
    /**
     * The title of `next` button
     */
    nextTitle?: string;
    /**
     * The style of `previous` button
     */
    previousStyle?: any;
    /**
     * The style of `next` button
     */
    nextStyle?: any;
}
export declare const _NavButtonGroup: (props: NavButtonGroupProps) => JSX.Element;
export declare const NavButtonGroup: React.ComponentType<NavButtonGroupProps>;
