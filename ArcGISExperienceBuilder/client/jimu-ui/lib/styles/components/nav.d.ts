import { ThemeNavType, ThemeNavVariant, ThemeBoxStyles } from 'jimu-core';
declare function getRootStyles(rootVars: ThemeBoxStyles): import("jimu-core").SerializedStyles;
declare function getVariantStyles(type: ThemeNavType, variantVars: ThemeNavVariant, isVertical?: boolean, isRight?: boolean): import("jimu-core").SerializedStyles;
export declare const navStyles: (props: any) => import("jimu-core").SerializedStyles;
export declare const navStyleUtils: {
    getRootStyles: typeof getRootStyles;
    getVariantStyles: typeof getVariantStyles;
};
export {};
