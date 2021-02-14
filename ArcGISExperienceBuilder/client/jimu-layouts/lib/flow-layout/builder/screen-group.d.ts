/// <reference types="react" />
/** @jsx jsx */
import { IMThemeVariables, IMLayoutItemJson } from 'jimu-core';
import { LayoutItemProps } from 'jimu-layouts/layout-runtime';
interface OwnProps {
    itemIndex: number;
    isFirst: boolean;
    isLast: boolean;
    layoutItem: IMLayoutItemJson;
    theme: IMThemeVariables;
    formatMessage: (id: string) => string;
}
export declare function ScreenGroup(props: LayoutItemProps & OwnProps): JSX.Element;
export {};
