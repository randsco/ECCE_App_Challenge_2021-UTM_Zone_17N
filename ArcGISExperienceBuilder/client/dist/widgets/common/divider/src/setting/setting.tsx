/** @jsx jsx */
import { React, classNames, ThemeVariables, css, jsx, IMThemeVariables, IMState, ReactRedux, polished } from 'jimu-core';
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder';
import { SettingSection, SettingRow, DirectionSelector } from 'jimu-ui/advanced/setting-components';
import { InputUnit } from 'jimu-ui/advanced/style-setting-components';
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker';
import { defaultMessages as jimuUIDefaultMessages, UnitTypes, LinearUnit } from 'jimu-ui';
import { IMConfig, Direction, LineStyle, PointStyle, QuickStyleType } from '../config';
import defaultMessages from './translations/default';
import { RangeInput } from './components/range-input';
import { PointStyleSelector } from './components/point-select';
import { LineStyleSelector } from './components/line-select';

const prefix = 'jimu-widget-';

interface State {
  isLinkSettingShown: boolean;
  isAdvance: boolean;
}

interface CustomeProps {
  theme: IMThemeVariables;
}

interface ExtraProps {
  appTheme: IMThemeVariables;
}

class _Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & CustomeProps & ExtraProps, State> {
  units = [UnitTypes.PIXEL];

  constructor(props) {
    super(props);
    this.state = {
      isLinkSettingShown: false,
      isAdvance: false,
    };
  }

  getStyle = (theme: ThemeVariables) => {
    return css`
      .padding-top-0 {
        padding-top: 0;
      }
      .unit-width {
        width: ${polished.rem(60)};
        min-width: ${polished.rem(60)};
      }
      .start-end-point .jimu-widget-setting--section-header h6{
        font-size: ${polished.rem(13)};
        color: ${theme?.colors?.palette?.dark[400]}
      }
    `
  }

  onSettingChange = (key: string | string[], value: any) => {
    let config = this.props.config;
    if (Array.isArray(key)) {
      config = config.setIn(key, value);
    } else {
      config = config.set(key, value);
    }
    if(config.themeStyle.quickStyleType != QuickStyleType.None){
      config = config.setIn(['themeStyle', 'quickStyleType'], QuickStyleType.None)
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
  }

  onRadioChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, value: any) => {
    const checked = e.currentTarget.checked;
    if (!checked) {
      return;
    }
    this.onSettingChange(key, value);
    getAppConfigAction().exchangeWidthAndHeight().exec();
  }

  onDirectionChange = (vertical?: boolean) => {
    const newDirection = vertical ? Direction.Vertical : Direction.Horizontal;
    const { direction } = this.props.config;
    if(newDirection == direction){
      return false;
    }
    this.onSettingChange('direction', newDirection);
    getAppConfigAction().exchangeWidthAndHeight().exec();
  }

  translate = (id: string, jimu?: boolean, values?: any) => {
    const message = jimu ? jimuUIDefaultMessages : defaultMessages;
    return this.props.intl.formatMessage({ id: id, defaultMessage: message[id] }, values)
  }

  onDividerLineStyleChange = (key, value) => {
    this.onSettingChange(['dividerStyle', key], value);
  }

  onLineStyleChange = (value: LineStyle) => {
    if(value == this?.props?.config?.strokeStyle?.type){
      return false;
    }
    this.onSettingChange(['strokeStyle', 'type'], value);
  }

  onStrokeSizeChange = (value: LinearUnit) => {
    const size = `${value.distance}${value.unit}`
    if(size == this?.props?.config?.strokeStyle?.size){
      return false
    }
    this.onSettingChange(['strokeStyle', 'size'], size);
  }

  onColorChange = (value: string) => {
    if(value == this?.props?.config?.strokeStyle?.color){
      return false
    }
    this.onSettingChange(['strokeStyle', 'color'], value);
  }

  onPointStyleChange = (key: string, value: PointStyle) => {
    const prePointStyle = this?.props?.config[key]?.pointStyle;
    if(value == prePointStyle) return false;
    this.onSettingChange([key, 'pointStyle'], value);
  }

  onPointSizeChange = (key: string, value: number) => {
    const prePointStyle = this?.props?.config[key]?.pointSize;
    if(value == prePointStyle) return false;
    this.onSettingChange([key, 'pointSize'], value);
  }

  render() {
    const { config, theme, appTheme, intl } = this.props;
    const { direction, strokeStyle, pointEnd, pointStart } = config;
    return (
      <div className={classNames(`${prefix}card-setting`, `${prefix}setting`)} css={this.getStyle(this.props.theme)} >
        <SettingSection >
          <SettingRow label={this.translate('direction', true)}>
            <DirectionSelector vertical={direction == Direction.Vertical} onChange={this.onDirectionChange}></DirectionSelector>
          </SettingRow>

        </SettingSection>

        <SettingSection title={this.translate('style', true)} className="border-bottom-0">
          <SettingRow label={this.translate('color')}>
            <ThemeColorPicker value={strokeStyle?.color} specificTheme={appTheme} onChange={this.onColorChange}></ThemeColorPicker>
          </SettingRow>
          <SettingRow label={this.translate('stroke')}>
            <LineStyleSelector intl={intl} value={strokeStyle?.type || null} onChange={this.onLineStyleChange} className="mr-2"/>
            <div className="unit-width">
              <InputUnit units={this.units} value={strokeStyle?.size} onChange={this.onStrokeSizeChange} className="item" />
            </div>
          </SettingRow>
        </SettingSection>

        <SettingSection  className="pt-0 start-end-point">

          {/*<SettingRow label={this.translate('startpoints')}>
              <div className="d-flex align-items-center">
                <PointStyleSelector intl={intl} value={pointStart?.pointStyle} isPointStart={true} onChange={(value: PointStyle) => {this.onPointStyleChange('pointStart', value)}} />
              </div>
            </SettingRow>
            {(pointStart?.pointStyle !== PointStyle.None) && <SettingRow label={this.translate('dividerSize')}>
              <RangeInput theme={theme} pointStyle={pointStart?.pointStyle} value={pointStart?.pointSize} onChange={value => {this.onPointSizeChange('pointStart', value)}}/>
            </SettingRow>}

            <SettingRow label={this.translate('endpoints')} >
              <PointStyleSelector intl={intl} value={pointEnd?.pointStyle} isPointStart={false} onChange={(value: PointStyle) => {this.onPointStyleChange('pointEnd', value)}}  />
            </SettingRow>
            {(pointEnd?.pointStyle !== PointStyle.None) && <SettingRow label={this.translate('dividerSize')} >
              <RangeInput theme={theme} pointStyle={pointEnd?.pointStyle} value={pointEnd?.pointSize} onChange={value => {this.onPointSizeChange('pointEnd', value)}}/>
            </SettingRow>} */}

          <SettingRow label={this.translate('startpoints')}>
            <div className="d-flex align-items-center">
              <PointStyleSelector intl={intl} value={pointStart?.pointStyle} isPointStart={true} onChange={(value: PointStyle) => {this.onPointStyleChange('pointStart', value)}} />
              {(pointStart?.pointStyle !== PointStyle.None) &&
                <RangeInput
                  theme={theme}
                  pointStyle={pointStart?.pointStyle}
                  value={pointStart?.pointSize}
                  intl={this.translate}
                  onChange={value => {this.onPointSizeChange('pointStart', value)}}/>}
            </div>
          </SettingRow>

          <SettingRow label={this.translate('endpoints')} >
            <div className="d-flex align-items-center">
              <PointStyleSelector intl={intl} value={pointEnd?.pointStyle} isPointStart={false} onChange={(value: PointStyle) => {this.onPointStyleChange('pointEnd', value)}}  />
              {(pointEnd?.pointStyle !== PointStyle.None) &&
                <RangeInput
                  theme={theme}
                  pointStyle={pointEnd?.pointStyle}
                  value={pointEnd?.pointSize}
                  intl={this.translate}
                  onChange={value => {this.onPointSizeChange('pointEnd', value)}}/>}
            </div>
          </SettingRow>

        </SettingSection>

      </div>);
  }
}

const mapStateToProps = (state: IMState, props: CustomeProps) => {
  return {
    appTheme: state.appStateInBuilder.theme
  }
}
export default ReactRedux.connect<ExtraProps, unknown, CustomeProps>(mapStateToProps)(_Setting);