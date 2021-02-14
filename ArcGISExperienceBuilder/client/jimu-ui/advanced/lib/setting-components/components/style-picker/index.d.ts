/// <reference types="react" />
import { React } from 'jimu-core';
interface StylePickerProps {
    styles: Record<string, any>;
    value?: any;
    size?: 'small' | 'normal';
    onChange?: (value: any) => void;
}
interface StylePickerState {
    selectedValue: any;
}
export declare class _StylePicker extends React.PureComponent<StylePickerProps, StylePickerState> {
    constructor(props: any);
    onStyleClick: (value: any) => void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    render(): JSX.Element;
}
export declare const StylePicker: React.ComponentType<StylePickerProps>;
export {};
