import { ExpressionPart } from '../../types/expression';
import { RepeatedDataSource } from '../../repeat-data-source-context';
export declare function count(parts: ExpressionPart[], dataSourceId: string, repeatedDataSource: RepeatedDataSource | RepeatedDataSource[]): Promise<number>;
