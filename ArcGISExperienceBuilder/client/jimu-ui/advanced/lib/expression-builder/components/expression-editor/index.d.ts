/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, ImmutableArray, IntlShape, UseDataSource, Expression, ResizeObserver, ExpressionPart, BrowserSizeMode } from 'jimu-core';
import { ExpSelection, PopoverItem, EditResult } from './types';
interface Props {
    useDataSources: ImmutableArray<UseDataSource>;
    expression: Expression;
    /**
     * Use widget id to get widget context, e.g. whether widget is in repeated data source context.
     */
    widgetId?: string;
    autoFocus?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onChange: (expression: Expression) => void;
}
interface State {
    isPopoverOpen: boolean;
    isEditorMounted: boolean;
    expSelection: ExpSelection;
    selectedPopoverItemIndex: string;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
interface StateToProps {
    browserSizeMode: BrowserSizeMode;
}
declare class _ExpressionEditor extends React.PureComponent<Props & ExtraProps & StateToProps, State> {
    static count: number;
    id: string;
    contentEditableContainer: React.RefObject<HTMLDivElement>;
    helperContainer: React.RefObject<HTMLDivElement>;
    errorMsgContainer: React.RefObject<HTMLDivElement>;
    expressionString: string;
    ltrStyle: {
        direction: string;
    };
    resizeObserver: ResizeObserver;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props & ExtraProps & StateToProps, prevState: State): void;
    componentWillUnmount(): void;
    resizeHelperContainer: () => void;
    setSelectionToEnd: () => void;
    getWhetherLoseFocus: () => boolean;
    getExpressionString: (container?: HTMLElement) => string;
    getComponent: (part: ExpressionPart, index: number) => JSX.Element;
    getWhetherInEditablePart: () => boolean;
    getSingleExpFromPopoverItem: (item: PopoverItem) => string;
    renderPartsToHtml: (parts: ExpressionPart[]) => string;
    getNewExpression: (parts: ExpressionPart[]) => Expression;
    onChange: (e: any) => void;
    onClick: (e: any) => void;
    onHelperItemSelect: (e: Expression, partId: string, isReplacing: boolean) => void;
    onBlur: (e: any) => void;
    onKeyDown: (e: any) => void;
    handleBackspace: () => void;
    handleDelete: () => void;
    doRemove: (editResult: EditResult, originalParts: ExpressionPart[], removedCharNumber: number) => void;
    handleLeftArrow: () => void;
    handleRightArrow: () => void;
    handleDownArrow: () => void;
    handleUpArrow: () => void;
    handleEnter: () => void;
    handlePopoverItemClick: (item: PopoverItem, partId: string) => void;
    handleFieldPopoverClick: (newParts: ExpressionPart[], partId: string, item: PopoverItem) => void;
    handleDsPopoverClick: (parts: ExpressionPart[], partId: string, item: PopoverItem) => void;
    handleFunctionPopoverClick: (newParts: ExpressionPart[], partId: string, item: PopoverItem) => void;
    render(): JSX.Element;
}
declare const ExpressionEditor: React.FC<import("react-intl").WithIntlProps<import("emotion-theming/types/helper").AddOptionalTo<(Pick<Pick<React.ClassAttributes<_ExpressionEditor> & Props & ExtraProps & StateToProps, "ref" | "style" | "theme" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & Props, "style" | "theme" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & React.RefAttributes<React.Component<Pick<React.ClassAttributes<_ExpressionEditor> & Props & ExtraProps & StateToProps, "ref" | "style" | "theme" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & Props, any, any>>) | (Pick<React.PropsWithChildren<Pick<React.ClassAttributes<_ExpressionEditor> & Props & ExtraProps & StateToProps, "ref" | "style" | "theme" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & Props>, "style" | "theme" | "children" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & {
    ref?: ((instance: _ExpressionEditor) => void) | React.RefObject<_ExpressionEditor>;
}), "theme">>> & {
    WrappedComponent: React.ComponentType<import("emotion-theming/types/helper").AddOptionalTo<(Pick<Pick<React.ClassAttributes<_ExpressionEditor> & Props & ExtraProps & StateToProps, "ref" | "style" | "theme" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & Props, "style" | "theme" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & React.RefAttributes<React.Component<Pick<React.ClassAttributes<_ExpressionEditor> & Props & ExtraProps & StateToProps, "ref" | "style" | "theme" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & Props, any, any>>) | (Pick<React.PropsWithChildren<Pick<React.ClassAttributes<_ExpressionEditor> & Props & ExtraProps & StateToProps, "ref" | "style" | "theme" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & Props>, "style" | "theme" | "children" | "autoFocus" | "className" | "onChange" | "key" | "intl" | "useDataSources" | "widgetId" | "expression"> & {
        ref?: ((instance: _ExpressionEditor) => void) | React.RefObject<_ExpressionEditor>;
    }), "theme">>;
};
export default ExpressionEditor;
