import { ThemeVariablesGenerator, IMCustomThemeJson, IMThemeVariables, IMThemeColorationVariants, ThemeSize, IMThemeAllColors, IMThemeTypography, IMThemeSizes, IMThemeBorder, IMThemeBorderRadiuses, IMThemeSurfaces, IMThemeBoxShadows, IMThemeBody, IMThemeHeader, IMThemeFooter, IMThemeLink, ThemeColorationType, IMSharedThemeJson } from 'jimu-core';
export declare class MainThemeVariablesGenerator implements ThemeVariablesGenerator {
    darkTheme: boolean;
    sharedTheme: boolean;
    sharedThemeVariables: IMSharedThemeJson;
    coloration: ThemeColorationType;
    colors: IMThemeAllColors;
    colorationVariants: IMThemeColorationVariants;
    typography: IMThemeTypography;
    spacer: ThemeSize;
    sizes: IMThemeSizes;
    gutters: IMThemeSizes;
    border: IMThemeBorder;
    borderRadiuses: IMThemeBorderRadiuses;
    boxShadows: IMThemeBoxShadows;
    surfaces: IMThemeSurfaces;
    body: IMThemeBody;
    header: IMThemeHeader;
    footer: IMThemeFooter;
    link: IMThemeLink;
    generate(originalVariables: IMCustomThemeJson, customVariables?: IMCustomThemeJson): IMThemeVariables;
}
