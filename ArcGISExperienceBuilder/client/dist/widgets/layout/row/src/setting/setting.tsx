/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { IMRowConfig } from '../config';
import { Sides, LinearUnit, utils } from 'jimu-ui';
import { defaultConfig } from '../default-config';
import defaultMessages from './translations/default';
import { FourSides, InputUnit } from 'jimu-ui/advanced/style-setting-components';

const marginSides = [Sides.T, Sides.R, Sides.B, Sides.L];

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMRowConfig>>{
  updateSpace = (value: LinearUnit) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('space', value.distance)
    });
  }

  updatePadding = (value) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'padding'], value)
    });
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({ id, defaultMessage: defaultMessages[id] });
  }

  render() {
    const config = this.props.config;
    const style = config.style || defaultConfig.style;
    const space = config.space >= 0 ? config.space : defaultConfig.space;

    return (
      <div className="row-layout-setting">
        <SettingSection title={this.formatMessage('layout')}>
          <SettingRow label={this.formatMessage('gap')}>
            <InputUnit value={utils.stringOfLinearUnit(space)} min={0} onChange={this.updateSpace} style={{width: 110}}>
            </InputUnit>
          </SettingRow>
          <SettingRow label={this.formatMessage('padding')} flow="wrap">
            <FourSides showTip={true} sides={marginSides} value={style.padding as any}
              onChange={this.updatePadding}></FourSides>
          </SettingRow>
        </SettingSection>
      </div>
    );
  }
}