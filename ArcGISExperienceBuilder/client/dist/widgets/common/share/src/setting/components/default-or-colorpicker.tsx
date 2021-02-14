import { React, ThemeVariables } from 'jimu-core';
import { Select } from 'jimu-ui'
import { ColorPicker } from 'jimu-ui/basic/color-picker';

interface State {
  color: string;
  selectorVal: string;
}

export enum SelectorOptions {
  DEFAULT = 'default',
  CUSTOMIZE = 'customize'
}

export interface DefaultOrColorpickerProps {
  color: string;
  theme: ThemeVariables;

  onClick: ((IconRadius) => void);
  onColorChange: ((string) => void);
}

export class DefaultOrColorpicker extends React.PureComponent<DefaultOrColorpickerProps, State>{
  constructor(props) {
    super(props);
  }

  _isDefaultColor = (color) => {
    if ('' === color || SelectorOptions.DEFAULT === color) {
      return true;
    } else {
      return false;
    }
  }

  componentWillMount = () => {
    let c;
    if (this._isDefaultColor(this.props.color)) {
      c = '';
    } else {
      c = this.props.color;
    }
    this.setState({ color: c });

    const selectorVal = ('' === c) ? SelectorOptions.DEFAULT : SelectorOptions.CUSTOMIZE;
    this.setState({ selectorVal: selectorVal });
  }

  _isDefault = () => {
    return (this.state.color === '');
  }

  onSelectorChange = (e) => {
    let selectorVal = e.target.value;
    if (selectorVal === SelectorOptions.DEFAULT) {
      selectorVal = '';
    }

    this.setState({ selectorVal: selectorVal })

    if (this._isDefaultColor(selectorVal)) {
      this.onChange(selectorVal);
    } else {
      this.onChange(null); //color val
    }
  }

  onColorChange = (color) => {
    this.setState({ color: color });
    this.onChange(color);
  }

  onChange = (val) => {
    if (val !== null) {
      this.props.onColorChange(val);
    } else {
      this.props.onColorChange(this.state.color);
    }
  }

  _getColorPickerDisplay = () => {
    if (this._isDefaultColor(this.state.selectorVal)) {
      return 'none';
    } else {
      return 'flex';
    }
  }

  render() {
    return <div className="d-flex align-items-end flex-column">
      <Select value={this.state.selectorVal} onChange={this.onSelectorChange}>
        <option value={SelectorOptions.DEFAULT}>{'Default'}</option>
        <option value={SelectorOptions.CUSTOMIZE}>{'Customize'}</option>
      </Select>

      <div style={{ display: this._getColorPickerDisplay() }}>
        <ColorPicker className="d-flex" color={this.state.color} onChange={this.onColorChange} />
      </div>
    </div>
  }
}