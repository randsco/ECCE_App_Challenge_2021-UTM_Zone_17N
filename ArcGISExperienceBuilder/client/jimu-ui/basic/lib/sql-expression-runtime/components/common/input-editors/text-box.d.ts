/// <reference types="react" />
import { React, IMFieldSchema, JimuFieldType, ClauseValueOptions } from 'jimu-core';
interface Props {
    value: ClauseValueOptions;
    fieldObj: IMFieldSchema;
    runtime: boolean;
    isSmallSize?: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
    style?: React.CSSProperties;
    className?: string;
}
interface ExrtaProps {
}
interface State {
    displayUI: string;
}
export declare class _VITextBox extends React.PureComponent<Props & ExrtaProps, State> {
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    _setStateForDisplayUI: () => void;
    getDisplayUI: (fieldType: JimuFieldType) => string;
    onNumberChange: (e: any) => void;
    onTextChange: (e: any) => void;
    onChange: (value: any) => void;
    render(): JSX.Element;
}
declare const VITextBox: typeof _VITextBox;
export default VITextBox;
