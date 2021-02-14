/// <reference types="react" />
import { React } from 'jimu-core';
import { Modifiers } from './popper';
/**
 * Props for the `DropdownMenu` component.
 *
 * Inherits properties from the `HTMLElement`.
 *
 * See [additional props available from HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
 */
export interface DropdownMenuProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Whether to put dropdown menu to body by ReactDOM.createPortal
     *
     * @default true
     */
    appendToBody?: boolean;
    /**
     * Left align, right align, or center align the menu to its container.
     */
    alightment?: 'start' | 'end' | 'center';
    /**
     * `modifier` options from Popper.js.
     * @see [the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
     */
    modifiers?: Modifiers;
    /**
     * If `true`, the menu will show an arrow pointer.
     */
    showArrow?: boolean;
    /**
     * If `true`, the placement of the menu will be flipped in right-to-left (RTL) mode.
     *
     * @default true
     */
    flip?: boolean;
    /**
     * Custom html element to be used as a menu's container.
     *
     * @default "div"
     */
    tag?: React.ElementType;
    /**
     * Custom z-index CSS property.
     * Effective only when `appendTo` is `parent`.
     */
    zIndex?: string;
    /**
     * Custom max-height CSS property.
     * The unit is pixel.
     */
    maxHeight?: number;
    /**
     * The offset modifier to shift the dropdown menu on both its axis.
     * To learn how to use offset, [modifiers.offset documentation](https://popper.js.org/docs/v2/modifiers/popper-offsets/).
     */
    offset?: number[];
}
/**
 * The unstyled version of the DropdownMenu component.
 * Please use {@link DropdownMenu} instead.
 */
export declare class _DropdownMenu extends React.PureComponent<DropdownMenuProps> {
    static defaultProps: DropdownMenuProps;
    static contextType: React.Context<{}>;
    render(): JSX.Element;
}
/**
 * A menu container of a dropdown control. It displays a list of options on a temporary popper component.
 *
 * Please use this component together with Dropdown, DropdownButton and DropdownItem.
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
 * See {@link DropdownMenuProps} for more details.
 */
export declare const DropdownMenu: React.ComponentType<DropdownMenuProps>;
