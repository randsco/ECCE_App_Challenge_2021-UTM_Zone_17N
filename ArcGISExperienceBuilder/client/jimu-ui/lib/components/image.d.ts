/// <reference types="react" />
import { React } from 'jimu-core';
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Type of the image by its usage.
     */
    type?: 'fluid' | 'thumbnail';
    /**
     * Shape of the image.
     */
    shape?: 'circle' | 'rectangle';
    /**
     * Optional image to display as the placeholder.
     */
    placeholder?: string;
    /**
     * If `true`, the image will be resized to cover its entire container.
     */
    cover?: boolean;
}
export interface ImageStates {
}
export declare class _Image extends React.PureComponent<ImageProps, ImageStates> {
    readonly defaultCircledImageSize = 100;
    readonly defaultCoveredImageHeight = 160;
    render(): JSX.Element;
}
export declare const Image: React.ComponentType<ImageProps>;
