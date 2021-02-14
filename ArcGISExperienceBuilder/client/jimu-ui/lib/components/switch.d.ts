/// <reference types="react" />
import { React } from 'jimu-core';
import { SwichBaseProps } from './_switchBase';
/**
 * The unstyled version of the Switch component.
 * Please use {@link Switch} instead.
 */
export declare const _Switch: React.ForwardRefExoticComponent<SwichBaseProps & React.RefAttributes<HTMLInputElement>>;
/**
 * A UI component used to toggle an on-off state.
 *
 * #### Example:
 * ```typescript
 * import { Switch } from 'jimu-ui';
 * <Switch checked/>
 * ```
 * #### Props:
 * See {@link SwichBaseProps} for more details.
 */
export declare const Switch: React.ComponentType<SwichBaseProps & React.RefAttributes<HTMLInputElement>>;
