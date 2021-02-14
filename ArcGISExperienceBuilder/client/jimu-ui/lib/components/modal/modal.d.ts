/// <reference types="react" />
import { React, ImmutableArray } from 'jimu-core';
import { ModalProps as _ModalProps } from 'reactstrap/lib/Modal';
export interface ExtraProps {
    overlays: ImmutableArray<string>;
}
export interface ModalProps extends _ModalProps {
    /**
     * Default: false
     *
     * if `true`, do not change activate overlay when clicking modal
     */
    disableActivateOverlay?: boolean;
}
declare class __Modal extends React.Component<ModalProps & ExtraProps> {
    uniqueId: string;
    ref: any;
    constructor(props: ModalProps & ExtraProps);
    handleOpen: () => void;
    handleClose: () => void;
    isInOverlays: () => boolean;
    isLastOfOverlay: () => boolean;
    handleMouseUp: (evt: React.MouseEvent<HTMLDivElement>) => void;
    getZindex: () => string | number;
    getInnerRef: () => any;
    render(): JSX.Element;
}
export declare const Modal: React.ComponentType<Pick<React.ClassAttributes<__Modal> & ModalProps & ExtraProps, string | number> & ModalProps>;
export {};
