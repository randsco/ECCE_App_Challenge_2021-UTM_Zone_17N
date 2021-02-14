/// <reference types="react" />
import { SwitchBase, SwichBaseProps } from './_switchBase';
import { React } from 'jimu-core';
/**
 * @ignore
 */
export declare class _RadioComponent extends SwitchBase {
    static displayName: string;
    constructor(props: SwichBaseProps);
    render(): JSX.Element;
}
/**
 * The unstyled version of the Radio component.
 * Please use {@link Radio} instead.
 */
export declare const _Radio: React.ForwardRefExoticComponent<SwichBaseProps & React.RefAttributes<HTMLInputElement>>;
/**
 * Radio components are used to let a user select only one of a limited number of choices.
 * Consider wrapping the Radio component within a Label component if you would like to add a text label.
 *
 * #### Example:
 * ```typescript
 * import { Radio, Label } from 'jimu-ui';
 * <Label><Radio name="sample" value="1" checked/> option 1 <Label>
 * <Label><Radio name="sample" value="2"/> option 2 <Label>
 * ```
 * #### Props:
 * See {@link SwichBaseProps} for more details.
 */
export declare const Radio: React.ComponentType<SwichBaseProps & React.RefAttributes<HTMLInputElement>>;
