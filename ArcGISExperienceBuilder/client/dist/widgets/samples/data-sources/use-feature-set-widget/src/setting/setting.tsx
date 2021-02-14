import {React, Immutable, IMFieldSchema, DataSource, DataSourceTypes, DataSourceManager, UseDataSource} from 'jimu-core';
import {BaseWidgetSetting} from 'jimu-for-builder';
import {FieldSelector} from 'jimu-ui/advanced/data-source-selector';
import {DataSourceSelector} from 'jimu-ui/advanced/data-source-selector';

export default class Setting extends BaseWidgetSetting{
  supportedTypes = Immutable([DataSourceTypes.FeatureSet]);
  dsManager = DataSourceManager.getInstance();

  onFieldSelected = (allSelectedFields: IMFieldSchema[], ds: DataSource) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [{...this.props.useDataSources[0], ...{fields: allSelectedFields.map(f => f.jimuName)}}]
    })
  }

  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources,
    });
  }

  render(){
    return <div className="use-feature-layer-setting p-2">
      <DataSourceSelector
        mustUseDataSource
        types={this.supportedTypes}
        useDataSources={this.props.useDataSources}
        useDataSourcesEnabled={this.props.useDataSourcesEnabled}
        onChange={this.onDataSourceChange}
        widgetId={this.props.id}
      />

      <div className="mt-2">Please choose a Field to query:
        <FieldSelector
          useDataSources={this.props.useDataSources}
          onChange={this.onFieldSelected}
          selectedFields={this.props.useDataSources[0].fields || Immutable([])}
        />
      </div>
    </div>
  }
}