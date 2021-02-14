/// <reference types="react" />
import { React, IMFieldSchema, DataSource, ImmutableArray, ClauseValueOptions, JimuFieldType } from 'jimu-core';
interface Props {
    value: ClauseValueOptions;
    fieldObj: IMFieldSchema;
    dataSource: DataSource;
    className?: string;
    runtime?: boolean;
    isSmallSize?: boolean;
    style?: React.CSSProperties;
    onChange: (valueObj: ClauseValueOptions) => void;
}
interface State {
    type: JimuFieldType;
    FieldSelector: any;
}
export declare class _VIFieldSelector extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    getSelectedFields: () => ImmutableArray<string>;
    onChange: (allSelectedFields: IMFieldSchema[]) => void;
    render(): JSX.Element;
}
declare const VIFieldSelector: typeof _VIFieldSelector;
export default VIFieldSelector;
