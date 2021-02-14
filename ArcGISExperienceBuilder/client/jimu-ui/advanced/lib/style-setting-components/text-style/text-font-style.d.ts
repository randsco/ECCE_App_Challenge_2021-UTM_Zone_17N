/// <reference types="react" />
import { TextFontStyle, ButtonGroupProps } from 'jimu-ui';
export declare type FontStyles = 'bold' | 'italic' | 'underline' | 'strike';
declare type WeakTextFontStyle = Pick<TextFontStyle, 'bold' | 'italic' | 'underline' | 'strike'>;
export declare type FontStyleProps = Omit<ButtonGroupProps, 'onChange'> & WeakTextFontStyle & {
    types?: FontStyles[];
    onChange: (key: string, value: boolean) => void;
};
export declare const FontStyle: (props: FontStyleProps) => JSX.Element;
export {};
