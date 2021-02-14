/** @jsx jsx */
import { React, css, jsx, IMThemeVariables, polished } from 'jimu-core';
import { PointStyle } from '../../config'
export interface Props {
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  theme: IMThemeVariables;
  pointStyle: PointStyle;
  intl: (key: string) => string;
}

interface State {
  value: number
}

const STEP = 1;
const MIN  = 0;
const MAX  = 100;
const AMOUNT = MAX/STEP - 1;
const MINRATIO = 3;
const MAXRATIO = 5;
export class RangeInput extends React.PureComponent<Props, State> {

  updateConfigTimeout: any;
  constructor(props) {
    super(props);
    this.state = {
      value: props?.value || 0
    }
  }

  componentWillUnmount(){
    clearTimeout(this.updateConfigTimeout);
  }

  getStyle = () => {
    const { theme } = this.props;
    return css`
      & {
        width: ${polished.rem(84)};
        margin-left: ${polished.rem(8)};
      }
      .point {
        position: absolute;
        border-radius: 50%;
        background: ${theme?.colors?.palette?.primary[500]};
        background: ${theme?.colors?.palette?.light[800]};
        top: 50%;
      }
      .start-point {
        left: 0;
        width: ${polished.rem(6)};
        height: ${polished.rem(6)};
        transform: translateY(-3px);
      }
      .end-point {
        right: 0;
        width: ${polished.rem(10)};
        height: ${polished.rem(10)};
        transform: translateY(-5px);
      }
      .scale-con {
        &{
          width: 100%;
          top: ${polished.rem(-2)};
        }
        span {
          height: ${polished.rem(3)};
          width: 1px;
          background: ${theme?.colors?.palette?.light[800]};
        }
      }
      input[type='range'] {
        -webkit-appearance: none;
        background: transparent;
        position: relative;
        z-index: 10;
        width: 100%;
        display: block;
      }
      input[type='range']:focus {
        outline: none;
      }
      input[type='range']::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: ${theme?.colors?.palette?.light[800]};
        border-radius: 2px;
      }
      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: ${polished.rem(10)};
        width: ${polished.rem(10)};
        cursor: pointer;
        background: ${theme?.colors?.palette?.light[300]};
        border: 2px solid ${theme?.colors?.palette?.dark[600]};
        border-radius: 50%;
        margin-top: ${polished.rem(-4)};
        position: relative;
        &:hover {
          border-color: var(--black);
        }

      }
      input[type='range']:focus::-webkit-slider-runnable-track {
        background: ${theme?.colors?.palette?.light[800]};
      }
      input[type='range']::-moz-range-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: ${theme?.colors?.palette?.light[800]};
        border-radius: 2px;
      }
      input[type='range']::-moz-range-thumb {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        cursor: pointer;
        background: ${theme?.colors?.palette?.light[300]};
        border: 2px solid ${theme?.colors?.palette?.dark[600]};
        margin-top: ${polished.rem(-4)};
        position: relative;
        &:hover {
          border-color: var(--black);
        }
      }
      input[type='range']::-ms-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: ${theme?.colors?.palette?.light[800]};
        border-radius: 2px;
      }
      input[type='range']::-ms-thumb {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        cursor: pointer;
        background: ${theme?.colors?.palette?.light[300]};
        border: 2px solid ${theme?.colors?.palette?.dark[600]};
        margin-top: 0px;
        &:hover {
          border-color: ${theme?.colors?.black};
        }
      }
      input:disabled::-webkit-slider-thumb {
        border-color: ${theme?.colors?.palette?.light[800]};
        &:hover {
          border-color: ${theme?.colors?.palette?.light[800]};
        }
      }
      input:disabled::-ms-thumb {
        border-color: ${theme?.colors?.palette?.light[800]};
        &:hover {
          border-color: ${theme?.colors?.palette?.light[800]};
        }
      }
      input:disabled::-moz-range-thumb {
        border-color: ${theme?.colors?.palette?.light[800]};
        &:hover {
          border-color: ${theme?.colors?.palette?.light[800]};
        }
      }
    `
  }

  getScale = () => {
    const scaleData = [];
    for (let i = 0; i < AMOUNT; i++) {
      scaleData.push(<span className="position-absolute" key={i} style={{left:`${(i + 1)*STEP}%`}}></span>)
    }
    return (
      <div className="scale-con position-absolute left-0 right-0">
        {scaleData}
      </div>
    )
  }

  onChange = (e) => {
    const value = e.target.value/100;
    const pointSize = value * (MAXRATIO - MINRATIO) + MINRATIO;
    this.setState({
      value: pointSize
    });
    clearTimeout(this.updateConfigTimeout);
    this.updateConfigTimeout = setTimeout(() => {
      this?.props?.onChange(pointSize);
    }, 100)
  }

  getRangeValue = () => {
    const { value } = this.state;
    return (value - MINRATIO)*100/(MAXRATIO - MINRATIO);
  }

  render() {
    const { pointStyle, intl } = this.props
    const rangeValue = this.getRangeValue();
    return (
      <div className="range-input position-relative" css={this.getStyle()} >
        {/* {this.getScale()} */}
        <div className="start-point point"></div>
        <input type="range" title={intl('dividerSize')} disabled={pointStyle == PointStyle.None} value={rangeValue} step={STEP} min={MIN} max={MAX} onChange={e => {this.onChange(e)}}/>
        <div className="end-point point"></div>
      </div>
    );
  }
}

