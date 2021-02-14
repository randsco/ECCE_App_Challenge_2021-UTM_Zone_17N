/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { DataSourceItemProps } from '../types';
interface DataSourceErrorItemProps extends Omit<DataSourceItemProps, 'isRenameInputShown' | 'isMappingIconShown' | 'onMappingIconClick' | 'onRename'> {
}
export declare const DataSourceErrorItem: React.ComponentType<DataSourceErrorItemProps>;
export {};
