/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    onDestroyed?: () => void;
}
export default class PanelShell extends React.PureComponent<Props, unknown> {
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
