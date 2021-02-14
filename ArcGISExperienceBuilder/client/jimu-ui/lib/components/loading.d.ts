/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, SerializedStyles } from 'jimu-core';
import { LoadingType } from './types';
interface Props {
    className?: string;
    type?: LoadingType;
    width?: number;
    height?: number;
}
export declare class _Loading extends React.PureComponent<Props & {
    theme: ThemeVariables;
}> {
    static count: number;
    id: string;
    constructor(props: any);
    getClassFromType(type: LoadingType): string;
    getStyle(width: number, height: number, type: LoadingType): SerializedStyles;
    render(): JSX.Element;
}
export declare const Loading: React.ComponentType<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<Props & {
    theme: ThemeVariables;
} & React.RefAttributes<_Loading>, "theme">>>;
export {};
