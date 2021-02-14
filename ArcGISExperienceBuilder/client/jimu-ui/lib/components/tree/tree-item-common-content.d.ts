/// <reference types="react" />
/** @jsx jsx */
import { React, SerializedStyles, ThemeVariables } from 'jimu-core';
import { IMTreeItemJson } from './tree-item';
interface Props {
    /**
     * The node
     * @see {@link TreeItemJson} for details.
     */
    itemJson: IMTreeItemJson;
    /**
     * The theme
     * @see {@link ThemeVariables} for details.
     */
    theme?: ThemeVariables;
    /**
     * Customize right content of common tree item content, if renderItem is not undefined, this function will be ignored.
     */
    renderRightContent?: (itemJson: IMTreeItemJson) => any;
    /**
     * Customize header content, include icon and label, of common tree item content, if renderItem is not undefined, this function will be ignored.
     */
    renderHeaderContent?: (itemJson: IMTreeItemJson) => any;
    /**
     * Customize arrow icon
     */
    arrowIcon?: (itemJson: IMTreeItemJson) => any;
    /**
     * The item's level
     */
    level?: number;
    /**
     * The callback will fire when the item is expanded or closed
     */
    handleExpand?: () => void;
}
interface States {
    dropType: 'moveInto' | 'top' | 'bottom' | 'none';
    isDragging: boolean;
}
export declare class CommonTreeContent extends React.PureComponent<Props, States> {
    handleArrowClick: (evt: any) => void;
    getStyle: () => SerializedStyles;
    render(): JSX.Element;
}
export {};
