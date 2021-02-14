import { Expression, IMExpression } from '../types/expression';
import { ImmutableArray } from 'seamless-immutable';
import { IntlShape } from 'react-intl';
import { groupPartsByFunction } from './utils';
import { UseDataSource } from '../types/app-config';
import { RepeatedDataSource } from '../repeat-data-source-context';
export { groupPartsByFunction as groupExpressionPartsByFunction };
export * from './types';
export declare function resolveExpression(expression: Expression | IMExpression, useDataSources: ImmutableArray<UseDataSource>, repeatedDataSource: RepeatedDataSource | RepeatedDataSource[], intl?: IntlShape): Promise<string>;
