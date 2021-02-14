/** @jsx jsx */
import { React, jsx, Immutable, ThemeVariables } from 'jimu-core';
import { IMTextFontStyle, FontStyleKeys } from 'jimu-ui';
import { TextStyle, TextStyleProps } from 'jimu-ui/advanced/style-setting-components';


interface Props {
  text: IMTextFontStyle;
  appTheme: ThemeVariables;
  onChange: (text: IMTextFontStyle) => void;
}

export default class FontStyleSetting extends React.PureComponent<Props> {
  changeText = (k: Partial<FontStyleKeys>, v: any) => {
    const text = this.props.text ? this.props.text.set(k, v) : (Immutable({ [k]: v }) as IMTextFontStyle);
    this.props.onChange(text);
  }

  render() {
    return <TextStyle {...this.props.text as TextStyleProps} onChange={this.changeText} />
  }
}
