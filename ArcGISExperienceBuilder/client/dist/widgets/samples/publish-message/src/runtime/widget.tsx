import {React, MessageManager, DataSourceComponent, IMDataSourceInfo, IMUseDataSource, SelectDataRecordMessage,
  DataSourceManager, Immutable, DataRecordSetCreateMessage, DataRecordsSelectionChangeMessage} from 'jimu-core';
import {getAppConfigAction} from 'jimu-for-builder';

import { AllWidgetProps, FeatureDataRecord, DataSourceStatus} from 'jimu-core';
import {FeatureLayerDataSource, loadArcGISJSAPIModules} from 'jimu-arcgis';

interface State{
  query: any,
  currentDatasources: Array<IMUseDataSource>
}

export default class Widget extends React.PureComponent<AllWidgetProps<unknown>, State>{
  Query: typeof __esri.Query;
  FeatureSet: typeof __esri.FeatureSet;

  state = {
    query: null,
    currentDatasources: []
  };

  componentDidMount(){
    loadArcGISJSAPIModules([
      'esri/tasks/support/Query',
      'esri/tasks/support/FeatureSet'
    ]).then(modules => {
      [
        this.Query, this.FeatureSet
      ] = modules;

      const q = new this.Query({
        where: '1 = 1',
        outFields: ['*'],
        returnGeometry: true
      })
      this.setState({query: q})

      const dsManager = DataSourceManager.getInstance();

      const dsjson1 = Immutable({
        id: 'ds-2',
        label: 'ds 2',
        type: 'FEATURE_LAYER',
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/CITIES_EastUSA/FeatureServer/0'
      })

      const dsjson2 = Immutable({
        id: 'ds-3',
        label: 'ds 3',
        type: 'FEATURE_LAYER',
        url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/3'
      })

      dsManager.createDataSource({
        id: 'ds-2',
        dataSourceJson: dsjson1
      }).then(ds => {
        getAppConfigAction().addDataSource(dsjson1).exec();

        dsManager.createDataSource({
          id: 'ds-3',
          dataSourceJson: dsjson2
        }).then(ds => {
          getAppConfigAction().addDataSource(dsjson2).exec();
        })
      });
    });
  }

  showOnMap = (ds: FeatureLayerDataSource) => {
    const recordSet = {
      records: ds.getRecords()
    };
    MessageManager.getInstance().publishMessage(new DataRecordSetCreateMessage(this.props.id, ds.id, recordSet));
  }

  onFeatureSelectionChanged = (record: FeatureDataRecord) => {
    MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, [record]));
  }

  publishSelectDataRecordMessage = () => {
    MessageManager.getInstance().publishMessage(new SelectDataRecordMessage(this.props.id, 'ds-2', '0'));
  }

  publishEmptyFeatureSelectionChanged = () => {
    MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, []));
  }

  render(){

    return <div>
      {this.props.useDataSources && this.props.useDataSources[0] && <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.query}>{
        (ds: FeatureLayerDataSource, dsInfo: IMDataSourceInfo) => {
          const isLoaded = dsInfo.status === DataSourceStatus.Loaded;
          let fileName = ds.layer.displayField;
          if (!fileName || fileName === '') {
            fileName = ds.layer.objectIdField;
          }
          const ids = ds.getSelectedRecordIds();
          const idFiled = ds.getIdField();
          let list = null;
          if (isLoaded) {
            list = ds.getRecords().map((r, i) => {
              if (i < 10) {
                return <div key={i} style={{backgroundColor: `${ids.indexOf(r.getData()[idFiled]) > -1 ? 'gray' : 'white'}`}} onClick={ () => {
                  this.onFeatureSelectionChanged(r as FeatureDataRecord);
                }}>{r.getData()[fileName]}</div>
              } else {
                return null
              }
            })
          } else {
            // ds.load(this.state.query);
            list = null;
          }
          return <div>
            <h5>This widget will publish <b>FEATURE_SET_CREATE</b> message</h5>
            <button onClick={() => this.showOnMap(ds)}>display features</button>
            <button onClick={() => this.publishEmptyFeatureSelectionChanged()}>reset filter</button>
            <button onClick={() => this.publishEmptyFeatureSelectionChanged()}>reset selected</button>
            {/* <button onClick={() => this.clearSeletedFeature()}>clear selected feature</button>
            <button onClick={() => this.publishSelectDataRecordMessage()}>publish selectDataRecord message</button> */}
            <div>query state: {dsInfo.status}</div>
            {list}
          </div>
        }
      }</DataSourceComponent>}
    </div>;
  }
}
