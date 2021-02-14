/// <reference types="react" />
import { React } from 'jimu-core';
export interface PageNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * Current page number
     */
    current: number;
    /**
     * Total page number
     */
    totalPage: number;
    /**
     * @ignore
     */
    connector?: string;
}
export declare const PageNumber: (props: PageNumberProps) => JSX.Element;
