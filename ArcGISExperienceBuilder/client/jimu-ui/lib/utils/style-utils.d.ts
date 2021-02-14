import { StyleSettings, BorderStyle, FourSidesUnit, BoxShadowStyle, WidthStyle, HeightStyle, BackgroundStyle, TextFontStyle } from '../types';
import { IconButtonStyles, IconButtonStylesByState } from '../components/navigation';
export declare const expandStyleArray: (dataArray: Array<number>) => [number, number, number, number];
export declare const toCSSBorder: (borderStyle: BorderStyle) => string;
export declare const toCSSMargin: (marginStyle: FourSidesUnit) => string;
export declare const toCSSPadding: (paddingStyle: FourSidesUnit) => string;
export declare const toCSSBoxshadow: (boxShadow: BoxShadowStyle) => string;
export declare const toCSSBorderRadius: (borderRadius: FourSidesUnit) => string;
export declare const toCSSWidth: (widthStyle: WidthStyle) => string;
export declare const toCSSHeight: (heightStyle: HeightStyle) => string;
export declare const toCSSTextAlign: (text: Partial<TextFontStyle>) => any;
export declare const toCSSTextUnderLine: (text: Partial<TextFontStyle>) => "underline" | "none" | "underline line-through" | "line-through";
export declare const toCSSTextFontStyle: (text: Partial<TextFontStyle>) => "italic" | "normal";
declare type FontWeightProperty = 'bold' | 'normal';
export declare const toCSSTextFontWeight: (text: Partial<TextFontStyle>) => FontWeightProperty;
export declare const toCSSTextFontSize: (text: Partial<TextFontStyle>) => string;
export declare const toCSSTextFontFamily: (text: TextFontStyle) => string;
export declare const toCSSTextColor: (text: TextFontStyle) => string;
export declare const toCSSTextStyle: (text: TextFontStyle) => React.CSSProperties;
export declare const resolveTextStyle: (text?: TextFontStyle) => import("jimu-core").SerializedStyles;
export declare function toCSSTransform(transform: any): string;
export declare const toCSSStyle: (styleSettings: StyleSettings) => {};
export declare const toBackgroundStyle: ({ color, image, fillType }: BackgroundStyle) => {
    backgroundImage: string;
    backgroundColor: string;
    backgroundPosition: string;
    backgroundRepeat: string;
    backgroundSize: string;
};
export declare const toBackgroundEmotionStyle: ({ color, image, fillType }: BackgroundStyle) => import("jimu-core").SerializedStyles;
export declare const remToPixel: (pxValue: string, base?: string) => string;
/**
 * The following methods are for navigation only
 */
export declare const getButtonIconStyle: (variant: IconButtonStyles, useForNavLink?: boolean) => import("jimu-core").SerializedStyles;
export declare const getButtonStyleByState: (variants: IconButtonStylesByState, useForNavLink?: boolean) => import("jimu-core").SerializedStyles;
export {};
