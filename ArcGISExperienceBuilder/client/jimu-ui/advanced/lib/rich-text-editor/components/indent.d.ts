/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { IndentValue } from '../type';
interface Props {
    disabled?: boolean;
    className?: string;
    value?: IndentValue;
    onClick?: (value: IndentValue) => any;
}
interface ExtraProps {
    intl?: IntlShape;
}
export declare const _Indent: ({ value, onClick, className, disabled, intl }: Props & ExtraProps) => JSX.Element;
export declare const Indent: React.FC<import("react-intl").WithIntlProps<Props & ExtraProps>> & {
    WrappedComponent: React.ComponentType<Props & ExtraProps>;
};
export {};
