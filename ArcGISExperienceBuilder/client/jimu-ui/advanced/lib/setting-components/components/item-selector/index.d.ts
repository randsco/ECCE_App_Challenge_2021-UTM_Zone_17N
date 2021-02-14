/// <reference types="react" />
import { React } from 'jimu-core';
interface ItemSelectorOption {
    value: any;
    content: string | JSX.Element;
    label?: string;
}
interface ItemSelectorProps {
    options: ItemSelectorOption[];
    value?: any;
    size?: {
        width?: string;
        height?: string;
    };
    vertical?: boolean;
    className?: string;
    style?: React.CSSProperties;
    gutter?: string;
    onChange?: (value: any) => void;
}
interface ItemSelectorState {
    value: any;
}
export declare class _ItemSelector extends React.PureComponent<ItemSelectorProps, ItemSelectorState> {
    static count: number;
    inputName: string;
    state: {
        value: any;
        size: string;
    };
    onRadioButtonClick: (value: any) => void;
    componentDidUpdate(PrevProps: ItemSelectorProps, prevState: ItemSelectorState): void;
    constructor(props: any);
    render(): JSX.Element;
}
export declare const ItemCardSelector: React.ComponentType<ItemSelectorProps>;
export {};
