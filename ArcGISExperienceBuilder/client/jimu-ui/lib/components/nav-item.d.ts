/// <reference types="react" />
import { React } from 'jimu-core';
import { NavItemProps as BSNavItemProps } from 'reactstrap/lib/NavItem';
import { SubNavMode } from './nav';
/**
 * Props for the `NavItem` component.
 *
 * Inherits properties from `HTMLElement`.
 *
 * See [additional props available from HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
 */
export interface NavItemProps extends BSNavItemProps {
    /**
     * If it is `true`, its submenu will be opened if any.
     */
    isOpen?: boolean;
    /**
     * Callback fired when the submenu is toggled.
     */
    onToggle?: (isOpen: boolean) => unknown;
    /**
     * Defines the opening direction of the submenu.
     */
    direction?: 'up' | 'down' | 'left' | 'right';
    /**
     * If it is `true`, the component is disabled.
     */
    disabled?: boolean;
}
interface NavItemState {
    isOpen?: boolean;
    anchor?: HTMLElement;
}
/**
 * The unstyled NavItem component.
 * Please use {@link NavItem} instead.
 */
export declare class _NavItem extends React.PureComponent<NavItemProps, NavItemState> {
    static contextType: React.Context<{}>;
    state: {
        isOpen: boolean;
        anchor: any;
    };
    constructor(props: any);
    toggle(e: any): void;
    setRef: (ref: HTMLElement) => void;
    getContextValue(): {
        ref: any;
        setRef: (ref: HTMLElement) => void;
        toggle: (e: any) => void;
        isOpen: boolean;
        isDropdown: any;
        direction: "left" | "right" | "up" | "down";
        textAlign: any;
        menuOpenMode: any;
        menuMode: SubNavMode;
    };
    render(): JSX.Element;
}
/**
 * The child element of a `Nav` component.
 *
 * Please use this component combining with Nav, NavLink and NavMenu(if a sub menu is needed).
 *
 * #### Example:
 * ```typescript
 * import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from 'jimu-ui';
 * import { Nav, NavItem, NavLink } from 'jimu-ui';
 * <Nav underline>
 *   <NavItem>
 *     <NavLink active>Home</NavLink>
 *   </NavItem>
 *   <NavItem>
 *     <NavLink>About</NavLink>
 *   </NavItem>
 * </Nav>
 * ```
 * #### Props:
 * See {@link NavItemProps} for more details.
 */
export declare const NavItem: React.ComponentType<NavItemProps>;
export {};
