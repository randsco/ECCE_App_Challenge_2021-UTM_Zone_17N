import {React, DataSourceComponent} from 'jimu-core';

import { AllWidgetProps} from 'jimu-core';

export default class Widget extends React.PureComponent<AllWidgetProps<unknown>, unknown>{
  componentDidMount(){
  }

  isDsConfigured = () => {
    if(!(this.props.useDataSources && this.props.useDataSources.length === 1)){
      return false;
    }
    return true;
  }

  render(){
    if(!this.isDsConfigured()){
      return 'No data source';
    }

    return <div className="widget-github-repo" style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <h3>
      This widget will show:<br/>
        * use a data source from another widget<br/>
        * auto update when the data source is changed<br/>
      </h3>

      <DataSourceComponent useDataSource={this.props.useDataSources[0]}>
        {
          ds => <div className="repo-count">
            The repo count: {ds.getRecords().length}
          </div>
        }
      </DataSourceComponent>

    </div>;
  }
}
