/// <reference types="react" />
import { React, CustomThemeJson, IntlShape } from 'jimu-core';
interface ThemeColorConfiguratorProps {
    intl?: IntlShape;
    className?: string;
    primaryColor?: string;
    onChange?: (customVariables: CustomThemeJson) => void;
}
export declare class ThemeColorPrimaryConfigurator extends React.PureComponent<ThemeColorConfiguratorProps> {
    onColorChange: (color: string) => void;
    i18n: (id: string) => string;
    render(): JSX.Element;
}
export {};
