import { Boundary, Modifier, Padding, Placement, RootBoundary } from '@popperjs/core';
export declare type Options = {
    mainAxis: boolean;
    altAxis: boolean;
    fallbackPlacements: Array<Placement>;
    padding: Padding;
    boundary: Boundary;
    rootBoundary: RootBoundary;
    altBoundary: boolean;
    flipVariations: boolean;
    allowedAutoPlacements: Array<Placement>;
    useClosestVerticalPlacement?: boolean;
};
export declare type FlipModifier = Modifier<'flip', Options>;
/**
 * Overwrite the popper modifier `flip`
 * @param fallbackPlacements
 */
export declare const getCustomFlipModifier: (options?: Partial<Options>) => FlipModifier;
