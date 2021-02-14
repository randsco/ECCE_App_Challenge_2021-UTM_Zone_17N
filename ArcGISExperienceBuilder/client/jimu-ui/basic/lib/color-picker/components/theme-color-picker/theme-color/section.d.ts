/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
export interface ThemeColorSection extends React.HtmlHTMLAttributes<HTMLDivElement> {
    label?: string;
    tooltip?: string;
}
export declare const ThemeColorSection: (props: ThemeColorSection) => JSX.Element;
