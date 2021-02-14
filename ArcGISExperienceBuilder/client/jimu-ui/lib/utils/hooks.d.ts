/// <reference types="react" />
import { React } from 'jimu-core';
export interface UseControlledProps {
    /**
     * This prop contains the component value when it's controlled.
     */
    controlled: any;
    /**
     * The default value.
     */
    default: any;
}
export declare type RefValue<T> = React.RefObject<T> | React.MutableRefObject<T> | ((e: T) => void);
/**
 * Returns a function to use Intl translation
 * @param message Default message, use the default message of jimu-ui
 */
export declare const useTranslate: (messages?: {
    [x: string]: any;
} | {
    [x: string]: any;
}[]) => (id: string, values?: any) => string;
export declare const useRefValue: <T extends unknown>(value: T) => React.MutableRefObject<T>;
/**
  * This will create a new function if the ref props change and are defined.
  */
export declare const useForkRef: <T>(refA: RefValue<T>, refB: RefValue<T>) => (refValue: any) => void;
/**
 * Receives a ref, returns a ref and a callback function to assign values to both refs
 * @param ref
 */
export declare const useForwardRef: <T extends unknown>(ref: RefValue<T>) => [React.MutableRefObject<T>, (T: any) => void];
/**
 * Receives a ref, return a callback function to assign val to ref and setVal
 * @param ref
 */
export declare const useForwardValueRef: <T>(ref: RefValue<T>) => [T, (e: T) => void];
/**
 * Returns true if component is just mounted (on first render) and false otherwise.
 */
export declare const useFirstMountState: () => boolean;
/**
 * React effect hook that ignores the first invocation (e.g. on mount).
 * The signature is exactly the same as the useEffect hook.
 *
 * @param effect
 * @param deps
 */
export declare const useUpdateEffect: (effect: any, deps: any) => void;
/**
 * React lifecycle hook that runs an effect only once.
 *
 * @param effect
 */
export declare const useEffectOnce: (effect: React.EffectCallback) => void;
/**
 * React lifecycle hook that calls a function when the component will unmount.
 * @param fn
 */
export declare const useUnmount: (fn: () => any) => void;
/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * @param fn
 * @param dependencies
 * Note: Don't call this in the render phase
 */
export declare const useEventCallback: (fn: any) => (...args: any[]) => any;
/**
 * when controlled, use value from prop and don't update value by setValue
 */
export declare const useControlled: ({ controlled, default: defaultProp }: UseControlledProps) => any[];
/**
 * Listen if the specified widget is selected
 * @param id
 */
export declare const useWidgetSelected: (id: string) => boolean;
/**
 * Listen if the specified widget is selected in the builder
 * @param id
 */
export declare const useWidgetActived: (id: string) => boolean;
/**
 * Check is mobile env (borwser small size mode) or not
 */
export declare const useCheckSmallBrowserSzieMode: () => boolean;
