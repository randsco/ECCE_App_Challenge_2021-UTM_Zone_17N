/// <reference types="react" />
import { React } from 'jimu-core';
import { PopperCoreProps, Modifiers } from './core';
import { TargetType } from './utils';
import { PopperChildrenProps } from './children';
export declare const ArrowSize = 12;
export interface _PopperProps extends Omit<PopperChildrenProps, 'onMouseDown' | 'onDrag' | 'children'> {
    /**
     * Reference node used to set the position of popper
     */
    reference: TargetType;
    /**
     * Default: false
     *
     * Whether to show arrow of popper
     *
     * Notice:  Will ignore the arrow in modifiers
     */
    showArrow?: boolean;
    /**
     * If `true`, the popper is visible.
     */
    open: boolean;
    /**
     * A ref that points to the used popper instance.
     */
    children: React.ReactNode;
    /**
     * The offset modifier can shift your popper on both its axis.
     * To learn how to use offset, [modifiers.offset documentation](https://popper.js.org/docs/v2/modifiers/popper-offsets/).
     *
     * Notice: If you set the specified offset, we will ignore the offset in modifiers
     */
    offset?: number[];
    /**
     * @ignore
     *
     * A CSS selectors (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
     *
     * Clicking on the nodes found by toggleSelector will not trigger the toggle function
     */
    toggleSelector?: string;
    /**
     * Callback fired when you click on an area outside popper
     */
    toggle?: (evt?: React.MouseEvent<any> | React.TouchEvent<any>) => any;
    /**
     * @ignore
     *
     * Whether to flip placement (Only valid for RTL)
     */
    flipPlacement?: boolean;
    /**
     * @ignore
     *
     * When this value changes, will recalculate the position.
     * If floating is true, will reuse the latest calculated position of Popper as the position of floating panel
     */
    version?: number;
    /**
     * @ignore
     * If `true`, hide popper instead of uninstall it
     */
    keepMount?: boolean;
}
export declare type PopperProps = _PopperProps & Omit<PopperCoreProps, 'reference' | 'children' | 'version'>;
export declare const useOffsetModifiers: (offset: number[], modifiers: Modifiers, showArrow: boolean) => Modifiers;
export declare const useFloatingModifiers: (modifiers: Modifiers, floating: boolean) => Modifiers;
export declare const useToggleEvent: (open: boolean, reference: TargetType, toggleSelector: string, popperNodeRef: React.RefObject<HTMLDivElement>, callback: (evt: React.MouseEvent<HTMLElement>) => void) => void;
/**
 *  A react component for positioning, popper relies on the 3rd party library [Popperjs](https://github.com/popperjs/popper-core).
 */
export declare const _Popper: React.MemoExoticComponent<(props: PopperProps) => JSX.Element>;
/**
 * A react component for positioning, popper relies on the 3rd party library [Popperjs](https://github.com/popperjs/popper-core).
 */
export declare const Popper: React.ComponentType<PopperProps>;
