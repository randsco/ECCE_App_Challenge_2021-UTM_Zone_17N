import { IMThemeVariables, ThemeVariablesGenerator } from './types/theme';
import { SerializedStyles } from '@emotion/css';
import { IMThemeManifest } from './types/manifest';
import { IMCustomThemeJson, CustomThemeJson } from './types/app-config';
interface ComponentStyleFunc {
    (props: any): SerializedStyles;
}
export interface ComponentStyles {
    [componentName: string]: ComponentStyleFunc;
}
export interface ThemeStyleModule {
    variablesGenerator?: ThemeVariablesGenerator;
    componentStyles: ComponentStyles;
}
interface ThemeModule {
    manifest: IMThemeManifest;
    styleModule?: ThemeStyleModule;
    variables?: {
        themeVariables: IMThemeVariables;
        customVariables: IMCustomThemeJson;
        mergedToJimuVariables: IMThemeVariables;
    };
}
export default class ThemeManager {
    /**
     * These variables store jimu modules
     */
    private jimuThemeStyleModule;
    private jimuComponentStyles;
    private jimuThemeVariablesGenerators;
    /**
     * These variables store theme modules
     */
    private themeLoadPromises;
    private themeModules;
    private sharedThemeJson;
    static instance: ThemeManager;
    static getInstance(): ThemeManager;
    static getInAppInstance(): ThemeManager;
    constructor();
    registerJimuThemeStyleModule(entryName: string, jimuThemeStyleModule: ThemeStyleModule): void;
    loadTheme(themeUri: string): Promise<ThemeModule>;
    private updateThemeVariablesInState;
    isThemeLoaded(themeUri: string): boolean;
    loadThemeVariables(themeUri: string): Promise<IMThemeVariables>;
    loadThemeManifest(themeUri: string): Promise<IMThemeManifest>;
    refreshSharedTheme(): void;
    loadSharedTheme(sharedTheme: any): void;
    getSharedThemeJson(): any;
    updateThemeCustomVariables(themeUri: string, customVariables: IMCustomThemeJson): void;
    addThemeCustomVariables(themeUri: string, customVariables: CustomThemeJson): IMCustomThemeJson;
    removeThemeCustomVariables(themeUri: string, propPaths: string[]): void;
    clearAllThemeCustomVariables(): void;
    getGlobalStyles(theme: IMThemeVariables): SerializedStyles;
    getComponentStyles(componentName: string, props?: any): SerializedStyles;
    /**
     * get the final theme variables
     * @param themeUri
     */
    getThemeVariables(themeUri: string): IMThemeVariables;
    /**
     * get the original theme variables with references
     * @param themeUri
     */
    getRawThemeVariables(themeUri: string): IMThemeVariables;
    getCustomVariables(themeUri: string): IMCustomThemeJson;
    getThemeManifest(themeUri: string): IMThemeManifest;
    getThemeModule(themeUri: string): ThemeModule;
    private mergeThemeVarsToJimuVars;
    private parseVars;
    private onThemeChange;
    private onCustomThemeChange;
    private onPortalSelfChange;
}
export {};
