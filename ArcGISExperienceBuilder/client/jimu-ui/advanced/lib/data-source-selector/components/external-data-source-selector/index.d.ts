/// <reference types="react" />
/** @jsx jsx */
import { React, IMDataSourceJson, ImmutableArray } from 'jimu-core';
import { AllDataSourceTypes } from '../../types';
/**
 * The ExternalDataSourceSelector props
 */
export interface ExternalDataSourceSelectorProps {
    portalUrl: string;
    isRadio?: boolean;
    types?: ImmutableArray<AllDataSourceTypes>;
    onSelect?: (dsJsons: IMDataSourceJson[]) => void;
    onRemove?: (dsJsons: IMDataSourceJson[]) => void;
    onCancel?: () => void;
    onFinish?: (dsJsons: IMDataSourceJson[]) => void;
    className?: string;
}
export declare const ExternalDataSourceSelector: React.FC<import("react-intl").WithIntlProps<ExternalDataSourceSelectorProps>> & {
    WrappedComponent: React.ComponentType<ExternalDataSourceSelectorProps>;
};
