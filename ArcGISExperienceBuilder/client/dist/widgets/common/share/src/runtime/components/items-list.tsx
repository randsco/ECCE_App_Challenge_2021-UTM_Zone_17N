/** @jsx jsx */
import { React, jsx, css, ThemeVariables, IntlShape } from 'jimu-core';
import { IMConfig, UiMode, InlineDirection, ItemsName } from '../../config';
//items
import { ShownMode, ExpandType } from './items/base-item';
import { ShareLink } from './items/sharelink';
import { QRCode } from './items/qr-code';
import { Facebook } from './items/facebook';
import { Twitter } from './items/twitter';
import { Email } from './items/email';
import { Embed } from './items/embed';
import { Pinterest } from './items/pinterest';
import { Linkedin } from './items/linkedin';

interface Props {
  uiMode: UiMode;
  url: string;
  longUrl?: string;
  isShowInModal: boolean;

  onShortUrlChange: ((shortUrl: string) => void);
  onLongUrlChange?: ((longUrl: string) => void);
  updateUrl?: (() => string | void);
  getAppTitle: (() => string);

  onItemClick: ((name: string, ref: React.RefObject<any>, type: ExpandType, isUpdateUrl?: boolean) => void);
  onBackBtnClick?: (() => void);

  theme: ThemeVariables;
  intl: IntlShape;
  config: IMConfig;
}

export class ItemsList extends React.PureComponent<Props>{
  constructor(props) {
    super(props);
  }

  getElementByItemId = (id: ItemsName) => {
    let itemUI = null;
    const { url, longUrl, uiMode, theme, intl, config, isShowInModal,
      onItemClick, updateUrl, onLongUrlChange, onShortUrlChange, onBackBtnClick, getAppTitle } = this.props;

    const shownMode = ShownMode.Btn;

    switch (id) {
      case ItemsName.Embed: {
        itemUI = <Embed
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={isShowInModal}
          config={config} theme={theme} intl={intl}

          onItemClick={onItemClick}
          onBackBtnClick={onBackBtnClick}
          getAppTitle={getAppTitle}
        ></Embed>
        break;
      }
      case ItemsName.QRcode: {
        itemUI = <QRCode
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={isShowInModal}
          config={config} theme={theme} intl={intl}

          onItemClick={onItemClick}
          onBackBtnClick={onBackBtnClick}
          getAppTitle={getAppTitle}
        ></QRCode>
        break;
      }
      case ItemsName.Sharelink: {
        itemUI = <ShareLink
          url={url}
          longUrl={longUrl}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={isShowInModal}
          config={config} theme={theme} intl={intl}

          onItemClick={onItemClick}
          onShortUrlChange={onShortUrlChange}
          onLongUrlChange={onLongUrlChange}
          onBackBtnClick={onBackBtnClick}
          updateUrl={updateUrl}
          getAppTitle={getAppTitle}
        ></ShareLink>
        break;
      }
      case ItemsName.Email: {
        itemUI = <Email
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={isShowInModal}
          config={config} theme={theme} intl={intl}

          onItemClick={onItemClick}
          getAppTitle={getAppTitle}
        ></Email>
        break;
      }
      case ItemsName.Facebook: {
        itemUI = <Facebook
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={isShowInModal}
          config={config} theme={theme} intl={intl}

          onItemClick={onItemClick}
          getAppTitle={getAppTitle}
        ></Facebook>
        break;
      }
      case ItemsName.Twitter: {
        itemUI = <Twitter
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={isShowInModal}
          config={config} theme={theme} intl={intl}

          onItemClick={onItemClick}
          getAppTitle={getAppTitle}
        ></Twitter>
        break;
      }
      case ItemsName.Pinterest: {
        itemUI = <Pinterest
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={isShowInModal}
          config={config} theme={theme} intl={intl}

          onItemClick={onItemClick}
          getAppTitle={getAppTitle}
        ></Pinterest>
        break;
      }
      case ItemsName.Linkedin: {
        itemUI = <Linkedin
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={isShowInModal}
          config={config} theme={theme} intl={intl}

          onItemClick={onItemClick}
          getAppTitle={getAppTitle}
        ></Linkedin>
        break;
      }

      default: {
        itemUI = null;
        break;
      }
    }

    return itemUI;
  }



  _getDirClassName = (dir: string, isPopup: boolean) => {
    if (true === isPopup) {
      dir = InlineDirection.Horizontal;
    }

    if (dir) {
      return 'dir-' + dir.toLowerCase();
    } else {
      return '';
    }
  }
  getStyle = () => {
    const theme = this.props.theme;
    return css`
      .dir-horizontal{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
      }

      .dir-vertical{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
      }

      .item-wapper {
        margin: 0.5rem;
        max-width: 100px;
      }
      .share-item {
        /*flex-basis: max-content;
        flex-basis: 130px;*/
      }

      .label-in-btn{
        color: ${theme.colors.light}
      }
      .label-outof-btn{
        width: 100%;
        max-width: 100px;
        margin: 0.25rem;
        font-size: 0.8rem;
        color: ${theme.colors.black};
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        font-weight: ${(parseInt(theme.body.fontWeight) + 100)};
      }
    `;
  }

  render() {
    const { config, uiMode } = this.props;
    const isPopup = (uiMode === UiMode.Popup);
    const itemListImmutable = isPopup ? config.popup.items : config.inline.items;
    const itemList = itemListImmutable.asMutable();

    const dir = config.inline.design.direction;
    const dirKlass = this._getDirClassName(dir, isPopup);

    return <div css={this.getStyle()}>
      <div className={dirKlass}>{
        itemList.map((itemid, idx) => {
          return <div key={'key-' + idx} className="item-wapper">
            {this.getElementByItemId(itemid)}
          </div>
        })
      }</div>
    </div>;
  }
}