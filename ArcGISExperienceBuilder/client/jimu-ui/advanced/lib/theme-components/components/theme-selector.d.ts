/// <reference types="react" />
/** @jsx jsx */
import { React, IMThemeVariables, ThemeInfo, ImmutableArray, IntlShape } from 'jimu-core';
interface ThemeSelectorProps {
    themeListInfo: ImmutableArray<ThemeInfo>;
    selectedTheme?: string;
    theme?: IMThemeVariables;
    intl?: IntlShape;
    className?: string;
    onChange?: (name: string) => void;
}
export declare const ThemeSelector: React.ComponentType<ThemeSelectorProps>;
export {};
