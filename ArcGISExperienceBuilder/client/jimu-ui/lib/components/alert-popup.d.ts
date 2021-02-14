/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
interface Props {
    className?: string;
    isOpen?: boolean;
    title?: string;
    hideOK?: boolean;
    hideCancel?: boolean;
    toggle?: (isOk?: boolean) => void;
    okLabel?: string;
    cancleLabel?: string;
    onClickClose?: () => void;
    onClickOk?: () => void;
}
interface IntlProps {
    intl: IntlShape;
}
export declare const AlertPopup: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<Props & IntlProps>>>;
export {};
