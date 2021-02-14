/** @jsx jsx */
import { React, IMState, jsx, IMAppConfig, IMAppInfo, AllWidgetProps,
  LayoutItemType, BrowserSizeMode, appActions, AppMode, getAppStore, urlUtils} from 'jimu-core';
import { IMConfig, UiMode, DefaultIconConfig, ItemsName } from '../config';
import { searchUtils } from 'jimu-layouts/layout-runtime'
import { Button, Icon, Popper, getFallbackPlacementsModifier } from 'jimu-ui';
import { getStyle, getPopupStyle } from './style';
import nls from './translations/default';

//shortLink
import ShortLink from './components/short-link';
//items
import { ShownMode, ExpandType } from './components/items/base-item';
import { ShareLink } from './components/items/sharelink';
import { QRCode } from './components/items/qr-code';
import { Embed } from './components/items/embed';
import { ItemsList } from './components/items-list';

const xIcon = require('jimu-ui/lib/icons/close-12.svg');

interface ExtraProps {
  appConfig: IMAppConfig;
  appInfo: IMAppInfo;
  browserSizeMode: BrowserSizeMode;
  isLiveViewMode: boolean;
}

interface State {
  url: string;
  longUrl: string;
  shortUrl: string; //'' means havn't fetch shortUrl
  //ui
  uiMode: UiMode;
  isInController: boolean;
  //popup
  isPopupOpen: boolean;
  shownItem?: string; //e.g QRCode tiled the popup
  isLiveViewMode: boolean;
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig> & ExtraProps, State>{
  private btnRef: React.RefObject<any>;
  private popperRef: React.RefObject<any>;

  private POPPER_POSITION_CONFIGS = [getFallbackPlacementsModifier(['right-start', 'left-start', 'bottom'])];

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<IMConfig>): ExtraProps => {
    const appMode = (state && state.appRuntimeInfo && state.appRuntimeInfo.appMode);
    return {
      appConfig: state.appConfig,
      appInfo: state.appInfo,
      browserSizeMode: state.browserSizeMode,
      isLiveViewMode: (appMode === AppMode.Run),
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      url: '',
      longUrl: '',
      shortUrl: '',
      uiMode: UiMode.Popup,
      isInController: false,
      isPopupOpen: false,
      shownItem: null,
      isLiveViewMode: false,
    }

    this.btnRef = React.createRef();
    this.popperRef = React.createRef();
  }
  componentDidMount() {
    const { layoutId, layoutItemId, id } = this.props;
    this.props.dispatch(appActions.widgetStatePropChange(id, 'layoutInfo', { layoutId, layoutItemId }));

    this.updateUrl(); //init this.state.url
  }
  componentDidUpdate(prevProps: AllWidgetProps<IMConfig>, prevState: State) {
    // if( this.props.config !== prevProps.config ){
    //   this.onOpenPopup(false);
    // }
    const mode = this.props.config.uiMode;
    if (mode === UiMode.Popup && this.isParentWidgetIsController(prevProps)) {
      this.setState({ isInController: true });//Tile popup content in Controller
    } else {
      this.setState({ isInController: false });
    }

    this.setUiMode(mode);

    this.closePopperWhenLiveViewModeChange();
  }
  private isParentWidgetIsController(prevProps: AllWidgetProps<IMConfig>) {
    const widgetId = searchUtils.getParentWidgetIdOfContent(this.props.appConfig, prevProps.id, LayoutItemType.Widget, this.props.browserSizeMode);
    return (this.props.appConfig.widgets[widgetId]?.uri === 'widgets/common/controller/');
  }
  private closePopperWhenLiveViewModeChange() {
    const { isLiveViewMode } = this.props;

    if (isLiveViewMode !== this.state.isLiveViewMode) {
      this.onTogglePopup(false);
    }
    this.setState({ isLiveViewMode: isLiveViewMode });
  }

  static getDerivedStateFromProps(nextProps: AllWidgetProps<IMConfig>, prevState: State) {
    if (nextProps?.config?.uiMode !== prevState?.uiMode) {
      return {
        shownItem: null,
        isPopupOpen: false//when uiMode changed in setting
      }
    } else {
      return null;
    }
  }

  //urls
  private onUrlChange = (url: string) => {
    this.setState({ url: url });
    // console.log("1.longUrl==>  " + this.state.longUrl);
    // console.log("2.shortUrl==>  " + this.state.shortUrl);
    // console.log("3.url==>  " + this.state.url);
  }
  onLongUrlChange = (longUrl: string) => {
    this.setState({ longUrl: longUrl });
    this.onUrlChange(longUrl);
  }
  onShortUrlChange = (shortUrl: string) => {
    this.setState({ shortUrl: shortUrl });
    if (shortUrl) {
      this.onUrlChange(shortUrl);
    }
  }
  //try to update shortUrl
  updateUrl = (): string => {
    const href = this.attachOrgUrlKey(window.location.href);

    if (this.state.longUrl === href) {
      return href;
    }

    //1. update long url
    this.onLongUrlChange(href);
    this.onShortUrlChange('');

    //2. try to set short url
    ShortLink.fetchShortLink(href).then((shortUrl) => {
      this.onShortUrlChange(shortUrl);
    }, (longUrl) => {
      //this.onLongUrlChange()
    })
  }

  //href?org=<urlkey>
  attachOrgUrlKey = (href: string): string => {
    let url = href;
    const appState = getAppStore().getState();
    const urlKey = appState?.portalSelf?.urlKey;
    if (urlKey) {
      url = urlUtils.updateQueryStringParameter(url, 'org', urlKey);
    }

    return url;
  }

  //ui
  private setUiMode = (mode: UiMode) => {
    this.setState({ uiMode: mode });
  }

  //content
  onItemClick = (name: string, ref: React.RefObject<any>, type: ExpandType, isUpdateUrl: boolean) => {
    if (false !== isUpdateUrl) {
      this.updateUrl();
    }

    if (name && ref) {
      if (this.state.uiMode === UiMode.Popup && !this.state.isInController) {
        this.onOpenPopup(true);
      } else if (this.state.uiMode === UiMode.Inline && type === ExpandType.ShowInPopup) {
        this.onOpenPopup(true);
      }

      this.onContentChange(name, ref);
    } // else juset updateUrl
  }
  onContentChange = (name: string, ref: React.RefObject<any>) => {
    this.popperRef = ref;
    this.setState({ shownItem: name });
  }

  //popup
  private onPopupBtnClick = () => {
    this.onTogglePopup();
  }
  onTogglePopup = (command?: boolean) => {
    let isOpen;
    if ('undefined' !== typeof command) {
      isOpen = command;
    } else {
      isOpen = !this.state.isPopupOpen;
    }

    if (false === isOpen) {
      this.onBackBtnClick();//back to main content
    }

    this.setState({ isPopupOpen: isOpen });
  }
  onOpenPopup = (isOpen: boolean) => {
    this.updateUrl();
    this.setState({ isPopupOpen: isOpen });
  }
  //popup's toggle hanlder
  onPopperToggleHanlder = (evt: React.MouseEvent<HTMLElement>) => {
    // if (this.isIgnorePopperToggle(evt)) {
    //   //do nothing
    // } else {
    //   this.onTogglePopup();
    // }
    this.onTogglePopup();
  }

  onBackBtnClick = () => {
    this.setState({ shownItem: null });
  }
  getRefByUiMode = () => {
    var ref = null;
    if (UiMode.Popup === this.props.config.uiMode && !this.state.isInController) {
      ref = this.btnRef;
    } else /*if (UiMode.Popup === this.props.config.uiMode && this.state.isInController)*/ {
      ref = this.popperRef;
    } /*else if (UiMode.Inline === this.props.config.uiMode) {
      ref = this.popperRef;
    } else if (UiMode.Slide === this.props.config.uiMode) {
      ref = this.popperRef;
    }*/

    return ref;
  }
  //popup

  getAppTitle = (): string => {
    // console.log('getAppTitle  ', this.props.appInfo.name);
    // console.log('getAppSummary  ', this.props.appInfo.snippet);
    return this.props.appInfo.name;
  }

  //for render
  //part 1
  private renderOutsideUI = () => {
    let outsideUI = null;
    const tooltip = this.props.config.popup.tooltip;
    const { theme, config, intl } = this.props;
    const { uiMode } = this.state;

    if (uiMode === UiMode.Popup) {
      if (this.state.isInController) {
        outsideUI = this.renderMainContent();
      } else {
        const icon = this.props.config.popup.icon ? this.props.config.popup.icon : DefaultIconConfig;
        outsideUI = <Button ref={this.btnRef} icon onClick={this.onPopupBtnClick} title={tooltip} style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }} data-testid="popupBtn">
          <Icon icon={icon.svg} color={icon.properties.color} size={icon.properties.size} />
        </Button>
      }
    } else if (uiMode === UiMode.Inline) {
      outsideUI = <ItemsList
        url={this.state.url}
        uiMode={uiMode} isShowInModal={false}
        theme={theme} intl={intl} config={config}

        onShortUrlChange={this.onShortUrlChange}
        onItemClick={this.onItemClick}
        getAppTitle={this.getAppTitle}
      ></ItemsList>
    } /*else if (uiMode === UiMode.Slide) {
      outsideUI = this.getSlideContent();
    }*/

    return outsideUI;
  }

  private getSlideContent = () => {
    const shownMode = ShownMode.Content;
    const { config, theme, intl } = this.props;
    const { url, longUrl, uiMode } = this.state;

    return <div>
      {/* part 2.1: top */}
      <div>
        <ShareLink
          url={url}
          longUrl={longUrl}
          uiMode={uiMode} shownMode={shownMode} isShowInModal={true}
          config={config} theme={theme} intl={intl}

          onItemClick={this.onItemClick}
          onShortUrlChange={this.onShortUrlChange}
          onLongUrlChange={this.onLongUrlChange}
          onBackBtnClick={this.onBackBtnClick}
          updateUrl={this.updateUrl}
          getAppTitle={this.getAppTitle}
        ></ShareLink>
      </div>
      {/* part 2.2: buttom */}
      <div className="items popup-items-wapper">
        <ItemsList
          url={this.state.url}
          longUrl={longUrl}
          uiMode={uiMode} isShowInModal={true}
          theme={theme} intl={intl} config={config}

          onShortUrlChange={this.onShortUrlChange}
          onItemClick={this.onItemClick}
          getAppTitle={this.getAppTitle}
        ></ItemsList>
      </div>
    </div>
  }
  private renderMainContent = () => {
    let popupBody = null;
    const { url, longUrl, shownItem, uiMode } = this.state;
    const { config, theme, intl } = this.props;

    const shownMode = ShownMode.Content;
    if (shownItem === ItemsName.QRcode) {
      popupBody = <QRCode
        url={url}
        uiMode={uiMode} shownMode={shownMode} isShowInModal={true}
        config={config} theme={theme} intl={intl}

        onItemClick={this.onItemClick}
        onBackBtnClick={this.onBackBtnClick}
        getAppTitle={this.getAppTitle}
      ></QRCode>
    } else if (shownItem === ItemsName.Sharelink) {
      popupBody = <ShareLink
        url={url}
        longUrl={longUrl}
        uiMode={uiMode} shownMode={shownMode} isShowInModal={true}
        config={config} theme={theme} intl={intl}

        onItemClick={this.onItemClick}
        onShortUrlChange={this.onShortUrlChange}
        onLongUrlChange={this.onLongUrlChange}
        onBackBtnClick={this.onBackBtnClick}
        updateUrl={this.updateUrl}
        getAppTitle={this.getAppTitle}
      ></ShareLink>
    } else if (shownItem === ItemsName.Embed) {
      popupBody = <Embed
        url={url}
        uiMode={uiMode} shownMode={shownMode} isShowInModal={true}
        config={config} theme={theme} intl={intl}

        onItemClick={this.onItemClick}
        onBackBtnClick={this.onBackBtnClick}
        getAppTitle={this.getAppTitle}
      ></Embed>
    } else {
      popupBody = this.getSlideContent();
    }

    return popupBody;
  }

  //part 2
  private renderPopupTitle = () => {
    let popupTitle = this.props.intl.formatMessage({ id: 'popupTitle', defaultMessage: nls.popupTitle });
    const shownItem = this.state.shownItem;

    if (shownItem === ItemsName.QRcode) {
      popupTitle = this.props.intl.formatMessage({ id: 'qrcodeTitle', defaultMessage: nls.qrcodeTitle });
    } else if (shownItem === ItemsName.Sharelink) {
      popupTitle = this.props.intl.formatMessage({ id: 'shareLinkTitle', defaultMessage: nls.shareLinkTitle });
    } else if (shownItem === ItemsName.Embed) {
      popupTitle = this.props.intl.formatMessage({ id: 'embedTitle', defaultMessage: nls.embedTitle });
    }
    return popupTitle;
  }


  render() {
    const outsideUI = this.renderOutsideUI();
    const popupBody = this.renderMainContent();
    const popupTitle = this.renderPopupTitle();

    const isRenderPopper = this.state.isPopupOpen;

    return <div css={getStyle(this.props.theme)} data-testid="share-widget" >
      {/* 1.buttons */}
      <div>
        {outsideUI}
      </div>
      {/* 2.popup */}
      {isRenderPopper && //depose Popper when close, for reposition
        <Popper placement={'right-start'} css={getPopupStyle(this.props.theme)} reference={this.getRefByUiMode()}
          modifiers={this.POPPER_POSITION_CONFIGS} data-testid="mainPopuper"
          open={this.state.isPopupOpen} toggle={this.onPopperToggleHanlder}>

          <div className="d-flex popup-header justify-content-between">
            <div className="title d-fle">{popupTitle}</div>
            <Button className="close d-flex" onClick={this.onPopupBtnClick}><Icon icon={xIcon} /></Button>
          </div>
          <div>
            {popupBody}
          </div>
        </Popper>}
    </div>;
  }
}