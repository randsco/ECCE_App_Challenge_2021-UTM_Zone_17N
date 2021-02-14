import {React, IMDataSourceInfo, DataSource} from 'jimu-core';

import { AllWidgetProps, DataSourceComponent} from 'jimu-core';

interface State{
}

export default class Widget extends React.PureComponent<AllWidgetProps<unknown>, State>{

  componentDidMount(){
  }

  isDsConfigured = () => {
    if(this.props.useDataSources &&
      this.props.useDataSources.length === 1){
      return true;
    }
    return false;
  }

  dataRender = (ds: DataSource, info: IMDataSourceInfo) => {

    return <div>
      Count:
      {
        ds.getRecords().length
      }
      <br/>
      Selected field value:
      {
        this.props.useDataSources[0].fields && this.props.useDataSources[0].fields.length > 0
          &&
          ds.getRecords().map((record, i) =>
            <div key={i}>
              {record.getData()[this.props.useDataSources[0].fields[0]]}
            </div>
          )
      }

    </div>
  }

  render(){
    if(!this.isDsConfigured()){
      return <h3>
        This widget demostrates how to use a feature set as the data source.
        <br/>
        Please config data source.
      </h3>;
    }
    return <div className="widget-use-feature-set" style={{width: '100%', height: '100%', maxHeight: '800px', overflow: 'auto'}}>
      <h3>
        This widget show how to use feature set as a data source.
      </h3>

      <DataSourceComponent useDataSource={this.props.useDataSources[0]}>
        {
          this.dataRender
        }
      </DataSourceComponent>
    </div>;
  }
}
