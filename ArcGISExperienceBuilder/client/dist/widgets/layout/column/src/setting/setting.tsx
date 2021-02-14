/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { Sides, LinearUnit, Select, Switch } from 'jimu-ui';
import { utils } from 'jimu-layouts/layout-runtime';
import { IMFlexboxConfig } from '../config';
import { defaultConfig } from '../default-config';
import { FourSides, InputUnit } from 'jimu-ui/advanced/style-setting-components';
import defaultMessages from './translations/default';

const marginSides = [Sides.T, Sides.R, Sides.B, Sides.L];
const inputStyle = { width: 110 };

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMFlexboxConfig>>{
  updateSpace = (value: LinearUnit) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('space', value),
    });

    const appConfigAction = getAppConfigAction();
    this.getLayoutIds().forEach(layoutId => {
      appConfigAction.editLayoutSetting({ layoutId }, { space: value.distance });
    });
    appConfigAction.exec();
  }

  updatePadding = (value) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'padding'], value),
    });

    const appConfigAction = getAppConfigAction();
    this.getLayoutIds().forEach(layoutId => {
      appConfigAction.editLayoutSetting({ layoutId }, { padding: value });
    });
    appConfigAction.exec();
  }

  updateJustifyContent = (e) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'justifyContent'], e.target.value),
    });

    const appConfigAction = getAppConfigAction();
    this.getLayoutIds().forEach(layoutId => {
      appConfigAction.editLayoutSetting({ layoutId }, { justifyContent: e.target.value });
    });
    appConfigAction.exec();
  }

  updateScrollable = (e) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'overflowY'], e.target.checked),
    });
    const appConfigAction = getAppConfigAction();
    this.getLayoutIds().forEach(layoutId => {
      appConfigAction.editLayoutSetting({ layoutId }, { overflowY: e.target.checked });
    });
    appConfigAction.exec();
  }

  getLayoutIds(): string[] {
    const result = [];

    const { layouts } = this.props;
    if (layouts) {
      const layoutName = Object.keys(layouts)[0];
      const sizemodeLayouts = layouts[layoutName];
      Object.keys(sizemodeLayouts).forEach(sizemode => {
        result.push(sizemodeLayouts[sizemode]);
      });
    }
    return result;
  }

  getLayoutSetting() {
    const { layouts } = this.props;
    if (layouts) {
      const layoutName = Object.keys(layouts)[0];
      const sizemodeLayouts = layouts[layoutName];
      const layoutId = sizemodeLayouts[utils.getCurrentSizeMode()];
      const appConfigAction = getAppConfigAction();
      return appConfigAction.appConfig.layouts[layoutId]?.setting;
    }
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({ id, defaultMessage: defaultMessages[id] });
  }

  render() {
    const layoutSetting = this.getLayoutSetting();

    return (
      <div className="flexbox-layout-setting">
        <SettingSection title={this.formatMessage('layout')}>
          <SettingRow label={this.formatMessage('verticalAlign')}>
            <Select value={layoutSetting?.justifyContent ?? 'flex-start'} onChange={this.updateJustifyContent} style={inputStyle}>
              <option value="flex-start">{this.formatMessage('start')}</option>
              <option value="flex-end">{this.formatMessage('end')}</option>
              <option value="center">{this.formatMessage('center')}</option>
              <option value="space-around">{this.formatMessage('spaceAround')}</option>
              <option value="space-between">{this.formatMessage('spaceBetween')}</option>
              <option value="space-evenly">{this.formatMessage('spaceEvenly')}</option>
            </Select>
          </SettingRow>
          <SettingRow label={this.formatMessage('scrollable')}>
            <Switch checked={(layoutSetting?.overflowY ?? 'auto') === 'auto'} onChange={this.updateScrollable}></Switch>
          </SettingRow>
          <SettingRow label={this.formatMessage('gap')}>
            <InputUnit value={{distance: layoutSetting?.space >= 0 ? layoutSetting.space : defaultConfig.space, unit: undefined}} min={0}
              onChange={this.updateSpace} style={inputStyle}>
            </InputUnit>
          </SettingRow>
          <SettingRow label={this.formatMessage('padding')} flow="wrap">
            <FourSides showTip={true} sides={marginSides} value={layoutSetting?.padding as any}
              onChange={this.updatePadding}></FourSides>
          </SettingRow>
        </SettingSection>
      </div>
    );
  }
}
