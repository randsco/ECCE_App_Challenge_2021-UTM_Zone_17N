/// <reference types="react" />
import { React, ThemeVariables, IMLayoutItemJson } from 'jimu-core';
export declare const ToolbarContext: React.Context<{}>;
export declare type ToolbarContextProps = {
    activeItem?: string;
    toggleOn?: boolean;
    layoutId: string;
    layoutItem: IMLayoutItemJson;
    parentRef: HTMLElement;
    theme: ThemeVariables;
    onItemClick: (value: string, toggleOn?: boolean) => void;
    formatMessage: (id: string) => string;
};
