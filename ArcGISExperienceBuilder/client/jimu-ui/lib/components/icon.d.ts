/// <reference types="react" />
import { React } from 'jimu-core';
/** The type of icon prop in Icon component. */
export declare type IconType = any;
/**
 * Props for the `Icon` component.
 */
export interface SVGIconProps {
    /**
     * The svg icon object. For example: `require('path.to.icon.svg')`
     */
    icon: IconType;
    /**
     * Defines the size, both width and height, of the icon.
     * @default 16
     */
    size?: number | string;
    /**
     * Customizes the width of the icon.
     * `size` property will be ignored.
     */
    width?: number | string;
    /**
     * Customizes the height of the icon.
     * `size` property will be ignored.
     */
    height?: number | string;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Defines the inline CSS style properties.
     */
    style?: React.CSSProperties;
    /**
     * Defines the `fill` color of the icon.
     * Only effective when the icon is an svg element and the `fill` property on its children are unset or set to `currentColor`.
     */
    color?: string;
    /**
     * Rotates the icon by a given degree.
     */
    rotate?: number | string;
    /**
     * Flips the icon, horizontal or vertical.
     */
    flip?: 'horizontal' | 'vertical';
    /**
     * Extra options:
     * `currentColor`: if set to `true`, the `stroke` and `fill` properties on the child elements will be replaced with `currentColor`,
     * in order to make `color` property effective.
     */
    options?: {
        currentColor?: boolean;
    };
    /**
     * Flips the icon automatically, if the locale is following right-to-left (RTL).
     */
    autoFlip?: boolean;
    /**
     * The title of the icon.
     */
    title?: string;
}
interface SVGIconState {
    iconSrc: IconType;
}
/**
 * The unstyled Icon component.
 * Please use {@link Icon} instead.
 */
export declare class _Icon extends React.PureComponent<SVGIconProps, SVGIconState> {
    svgUrlTester: RegExp;
    __unmount: boolean;
    static defaultProps: Partial<SVGIconProps>;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: SVGIconProps): void;
    componentWillUnmount(): void;
    fetchSvgByUrl: (url: string) => Promise<string>;
    isIconFromUrl(iconSrc: IconType): boolean;
    extractSvgSrc(iconSrc: IconType): any;
    render(): JSX.Element;
}
/**
 * Icon component is designed for svg icons display, but also supports icon display of other formats meanwhile.
 * SVG icons are shown as inline SVG elements in the component, while icons in other formats can be loaded using data url.
 *
 * #### Example:
 * ```typescript
 * import { Icon } from 'jimu-ui';
 * const addIcon = require('jimu-ui/lib/icons/add.svg');
 * <Icon icon={addIcon} size="36" color="red" />
 * ```
 * #### Props:
 * See {@link SVGIconProps} for more details.
 */
export declare const Icon: React.ComponentType<SVGIconProps>;
export {};
