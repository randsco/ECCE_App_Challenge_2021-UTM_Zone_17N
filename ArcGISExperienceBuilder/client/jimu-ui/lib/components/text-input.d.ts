/// <reference types="react" />
import { React } from 'jimu-core';
import { InputProps } from './types';
/**
 * Props for the `TextInput` component.
 *
 * Inherits properties from the `HTMLInputElement`, only text related types are accepted for the `type` prop.
 *
 * See [additional props available from HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 */
export interface TextInputProps extends InputProps {
    /**
     * Defines the size of the component. The component will take the default size if the value is `undefined`.
     */
    size?: 'lg' | 'sm';
    /**
     * Callback fires when the text box is blurred or the `enter` key is pressed,
     * which is considered to be the complete of the editing process.
     */
    onAcceptValue?: (value: string) => void;
}
/**
 * The unstyled version of the TextInput component.
 * Please use {@link TextInput} instead.
 */
export declare const _TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
/**
 * A text field input component.
 *
 * #### Example:
 * ```typescript
 * import { TextInput } from 'jimu-ui';
 * <TextInput placeholder="Enter your name..." defaultValue="abc"/>
 * ```
 * #### Props:
 * See {@link TextInputProps} for more details.
 */
export declare const TextInput: React.ComponentType<TextInputProps & React.RefAttributes<HTMLInputElement>>;
