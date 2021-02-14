/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableObject, ThemeVariables } from 'jimu-core';
/**
 * TreeItemJson object. Used by tree component
 */
export interface TreeItemJson {
    /**
     * The unique id of all items
     */
    id: string;
    /**
     * The label of item that you want to show
     */
    label?: string;
    /**
     * The icon of item, it will be show before label default
     */
    icon?: any;
    /**
     * The data is attached to the item
     */
    data?: any;
    /**
     * If 'true', the arrow in the front of the item will be always show.
     */
    mustShowArrow?: boolean;
    /**
     * If 'true', the item will expand
     */
    isExpand?: boolean;
    /**
     * If 'true', the item will be active
     */
    isActive?: boolean;
    /**
     * The children of the item
     */
    children?: any;
    /**
     * Add a class name to the item
     */
    className?: string;
    /**
     * Customize tree item content
     */
    renderItem?: (itemJson: IMTreeItemJson) => any;
    /**
     * Customize right content of common tree item content, if renderItem is not undefined, this function will be ignored.
     */
    renderRightContent?: (itemJson: IMTreeItemJson) => any;
    /**
     * customize header content, include icon and label, of common tree item content, if renderItem is not undefined, this function will be ignored.
     */
    renderHeaderContent?: (itemJson: IMTreeItemJson) => any;
    /**
     * customize arrow icon of common tree item content, if renderItem is not undefined, this function will be ignored.
     */
    arrowIcon?: (itemJson: IMTreeItemJson) => any;
}
export declare type IMTreeItemJson = ImmutableObject<TreeItemJson>;
interface Props {
    itemJson: ImmutableObject<TreeItemJson>;
    onClickItem: (itemJson: ImmutableObject<TreeItemJson>, evt?: React.MouseEvent<HTMLDivElement>) => void;
    theme: ThemeVariables;
    level: number;
    handleExpand?: () => void;
}
interface Stats {
}
export declare class TreeItem extends React.PureComponent<Props, Stats> {
    constructor(props: any);
    handleClickItem: (evt: any) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
