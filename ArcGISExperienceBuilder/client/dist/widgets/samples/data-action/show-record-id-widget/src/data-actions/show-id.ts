import { AbstractDataAction, DataSource, DataRecord } from 'jimu-core';

export default class ExportJson extends AbstractDataAction{
  isSupported(dataSource: DataSource, records: DataRecord[]): boolean{
    return records.length > 0;
  }

  onExecute(dataSource: DataSource, records: DataRecord[]): Promise<boolean>{
    const ids = records.map(r => r.getId());
    alert(JSON.stringify(ids));
    return Promise.resolve(true);
  }
}