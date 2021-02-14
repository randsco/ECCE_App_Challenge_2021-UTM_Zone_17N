/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { EditableInputProps } from './editable-input';
import { InjectedColorProps } from './core';
export declare type HexProps = EditableInputProps & InjectedColorProps;
interface ExtraProps {
    theme?: ThemeVariables;
}
declare class _Hex extends React.PureComponent<HexProps & ExtraProps> {
    handleChange: (data: any) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const Hex: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<EditableInputProps & InjectedColorProps & ExtraProps & React.RefAttributes<_Hex>, "theme">>;
export {};
