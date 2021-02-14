/// <reference types="react" />
import { React } from 'jimu-core';
interface ProgressProps {
    color?: 'primary' | 'secondary' | 'light' | 'dark' | 'success' | 'info' | 'warning' | 'danger';
    type?: 'linear' | 'circular';
    showProgress?: boolean;
    className?: string;
    value?: number;
    style?: React.CSSProperties;
    circleSize?: number;
    [key: string]: any;
}
export declare const _Progress: {
    (props: ProgressProps): JSX.Element;
    defaultProps: {
        color: string;
        type: string;
        showProgress: boolean;
        circleSize: number;
        value: number;
    };
};
export declare const Progress: React.ComponentType<ProgressProps>;
export {};
