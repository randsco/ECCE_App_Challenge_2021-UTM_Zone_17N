/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { PaginationProps as BSPaginationProps } from 'reactstrap/lib/Pagination';
export interface PaginationProps extends BSPaginationProps {
    totalPage: number;
    current: number;
    onChangePage?: (current: number) => void;
}
interface ExtraProps {
    intl?: IntlShape;
}
export declare class _Pagination extends React.PureComponent<PaginationProps & ExtraProps> {
    handleSwitchPage: (current: number) => void;
    handleSwitchToPrePage: (evt: any) => void;
    handleSwitchToNextPage: (evt: any) => void;
    formatMessage: (id: string, values?: {
        [key: string]: any;
    }) => string;
    renderPaginationItems(current: number, totalPage: number): any[];
    render(): JSX.Element;
}
export declare const Pagination: React.ComponentType<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<Pick<PaginationProps & ExtraProps, string | number> & React.RefAttributes<_Pagination>, "theme">>>;
export {};
