import { ImmutableObject } from 'jimu-core';
import { ImageParam } from './components/image-with-param';
export declare enum Alignment {
    Left = "left",
    Center = "center",
    Right = "right"
}
export declare enum IconPosition {
    Start = "start",
    End = "end"
}
export declare enum LineType {
    SOLID = "solid",
    DASHED = "dashed",
    DOTTED = "dotted",
    DOUBLE = "double"
}
export declare enum ThemeColors {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    LIGHT = "light",
    DANGER = "danger",
    DARK = "dark",
    WHITE = "white"
}
export declare enum FillType {
    FIT = "fit",
    FILL = "fill",
    CENTER = "center",
    TILE = "tile",
    STRETCH = "stretch"
}
export declare enum UnitTypes {
    PIXEL = "px",
    REM = "rem",
    EM = "em",
    PERCENTAGE = "%"
}
export declare enum BorderSides {
    TL = "TL",
    TR = "TR",
    BR = "BR",
    BL = "BL"
}
export declare enum Sides {
    T = "T",
    R = "R",
    B = "B",
    L = "L"
}
export interface LinearUnit {
    distance: number;
    unit: UnitTypes;
}
export declare type IMLinearUnit = ImmutableObject<LinearUnit>;
export interface FourSidesUnit {
    unit: UnitTypes;
    number: Array<number>;
}
export interface BorderStyle {
    type?: LineType;
    color?: string;
    width?: string | number;
}
export declare enum BoxShadowValues {
    OffsetX = "OFFSETX",
    OffsetY = "OFFSETY",
    BlurRadius = "BLUERADIUS",
    SpreadRadius = "SPREADRADIUS"
}
export interface BoxShadowStyle {
    offsetX: string;
    offsetY: string;
    blur: string;
    spread: string;
    color: string;
}
export interface WidthStyle {
    value?: string;
}
export interface BackgroundStyle {
    color?: string;
    fillType: FillType;
    image?: ImageParam;
}
export declare type HeightStyle = WidthStyle;
export interface StyleSettings {
    backgroundColor?: string;
    background?: BackgroundStyle;
    margin?: FourSidesUnit;
    padding?: FourSidesUnit;
    border?: BorderStyle;
    boxShadow?: BoxShadowStyle;
    borderRadius?: FourSidesUnit;
    width?: WidthStyle;
    height?: HeightStyle;
    text?: TextFontStyle;
    transform?: {
        rotate?: number;
    };
}
export declare enum FontFamilyValue {
    AVENIRNEXT = "Avenir Next",
    CALIBRI = "Calibri",
    PMINGLIU = "PmingLiu",
    IMPACT = "Impact",
    GEORGIA = "Georgia",
    ARIAL = "Arial",
    TIMESNEWROMAN = "Times New Roman",
    SIMHEI = "SimHei",
    MICROSOFTYAHEI = "Microsoft YaHei"
}
export declare enum TextAlignValue {
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center",
    JUSTIFY = "justify"
}
export declare type FontStyleKeys = 'bold' | 'italic' | 'underline' | 'strike' | 'color' | 'size' | 'background' | 'font' | 'letterspace' | 'linespace' | 'align';
export declare type FontStyleValues = boolean | string | FontFamilyValue | TextAlignValue;
export declare type TextFontStyle = {
    [x in FontStyleKeys]?: FontStyleValues;
};
export declare type IMTextFontStyle = ImmutableObject<TextFontStyle>;
