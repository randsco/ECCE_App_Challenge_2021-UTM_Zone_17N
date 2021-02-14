/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { ExpSelection, PopoverItem } from '../types';
interface Props {
    items: PopoverItem[];
    selectedItemIndex: string;
    targetNodeId: string;
    containerNode: HTMLElement;
    isOpen: boolean;
    theme: ThemeVariables;
    expSelection: ExpSelection;
    onClick?: (item: PopoverItem, target: string) => void;
}
interface State {
    targetNode: HTMLElement;
}
export default class ExpPopover extends React.PureComponent<Props, State> {
    root: HTMLElement;
    itemHeight: number;
    popoverItemStyle: {
        lineHeight: string;
    };
    constructor(props: any);
    componentDidUpdate(prevProps: Props): void;
    getTarget: (id: string, containerNode: HTMLElement) => HTMLElement;
    render(): JSX.Element;
}
export {};
