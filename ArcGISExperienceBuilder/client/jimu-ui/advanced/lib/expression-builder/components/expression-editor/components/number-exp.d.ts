/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    exp: string;
    id: string;
    isEditable: boolean;
    className?: string;
    style?: React.CSSProperties;
}
interface State {
}
export default class NumberExp extends React.PureComponent<Props, State> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
