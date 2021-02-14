/// <reference types="react" />
import { PageContextProps } from 'jimu-layouts/layout-runtime';
export interface ActionBlockProps {
    pageContext: PageContextProps;
    blockOnly?: boolean;
    onPageTemplateSelected: (templatePageJson: any) => void;
    onBlockTemplateSelected: (templateBlockJson: any) => void;
    onScreenTemplateSelected: (templateScreenJson: any) => void;
}
export declare function ActionBlock(props: ActionBlockProps): JSX.Element;
