/// <reference types="react" />
import { IconButtonStyles } from 'jimu-ui';
export interface ButtonStyleSettingProps {
    variant?: IconButtonStyles;
    onlyBorderColor?: boolean;
    onChange?: (property: string, value: any) => void;
    icon?: boolean;
}
export declare const ButtonStyleSetting: (props: ButtonStyleSettingProps) => JSX.Element;
