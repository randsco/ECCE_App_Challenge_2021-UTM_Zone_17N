import { DataSourceTypes, DataSourceConstructorOptions, DataRecord, CsvDataSource } from '../data-source-interface';
import { AbstractLoadableDataSource } from '../ds-base-types';
/**
 * @ignore
 */
export declare class CsvDataSourceImpl extends AbstractLoadableDataSource implements CsvDataSource {
    type: DataSourceTypes.CSV;
    constructor(options: DataSourceConstructorOptions);
    doLoad(): Promise<DataRecord[]>;
}
