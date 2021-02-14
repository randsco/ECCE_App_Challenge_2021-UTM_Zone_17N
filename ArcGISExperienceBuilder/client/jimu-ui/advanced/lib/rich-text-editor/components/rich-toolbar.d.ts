/// <reference types="react" />
import { FormatType, Formats, RichTextFormatKeys } from '../type';
export declare const TEXT_COLOR_POPPER_CLASS_NAME = "text-color-picker-popper";
export interface RichToolbarPorps {
    className?: string;
    style?: any;
    formats?: Formats;
    onChange?: (key: RichTextFormatKeys, value: any, type: FormatType, focus?: boolean) => void;
}
export declare const RichToolbar: (props: RichToolbarPorps) => JSX.Element;
