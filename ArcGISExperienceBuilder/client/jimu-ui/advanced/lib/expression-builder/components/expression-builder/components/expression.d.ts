/// <reference types="react" />
import { React, ImmutableArray, Expression, IntlShape, ImmutableObject, UseDataSource } from 'jimu-core';
interface Props {
    useDataSources: ImmutableArray<UseDataSource>;
    expression: Expression | ImmutableObject<Expression>;
    intl: IntlShape;
    widgetId?: string;
    onChange: (expression: Expression) => void;
}
interface State {
    expression: Expression;
    name: string;
}
export default class ExpressionTab extends React.PureComponent<Props, State> {
    static count: number;
    constructor(props: any);
    componentDidUpdate(prevProps: Props): void;
    getMutableExpression: (expression: Expression | ImmutableObject<Expression>) => Expression;
    onExpChange: (e: Expression) => void;
    onChange: () => void;
    onNameChange: (e: any) => void;
    getDefaultName: () => string;
    getWhetherDisableInsert: () => boolean;
    render(): JSX.Element;
}
export {};
