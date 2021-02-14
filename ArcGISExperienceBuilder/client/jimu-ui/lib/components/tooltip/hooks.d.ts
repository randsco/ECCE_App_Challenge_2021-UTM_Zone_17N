/// <reference types="react" />
import { React } from 'jimu-core';
import { handleBlurVisible, isFocusVisible } from './focus-visible-utils';
export declare const useIsFocusVisible: () => {
    isFocusVisible: typeof isFocusVisible;
    onBlurVisible: typeof handleBlurVisible;
    ref: (instance: any) => void;
};
export declare const useTimers: () => React.MutableRefObject<any>[];
export declare const useTooltipRef: (setChildNode: any, forwardRef: any, focusVisibleRef: any, children: any) => (refValue: any) => void;
