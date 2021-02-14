/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape } from 'jimu-core';
import { HeaderValue } from '../type';
interface Props {
    className?: string;
    style?: any;
    value?: HeaderValue;
    onChange?: (value: HeaderValue) => void;
}
interface ExtraProps {
    intl?: IntlShape;
}
interface State {
    open: boolean;
}
export declare class _Headings extends React.PureComponent<Props & ExtraProps, State> {
    headings: {
        label: string;
        value: HeaderValue;
    }[];
    constructor(props: any);
    translate: (id: string) => string;
    getLabel: (value: HeaderValue) => string;
    toggle: () => void;
    onItemClick: (value: HeaderValue) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const Headings: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<Props & ExtraProps & React.RefAttributes<_Headings>, "theme">>;
export {};
