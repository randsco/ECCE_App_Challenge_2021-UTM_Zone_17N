/** @jsx jsx */
import { React, jsx, css, defaultMessages as jimuCoreDefaultMessages } from 'jimu-core';
import { Button, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui';
import { Label, TextInput, Select } from 'jimu-ui';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import nls from '../../translations/default';
import { BackBtn } from './subcomps/back-btn';
import BaseItem, { ShownMode, ExpandType, BaseItemConstraint, IBackable } from './base-item';
import { ItemsName } from '../../../config';
import { ItemBtn, IconImages } from './subcomps/item-btn';
import { stopPropagation } from './utils';

const IconImage: IconImages = {
  default: require('./assets/icons/default/embed.svg'),
  white: require('./assets/icons/white/embed.svg'),
  black: require('./assets/icons/black/embed.svg')
}

interface EmbedProps extends BaseItemConstraint, IBackable {
  embedSize?: string;
  onBackBtnClick: (() => void);
}
interface State {
  url: string;
  //copied?: false;
  text?: string;
  embedSize: string;

  w?: number;
  h?: number;
}

export class Embed extends BaseItem<EmbedProps, State> implements IBackable {
  name: string;
  defaultBgColor: string;
  W_H_MAP: any;
  ref: React.RefObject<any>;

  constructor(props) {
    super(props);
    //this.init(ItemsName.Embed, '#35465C', ExpandType.ShowInPopup);
    this.W_H_MAP = {
      small: { w: 300, h: 200 },
      medium: { w: 800, h: 600 },
      large: { w: 1080, h: 720 }
    }

    var size = this.props.embedSize || 'medium';
    this.state = {
      url: this.props.url || '',
      text: '',

      embedSize: size,
      w: this.W_H_MAP[size].w || this.W_H_MAP.medium.w,
      h: this.W_H_MAP[size].h || this.W_H_MAP.medium.h
    }
  }

  componentDidMount() {
    this._setEmbedCode();
  }
  componentDidUpdate(prevProps, prevState: State) {
    this._setEmbedCode();
  }

  onClickCopy = (/*{ target: { innerHTML } }*/) => {
    //console.log(`==> onClickCopy Clicked on '${innerHTML}'!`);
  }
  onCopy = () => {
    //console.log('==> onCopy');
  }

  onClick = (ref) => {
    this.props.onItemClick(ItemsName.Embed, ref, ExpandType.ShowInPopup);
  }
  onBackBtnClick = () => {
    this.props.onBackBtnClick();
  }

  _setEmbedCode = () => {
    let text = '\x3ciframe width\x3d"' + this.state.w + '" height\x3d"' + this.state.h +
      '" frameborder\x3d"0" allowfullscreen src\x3d"';// scrolling\x3d"no"
    text = text + this.props.url + '"\x3e\x3c/iframe\x3e';

    this.setState({ text: text });
  }

  onSizeChange = (e) => {
    const val = e.target.value;
    this.setState({ embedSize: val });

    const wh = this.W_H_MAP[val];
    if (wh && wh.w && wh.h) {
      this.setState({ w: wh.w, h: wh.h });
    }
  }
  onWChange = (e) => {
    const val = e.target.value;
    this.setState({ w: val });

    this.setState({ embedSize: 'custom' });
  }
  onHChange = (e) => {
    const val = e.target.value;
    this.setState({ h: val });

    this.setState({ embedSize: 'custom' });
  }

  getStyle = () => {
    return css`
      .copy-btn-wapper {
        margin: 1rem 0;
      }
      .embed-options-wapper {
        width: 80%;
      }
      .embed-option {
        width: 100px;
        margin: 0 0.5rem;
      }
      .embed-option-size {
        width: 120px;
      }
    `;
  }

  render() {
    let content = null;
    const { shownMode } = this.props;

    const embedNls = this.props.intl.formatMessage({ id: ItemsName.Embed, defaultMessage: jimuUIDefaultMessages.embed });
    const embedOptionsNls = this.props.intl.formatMessage({ id: 'embedOptions', defaultMessage: nls.embedOptions });
    const copyNls = this.props.intl.formatMessage({ id: 'copy', defaultMessage: nls.copyString });
    const smallNls = this.props.intl.formatMessage({ id: 'small', defaultMessage: jimuCoreDefaultMessages.small });
    const mediumNls = this.props.intl.formatMessage({ id: 'medium', defaultMessage: jimuCoreDefaultMessages.medium });
    const largeNls = this.props.intl.formatMessage({ id: 'large', defaultMessage: jimuCoreDefaultMessages.large });
    const customNls = this.props.intl.formatMessage({ id: 'custom', defaultMessage: jimuUIDefaultMessages.custom });

    if (shownMode !== ShownMode.Btn) {
      content = <div css={this.getStyle()}>
        <BackBtn uiMode={this.props.uiMode} onBackBtnClick={this.onBackBtnClick}></BackBtn>

        <TextInput type="textarea" name="text" id="embedlinkText" className="share-url-input" value={this.state.text} />

        <div className="d-flex justify-content-end copy-btn-wapper">
          <CopyToClipboard onCopy={this.onCopy} text={this.state.text}>
            <Button type="secondary" onClick={this.onClickCopy} size="sm">{copyNls}</Button>
          </CopyToClipboard>
        </div>

        <div>
          <Label for="embedlinkText">{embedOptionsNls}</Label>
          <div className="d-flex align-items-center embed-options-wapper">
            <Select value={this.state.embedSize} onChange={this.onSizeChange} className="flex-fill embed-option-size" onClick={stopPropagation}>
              <option value={'small'}>{smallNls}</option>
              <option value={'medium'}>{mediumNls}</option>
              <option value={'large'}>{largeNls}</option>
              <option value={'custom'}>{customNls}</option>
            </Select>

            <div className="d-flex align-items-center">
              <TextInput value={this.state.w} className="flex-fill embed-option" onChange={this.onWChange}></TextInput>
              X
              <TextInput value={this.state.h} className="flex-fill embed-option" onChange={this.onHChange}></TextInput>
            </div>
          </div>
        </div>
      </div>
    } else {
      content = <ItemBtn
        name={ItemsName.Embed}
        intl={this.props.intl}
        nls={embedNls}
        iconImages={IconImage}
        attr={this.props}

        onClick={this.onClick}
      ></ItemBtn>
    }

    return content;
  }
}