import { ExpressionPart } from '../../types/expression';
import { RepeatedDataSource } from '../../repeat-data-source-context';
export declare function sum(parts: ExpressionPart[], repeatedDataSource: RepeatedDataSource | RepeatedDataSource[]): Promise<number>;
