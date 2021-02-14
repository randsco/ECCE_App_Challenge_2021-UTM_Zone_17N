/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { ControlPosition } from './draggable';
import { DraggableBounds } from 'react-draggable';
export declare type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface Size {
    width: number;
    height: number;
}
export interface ResizableProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onMouseDown'> {
    /**
     * Specifies movement boundaries. Accepted values:
     * - a selector, restricts movement within the targeted node
     * - An object with `left, top, right, and bottom` properties.
     *  These indicate how far in each direction the draggable
     *   can be moved.
     */
    bounds?: DraggableBounds | string | false;
    /**
     * Specifies the x and y that dragging should snap to.
     */
    grid?: [number, number];
    /**
     * If true, will not call any resize handlers.
     */
    disabled?: boolean;
    /**
     * Default: { width: 50, height: 50 }
     * The minWidth property is used to set the minimum size of a resizable component.
     */
    minSize?: Size;
    /**
     * Default: { width: 50, height: 50 }
     *
     * Specifies the width and height that the dragged item should start at.
     *
     * defaultSize will be ignored when size set.
     */
    defaultSize?: Size;
    /**
     * The size property is used to set the size of the component.
     * Use size if you need to control size state by yourself.
     */
    size?: Size;
    /**
     * Default: { left: 0, top: 0 }
     *
     * Specifies the left and top of component
     *
     * defaultPosition will be ignored when position set.
     */
    defaultPosition?: ControlPosition;
    /**
     * The size position is used to set the position of the component.
     * Use position if you need to control position state by yourself.
     */
    position?: ControlPosition;
    /**
     * Called when resizing starts.
     */
    onStart?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called while resizeing.
     */
    onResize?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called when resizeing stops.
     */
    onStop?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called whenever the user mouses down. Called regardless of handle or disabled status.
     */
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * Define resizer list
     */
    handles?: ResizeHandle[];
    /**
     * The className property is used to set the custom className of a resizable component.
     */
    className?: string;
    /**
     * The style property is used to set the custom style of a resizable component.
     */
    style?: any;
    /**
     * Render function or node.
     */
    children?: React.ReactNode | ((props: {
        size: Size;
        position?: ControlPosition;
    }) => React.ReactNode);
}
/**
 * A component for resizing
 */
export declare const Resizable: React.ComponentType<ResizableProps & React.RefAttributes<unknown>>;
