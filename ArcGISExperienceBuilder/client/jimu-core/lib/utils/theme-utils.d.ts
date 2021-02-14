import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { ThemeVariables, ThemeAllColors, IMThemeVariables, ComponentCategoryType } from '../types/theme';
import * as Immutable from 'seamless-immutable';
import { IMCustomThemeJson, CustomThemeJson } from '../types/app-config';
/**
 * Style a component with its registered style module in the Theme Manager.
 * @param Component - Component to be styled.
 * @param name - Optional displayedName of the component.
 */
declare function withStyles<C extends React.ComponentType<any>>(Component: C, name?: string): React.ComponentType<React.ComponentProps<C>>;
/**
 * Get theme name from a given url string.
 * @param themeUri - Path to the theme folder.
 */
declare function getThemeNameFromUri(themeUri: string): any;
/**
 * Lighten a given theme color.
 * The value will be retrived from theme color's palette.
 * @param themeColorName - Name of the theme color.
 * @param depth - Amount of lightness (from 1 to 9).
 * @param colors - Optional colors object used to get the lighten color from.
 */
declare function lighten(themeColorName: string, depth: number, colors: ThemeAllColors): string;
/**
 * Darken a given theme color.
 * The value will be retrived from theme color's palette.
 * @param themeColorName - Name of the theme color.
 * @param depth - Amount of darkness (from 1 to 9).
 * @param colors - Optional colors object used to get the darkened color from.
 */
declare function darken(themeColorName: string, depth: number, colors: ThemeAllColors): string;
/**
 * Get value from a theme variable path.
 * @param path - Path to the theme variable.
 * @param variables - Target theme variables object used to get value from.
 * if undefined, the theme variables from the current app will be used.
 */
declare function valueOf(path: string, variables?: Partial<ThemeVariables>): any;
/**
 * Get theme color path from a given color value.
 * @param color - Color value.
 * @param toVariable - If true, a string path to the variable separated by "." will be returned.
 * Otherwise, a CSS variable string will be returned.
 * @param variables - Target theme variables object used to get value from.
 * if undefined, the theme variables from the current app will be used.
 */
declare function pathOf(color: string, toVariable?: boolean, variables?: Partial<ThemeVariables>): string;
/**
 * Return theme variables for a given UI component as an object.
 * @param name - Name of the component.
 * @param themeUri - Path to the theme folder.
 */
declare function varsOf(name: string, themeUri?: string): any;
/**
 * Identify if a given string is a CSS variable.
 * @param varName - Name of the variable.
 */
declare function isCSSVar(varName: string): boolean;
/**
 * Get value from a path to a theme color variable.
 * @param path - Path to the theme variable.
 * @param variables - Target theme variables object used to get value from.
 * if undefined, the theme variables from the current app will be used.
 */
declare function color(path: string, variables?: Partial<ThemeVariables>): any;
/**
 * Style a component with the Builder theme instead of the default theme.
 * @param Component - Component to be styled.
 * @param name - Optional displayedName of the component.
 */
declare function withBuilderStyle(Component: React.ComponentType<any>, name?: string): React.ComponentType<any>;
/**
 * Provide a component with Builder theme.
 * @param Component - Component to be styled.
 * @param name - Optional displayedName of the component.
 */
declare function withBuilderTheme(Component: React.ComponentType<any>, name?: string): React.ComponentType<any>;
/**
 * Get theme object from Builder.
 */
declare function getBuilderThemeVariables(): IMThemeVariables;
/**
 * Get the mapped theme variables from an organization shared theme.
 * @param overrideComponents - If true, variables of certain UI components will also be overridden,
 * such as, Button and Link.
 */
declare function getMappedShareThemeVariables(overrideComponents?: boolean): IMCustomThemeJson;
declare function getThemeVariablesByCategory(categoryName: ComponentCategoryType, useBuilderTheme: boolean): {
    component: string;
    styles: Immutable.ImmutableObject<{}>;
}[];
declare function appendSharedTheme(target: any): CustomThemeJson;
export { withTheme, withStyles, getThemeNameFromUri, lighten, darken, valueOf, pathOf, varsOf, isCSSVar, color, withBuilderStyle, withBuilderTheme, getBuilderThemeVariables, getMappedShareThemeVariables, getThemeVariablesByCategory, appendSharedTheme };
