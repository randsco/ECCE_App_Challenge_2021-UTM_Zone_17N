/// <reference types="react" />
/** @jsx jsx */
import { IMThemeAllColors, ThemeInfo, IMThemeFontStyleBase, ThemeColorationType, IntlShape } from 'jimu-core';
interface FontStyleGroup {
    heading?: IMThemeFontStyleBase;
    body?: IMThemeFontStyleBase;
}
export declare function getPalette(colors: Partial<IMThemeAllColors>, hideAlertColors?: boolean, darkTheme?: boolean): JSX.Element;
interface ColorationOption {
    value: ThemeColorationType;
    label: string;
    content: any;
}
export declare function getColorationOptions(colors: Partial<IMThemeAllColors>, intl: IntlShape): ColorationOption[];
export declare function getFontSetCard(fontset: Partial<FontStyleGroup>, intl: IntlShape): JSX.Element;
export declare function getThemeTitleLabel(themeInfo: Partial<ThemeInfo>): JSX.Element;
export declare function getFontSizeInPixel(value: string): string;
export declare function parseLocaleNumber(value: string): string;
export {};
