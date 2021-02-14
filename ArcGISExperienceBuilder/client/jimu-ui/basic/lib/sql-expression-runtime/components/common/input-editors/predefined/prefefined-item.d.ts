/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, ImmutableArray, DataSource, ClauseValuePair, IMFieldSchema, ImmutableObject } from 'jimu-core';
/**
 * The PredefinedItem properties
 */
export interface PredefinedItemProps {
    index: number;
    value?: ClauseValuePair;
    excludeValues?: ImmutableArray<ClauseValuePair>;
    allValues?: ImmutableArray<ClauseValuePair>;
    dataSource: DataSource;
    onChange: (index: number, value: ImmutableObject<ClauseValuePair>) => void;
    isMultiple?: boolean;
    field: IMFieldSchema;
}
interface IntlProps {
    intl: IntlShape;
}
export declare const PredefinedItem: React.FC<import("react-intl").WithIntlProps<PredefinedItemProps & IntlProps>> & {
    WrappedComponent: React.ComponentType<PredefinedItemProps & IntlProps>;
};
export default PredefinedItem;
