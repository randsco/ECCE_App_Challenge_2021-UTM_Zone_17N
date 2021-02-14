/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { PaperProps } from './paper';
export declare function isHorizontal(anchor: string): boolean;
export declare function getAnchor(anchor: string, autoFlip: boolean): any;
export declare type AnchorDirection = 'left' | 'right' | 'top' | 'bottom' | 'full';
export interface DrawerProps {
    /**
     * Side from which the drawer will appear.
     */
    anchor?: AnchorDirection;
    /**
     * The contents of the drawer.
     */
    children: any;
    className?: string;
    /**
     * Function for toggling isOpen in the controlling component.
     */
    toggle?: () => void;
    /**
     * If `true`, the drawer is open.
     */
    open: boolean;
    /**
     * Properties applied to the [`Paper`](/api/paper/) element.
     */
    paperProps: PaperProps;
    /**
     * The variant to use.
     */
    variant: 'permanent' | 'temporary';
    /**
     * @ignore
     *
     * Flips the anchor automatically, if the locale is following right-to-left (RTL).
     */
    autoFlip?: boolean;
    zIndex?: number;
}
interface ExtraProps {
    isRTL?: boolean;
}
export declare class Drawer extends React.PureComponent<DrawerProps & ExtraProps> {
    static defaultProps: Partial<DrawerProps>;
    render(): JSX.Element;
}
export {};
