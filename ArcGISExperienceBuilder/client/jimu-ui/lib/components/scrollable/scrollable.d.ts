/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
interface ScrollableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * The duration of the animation when scrolling
     */
    duration?: number;
    /**
     * Scrollable horizontally or not
     */
    horizontal?: boolean;
    /**
     * When version changed, update the topping and bittoming state
     */
    version?: number;
}
export interface ScrollableRefProps {
    scrollable: boolean;
    scroll?: (previous: boolean) => void;
    topping?: boolean;
    bottoming?: boolean;
    ref?: React.RefObject<HTMLDivElement>;
}
export declare const Scrollable: React.ForwardRefExoticComponent<ScrollableProps & React.RefAttributes<ScrollableRefProps>>;
export {};
