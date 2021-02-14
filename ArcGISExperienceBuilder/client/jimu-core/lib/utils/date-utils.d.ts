import { IntlShape, FormatDateOptions } from 'react-intl';
import { EsriDateFormatMap, EsriDateFormats, EsriDateFormat } from '../types/common';
export declare enum VirtualDateType {
    Today = "TODAY",
    Tomorrow = "TOMORROW",
    Yesterday = "YESTERDAY",
    ThisWeek = "THIS_WEEK",
    ThisMonth = "THIS_MONTH",
    ThisQuarter = "THIS_QUARTER",
    ThisYear = "THIS_YEAR"
}
export declare enum TimeUnit {
    Minute = "MINUTE",
    Hour = "HOUR",
    Day = "DAY",
    Week = "WEEK",
    Month = "MONTH",
    Year = "YEAR"
}
export declare const ESRI_DATE_FORMAT_MAP: EsriDateFormatMap;
export declare const DATE_TIME_CONNECTOR: {
    common: string;
    de: string;
    el: string;
    fi: string;
    fr: string;
    he: string;
    hi: string;
    it: string;
    nb: string;
    pl: string;
    ro: string;
    ru: string;
    vi: string;
};
export declare const DATE_TIME_DEFAULT_FORMAT: {
    date: string;
    time: string;
    dateTime: string;
};
export declare function getEsriDateFormat(esriDateFormat: EsriDateFormats): EsriDateFormat;
export declare function getDateTimeFormat(intl: IntlShape, dateFormat: EsriDateFormats | string, timeFormat?: string): string;
export declare function formatDateField(value: any, esriDateFormat: EsriDateFormats, intl: IntlShape): string;
export declare function formatDateLocally(value: any, intl: IntlShape, datePattern?: string, timePattern?: string): string;
export declare const getIntlOptions: (esriDateFormat: EsriDateFormats) => Intl.DateTimeFormatOptions;
export declare const getDateOptions: (pattern: string) => FormatDateOptions;
export declare const getTimeOption: (pattern: string, hour12?: boolean) => FormatDateOptions;
export declare function formatDate(date: Date, pattern: string, intl: IntlShape): string;
export declare function formatTime(date: Date, pattern: string, intl: IntlShape): string;
