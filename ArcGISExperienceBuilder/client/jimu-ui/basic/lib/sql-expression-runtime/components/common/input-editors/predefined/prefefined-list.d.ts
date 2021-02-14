/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, ImmutableArray, DataSource, ClauseValuePair, IMFieldSchema } from 'jimu-core';
/**
 * The PredefinedList properties
 */
export interface PredefinedListProps {
    values?: ImmutableArray<ClauseValuePair>;
    dataSource: DataSource;
    onChange: (values: ImmutableArray<ClauseValuePair>) => void;
    isMultiple?: boolean;
    field: IMFieldSchema;
}
interface IntlProps {
    intl: IntlShape;
}
export declare const PredefinedList: React.FC<import("react-intl").WithIntlProps<PredefinedListProps & IntlProps>> & {
    WrappedComponent: React.ComponentType<PredefinedListProps & IntlProps>;
};
export default PredefinedList;
