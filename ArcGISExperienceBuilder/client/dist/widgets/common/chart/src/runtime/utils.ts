import { WebChartInlineDataSource, WebChart, WebChartAxis, ChartType } from 'jimu-ui/advanced/chart'
import { DataRecord, polished, ThemeVariables, ImmutableArray, DataSourceManager,
  StatisticType, Immutable, StatisticDefinition, IMFeatureLayerQueryParams } from 'jimu-core'
import { utils } from 'jimu-ui';
import { IMChartData, CategoryType } from '../config';
import { ByFieldSeriesX, getFieldSchema, ByFieldSeriesY, getSeriesY } from '../utils';

export const CategoryFieldForByField = 'Field';

const cacheObjectIdField = {};

export const getObjectIdField = (dataSourceId: string): string => {
  if(cacheObjectIdField[dataSourceId]) return cacheObjectIdField[dataSourceId];
  const ds = DataSourceManager.getInstance().getDataSource(dataSourceId);
  const objectId = ds.getIdField();
  cacheObjectIdField[dataSourceId] = objectId;
  return objectId;
}

const deepClone = (input: any) => {
  if(Object.prototype.toString.call(input) === '[object Object]'){
    const ret = {};
    Object.entries(input).forEach(([key, value]) => {
      ret[key] = deepClone(value);
    });
    return ret;
  }else if(Object.prototype.toString.call(input) === '[object Array]') {
    const ret = [];
    input.forEach((value, idx) => {
      ret[idx] = deepClone(value);
    });
    return ret;
  } else {
    return input;
  }
}

export const muableObject= (input: {[x: string]: any}, clone?: boolean): any => {
  const object = input?.asMutable ? input.asMutable({deep: true}) : input;
  return clone ? deepClone(object) : object;
}

export const createChartConfig = (dataSource: WebChartInlineDataSource, series: any, axes: WebChartAxis[], background): WebChart => {
  return {
    type: 'chart',
    id: 'exb-chart',
    background,
    dataSource,
    series: series || [],
    axes: axes || []
  } as WebChart;
}

export const createChartDataSource = (originData: {[x: string]: any}[], categoryType: CategoryType, numericFields: ImmutableArray<string>,
  orderByFields:  ImmutableArray<string>, maxCategories: number, dataSourceId: string) : WebChartInlineDataSource => {

  const orderField = orderByFields?.[0]?.split(' ')?.[0];
  const order = orderByFields?.[0]?.split(' ')?.[1];

  let data = originData;
  if(categoryType === CategoryType.ByField) {
    data = numericFields?.asMutable()?.map((field) => {
      const alias = getFieldSchema(field, dataSourceId)?.alias ?? field;
      return {
        [ByFieldSeriesX]: alias,
        [ByFieldSeriesY]: originData?.[0]?.[field]
      } as {[x: string]: any}
    });
  }
  if(orderField && categoryType === CategoryType.ByGroup || categoryType === CategoryType.ByField){
    data = data.sort((a, b) => {
      let v1 = a[orderField];
      let v2 = b[orderField];
      let sorted = 0;
      if(typeof v1 === 'string') {
        v1 = v1.toUpperCase();
        v2 = v2.toUpperCase();
      }
      if(v1 !== v2) {
        sorted = v1 > v2 ? 1 : -1;
        sorted = order === 'ASC' ? sorted : -sorted;
      }
      return sorted;
    })
  }
  data = data.slice(0, maxCategories);
  return {
    type: 'inline',
    data,
    processed: true
  }
}

export const toChartData = (records: DataRecord[]) : Array<any> => {
  return records.map((record) => {
    const data = record.getData();
    return data;
  }).filter(e => !!e);
}

export const toSymbolColor = (value: string, theme?: ThemeVariables): [number, number, number, number] => {
  if(typeof value !== 'string' || !value) return value as any;
  const color =  utils.getColorValue(value, theme);
  const rgba = polished.parseToRgb(color);
  if(!rgba) return;
  const { red, green, blue } = rgba;
  const alpha = (rgba.alpha ?? 1) * 255;
  return [red, green, blue, alpha]
}

const convertColor = (theme:ThemeVariables, obj: {[x: string]: any}, key: string, value: any) => {
  if(key === 'color') {
    obj[key] = toSymbolColor(value, theme);
  }
}

const traverse = (input: any, callback: (obj: {[x: string]: any}, key: string, value: any) => any, pending: {[x: string]: any}, key: string) => {
  if(Object.prototype.toString.call(input) === '[object Object]'){
    Object.entries(input).forEach(([key, value]) => {
      traverse(value, callback, input, key);
    });
  }else if(Object.prototype.toString.call(input) === '[object Array]') {
    input.forEach((value, idx) => {
      traverse(value, callback, input, idx);
    });
  } else {
    callback(pending, key, input);
  }
}

export const replaceSymbolColor = (chartConfig: WebChart, theme?: ThemeVariables) => {
  traverse(chartConfig, convertColor.bind(null, theme), null, null);
  return chartConfig;
}

export const toOutStatistics = (statisticType: StatisticType, numericFields: ImmutableArray<string>, categoryType: CategoryType): ImmutableArray<StatisticDefinition> => {
  return numericFields.map(onStatisticField => {
    return {
      onStatisticField,
      outStatisticFieldName: getSeriesY(categoryType, onStatisticField, statisticType),
      statisticType
    } as StatisticDefinition;
  })
}

/**
 * Convert chart data to feature layer query params
 * @param type ChartType
 * @param data IMChartData
 */
export const toQuery = (type:ChartType, data: IMChartData, orderByFields): IMFeatureLayerQueryParams => {
  let query = null;
  if(type === ChartType.Serial){
    const categoryType = data?.categoryType;
    const categoryField = data?.categoryField;
    const statisticType = data?.statisticType;
    const numericFields = data?.numericFields ?? Immutable([]);
    if(categoryType === CategoryType.ByFeature) {
      const outFields = numericFields.concat(categoryField);
      query = {outFields, orderByFields};
    } else if(categoryType === CategoryType.ByGroup) {
      const groupByFieldsForStatistics = [categoryField];
      const outStatistics = toOutStatistics(statisticType, numericFields, categoryType);
      query = {
        groupByFieldsForStatistics,
        outStatistics,
        orderByFields
      }
    }else if(categoryType === CategoryType.ByField) {
      const outStatistics = toOutStatistics(statisticType, numericFields, categoryType);
      query = {
        outStatistics,
        orderByFields
      }
    }
    return Immutable(query);
  }
}