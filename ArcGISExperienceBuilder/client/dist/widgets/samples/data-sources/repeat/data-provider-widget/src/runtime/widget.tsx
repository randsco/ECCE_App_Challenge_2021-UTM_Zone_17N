import {React, IMDataSourceInfo, DataSource, RepeatedDataSourceProvider, WidgetManager, IMState} from 'jimu-core';

import { AllWidgetProps, DataSourceComponent} from 'jimu-core';

interface State{
  query: any;
}

interface Config{
  innerWidgetIds: string[];
  queryTip: string;
}

export default class Widget extends React.PureComponent<AllWidgetProps<Config>, State>{
  state = {query: null}
  cityNameRef: React.RefObject<HTMLInputElement> = React.createRef();

  static mapExtraStateProps = (state: IMState) => {
    return {
      widgetsRuntimeInfo: state.widgetsRuntimeInfo
    }
  }

  query = () => {
    if(!this.isDsConfigured()){
      return;
    }
    const fieldName = this.props.useDataSources[0].fields[0];
    const w = this.cityNameRef.current && this.cityNameRef.current.value ?
      `${fieldName} like '%${this.cityNameRef.current.value}%'` : '1=1';

    this.setState({
      query: {
        where: w,
        outFields: this.props.useDataSources[0].fields,
        resultRecordCount: 3
      }
    });
  }

  componentDidUpdate(){
    this.props.config.innerWidgetIds.forEach(wId => {
      if(!WidgetManager.getInstance().getWidgetClass(wId)){
        WidgetManager.getInstance().loadWidgetClass(wId);
      }
    })
  }

  isDsConfigured = () => {
    if(this.props.useDataSources &&
      this.props.useDataSources.length === 1 &&
      this.props.useDataSources[0].fields &&
      this.props.useDataSources[0].fields.length === 2){
      return true;
    }
    return false;
  }

  dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
    const fName1 = this.props.useDataSources[0].fields[0];
    const fName2 = this.props.useDataSources[0].fields[1];

    return <div>
      <div>
        <input placeholder={this.props.config.queryTip} ref={this.cityNameRef}/>
        <button onClick={this.query}>Query</button>
      </div>
      <div>Query state: {info.status}</div>

      <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
        {
          ds ? ds.getRecords().map((r, i) => {
            return <RepeatedDataSourceProvider key={i}
              data={{
                widgetId: this.props.id,
                dataSourceId: ds.id,
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
                      return <div style={{border: '1px solid blue'}} key={wId}><Widget widgetId={wId}/></div>;
                    }else{
                      return <div key={wId}>...</div>;
                    }
                  })
                }</div>
              </div>
            </RepeatedDataSourceProvider>

          }) : null
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
      <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.query}>
        {
          this.dataRender
        }
      </DataSourceComponent>

    </div>;
  }
}
