import { Options as PopperOptions, VirtualElement } from '@popperjs/core';
/**
 * Simple ponyfill for Object.fromEntries
 */
export declare const fromEntries: (entries: Array<[string, any]>) => {};
export declare const usePopper: (referenceElement?: Element | VirtualElement, popperElement?: HTMLElement, options?: PopperOptions) => {
    poppered: boolean;
    state: import("@popperjs/core").State;
    styles: {
        [key: string]: Partial<CSSStyleDeclaration>;
    };
    attributes: {
        [key: string]: {
            [key: string]: string;
        };
    };
    update: () => Promise<Partial<import("@popperjs/core").State>>;
    forceUpdate: () => void;
};
