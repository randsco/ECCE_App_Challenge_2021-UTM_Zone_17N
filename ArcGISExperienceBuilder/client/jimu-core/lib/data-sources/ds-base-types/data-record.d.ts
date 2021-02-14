import { IntlShape, EsriDateFormats } from 'jimu-core';
import { IGeometry } from '@esri/arcgis-rest-types';
import { DataSource, DataRecordSet, DataRecord } from '../data-source-interface';
/**
 * Include the common implementations for data record.
 */
export declare abstract class AbstractDataRecord implements DataRecord {
    dataSource: DataSource;
    abstract getData(): any;
    /** @ignore */
    abstract getDataBeforeMapping(): any;
    abstract toJson(): any;
    abstract getId(): string;
    abstract setId(id: string): void;
    abstract getGeometry(): IGeometry;
    getFieldValue(jimuFieldName: string): any;
    getFormattedFieldValue(jimuFieldName: string, intl: IntlShape): string;
    /** @ignore */
    convertBeforeMappingDataToData(dataBeforeMapping: any): {};
    /** @ignore */
    convertDataToDataBeforeMapping(data: any): {};
    getFormattedData(intl: IntlShape): {};
    formatDateField(value: any, esriDateFormat: EsriDateFormats, intl: IntlShape): string;
    formatNumberField(value: number, places: number, digitSeparator: boolean, intl: IntlShape): string;
}
/**
 * @ignore
 */
export declare class SimpleDataRecordImpl extends AbstractDataRecord {
    private data;
    dataSource: DataSource;
    /**
     * beforeMappingData: is the data from the real data source, such as query from remote service/database.
     * data is the data used in Exb.
     *
     * The beforeMappingData uses this schema: {fieldName: value}, we'll reverse it to {jimuFieldName: value}, which is called data and will be used in exb.
     *
     */
    constructor(data: any, dataSource: DataSource, isBeforeMappingData?: boolean);
    getData(): any;
    getDataBeforeMapping(): {};
    toJson(): any;
    getId(): any;
    setId(): void;
    getGeometry(): any;
}
/**
 * @ignore
 */
export declare class SimpleDataRecordSetImpl implements DataRecordSet {
    records: DataRecord[];
    fields?: string[];
    dataSource?: DataSource;
    constructor(options: DataRecordSet);
}
