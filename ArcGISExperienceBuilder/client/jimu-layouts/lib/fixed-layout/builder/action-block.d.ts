/// <reference types="react" />
import { PageContextProps } from 'jimu-layouts/layout-runtime';
export interface ActionBlockProps {
    pageContext: PageContextProps;
    onPageTemplateSelected: (templatePageJson: any) => void;
}
export declare function ActionBlock(props: ActionBlockProps): JSX.Element;
