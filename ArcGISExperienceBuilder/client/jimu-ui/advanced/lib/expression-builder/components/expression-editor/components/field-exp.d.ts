/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    exp: string;
    id: string;
    isEditable: boolean;
    isError: boolean;
    isDsDisabled: boolean;
    dataSourceId: string;
    className?: string;
    style?: React.CSSProperties;
}
interface State {
}
export default class FieldExp extends React.PureComponent<Props, State> {
    constructor(props: any);
    getDsLabel: () => string;
    render(): JSX.Element;
}
export {};
