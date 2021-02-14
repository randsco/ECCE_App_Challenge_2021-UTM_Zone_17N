/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableArray } from 'jimu-core';
import { DropdownMenuProps } from './dropdown-menu';
import { DropdownButtonProps } from './dropdown-button';
/**
 * The MultiSelectItem object
 */
export interface MultiSelectItem {
    /**
     * Identity value of the item
     */
    value: string | number;
    /**
     * Label assigned for the item
     */
    label: string;
    /**
     * Customize the content using the callback function
     */
    render?: (item: MultiSelectItem) => any;
}
/**
 * The multi-select component props
 */
export interface MultiSelectProps {
    /**
     * Options for selecting. and the contents of each option
     * can be customized by rendering method
     * @see {@link MultiSelectItem} for details.
     */
    items: ImmutableArray<MultiSelectItem>;
    /**
     * Selected values array
     */
    values?: ImmutableArray<string | number>;
    /**
     * The values of the items selected by default
     */
    defaultValues?: ImmutableArray<string | number>;
    /**
     * add a class name for multi-select
     */
    className?: string;
    /**
     * The hint text displayed when the input is empty
     */
    placeHolder?: string;
    /**
     * Whether to put the selected items to body
     */
    appendToBody?: boolean;
    /**
     * Defines the size of the dropdown button. The value will be 'default' when it is undefined.
     * @default "default"
     */
    size?: 'default' | 'sm' | 'lg';
    /**
     * if it is `true`, the dropdown will fill the width of its parent container.
     */
    fluid?: boolean;
    /**
     * Control multi-select's z-index,
     * but if the value of appendTo is "body", it'll be invalid
     */
    zIndex?: number;
    /**
     * Exploiting properties from the internal DropdownMenu component.
     * @see {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
    /**
     * Exploiting properties from the internal DropdownButton component, except the property 'size'.
     * @see {@link DropdownButtonProps} for details.
     */
    buttonProps?: Omit<DropdownButtonProps, 'size'>;
    /**
     *  Display the result text in the input box. Examples of the result texts are as "label1, label2, label3..."
     * */
    displayByValues?: (values: Array<string | number>) => string;
    /**
     * Callback fired when the item is clicked.
     */
    onClickItem?: (evt: React.MouseEvent, value: string | number, selectedValues: Array<string | number>) => void;
}
/**
 * Multiple select
 * @see {@link MultiSelectProps} for details
 */
export declare const MultiSelect: React.ComponentType<MultiSelectProps>;
