/// <reference types="react" />
import { React } from 'jimu-core';
import { TextAlignValue } from '../types';
export declare type SubNavMode = 'static' | 'dropdown' | 'foldable';
/**
 * Props for the `Nav` component.
 */
export interface NavProps {
    /**
     * Indicates whether this is a part of a Navbar component.
     */
    navbar?: boolean;
    /**
     * If it is `true`, the component will show in a "tabs" style.
     */
    tabs?: boolean;
    /**
     * If it is `true`, the component will show in a "pills" style.
     */
    pills?: boolean;
    /**
     * If it is `true`, the component will show in an "underline" style.
     */
    underline?: boolean;
    /**
     * If it is `true`, the content (NavItems) will be positioned vertically.
     */
    vertical?: boolean | string;
    /**
     * If it is `true`, the content (NavItems) will be positioned vertically.
     */
    justified?: boolean;
    /**
     * If `true`, the component will fill the width of its parent container.
     */
    fill?: boolean;
    /**
     * HTML element used for the component.
     *
     * @default "ul"
     */
    tag?: React.ReactType;
    /**
     * CSS class names appended to the component container.
     */
    className?: string;
    /**
     * CSS style properties applied to the component container.
     */
    style?: React.CSSProperties;
    right?: boolean;
    /**
     * Defines the gap between NavItems.
     */
    gap?: string;
    /**
     * Defines text alignment for the content of NavItems.
     */
    textAlign?: TextAlignValue;
    /**
     * Defines how the submenu is opened:
     * - `static`: Directly show the content of the submenu after its parent nav item.
     * - `dropdown`: Open the submenu in a dropdown.
     * - `foldable`: Open the submenu in a expandable panel.
     *
     * @default "dropdown"
     */
    submenuMode?: SubNavMode;
    /**
     * Defines the action for opening the menu.
     *
     * @default "click"
     */
    menuOpenMode?: 'click' | 'hover';
}
/**
 * The unstyled Nav component.
 * Please use {@link Nav} instead.
 */
export declare class _Nav extends React.PureComponent<NavProps> {
    static defaultProps: NavProps;
    constructor(props: any);
    render(): JSX.Element;
}
/**
 * A navigation component that can link to external or internal pages.
 *
 * Please use this component combining with NavItem, NavLink and NavMenu(if a sub menu is needed).
 *
 * #### Example:
 * ```typescript
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
 * See {@link NavProps} for more details.
 */
export declare const Nav: React.ComponentType<NavProps>;
