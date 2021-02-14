/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { NavButtonGroupProps } from '../nav-button-group';
interface _ScrollListProps extends NavButtonGroupProps {
    /**
     * The duration of the animation when scrolling
     */
    duration?: number;
    /**
     * If `true`, hide scroll arrows on both sides
     */
    hideArrow?: boolean;
    /**
     * If `true`, when scrolling to the start or end point, hide the corresponding arrow
     */
    autoArrow?: boolean;
    /**
     * A set of react elements that need to be scrolled
     */
    items: React.ReactElement[];
}
export declare type ScrollListProps = Omit<_ScrollListProps, 'hideArrow'>;
export declare const _ScrollList: (props: _ScrollListProps) => JSX.Element;
export declare const ScrollList: (props: ScrollListProps) => JSX.Element;
export {};
