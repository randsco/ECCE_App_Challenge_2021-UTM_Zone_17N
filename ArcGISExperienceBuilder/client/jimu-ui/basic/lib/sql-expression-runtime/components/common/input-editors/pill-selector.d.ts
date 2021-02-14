/// <reference types="react" />
/// <reference types="seamless-immutable" />
import { React, DataSource, IMFieldSchema, IntlShape, CodedValue, ClauseValueOptions, ClauseValuePair, DataSourceManager } from 'jimu-core';
import { ClauseInputEditor } from '../default';
interface Props {
    value: ClauseValueOptions;
    dataSource: DataSource;
    runtime: boolean;
    isSmallSize?: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
    codedValues?: CodedValue[];
    fieldObj?: IMFieldSchema;
    sql?: string;
    style?: React.CSSProperties;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    list: any[];
    isMultiple: boolean;
    isOpen: boolean;
}
export declare class _VIPillSelector extends React.PureComponent<Props & IntlProps, State> {
    _isMounted: boolean;
    pillButton: any;
    dsManager: DataSourceManager;
    dataSource: DataSource;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Props): void;
    isMultiple: () => boolean;
    i18nMessage: (id: string, values?: any) => string;
    updateList: (fieldObj?: import("seamless-immutable").ImmutableObject<import("jimu-core").FieldSchema>) => void;
    getDisplayLabel: (value: any) => string;
    onTogglePopper: () => void;
    isPillActive: (value: any) => boolean;
    onPillClick: (item: ClauseValuePair, e: any) => void;
    onDisplayChange: (inputEditor: ClauseInputEditor) => void;
    getPills: (list: any) => JSX.Element;
    render(): JSX.Element;
}
declare const VIPillSelector: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<Props & IntlProps>>>;
export default VIPillSelector;
