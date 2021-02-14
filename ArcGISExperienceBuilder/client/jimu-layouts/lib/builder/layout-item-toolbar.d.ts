/// <reference types="react" />
/** @jsx jsx */
import { IMLayoutItemJson, IMThemeVariables } from 'jimu-core';
import { Modifiers } from 'jimu-ui';
import { ToolbarConfig } from 'jimu-layouts/layout-runtime';
export interface LayoutItemToolbarProps {
    layoutId: string;
    layoutItem: IMLayoutItemJson;
    refElement: HTMLElement;
    modifiers: Modifiers;
    builderTheme: IMThemeVariables;
    formatMessage: (string: any) => string;
    toolItems?: ToolbarConfig;
    showDefaultTools?: boolean;
}
export declare function LayoutItemToolbar(props: LayoutItemToolbarProps): JSX.Element;
