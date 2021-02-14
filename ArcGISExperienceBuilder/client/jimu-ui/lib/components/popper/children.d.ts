/// <reference types="react" />
import { React } from 'jimu-core';
import { FloatingPanelProps, OverlayManagerProps } from '../floating-panel';
interface _PopperChildrenProps extends Omit<FloatingPanelProps, 'onMouseDown'> {
    /**
     * Default: false
     *
     * Whether to use floating panel as container
     */
    floating?: boolean;
}
export declare type PopperChildrenProps = _PopperChildrenProps & OverlayManagerProps;
export declare const PopperChildren: React.ForwardRefExoticComponent<_PopperChildrenProps & OverlayManagerProps & React.RefAttributes<HTMLDivElement>>;
export {};
