/** @jsx jsx */
import {React, jsx, IntlShape, IMIconProps, Immutable, ThemeVariables} from 'jimu-core';
import {UnitTypes, LinearUnit} from 'jimu-ui';
import {InputUnit} from 'jimu-ui/advanced/style-setting-components';
import {ThemeColorPicker} from 'jimu-ui/basic/color-picker';
interface Props{
  iconProps: IMIconProps;
  intl: IntlShape;
  appTheme: ThemeVariables;
  onChange: (iconProps: IMIconProps) => void;
}

export default class IconStyleSetting extends React.PureComponent<Props> {
  units = [UnitTypes.PIXEL];

  onSizeChange = (size: LinearUnit) => {
    this.changeIcon('size', size.distance);
  }

  onColorChange = (color: string) => {
    this.changeIcon('color', color);
  }

  changeIcon = (k: string, v: any) => {
    const properties: IMIconProps = this.props.iconProps ? this.props.iconProps.set(k, v) : (Immutable({[k]: v}) as IMIconProps);
    this.props.onChange(properties);
  }

  render() {
    const properties = this.props.iconProps || ({} as IMIconProps);

    return (
      <div className="w-100 d-flex justify-content-between icon-size-font-style-setting">
        <div>
          <InputUnit units={this.units} value={{distance: properties.size, unit: UnitTypes.PIXEL}} onChange={this.onSizeChange}/>
        </div>
        <div>
          <ThemeColorPicker specificTheme={this.props.appTheme} value={properties.color} onChange={this.onColorChange}/>
        </div>
      </div>
    );
  }
}
