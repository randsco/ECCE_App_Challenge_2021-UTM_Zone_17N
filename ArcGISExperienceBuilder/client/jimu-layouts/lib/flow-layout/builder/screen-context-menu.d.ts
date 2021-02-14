/// <reference types="react" />
/** @jsx jsx */
import { IMThemeVariables, IMLayoutItemJson } from 'jimu-core';
interface Props {
    layoutId: string;
    layoutItemId: string;
    layoutItem: IMLayoutItemJson;
    isFirst: boolean;
    isLast: boolean;
    builderTheme: IMThemeVariables;
    formatMessage: (string: any) => string;
}
export declare function ScreenContextMenu(props: Props): JSX.Element;
export {};
