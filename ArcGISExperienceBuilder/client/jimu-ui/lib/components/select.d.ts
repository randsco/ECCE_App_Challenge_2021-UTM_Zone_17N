/// <reference types="react" />
import { React } from 'jimu-core';
import { DropdownProps } from './dropdown';
import { DropdownButtonProps } from './dropdown-button';
import { DropdownMenuProps } from './dropdown-menu';
import { DropdownItemProps } from './dropdown-item';
/**
 * Props for the `Select` component.
 */
export interface SelectProps extends Omit<DropdownProps, 'value' | 'defaultValue'> {
    /**
     * Default input element value. It is used when the component is not controlled.
     */
    defaultValue?: string | number;
    /**
     * Input element value. It is used to display value when the component is controlled.
     */
    value?: string | number;
    /**
     * HTML attribute passed to the `button` node.
     */
    name?: string;
    /**
     * Indicates the placeholder text.
     */
    placeholder?: string;
    /**
     * If it is `true`, the first option will be selected by default.
     */
    useFirstOption?: boolean;
    /**
     *  Exploiting properties from the internal DropdownButton component, except the property 'size'.
     * @see {@link DropdownButtonProps} for details.
     */
    buttonProps?: Omit<DropdownButtonProps, 'size'>;
    /**
     * Exploiting properties from the internal DropdownMenu component.
     * @see {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
    /**
     * Callback fired when the value is changed.
     */
    onChange?: (evt: any, item?: React.ReactElement<DropdownItemProps>) => void;
}
/**
 * The unstyled Select component.
 * Please use {@link Select} instead.
 */
export declare const _Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLInputElement>>;
/**
 * Props of the `Option` component embedded in the Select component.
 */
export interface SelectOptionProps extends DropdownItemProps {
    /**
     * The option value.
     */
    value?: string | number;
}
/**
 * The unstyled Option component.
 * Please use {@link Option} instead.
 */
export declare const _Option: React.ForwardRefExoticComponent<Pick<SelectOptionProps, string | number> & React.RefAttributes<HTMLElement>>;
/**
 * Select component is used to select an option from a dropdown menu.
 *
 * #### Example:
 * ```typescript
 * import { Select, Option } from 'jimu-ui';
 * <Select placeholder="Please select...">
 *   <Option header>Option 1</Option>
 *   <Option header>Option 2</Option>
 *   <Option divider />
 *   <Option value="4">Option 3</Option>
 * </Select>
 * ```
 * #### Props:
 * See {@link SliderProps} for more details.
 */
export declare const Select: React.ComponentType<SelectProps & React.RefAttributes<HTMLInputElement>>;
/**
 * The options of the dropdown menu in the Select component.
 *
 * See {@link Select} for its usage.
 *
 * #### Props:
 * See {@link SelectOptionProps} for more details.
 */
export declare const Option: React.ComponentType<Pick<SelectOptionProps, string | number> & React.RefAttributes<HTMLElement>>;
