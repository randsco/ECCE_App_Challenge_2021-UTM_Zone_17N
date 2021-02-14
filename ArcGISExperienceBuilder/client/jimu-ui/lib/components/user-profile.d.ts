/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, SerializedStyles, IntlShape } from 'jimu-core';
interface Props {
    userThumbnail: string;
    theme: ThemeVariables;
    user: any;
    portalUrl: string;
    intl: IntlShape;
    className?: string;
    saveStatus?: boolean;
}
interface State {
    accountPopoverOpen: boolean;
    helpHref: string;
    helpUtils: any;
    signFlag: boolean;
    isShowLeaveAlertPopup: boolean;
}
export default class _UserProfile extends React.PureComponent<Props, State> {
    dropdownMenuCon: HTMLElement;
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    nls: (id: string) => string;
    sign: () => void;
    signOut: () => void;
    signIn: () => void;
    toggleAccount: () => void;
    getMenuInnerStyle: (theme: ThemeVariables) => SerializedStyles;
    getHelpUrl: () => void;
    getTrainingUrl: () => string;
    handleToggleForLeaveAlertPopup: (isOk: any) => void;
    confirmSign: () => void;
    render(): JSX.Element;
}
export declare const UserProfile: React.ComponentType<React.PropsWithChildren<import("emotion-theming/types/helper").AddOptionalTo<Props & React.RefAttributes<_UserProfile>, "theme">>>;
export {};
