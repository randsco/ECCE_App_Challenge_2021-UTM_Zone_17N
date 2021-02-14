import { React, lodash } from 'jimu-core';
import { IFont, ITextSymbol } from '@esri/arcgis-rest-types';
import { SettingRow } from 'jimu-ui/advanced/setting-components';
import { ChartFontSetting } from './font-setting';
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker';

export interface ChartTextProps {
  value: ITextSymbol;
  onChange: (value: ITextSymbol) => void;
}

const DefaultValue = {
  type: 'esriTS',
  color: 'var(--dark)' as any,
  font: {
    family: 'Arial',
    size: 14,
    style: 'normal',
    weight: 'normal',
    decoration: 'none'
  } as IFont,
  horizontalAlignment: 'center',
  verticalAlignment: 'middle'
} as ITextSymbol;

export const getDefaultText= () => DefaultValue;

export const ChartTextSetting = (props: ChartTextProps) => {
  const {value: propValue = DefaultValue, onChange } = props;

  const handleChange = (key: string, value: any) => {
   onChange?.(lodash.assign(DefaultValue, propValue, {[key]: value}))
  }

  return <div className="chart-text-setting w-100">
    <ChartFontSetting value={propValue?.font} onChange={(value) => handleChange('font', value)}></ChartFontSetting>
    <SettingRow flow="no-wrap" label="$Font color">
      <ThemeColorPicker value={propValue?.color as any} onChange={(value) => handleChange('color', value)}/>
    </SettingRow>
  </div>;
}