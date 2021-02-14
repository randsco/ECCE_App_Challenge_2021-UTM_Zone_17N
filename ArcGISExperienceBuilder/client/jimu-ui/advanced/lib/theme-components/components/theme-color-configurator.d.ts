/// <reference types="react" />
import { React, CustomThemeJson, IMThemeThemeColors, IMThemeVariables, IntlShape } from 'jimu-core';
interface ThemeColorConfiguratorProps {
    themeVariables?: IMThemeVariables;
    intl?: IntlShape;
    className?: string;
    onChange?: (customVariables: CustomThemeJson) => void;
}
export declare class _ThemeColorConfigurator extends React.PureComponent<ThemeColorConfiguratorProps> {
    private paletteGenerator;
    constructor(props: any);
    onColorChange: (name: string, color: string) => void;
    onPaletteChange: (palette: IMThemeThemeColors) => void;
    render(): JSX.Element;
}
export declare const ThemeColorConfigurator: React.ComponentType<ThemeColorConfiguratorProps>;
export {};
