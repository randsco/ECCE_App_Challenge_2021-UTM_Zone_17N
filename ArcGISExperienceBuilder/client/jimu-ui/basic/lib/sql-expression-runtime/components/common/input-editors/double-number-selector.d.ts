/// <reference types="react" />
import { React, IMFieldSchema, IntlShape, ClauseValueOptions } from 'jimu-core';
interface Props {
    value: ClauseValueOptions;
    fieldObj: IMFieldSchema;
    onChange: (valueObj: ClauseValueOptions) => void;
    runtime: boolean;
    style?: React.CSSProperties;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
}
export declare class _VIDoubleNumberSelector extends React.PureComponent<Props & IntlProps, State> {
    value1: number;
    value2: number;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    onValue1Change: (e: any) => void;
    onValue2Change: (e: any) => void;
    onChange: () => void;
    render(): JSX.Element;
}
declare const VIDoubleNumberSelector: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<Props & IntlProps>>>;
export default VIDoubleNumberSelector;
