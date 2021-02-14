/// <reference types="react" />
/** @jsx jsx */
import { React, LayoutItemConstructorProps, IMThemeVariables, IntlShape } from 'jimu-core';
export interface WidgetListPopperProps {
    isPlaceholder?: boolean;
    builderTheme: IMThemeVariables;
    referenceElement: HTMLElement;
    intl: IntlShape;
    isItemAccepted: (item: LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
    onItemSelect: (item: LayoutItemConstructorProps) => void;
    onClose: () => void;
}
export declare const WidgetListPopper: React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>;
};
