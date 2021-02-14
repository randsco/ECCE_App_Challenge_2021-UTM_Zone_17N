import { ImmutableObject, StatisticType, ImmutableArray } from 'jimu-core';
import { WebChart, ChartType, WebChartSeries } from 'jimu-ui/advanced/chart';

export interface ChartDisplay extends Omit<WebChart, 'type' | 'id' | 'dataSource' | 'background' | 'series'> {
  background?: string;
  series: IMWebChartSeries;
}

export type IMWebChartSeriesItem = ImmutableObject<WebChartSeries>;
export type IMWebChartSeries = ImmutableArray<IMWebChartSeriesItem>;

export type IMChartDisplay = ImmutableObject<ChartDisplay>;

export enum CategoryType {
  ByFeature = 'BYFEATURE',
  ByGroup = 'BYGROUP',
  ByField = 'BYFIELD'
}

export interface NumericData {
  numericFields?: string[];
  statisticType?: StatisticType;
}

export interface CategoryData extends NumericData {
  categoryType?: CategoryType;
  categoryField?: string;
  orderByFields?: string[];
  maxCategories?: number;
}

export interface ChartData extends CategoryData {
  //For gauge
  minimum?:NumericData;
  maximum?: NumericData;
}

export type IMChartData = ImmutableObject<ChartData>;

export interface Config {
  template: string;
  type: ChartType;
  data: ChartData;
  display: ChartDisplay;
}

export type IMConfig = ImmutableObject<Config>;
