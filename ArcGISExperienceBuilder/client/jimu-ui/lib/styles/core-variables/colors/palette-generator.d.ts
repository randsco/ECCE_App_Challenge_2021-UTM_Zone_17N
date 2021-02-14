import { ThemeThemeColors, ColorPaletteGenerator, PaletteLightnessRange, ThemeColorPaletteItem, ThemeColorPalette } from 'jimu-core';
export declare class PaletteGenerator implements ColorPaletteGenerator {
    shadeCount: number;
    getLightness(color: string): number;
    getShadeLevel(lightness: number, lightnessRange: PaletteLightnessRange, shadeStep: number): number;
    getColorsByShade(color: string, shadeLevel: number, lightnessRange: PaletteLightnessRange, reverse?: boolean): ThemeColorPaletteItem;
    generate(themeColors: Partial<ThemeThemeColors>, isDarkTheme?: boolean): ThemeColorPalette;
    revertPalette(themePalette: ThemeColorPalette): ThemeColorPalette;
}
