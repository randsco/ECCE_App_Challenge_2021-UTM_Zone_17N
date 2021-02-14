/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * Props for the `DropdownItem` component.
 *
 * Inherits properties from the `HTMLElement`.
 *
 * See [additional props available from HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
 */
export interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
    [key: string]: any;
    /**
     * If `true`, the component will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, the component will be displayed as a horizontal divider,
     * `div` element will be used by default and `onClick` event will be ignored in this case.
     */
    divider?: boolean;
    /**
     * Custom html element to be used as a button.
     * @default "button"
     */
    tag?: React.ReactType;
    /**
     * If `true`, the component will be displayed as a static header,
     * `h6` element will be used by default and `onClick` event will be ignored in this case.
     */
    header?: boolean;
    /**
     * Fire callback when the root element is clicked.
     */
    onClick?: (event: React.MouseEvent<any>) => void;
    /**
     * Sets value for the native `href` property of the \<a\> element.
     * If this property is set, the `tag` progerty will be forced to use `a`.
     * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href).
     */
    href?: string;
    /**
     * If `true`, the dropdown item will toggle the parent dropdown automatically when clicked.
     * @default true
     */
    toggle?: boolean;
    /**
     * If `true`, the dropdown item will be highlighted as active.
     */
    active?: boolean;
    rootRef?: React.Ref<HTMLElement>;
}
/**
 * The unstyled version of the DropdownItem component.
 * Please use {@link DropdownItem} instead.
 */
export declare const _DropdownItem: React.ForwardRefExoticComponent<Pick<DropdownItemProps, string | number> & React.RefAttributes<HTMLElement>>;
/**
 * A child element in a `DropdownMenu` component.
 *
 * Please use this component together with Dropdown, DropdownButton, and DropdownMenu.
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
 * See {@link DropdownItemProps} for more details.
 */
export declare const DropdownItem: React.ComponentType<Pick<DropdownItemProps, string | number> & React.RefAttributes<HTMLElement>>;
