import { ImmutableObject, IMUseDataSource, ImmutableArray, IMFieldSchema } from 'jimu-core';

export enum TableArrangeType{
  Dropdown = 'DROPDOWN',
  Tabs = 'TABS',
}

export interface LayersConfig{
  id: string;
  name: string;
  useDataSource: IMUseDataSource;
  allFields: IMFieldSchema[];
  tableFields?: IMFieldSchema[];
  enableAttachements: boolean;
  enableSearch: boolean;
  searchFields?: string;
  searchExact?: boolean;
  enableEdit: boolean;
  enableRefresh: boolean;
  enableSelect: boolean;
  allowCsv: boolean;
}

export interface Config{
  layersConfig?: ImmutableArray<LayersConfig>;
  arrangeType: TableArrangeType;
}

export type IMConfig = ImmutableObject<Config>;
