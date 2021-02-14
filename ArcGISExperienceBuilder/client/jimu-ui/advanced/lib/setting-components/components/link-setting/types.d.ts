import { Expression, ImmutableObject, LinkType } from 'jimu-core';
import { LinkTarget } from 'jimu-ui';
export declare enum OpenTypes {
    CurrentWindow = "_self",
    TopWindow = "_top",
    NewWindow = "_blank"
}
export interface LinkParam {
    linkType?: LinkType;
    openType?: LinkTarget;
    value?: string;
    expression?: Expression;
}
export declare type IMLinkParam = ImmutableObject<LinkParam>;
