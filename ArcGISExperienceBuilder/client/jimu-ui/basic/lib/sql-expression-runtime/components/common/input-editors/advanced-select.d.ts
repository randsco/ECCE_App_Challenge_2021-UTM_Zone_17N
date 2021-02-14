/// <reference types="react" />
import { React, DataSource, IMFieldSchema, CodedValue, ClauseValueOptions, ClauseValuePair } from 'jimu-core';
interface Props {
    value: ClauseValueOptions;
    dataSource: DataSource;
    runtime: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
    isSmallSize?: boolean;
    isMultiple?: boolean;
    codedValues?: CodedValue[];
    fieldObj?: IMFieldSchema;
    sql?: string;
    style?: React.CSSProperties;
    className?: string;
}
interface State {
}
export declare class _VIAdvancedSelect extends React.PureComponent<Props, State> {
    constructor(props: any);
    onValueChange: (valuePairs: ClauseValuePair[]) => void;
    render(): JSX.Element;
}
declare const VIAdvancedSelect: typeof _VIAdvancedSelect;
export default VIAdvancedSelect;
