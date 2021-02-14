import {React, IMDataSourceInfo, DataSource, DataSourceStatus, QueriableDataSource, DataSourceManager, utils, QueryResult} from 'jimu-core';

import { AllWidgetProps, DataSourceComponent} from 'jimu-core';

interface State{
  query1: any;
  query2: any;

  dsQuery: any;

  query3: any;
}

/**
 * This widget will show use multiple data-source-component with the same ds
 */
export default class Widget extends React.PureComponent<AllWidgetProps<unknown>, State>{
  valueRef1: React.RefObject<HTMLInputElement> = React.createRef();
  valueRef2: React.RefObject<HTMLInputElement> = React.createRef();
  valueRef3: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props){
    super(props);
    this.state = {query1: null, query2: null, dsQuery: null, query3: null}
  }

  componentDidUpdate(){
    const ds: QueriableDataSource = DataSourceManager.getInstance().getDataSource(this.props.useDataSources[0].dataSourceId) as QueriableDataSource;
    if(!ds){
      return;
    }
    if(this.state.query1 && this.state.query2){
      const newQ = ds.mergeQueryParams(this.state.query1, this.state.query2);
      if(!utils.isDeepEqual(this.state.dsQuery, newQ)){
        this.setState({
          dsQuery: newQ
        })
      }
    }else{
      this.setState({
        dsQuery: this.state.query1 || this.state.query2
      })
    }
  }

  query1 = () => {
    const fieldName = this.props.useDataSources[0].fields[0];
    const w = this.valueRef1.current && this.valueRef1.current.value ?
      `${fieldName} like '%${this.valueRef1.current.value}%'` : '1=1';
    const q = {
      where: w,
      outFields: ['*'],
      resultRecordCount: 10
    };

    this.setState({
      query1: q
    });
  }

  query2 = () => {
    if(!this.isDsConfigured()){
      return;
    }
    const fieldName = this.props.useDataSources[0].fields[0];
    const w = this.valueRef2.current && this.valueRef2.current.value ?
      `${fieldName} like '%${this.valueRef2.current.value}%'` : '1=1'
    const q = {
      where: w,
      outFields: ['*'],
      resultRecordCount: 10
    };

    this.setState({
      query2: q
    });
  }

  query3 = () => {
    if(!this.isDsConfigured()){
      return;
    }
    const fieldName = this.props.useDataSources[0].fields[0];
    const w = this.valueRef3.current && this.valueRef3.current.value ?
      `${fieldName} like '%${this.valueRef3.current.value}%'` : '1=1'
    this.setState({
      query3: {
        where: w,
        outFields: ['*'],
        resultRecordCount: 10
      }
    });
  }

  isDsConfigured = () => {
    if(this.props.useDataSources &&
      this.props.useDataSources.length === 1 &&
      this.props.useDataSources[0].fields &&
      this.props.useDataSources[0].fields.length === 1){
      return true;
    }
    return false;
  }

  dataRender1 = (ds: DataSource, info: IMDataSourceInfo) => {
    const fName = this.props.useDataSources[0].fields[0];

    return <div>
      <div>
        <input placeholder="Query value" ref={this.valueRef1}/>
        <button onClick={this.query1}>Query1</button>
      </div>
      <div>Query state: {info.status}</div>

      <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
        {
          ds ? ds.getRecords().map((r, i) => {
            return <div key={i}>{r.getData()[fName]}</div>
          }) : null
        }
      </div>
    </div>
  }

  dataRender2 = (ds: DataSource, info: IMDataSourceInfo) => {
    const fName = this.props.useDataSources[0].fields[0];

    return <div style={{marginLeft: '10px'}}>
      <div>
        <input placeholder="Query value" ref={this.valueRef2}/>
        <button onClick={this.query2}>Query2</button>
      </div>
      <div>Query state: {info.status}</div>

      <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
        {
          ds ? ds.getRecords().map((r, i) => {
            return <div key={i}>{r.getData()[fName]}</div>
          }) : null
        }
      </div>
    </div>
  }

  dataRender3 = (ds: DataSource, status: DataSourceStatus, queryResult: QueryResult) => {
    const fName = this.props.useDataSources[0].fields[0];

    return <div style={{marginLeft: '10px'}}>
      <div>
        <input placeholder="Query value" ref={this.valueRef3}/>
        <button onClick={this.query3}>Query3</button>
      </div>
      <div>Query state: {status}</div>

      <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
        {
          queryResult ? queryResult.records.map((r, i) => {
            return <div key={i}>{r.getData()[fName]}</div>
          }) : null
        }
      </div>
    </div>
  }

  render(){
    if(!this.isDsConfigured()){
      return <h3>
        Please config data source.
      </h3>;
    }
    return <div className="multiple-ds-component d-flex" style={{width: '100%', height: '100%', maxHeight: '800px', overflow: 'auto'}}>
      <div style={{border: 'solid 1px'}}>
        <div>These 2 update records in ds</div>
        <div className="d-flex">
          <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.dsQuery}>
            {
              this.dataRender1
            }
          </DataSourceComponent>

          <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.dsQuery}>
            {
              this.dataRender2
            }
          </DataSourceComponent>
        </div>
      </div>
    </div>;
  }
}
