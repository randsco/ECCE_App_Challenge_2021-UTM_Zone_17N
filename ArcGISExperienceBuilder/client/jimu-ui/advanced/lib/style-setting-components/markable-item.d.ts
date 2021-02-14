/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
interface Props {
    label: string;
    value: any;
    marked: boolean;
    className?: string;
    style?: any;
    onChange?: (value: any) => void;
    theme?: ThemeVariables;
}
interface ExtraProps {
    theme?: ThemeVariables;
}
export declare class _MarkableItem extends React.PureComponent<Props & ExtraProps, any> {
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export declare const MarkableItem: React.ComponentType<Props & ExtraProps>;
export {};
