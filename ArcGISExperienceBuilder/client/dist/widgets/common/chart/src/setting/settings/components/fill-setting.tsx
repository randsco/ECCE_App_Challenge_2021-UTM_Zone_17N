import { React, lodash, ReactRedux, IMState } from 'jimu-core';
import { ISimpleFillSymbol } from '@esri/arcgis-rest-types';
import { SettingRow } from 'jimu-ui/advanced/setting-components';
import { ChartLineSetting, getDefaultLine } from './line-setting';
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker';

export interface ChartFillSettingProps {
  value: ISimpleFillSymbol;
  onChange: (value: ISimpleFillSymbol) => void;
}

const DefaultValue = {
  type: 'esriSFS',
  style: 'esriSFSSolid',
  color: 'var(--primary)' as any,
  outline: getDefaultLine()
} as ISimpleFillSymbol;

export const getDefaultFill= () => DefaultValue;

export const ChartFillSetting = (props: ChartFillSettingProps) => {
  const {value: propValue = DefaultValue, onChange } = props;
  const appTheme = ReactRedux.useSelector((state: IMState) => state.appStateInBuilder.theme);

  const color = propValue?.color as unknown as string;
  const outline = propValue?.outline;

  const handleChange = (key: string, value: any) => {
   onChange?.(lodash.assign(DefaultValue, value, {[key]: value}));
  }

  return <div className="chart-fill-setting w-100">
    <SettingRow flow="no-wrap" label="$Fill">
      <ThemeColorPicker specificTheme={appTheme} className="item" onChange={(value) => handleChange('color', value)} value={color} />
    </SettingRow>
    <SettingRow flow="wrap" label="$Outline">
      <ChartLineSetting value={outline} onChange={(value) => handleChange('outline', value)}></ChartLineSetting>
    </SettingRow>
  </div>;
}