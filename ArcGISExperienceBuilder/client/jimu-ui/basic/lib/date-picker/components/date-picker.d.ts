/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, dateUtils, EsriDateFormats } from 'jimu-core';
import 'react-datepicker/dist/react-datepicker.css';
/**
* DatePicker properties
*/
export interface DatePickerProps {
    selectedDate: Date | dateUtils.VirtualDateType;
    /**
     * whether start date from double date picker
     */
    isStartDate?: boolean;
    /**
     * whether end date from double date picker
     */
    isEndDate?: boolean;
    startDate?: Date;
    endDate?: Date;
    /**
    * whether a UTC date.
    */
    isUTCDate?: boolean;
    /**
    * @ignore
    */
    format?: EsriDateFormats | string;
    /**
    * true: two months shown, has today button,
    * false: one month shown, no today button.
    */
    runtime: boolean;
    dateRangeList: dateUtils.VirtualDateType[];
    onChange: (value: number | dateUtils.VirtualDateType, label: string) => void;
    /**
    * Whether display time input on datepicker component
    */
    showTimeInput?: boolean;
    /**
    * Whether display a long time format.
    */
    isTimeLong?: boolean;
    /**
    * Decide how many months to display, supports 1 (default) and 2.
    */
    /**
    * @ignore
    */
    isClearable?: boolean;
    /**
    * whether display date picker inline.
    */
    /**
    * @ignore
    */
    hasDateList?: boolean;
    supportVirtualDateList: boolean;
    /**
    * @ignore
    */
    /**
    * Whether keep calendar when select one date.
    */
    keepCalendarOnSelect?: boolean;
    /**
    * Whether display a Done button.
    */
    hasDoneButton?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
interface IntlProps {
    intl: IntlShape;
}
/**
* A date time picker component that allow user to pick or type a date/time.
*/
export declare const DatePicker: React.ComponentType<React.PropsWithChildren<import("react-intl").WithIntlProps<DatePickerProps & IntlProps>>>;
export {};
