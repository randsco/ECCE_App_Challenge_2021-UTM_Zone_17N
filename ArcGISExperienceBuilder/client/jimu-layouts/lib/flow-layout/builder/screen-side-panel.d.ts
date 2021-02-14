/// <reference types="react" />
/** @jsx jsx */
import { IMThemeVariables } from 'jimu-core';
import { Props } from '../common/screen-side-panel';
export declare function ScreenSidePanel(props: Props & {
    builderTheme: IMThemeVariables;
    viewOnly: boolean;
    isDesignMode: boolean;
    formatMessage: (id: string) => string;
}): JSX.Element;
