/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { ColorItem } from './core';
export interface ColorStripProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    color?: string;
    colors?: ColorItem[];
    onChange?: (value: string) => void;
}
export declare const PRESET_COLORS: {
    label: string;
    value: string;
    color: string;
}[];
interface ExtraProps {
    intl?: IntlShape;
}
export declare const ColorStrip: React.ComponentType<ColorStripProps & ExtraProps>;
export {};
