import { ThemeSliderVariant, ThemeBoxStyles, ThemeBoxStylesByState } from 'jimu-core';
declare function getRootStyles(root: ThemeBoxStyles): import("jimu-core").SerializedStyles;
declare function getThumbStyles(stateVars: ThemeBoxStylesByState, hideThumb?: boolean): import("jimu-core").SerializedStyles;
declare function getTrackStyles(stateVars: ThemeBoxStylesByState): import("jimu-core").SerializedStyles;
declare function getVariantStyles(variantVars: ThemeSliderVariant, hideThumb?: boolean, isRTL?: boolean): import("jimu-core").SerializedStyles;
declare function getSizeStyles(size: any): import("jimu-core").SerializedStyles;
export declare const sliderStyles: (props: any) => import("jimu-core").SerializedStyles;
export declare const sliderStyleUtils: {
    getRootStyles: typeof getRootStyles;
    getThumbStyles: typeof getThumbStyles;
    getTrackStyles: typeof getTrackStyles;
    getVariantStyles: typeof getVariantStyles;
    getSizeStyles: typeof getSizeStyles;
};
export {};
