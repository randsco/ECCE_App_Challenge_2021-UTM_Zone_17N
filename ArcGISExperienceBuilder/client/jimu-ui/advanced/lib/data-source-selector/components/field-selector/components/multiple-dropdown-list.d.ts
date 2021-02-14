/// <reference types="react" />
import { React, FieldSchema, IMFieldSchema, DataSource, ImmutableArray, ImmutableObject, IMThemeVariables } from 'jimu-core';
import { MultiSelectItem, SelectProps } from 'jimu-ui';
interface Props {
    theme: IMThemeVariables;
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
}
export default class MultipleDropdownList extends React.PureComponent<Props, State> {
    constructor(props: any);
    onFieldClick: (e: any, value: string | number) => void;
    getMultiSelectItems: () => MultiSelectItem[];
    render(): JSX.Element;
}
export {};
