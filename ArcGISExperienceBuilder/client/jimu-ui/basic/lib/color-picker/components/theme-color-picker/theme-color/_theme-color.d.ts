/// <reference types="react" />
/**@jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { ColorItem } from '../../color-components';
interface ThemeColorProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    showSharedColors?: boolean;
    onChange?: (value: string) => void;
    recentColors?: ColorItem[];
    specificTheme?: ThemeVariables;
    onCustomizeClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    presetColors?: ColorItem[];
}
export declare const ThemeColor: (props: ThemeColorProps) => JSX.Element;
export {};
