/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * Props for the `NavMenu` component.
 *
 * Inherits properties from `HTMLElement`.
 *
 * See [additional props available from HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
 */
interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Defines the target element that the menu should append to.
     *
     * @default "body"
     */
    appendToBody?: boolean;
    /**
     * Right align menu to its parent container.
     */
    right?: boolean;
    /**
     * `modifier` options from Popper.js.
     *
     * @see [the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
     */
    modifiers?: any;
    /**
     * if it is `true`, the menu will be flipped to right-to-left (RTL) mode.
     *
     * @default true
     */
    flip?: boolean;
    /**
     * Custom html element used as the container of the menu.
     *
     * @default "ul"
     */
    tag?: React.ElementType;
}
/**
 * The unstyled NavMenu component.
 * Please use {@link NavMenu} instead.
 */
export declare class _NavMenu extends React.PureComponent<NavMenuProps> {
    static defaultProps: NavMenuProps;
    static contextType: React.Context<{
        ref?: HTMLElement;
        setRef?: (ref: HTMLElement) => void;
        toggle?: (e: any) => void;
        isOpen?: boolean;
        isDropdow?: boolean;
        direction?: string;
        menuOpenMode?: string;
        menuMode?: string;
        textAlign?: "left" | "right" | "center";
    }>;
    constructor(props: any);
    onClick(e: any): void;
    onLeave(e: any): void;
    render(): JSX.Element;
}
/**
 * Add this component to the NavItem component to show a sub menu.
 *
 * Please use this component combining with NavItem, NavLink and NavMenu.
 *
 * #### Example:
 * ```typescript
 * import { Nav, NavItem, NavLink } from 'jimu-ui';
 * <Nav underline>
 *   <NavItem>
 *     <NavLink caret active>Home</NavLink>
 *     <NavMenu>
 *       <NavItem>
 *         <NavLink>Option 1</NavLink>
 *       </NavItem>
 *       <NavItem>
 *         <NavLink>Option 2</NavLink>
 *       </NavItem>
 *     </NavMenu>
 *   </NavItem>
 *   <NavItem>
 *     <NavLink>About</NavLink>
 *   </NavItem>
 * </Nav>
 * ```
 * #### Props:
 * See {@link NavMenuProps} for more details.
 */
export declare const NavMenu: React.ComponentType<NavMenuProps>;
export {};
