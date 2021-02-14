/// <reference types="react" />
import { React } from 'jimu-core';
import { SketchStandardProps } from '../../color-picker/sketch-standard';
export interface SketchStandardButtonProps extends SketchStandardProps {
    onAccept?: (color: string) => void;
    onCancel?: () => void;
}
export declare const SketchStandardButton: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<"intl">>>>;
