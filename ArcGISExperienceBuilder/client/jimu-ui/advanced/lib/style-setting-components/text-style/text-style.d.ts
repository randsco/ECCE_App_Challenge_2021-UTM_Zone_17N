/// <reference types="react" />
import { React } from 'jimu-core';
import { TextFontStyle } from 'jimu-ui';
interface _TextStyleProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    onChange?: (key: string, value: any) => void;
}
export declare type TextStyleProps = _TextStyleProps & Pick<TextFontStyle, 'bold' | 'italic' | 'underline' | 'strike' | 'color' | 'size'>;
export declare const TextStyle: (props: TextStyleProps) => JSX.Element;
export {};
