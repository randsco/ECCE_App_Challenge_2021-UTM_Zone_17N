/// <reference types="react" />
import { React, ThemeVariables } from 'jimu-core';
import { ColorItem } from '../color-components';
interface ThemeColorSketchProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    showSharedColors?: boolean;
    onChange: (value: string) => void;
    presetColors?: ColorItem[];
    specificTheme?: ThemeVariables;
    disableAlpha?: boolean;
}
export declare const ThemeColorSketch: React.ComponentType<ThemeColorSketchProps>;
export {};
