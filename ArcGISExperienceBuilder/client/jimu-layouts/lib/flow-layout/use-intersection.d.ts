import { ScreenTriggerType } from 'jimu-core';
export declare const INTERSECTION_HEIGHT = 2;
/**
 *
 * @param ref
 * @param rootElement
 * @param onIntersectionChange
 */
export declare function useIntersection(ref: HTMLElement, rootElement: HTMLElement, triggerType: ScreenTriggerType, onIntersectionChange: (isIntersecting: boolean) => void): void;
