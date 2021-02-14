/// <reference types="react" />
import { React } from 'jimu-core';
export declare const ManagerReferenceNodeContext: React.Context<Element>;
export declare const ManagerReferenceNodeSetterContext: React.Context<(element: Element) => void>;
export declare type ManagerProps = {
    children: React.ReactNode;
};
export declare function Manager({ children }: ManagerProps): JSX.Element;
