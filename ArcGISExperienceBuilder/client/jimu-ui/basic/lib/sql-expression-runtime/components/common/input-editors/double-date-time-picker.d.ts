/// <reference types="react" />
import { React, IMFieldSchema, IntlShape, ClauseValueOptions } from 'jimu-core';
interface Props {
    value: ClauseValueOptions;
    fieldObj: IMFieldSchema;
    runtime: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    DatePicker: any;
    displayUI: string;
}
export declare class _VIDoubleDateTimePicker extends React.PureComponent<Props & IntlProps, State> {
    value1: ClauseValueOptions;
    value2: ClauseValueOptions;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    onChange: () => void;
    render(): JSX.Element;
}
declare const VIDoubleDateTimePicker: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<Props & IntlProps>>>;
export default VIDoubleDateTimePicker;
