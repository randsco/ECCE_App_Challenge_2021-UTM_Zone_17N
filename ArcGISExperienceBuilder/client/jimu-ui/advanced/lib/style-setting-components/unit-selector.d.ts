/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, IntlShape } from 'jimu-core';
import { UnitTypes, Placement } from 'jimu-ui';
interface Props {
    unit?: UnitTypes;
    units?: Array<UnitTypes>;
    onChange?: (unit: UnitTypes) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    style?: any;
    placement?: Placement;
    disabled?: boolean;
}
interface ExtraProps {
    intl?: IntlShape;
    theme?: ThemeVariables;
}
interface State {
    show: boolean;
}
export declare class _UnitSelector extends React.PureComponent<Props & ExtraProps, State> {
    domNode: React.RefObject<HTMLButtonElement>;
    static defaultProps: Partial<Props>;
    constructor(props: any);
    handleChange: (newUnit: any) => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    nls: (id: string) => string;
    isDisabled: () => boolean;
    getPopperStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const UnitSelector: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>, "theme">>;
export {};
