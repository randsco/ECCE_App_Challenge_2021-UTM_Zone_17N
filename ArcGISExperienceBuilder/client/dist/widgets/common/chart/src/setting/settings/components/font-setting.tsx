import { React, lodash } from 'jimu-core';
import { FontFamilyValue } from 'jimu-ui';
import { IFont } from '@esri/arcgis-rest-types';
import { FontFamily } from 'jimu-ui/advanced/rich-text-editor';
import { InputUnit, FontStyle, FontStyles } from 'jimu-ui/advanced/style-setting-components';
import { SettingRow } from 'jimu-ui/advanced/setting-components';

const FontStyleTypes = ['bold' , 'italic' , 'underline'] as FontStyles[];

export interface ChartFontSettingProps {
  value: IFont;
  onChange: (value: IFont) => void;
}

const DefaultValue = {
  family: 'Arial',
  size: 14,
  style: 'normal',
  weight: 'normal',
  decoration: 'none'
} as IFont;

export const getDefaultFont= () => DefaultValue;

export const ChartFontSetting = (props: ChartFontSettingProps) => {
  const {value: propValue = DefaultValue, onChange } = props;

  const family = propValue.family as FontFamilyValue;
  const size = `${propValue.size?? 14}px`;
  const bold = propValue?.weight === 'bold';
  const italic = propValue?.style === 'italic';
  const underline = propValue?.decoration === 'underline';

  const handleChange = (key: string, value: any) => {
   onChange?.(lodash.assign(DefaultValue, value, {[key]: value}))
  }

  const handleFontStyleChange = (key: string, value: boolean) => {
    let widget = propValue?.weight;
    let style = propValue?.style;
    let decoration = propValue?.decoration;
    if(key === 'bold' && value) {
      widget = 'bold';
    }
    if(key === 'italic' && value) {
      style = 'italic';
    }
    if(key === 'underline' && value) {
      decoration = 'underline';
    }
    onChange?.(lodash.assign({}, value, {widget, style, decoration}));
  }

  return <div className="chart-font-setting w-100">
    <SettingRow flow="no-wrap" label="$Font">
      <FontFamily className="w-50" font={family} onChange={(value) => handleChange('family', value)}></FontFamily>
    </SettingRow>
    <SettingRow flow="no-wrap" label="$Size">
      <InputUnit value={size} onChange={(value) => handleChange('size', value.distance)}></InputUnit>
    </SettingRow>
    <SettingRow flow="no-wrap" label="$Style">
      <FontStyle
        onChange={handleFontStyleChange}
        types={FontStyleTypes}
        bold={bold}
        italic={italic}
        underline={underline} ></FontStyle>
    </SettingRow>
  </div>;
}