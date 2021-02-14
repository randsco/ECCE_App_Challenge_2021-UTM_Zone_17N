import { CategoryType, IMChartData } from './config';
import { ChartType } from 'jimu-ui/advanced/chart';
import { IMFieldSchema, DataSourceManager, StatisticType } from 'jimu-core';

export const ByFieldSeriesX = 'FieldName';
export const ByFieldSeriesY = 'FieldValue';
export const MaxCategories = 99;

const cacheFieldSchema = {};

export const getFieldSchema = (jimuFieldName: string, dataSourceId: string): IMFieldSchema => {
  if(cacheFieldSchema[jimuFieldName]) return cacheFieldSchema[jimuFieldName];
  const ds = DataSourceManager.getInstance().getDataSource(dataSourceId);
  const dsSchema = ds?.getSchema();
  const fieldSchema = dsSchema?.fields?.[jimuFieldName];
  cacheFieldSchema[jimuFieldName] = fieldSchema;
  return fieldSchema;
}

const cacheFieldsSchema = {};

export const getFieldsSchema = (dataSourceId: string): { [jimuName: string]: IMFieldSchema } => {
  if(cacheFieldsSchema[dataSourceId]) return cacheFieldsSchema[dataSourceId];
  const ds = DataSourceManager.getInstance().getDataSource(dataSourceId);
  const dsSchema = ds?.getSchema();
  const fieldsSchema = dsSchema?.fields;
  cacheFieldSchema[dataSourceId] = fieldsSchema;
  return fieldsSchema;
}

export const isValidChartData = (type:ChartType, data: IMChartData): boolean => {
  if(type === ChartType.Serial){
    const categoryType = data?.categoryType;
    if(categoryType === CategoryType.ByFeature) {
      return !!(data?.categoryField && data?.numericFields);
    } else if(categoryType === CategoryType.ByGroup) {
      return !!(data?.categoryField && data?.numericFields && data.statisticType)
    }else if(categoryType === CategoryType.ByField) {
      return !!(data?.numericFields && data.statisticType);
    }
  }
  return true;
}

export const getSeriesY = (categoryType: CategoryType, numericField: string, statisticType: StatisticType): string => {
  if(categoryType === CategoryType.ByFeature){
    return numericField;
  }else if(categoryType === CategoryType.ByGroup){
    return `${numericField}_${statisticType}`;
  }else if(categoryType === CategoryType.ByField){
    return `${numericField}`;
  }
}
