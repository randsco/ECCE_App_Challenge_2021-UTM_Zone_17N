import {React, DataSource, RepeatedDataSourceProvider, WidgetManager, DataRecord, DataSourceStatus, QueriableDataSource, RepeatedDataSource} from 'jimu-core';

import { AllWidgetProps, DataSourceComponent} from 'jimu-core';

interface State{
  dataSource: DataSource;
  query: any;
  queryState: DataSourceStatus;
  records: DataRecord[]; //put records here to avoid share data
}

interface Config{
  innerWidgetIds: string[];
  queryTip: string;
}

export default class Widget extends React.PureComponent<AllWidgetProps<Config>, State>{
  state = {dataSource: null, query: null, records: [], queryState: DataSourceStatus.Unloaded}
  cityNameRef: React.RefObject<HTMLInputElement> = React.createRef();

  query = () => {
    if(!this.isDsConfigured()){
      return;
    }
    const fieldName = this.props.useDataSources[0].fields[0];
    let w = this.cityNameRef.current && this.cityNameRef.current.value ?
      `${fieldName} like '%${this.cityNameRef.current.value}%'` : '1=1';

    if(this.props.repeatedDataSource){
      const contextDs = this.props.repeatedDataSource as RepeatedDataSource;
      if(contextDs && contextDs.record){
        w = w + ` and st = '${contextDs.record.getData()['state_abbr']}'`
      }
    }
    this.setState({
      query: {
        where: w,
        outFields: this.props.useDataSources[0].fields,
        resultRecordCount: 3
      }
    });
  }

  componentDidUpdate(prevProps, prevState){
    this.props.config.innerWidgetIds.forEach(wId => {
      if(!WidgetManager.getInstance().getWidgetClass(wId)){
        WidgetManager.getInstance().loadWidgetClass(wId);
      }
    })

    if(!this.state.dataSource || !this.state.query){
      return;
    }

    if(this.state.queryState === DataSourceStatus.Loading){
      return;
    }

    if(this.state.query && prevState.query && this.state.query.where === prevState.query.where){
      return;
    }

    this.setState({queryState: DataSourceStatus.Loading});
    (this.state.dataSource as QueriableDataSource).query(this.state.query).then(result => {
      this.setState({
        records: result.records,
        queryState: DataSourceStatus.Loaded
      });
    }, err => this.setState({queryState: DataSourceStatus.LoadError}));
  }

  isDsConfigured = () => {
    if(this.props.useDataSources &&
      this.props.useDataSources.length === 2 &&
      this.props.useDataSources[0].fields &&
      this.props.useDataSources[0].fields.length === 2){
      return true;
    }
    return false;
  }

  dataRender = () => {
    const fName1 = this.props.useDataSources[0].fields[0];
    const fName2 = this.props.useDataSources[0].fields[1];

    if(!this.state.dataSource){
      return;
    }

    return <div>
      <div>
        <input placeholder={this.props.config.queryTip} ref={this.cityNameRef}/>
        <button onClick={this.query}>Query</button>
      </div>

      <div>Query state: {this.state.dataSource.getInfo().status}</div>

      <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
        {
          this.state.records.map((r, i) => {
            return <RepeatedDataSourceProvider key={i}
              data={{
                widgetId: this.props.id,
                dataSourceId: this.state.dataSource.id,
                recordIndex: i,
                record: r
              }}
            >
              <div style={{background: '#eee', margin: '2px'}}>
                <div>Item: {r.getData()[fName1]}, {r.getData()[fName2]}</div>
                <div style={{background: '#ddd', margin: '5px'}}>{
                  this.props.config.innerWidgetIds.map(wId => {
                    const Widget = WidgetManager.getInstance().getWidgetClass(wId);
                    if(Widget){
                      return <div style={{border: '1px solid red'}} key={wId}><Widget widgetId={wId}/></div>;
                    }else{
                      return <div key={wId}>...</div>;
                    }
                  })
                }</div>
              </div>
            </RepeatedDataSourceProvider>

          })
        }
      </div>
    </div>
  }

  render(){
    if(!this.isDsConfigured()){
      return <h3>
        This widget demostrates how to provide a data context.
        <br/>
        Please config data source.
      </h3>;
    }

    return <div className="widget-data-provider" style={{width: '100%', height: '100%', maxHeight: '800px', overflow: 'auto'}}>
      <DataSourceComponent useDataSource={this.props.useDataSources[0]} onDataSourceCreated={ds => this.setState({dataSource: ds})}>
      </DataSourceComponent>

      {this.dataRender()}
    </div>;
  }
}
