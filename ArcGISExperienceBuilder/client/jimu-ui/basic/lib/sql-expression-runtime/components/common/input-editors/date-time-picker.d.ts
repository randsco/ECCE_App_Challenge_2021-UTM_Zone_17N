/// <reference types="react" />
import { React, IMFieldSchema, ClauseValueOptions } from 'jimu-core';
interface Props {
    value: ClauseValueOptions;
    fieldObj: IMFieldSchema;
    runtime: boolean;
    isSmallSize?: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
    style?: React.CSSProperties;
}
interface ExrtaProps {
}
interface State {
    DatePicker: any;
    displayUI: string;
}
export declare class _VIDateTimePicker extends React.PureComponent<Props & ExrtaProps, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    getInputEditor: (inputEditorType: string) => string;
    getFormatedValue: () => any;
    checkIfTimezoneChanged: () => boolean;
    onChange: (value: number, label?: string) => void;
    render(): JSX.Element;
}
declare const VIDateTimePicker: typeof _VIDateTimePicker;
export default VIDateTimePicker;
