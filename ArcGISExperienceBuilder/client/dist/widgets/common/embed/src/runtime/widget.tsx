import {
  React, AllWidgetProps, ExpressionResolverComponent, DataRecord, RepeatedDataSource,
  getAppStore, AppMode, urlUtils, queryString, IMState, ReactResizeDetector, SessionManager
} from 'jimu-core';
import { WidgetPlaceholder } from 'jimu-ui';
import { IMConfig, EmbedType } from '../config';
import defaultMessages from './translations/default';
import { versionManager } from '../embed-version-manager';
import { ViewVisibilityContext, ViewVisibilityContextProps } from 'jimu-layouts/layout-runtime';

interface State {
  content?: string;
  isResetting?: boolean;
  loadErr?: boolean;
  errMessage?: string;
  resolveErr?: boolean;
  refreshFlag?: boolean;
  refreshInterval?: number;
  refreshTimer?: any;
  changeTimerFlag?: boolean;
}

interface Props{
  appMode: AppMode,
  sectionNavInfos: any,
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig> & Props, State>{
  static versionManager = versionManager;
  ifr: HTMLIFrameElement;
  needReload: boolean;
  // Indicates whether the iFrame needs to be loaded in the View, and keep the loaded iframe ununloaded.
  shouldRenderIframeInView: boolean;
  // Indicates whether content needs to be loaded on the iFrame after switching the view.
  needLoadContentInView: boolean;
  size: {
    width: number,
    height: number
  }
  errMessages: {
    unSupportUrl: string,
    unSupportIframeUrl: string,
  }

  static mapExtraStateProps = (state: IMState, props: AllWidgetProps<IMConfig>): Props => {
    return {
      appMode: state?.appRuntimeInfo?.appMode,
      sectionNavInfos: state?.appRuntimeInfo?.sectionNavInfos,
    }
  }

  constructor(props) {
    super(props);
    const { config } = props;
    const { embedType, embedCode } = config;

    this.errMessages = {
      unSupportUrl: this.formatMessage('unSupportUrl'),
      unSupportIframeUrl: this.formatMessage('unSupportIframeUrl'),
    }

    this.checkUrl = this.checkUrl.bind(this);
    const state: State = {
      content: embedType === EmbedType.Url ? (this.isUsedDataSource() ? undefined : config.staticUrl) : embedCode,
      loadErr: false,
      resolveErr: false,
      refreshFlag: false,
      refreshInterval: 10,
      refreshTimer: undefined,
      changeTimerFlag: false,
    };
    this.state = state;
    this.shouldRenderIframeInView = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!nextProps || Object.keys(nextProps).length === 0 || !prevState || Object.keys(prevState).length === 0) {
      return null;
    }
    const { config } = nextProps;
    const { autoRefresh = false, autoInterval = 10 } = config;
    const { refreshFlag, refreshInterval } = prevState;
    if((autoRefresh !== refreshFlag) || (autoInterval !== refreshInterval)) {
      return {
        refreshFlag: autoRefresh,
        refreshInterval: autoInterval,
        changeTimerFlag: true,
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { config } = this.props;
    const { content } = this.state;
    if (content && content.trim().length > 0) {
      this.setState({
        isResetting: true
      }, () => {
        this.loadContent();
        if(config.embedType === EmbedType.Url){
          this.checkUrl(this.processUrl(content));
        }
      })
    }
  }

  componentDidUpdate(preProps, preStates) {
    const { appMode, config, useDataSourcesEnabled, sectionNavInfos } = this.props;
    const { embedCode, embedType, staticUrl, autoRefresh, autoInterval } = config;
    const autoConfChange = autoRefresh !== preProps.config.autoRefresh || autoInterval !== preProps.config.autoInterval;
    if((appMode !== preProps.appMode && appMode === AppMode.Design) || autoConfChange){
      this.reload();
    }
    if (embedType !== preProps.config.embedType) {
      const content = embedType === EmbedType.Url ? (this.isUsedDataSource() ? undefined : staticUrl) : embedCode;
      this.setState({
        content: content
      })
    } else {
      if (embedType === EmbedType.Url) {
        const nowUsedDataSource = this.isUsedDataSource()
        const preUsedDataSource = this.isUsedDataSource(preProps)
        if(preProps.useDataSourcesEnabled === true && useDataSourcesEnabled === false){
          this.loadContent();
        }
        //if usedDataSource, the content will be changed by expression resolver component
        if (!nowUsedDataSource || nowUsedDataSource !== preUsedDataSource) {
          const content = nowUsedDataSource ? undefined : staticUrl;
          this.setState({
            content: content
          })
        }
      } else {
        if (preProps.config.embedCode !== embedCode) {
          this.setState({
            content: embedCode
          })
        }
      }
    }

    const { content, refreshFlag, refreshInterval, refreshTimer, changeTimerFlag } = this.state;
    const { content: oldContent } = preStates;
    if (content !== oldContent) {
      this.setState({
        isResetting: !!content,
        loadErr: false
      }, () => {
        this.loadContent();
        if(embedType === EmbedType.Url){
          this.checkUrl(this.processUrl(content));
          if(this.size){
            const {width, height} = this.size
            if(width < 1 || height < 1){//for display:none in view in section
              this.needReload = true;
            }
          }
        }
      })
    }

    if(this.needLoadContentInView && preProps.sectionNavInfos !== sectionNavInfos){
      this.loadContent();
    }

    // autorefresh setting
    if(!refreshTimer && refreshFlag) {
      const autoRefreshTimer = setInterval(() => {
        if(embedType === EmbedType.Url){
          if(this.ifr){
            const src = this.ifr.src;
            this.ifr.src = src;
          }
        }else{
          const srcDoc = this.ifr.srcdoc;
          this.ifr.srcdoc = srcDoc;
        }
      }, refreshInterval*60*1000);
      this.setState({
        refreshTimer: autoRefreshTimer,
      });
    } else if(refreshTimer && !refreshFlag) {
      clearInterval(refreshTimer);
      this.setState({
        refreshTimer: undefined,
      });
    }
    if(changeTimerFlag && !refreshFlag) {
      if(refreshTimer) clearInterval(refreshTimer);
      const changeTimer = setInterval(() => {
        if(embedType === EmbedType.Url){
          if(this.ifr){
            const src = this.ifr.src;
            this.ifr.src = src;
          }
        }else{
          const srcDoc = this.ifr.srcdoc;
          this.ifr.srcdoc = srcDoc;
        }
      }, refreshInterval*60*1000);
      this.setState({
        refreshTimer: changeTimer,
        changeTimerFlag: false,
      });
    }
  }

  iframeOnLoad = (evt) => {
    this.setState({ isResetting: false });
  }

  checkSafeDomain = (url: string): boolean => {
    let safeFlag = false;
    if(!url) return safeFlag;
    const safeDomain = ['arcgis.com','esri.com'];
    let tobeCheckedDomain = '';
    if(url.indexOf('https://') > -1){
      tobeCheckedDomain = url.substr(8).split('/')[0];
    }
    // Check safedomain
    for(const safeItem of safeDomain){
      if(tobeCheckedDomain.indexOf(safeItem) > -1){
        safeFlag = true;
        break;
      }
    }
    return safeFlag;
  }

  processUrl = (url: string): string => {
    if (!url) return url;
    //support Google Map, Youtube Facebook Vimeo now.
    const lowerUrl = url.toLowerCase();
    /**
     * support Google Map
     */
    // if(lowerUrl.indexOf('https://www.google.com/maps') > -1 || lowerUrl.indexOf('https://goo.gl/maps') > -1){//google map
    //   return url;
    // }

    /**
     * Vimeo
     */
    if (/https:\/\/vimeo\.com\/.*/.test(lowerUrl)) {
      url = urlUtils.removeSearchFromUrl(url)
      const splits = url.split('/');
      const id = splits[splits.length - 1];
      return `https://player.vimeo.com/video/${id}`;
    }

    /**
     * Youtube
     */
    if (/https:\/\/www\.youtube\.com\/watch\?.*v=.*/.test(lowerUrl)) {
      const queryObj = queryString.parseUrl(url)?.query
      const id = queryObj?.['v'];
      return `https://www.youtube.com/embed/${id}`;
    } else if (/https:\/\/youtu\.be\/.*/.test(lowerUrl)) {
      url = urlUtils.removeSearchFromUrl(url)
      const splits = url.split('/');
      const id = splits[splits.length - 1];
      return `https://www.youtube.com/embed/${id}`;
    }

    /**
     * Facebook video
     */
    if (/https:\/\/www\.facebook\.com\/.*\/videos\/.*/.test(lowerUrl)) {
      return `https://www.facebook.com/plugins/video.php?href=${lowerUrl}&show_text=0`;
    }

    if (!this.checkURLFormat(url)) {
      url = 'about:blank'
    }

    // Check and replace the url to current user's org to avoid duplicate sign-in
    // This is the matching rule, and the target Domain contains these four types, which need to be replaced
    const matchedUrl = ['.maps.arcgis.com','.mapsdevext.arcgis.com','.mapsqa.arcgis.com'];
    let tobeCheckedDomain = '';
    if(url.indexOf('https://') > -1){
      tobeCheckedDomain = url.substr(8).split('/')[0];
    }
    let matchFlag = false;
    let matchEnv = '';
    // Check domain
    for(const item of matchedUrl){
      if(tobeCheckedDomain.indexOf(item) > -1){
        matchFlag = true;
        switch(item){
          case '.maps.arcgis.com':
            matchEnv = 'prod';
            break;
          case '.mapsdevext.arcgis.com':
            matchEnv = 'dev';
            break;
          case '.mapsqa.arcgis.com':
            matchEnv = 'qa';
            break;
        }
        break;
      }
    }

    const hostEnv = window.jimuConfig.hostEnv;
    if(matchFlag && matchEnv === hostEnv){
      const appState = getAppStore().getState();
      if(appState && appState.user){
        const urlKey = appState?.portalSelf?.urlKey;
        const customBaseUrl = appState?.portalSelf?.customBaseUrl;
        if(tobeCheckedDomain && urlKey && customBaseUrl){
          url = url.replace(tobeCheckedDomain,`${urlKey}.${customBaseUrl}`);
        }
      }
    }
    return url;
  }

  checkURLFormat = (str: string): boolean => {
    if (!str || str === '') return false;
    const httpsRex = '^(([h][t]{2}[p][s])?://)';
    const re = new RegExp(httpsRex);
    if (!re.test(str)) {
      return false;
    }
    const index = str.indexOf('.');
    if (index < 0 || index === str.length - 1) {
      return false;
    }
    return true
  }

  checkUrl(url: string) {
    if (!this.checkURLFormat(url)) {
      this.setState({
        loadErr: true,
        errMessage: this.errMessages.unSupportUrl
      })
      return;
    }
    const appMode = getAppStore()?.getState()?.appRuntimeInfo?.appMode;
    if (!url || !window.jimuConfig.isInBuilder || appMode === AppMode.Run || window.jimuConfig.isInPortal) return;
    if (url.indexOf('https://www.facebook.com/plugins/video.php?show_text=0&href=') > -1 ||
      url.indexOf('https://www.youtube.com/embed/') > -1 ||
      url.indexOf('https://player.vimeo.com/video/') > -1) {
      this.setState({
        loadErr: false
      })
      return
    }
    this.fetchUrl(`${window.location.origin}/check_url`, url).then(res => {
      let canLoadUrl: boolean = true;
      if (res && res.success) {
        const data = res.data;
        const status = data?.status;
        const cspForbid = ['default-src "self"','frame-ancestors'];
        const checkCsp = (csp: string) => {
          let embedForbidden = false;
          cspForbid.map(rule => {
            if(csp.indexOf(rule) > 0) {
              embedForbidden = true;
              return;
            }
          });
          return embedForbidden;
        };
        if (status && status < 400) {
          const contentSecurityPolicy = data?.headers?.['content-security-policy'];
          const cspClose = contentSecurityPolicy && checkCsp(contentSecurityPolicy);
          if (cspClose) {
            canLoadUrl = false;
          }
          const xFrameOptions = data?.headers?.['x-frame-options']?.toLowerCase();
          if (xFrameOptions) {
            if (xFrameOptions === 'deny') {
              canLoadUrl = false;
            } else if (xFrameOptions === 'sameorigin') {
              if (!this.isOriginSameAsLocation(url)) {
                canLoadUrl = false;
              }
            }
          }
        } else {
          canLoadUrl = false;
        }
      } else {
        canLoadUrl = false;
      }
      const alterState: State = {
        loadErr: !canLoadUrl
      }
      if (!canLoadUrl) {
        alterState.isResetting = false;
        alterState.errMessage = this.errMessages.unSupportIframeUrl
      }
      this.setState(alterState)
    })
  }

  isOriginSameAsLocation(url) {
    var pageLocation = window.location;
    var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/;
    var urlMatch = URL_HOST_PATTERN.exec(url) || [];
    var urlparts = {
      protocol: urlMatch[1] || '',
      host: urlMatch[2] || '',
      port: urlMatch[3] || ''
    };

    const defaultPort = (protocol) => {
      return { 'http:': 80, 'https:': 443 }[protocol];
    }

    const portOf = (location) => {
      return location.port || defaultPort(location.protocol || pageLocation.protocol);
    }

    return !!((urlparts.protocol && (urlparts.protocol == pageLocation.protocol)) &&
      (urlparts.host && (urlparts.host == pageLocation.host)) &&
      (urlparts.host && (portOf(urlparts) == portOf(pageLocation)))
    );
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] })
  }

  fetchUrl = async (fetchUrl, url): Promise<any> => {
    const session = SessionManager.getInstance().getMainSession();
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
    const result = await fetch(fetchUrl, {
      method: 'post',
      headers: headers,
      body: JSON.stringify({ token: session?.token, url })
    }).catch(err => { });
    if (!result) return Promise.resolve(null);
    const json = await result.json().catch(error => { });
    return Promise.resolve(json);
  }

  isUsedDataSource = (props?: AllWidgetProps<IMConfig>) => {
    if (!props) {
      props = this.props
    }
    const { useDataSources, useDataSourcesEnabled } = props;
    return useDataSourcesEnabled && useDataSources && useDataSources.length > 0
  }

  onUrlExpResolveChange = result => {
    if(result?.isSuccessful){
      this.setState({
        content: result.value,
        resolveErr: false
      });
    }else{
      this.setState({
        resolveErr: true
      });
    }
  }

  getRecordsFromRepeatedDataSource = (): { [dataSourceId: string]: DataRecord } => {
    const dataSourceId = this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId;

    if (dataSourceId && this.props.repeatedDataSource) {
      if (dataSourceId === (this.props.repeatedDataSource as RepeatedDataSource).dataSourceId) {
        const record = (this.props.repeatedDataSource as RepeatedDataSource).record as DataRecord;

        return {
          [dataSourceId]: record
        }
      }
    }

    return null;
  }

  onResize = (width, height) => {
    if(this.size){
      const {width: oldWidth, height: oldHeight} = this.size
      if((oldWidth < 1 || oldHeight < 1) && (width > 1 && height > 1)){
        if(this.needReload){
          this.reload()
          this.needReload = false
        }
      }
    }
    this.size = {
      width,
      height
    }
  }

  reload = () => {
    const {config} = this.props
    if(this.ifr){
      if(config.embedType === EmbedType.Code){//code
        const srcDoc = this.ifr.srcdoc;
        this.ifr.srcdoc = srcDoc;
      }else{
        const src = this.ifr.src;
        this.ifr.src = src;
      }
    }
  }

  loadContent = () => {
    const { config } = this.props
    const { content } = this.state;
    const { embedType } = config;
    if(this.ifr){
      if(embedType === EmbedType.Code){//code
        this.ifr.srcdoc = content;
      }else{
        this.ifr.removeAttribute('srcdoc');
        this.ifr.removeAttribute('src');
        setTimeout(() => {
          if(this.ifr) this.ifr.src = this.processUrl(content);
        }, 100);
      }
    }
  }

  render() {
    const { isResetting, loadErr, errMessage, resolveErr, content } = this.state;
    const { theme, id, config } = this.props;
    const { embedCode, embedType, staticUrl, expression } = config;
    const isDataSourceUsed = this.props.useDataSourcesEnabled;

    const showPlaceholder = embedType === EmbedType.Code ? !embedCode :
      ((!staticUrl && !isDataSourceUsed) || (isDataSourceUsed && !expression))
    if (showPlaceholder) {
      return <WidgetPlaceholder
        widgetId={this.props.id}
        icon={require('./assets/icon.svg')}
        message={this.formatMessage('embedHint')} />;
    }
    let withSandbox = true;
    if(embedType === EmbedType.Url){
      withSandbox = !this.checkSafeDomain(content);
    }

    return (
      <ViewVisibilityContext.Consumer>
        {({isInView,isInCurrentView}: ViewVisibilityContextProps) => {
          let embedLoad = true;
          if(!this.shouldRenderIframeInView){
            embedLoad = isInView ? isInCurrentView : true;
            if(embedLoad) this.shouldRenderIframeInView = true;
          }
          this.needLoadContentInView = isInView && isInCurrentView;
          return <React.Fragment>
            {embedLoad &&
              <div style={{ width: '100%', height: '100%', position: 'relative' }} className="jimu-widget widget-embed">
                {withSandbox ? <iframe
                  id="ifrSandbox"
                  className={`iframe-${id}`}
                  style={{ width: '100%', height: '100%' }}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-popups-to-escape-sandbox"
                  allowFullScreen
                  onLoad={this.iframeOnLoad}
                  frameBorder="0"
                  ref={(f) => { this.ifr = f; }}
                  allow="geolocation"
                  data-testid="embedSandbox"
                />
                  : <iframe
                    id="ifrSafe"
                    className={`iframe-${id}`}
                    style={{ width: '100%', height: '100%' }}
                    allowFullScreen
                    onLoad={this.iframeOnLoad}
                    frameBorder="0"
                    ref={(f) => { this.ifr = f; }}
                    allow="geolocation"
                    data-testid="embedSafe"
                  />
                }
                {isResetting && <div className="jimu-secondary-loading"></div>}
                {loadErr &&
                  <div className="mask text-center"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      paddingTop: '30%',
                      backgroundColor: theme.colors.white
                    }}>
                    {errMessage}
                  </div>
                }
                {resolveErr && isDataSourceUsed &&
                  <div className="mask text-center"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      paddingTop: '30%',
                      backgroundColor: theme.colors.white
                    }}>
                    {expression?.name}
                  </div>
                }
                <div style={{ display: 'none' }}>
                  {
                    isDataSourceUsed && embedType === EmbedType.Url && expression &&
                    <div>
                      <ExpressionResolverComponent useDataSources={this.props.useDataSources} expression={expression}
                        onChange={this.onUrlExpResolveChange} widgetId={this.props.id}
                      />
                    </div>
                  }
                </div>
                <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
              </div>
            }
          </React.Fragment>
        }
        }
      </ViewVisibilityContext.Consumer>
    )
  }
}
