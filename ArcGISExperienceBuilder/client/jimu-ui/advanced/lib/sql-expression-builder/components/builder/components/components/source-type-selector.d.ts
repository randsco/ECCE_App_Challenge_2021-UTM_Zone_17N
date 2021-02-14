/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, ClauseSourceType } from 'jimu-core';
import { ClauseDisplayFormat } from 'jimu-ui/basic/sql-expression-runtime';
interface Props {
    sourceType: ClauseSourceType;
    list: ClauseDisplayFormat;
    onSelect: (sourceType: ClauseSourceType) => void;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    isOpen: boolean;
}
export declare class _SourceTypeSelector extends React.PureComponent<Props & IntlProps, State> {
    constructor(props: any);
    i18nMessage: (id: string) => string;
    onTypeSelect: (sourceType: ClauseSourceType) => void;
    toggle: () => void;
    render(): JSX.Element;
}
declare const SourceTypeSelector: React.FC<import("react-intl").WithIntlProps<Props & IntlProps>> & {
    WrappedComponent: React.ComponentType<Props & IntlProps>;
};
export default SourceTypeSelector;
