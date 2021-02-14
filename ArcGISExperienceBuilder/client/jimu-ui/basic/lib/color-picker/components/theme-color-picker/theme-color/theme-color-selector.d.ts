/// <reference types="react" />
import { React, ThemeAllColors } from 'jimu-core';
interface Props {
    value?: string;
    className?: string;
    style?: React.CSSProperties;
    colors?: ThemeAllColors;
    onChange: (value: string) => void;
}
export declare const ThemeColorSelector: React.ComponentType<Props>;
export {};
