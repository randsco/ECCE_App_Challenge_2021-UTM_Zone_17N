/// <reference types="react" />
import { React, DataSource, CodedValue, ClauseValueOptions, IMFieldSchema } from 'jimu-core';
interface Props {
    runtime: boolean;
    valueOptions: ClauseValueOptions;
    fieldObj: IMFieldSchema;
    dataSource: DataSource;
    isSmallSize?: boolean;
    codedValues?: CodedValue[];
    sql?: string;
    onChange: (valueOptions: ClauseValueOptions) => void;
}
interface State {
    inputEditor: any;
}
export declare class _InputEditorRender extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    _setStateForInputEditor: () => void;
    render(): JSX.Element;
}
export declare const InputEditorRender: typeof _InputEditorRender;
export {};
