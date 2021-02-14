import { AbstractDataAction } from '../base-data-action';
import { DataSource, DataRecord } from '../data-sources/data-source-interface';
export default class ExportJson extends AbstractDataAction {
    name: string;
    isSupported(dataSource: DataSource, records: DataRecord[]): boolean;
    onExecute(dataSource: DataSource, records: DataRecord[]): Promise<boolean>;
}
