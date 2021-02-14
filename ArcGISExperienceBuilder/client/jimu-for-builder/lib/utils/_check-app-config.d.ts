import { BrowserSizeMode } from 'jimu-core';
declare enum ErrorType {
    NotExist = "NOT_EXIST",
    NotUsed = "NOT_USED",
    UsedDataSourceLost = "USED DATASOURCE LOST"
}
/** @ignore */
declare enum ConfigNodeType {
    Widget = "widgets",
    Page = "pages",
    Section = "sections",
    View = "views",
    Layout = "layouts",
    Dialog = "dialogs"
}
declare class TreeNode {
    id: string;
    type: ConfigNodeType;
    parent: TreeNode;
    children: TreeNode[];
    errors: ErrorType[];
    sizeMode: BrowserSizeMode;
    json: any;
    constructor(type: ConfigNodeType, id: string);
    addChild(node: TreeNode): void;
}
export declare function checkAppConfig(): void;
export declare namespace checkAppConfig {
    var getKeys: (id: string) => TreeNode[];
}
export {};
