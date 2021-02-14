/// <reference types="react" />
import { React, FieldSchema, IMFieldSchema, DataSource, ImmutableArray, ImmutableObject, ThemeVariables } from 'jimu-core';
interface Props {
    theme: ThemeVariables;
    fields: ImmutableObject<{
        [jimuName: string]: FieldSchema;
    }>;
    ds: DataSource;
    selectedFields?: ImmutableArray<string>;
    isMultiple?: boolean;
    onFieldClick: (f: IMFieldSchema) => void;
}
interface State {
    isOpen: boolean;
}
export default class CommonList extends React.PureComponent<Props, State> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
