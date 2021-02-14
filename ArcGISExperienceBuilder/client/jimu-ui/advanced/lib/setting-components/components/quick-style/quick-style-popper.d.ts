/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { TargetType, Placement } from 'jimu-ui';
export interface QuickStylePopperProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    open?: boolean;
    reference: TargetType;
    onClose?: () => void;
    placement?: Placement;
}
export declare const QuickStylePopper: (props: QuickStylePopperProps) => JSX.Element;
