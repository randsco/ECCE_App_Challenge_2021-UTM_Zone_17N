import { Padding, Boundary, RootBoundary, ComputedPlacement, Placement, State, Variation } from '@popperjs/core';
export declare const basePlacements: string[];
export declare const placements: any;
export declare const variationPlacements: any[];
declare type Options = {
    placement: Placement;
    padding: Padding;
    boundary: Boundary;
    rootBoundary: RootBoundary;
    flipVariations: boolean;
    allowedAutoPlacements?: Array<Placement>;
};
export declare const getBasePlacement: (placement: Placement) => Placement;
export declare const getOppositePlacement: (placement: Placement) => Placement;
export declare const getOppositeVariationPlacement: (placement: Placement) => Placement;
export declare const getVariation: (placement: Placement) => Variation;
export declare const computeAutoPlacement: (state: State, options?: Options) => Array<ComputedPlacement>;
export {};
