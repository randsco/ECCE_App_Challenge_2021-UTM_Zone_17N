/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { Placement, PopperProps } from 'jimu-ui';
import { ColorItem, PickerBlockProps } from '../color-components';
export interface ThemeColorPickerProps {
    /**
    * @ignore
    */
    pickerBlockProps?: Partial<PickerBlockProps>;
    /**
    * @ignore
    */
    popperProps?: Partial<Omit<PopperProps, 'placement' | 'showArrow' | 'offset'>>;
    /**
     * The color value of this component.
     */
    value?: string;
    /**
     * Default: bottom
     *
     * The placement of the pop-up of this component.
     */
    placement?: Placement;
    /**
     * Default: true
     *
     * Whether to show arrow of popper
     */
    showArrow?: boolean;
    /**
     * The offset modifier can shift your popper on both its axes.
     */
    offset?: number[];
    /**
     * Callback fired when the value is changed.
     */
    onChange?: (color: string) => void;
    /**
     * Callback fired when a picker block is clicked.
     */
    onClick?: (evt: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * Predefined standard colors.
     */
    presetColors?: ColorItem[];
    /**
     * Default: true
     *
     * Indicates whether to display the colors of the organization shared theme.
     */
    showSharedColors?: boolean;
    /**
     * Default: The theme in the theme context
     *
     * The theme to get colors.
     */
    specificTheme?: ThemeVariables;
    /**
     * The className property is used to set the custom className of this component.
     */
    className?: string;
    /**
     * The style property is used to set the custom style of this component.
     */
    style?: React.CSSProperties;
    /**
     * If `true`, transparency is not allowed.
     */
    disableAlpha?: boolean;
}
/**
 * A react component for choosing standard colors and theme colors.
 */
export declare const ThemeColorPicker: (props: ThemeColorPickerProps) => JSX.Element;
