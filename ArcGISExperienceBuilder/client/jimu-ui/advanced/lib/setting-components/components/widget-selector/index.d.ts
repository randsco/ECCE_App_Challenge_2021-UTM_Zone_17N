/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
interface CardImage {
    src: string;
    alt?: string;
}
export interface WidgetCardType {
    title: string;
    uri: string;
    image: CardImage;
}
interface Props {
    title?: string;
    onChange?: (listItem: any) => void;
    onOK: (widgetName: string) => void;
    onCancel?: () => void;
    className?: string;
}
export declare const WidgetSelector: React.ComponentType<Props>;
export {};
