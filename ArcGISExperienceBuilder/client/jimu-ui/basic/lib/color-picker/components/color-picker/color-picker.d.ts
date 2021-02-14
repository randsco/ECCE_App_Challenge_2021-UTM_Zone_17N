/// <reference types="react" />
/**@jsx jsx */
import { React } from 'jimu-core';
import { Placement, PopperProps } from 'jimu-ui';
import { PickerBlockProps } from '../color-components';
import { SketchStandardProps } from './sketch-standard';
interface _ColorPickerProps extends Omit<PickerBlockProps, 'onChange'> {
    /**
     * The color value of this component.
     */
    color?: string;
    /**
     * @ignore
     */
    popperProps?: Partial<Omit<PopperProps, 'placement' | 'showArrow' | 'offset'>>;
    /**
     * Default: bottom
     *
     * The placement of the pop-up of this component.
     */
    placement?: Placement;
    /**
     * Default: false
     *
     * Whether to show arrow of popper
     */
    showArrow?: boolean;
    /**
     * The offset modifier can shift your popper on both its axes.
     */
    offset?: number[];
    /**
     * Callback fired when the color is changed.
     */
    onChange?: (color: string) => void;
    /**
     * Callback fired when a picker block is clicked.
     */
    onClick?: (evt: React.MouseEvent<HTMLDivElement>) => void;
}
export declare type ColorPickerProps = _ColorPickerProps & SketchStandardProps;
/**
 *  A react component for choosing standard colors.
 */
export declare const ColorPicker: React.ForwardRefExoticComponent<_ColorPickerProps & SketchStandardProps & React.RefAttributes<unknown>>;
export {};
