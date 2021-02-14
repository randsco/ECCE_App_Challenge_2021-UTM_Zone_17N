import { Modifiers as NewModifiers, Modifier, Placement, PopperOptions as NewPopperOptions } from './core';
declare type Boundary = 'scrollParent' | 'viewport' | 'window';
declare type Behavior = 'flip' | 'clockwise' | 'counterclockwise';
interface Padding {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}
declare type ModifierFn = (data: any, options: Record<string, any>) => any;
interface BaseModifier {
    order?: number;
    enabled?: boolean;
    fn?: ModifierFn;
}
interface Modifiers {
    shift?: BaseModifier;
    offset?: BaseModifier & {
        offset?: number | string;
    };
    preventOverflow?: BaseModifier & {
        priority?: Position[];
        padding?: number | Padding;
        boundariesElement?: Boundary | Element;
        escapeWithReference?: boolean;
    };
    keepTogether?: BaseModifier;
    arrow?: BaseModifier & {
        element?: string | Element;
    };
    flip?: BaseModifier & {
        behavior?: Behavior | Position[];
        padding?: number | Padding;
        boundariesElement?: Boundary | Element;
        flipVariations?: boolean;
        flipVariationsByContent?: boolean;
    };
    inner?: BaseModifier;
    hide?: BaseModifier;
    applyStyle?: BaseModifier & {
        onLoad?: () => any;
        gpuAcceleration?: boolean;
    };
    computeStyle?: BaseModifier & {
        gpuAcceleration?: boolean;
        x?: 'bottom' | 'top';
        y?: 'left' | 'right';
    };
    [name: string]: (BaseModifier & Record<string, any>) | undefined;
}
interface PopperOptions {
    placement?: Placement;
    positionFixed?: boolean;
    eventsEnabled?: boolean;
    removeOnDestroy?: boolean;
    modifiers?: Modifiers;
    onCreate?: () => any;
    onUpdate?: () => any;
}
export declare const upgradeBaseModifier: (_modifier: BaseModifier, name: string) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const parseOffset: (_offset: string | number) => [number, number];
export declare const upgradeOffset: (_modifier: Modifiers['offset']) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const upgradePreventOverflow: (_modifier?: Modifiers['preventOverflow']) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const upgradeArrow: (_modifier?: Modifiers['arrow']) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const upgradeFlip: (_modifier?: Modifiers['flip']) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const upgradeHide: (_modifier?: Modifiers['hide']) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const upgradeComputeStyle: (_modifier?: Modifiers['computeStyle']) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const upgradeApplyStyle: (_modifier?: Modifiers['applyStyle']) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const upgradeCustomModifier: (_modifier: BaseModifier & Record<string, any>, name: string) => Partial<Modifier<any, any>> & {
    order: number;
};
export declare const upgradeModifiers: (_modifiers: Modifiers) => NewModifiers;
export declare const upgradePopperOption: (_option: PopperOptions) => NewPopperOptions;
export {};
