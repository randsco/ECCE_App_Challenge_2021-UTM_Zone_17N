/// <reference types="react" />
import { SketchProps as SketchComponentProps } from '../color-components/sketch';
export interface SketchProps extends Omit<SketchComponentProps, 'onChange'> {
    color?: string;
    onChange?: (color: string) => void;
}
export declare const Sketch: import("react").ComponentType<SketchProps>;
