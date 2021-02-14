/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape } from 'jimu-core';
import { UnitTypes, LinearUnit } from 'jimu-ui';
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
interface Props {
    label: string;
    mode: LayoutItemSizeModes;
    disableModeSelect?: boolean;
    value?: LinearUnit | string;
    availableUnits?: UnitTypes[];
    sizeModes?: LayoutItemSizeModes[];
    disabled?: boolean;
    onModeChange: (mode: LayoutItemSizeModes) => void;
    onChange: (value: LinearUnit) => void;
}
interface ExtraProps {
    intl?: IntlShape;
}
interface State {
    show: boolean;
}
export declare class _SizeEditor extends React.PureComponent<Props & ExtraProps, State> {
    domNode: React.RefObject<HTMLButtonElement>;
    static defaultProps: Partial<Props>;
    constructor(props: any);
    handleChange: (value: LayoutItemSizeModes) => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    nls: (id: string) => string;
    getPopperStyle: () => import("jimu-core").SerializedStyles;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const SizeEditor: React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>;
};
export {};
