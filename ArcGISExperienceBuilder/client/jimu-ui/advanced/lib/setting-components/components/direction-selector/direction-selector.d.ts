/// <reference types="react" />
import { React } from 'jimu-core';
export interface DirectionSelectorProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    autoFlip?: boolean;
    vertical?: boolean;
    onChange?: (vertical?: boolean) => void;
}
export declare const DirectionSelector: (props: DirectionSelectorProps) => JSX.Element;
