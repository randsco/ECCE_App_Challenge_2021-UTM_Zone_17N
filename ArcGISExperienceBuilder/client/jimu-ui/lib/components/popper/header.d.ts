/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
export interface PanelHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * If `true`, Set the cursor as `move`
     */
    moveable?: boolean;
    /**
     * The text that this component displays
     */
    title?: string;
    /**
     * if `false`, hide close button
     */
    showClose?: boolean;
    /**
     * Be invoked when clicking the close button
     */
    onClose?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare const PanelHeader: React.NamedExoticComponent<PanelHeaderProps>;
