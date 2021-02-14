/// <reference types="react" />
import { React } from 'jimu-core';
import { LinkProps } from './link';
/**
 * Props for the `NavLink` component.
 */
export interface NavLinkProps extends LinkProps {
    /**
     * Custom html element to be used as the link element.
     *
     * @default "a"
     */
    tag?: React.ElementType;
    /**
     * If it is `true`, the component is disabled.
     */
    disabled?: boolean;
    /**
     * If it is `true`, the component will be highlighted to indicate an active state
     */
    active?: boolean;
    /**
     * Sets the value of the native `href` property on the \<a\> element, if this property is set, the `tag` progerty will be forced to use `a`.
     * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href)
     */
    href?: any;
    /**
     * Reference to the root html element.
     */
    innerRef?: React.Ref<HTMLButtonElement>;
    /**
     * Icon element to display in the content.
     */
    icon?: React.ComponentClass<React.SVGProps<SVGElement>> | string;
    /**
     * Defines the position of the icon element.
     */
    iconPosition?: 'start' | 'end' | 'above';
    /**
     * Defines the font-size of the icon element.
     */
    iconSize?: number;
    /**
     * If it is `true`, the component will show a pointer icon at the end of its content.
     */
    caret?: boolean;
    draggable?: boolean;
}
/**
 * The unstyled NavLink component.
 * Please use {@link NavLink} instead.
 */
export declare const _NavLink: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * NavLink component is usually used to provide navigation capability, when combining with NavItem component.
 *
 * Please use this component together with Nav, NavLink and NavMenu(if a sub menu is needed).
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
 * See {@link NavItemProps} for more details.
 */
export declare const NavLink: React.ComponentType<NavLinkProps & React.RefAttributes<HTMLButtonElement>>;
