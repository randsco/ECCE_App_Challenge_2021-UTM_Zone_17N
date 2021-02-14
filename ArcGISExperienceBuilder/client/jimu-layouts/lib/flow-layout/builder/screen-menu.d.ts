/// <reference types="react" />
/** @jsx jsx */
import { IMThemeVariables, BrowserSizeMode } from 'jimu-core';
interface Props {
    itemIndex: number;
    activeScreenIndex: number;
    total: number;
    screenGroupId: string;
    layoutId: string;
    layoutItemId: string;
    hasPanel: boolean;
    theme: IMThemeVariables;
    browserSizeMode: BrowserSizeMode;
    formatMessage: (id: string) => string;
}
export declare function ScreenGroupMenu(props: Props): JSX.Element;
export {};
