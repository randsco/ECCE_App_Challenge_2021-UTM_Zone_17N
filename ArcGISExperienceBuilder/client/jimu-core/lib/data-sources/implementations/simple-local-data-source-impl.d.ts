import { AbstractDataSource } from '../ds-base-types';
import { DataRecord, SimpleLocalDataSource, DataSourceTypes } from '../data-source-interface';
/**
 * @ignore
 */
export declare class SimpleLocalDataSourceImpl extends AbstractDataSource implements SimpleLocalDataSource {
    type: DataSourceTypes.SimpleLocal;
    updateAllRecoreds(records: DataRecord[]): void;
    addRecord(record: DataRecord): DataRecord;
    updateRecord(record: DataRecord): void;
    deleteRecord(index: number): void;
}
