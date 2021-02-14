/// <reference types="react" />
import { React } from 'jimu-core';
interface TabProps {
    /**
     * If default value of active prop.
     */
    defaultActive?: boolean;
    /**
     * If `true`, the tab is selected and shown.
     */
    active?: boolean;
    /**
     * The title of the tab, which will be displayed together with other tab titles in the "header" as navigation.
     */
    title: string;
    /**serves as the identifier of the tab. */
    id: string;
    /**
     * The content of the tab, which will be displayed in the tab panel when opened.
     */
    children: JSX.Element | JSX.Element[];
    /**
     * Class name(s) applied to the component.
     */
    className?: string;
}
export declare class Tab extends React.PureComponent<TabProps> {
    render(): any;
}
interface TabsProps {
    /**
     * If `true`, the Tabs will display with an "underline" style
     */
    underline?: boolean;
    /**
     * If `true`, the Tabs will display with an "tabs" style.
     * This is the default style.
     */
    tabs?: boolean;
    /**
     * If `true`, the Tabs will display with a "pills" style
     */
    pills?: boolean;
    /**
     * If `true`, the Tabs will fill the full width of its container and its children will be equally spaced.
     */
    fill?: boolean;
    /**
     * Class name(s) applied to the component.
     */
    className?: string;
    /**
     * Callback fired when the tab selection changed.
     */
    onTabSelect?: (title: string) => void;
    children: React.ReactElement<TabProps, 'Tab'>[];
}
interface TabsState {
    activeTab: string;
}
export declare class _Tabs extends React.PureComponent<TabsProps, TabsState> {
    static getDerivedStateFromProps(props: TabsProps, state: TabsState): {
        activeTab: any;
    };
    constructor(props: any);
    selectTab(tab: any): void;
    render(): JSX.Element;
}
export declare const Tabs: React.ComponentType<TabsProps>;
export {};
