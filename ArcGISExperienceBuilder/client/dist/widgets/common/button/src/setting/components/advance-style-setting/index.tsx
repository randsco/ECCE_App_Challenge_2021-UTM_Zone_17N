/** @jsx jsx */
import {React, jsx, IntlShape, IMIconProps, Immutable, defaultMessages as jimuCoreMessages, ImmutableObject, ThemeVariables} from 'jimu-core';
import {SettingRow} from 'jimu-ui/advanced/setting-components';
import {StyleSettings, TextFontStyle, defaultMessages as jimuUiMessages } from 'jimu-ui';

import {IMAdvanceStyleSettings} from '../../../config';

import CommonStyleSetting from './components/common-style-setting';
import IconStyleSetting from './components/icon-style-setting';
import FontStyleSetting from './components/font-style-setting';

interface Props{
  onChange: (style: IMAdvanceStyleSettings) => void;
  style: IMAdvanceStyleSettings;
  themeStyle: IMAdvanceStyleSettings;
  intl: IntlShape;
  appTheme: ThemeVariables;
  isTextSettingOpen: boolean;
  isIconSettingOpen: boolean;
}

export default class AdvanceStyleSetting extends React.PureComponent<Props> {

  onTextChange = (text: TextFontStyle) => {
    const mergedStyle = this.getStyleFromCustomAndTheme();
    const style = mergedStyle.set('text', text);
    this.props.onChange(style);
  }

  onIconChange = (iconProps: IMIconProps) => {
    const mergedStyle = this.getStyleFromCustomAndTheme();
    const style = mergedStyle.set('iconProps', iconProps);
    this.props.onChange(style);
  }

  onCommonChange = (commonStyle: ImmutableObject<StyleSettings>) => {
    const mergedStyle = this.getStyleFromCustomAndTheme();
    const style = {...mergedStyle, ...commonStyle};
    this.props.onChange(Immutable(style));
  }

  getStyleFromCustomAndTheme = (): IMAdvanceStyleSettings => {
    const themeStyle = this.props.themeStyle || Immutable({});
    const customStyle = this.props.style || Immutable({});
    return themeStyle.merge(customStyle);
  }

  render() {
    const style = this.getStyleFromCustomAndTheme();

    return (
      <div className="advance-style-setting mt-3">
        {
          this.props.isTextSettingOpen && <div className="mb-3">
            <SettingRow label={this.props.intl.formatMessage({id: 'text', defaultMessage: jimuUiMessages.text})} />
            <SettingRow>
              <FontStyleSetting appTheme={this.props.appTheme} text={style.text} onChange={this.onTextChange} />
            </SettingRow>
          </div>
        }
        {
          this.props.isIconSettingOpen && <div className="mb-3">
            <SettingRow label={this.props.intl.formatMessage({id: 'icon', defaultMessage: jimuCoreMessages.icon})} />
            <SettingRow>
              <IconStyleSetting appTheme={this.props.appTheme} intl={this.props.intl} iconProps={style.iconProps} onChange={this.onIconChange} />
            </SettingRow>
          </div>
        }
        <div className="mb-3">
          <CommonStyleSetting intl={this.props.intl} style={style as ImmutableObject<StyleSettings>} onChange={this.onCommonChange} />
        </div>
      </div>
    );
  }
}
