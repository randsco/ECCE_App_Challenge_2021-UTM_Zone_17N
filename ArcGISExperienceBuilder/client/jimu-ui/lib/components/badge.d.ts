/// <reference types="react" />
import { React } from 'jimu-core';
interface BadgeProps {
    color?: 'primary' | 'secondary' | 'light' | 'dark' | 'success' | 'info' | 'warning' | 'danger';
    dot?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactElement | React.ReactNode;
    badgeStyle?: React.CSSProperties;
    badgeContent?: React.ReactElement | React.ReactNode;
    hideBadge?: boolean;
    [key: string]: any;
}
export declare const _Badge: {
    (props: BadgeProps): JSX.Element;
    defaultProps: {
        color: string;
        dot: boolean;
        hideBadge: boolean;
    };
};
export declare const Badge: React.ComponentType<BadgeProps>;
export {};
