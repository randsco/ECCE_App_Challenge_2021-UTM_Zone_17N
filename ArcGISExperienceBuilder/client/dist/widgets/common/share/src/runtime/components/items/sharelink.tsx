/** @jsx jsx */
import { jsx, css, SerializedStyles } from 'jimu-core';
import { Button, defaultMessages } from 'jimu-ui';
import { Label, TextInput, Checkbox } from 'jimu-ui';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import BaseItem, { ShownMode, ExpandType, BaseItemConstraint } from './base-item';
import nls from '../../translations/default';
import { ItemsName } from '../../../config';
import { ItemBtn, IconImages } from './subcomps/item-btn';

//shortLink
import ShortLink from '../short-link';

const IconImage: IconImages = {
  default: require('./assets/icons/default/sharelink.svg'),
  white: require('./assets/icons/white/sharelink.svg'),
  black: require('./assets/icons/black/sharelink.svg')
}

export interface ShareLinkConstraint extends BaseItemConstraint {
  longUrl: string;
  onShortUrlChange: ((shortUrl: string) => void);
  onLongUrlChange: ((longUrl: string) => void);
  updateUrl: (() => string) | (() => void);

  onCopy?: ((text: string, result: boolean) => void)
}
interface State {
  url: string;
  //copied?: false;
  isShortLink: boolean;
}

export class ShareLink extends BaseItem<ShareLinkConstraint, State>{
  constructor(props) {
    super(props);
    //this.init(ItemsName.Sharelink, '#35465C', ExpandType.ShowInPopup);
    this.state = {
      url: this.props.url || '',
      isShortLink: !(this.props.url === this.props.longUrl)
    }
  }

  // componentDidMount() {
  //   this.setState({ isShortLink: true });
  //   var urlObj = this.props.updateUrl();
  //   ShortLink.fetchShortLink(urlObj.location).then((shortUrl) => {
  //     this.setState({ url: shortUrl });
  //     this.props.onShortUrlChange(shortUrl);
  //   }, (longUrl) => {
  //     this.setState({ isShortLink: false });
  //   })
  // }

  onClickCopy = (/*{ target: { innerHTML } }*/) => {
  }
  onCopy = (text, result) => {
    if(this.props && this.props.onCopy) {
      this.props.onCopy(text, result);
    }
  }

  onShortUrlChange = (e) => {
    const url = e.target.value;
    this.setState({ url: url/*, copied: false */ });
    this.props.onShortUrlChange(url);
  }

  onClick = (ref) => {
    this.props.onItemClick(ItemsName.Sharelink, ref, ExpandType.ShowInPopup, false);
  }

  toggleShortLink = (isChecked) => {
    let href = '';
    const res = this.props.updateUrl();
    if (res) {
      href = res;
    }
    //console.log('is ShortLink click==>' + isChecked);
    this.setState({ isShortLink: isChecked });

    if (isChecked) {
      ShortLink.fetchShortLink(href).then((shortUrl) => {
        this.setState({ url: shortUrl });
        this.props.onShortUrlChange(shortUrl);
      }, (longUrl) => {
        this.setState({ isShortLink: false });
      })
    } else {
      this.setState({ url: href });
      this.props.onLongUrlChange(href);//let other's itme use longURL
    }
  }

  getStyle = (): SerializedStyles => {
    return css`
      .copy-btn-wapper {
        margin-bottom: 1rem;
      }

      .share-url-input {
        margin: 10px 0 18px 0;
      }
      .short-link-label {
        margin: 0 0.5rem;
      }
    `;
  }

  render() {
    let content = null;

    const { shownMode } = this.props;

    const titleNls = this.props.intl.formatMessage({ id: ItemsName.Sharelink, defaultMessage: defaultMessages.sharelink });
    const shortLinkNls = this.props.intl.formatMessage({ id: 'shortLink', defaultMessage: nls.shortLink });
    const copyNls = this.props.intl.formatMessage({ id: 'copy', defaultMessage: nls.copyString });

    if (shownMode !== ShownMode.Btn) {
      content = <div css={this.getStyle()}>
        <TextInput name="text" id="sharelinkText" className="share-url-input" value={this.state.url} onChange={this.onShortUrlChange} />

        <div className="d-flex justify-content-between copy-btn-wapper">
          <div className="d-flex align-items-center">
            <Checkbox id="share-link-shortlink" checked={this.state.isShortLink} onChange={evt => this.toggleShortLink(evt.target.checked)} />
            <Label className="short-link-label" for="share-link-shortlink">{shortLinkNls}</Label>
          </div>
          <div>
            <CopyToClipboard onCopy={this.onCopy} text={this.state.url} options={{format:'text/plain'}} data-testid="copy-btn">
              <Button type="secondary" size="sm">{copyNls}</Button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    } else {
      content = <div css={this.getStyle()}>
        <ItemBtn
          name={ItemsName.Sharelink}
          intl={this.props.intl}
          nls={titleNls}
          iconImages={IconImage}
          attr={this.props}

          onClick={this.onClick}
        ></ItemBtn>
      </div>
    }

    return content;
  }
}