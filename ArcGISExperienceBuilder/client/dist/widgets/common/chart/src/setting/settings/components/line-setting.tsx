/** @jsx jsx */
import { lodash, css, polished, jsx, IMState, ReactRedux } from 'jimu-core';
import { ISimpleLineSymbol } from '@esri/arcgis-rest-types';
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker';
import { LineStyleSelector, InputUnit } from 'jimu-ui/advanced/style-setting-components';

export interface ChartLineProps {
  value: ISimpleLineSymbol;
  onChange: (value: ISimpleLineSymbol) => void;
}

const cssStyle =  css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  >.item {
    flex: 0 1 auto;
  }
  >.item.style-setting--line-style-selector {
    width: 40%;
  }
  >.item.style-setting--input-unit {
    width:30%;
  }
  .jimu-builder--color {
    height: ${polished.rem(26)};
  }
`;

const DefaultValue = {
  type: 'esriSLS',
  style: 'esriSLSSolid',
  color: 'var(--light-900)' as any,
  width: 2
} as ISimpleLineSymbol;

export const getDefaultLine= () => DefaultValue;

const LineStyleMap = {
  esriSLSDash: 'dashed',
  esriSLSDashDot: 'dotted',
  esriSLSDashDotDot: 'double',
  esriSLSSolid: 'solid',
  dashed: 'esriSLSDash',
  dotted: 'esriSLSDashDot',
  double: 'esriSLSDashDotDot',
  solid: 'esriSLSSolid'
}

export const ChartLineSetting = (props: ChartLineProps) => {
  const {value: propValue = DefaultValue, onChange } = props;
  const appTheme = ReactRedux.useSelector((state: IMState) => state.appStateInBuilder.theme);
  const color = propValue?.color as unknown as string;
  const style = LineStyleMap[propValue?.style ?? 'esriSLSSolid'];
  const width = `${propValue.width ?? 2}px`

  const handleChange = (key: string, value: any) => {
   onChange?.(lodash.assign(DefaultValue, propValue, {[key]: value}))
  }

  const handleStyleChange = (value) => {
    const style = LineStyleMap[value];
    onChange?.(lodash.assign({ type: 'esriSLS'}, propValue, {style: style}))
  }

  return  <div className="chart-line-setting" css={cssStyle}>
    <ThemeColorPicker specificTheme={appTheme} className="item" onChange={(value) => handleChange('color', value)} value={color}></ThemeColorPicker>
    <LineStyleSelector className="item" value={style} onChange={handleStyleChange} />
    <InputUnit className="item" value={width}
      onChange={(value) => handleChange('width', value.distance)} />
  </div>
}