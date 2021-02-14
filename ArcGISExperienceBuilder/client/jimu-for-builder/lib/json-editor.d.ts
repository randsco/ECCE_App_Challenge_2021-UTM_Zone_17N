/// <reference types="react" />
import { React } from 'jimu-core';
import 'brace/mode/json';
import 'brace/theme/tomorrow';
interface Props {
    json: any;
    width?: string;
    height?: string;
    onChange: (json: any) => void;
}
export default class JSONEditor extends React.PureComponent<Props> {
    onChange: (newValue: any) => void;
    render(): JSX.Element;
}
export {};
