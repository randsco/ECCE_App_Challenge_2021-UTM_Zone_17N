/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, ClauseValueOptions, dateUtils } from 'jimu-core';
interface Props {
    value: ClauseValueOptions;
    runtime: boolean;
    isSmallSize?: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    isOpen: boolean;
}
export declare class _NumberListSelector extends React.PureComponent<Props & IntlProps, State> {
    value: number;
    unit: dateUtils.TimeUnit;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    onUnitSelect: (unit: dateUtils.TimeUnit) => void;
    onChange: () => void;
    toggle: () => void;
    render(): JSX.Element;
}
declare const NumberListSelector: React.FC<import("react-intl").WithIntlProps<Props & IntlProps>> & {
    WrappedComponent: React.ComponentType<Props & IntlProps>;
};
export default NumberListSelector;
