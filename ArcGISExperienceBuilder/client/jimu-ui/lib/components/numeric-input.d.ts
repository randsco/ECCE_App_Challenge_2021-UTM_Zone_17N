/// <reference types="react" />
import { React } from 'jimu-core';
declare type OmitInputNumberProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'size'>;
/**
 * Props for the `TextInput` component.
 *
 * Inherits properties from the `HTMLInputElement`.
 *
 * See [additional props available from HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 */
export interface NumericInputProps extends OmitInputNumberProps {
    /**
     * The reference forwarded to the root input element.
     */
    forwardedRef?: any;
    /**
     * Defines the size of the component. The component will take the default size if the value is `undefined`.
     */
    size?: 'default' | 'lg' | 'sm';
    /**
     * The default input element value used when the component is not controlled.
     */
    defaultValue?: number | string;
    /**
     * The input element value used when the component is controlled.
     */
    value?: number | string;
    /**
     * Callback fires when the `Enter` key is pressed.
     */
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    /**
     * Callback fires when the input box is blurred or the `enter` key is pressed,
     * which is considered to be the complete of the editing process.
     */
    onAcceptValue?: (value: number | string) => void;
    /**
     * Callback fires when the value is changed.
     */
    onChange?: (value: number | undefined) => void;
    /**
     * Specifies the precision length of the value (number of decimal dijits).
     */
    precision?: number;
    /**
     * If `true`, the input element will get focus when the up and down step handlers are clicked.
     */
    focusOnUpDown?: boolean;
    /**
     * If `true`, the component will automatically get focus when the page is loaded.
     */
    autoFocus?: boolean;
    /**
     * If `true`, the component will support touch on mobile devices.
     */
    useTouch?: boolean;
    /**
     * If `true`, the component will show the up and down arrow handlers.
     */
    showHandlers?: boolean;
    /**
     * Specifies the format of the displayed value
     */
    formatter?: (value: number | string) => string;
    /**
     * Specifies the value extracted from the formatter
     */
    parser?: (displayValue: string) => number | string;
}
/**
 * The unstyled version of the NumericInput component.
 * Please use {@link NumericInput} instead.
 */
export declare const _NumericInput: React.ForwardRefExoticComponent<NumericInputProps & React.RefAttributes<unknown>>;
/**
 * A form input component that specifically handles entry of numeric values.
 *
 * #### Example:
 * ```typescript
 * import { NumericInput } from 'jimu-ui';
 * <NumericInput min={0} max={100} defaultValue="50"/>
 * ```
 * #### Props:
 * See {@link TextInputProps} for more details.
 */
export declare const NumericInput: React.ComponentType<NumericInputProps & React.RefAttributes<unknown>>;
export {};
