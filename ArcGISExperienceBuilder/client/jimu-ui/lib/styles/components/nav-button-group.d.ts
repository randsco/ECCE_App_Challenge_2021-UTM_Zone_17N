import { ThemeBoxStyles, ThemeBoxStylesByState, ThemeNavButtonGroupVariant } from 'jimu-core';
declare function getRootStyles(rootVars: ThemeBoxStyles): import("jimu-core").SerializedStyles;
declare function getItemStyles(stateVars: ThemeBoxStylesByState): import("jimu-core").SerializedStyles;
declare function getVariantStyles(variantVars: ThemeNavButtonGroupVariant): import("jimu-core").SerializedStyles;
export declare const navButtonGroupStyles: (props: any) => import("jimu-core").SerializedStyles;
export declare const navButtonGroupStyleUtils: {
    getRootStyles: typeof getRootStyles;
    getItemStyles: typeof getItemStyles;
    getVariantStyles: typeof getVariantStyles;
};
export {};
