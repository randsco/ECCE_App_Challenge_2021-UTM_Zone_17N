import { AbstractDataSource } from './abstract-data-source';
import { LoadableDataSource, DataRecord } from '../data-source-interface';
/** @ignore */
export declare abstract class AbstractLoadableDataSource extends AbstractDataSource implements LoadableDataSource {
    url: string;
    load(): Promise<DataRecord[]>;
    abstract doLoad(): Promise<DataRecord[]>;
}
