/// <reference types="react" />
/** @jsx jsx */
import { InputProps } from './types';
import { React } from 'jimu-core';
/**
 * Props for the `Slider` component.
 *
 * Inherits properties from `HTMLInputElement`.
 * The `type` prop cannot be changed and is set as 'range' by default.
 *
 * See [additional props available from HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 */
export interface SliderProps extends InputProps {
    hideThumb?: boolean;
}
/**
 * To exploit the unstyled Slider component.
 * Please use {@link Slider} instead.
 */
export declare const _Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLInputElement>>;
/**
 * A Slider component is used to select a number within a given range.
 *
 * #### Example:
 * ```typescript
 * import { Slider } from 'jimu-ui';
 * <Slider min={-100} max={300} step={5} defaultValue="100"/>
 * ```
 * #### Props:
 * See {@link SliderProps} for more details.
 */
export declare const Slider: React.ComponentType<SliderProps & React.RefAttributes<HTMLInputElement>>;
