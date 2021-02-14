/// <reference types="react" />
import { React, LayoutItemConstructorProps } from 'jimu-core';
export declare const LayoutContext: React.Context<LayoutContextProps>;
export declare type LayoutContextProps = {
    isItemAccepted?: (item: LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
};
