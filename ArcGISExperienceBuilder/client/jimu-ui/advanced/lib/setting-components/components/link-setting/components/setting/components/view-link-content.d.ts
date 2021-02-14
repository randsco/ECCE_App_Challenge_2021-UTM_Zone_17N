/// <reference types="react" />
import { React, IMAppConfig, BrowserSizeMode, IntlShape } from 'jimu-core';
import { IMLinkParam } from '../../../types';
interface Props {
    linkParam: IMLinkParam;
    originLinkParam: IMLinkParam;
    onLinkParamChange: any;
    appConfig: IMAppConfig;
    browserSizeMode: BrowserSizeMode;
    intl: IntlShape;
    selectAreaMaxHeight?: string;
}
interface States {
    viewLinkParamArr: string[];
    scrollToViewId: string;
}
export default class ViewLinkContent extends React.PureComponent<Props, States> {
    noScroll: string;
    constructor(props: any);
    componentDidMount(): void;
    static getDerivedStateFromProps(newProps: Props, prevState: States): {
        viewLinkParamArr: string[];
        scrollToViewId: string;
    };
    getInitLinkParam: () => IMLinkParam;
    pageChange: (e: any) => void;
    viewChange: (viewId: string, sectionId: string) => void;
    viewRemove: (viewId: string) => void;
    onScrollToViewChange: (viewId: string) => void;
    getDefaultPageId: () => string;
    getSelectedVeiwIds: () => string[];
    render(): JSX.Element;
}
export {};
