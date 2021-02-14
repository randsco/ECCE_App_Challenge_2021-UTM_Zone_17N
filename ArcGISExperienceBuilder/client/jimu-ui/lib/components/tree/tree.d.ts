/// <reference types="react" />
import { React, ImmutableObject, ThemeVariables } from 'jimu-core';
import type { TreeItemJson } from './tree-item';
import * as TreeUtils from './tree-util';
/**
 * The tree component props
 */
export interface TreeProps {
    /**
     * Root node of the tree
     * @see {@link TreeItemJson} for details.
     */
    itemJson: ImmutableObject<TreeItemJson>;
    /**
     * ForwardRef to tree outer div
     */
    forwardRef?: (ref: any) => void;
    /**
     * If 'true', the tree won't show the root node
     */
    hideRoot?: boolean;
    /**
     * Add class name to the tree
     */
    className?: string;
    /**
     * The callback will fire when a item is clicked
     */
    onClickItem?: (itemJson: ImmutableObject<TreeItemJson>, evt?: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * The callback will fire when a item is expaned or closed
     */
    handleExpand?: (itemJson: ImmutableObject<TreeItemJson>) => void;
}
interface ThemeProps {
    theme: ThemeVariables;
}
interface Stats {
}
declare class _Tree extends React.PureComponent<TreeProps & ThemeProps, Stats> {
    constructor(props: any);
    handleSingleClick: (itemJson: ImmutableObject<TreeItemJson>, evt: any) => void;
    handleExpand: (itemJson: ImmutableObject<TreeItemJson>) => void;
    renderItemJson: (itemJson: ImmutableObject<TreeItemJson>) => JSX.Element;
    render(): JSX.Element;
}
/**
 * Tree component
 * @see {@link TreeProps} for details.
 */
export declare const Tree: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<TreeProps & ThemeProps & React.RefAttributes<_Tree>, "theme">>;
export { TreeItemJson, TreeUtils };
