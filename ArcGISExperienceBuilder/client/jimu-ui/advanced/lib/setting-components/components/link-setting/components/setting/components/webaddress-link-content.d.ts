/// <reference types="react" />
import { React, ImmutableArray, Expression, IntlShape, UseDataSource } from 'jimu-core';
import { IMLinkParam } from '../../../types';
interface Props {
    linkParam: IMLinkParam;
    originLinkParam: IMLinkParam;
    onLinkParamChange: any;
    intl: IntlShape;
    widgetId?: string;
    selectAreaMaxHeight?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
}
interface State {
    isExpPopupOpen: boolean;
    showUrlError: boolean;
    urlError: string;
}
export default class WebaddressLinkContent extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidMount(): void;
    getInitLinkParam: () => IMLinkParam;
    webAddressInputChange: (v: string) => void;
    webAddressExpressionChange: (e: Expression) => void;
    openExpPopup: () => void;
    closeExpPopup: () => void;
    getDefaultExp: () => Expression;
    staticUrlChange: (event: any) => void;
    render(): JSX.Element;
}
export {};
