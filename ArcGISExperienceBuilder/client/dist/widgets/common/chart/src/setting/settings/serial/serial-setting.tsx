/** @jsx jsx */
import { React, jsx, ImmutableArray, UseDataSource } from 'jimu-core';
import { SettingSection, SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components';
import { IMConfig } from '../../../config';
import { SerialDataSetting } from './section/serial-data';
import { ChartSection } from '../type';
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui';
import {  defaultMessages as jimBuilderDefaultMessage } from 'jimu-for-builder';
import defaultMessages from '../../translations/default';

export interface ChartSettingProps {
  config: IMConfig;
  useDataSources: ImmutableArray<UseDataSource>;
  onChange: (config: IMConfig) => void;
}

export const SerialSetting = (props: ChartSettingProps) => {
  const { useDataSources, config, onChange } = props;
  const [section, setSection] = React.useState(ChartSection.Data);
  const translate = hooks.useTranslate([defaultMessages, jimuiDefaultMessage, jimBuilderDefaultMessage]);
  const handleChange = (config: IMConfig) => {
    onChange?.(config);
  }

  return <div className="serial-setting w-100">
    <SettingSection>
      <SettingCollapse label={translate('data')} isOpen={section === ChartSection.Data} onRequestOpen={() => setSection(ChartSection.Data)} onRequestClose={() => setSection(ChartSection.None)}>
        <SettingRow flow="wrap">
          <SerialDataSetting useDataSources={useDataSources} config={config} onChange={handleChange}></SerialDataSetting>
        </SettingRow>
      </SettingCollapse>
    </SettingSection>
    <SettingSection>
      <SettingCollapse label={translate('series')} isOpen={section === ChartSection.Series}
        onRequestOpen={() => setSection(ChartSection.Series)} onRequestClose={() => setSection(ChartSection.None)}>
        <SettingRow flow="wrap">
        Series
        </SettingRow>
      </SettingCollapse>
    </SettingSection>
    <SettingSection>
      <SettingCollapse label={translate('axes')} isOpen={section === ChartSection.Axes} onRequestOpen={() => setSection(ChartSection.Axes)} onRequestClose={() => setSection(ChartSection.None)}>
        <SettingRow flow="wrap">
        Axes
        </SettingRow>
      </SettingCollapse>
    </SettingSection>
    <SettingSection>
      <SettingCollapse label={translate('guides')} isOpen={section === ChartSection.Guides} onRequestOpen={() => setSection(ChartSection.Guides)} onRequestClose={() => setSection(ChartSection.None)}>
        <SettingRow flow="wrap">
        Guides
        </SettingRow>
      </SettingCollapse>
    </SettingSection>
    <SettingSection>
      <SettingCollapse label={translate('general')} isOpen={section === ChartSection.General}
        onRequestOpen={() => setSection(ChartSection.General)} onRequestClose={() => setSection(ChartSection.None)}>
        <SettingRow flow="wrap">
        General
        </SettingRow>
      </SettingCollapse>
    </SettingSection>
    <SettingSection>
      <SettingCollapse label={translate('appearance')}
        isOpen={section === ChartSection.Appearance} onRequestOpen={() => setSection(ChartSection.Appearance)} onRequestClose={() => setSection(ChartSection.None)}>
        <SettingRow flow="wrap">
        Appearance
        </SettingRow>
      </SettingCollapse>
    </SettingSection>
    <SettingSection>
      <SettingCollapse label={translate('tools')} isOpen={section === ChartSection.Tools} onRequestOpen={() => setSection(ChartSection.Tools)} onRequestClose={() => setSection(ChartSection.None)}>
        <SettingRow flow="wrap">
        Tools
        </SettingRow>
      </SettingCollapse>
    </SettingSection>
  </div>
}