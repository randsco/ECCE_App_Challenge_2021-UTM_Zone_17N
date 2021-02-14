/// <reference types="react" />
import { React } from 'jimu-core';
export declare type ReactRef = (ref?: HTMLElement) => void | {
    current?: HTMLElement;
};
export declare type ReferenceChildrenProps = {
    ref: ReactRef;
};
export declare type ReferenceProps = {
    children: (ReferenceChildrenProps: any) => React.ReactElement;
    innerRef?: ReactRef;
};
export declare function Reference({ children, innerRef }: ReferenceProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
