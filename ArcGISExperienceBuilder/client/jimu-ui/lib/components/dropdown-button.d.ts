/// <reference types="react" />
import { React } from 'jimu-core';
import { ButtonProps } from './button';
/**
 * Props for the `DropdownButton` component.
 */
export interface DropdownButtonProps extends ButtonProps {
    /**
     * If `true`, an arrow icon will be shown at the end of the button.
     * The icon can be customized by assigning the property with an element instead.
     */
    arrow?: boolean | React.ReactElement;
}
/**
 * The unstyled version of the DropdownButton component.
 * Please use {@link DropdownButton} instead.
 */
export declare class _DropdownButton extends React.PureComponent<DropdownButtonProps> {
    static contextType: React.Context<{}>;
    static defaultProps: Partial<DropdownButtonProps>;
    constructor(props: any);
    onClick(e: any): void;
    render(): JSX.Element;
}
/**
 * A button element in a `Dropdown` component to toggle the dropdown menu.
 *
 * Please use this component together with Dropdown, DropdownMenu and DropdownItem.
 *
 * #### Example:
 * ```typescript
 * import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from 'jimu-ui';
 * <Dropdown>
 *  <DropdownButton>Dropdown</DropdownButton>
 *  <DropdownMenu>
 *    <DropdownItem header>Header</DropdownItem>
 *    <DropdownItem disabled>Action</DropdownItem>
 *    <DropdownItem>Another Action</DropdownItem>
 *    <DropdownItem divider/>
 *    <DropdownItem>Another Action</DropdownItem>
 *  </DropdownMenu>
 * </Dropdown>
 * ```
 * #### Props:
 * See {@link DropdownButtonProps} for more details.
 */
export declare const DropdownButton: React.ComponentType<DropdownButtonProps>;
