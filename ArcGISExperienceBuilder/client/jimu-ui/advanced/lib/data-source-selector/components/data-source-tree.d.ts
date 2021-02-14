/// <reference types="react" />
import { DataSource, React, IntlShape } from 'jimu-core';
export interface DataSourceTreeProps {
    /**
     * Root data source of the tree.
     */
    dataSource: Partial<DataSource>;
    /**
     * If true, there will be a default background when the tree is open.
     */
    useDefaultBackground?: boolean;
    /**
     * Return child data sources of the data source.
     */
    getChildDataSources: (dataSource: Partial<DataSource>) => Partial<DataSource>[];
    /**
     * Return label of the data source.
     */
    getLabel: (dataSource: Partial<DataSource>) => string;
    /**
     * Whether a node can be selected.
     */
    isNodeSelectable: (dataSource: Partial<DataSource>) => boolean;
    /**
     * Will use the method to render every selectable node of the tree.
     */
    renderSelectableNode?: (dataSource: Partial<DataSource>) => React.ReactNode;
    /**
     * Will use the method to render every unselectable node of the tree.
     */
    renderUnselectableNode?: (label: string) => React.ReactNode;
    /**
     * ClassName to the tree.
     */
    className?: string;
    /**
     * @ignore only used to update collapse line.
     */
    drawCollapseLine?: () => void;
    /**
     * @ignore only used to concat labels.
     */
    label?: string;
    /**
     * @ignore only used to get whether is root node.
     */
    isChildTree?: boolean;
}
interface ExtraProps {
    intl: IntlShape;
}
/**
 * The data source tree has two kinds of node, selectable node and unselectable node.
 * Selectable node means the node can be selected and unselectable node means the node can not be selected.
 * The rules to generate unselectable node:
 * 1. If node A can not be selected and all descendant nodes of A can not be selected, the subtree using A as root node will be hidden.
 * 2. If node A can not be selected and some descendant nodes of A can be selected, A will only render as a label.
 * 3. If node A can not be selected, A's child node A1 also can not be selected and A1's child node A11 can be selected,
 *    A11's parent node will be a unselectable node and the label will be `A / A11`.
 */
export declare const DataSourceTree: React.FC<import("react-intl").WithIntlProps<DataSourceTreeProps & ExtraProps>> & {
    WrappedComponent: React.ComponentType<DataSourceTreeProps & ExtraProps>;
};
export {};
