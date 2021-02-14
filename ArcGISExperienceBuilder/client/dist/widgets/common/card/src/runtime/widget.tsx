/** @jsx jsx */
import {React, IMState, classNames, css, jsx, polished,  AllWidgetProps,
  ThemeVariables, SerializedStyles, AppMode,
  BrowserSizeMode, appActions, IMAppConfig, getAppStore, ReactResizeDetector, defaultMessages as jimuUIMessages, lodash, IMUrlParameters } from 'jimu-core';
import { WidgetPlaceholder } from 'jimu-ui';
import { IMConfig, Status } from '../config';
import CardEditor from './components/card-editor';
import CardViewer from './components/card-viewer';
import { FixedLayoutViewer, searchUtils, LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';

import defaultMessages from './translations/default';

interface Props{
  selectionIsSelf: boolean,
  selectionIsInSelf: boolean,
  selectionStatus: Status,
  appMode: AppMode,
  browserSizeMode: BrowserSizeMode,
  builderStatus: Status,
  isRTL: boolean,
  left: number | string,
  top: number | string,
  isWidthAuto: boolean,
  isHeightAuto: boolean,
  queryObject: IMUrlParameters
}

interface States {
  LayoutEntry: any;
  hideCardTool: boolean;
  isSetlayout: boolean;
}

const COMMON_PADDING = 0;

export class Widget extends React.PureComponent<AllWidgetProps<IMConfig> & Props, States>{
  debounceOnResize: (width, height) => void;

  static mapExtraStateProps = (state: IMState, props: AllWidgetProps<IMConfig>): Props => {
    const appConfig = state && state.appConfig;
    const { layouts, layoutId, layoutItemId, builderSupportModules, id} = props;
    const browserSizeMode = state?.browserSizeMode;
    const builderStatus = state?.widgetsState[props.id] && state?.widgetsState[props.id]?.builderStatus || Status.Regular;

    const selection = state && state.appRuntimeInfo && state.appRuntimeInfo.selection;
    const selectionIsInSelf = selection && builderSupportModules && builderSupportModules.widgetModules &&
      builderSupportModules.widgetModules.selectionInCard(selection, id, appConfig, false);
    let selectionStatus;
    if(selectionIsInSelf){
      selectionStatus = Object.keys(layouts).find(status => searchUtils.findLayoutId(layouts[status], browserSizeMode, appConfig.mainSizeMode) === selection.layoutId);
    }

    if(!selection){
      selectionStatus = Status.Regular;
    }

    const layout = appConfig.layouts?.[layoutId]
    const layoutSetting = layout?.content?.[layoutItemId]?.setting
    const isHeightAuto = layoutSetting?.autoProps?.height === LayoutItemSizeModes.Auto || layoutSetting?.autoProps?.height === true
    const isWidthAuto = layoutSetting?.autoProps?.width === LayoutItemSizeModes.Auto || layoutSetting?.autoProps?.width === true


    let widgetPosition = undefined;
    if(window.jimuConfig.isInBuilder){
      const bbox = appConfig.layouts?.[layoutId]?.content?.[layoutItemId]?.bbox;
      widgetPosition = bbox && {
        left: bbox.left,
        top: bbox.top
      };
    }
    const selectionIsSelf = selection?.layoutId === layoutId && selection?.layoutItemId === layoutItemId;
    return {
      selectionIsSelf: selectionIsSelf,
      selectionIsInSelf,
      selectionStatus,
      appMode: state?.appRuntimeInfo?.appMode,
      browserSizeMode: state?.browserSizeMode,
      builderStatus: builderStatus,
      isRTL: state?.appContext?.isRTL,
      left: widgetPosition && widgetPosition.left,
      top: widgetPosition && widgetPosition.top,
      isHeightAuto,
      isWidthAuto,
      queryObject: state.queryObject
    };
  };

  constructor(props) {
    super(props);
    const stateObj: States = {
      LayoutEntry: null,
      hideCardTool: false,
      isSetlayout: false,
    };

    if (window.jimuConfig.isInBuilder) {
      stateObj.LayoutEntry = this.props.builderSupportModules.LayoutEntry;
    }else {
      stateObj.LayoutEntry = FixedLayoutViewer;
    }
    this.state = stateObj;
    // this.editWidgetConfig('builderStatus', Status.Regular);

    this.onResize = this.onResize.bind(this);
    this.selectSelf = this.selectSelf.bind(this);
    this.debounceOnResize = lodash.debounce((width, height) => this.onResize(width, height), 200);

  }

  componentDidUpdate(preProps, preState){
    const {appMode, selectionStatus, builderStatus, left, top} = this.props
    if(appMode !== AppMode.Run && selectionStatus !== builderStatus && selectionStatus){// clear show selected only
      //change status by toc
      this.editBuilderAndSettingStatus(selectionStatus);
    }

    if(preProps.appMode != appMode && appMode === AppMode.Run){
      this.editBuilderAndSettingStatus(Status.Regular);
    }
    if(top !== preProps.top || left !== preProps.left){
      this.updateCardToolPosition();
    }
    this.setSettinglayout();
  }

  setSettinglayout = () => {
    const { layoutId, layoutItemId, id, selectionIsSelf } = this.props;
    const { isSetlayout } = this.state;
    if(layoutId && id && layoutItemId && !isSetlayout && selectionIsSelf) {
      this.props.dispatch(appActions.widgetStatePropChange(id, 'layoutInfo', {layoutId, layoutItemId}));
      this.setState({
        isSetlayout: true
      });
    }
  }

  onResize = (width, height) => {
    this.updateCardToolPosition();
  }

  updateCardToolTimeout: NodeJS.Timer;
  private updateCardToolPosition = () => {
    const {selectionIsSelf} = this.props;
    if(!selectionIsSelf) return;
    this.setState({
      hideCardTool: true
    })
    if(this.updateCardToolTimeout){
      clearTimeout(this.updateCardToolTimeout);
      this.updateCardToolTimeout = undefined;
    }
    this.updateCardToolTimeout = setTimeout(() => {
      this.setState({
        hideCardTool: false
      })
    }, 500);
  }

  formatMessage = (id: string, values?: {[key: string]: any}) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: {...defaultMessages, ...jimuUIMessages}[id]}, values)
  }

  // call exec manuly
  editStatus = (name, value) => {
    const {dispatch, id} = this.props;
    dispatch(appActions.widgetStatePropChange(id, name, value));
  }

  editWidgetConfig = (newConfig) => {
    if(!window.jimuConfig.isInBuilder)return;

    const appConfigAction = this.props.builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    appConfigAction.editWidgetConfig(this.props.id, newConfig).exec();
  }

  isEditing = (): boolean => {
    const {appMode, config, selectionIsSelf, selectionIsInSelf} = this.props;
    if(!window.jimuConfig.isInBuilder) return false;
    return (selectionIsSelf || selectionIsInSelf) && window.jimuConfig.isInBuilder && appMode !== AppMode.Run && config.isItemStyleConfirm
  }

  editBuilderAndSettingStatus = (status: Status) => {
    this.editStatus('showCardSetting', status);
    this.editStatus('builderStatus', status);
  }

  getAppConfig = (): IMAppConfig => {
    return getAppStore().getState().appConfig;
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    const {id} = this.props;
    return css`
      ${'&.card-widget-' + id} {
        overflow: visible;
        background-color: transparent;
        border: ${polished.rem(COMMON_PADDING)} solid ${polished.rgba(theme.colors.black, window.jimuConfig.isInBuilder && this.isEditing() ? 0.2 : 0)};
        width: 100%;
        height: 100%;
      }
    `
  }

  getCardProps = () => {
    const { config, selectionIsInSelf, selectionIsSelf, builderStatus,appMode, queryObject } = this.props;
    const isEditor = window.jimuConfig.isInBuilder && appMode === AppMode.Design;
    const editProps = isEditor ? {
      hideCardTool: this.state.hideCardTool,
      selectionIsCard: selectionIsSelf,
      selectionIsInCard: selectionIsInSelf,
      isEditing: this.isEditing(),
      builderStatus: builderStatus,
      selectSelf: this.selectSelf
    } : {
      linkParam: config.linkParam,
      queryObject: queryObject
    };
    return {
      ...this.getOtherProps(),
      ...editProps
    }
  }

  getOtherProps = () => {
    const {config, theme, id, appMode, builderSupportModules, layouts,
      browserSizeMode, dispatch, isRTL, isHeightAuto, isWidthAuto} = this.props;
    return {
      browserSizeMode: browserSizeMode,
      isRTL: isRTL,
      builderSupportModules: builderSupportModules,
      formatMessage: this.formatMessage,
      dispatch: dispatch,
      widgetId: id,
      interact: window.jimuConfig.isInBuilder && builderSupportModules.widgetModules.interact,
      appMode: appMode,
      theme: theme,
      LayoutEntry: this.state.LayoutEntry,
      layouts: layouts,
      cardConfigs: config,
      isHeightAuto: isHeightAuto,
      isWidthAuto: isWidthAuto
    }
  }

  cardRender = () => {
    const props = this.getCardProps();
    const {appMode} = this.props;
    const isEditor = window.jimuConfig.isInBuilder && appMode === AppMode.Design;
    const Card = isEditor ? CardEditor : CardViewer;
    return (<Card {...props} />)
  }

  selectSelf(){
    if(!window.jimuConfig.isInBuilder) return false;
    const { layoutId, layoutItemId } = this.props;

    const layoutInfo = {layoutId, layoutItemId};
    this.props.dispatch(appActions.selectionChanged(layoutInfo));
  }

  render() {

    const {config, id} = this.props;
    const classes = classNames(
      'jimu-widget',
      'widget-card',
      'card-widget-' + id
    );

    if(!config.itemStyle){
      return <WidgetPlaceholder widgetId={this.props.id} icon={require('./assets/icon.svg')} message={this.formatMessage('placeHolderTip')}/>;
    }

    return <div className={classes} css={this.getStyle(this.props.theme)}  >
      {this.cardRender()}
      <ReactResizeDetector handleWidth handleHeight onResize={this.debounceOnResize} />
    </div>
  }
}

export default Widget;

