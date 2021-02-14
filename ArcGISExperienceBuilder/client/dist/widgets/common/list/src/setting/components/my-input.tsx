import { React, classNames } from 'jimu-core';
import { NumericInput } from 'jimu-ui';

interface Props {
  value?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  onAcceptValue?: (value: number) => void;
  className?: string;
  style?: any;
  title?: string;
}

interface State {
  value?: number
}

export class MyNumericInput extends React.PureComponent<Props, State> {

  constructor(props){
    super(props);

    this.state = {
      value: props.value
    }
  }

  componentDidUpdate(preProps){
    if(this.props.value !== preProps.value){
      const {value} = this.props;
      this.setState({
        value: value
      })
    }
  }

  onTextInputChange = () => {
    this.props.onAcceptValue(this.state.value);
  }

  render(){
    const { min, max, className, style, disabled, title } = this.props;
    return (
      <NumericInput
        className={classNames(className, 'my-input')}
        value={this.state.value}
        min={min} max={max}
        title={title}
        style={style}
        disabled={disabled}
        focusOnUpDown={true}
        onChange={value => { this.setState({ value: value}); }}
        onAcceptValue={value => this.onTextInputChange()}
      />
    )
  }
}