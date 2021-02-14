/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LinearUnit, UnitTypes } from 'jimu-ui';
export declare type InputUnitValue = LinearUnit | string;
export interface InputUnitProps {
    /**
     * Selectable units: px, rem, em, %
     */
    units?: Array<UnitTypes>;
    /**
     * The value of component
     */
    value?: InputUnitValue;
    /**
     * Disable input and selection of units
     */
    disabled?: boolean;
    min?: number;
    max?: number;
    onChange?: (value: LinearUnit) => void;
    className?: string;
    style?: any;
    /**
     * @ignore
     */
    reverse?: boolean;
}
export declare class _InputUnit extends React.PureComponent<InputUnitProps, any> {
    static defaultProps: Partial<InputUnitProps>;
    _onInputChange: (val: number) => void;
    _onUnitChange: (newUnit: any) => void;
    handleAcceptValue: (evt: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => void;
    onPressEnter: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
    parseValue: (value: InputUnitValue) => LinearUnit;
    render(): JSX.Element;
}
/**
 * A react component for outputting a value with units
 */
export declare const InputUnit: React.ComponentType<InputUnitProps>;
