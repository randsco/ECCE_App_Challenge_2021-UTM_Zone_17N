/// <reference types="react" />
import { IconButtonStyles } from 'jimu-ui';
export interface IconStyleSettingProps {
    variant?: IconButtonStyles;
    onChange?: (property: string, value: any) => void;
}
export declare const IconStyleSetting: (props: IconStyleSettingProps) => JSX.Element;
