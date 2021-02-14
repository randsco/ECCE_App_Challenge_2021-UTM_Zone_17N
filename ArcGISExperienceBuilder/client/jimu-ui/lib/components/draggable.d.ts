/// <reference types="react" />
import { React } from 'jimu-core';
import { DraggableData, DraggableBounds, DraggableEventHandler, ControlPosition, PositionOffsetControlPosition, DraggableCore, DraggableEvent } from 'react-draggable';
export { DraggableData, DraggableCore, DraggableEvent, ControlPosition };
export declare type DragAxis = 'both' | 'x' | 'y' | 'none';
export interface DraggableProps {
    /**
     * If set to `true`, will allow dragging on non left-button clicks.
     */
    allowAnyClick?: boolean;
    /**
     * Determines which axis the draggable can move. This only affects
     * flushing to the DOM. Callbacks will still include all values.
     * Accepted values:
     *  - `both` allows movement horizontally and vertically (default).
     *  - `x` limits movement to horizontal axis.
     *  - `y` limits movement to vertical axis.
     *  - 'none' stops all movement.
     *
     * Note: Only valid for uncontrolled mode
     */
    axis?: DragAxis;
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
    bounds?: DraggableBounds | string | false;
    /**
     * Specifies a selector to be used to prevent drag initialization.
     *  Example: '.body'
     */
    cancel?: string;
    enableUserSelectHack: boolean;
    /**
     * Class names for draggable UI.
     * Default to 'react-draggable', 'react-draggable-dragging', and 'react-draggable-dragged'
     */
    defaultClassName?: string;
    defaultClassNameDragging?: string;
    defaultClassNameDragged?: string;
    /**
     * Specifies the `x` and `y` that the dragged item should start at.
     * This is generally not necessary to use (you can use absolute or relative
     * positioning of the child directly), but can be helpful for uniformity in
     * your callbacks and with css transforms.
     */
    defaultPosition?: ControlPosition;
    /**
     * If true, will not call any drag handlers.
     */
    disabled?: boolean;
    /**
     * Specifies the x and y that dragging should snap to.
     */
    grid?: [number, number];
    /**
     * Specifies a selector to be used as the handle that initiates drag.
     * Example: '.handle'
     */
    handle?: string;
    /**
     * If desired, you can provide your own offsetParent for drag calculations.
     * By default, we use the Draggable's offsetParent. This can be useful for elements
     * with odd display types or floats.
     */
    offsetParent?: HTMLElement;
    /**
     * Called whenever the user mouses down. Called regardless of handle or disabled status.
     */
    onMouseDown?: (e: MouseEvent) => void;
    /**
     * Called when dragging starts. If `false` is returned any handler, the action will cancel.
     */
    onStart?: DraggableEventHandler;
    /**
     * Called while dragging.
     */
    onDrag?: DraggableEventHandler;
    /**
     * Called when dragging stops.
     */
    onStop?: DraggableEventHandler;
    /**
     * Much like React form elements, if this property is present, the item
     * becomes 'controlled' and is not responsive to user input. Use `position`
     * if you need to have direct control of the element.
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
     * Specifies the scale of the canvas your are dragging this element on. This allows
     * you to, for example, get the correct drag deltas while you are zoomed in or out via
     * a transform or matrix in the parent of this element.
     */
    scale?: number;
}
interface State {
    panning: boolean;
}
export declare class Draggable extends React.PureComponent<DraggableProps, State> {
    static defaultProps: Partial<DraggableProps>;
    constructor(props: any);
    preventTouceMove: (event: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleDragStart: (event: DragEvent, data: DraggableData) => void;
    handleDragStop: (event: DragEvent, data: DraggableData) => void;
    render(): JSX.Element;
}
