/// <reference types="react" />
import { React } from 'jimu-core';
import { Size, ResizeHandle } from './resizable';
import { ControlPosition } from './draggable';
import { DraggableBounds, DraggableEventHandler, PositionOffsetControlPosition } from 'react-draggable';
export declare const baseOverlayZindex = 1000;
export declare const useOverlayManager: (disableOverlayManager: boolean, disableActivateOverlay: boolean, propzIndex: number, onClick: (evt?: React.MouseEvent<HTMLDivElement>) => void, panelRef?: React.MutableRefObject<HTMLElement>) => [string, number, (evt?: React.MouseEvent<HTMLDivElement>) => void];
export interface OverlayManagerProps {
    /**
     * Default: false
     *
     * if `false`, The children will be put to document.body
     *
     * Disable the portal behavior. The children stay within it's parent DOM hierarchy
     */
    disablePortal?: boolean;
    /**
     * Default: false
     *
     * if `true`, do not change activate overlay when click on popper body
     */
    disableActivateOverlay?: boolean;
    /**
     * Default: false
     *
     * if `true`, do not manager z-index by state.overlays
     */
    disableOverlayManager?: boolean;
    /**
     * @ignore
     */
    zIndex?: number;
}
export interface _FloatingPanelProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'title'> {
    /**
     * The title of `PanelHeader` component
     */
    headerTitle?: string;
    /**
     * if `false`, hide the close button of `PanelHeader` component
     */
    showHeaderClose?: boolean;
    /**
     * Be invoked when clicking the close button of `PanelHeader` component
     */
    onHeaderClose?: (e?: React.MouseEvent<HTMLDivElement>) => void;
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
     * A position offset to start with. Useful for giving an initial position
     * to the element. Differs from `defaultPosition` in that it does not
     * affect the postiion returned in draggable callbacks, and in that it
     * accepts strings, like `{x: '10%', y: '10%'}`.
     */
    positionOffset?: PositionOffsetControlPosition;
    /**
     * If `true`, component cannot be resized
     */
    disableResize?: boolean;
    /**
     * If `true`, component cannot be dragged
     */
    disableDraggable?: boolean;
    /**
     * Specifies the x and y that resizing should snap to.
     */
    resizeGrid?: [number, number];
    /**
     * Called when resizing starts.
     */
    onResizeStart?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called while resizeing.
     */
    onResize?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called when resizeing stops.
     */
    onResizeStop?: (size: Size, position?: ControlPosition) => void;
    /**
     * Define resizer list
     */
    resizeHandles?: ResizeHandle[];
    /**
     *
     * Specifies movement boundaries. Accepted values:
     * - `parent` restricts movement within the node's offsetParent
     *   (nearest node with position relative or absolute), or
     * - a selector, restricts movement within the targeted node
     * - An object with `left, top, right, and bottom` properties.
     *  These indicate how far in each direction the draggable
     *   can be moved.
     */
    dragBounds?: DraggableBounds | string | false;
    /**
     * Specifies the x and y that dragging should snap to.
     */
    dragGrid?: [number, number];
    /**
     * If desired, you can provide your own offsetParent for drag calculations.
     * By default, we use the Draggable's offsetParent. This can be useful for elements
     * with odd display types or floats.
     */
    dragOffsetParent?: HTMLElement;
    /**
     * Called when dragging starts. If `false` is returned any handler, the action will cancel.
     */
    onDragStart?: DraggableEventHandler;
    /**
     * Called while dragging.
     */
    onDrag?: (position: ControlPosition) => void;
    /**
     * Called when dragging stops.
     */
    onDragStop?: DraggableEventHandler;
    /**
     * Specifies the scale of the canvas your are dragging this element on. This allows
     * you to, for example, get the correct drag deltas while you are zoomed in or out via
     * a transform or matrix in the parent of this element.
     */
    dragScale?: number;
}
export declare type FloatingPanelProps = _FloatingPanelProps & OverlayManagerProps;
/**
 * A component for resizing and positioning
 */
export declare const _FloatingPanel: React.ForwardRefExoticComponent<_FloatingPanelProps & OverlayManagerProps & React.RefAttributes<unknown>>;
/**
 * A component for resizing and positioning
 */
export declare const FloatingPanel: React.ComponentType<_FloatingPanelProps & OverlayManagerProps & React.RefAttributes<unknown>>;
