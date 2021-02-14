/// <reference types="react" />
import { React } from 'jimu-core';
import { ColorBlockProps } from './color-block';
export interface PickerBlockProps extends ColorBlockProps {
    /**
     * The icon of this component
     */
    icon?: React.ComponentClass<React.SVGAttributes<SVGElement>> | string;
    /**
     * @ignore
     * If `true`, set background to transparent
     */
    tertiary?: boolean;
}
export declare const PickerBlock: React.ComponentType<PickerBlockProps & React.RefAttributes<HTMLDivElement>>;
