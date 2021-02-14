/// <reference types="react" />
import { React, FieldSchema, IMFieldSchema, DataSource, ImmutableArray, ImmutableObject, ThemeVariables } from 'jimu-core';
import { SelectProps } from 'jimu-ui';
interface Props {
    theme: ThemeVariables;
    fields: ImmutableObject<{
        [jimuName: string]: FieldSchema;
    }>;
    ds: DataSource;
    placeHolder?: string;
    dropdownProps?: SelectProps;
    selectedFields?: ImmutableArray<string>;
    onFieldClick: (f: IMFieldSchema) => void;
}
interface State {
    isOpen: boolean;
}
export default class SingleDropdownList extends React.PureComponent<Props, State> {
    constructor(props: any);
    toggle: () => void;
    getSelectedFieldJimuName: () => string;
    onFieldChange: (e: any) => void;
    render(): JSX.Element;
}
export {};
