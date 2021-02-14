/// <reference types="react" />
import { React } from 'jimu-core';
import { Sanitizer } from '@esri/arcgis-html-sanitizer';
export interface RichDisplayerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Rich text to display
     */
    value?: string;
    /**
     * If the value is empty, placeholder will be displayed
     */
    placeholder?: string;
    /**
     * Default: `defaultSanitizer`
     *
     * For sanitizing rich text
     */
    sanitizer?: Sanitizer;
}
export declare const RichDisplayer: React.ComponentType<RichDisplayerProps & React.RefAttributes<HTMLDivElement>>;
