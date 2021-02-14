import { React, Immutable, UseDataSource } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder';
import { AllDataSourceTypes, DataSourceSelector } from 'jimu-ui/advanced/data-source-selector';

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<any> & unknown, unknown>{
  supportedTypes = Immutable([AllDataSourceTypes.FeatureLayer]);

  constructor(props) {
    super(props);
  }

  onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSourcesEnabled
    });
  }

  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if(!useDataSources){
      return;
    }

    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources
    });
  }

  render() {
    return <div className="w-100">
      <DataSourceSelector types={this.supportedTypes} useDataSources={this.props.useDataSources} useDataSourcesEnabled={this.props.useDataSourcesEnabled}
        onToggleUseDataEnabled={this.onToggleUseDataEnabled} onChange={this.onDataSourceChange} widgetId={this.props.id}
      />
    </div>;
  }
}