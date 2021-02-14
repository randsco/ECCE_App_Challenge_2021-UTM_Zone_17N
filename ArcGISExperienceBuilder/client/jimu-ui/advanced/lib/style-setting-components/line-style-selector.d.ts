/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { LineType } from 'jimu-ui';
export interface LineStyleProps {
    value: LineType;
    onChange?: (value: string) => void;
    className?: string;
    style?: any;
}
interface ExtraProps {
    intl: IntlShape;
}
export declare class _LineStyleSelector extends React.PureComponent<LineStyleProps & ExtraProps> {
    static defaultProps: Partial<LineStyleProps & ExtraProps>;
    _onLineStyleChange(e: any): void;
    nls: (id: string) => string;
    getLineStyles: () => {
        label: string;
        value: LineType;
    }[];
    render(): JSX.Element;
}
export declare const LineStyleSelector: React.FC<import("react-intl").WithIntlProps<LineStyleProps & ExtraProps>> & {
    WrappedComponent: React.ComponentType<LineStyleProps & ExtraProps>;
};
export {};
