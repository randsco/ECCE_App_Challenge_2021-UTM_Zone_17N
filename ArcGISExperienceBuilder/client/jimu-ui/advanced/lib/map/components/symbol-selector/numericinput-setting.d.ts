/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    onChange?: (value: number | undefined) => void;
    value?: number;
    min?: number;
    max?: number;
    style?: React.CSSProperties;
    size?: 'default' | 'lg' | 'sm';
}
interface States {
    value?: number;
}
export declare class NumericInputSetting extends React.PureComponent<Props, States> {
    constructor(props: any);
    componentDidUpdate(prevProps: Props): void;
    onHandleChange: (value?: number | string) => void;
    onHandleBlur: () => void;
    render(): JSX.Element;
}
export {};
