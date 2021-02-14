import { React, DataSource, AllWidgetProps, MessageManager, StringSelectionChangeMessage, DataSourceComponent} from 'jimu-core';

export default class Widget extends React.PureComponent<AllWidgetProps<unknown>, any>{

  constructor(props){
    super(props);
  }

  onStateChange = (evt: React.FormEvent<HTMLSelectElement>) => {
    MessageManager.getInstance().publishMessage(new StringSelectionChangeMessage(this.props.id, evt.currentTarget.value));
  };

  selectRender = (ds: DataSource) => {
    const records = ds.getRecords();
    const fName = this.props.useDataSources[0].fields[0];

    return <>
      <label>{fName}:</label>
      <select onChange={this.onStateChange}>
        {
          records?.map((r, i) => {
            return <option key={i} value={r.getData()[fName]}>{r.getData()[fName] || '-'}</option>
          })
        }
      </select>
    </>
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

  render(){
    if (!this.isDsConfigured()){
      return <h3>
        Please config data source.
      </h3>;
    }

    return <div className="widget-pub">
      <h5>This will publish<b>STRING_SELECTION_CHANGE</b> message</h5>
      <DataSourceComponent
        query={{}}
        widgetId={this.props.id}
        useDataSource={this.props.useDataSources[0]}
      >
        {this.selectRender}
      </DataSourceComponent>
    </div>
  }
}
