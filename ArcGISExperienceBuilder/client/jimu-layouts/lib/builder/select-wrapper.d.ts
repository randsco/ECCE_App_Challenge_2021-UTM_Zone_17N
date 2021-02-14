/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, IMLayoutItemJson, IntlShape, IMWidgetJson, ImmutableArray, IMSectionNavInfo } from 'jimu-core';
import { ToolbarConfig, PageContextProps } from 'jimu-layouts/layout-runtime';
declare type Props = {
    layoutId: string;
    layoutItem: IMLayoutItemJson;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    forbidToolbar?: boolean;
    toolItems?: ToolbarConfig;
    showDefaultTools?: boolean;
    selected: boolean;
    autoScroll?: boolean;
    isInlineEditing: boolean;
    isFunctionalWidget: boolean;
    hasEmbeddedLayout: boolean;
    isSection: boolean;
    views?: ImmutableArray<string>;
    isBlock?: boolean;
    hasExtension?: boolean;
    widgetJson?: IMWidgetJson;
    widgetState?: any;
    rotate?: number;
};
interface StateToProps {
    lockLayout: boolean;
    isDesignMode: boolean;
    sectionNavInfo: IMSectionNavInfo;
}
interface State {
    selected: boolean;
}
interface IntlProps {
    intl: IntlShape;
}
export declare class SelectWrapper extends React.PureComponent<Props & IntlProps & StateToProps, State> {
    ref: HTMLElement;
    pageContext: PageContextProps;
    screenGroupInfo: string;
    keyBindings: {
        [key: string]: any;
    };
    modifiers: any;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    private doScroll;
    scrollIntoView(): void;
    formatMessage: (id: string) => any;
    getStyle(): import("jimu-core").SerializedStyles;
    isMac: () => boolean;
    getKeyboardComponent(): JSX.Element;
    copyItem: () => void;
    deleteSelectedItem: () => void;
    isResizable(): boolean;
    showToolbar(): boolean;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>;
}, Pick<import("react-intl").WithIntlProps<any>, string | number | symbol> & Props>;
export default _default;
