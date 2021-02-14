/// <reference types="react" />
import { SwitchBase, SwichBaseProps } from './_switchBase';
import { React } from 'jimu-core';
/**
 * @ignore
 */
export declare class _CheckboxComponent extends SwitchBase {
    render(): JSX.Element;
}
/**
 * The unstyled version of the Checkbox component.
 * Please use {@link Checkbox} instead.
 */
export declare const _Checkbox: React.ForwardRefExoticComponent<SwichBaseProps & React.RefAttributes<HTMLInputElement>>;
/**
 * A UI component used to turn an option on or off.
 *
 * #### Example:
 * ```typescript
 * import { Checkbox } from 'jimu-ui';
 * <Checkbox checked/>
 * ```
 * #### Props:
 * See {@link SwichBaseProps} for more details.
 */
export declare const Checkbox: React.ComponentType<SwichBaseProps & React.RefAttributes<HTMLInputElement>>;
