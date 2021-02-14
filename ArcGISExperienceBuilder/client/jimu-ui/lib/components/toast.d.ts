/// <reference types="react" />
import { React } from 'jimu-core';
import { ToastType } from './types';
interface Props {
    type: ToastType;
    text: string;
    open: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare class _Toast extends React.PureComponent<Props> {
    static count: number;
    id: string;
    constructor(props: any);
    render(): React.ReactPortal;
}
export declare const Toast: React.ComponentType<Props>;
export {};
