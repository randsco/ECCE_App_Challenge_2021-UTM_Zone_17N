import { ColorResult, RGBColor, CustomPicker } from 'react-color';
import color from 'react-color/lib/helpers/color';
import { InjectedColorProps, ExportedColorProps } from 'react-color/lib/components/common/ColorWrap';
import { Checkboard } from 'react-color/lib/components/common';
declare const Saturation: any;
declare const Hue: any;
declare const Alpha: any;
interface ColorItem {
    label: string;
    value: string;
    color?: string;
}
export { ColorResult, RGBColor, color, InjectedColorProps, ExportedColorProps, CustomPicker, Saturation, Hue, Alpha, Checkboard, ColorItem };
