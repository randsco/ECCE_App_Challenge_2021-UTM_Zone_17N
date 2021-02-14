import { JimuFieldType, IMFieldSchema, utils, ImmutableObject, Immutable } from 'jimu-core';
import { WebChartBarChartSeries, WebChartAxis, ChartType, WebChartText, NumberFormatOptions, CategoryFormatOptions } from 'jimu-ui/advanced/chart';
import { IMConfig, IMWebChartSeries, IMWebChartSeriesItem } from '../../../config';
import { getDefaultText } from '../components/text-setting';
import { getDefaultLine } from '../components/line-setting';
import { getDefaultFill } from '../components/fill-setting';

export interface ChartTemplate {
  name: string;
  type: ChartType;
  series: IMWebChartSeries;
}

const DefaultCategoryValueFormat = {
  type: 'category',
  characterLimit: 10
} as CategoryFormatOptions;

const DefaultNumberValueFormat = {
  type: 'number',
  intlOptions: {}
} as NumberFormatOptions;


export const getValueFormat = (fieldSchema: IMFieldSchema, characterLimit: number = 10) => {
  if(fieldSchema.type === JimuFieldType.Date){
    const intlOptions = utils.getIntlOption(fieldSchema);
    return {
      type: 'date',
      intlOptions
    }
  }else if(fieldSchema.type === JimuFieldType.String){
    return {
      type: 'category',
      characterLimit
    }
  }
  else if(fieldSchema.type === JimuFieldType.Number){
    const intlOptions = utils.getIntlOption(fieldSchema);
    return {
      type: 'number',
      intlOptions
    }
  }
};

export const setAxisTitle = (axis: ImmutableObject<WebChartAxis>, title: string) => {
  return axis.setIn(['title', 'content', 'text'], title);
}

export const shouldShowTemplate = (config: IMConfig): boolean => {
  return !config?.template
}

export const producChartText = (visible: boolean): WebChartText => {
  const text = {
    type: 'chartText' as const,
    visible,
    content: getDefaultText()
  }
  return text;
}

export const produceChartAxis = (valueFormat): WebChartAxis => {
  const axis = {
    type: 'chartAxis' as const,
    visible: true,
    title: producChartText(false),
    labels: producChartText(true),
    lineSymbol: getDefaultLine(),
    valueFormat
  };

  return axis;
}

export const produceSerialChartAxes = () => {
  const xAxis = produceChartAxis(DefaultCategoryValueFormat);
  const YAxis = produceChartAxis(DefaultNumberValueFormat);
  return [xAxis, YAxis];
}

export const produceSerialSerie = (seriesTemplate: IMWebChartSeriesItem, id: string, name: string, y: string, x: string): IMWebChartSeriesItem => {
  const type = seriesTemplate.type;

  let series = Immutable({
    type: seriesTemplate.type,
    id,
    name,
    x,
    y,
    colorType: 'singleColor',
    dataLabels: producChartText(false)
  })

  if(type === 'barSeries') {
    seriesTemplate = seriesTemplate as ImmutableObject<WebChartBarChartSeries>;
    series = (series as ImmutableObject<WebChartBarChartSeries>).set('multipleBarType', (seriesTemplate as unknown as WebChartBarChartSeries).multipleBarType);
    series = (series as ImmutableObject<WebChartBarChartSeries>).set('rotated', (seriesTemplate as unknown as WebChartBarChartSeries).rotated);
    series = (series as ImmutableObject<WebChartBarChartSeries>).set('fillSymbol', getDefaultFill());
  }else if(type === 'lineSeries') {
    series = (series as ImmutableObject<WebChartBarChartSeries>).set('lineSymbol', getDefaultLine());
  }
  return series as IMWebChartSeriesItem;
}

export const setSerialSerieProps = (serie: IMWebChartSeriesItem, id: string, name: string, y: string, x: string): IMWebChartSeriesItem => {
  return Immutable(serie).set('id', id).set('name', name).set('y', y).set('x', x);
}



