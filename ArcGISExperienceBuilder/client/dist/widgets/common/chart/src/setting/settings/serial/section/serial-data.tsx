import { React, ImmutableArray, UseDataSource, Immutable, StatisticType } from 'jimu-core';
import {  Select, hooks, Switch, NumericInput, defaultMessages as jimuiDefaultMessage } from 'jimu-ui';
import {  SettingRow } from 'jimu-ui/advanced/setting-components';
import {  IMConfig, CategoryType, IMChartData } from '../../../../config';
import { FieldSelector } from '../../components/field-selector';
import { produceSerialSerie, setSerialSerieProps } from '../utils';
import { ChartTemplates } from '../../choose-template';
import { getObjectIdField } from '../../../../runtime/utils';
import { MaxCategories, getFieldSchema, ByFieldSeriesY, ByFieldSeriesX, getSeriesY, getFieldsSchema } from '../../../../utils';
import defaultMessages from '../../../translations/default';

export interface SerialDataSettingProps {
  config: IMConfig;
  useDataSources: ImmutableArray<UseDataSource>;
  onChange: (config: IMConfig) => void;
}

export const SerialDataSetting = (props: SerialDataSettingProps) => {
  const { useDataSources, config, onChange } = props;
  const dataSourceId = useDataSources?.[0]?.dataSourceId;
  const { categoryType, categoryField, numericFields, statisticType, orderByFields, maxCategories = MaxCategories  } = config?.data ?? {} as IMChartData;
  const propSeries = config.display?.series;
  const template = ChartTemplates[config.template];
  const [orderFields, setOrderFields] = React.useState<{name: string, value: string}[]>([]);

  const orderField = orderByFields?.[0]?.split(' ')?.[0];
  const order = orderByFields?.[0]?.split(' ')?.[1] ?? 'ASC';
  const translate = hooks.useTranslate([defaultMessages, jimuiDefaultMessage]);

  //update order fields
  React.useEffect(() => {
    let fields = [];
    if(categoryType === CategoryType.ByFeature) {
      const fieldsSchema = getFieldsSchema(dataSourceId);
      fields = Object.entries(fieldsSchema).map(([jimuName, schema]) => {
        return {
          name: schema?.alias ?? jimuName,
          value: jimuName
        }
      })
    }else if(categoryType === CategoryType.ByGroup) {
      categoryField && fields.push({
        name: getFieldSchema(categoryField, dataSourceId)?.alias ?? categoryField,
        value: categoryField
      })
      numericFields?.forEach(numericField => {
        fields.push({
          name: getFieldSchema(numericField, dataSourceId)?.alias ?? numericField,
          value: getSeriesY(categoryType, numericField, statisticType)
        })
      })
    }else if(categoryType === CategoryType.ByField) {
      fields.push({
        name: ByFieldSeriesX,
        value: ByFieldSeriesX
      })
      fields.push({
        name: ByFieldSeriesY,
        value: ByFieldSeriesY
      })
    }
    setOrderFields(fields)

  }, [categoryField, numericFields, categoryType, dataSourceId, statisticType])

  const handleCategoryTypeChange = (evt:React.MouseEvent<HTMLSelectElement>) => {
    const categoryType = evt?.currentTarget.value as CategoryType;
    let newConfig = config?.setIn(['data', 'categoryField'], undefined)?.
    setIn(['data', 'numericFields'], [])?.
    setIn(['data', 'orderByFields'], [])?.
    setIn(['data', 'statisticType'], StatisticType.Sum)?.
    setIn(['data', 'maxCategories'], MaxCategories)?.
    setIn(['data', 'categoryType'], categoryType)?.
    setIn(['display', 'series'], []);

    if(categoryType === CategoryType.ByField) {
      const originSeriesTemplate = template?.series?.[0];
      const serie = propSeries?.find(serie => serie.id === ByFieldSeriesY) ?? produceSerialSerie(originSeriesTemplate, ByFieldSeriesY, ByFieldSeriesY, ByFieldSeriesY, ByFieldSeriesX);
      newConfig = newConfig?.setIn(['display', 'series'], [serie]);
    }
    onChange?.(newConfig);
  }

  const getSeries = (categoryType: CategoryType,fields: ImmutableArray<string>, statisticType: StatisticType,categoryField: string ) => {
    const firstSeriesTemplate = template?.series?.[0];
    return fields?.map((field, idx) => {
      const alias = getFieldSchema(field, dataSourceId)?.alias ?? field;
      const serieY = getSeriesY(categoryType, field, statisticType);

      let serie = propSeries?.find(serie => serie.id === field);
      if(!serie) {
        const seriesTemplate = template?.series?.[idx] ?? firstSeriesTemplate;
        serie = produceSerialSerie(seriesTemplate, field, alias, serieY, categoryField);
      }else {
        serie = setSerialSerieProps(serie, field, alias, serieY, categoryField);
      }

      return serie;
    }) ?? [];
  }

  const handleCategoryFieldsChange = (fields: ImmutableArray<string>) => {
    //TODO: Set axes[0].value format
    const newConfig = config?.setIn(['data', 'categoryField'], fields?.[0])?.
    setIn(['data', 'numericFields'], [])?.
    setIn(['data', 'orderByFields'], [])?.
    setIn(['data', 'statisticType'], StatisticType.Sum)?.
    setIn(['data', 'maxCategories'], MaxCategories)?.
    setIn(['display', 'series'], []);

    onChange?.(newConfig);
  }

  const handleStatisticTypeChange = (evt:React.MouseEvent<HTMLSelectElement>) => {
    const statisticType = evt?.currentTarget.value as StatisticType;
    let newConfig = config;
    if(statisticType === StatisticType.Count) {
      const objectId = getObjectIdField(dataSourceId);
      const fields = objectId ? [objectId] : [];
      const series = getSeries(categoryType, Immutable(fields), statisticType, categoryField);
      newConfig = newConfig?.setIn(['data', 'numericFields'], fields).setIn(['display', 'series'], series);
    }else {
      const series = getSeries(categoryType, numericFields, statisticType, categoryField);
      newConfig = newConfig?.setIn(['display', 'series'], series);
    }
    newConfig = newConfig?.setIn(['data', 'statisticType'], statisticType)
    onChange?.(newConfig);
  }

  const handleNumericFieldsChange = (fields: ImmutableArray<string>) => {
    let newConfig = config;
    if(categoryType !== CategoryType.ByField) {
      const series = getSeries(categoryType, fields, statisticType, categoryField);
      newConfig = newConfig?.setIn(['display', 'series'], series);
    }
    onChange?.(newConfig?.setIn(['data', 'numericFields'], fields)?.setIn(['data', 'orderByFields'], []));
  }

  const handleOrderFieldChange = (evt:React.MouseEvent<HTMLSelectElement>) => {
    const orderField = evt?.currentTarget.value as string;
    onChange(config.setIn(['data', 'orderByFields'], [`${orderField} ${order}`]));
  }

  const handleOrderChange = (_, checked) => {
    const order = checked ? 'ASC' : 'DESC';
    onChange(config.setIn(['data', 'orderByFields'], [`${orderField} ${order}`]));
  }

  const handleMaxCategoriesChange = (maxCategories: number) => {
    onChange(config.setIn(['data', 'maxCategories'], +maxCategories));
  }

  return <div className="chart-data-setting w-100">
    <SettingRow label={translate('categoryType')} flow="wrap">
      <Select value={categoryType} onChange={handleCategoryTypeChange}>
        {
          Object.keys(CategoryType).map((f, i) =>
            <option value={CategoryType[f]} key={i} className="text-truncate">{CategoryType[f]}</option>
          )
        }
      </Select>
    </SettingRow>
    { categoryType && <React.Fragment>
      { categoryType !== CategoryType.ByField &&  <SettingRow label={translate('categoryField')} flow="wrap">
        <FieldSelector
          type="category"
          useDataSources={useDataSources}
          isMultiple={false}
          fields={Immutable([categoryField])}
          onChange={handleCategoryFieldsChange} />
      </SettingRow>}
      {categoryType !== CategoryType.ByFeature && <SettingRow label={translate('statistics')} flow="wrap">
        <Select value={statisticType} onChange={handleStatisticTypeChange}>
          {
            Object.keys(StatisticType).filter((st => !(st === StatisticType.Count &&  categoryType === CategoryType.ByField ))).map((st, i) =>
              <option value={StatisticType[st]} key={i} className="text-truncate">{st}</option>
            )
          }
        </Select>
      </SettingRow>}
      <SettingRow label={translate('numberField')} flow="wrap" >
        <FieldSelector
          type="numeric"
          isMultiple={statisticType !== StatisticType.Count}
          useDataSources={useDataSources}
          fields={numericFields}
          onChange={handleNumericFieldsChange} />
      </SettingRow>
      <SettingRow label={translate('sortBy')} flow="wrap" >
        <div className="w-100 d-flex justify-content-between align-items-center">
          <Select value={orderField} onChange={handleOrderFieldChange} className="w-50">
            {orderFields.map((field, i) =>
              <option value={field.value} key={i} className="text-truncate">{field.name}</option>
            )}
          </Select>
          <Switch checked={order === 'ASC'} onChange={handleOrderChange}></Switch>
        </div>
      </SettingRow>
    </React.Fragment>}
    <SettingRow label={translate('maxCategories')} flow="wrap">
      <NumericInput className="w-100" value={maxCategories} onAcceptValue={handleMaxCategoriesChange} min={1} max={9999} step={1} showHandlers={false} />
    </SettingRow>
  </div>;
}