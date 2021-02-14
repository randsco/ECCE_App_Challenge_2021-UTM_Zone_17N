import {React, MessageManager, DataSourceComponent, IMDataSourceInfo, DataRecordSetCreateMessage, DataRecordsSelectionChangeMessage} from 'jimu-core';

import { AllWidgetProps, FeatureDataRecord, DataSourceStatus} from 'jimu-core';
import {FeatureLayerDataSource} from 'jimu-arcgis/arcgis-data-source'
import * as Query from 'esri/tasks/support/Query';

interface State{
  query: any
}

export default class Widget extends React.PureComponent<AllWidgetProps<unknown>, State>{
  state = {
    query: {}
  };

  componentDidMount(){
    const q = new Query({
      where: '1 = 1',
      outFields: ['*'],
      returnGeometry: true
    })
    this.setState({query: q})
  }

  showOnMap = (ds: FeatureLayerDataSource) => {
    const fs = {
      records: ds.getRecords()
    };
    MessageManager.getInstance().publishMessage(new DataRecordSetCreateMessage(this.props.id, 'fs1', fs));
  }

  onFeatureSelectionChanged = (record: FeatureDataRecord) => {
    MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, [record]));
  }

  showOnMap2 = (ds: FeatureLayerDataSource) => {
    const fs = {
      records: ds.getRecords()
    };
    MessageManager.getInstance().publishMessage(new DataRecordSetCreateMessage(this.props.id, 'fs2', fs));
  }

  render(){

    return <div>
      <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.query} widgetId={this.props.id}>{
        (ds: FeatureLayerDataSource, dsInfo: IMDataSourceInfo) => {
          const isLoaded = dsInfo.status === DataSourceStatus.Loaded;
          const list = isLoaded ? ds.getRecords().map((r, i) => {
            if (i < 10) {
              return <div key={i} onClick={ () => {
                this.onFeatureSelectionChanged(r as FeatureDataRecord);
              }}>{r.getData()['CITY_NAME']}</div>
            } else {
              return null
            }
          }) : null;

          return <div>
            <h5>This widget will publish <b>DATA_RECORD_SET_CREATE</b> message</h5>
            <button onClick={() => this.showOnMap(ds)}>display and zoomto features</button>
            <div>query state: {dsInfo.status}</div>
            {list}
          </div>
        }
      }</DataSourceComponent>

      <DataSourceComponent useDataSource={this.props.useDataSources[1]} query={this.state.query} widgetId={this.props.id}>{
        (ds: FeatureLayerDataSource, dsInfo: IMDataSourceInfo) => {
          const isLoaded = dsInfo.status === DataSourceStatus.Loaded;
          const list = isLoaded ? ds.getRecords().map((r, i) => {
            if (i < 10) {
              return <div key={i} onClick={ () => {
                this.onFeatureSelectionChanged(r as FeatureDataRecord);
              }}>{r.getData()['name']}</div>
            } else {
              return null
            }
          }) : null;

          return <div>
            <h5>This widget will publish <b>DATA_RECORD_SET_CREATE</b> message2</h5>
            <button onClick={() => this.showOnMap2(ds)}>display and zoomto features</button>
            <div>query state: {dsInfo.status}</div>
            {list}
          </div>
        }
      }</DataSourceComponent>
    </div>;
  }
}
