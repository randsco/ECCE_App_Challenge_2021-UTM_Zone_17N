/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
export interface Props {
    onIntersectionChange: (boolean: any) => void;
}
export declare class ViewportIntersectionObserver extends React.PureComponent<Props> {
    elemRef: React.RefObject<HTMLDivElement>;
    observer: IntersectionObserver;
    constructor(props: any);
    handleIntersectionChange(entry: IntersectionObserverEntry): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
