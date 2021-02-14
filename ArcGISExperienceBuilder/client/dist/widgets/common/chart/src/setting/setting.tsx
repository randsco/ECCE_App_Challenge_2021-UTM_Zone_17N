import { React, Immutable, UseDataSource } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components';
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector';
import { IMConfig } from '../config';
import {  Button, hooks } from 'jimu-ui';
import { ChooseTemplate } from './settings/choose-template';
import { SerialSetting } from './settings/serial/serial-setting';
import { shouldShowTemplate } from './settings/serial/utils';
import { ChartType } from 'jimu-ui/advanced/chart';
import defaultMessages from './translations/default';

const SUPPORTED_TYPES = Immutable([AllDataSourceTypes.FeatureLayer]);

type SettingProps = AllWidgetSettingProps<IMConfig>;

const Setting = (props: SettingProps) => {
  const {
    id,
    useDataSources,
    useDataSourcesEnabled,
    onSettingChange,
    config
  } = props;

  const translate = hooks.useTranslate(defaultMessages);
  const [showTemp, setShowTemp] = React.useState(shouldShowTemplate(config));

  // const onSettingConfigChange = (key: string | string[], value: any) => {
  //   onSettingChange({
  //     id,
  //     config: Array.isArray(key) ? config.setIn(key, value) : config.set(key, value)
  //   });
  // }

  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if (!useDataSources) {
      return;
    }

    onSettingChange({
      id,
      useDataSources: useDataSources
    })
  }

  const onToggleUseDataEnabled = () => {
    onSettingChange({ id, useDataSourcesEnabled: !useDataSourcesEnabled });
  }

  const handleConfigChange = (config: IMConfig) => {
    onSettingChange({
      id,
      config
    });
  }

  const handleTemplateChange = (config: IMConfig) => {
    onSettingChange({
      id,
      config
    });
  }


  return <div className="widget-setting-chart jimu-widget-setting">
    {
      showTemp && <div className="page-1 w-100 h-100">
        <SettingSection>
          <SettingRow>
            <DataSourceSelector
              isMultiple={false}
              types={SUPPORTED_TYPES}
              useDataSources={useDataSources}
              useDataSourcesEnabled={useDataSourcesEnabled}
              onToggleUseDataEnabled={onToggleUseDataEnabled}
              onChange={onDataSourceChange}
              widgetId={id}
            />
          </SettingRow>
        </SettingSection>
        {
          !!(useDataSources?.[0] && useDataSourcesEnabled) && <ChooseTemplate template={config?.template} onExit={() => setShowTemp(false)} onChange={handleTemplateChange} />
        }
      </div>
    }
    {!showTemp &&
    <div className="page-1 w-100 h-100">
      <SettingSection>
        <Button type="link" size="sm" onClick={() => setShowTemp(true)}>{translate('anotherTemplateTip')}</Button>
      </SettingSection>
      {config.type === ChartType.Serial && <SerialSetting config={config} useDataSources={useDataSources} onChange={handleConfigChange}></SerialSetting>}
    </div>}
  </div>
}

export default Setting;