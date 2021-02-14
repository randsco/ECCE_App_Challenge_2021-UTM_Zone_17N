import {React, AllWidgetProps, DataSourceComponent, DataSource, IMDataSourceInfo, DataSourceStatus, getAppStore, ReactRedux, IMState, Immutable, IMFeatureLayerQueryParams } from 'jimu-core';
import { IMConfig, IMChartDisplay, IMChartData } from '../config';
import { Chart } from 'jimu-ui/advanced/chart';
import { createChartDataSource, createChartConfig, toChartData, muableObject, toSymbolColor, replaceSymbolColor, toQuery } from './utils';
import { isValidChartData } from '../utils';

const DefaultData = Immutable({}) as IMChartData;
const DefaultDisplay = Immutable({}) as IMChartDisplay;

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [ds, setDs] = React.useState<DataSource>(null);
  const { useDataSources, id, config } = props;
  const dataSourceId = useDataSources?.[0]?.dataSourceId;
  const type = config?.type;
  const data = config?.data ?? DefaultData;
  const display = config?.display ?? DefaultDisplay;
  const { categoryField ,numericFields, categoryType, orderByFields, statisticType, maxCategories } = data;
  const { series: propSeries, axes: propAxes, background: propBg } = display;
  const isInBuilder = getAppStore().getState().appContext.isInBuilder;
  const theme = ReactRedux.useSelector((state: IMState) => state.theme);
  const background = React.useMemo(() => toSymbolColor(propBg, theme), [propBg, theme]);

  const [chartData, setChartData] = React.useState([]);
  const [query, setQuery] = React.useState<IMFeatureLayerQueryParams>();

  React.useEffect(()=> {
    const data = {categoryField, statisticType, numericFields, categoryType, orderByFields} as IMChartData
    const valid= isValidChartData(type, data);
    const query = valid ? toQuery(type, data, orderByFields) : Immutable({});
    setQuery(query);
    setChartData([]);
  }, [categoryField, numericFields, categoryType, orderByFields, type, statisticType]);

  //arcgis-charts-js does not receive immuable object
  //arcgis-charts-js has a problem in processing objects across iframes, solve this problem by deep cloning when in builder
  const series = React.useMemo(() => muableObject(propSeries, isInBuilder), [isInBuilder, propSeries]);

  const axes = React.useMemo(() => muableObject(propAxes, isInBuilder), [isInBuilder, propAxes]);

  const dataSource = React.useMemo(() => {
    return createChartDataSource(chartData, categoryType, numericFields, orderByFields, maxCategories, dataSourceId);
  }, [chartData, categoryType, numericFields, dataSourceId, orderByFields, maxCategories]);

  const chartConfig = React.useMemo(() =>{
    const config =  createChartConfig(dataSource, series, axes, background);
    return replaceSymbolColor(config, theme)
  }, [dataSource, series, axes, background, theme]);

  const handleDatasourceInfoChange = (info: IMDataSourceInfo) => {
    if(info?.status === DataSourceStatus.Loaded){
      const records = ds?.getRecords() ?? [];
      const data = toChartData(records);
      setChartData(data);
    }
  }

  return <div className="widget-chart jimu-widget">
    <Chart config={chartConfig}></Chart>
    <DataSourceComponent
      localId={id}
      query={query}
      onDataSourceCreated={setDs}
      onDataSourceInfoChange={handleDatasourceInfoChange}
      useDataSource={useDataSources?.[0]}>
    </DataSourceComponent>
  </div>;
}

export default Widget;