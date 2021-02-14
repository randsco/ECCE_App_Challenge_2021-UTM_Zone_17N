/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
/**
 * Properties for the QR-code component.
 */
export interface QRcodeProps {
    /** The URL string. */
    value: string;
    /** The size of the QR code image. */
    size?: number;
    /** Background color. */
    bgColor?: string;
    /** Foreground color. */
    fgColor?: string;
    /** @ignore */
    level?: 'L' | 'M' | 'Q' | 'H';
    /** @ignore */
    includeMargin: boolean;
    /** @ignore */
    className?: string;
    /** @ignore */
    downloadFileName?: string;
    /** Indicates whether to show the Save image button. */
    hideDownloadBtn?: boolean;
}
/**
 *  A react component for generating a QR-code based on a URL string.
 */
export declare const QRCode: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>>;
export default QRCode;
