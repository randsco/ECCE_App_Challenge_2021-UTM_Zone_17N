/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    mapItemId: string;
    portUrl: string;
}
interface States {
    mapThumbUrl: string;
}
export default class MapThumb extends React.PureComponent<Props, States> {
    unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props, prevState: any): void;
    setMapThumbUrl: (mapId: string) => void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
