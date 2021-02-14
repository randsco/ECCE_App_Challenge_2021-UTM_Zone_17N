/// <reference types="react" />
import { React, ThemeVariables } from 'jimu-core';
import { IMTreeItemJson } from './tree-item';
interface Props {
    /**
     * The theme
     * @see {@link ThemeVariables} for details.
     */
    theme: ThemeVariables;
    /**
     * The node
     * @see {@link TreeItemJson} for details.
     */
    itemJson: IMTreeItemJson;
    /**
     * The item's level
     */
    level?: number;
    /**
     * The callback will fire when the item is clicked
     */
    onClickItem?: (itemJson: IMTreeItemJson, evt?: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * The callback will fire when the item is expanded or closed
     */
    handleExpand?: (itemJson: IMTreeItemJson) => void;
}
interface Stats {
    renderSubItems: boolean;
}
export default class ExpandTreeItem extends React.PureComponent<Props, Stats> {
    constructor(props: Props);
    handleSingleClick: (itemJson: any, evt: any) => void;
    handleExpand: () => void;
    renderSubItemsTimeout: any;
    componentDidUpdate(preProps: any): void;
    SingleTreeItem: ({ itemJson, level }: {
        itemJson: any;
        level: any;
    }) => JSX.Element;
    render(): JSX.Element;
}
export {};
