/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, IntlShape } from 'jimu-core';
import { ExpressionBuilderProps } from '../../types';
interface State {
    SidePopper: any;
}
interface ExpressionBuilderPopupProps extends ExpressionBuilderProps {
    isOpen: boolean;
    onClose: () => void;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
declare class _ExpressionBuilderPopup extends React.PureComponent<ExpressionBuilderPopupProps & ExtraProps, State> {
    cursorStyle: React.CSSProperties;
    fontSizeStyle: React.CSSProperties;
    titleStyle: React.CSSProperties;
    overflowYStyle: React.CSSProperties;
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
declare const ExpressionBuilderPopup: React.FC<import("react-intl").WithIntlProps<import("emotion-theming/types/helper").AddOptionalTo<ExpressionBuilderPopupProps & ExtraProps & React.RefAttributes<_ExpressionBuilderPopup>, "theme">>> & {
    WrappedComponent: React.ComponentType<import("emotion-theming/types/helper").AddOptionalTo<ExpressionBuilderPopupProps & ExtraProps & React.RefAttributes<_ExpressionBuilderPopup>, "theme">>;
};
export default ExpressionBuilderPopup;
