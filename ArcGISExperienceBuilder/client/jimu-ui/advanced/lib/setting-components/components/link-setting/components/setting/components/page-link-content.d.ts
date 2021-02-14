/// <reference types="react" />
import { React, IMAppConfig, IntlShape } from 'jimu-core';
import { IMLinkParam } from '../../../types';
interface Props {
    linkParam: IMLinkParam;
    originLinkParam: IMLinkParam;
    onLinkParamChange: any;
    appConfig: IMAppConfig;
    intl: IntlShape;
    selectAreaMaxHeight?: string;
}
export default class PageLinkContent extends React.PureComponent<Props, unknown> {
    currentPage: {
        id: string;
        name: string;
    };
    constructor(props: any);
    componentDidMount(): void;
    getInitLinkParam: () => IMLinkParam;
    getPageData: () => {
        id: string;
        name: string;
    }[];
    setLinkParam: (newSelectItem: any) => void;
    render(): JSX.Element;
}
export {};
