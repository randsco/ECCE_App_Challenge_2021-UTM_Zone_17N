/// <reference types="react" />
import { React } from 'jimu-core';
export declare const NavMenuContext: React.Context<{
    ref?: HTMLElement;
    setRef?: (ref: HTMLElement) => void;
    toggle?: (e: any) => void;
    isOpen?: boolean;
    isDropdow?: boolean;
    direction?: string;
    menuOpenMode?: string;
    menuMode?: string;
    textAlign?: 'left' | 'center' | 'right';
}>;
