import { IFeature } from '@esri/arcgis-rest-types';
import { AbstractDataSource } from '../ds-base-types';
import { DataSourceConstructorOptions, DataSourceTypes, FeatureSetDataSource, FeatureDataRecord } from '../data-source-interface';
export interface FeatureSetDataSourceConstructorOptions extends DataSourceConstructorOptions {
    records: FeatureDataRecord[];
}
export declare class FeatureSetDataSourceImpl extends AbstractDataSource implements FeatureSetDataSource {
    type: DataSourceTypes.FeatureSet;
    constructor(options: FeatureSetDataSourceConstructorOptions);
    getIdField(): string;
    setJsonData(data: (IFeature | __esri.Graphic)[]): void;
    addRecord(record: FeatureDataRecord): void;
}
