/// <reference types="react" />
import { React } from 'jimu-core';
import { PopperProps } from '../popper';
interface _TooltipProps extends Pick<PopperProps, 'showArrow' | 'placement' | 'modifiers'> {
    /**
      * If `true`, the popper is visible.
      */
    open?: boolean;
    /**
     * Tooltip reference element (Must be able to receive ref)
     */
    children: React.ReactElement;
    /**
     * Do not respond to focus events.
     */
    disableFocusListener?: boolean;
    /**
     * Do not respond to hover events.
     */
    disableHoverListener?: boolean;
    /**
     * Do not respond to long press touch events.
     */
    disableTouchListener?: boolean;
    /**
     * The number of milliseconds to wait before showing the tooltip.
     * This prop won't impact the enter touch delay (`enterTouchDelay`).
     */
    enterDelay?: number;
    /**
     * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
     */
    enterNextDelay?: number;
    /**
     * The number of milliseconds a user must touch the element before showing the tooltip.
     */
    enterTouchDelay?: number;
    /**
     * Makes a tooltip interactive, i.e. will not close when the user
     * hovers over the tooltip before the `leaveDelay` is expired.
     */
    interactive?: boolean;
    /**
     * The number of milliseconds to wait before hiding the tooltip.
     * This prop won't impact the leave touch delay (`leaveTouchDelay`).
     */
    leaveDelay?: number;
    /**
     * The number of milliseconds after the user stops touching an element before hiding the tooltip.
     */
    leaveTouchDelay?: number;
    /**
     * Callback fired when the component requests to be closed.
     *
     * @param {object} event The event source of the callback.
     */
    onClose?: (event: any) => void;
    /**
     * Callback fired when the component requests to be open.
     *
     * @param {object} event The event source of the callback.
     */
    onOpen?: (event: any) => void;
}
export declare type TooltipProps = _TooltipProps & React.HtmlHTMLAttributes<HTMLDivElement>;
export declare function testReset(): void;
export declare const _Tooltip: React.ForwardRefExoticComponent<_TooltipProps & React.HtmlHTMLAttributes<HTMLDivElement> & React.RefAttributes<unknown>>;
export declare const Tooltip: React.ComponentType<_TooltipProps & React.HtmlHTMLAttributes<HTMLDivElement> & React.RefAttributes<unknown>>;
export {};
