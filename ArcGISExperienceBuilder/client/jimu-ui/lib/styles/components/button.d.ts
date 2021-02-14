import { ThemeButtonStylesByState, ThemeButtonSize, SerializedStyles } from 'jimu-core';
export declare function buttonSize(sizeVars: ThemeButtonSize): SerializedStyles;
export declare function buttonVariantStyles(buttonVars: ThemeButtonStylesByState): SerializedStyles;
export declare function getIconButtonPadding(buttonSizeVars: ThemeButtonSize): string;
export declare const buttonStyles: (props: any) => SerializedStyles;
