/// <reference types="react" />
import { IconPickerProps } from 'jimu-ui/advanced/resource-selector';
export interface NavIconPickerProps extends Omit<IconPickerProps, 'groups' | 'customIcons'> {
    size?: number;
}
export declare const NavIconPicker: (props: NavIconPickerProps) => JSX.Element;
