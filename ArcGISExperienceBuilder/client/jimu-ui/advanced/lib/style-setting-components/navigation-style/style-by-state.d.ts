/// <reference types="react" />
import { NavigationVariant } from 'jimu-ui';
export declare type ComponentState = 'default' | 'hover' | 'active' | 'disabled';
export interface NavStyleSettingByStateProps {
    variant?: NavigationVariant;
    onChange?: (state: ComponentState, key: string, value: any) => void;
    states?: ComponentState[];
    icon?: boolean;
    text?: boolean;
    iconInText?: boolean;
    onlyBorderColor?: boolean;
}
export declare const NavStyleSettingByState: (props: NavStyleSettingByStateProps) => JSX.Element;
