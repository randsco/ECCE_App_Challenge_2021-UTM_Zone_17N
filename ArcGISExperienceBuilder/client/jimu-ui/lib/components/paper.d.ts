/// <reference types="react" />
import { React } from 'jimu-core';
export interface PaperProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    component?: React.ComponentClass<any>;
}
export declare const Paper: React.ComponentType<PaperProps>;
