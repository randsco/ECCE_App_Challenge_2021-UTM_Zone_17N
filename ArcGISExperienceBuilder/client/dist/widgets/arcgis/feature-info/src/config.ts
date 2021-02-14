import {ImmutableObject} from 'jimu-core';
import {LinearUnit} from 'jimu-ui';

export enum StyleType {
  syncWithTheme = 'syncWithTheme',
  usePopupDefined = 'usePopupDefined',
  custom = 'custom'
}

export enum FontSizeType {
  auto = 'auto',
  custom = 'custom'
}

export interface StyleConfig{
  textColor: string;
  fontSizeType: FontSizeType;
  fontSize: LinearUnit;
  backgroundColor: string;
}

export interface Config{
  limitGraphics: boolean;
  maxGraphics: number;
  useMapWidget?: boolean;
  title: boolean;
  fields: boolean;
  media: boolean;
  attachments: boolean;
  lastEditInfo: boolean;
  noDataMessage: string;
  styleType: StyleType;
  style: StyleConfig;
}

export type IMConfig = ImmutableObject<Config>;
