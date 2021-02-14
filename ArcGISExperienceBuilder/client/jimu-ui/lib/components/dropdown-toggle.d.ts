/// <reference types="react" />
import { React, ThemeButtonType } from 'jimu-core';
interface DropdownToggleProps extends React.HTMLAttributes<HTMLElement> {
    type?: ThemeButtonType;
    icon?: boolean;
    htmlType?: 'submit' | 'reset' | 'button';
    [key: string]: any;
    caret?: boolean;
    className?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<any>;
    'data-toggle'?: string;
    'aria-haspopup'?: boolean;
    split?: boolean;
    tag?: React.ReactType;
    nav?: boolean;
    color?: string;
    size?: string;
}
/**
 * @deprecated Please use {@link DropdownButton} instead
 */
export declare class _DropdownToggle extends React.PureComponent<DropdownToggleProps> {
    static contextType: React.Context<{}>;
    static defaultProps: Partial<DropdownToggleProps>;
    constructor(props: any);
    onClick(e: any): void;
    render(): JSX.Element;
}
export declare const DropdownToggle: React.ComponentType<DropdownToggleProps>;
export {};
