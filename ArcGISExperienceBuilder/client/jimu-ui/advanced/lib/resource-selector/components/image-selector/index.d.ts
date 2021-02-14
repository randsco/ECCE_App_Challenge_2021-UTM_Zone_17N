/// <reference types="react" />
import { React } from 'jimu-core';
import { ButtonSize, ImageParam } from 'jimu-ui';
/**
 * Properties for the ImageSelector component.
 */
export interface ImageSelectorProps {
    /**
     * The ID of the widget using this component.
     */
    widgetId: string;
    /** @ignore */
    className?: string;
    /** @ignore */
    buttonClassName?: string;
    /** @ignore */
    buttonStyle?: React.CSSProperties;
    /**
     * The color for this component.
     */
    buttonColor?: string;
    /**
     * The size for this component.
     */
    buttonSize?: ButtonSize;
    /**
     * The label for this component.
     */
    buttonLabel?: string;
    /**
     * The function will be called when the used image has been changed.
     */
    onChange?: (imageParam: ImageParam) => void;
    /** @ignore */
    disabled?: boolean;
    /**
     * The parameter defined in the ImageWithParam component in jimu-ui.
     */
    imageParam?: ImageParam;
    /** @ignore */
    isSupportCrop?: boolean;
}
/**
 * The ImageSelector component is used to select an image from a file or a URL.
 */
export declare const ImageSelector: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<any>>>;
