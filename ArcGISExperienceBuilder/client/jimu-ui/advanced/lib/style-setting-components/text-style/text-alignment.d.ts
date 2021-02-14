/// <reference types="react" />
import { ButtonGroupProps, TextAlignValue } from 'jimu-ui';
import { ButtonType } from 'jimu-ui/lib/components/button';
export declare type TextAlignmentProps = Omit<ButtonGroupProps, 'onChange'> & {
    buttonType?: ButtonType;
    textAlign?: TextAlignValue;
    onChange?: (value: TextAlignValue) => void;
    showJustify?: boolean;
    iconSize?: number;
    autoFlip?: boolean;
};
export declare const TextAlignment: (props: TextAlignmentProps) => JSX.Element;
