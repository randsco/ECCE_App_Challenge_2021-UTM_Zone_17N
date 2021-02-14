/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape } from 'jimu-core';
interface Props {
    value: number | string;
    disabled?: boolean;
    style?: any;
    intl: IntlShape;
    onChange?: (ratio: string) => void;
}
export declare class _InputRatio extends React.PureComponent<Props, any> {
    static defaultProps: Partial<Props>;
    width: number;
    height: number;
    onWidthChange: (val: number) => void;
    onHeightChange: (val: number) => void;
    parseAspectRatio(ratio: number | string): void;
    formatMessage(id: string): string;
    render(): JSX.Element;
}
export declare const InputRatio: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<Props>>>;
export {};
