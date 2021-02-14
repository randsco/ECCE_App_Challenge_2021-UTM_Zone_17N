import { ImmutableObject } from 'seamless-immutable';
import { TextFontStyle, NavButtonGroupType, BorderStyle } from 'jimu-ui';
import { IMCustomThemeJson } from './app-config';
declare type NumbericValueWithUnit = string;
export declare type Color = string;
declare type Size = NumbericValueWithUnit | 0;
declare type LineHeight = number | NumbericValueWithUnit;
export { Size as ThemeSize, Color as ThemeColor };
export interface ThemeTypographyBase {
    fontFamilyBase?: string;
    fontSizeRoot?: Size;
    fontSizeBase?: Size;
    sizes?: {
        display1?: Size;
        display2?: Size;
        display3?: Size;
        display4?: Size;
        display5?: Size;
        display6?: Size;
        body1?: Size;
        body2?: Size;
        caption1?: Size;
        caption2?: Size;
    };
    weights?: {
        extraLight?: string;
        light?: string;
        medium?: string;
        bold?: string;
        extraBold?: string;
    };
    lineHeights?: {
        sm?: LineHeight;
        medium?: LineHeight;
        lg?: LineHeight;
    };
    colors?: {
        title?: Color;
        normal?: Color;
        caption?: Color;
        disabled?: Color;
    };
}
export interface ThemeFontStyleBase {
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: Size;
    fontStyle?: string;
    lineHeight?: LineHeight;
    color?: Color;
}
export declare enum ThemeFontVariantKeys {
    Display1 = "display1",
    Display2 = "display2",
    Display3 = "display3",
    Display4 = "display4",
    Display5 = "display5",
    Display6 = "display6",
    Body1 = "body1",
    Body2 = "body2",
    Caption1 = "caption1",
    Caption2 = "caption2"
}
export interface ThemeFontVariant extends ThemeFontStyleBase {
}
export declare type ThemeFontVariants = {
    [key in ThemeFontVariantKeys]?: ThemeFontVariant;
};
export interface ThemeTypography extends ThemeTypographyBase {
    variants?: ThemeFontVariants;
}
export declare enum ThemeCommonColorKeys {
    White = "white",
    Black = "black",
    Transparent = "transparent"
}
export declare enum ThemeThemeAlertColorKeys {
    Success = "success",
    Info = "info",
    Warning = "warning",
    Danger = "danger"
}
export declare enum ThemeThemeMainColorKeys {
    Primary = "primary",
    Secondary = "secondary",
    Light = "light",
    Dark = "dark"
}
export declare enum ThemeThemeColorKeys {
    Primary = "primary",
    Secondary = "secondary",
    Light = "light",
    Dark = "dark",
    Success = "success",
    Info = "info",
    Warning = "warning",
    Danger = "danger"
}
export declare type ThemeColorationType = 'minimal' | 'default';
export declare type ThemeColorationVariants = {
    [index in ThemeColorationType]?: {
        header: {
            color?: Color;
            bg?: Color;
        };
        body?: {
            color?: Color;
            bg?: Color;
        };
        footer?: {
            color?: Color;
            bg?: Color;
        };
    };
};
export declare type ThemeCommonColors = {
    [index in ThemeCommonColorKeys]?: Color;
};
export declare type ThemeThemeColors = {
    [index in ThemeThemeColorKeys]?: Color;
};
export interface ThemeColorPaletteItem {
    100?: Color;
    200?: Color;
    300?: Color;
    400?: Color;
    500?: Color;
    600?: Color;
    700?: Color;
    800?: Color;
    900?: Color;
}
export declare type PaletteLightnessRange = [number, number];
export declare type ThemeColorPalette = {
    [index in ThemeThemeColorKeys]?: ThemeColorPaletteItem;
};
export interface ColorPaletteGenerator {
    shadeCount: number;
    getLightness: (color: Color) => number;
    getShadeLevel: (lightness: number, lightnessRange: PaletteLightnessRange, shadeLevel: number) => number;
    getColorsByShade: (color: Color, shadeLevel: number, lightnessRange: PaletteLightnessRange, reverse?: boolean) => ThemeColorPaletteItem;
    generate: (themeColors: ThemeThemeColors, isDarkTheme?: boolean) => ThemeColorPalette;
    revertPalette: (themePalette: ThemeColorPalette) => ThemeColorPalette;
}
export interface ThemeAllColors extends ThemeCommonColors, ThemeThemeColors {
    palette?: ThemeColorPalette;
    orgSharedColors?: ThemeOrgSharedColors;
    getPalette?: () => IMThemeColorPalette;
    getOrgShareColors?: () => IMThemeOrgSharedColors;
}
export interface ThemeBody extends ThemeFontStyleBase {
    color?: Color;
    bg?: Color;
}
export interface ThemeHeader {
    color?: Color;
    bg?: Color;
}
export interface ThemeFooter {
    color?: Color;
    bg?: Color;
}
export interface ThemeLink {
    color?: Color;
    decoration?: string;
    hover?: {
        color?: Color;
        decoration?: string;
    };
}
export interface ThemeSurface {
    bg?: Color;
    border?: BorderStyle;
    shadow?: string;
}
export interface ThemeSurfaces {
    1?: ThemeSurface;
    2?: ThemeSurface;
    3?: ThemeSurface;
}
export declare type ThemeSizes = {
    0?: Size;
    1?: Size;
    2?: Size;
    3?: Size;
    4?: Size;
    5?: Size;
};
export interface ThemeBorderRadiuses {
    none?: Size;
    sm?: Size;
    default?: Size;
    lg?: Size;
    circle?: Size;
    pill?: Size;
}
export interface ThemeBoxShadows {
    none?: string;
    default?: string;
    sm?: string;
    lg?: string;
}
export declare enum ThemeBoxStyleKeys {
    Color = "color",
    Background = "bg",
    Border = "border",
    BorderRadius = "borderRadius",
    Shadow = "shadow"
}
export declare type ThemeBoxStyles = {
    color?: Color;
    bg?: Color;
    border?: BorderStyle;
    borderRadius?: Size;
    shadow?: string;
    decoration?: string;
    fontWeight?: string;
} & Omit<TextFontStyle, 'size' | 'font' | 'color' | 'background' | 'letterspace' | 'linespace' | 'align'>;
export interface ThemeBoxStylesByState {
    default?: ThemeBoxStyles;
    hover?: ThemeBoxStyles;
    active?: ThemeBoxStyles;
    disabled?: ThemeBoxStyles & {
        opacity?: number;
    };
    focus?: ThemeBoxStyles;
}
export interface ThemeButtonSize {
    fontSize?: Size;
    lineHeight?: LineHeight;
    paddingX?: Size;
    paddingY?: Size;
    borderRadius?: Size;
}
export interface ThemeInputSize {
    fontSize?: Size;
    paddingY?: Size;
    paddingX?: Size;
    lineHeight?: LineHeight;
    borderRadius?: Size;
    height?: Size | 'auto';
}
export interface ThemeAlert {
    paddingY?: Size;
    paddingX?: Size;
    marginBottom?: Size;
    borderRadius?: Size;
    linkFontWeight?: string;
    borderWidth?: Size;
    bgLevel?: string;
    borderLevel?: string;
    colorLevel?: string;
}
export interface ThemeBadge {
    fontSize?: Size;
    fontWeight?: string;
    paddingX?: Size;
    paddingY?: Size;
    border?: BorderStyle;
    borderRadius?: Size;
    minSize?: Size;
}
export interface ThemeBreadcrumb {
    bg?: Color;
    activeColor?: Color;
    paddingY?: Size;
    paddingX?: Size;
    marginBottom?: Size;
    borderRadius?: Size;
    item?: {
        color?: Color;
        hoverColor?: Color;
        padding?: Size;
    };
    divider?: {
        content?: string;
        color?: Color;
    };
}
export declare type ThemeButtonType = 'default' | 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
export declare type ThemeButtonStyles = ThemeBoxStyles;
export declare type ThemeButtonStylesByState = ThemeBoxStylesByState;
export declare type IMThemeButtonStylesByState = ImmutableObject<ThemeButtonStylesByState>;
export declare type ThemeButtonVariants = {
    [key in ThemeButtonType]?: ThemeButtonStylesByState;
};
export declare type IMThemeButtonVariants = ImmutableObject<ThemeButtonVariants>;
export interface ThemeButton {
    sizes?: {
        default?: ThemeButtonSize;
        sm?: ThemeButtonSize;
        lg?: ThemeButtonSize;
    };
    variants?: ThemeButtonVariants;
    icon?: {
        spacing?: Size;
        size?: Size | 'auto';
    };
}
export interface ThemeCard {
    spacer?: {
        y?: Size;
        x?: Size;
    };
    headerBg?: Color;
    divider?: BorderStyle;
    root?: ThemeBoxStylesByState;
    checkMark?: {
        color?: Color;
        bg?: Color;
        border?: BorderStyle;
    };
}
export interface ThemeClose {
    fontSize?: Size;
    fontWeight?: string;
    color?: Color;
    textShadow?: string;
}
export interface ThemeDropdown {
    button?: {
        sizes?: {
            default?: {
                paddingX?: Size;
            };
            sm?: {
                paddingX?: Size;
            };
            lg?: {
                paddingX?: Size;
            };
        };
    };
    minWidth?: Size;
    paddingY?: Size;
    spacer?: Size;
    bg?: Color;
    border?: BorderStyle;
    borderRadius?: Size;
    divider?: {
        bg?: Color;
        margin?: Size;
    };
    shadow?: string;
    link?: {
        color?: Color;
        hoverColor?: Color;
        hoverBg?: Color;
        activeColor?: Color;
        activeBg?: Color;
        checkIconColor?: Color;
        checkIconGutter?: Size;
        disabledColor?: Color;
    };
    item?: {
        paddingX?: Size;
        paddingY?: Size;
    };
    header?: {
        color?: Color;
    };
}
export interface ThemeForm {
    group?: {
        marginBottom?: Size;
    };
    helpText?: {
        marginTop?: Size;
        fontSize?: Size;
    };
    check?: {
        inline?: {
            marginX?: string;
            inputMarginX?: string;
        };
    };
}
interface _SwitchBase {
    size?: Size;
    border?: BorderStyle;
    borderRadius?: string;
    bg?: Color;
    hover?: {
        borderColor?: Color;
    };
    checked?: {
        color?: Color;
        bg?: Color;
    };
    focusColor?: Color;
    iconSize?: Size;
}
export interface ThemeInputCheckbox extends _SwitchBase {
}
export interface ThemeInputRadio extends _SwitchBase {
}
export interface ThemeInputSwitch {
    width?: Size;
    height?: Size;
    borderRadius?: string;
    bg?: Color;
    border?: BorderStyle;
    checkedBg?: Color;
    checkedBorder?: {
        color?: Color;
    };
    slider?: {
        gap?: Size;
        height?: Size | 'auto';
        width?: Size | 'auto';
        color?: Color;
        checkedColor?: Color;
        disabledColor?: Color;
    };
    focusColor?: Color;
}
export interface ThemeInput {
    bg?: Color;
    color?: Color;
    border?: BorderStyle;
    boxShadow?: string;
    focus?: {
        bg?: Color;
        borderColor?: Color;
        color?: Color;
        width?: Size;
        boxShadow?: string;
    };
    disabled?: {
        bg?: Color;
        borderColor?: Color;
        color?: Color;
    };
    placeHolderColor?: Color;
    sizes?: {
        default?: ThemeInputSize;
        sm?: ThemeInputSize;
        lg?: ThemeInputSize;
    };
    transition?: string;
    checkbox?: ThemeInputCheckbox;
    radio?: ThemeInputRadio;
    switch?: ThemeInputSwitch;
}
export interface ThemeInputGroup {
    addon?: {
        color?: Color;
        bg?: Color;
        borderColor?: Color;
    };
}
export interface ThemeListGroup {
    fontSize?: Size;
    bg?: Color;
    border?: BorderStyle;
    borderRadius?: Size;
    item?: {
        paddingY?: Size;
        paddingX?: Size;
    };
    hover?: {
        bg?: Color;
    };
    active?: {
        color?: Color;
        bg?: Color;
        borderColor?: Color;
    };
    disabled?: {
        color?: Color;
        bg?: Color;
    };
    action?: {
        color?: Color;
        hover?: {
            color?: Color;
        };
        active?: {
            color?: Color;
            bg?: Color;
        };
    };
}
export interface ThemeModal {
    innerPadding?: Size;
    transition?: string;
    dialog?: {
        margin?: Size;
        marginYSmUp?: Size;
    };
    title?: {
        lineHeight?: LineHeight;
    };
    content?: {
        bg?: Color;
        border?: BorderStyle;
        borderRadius?: string;
        shadow?: string;
        shadowSmUp?: string;
    };
    backdrop?: {
        bg?: Color;
        opacity?: number;
    };
    header?: {
        border?: BorderStyle;
        paddingY?: Size;
        paddingX?: Size;
    };
    footer?: {
        border?: BorderStyle;
        button?: {
            minWidth?: Size;
        };
    };
    sizes?: {
        lg?: Size;
        md?: Size;
        sm?: Size;
    };
}
export declare type ThemeNavType = 'default' | 'underline' | 'tabs' | 'pills';
export interface ThemeNavItem {
    size?: ThemeButtonSize;
    gutter?: Size;
    icon?: {
        spacing?: Size;
    };
}
export declare type IMThemeNavVariant = ImmutableObject<ThemeNavVariant>;
export interface ThemeNavVariant extends ThemeNavItem {
    root?: ThemeBoxStyles;
    item?: ThemeButtonStylesByState;
}
export declare type ThemeNavVariants = {
    [key in ThemeNavType]?: ThemeNavVariant;
};
export interface ThemeNav {
    variants?: ThemeNavVariants;
}
export interface ThemeNavBar {
    fontSize?: Size;
    paddingY?: Size;
    paddingX?: Size;
    nav?: {
        link?: {
            paddingX?: Size;
            height?: Size | 'auto';
        };
    };
    brand?: {
        fontSize?: Size;
        height?: Size | 'auto';
        paddingY?: Size | 'auto';
    };
    toggler?: {
        paddingY?: Size;
        paddingX?: Size;
        fontSize?: Size;
        borderRadius?: Size;
    };
    themes?: {
        dark?: {
            color?: Color;
            hoverColor?: Color;
            activeColor?: Color;
            disabledColor?: Color;
            toggler?: {
                iconBg?: string;
                borderColor?: Color;
            };
        };
        light?: {
            color?: Color;
            hoverColor?: Color;
            activeColor?: Color;
            disabledColor?: Color;
            toggler?: {
                iconBg?: string;
                borderColor?: Color;
            };
        };
    };
}
export interface ThemeNavButtonGroupVariant {
    root?: ThemeBoxStyles;
    item?: ThemeButtonStylesByState;
}
export declare type ThemeNavButtonGroupVariants = {
    [key in NavButtonGroupType]?: ThemeNavButtonGroupVariant;
};
export interface ThemeNavButtonGroup {
    variants?: ThemeNavButtonGroupVariants;
}
export declare type IMThemePaginationVariant = ImmutableObject<ThemePaginationVariant>;
export interface ThemePaginationVariant {
    root?: ThemeButtonStylesByState;
    button?: ThemeButtonStylesByState;
}
export interface ThemePaginationVariants {
    default?: ThemePaginationVariant;
}
export interface ThemePagination {
    sizes?: {
        default?: {
            button?: {
                paddingY?: Size;
                paddingX?: Size;
                minWidth?: Size;
                lineHeight?: Size | number;
            };
        };
        sm?: {
            button?: {
                paddingY?: Size;
                paddingX?: Size;
                minWidth?: Size;
                lineHeight?: Size | number;
            };
        };
        lg?: {
            button?: {
                paddingY?: Size;
                paddingX?: Size;
                minWidth?: Size;
                lineHeight?: Size | number;
            };
        };
    };
    variants?: ThemePaginationVariants;
    lineHeight?: LineHeight;
    gutter?: Size;
}
export interface ThemePopper {
    fontSize?: Size;
    bg?: Color;
    border?: BorderStyle;
    borderRadius?: Size;
    shadow?: string;
    header?: {
        bg?: Color;
        color?: Color;
        paddingY?: Size;
        paddingX?: Size;
    };
    body?: {
        color?: Color;
        paddingY?: Size;
        paddingX?: Size;
    };
    arrow?: {
        color?: Color;
        outerColor?: Color;
    };
}
export interface ThemePaper {
    bg?: Color;
    color?: Color;
    border?: BorderStyle;
    paddingY?: Size;
    paddingX?: Size;
    boxShadow?: string;
}
export interface ThemeProgress {
    height?: Size;
    fontSize?: Size;
    bg?: Color;
    borderRadius?: Size;
}
export declare type IMThemeSliderVariant = ImmutableObject<ThemeSliderVariant>;
export declare type ThemeSliderVariant = {
    root?: ThemeBoxStyles;
    track?: ThemeBoxStyles;
    progress?: ThemeButtonStylesByState;
    thumb?: ThemeButtonStylesByState;
};
export declare type ThemeSliderVariants = {
    default?: ThemeSliderVariant;
};
export interface ThemeSlider {
    sizes?: {
        default?: {
            root?: Size;
            thumb?: Size;
        };
        sm?: {
            root?: Size;
            thumb?: Size;
        };
        lg?: {
            root?: Size;
            thumb?: Size;
        };
    };
    variants?: ThemeSliderVariants;
}
export interface ThemeTable {
    color?: Color;
    bg?: Color;
    border?: BorderStyle;
    head?: {
        fontSize?: Size;
        bg?: Color;
    };
    cell?: {
        default?: {
            paddingX?: Size;
            paddingY?: Size;
        };
        sm?: {
            paddingX?: Size;
            paddingY?: Size;
        };
    };
    variants?: {
        striped?: {
            bg?: Color;
        };
        dark?: {
            color?: Color;
            bg?: Color;
            border?: {
                color?: Color;
            };
            head?: {
                bg?: Color;
            };
        };
    };
}
export interface ThemeTooltip {
    fontSize?: Size;
    maxWidth?: Size;
    color?: Color;
    bg?: Color;
    borderRadius?: Size;
    border?: BorderStyle;
    boxShadow?: string;
    opacity?: number;
    paddingY?: Size;
    paddingX?: Size;
    arrow?: {
        color?: Color;
        border?: BorderStyle;
    };
}
export interface ThemeComponents {
    alert?: ThemeAlert;
    badge?: ThemeBadge;
    breadcrumb?: ThemeBreadcrumb;
    button?: ThemeButton;
    card?: ThemeCard;
    close?: ThemeClose;
    dropdown?: ThemeDropdown;
    form?: ThemeForm;
    input?: ThemeInput;
    inputGroup?: ThemeInputGroup;
    listGroup?: ThemeListGroup;
    modal?: ThemeModal;
    nav?: ThemeNav;
    navbar?: ThemeNavBar;
    navButtonGroup?: ThemeNavButtonGroup;
    pagination?: ThemePagination;
    popper?: ThemePopper;
    paper?: ThemePaper;
    progress?: ThemeProgress;
    slider?: ThemeSlider;
    table?: ThemeTable;
    tooltip?: ThemeTooltip;
    [component: string]: any;
}
export interface ThemeArcGISButton {
    variants?: {
        default?: ThemeButtonStylesByState;
        secondary?: ThemeButtonStylesByState;
    };
}
export interface ThemeArcGISInput extends ThemeInput {
}
export interface ThemeArcGISMenu extends ThemeBoxStyles {
    item?: ThemeButtonStylesByState;
}
export interface ThemeArcGISPanel extends ThemeBoxStyles {
}
export interface ThemeArcGISTable {
    root: ThemeBoxStyles;
    alterRowBg?: Color;
}
export interface ThemeArcGISUpdatingIndicator {
    bg?: Color;
    progress?: Color;
}
export interface ThemeArcGISLayerList {
    root?: ThemeBoxStyles;
    item?: ThemeBoxStylesByState;
    actionsList?: {
        root?: ThemeBoxStyles;
        item?: ThemeBoxStylesByState;
        separator?: BorderStyle;
    };
    icon?: ThemeBoxStylesByState;
}
export interface ThemeArcGISLayerLegend {
    variants?: {
        default?: {
            root?: ThemeBoxStyles;
        };
        card?: {
            root?: ThemeBoxStyles;
            carousel?: ThemeBoxStyles;
            caption?: ThemeBoxStyles;
        };
    };
}
export interface ThemeArcGISBasemapGallery {
    root?: ThemeBoxStyles;
    item?: ThemeBoxStylesByState;
}
export interface ThemeArcGISMeasure {
    root?: ThemeBoxStyles;
    measurement?: {
        bg?: Color;
        valueColor?: Color;
        disabledColor?: Color;
    };
}
export interface ThemeArcGISComponents {
    button?: ThemeArcGISButton;
    input?: ThemeArcGISInput;
    menu?: ThemeArcGISMenu;
    panel?: ThemeArcGISPanel;
    table?: ThemeArcGISTable;
    updatingIndicator?: ThemeArcGISUpdatingIndicator;
}
export interface ThemeArcGISWidgets {
    layerlist?: ThemeArcGISLayerList;
    legend?: ThemeArcGISLayerLegend;
    basemapGallery?: ThemeArcGISBasemapGallery;
    measure?: ThemeArcGISMeasure;
}
export interface ThemeArcGIS {
    boxShadow?: string;
    components?: ThemeArcGISComponents;
    widgets?: ThemeArcGISWidgets;
}
export interface ThemeOrgSharedColors {
    header?: {
        bg?: Color;
        color?: Color;
    };
    body?: {
        bg?: Color;
        color?: Color;
        link?: Color;
    };
    button?: {
        bg?: Color;
        color?: Color;
    };
}
export interface SharedThemeJson extends ThemeOrgSharedColors {
    logo?: {
        small?: string;
        link?: string;
    };
    fonts?: {
        base?: {
            url?: string;
            family?: string;
        };
        heading?: {
            url?: string;
            family?: string;
        };
    };
}
export declare type IMThemeTypography = ImmutableObject<ThemeTypography>;
export declare type IMThemeThemeColors = ImmutableObject<ThemeThemeColors>;
export declare type IMThemeColorPalette = ImmutableObject<ThemeColorPalette>;
export declare type IMThemeAllColors = ImmutableObject<ThemeAllColors>;
export declare type IMThemeColorationVariants = ImmutableObject<ThemeColorationVariants>;
export declare type IMThemeFontStyleBase = ImmutableObject<ThemeFontStyleBase>;
export declare type IMThemeFontVariant = ImmutableObject<ThemeFontVariant>;
export declare type IMThemeFontVariants = ImmutableObject<ThemeFontVariants>;
export declare type IMThemeSizes = ImmutableObject<ThemeSizes>;
export declare type IMThemeBorder = ImmutableObject<BorderStyle>;
export declare type IMThemeBorderRadiuses = ImmutableObject<ThemeBorderRadiuses>;
export declare type IMThemeBoxShadows = ImmutableObject<ThemeBoxShadows>;
export declare type IMThemeHeader = ImmutableObject<ThemeHeader>;
export declare type IMThemeFooter = ImmutableObject<ThemeFooter>;
export declare type IMThemeBody = ImmutableObject<ThemeBody>;
export declare type IMThemeLink = ImmutableObject<ThemeLink>;
export declare type IMThemeSurfaces = ImmutableObject<ThemeSurfaces>;
export declare type IMThemeComponents = ImmutableObject<ThemeComponents>;
export declare type IMThemeArcGIS = ImmutableObject<ThemeArcGIS>;
export declare type IMThemeArcGISComponents = ImmutableObject<ThemeArcGISComponents>;
export declare type IMThemeOrgSharedColors = ImmutableObject<ThemeOrgSharedColors>;
export declare type IMSharedThemeJson = ImmutableObject<SharedThemeJson>;
export interface ThemeVariables {
    darkTheme?: boolean;
    sharedTheme?: boolean;
    sharedThemeVariables?: SharedThemeJson;
    coloration?: ThemeColorationType;
    colorationVariants?: IMThemeColorationVariants;
    typography?: IMThemeTypography;
    colors?: IMThemeAllColors;
    spacer?: Size;
    sizes?: IMThemeSizes;
    gutters?: IMThemeSizes;
    borderRadiuses?: IMThemeBorderRadiuses;
    boxShadows?: IMThemeBoxShadows;
    surfaces?: IMThemeSurfaces;
    header?: IMThemeHeader;
    footer?: IMThemeFooter;
    body?: IMThemeBody;
    link?: IMThemeLink;
    border?: IMThemeBorder;
    components?: IMThemeComponents;
    arcgis?: IMThemeArcGIS;
}
export declare type IMThemeVariables = ImmutableObject<ThemeVariables>;
export interface ThemeVariablesGenerator {
    darkTheme?: boolean;
    sharedTheme?: boolean;
    sharedThemeVariables?: IMSharedThemeJson;
    coloration?: ThemeColorationType;
    colorationVariants?: IMThemeColorationVariants;
    colors: ThemeAllColors;
    typography: ThemeTypography;
    spacer: Size;
    sizes: IMThemeSizes;
    gutters: IMThemeSizes;
    border: IMThemeBorder;
    borderRadiuses: IMThemeBorderRadiuses;
    boxShadows: IMThemeBoxShadows;
    body: IMThemeBody;
    link: IMThemeLink;
    generate: (themeVariables: Partial<ImmutableObject<Partial<ThemeVariables>>>, customVariables?: IMCustomThemeJson) => IMThemeVariables;
}
export interface ThemeInfo {
    name?: string;
    label?: string;
    uri?: string;
    colors?: IMThemeThemeColors;
    font?: IMThemeFontStyleBase;
    i18nLabel?: {
        [locale: string]: string;
    };
}
export declare type IMThemeInfo = ImmutableObject<ThemeInfo>;
export declare type ComponentCategoryType = 'navigation';
export declare const COMPONENT_CATEGORIES: {
    navigation: string[];
};
