/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core';
import { getStyle, getPlayPanelWapperClass, getFunctionalBtnsClass } from './style';

interface LayoutProps {
  flyStyleContent: React.ReactElement,
  drawBtn: React.ReactElement,
  pickBtn: React.ReactElement,
  clearBtn: React.ReactElement,
  liveviewSettingContent: React.ReactElement,
  playStateContent: React.ReactElement,
  progressBar: React.ReactElement,
  speedController: React.ReactElement,

  isPlaying: boolean,
  theme: ThemeVariables
}

export default class PaletteLayout extends React.PureComponent<LayoutProps>{
  render() {
    return <div css={getStyle(this.props.theme)} className="fly-wapper d-flex">
      <div className="palette-wapper">
        <div className={'progress-bar-wapper ' + getPlayPanelWapperClass(this.props.isPlaying)}>
          {this.props.progressBar}
        </div>

        <div className={getFunctionalBtnsClass(this.props.isPlaying)}>
          {this.props.flyStyleContent}
          {this.props.drawBtn}
          {this.props.pickBtn}
          {this.props.clearBtn}
          {this.props.liveviewSettingContent}
        </div>

        {this.props.playStateContent}

        <div className={getPlayPanelWapperClass(this.props.isPlaying)}>
          {this.props.speedController}
        </div>
      </div>
    </div>
  }
}