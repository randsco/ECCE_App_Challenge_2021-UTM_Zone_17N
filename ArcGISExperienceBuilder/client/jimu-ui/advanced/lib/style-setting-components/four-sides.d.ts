/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape } from 'jimu-core';
import { FourSidesUnit, BorderSides, Sides } from 'jimu-ui';
interface Props {
    className?: string;
    value?: FourSidesUnit;
    onChange?: (value: FourSidesUnit) => void;
    disabled?: boolean;
    min?: number;
    max?: number;
    showTip?: boolean;
    sides?: Array<BorderSides | Sides>;
}
interface State {
    bindAll: boolean;
}
interface ExtraProps {
    intl?: IntlShape;
}
export declare class _FourSides extends React.PureComponent<Props & ExtraProps, State> {
    static defaultProps: Partial<Props>;
    constructor(props: any);
    _onSideValueChange: (val: any, index: number) => void;
    _onUnitChange: (newUnit: any) => void;
    _onAllSidesValueChange: (value: number) => void;
    _toggleBindAll: () => void;
    nls: (id: string) => string;
    handleAcceptValue: (evt: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>, index: number) => void;
    render(): JSX.Element;
}
export declare const FourSides: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>>;
export {};
