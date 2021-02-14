import { React, Immutable } from 'jimu-core';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { Button, hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui';
import { Card } from './components/card';
import { ChartTemplate, produceSerialChartAxes } from './serial/utils';
import { ChartType } from 'jimu-ui/advanced/chart';
import { IMConfig } from '../../config';
import defaultMessages from '../translations/default';

const CardStyle = {
  width: '109px',
  height: '90px',
  margin: '5px 0'
}

const thumbs = {
  'column': require('../assets/column.svg'),
  'stacked-column': require('../assets/stacked-column.svg'),
  'stacked100-column': require('../assets/stacked100-column.svg'),
  'bar': require('../assets/bar.svg'),
  'stacked-bar': require('../assets/stacked-bar.svg'),
  'stacked100-bar': require('../assets/stacked100-bar.svg')
}

export const ChartTemplates = {
  'column': require('../template/column.json'),
  'stacked-column': require('../template/stacked-column.json'),
  'stacked100-column': require('../template/stacked100-column.json'),
  'bar': require('../template/bar.json'),
  'stacked-bar':require('../template/stacked-bar.json'),
  'stacked100-bar': require('../template/stacked100-bar.json')
} as {[x: string]: ChartTemplate};

export interface ChooseTemplateProps {
  template: string;
  onChange: (config: IMConfig) => void;
  onExit?:() => void;
}

export const ChooseTemplate = (props: ChooseTemplateProps) => {
  const { template, onChange, onExit } = props;
  const translate = hooks.useTranslate([defaultMessages, jimuiDefaultMessage]);

  const handleChange = (value: ChartTemplate) => {
    const { name, type } = value;
    const config = Immutable({}) as IMConfig;
    let axes = null;
    if(type === ChartType.Serial) {
      axes = produceSerialChartAxes();
    }
    onChange?.(config.set('template', name).set('type', type).setIn(['display', 'axes'], axes))
  }

  return <SettingSection title={translate('chartTemplateTip')} className="template">
    <SettingRow>
      <div className="d-flex justify-content-between flex-wrap">
        {
          Object.entries(ChartTemplates).map(([key, value]) => {
            const icon = thumbs[key];
            return  <Card
              key={key}
              style={CardStyle}
              icon={icon}
              active={value.name === template}
              onClick={() => handleChange(value)}  />
          })
        }
      </div>
    </SettingRow>
    <div style={{position: 'absolute', bottom: '30px', width: '87.5%'}}>
      <Button className="w-100" disabled={!template} type="primary" onClick={onExit}>{translate('next')}</Button>
    </div>
  </SettingSection>

}