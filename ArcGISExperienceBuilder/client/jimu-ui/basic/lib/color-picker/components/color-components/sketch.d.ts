/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { ExportedColorProps, InjectedColorProps, ColorResult } from '.';
interface _SketchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    oldHue?: any;
    disableAlpha?: boolean;
    hsv?: any;
    onChange?: (color: ColorResult) => void;
}
export declare type SketchProps = _SketchProps & ExportedColorProps & InjectedColorProps;
export declare const Sketch: React.ComponentClass<SketchProps, any>;
export {};
