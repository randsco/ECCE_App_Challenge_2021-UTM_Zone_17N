/** @jsx jsx */
import {
  classNames, Immutable, IMState, React, IMAppConfig, ThemeVariables, SerializedStyles, css, jsx,
  IMThemeVariables, polished, ImmutableObject, ImmutableArray, BrowserSizeMode, LayoutType,
  defaultMessages as jimuCoreMessages, LayoutInfo, TransitionType, TransitionDirection
} from 'jimu-core';
import {AllWidgetSettingProps, getAppConfigAction, templateUtils, builderAppSync } from 'jimu-for-builder';
import { JimuMapViewSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { MarkPopper } from './components/mark-popper';
import { Checkbox, Icon, Button, defaultMessages as jimuUIDefaultMessages, TextInput, ImageParam,
  Modal, ModalBody, ModalFooter, Collapse, NumericInput, ButtonGroup, Select, Slider, ImageFillMode, Tabs, Tab, Tooltip, Switch} from 'jimu-ui';
import { IMConfig, TemplateType, Bookmark, DirectionType, PageStyle, DisplayType, Status, ImgSourceType, Transition } from '../config';
import defaultMessages from './translations/default';
import { ImageSelector } from 'jimu-ui/advanced/resource-selector';
import { Fragment } from 'react';
import { Template } from 'jimu-for-builder/templates';
import { TransitionSetting } from 'jimu-ui/advanced/style-setting-components';

const prefix = 'jimu-widget-';

const defaultConfig = require('../../config.json');
const arrowDown = require('jimu-ui/lib/icons/arrow-down-12.svg');
const arrowUp = require('jimu-ui/lib/icons/arrow-up-12.svg');
const directions = [
  { icon: require('jimu-ui/lib/icons/direction-right.svg'), value: DirectionType.Horizon },
  { icon: require('jimu-ui/lib/icons/direction-down.svg'), value: DirectionType.Vertical },
];

const originAllStyles = {
  CUSTOM1: require('./template/mark-styleCustom1.json'),
  CUSTOM2: require('./template/mark-styleCustom2.json'),
}

let AllStyles: {[key: string]: Template};

function initStyles(widgetId: string){
  if(AllStyles){
    return AllStyles;
  }
  const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages);
  AllStyles = {};
  Object.keys(originAllStyles).forEach(style => {
    AllStyles[style] = templateUtils.processForTemplate(originAllStyles[style], widgetId, messages)
  })
}

interface State {
  activeId: number;
  showSimple: boolean;
  showAdvance: boolean;
  showArrangement: boolean;
  tempLayoutType: LayoutType;
  changeCustomConfirmOpen: boolean;
  confirmMapChangeOpen: boolean;
}

interface ExtraProps {
  appConfig: IMAppConfig;
  browserSizeMode: BrowserSizeMode;
  activeBookmarkId: number;
  layoutInfo: LayoutInfo;
}

interface CustomeProps {
  theme: IMThemeVariables
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State> {
  markPopper = null;
  simpleTipRef: any;
  customTipRef: any;
  toBeChnagedMapWidgetIds: string[];
  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      browserSizeMode: state && state.appStateInBuilder && state.appStateInBuilder.browserSizeMode,
      activeBookmarkId: state && state.appStateInBuilder?.widgetsState[props.id]?.activeBookmarkId,
      layoutInfo: state && state.appStateInBuilder?.widgetsState[props.id]?.layoutInfo,
    }
  }

  constructor(props) {
    super(props);
    initStyles(props.id)
    this.state = {
      activeId: 0,
      showSimple: true,
      showAdvance: true,
      showArrangement: false,
      tempLayoutType: LayoutType.FixedLayout,
      changeCustomConfirmOpen: false,
      confirmMapChangeOpen: false,
    };
    this.simpleTipRef = React.createRef();
    this.customTipRef = React.createRef();
    this.toBeChnagedMapWidgetIds = [];
  }

  componentDidUpdate(prevProps: AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps){
    const { activeId } = this.state;
    const { activeBookmarkId = 0 } = this.props;
    if(this.props.activeBookmarkId !== prevProps.activeBookmarkId){
      if(activeBookmarkId !== activeId) {
        this.setState({ activeId: activeBookmarkId });
      }
    }
  }

  onPropertyChange = (name, value) => {
    const { config } = this.props;
    if (value === config[name]) {
      return;
    }
    const newConfig = config.set(name, value);
    const alterProps = {
      id: this.props.id,
      config: newConfig
    };
    this.props.onSettingChange(alterProps);
  };

  onMultiplePropertyChange = (changeArr) => {
    const { config } = this.props;
    let newConfig = config;
    changeArr.map(item => {
      if(item.value === config[item.name]) return;
      newConfig = newConfig.set(item.name, item.value);
    });
    const alterProps = {
      id: this.props.id,
      config: newConfig
    };
    this.props.onSettingChange(alterProps);
  };

  onConfigChange = (key, value) => {
    const { config } = this.props;
    const newConfig = config.setIn(key, value);
    const alterProps = {
      id: this.props.id,
      config: newConfig
    };
    this.props.onSettingChange(alterProps);
  };

  onTemplateTypeChanged = (style: TemplateType, updatedAppConfig = undefined) => {
    const { id } = this.props;
    let { appConfig } = this.props;
    if (updatedAppConfig) {
      appConfig = updatedAppConfig;
    }
    if(style === TemplateType.Custom1 || style === TemplateType.Custom2){
      const styleTemplate = AllStyles[style];
      templateUtils.updateWidgetByTemplate(appConfig, styleTemplate, id, styleTemplate.widgetId, {}, defaultMessages).then(newAppConfig => {
        this._onItemStyleChange(newAppConfig, style);
      })
    } else {
      this._onItemStyleChange(appConfig, style);
    }
  }

  handleFormChange = (evt) => {
    const target = evt.currentTarget;
    if (!target) return;
    const field = target.dataset.field;
    const type = target.type;
    let value;
    switch (type) {
      case 'checkbox':
        value = target.checked;
        break;
      case 'select':
        value = target.value;
        break;
      case 'range':
        value = parseFloat(target.value);
        break;
      case 'number':
        const numbertype = target.dataset.numbertype;
        const parseNumber = numbertype === 'float' ? parseFloat : parseInt;
        const minValue = !!target.min && parseNumber(target.min);
        const maxValue = !!target.max && parseNumber(target.max);
        value = evt.target.value;
        if (!value || value === '') return;
        value = parseNumber(evt.target.value);
        if (!!minValue && value < minValue) { value = minValue }
        if (!!maxValue && value > maxValue) { value = maxValue }
        break;
      default:
        value = target.value;
        break;
    }
    this.onPropertyChange(field, value);
  }

  handleCheckboxChange = (evt) => {
    const target = evt.currentTarget;
    if (!target) return;
    this.onPropertyChange(target.dataset.field, target.checked);
  }

  handleAutoInterval = (valueInt: number) => {
    this.onPropertyChange('autoInterval', valueInt);
  }

  onSwitchChanged = (checked: boolean, name: string) => {
    this.onPropertyChange(name, checked);
  };

  private _onItemStyleChange = (newAppConfig, style) => {
    const { id, config: oldConfig, layoutInfo } = this.props;
    const { tempLayoutType } = this.state;
    const customType = [TemplateType.Custom1, TemplateType.Custom2];
    const tempWidgetSize = {
      CARD: { width: 516, height: 210 },
      LIST: { width: 300, height: 360 },
      SLIDE1: { width: 320, height: 380 },
      SLIDE2: { width: 320, height: 380 },
      SLIDE3: { width: 320, height: 380 },
      GALLERY: { width: 680, height: 230 },
      CUSTOM1: { width: 320, height: 380 },
      CUSTOM2: { width: 320, height: 380 },
    };
    let config = Immutable(defaultConfig);
    const wJson = newAppConfig.widgets[id];
    let newBookmarks;
    let nextAppConfig = newAppConfig;
    if(customType.indexOf(style) > -1){
      let newOriginLayoutId = newAppConfig.widgets[id].layouts[Status.Regular][newAppConfig.mainSizeMode];
      newBookmarks = oldConfig.bookmarks.map(item => {
        const { newLayoutId, eachAppConfig } = this.duplicateLayoutsEach(newOriginLayoutId, id, `Bookmark-${item.id}`, `Bookmark-${item.id}-label`, tempLayoutType, nextAppConfig);
        nextAppConfig = eachAppConfig;
        newOriginLayoutId = newLayoutId;
        return item = item.set('layoutName', `Bookmark-${item.id}`).set('layoutId', newLayoutId);
      });
    }
    if(customType.indexOf(oldConfig.templateType) > -1 && customType.indexOf(style) === -1) {
      newBookmarks = newAppConfig.widgets[id].config.bookmarks;
    }
    config = config.set('templateType', style).set('bookmarks', newBookmarks || oldConfig.bookmarks).set('isTemplateConfirm', false);
    config = config.set('isInitialed', true);
    const appConfigAction = getAppConfigAction(nextAppConfig);
    const layoutType = this.getLayoutType();
    if(layoutType === LayoutType.FixedLayout){
      appConfigAction.editLayoutItemSize(layoutInfo, tempWidgetSize[style].width, tempWidgetSize[style].height);
    }
    appConfigAction.editWidgetProperty(wJson.id, 'config', config).exec();
  }

  getLayoutType = (): LayoutType => {
    const { layoutInfo, appConfig } = this.props;
    const layoutId = layoutInfo.layoutId;
    const layoutType = appConfig?.layouts?.[layoutId]?.type;
    return layoutType;
  }

  duplicateLayoutsEach = (originLayoutId: string, widgetId: string, layoutName: string, layoutLabel: string, layoutType?: LayoutType, newAppConfig?: IMAppConfig) => {
    let { appConfig } = this.props;
    if(newAppConfig) appConfig = newAppConfig;
    const appConfigAction = getAppConfigAction(appConfig);
    const newLayoutId = appConfigAction.createEmptyLayoutForWidgetOnCurrentSizeMode(widgetId, layoutName, layoutLabel, layoutType);
    appConfigAction.duplicateLayoutItems(originLayoutId, newLayoutId, true);
    return { newLayoutId, eachAppConfig: appConfigAction.appConfig };
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      &.jimu-widget-bookmark-setting{
        .collapse-btn {
          margin-left: auto;
        }
        .resetting-template {
          cursor: pointer;
          color: ${theme.colors.palette.primary[700]};
        }
        .resetting-template:hover {
          cursor: pointer;
          color: ${theme.colors.palette.primary[800]};
        }
        .bookmark-setting {
          display: flex;
          flex-direction: column;
          height: 100%;
          .bookmark-setting-flex {
            flex: 1;
          }
        }
        .setting-bookmark-list {
          width: 100%;
          display: inline-block;
          margin-bottom: ${polished.rem(4)};
          .bookmark-edit-input {
            padding: 3px 0;
          }
        }
        .setting-bookmark-list:hover {
          cursor: pointer;
          background: ${theme.colors.secondary};
          border-left: 2px solid ${theme.colors.primary};
        }
        .active-mark {
          background: ${theme.colors.secondary};
          margin-bottom: 0 !important;
          border: 1px solid ${theme.colors.palette.light[600]};
          border-width: 1px 1px 0;
        }
        .active-mark-content {
          border: 1px solid ${theme.colors.palette.light[600]};
          border-width: 0 1px 1px;
          padding: ${polished.rem(8)};
          margin-bottom: ${polished.rem(4)};
        }
        .header-title-input {
          width: 110px;
        }
        .tips-pos {
          margin-top: -2px;
        }
        .template-group {
          .template-img {
            cursor: pointer;
            width: 100%;
            height: 70px;
            border: 1px solid ${theme.colors.palette.light[500]};
            background-color: ${theme.colors.white};
            &.active {
              border: 2px solid ${theme.colors.primary};
            }
            &.template-img-h {
              width: 109px;
              height: 109px;
            }
            &.template-img-gallery {
              width: 227px;
              height: 69px;
            }
          }
          .vertical-space {
            height: 10px;
          }
        }
        .drop-height {
          .dropdown-button {
            height: ${polished.rem(26)};
          }
        }
      }
    `
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuCoreMessages);
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] }, values);
  }

  handleTemplateTypeImageClick = evt => {
    const style = evt.currentTarget.dataset.value;
    const { id, config, appConfig } = this.props;
    const customType = [TemplateType.Custom1, TemplateType.Custom2];
    if(config.templateType === style) return;
    if(customType.indexOf(config.templateType) > -1) { // origin type is advanced
      let nextAppConfig = appConfig;
      const newBookmarks = config.bookmarks.map(item => {
        const { layoutName } = item;
        const appConfigAction = getAppConfigAction(nextAppConfig);
        const newAction = appConfigAction.removeLayoutFromWidget(id, layoutName);
        nextAppConfig = newAction.appConfig;
        return item.set('layoutId', '').set('layoutName', '');
      });
      const newConfig = config.set('bookmarks', newBookmarks).set('templateType', style);
      const appConfigAction = getAppConfigAction(nextAppConfig);
      appConfigAction.removeLayoutFromWidget(id, 'REGULAR');
      appConfigAction.editWidgetProperty(id, 'config', newConfig).exec();
      this.onTemplateTypeChanged(style, appConfigAction.appConfig);
    } else { // origin type is simple
      this.onTemplateTypeChanged(style);
    }
  }

  handleTemplateConfirmClick = evt => {
    this.onPropertyChange('isTemplateConfirm', true);
  }

  handleResetTemplateClick = () => {
    const { config } = this.props;
    if(config.templateType === TemplateType.Custom1 || config.templateType === TemplateType.Custom2) {
      this.setState({ changeCustomConfirmOpen: true });
    } else {
      this.onPropertyChange('isTemplateConfirm', false);
    }
  }

  handleChangeOk = () => {
    this.onPropertyChange('isTemplateConfirm', false);
    this.setState({ changeCustomConfirmOpen: false });
  }

  handleChangeClose = () => {
    this.setState({ changeCustomConfirmOpen: false });
  }

  handleMapChangeOk = () => {
    this.onPropertyChange('bookmarks', []);
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: this.toBeChnagedMapWidgetIds
    });
    this.setState({ confirmMapChangeOpen: false });
  }

  handleMapChangeClose = () => {
    const { useMapWidgetIds } = this.props;
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: []
    });
    this.setState({ confirmMapChangeOpen: false }, () =>{
      this.props.onSettingChange({
        id: this.props.id,
        useMapWidgetIds: useMapWidgetIds.asMutable()
      });
    });
  }

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.toBeChnagedMapWidgetIds = useMapWidgetIds;
    const { useMapWidgetIds: originMapWidgetIds } = this.props;
    if(!originMapWidgetIds || (originMapWidgetIds && originMapWidgetIds.length === 0)){
      this.handleMapChangeOk();
      return;
    }
    if(originMapWidgetIds && originMapWidgetIds[0] === useMapWidgetIds[0]){
      return;
    } else {
      this.setState({ confirmMapChangeOpen: true });
      // if(!config.runtimeUuid) {
      //   const runtimeUuid = utils.getLocalStorageAppKey();
      //   this.onMultiplePropertyChange([{name: 'runtimeUuid', value: runtimeUuid}, {name: 'bookmarks', value: []}]);
      // } else {
      //   this.onPropertyChange('bookmarks', []);
      // }
      // this.props.onSettingChange({
      //   id: this.props.id,
      //   useMapWidgetIds: useMapWidgetIds
      // });
    }
  }

  showBookmarkConfiger = (ref) => {
    this.markPopper = ref;
  }

  onBookmarkUpdated = (updateBookmark: Bookmark) => {
    const { config } = this.props;
    const oriBookmarks = config.bookmarks;
    const fixIndex = oriBookmarks.findIndex(x => x.id === updateBookmark.id);
    const newBookmark = oriBookmarks.map((item,index)=>{
      if(fixIndex === index){
        return updateBookmark;
      }
      return item;
    })
    this.onPropertyChange('bookmarks', newBookmark);
  }

  addNewBookmark = (bookmark: Bookmark) => {
    const { config } = this.props;
    this.setState({ activeId: bookmark.id as number });
    this.onPropertyChange('bookmarks', config.bookmarks.concat(bookmark));
  }

  getArrayMaxId(arr: ImmutableArray<Bookmark>): number{
    const numbers = arr.map(p => p.id);
    return numbers.length > 0 ? Math.max.apply(null, numbers) : 0;
  }

  onBookmarkTextChange = (id: number | string, newText: string, key: string) => {
    const { config } = this.props;
    const oriBookmarks = config.bookmarks;
    const fixIndex = oriBookmarks.findIndex(x => x.id === id);
    const newBookmark = oriBookmarks.map((item,index)=>{
      if(fixIndex === index){
        return item.set(key, newText);
      }
      return item;
    })
    this.onPropertyChange('bookmarks', newBookmark);
  }

  handleKeydown = (e: any, ref) => {
    if (e.keyCode === 13) {
      ref.current.blur();
    } else {
      return
    }
  }

  handleSelect = (id: number, bookmark: ImmutableObject<Bookmark>) => {
    const { activeId } = this.state;
    const dialogStatus = this.markPopper.getDialogStatus();
    if(!dialogStatus && activeId === id) {
      this.setState({ activeId: 0 });
      return;
    }
    this.setState({ activeId: id });
    this.markPopper.handleEditWhenOpen(bookmark);
    builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'activeBookmarkId', value: id});
    builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'settingChangeBookmark', value: true});
  }

  handleEditBookmark = (bookmark: ImmutableObject<Bookmark>, evt?: any) => {
    if(evt) evt.stopPropagation();
    this.setState({ activeId: bookmark.id as number });
    this.markPopper.handleNewOrEdit(bookmark);
  }

  handleDelete = (bookmark: ImmutableObject<Bookmark>, evt?: any) => {
    if(evt) evt.stopPropagation();
    const { id } = bookmark;
    const customType = [TemplateType.Custom1, TemplateType.Custom2];
    const { activeId } = this.state;
    const { id: widgetId, appConfig } = this.props;
    let { config } = this.props;
    const oriBookmarks = config.bookmarks;
    const index = oriBookmarks.findIndex(x => x.id === id);
    if(index === -1) return;
    const newBookmark = oriBookmarks.asMutable({deep: true});
    const dialogStatus = this.markPopper.getDialogStatus();
    let newEditActiveBookmark;
    if(activeId === newBookmark[index].id) {
      if(index !== 0) {
        newEditActiveBookmark = newBookmark[index-1];
      } else {// delete the first one
        if(newBookmark.length > 1) {
          newEditActiveBookmark = newBookmark[index+1];
        } else {// delete the only one
          this.markPopper.handleClickClose(true);
          newEditActiveBookmark = undefined;
          builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'lastFlag', value: true});
        }
      }
      newEditActiveBookmark && dialogStatus && this.handleEditBookmark(Immutable(newEditActiveBookmark));
    }
    if(customType.indexOf(config.templateType) > -1) {
      // delete bookmark layouts and bookmark
      const { layoutName } = newBookmark[index];
      const appConfigAction = getAppConfigAction(appConfig);
      appConfigAction.removeLayoutFromWidget(widgetId, layoutName);
      newBookmark.splice(index, 1);
      if(activeId === 0 && newBookmark.length >= 1) {
        newEditActiveBookmark = newBookmark[0];
      }
      const newImmutableArray = Immutable(newBookmark);
      config = config.set('bookmarks', newImmutableArray);
      appConfigAction.editWidgetProperty(widgetId, 'config', config).exec();
    } else {
      // only delete bookmark
      newBookmark.splice(index, 1);
      if(activeId === 0 && newBookmark.length >= 1) {
        newEditActiveBookmark = newBookmark[0];
      }
      const newImmutableArray = Immutable(newBookmark);
      this.onPropertyChange('bookmarks', newImmutableArray);
    }
    const newActiveId = (newEditActiveBookmark && newEditActiveBookmark.id) || activeId;
    this.setState({
      activeId: newActiveId,
    });
    builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'activeBookmarkId', value: newActiveId});
    builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'settingChangeBookmark', value: true});
  }

  onTabSelect = (imgSourceType: ImgSourceType) => {
    const { activeId } = this.state;
    const { config } = this.props;
    const oriBookmark = config.bookmarks;
    const fixIndex = oriBookmark.findIndex(x => x.id === activeId);
    const newBookmark = oriBookmark.map((item,index)=>{
      if(fixIndex === index){
        return item.set('imgSourceType', ImgSourceType[imgSourceType]);
      }
      return item;
    });
    this.onPropertyChange('bookmarks', newBookmark);
  }

  onResourceChange = (imageParam: ImageParam) => {
    const { activeId } = this.state;
    const { config } = this.props;
    const oriBookmark = config.bookmarks;
    const fixIndex = oriBookmark.findIndex(x => x.id === activeId);
    const newBookmark = oriBookmark.map((item,index)=>{
      if(fixIndex === index){
        return item.set('imgParam', imageParam);
      }
      return item;
    });
    this.onPropertyChange('bookmarks', newBookmark);
  }

  handleImageFillModeChange = (evt) => {
    const { activeId } = this.state;
    const { config } = this.props;
    const mode = evt?.target?.value
    const oriBookmark = config.bookmarks;
    const fixIndex = oriBookmark.findIndex(x => x.id === activeId);
    const newBookmark = oriBookmark.map((item,index)=>{
      if(fixIndex === index){
        return item.set('imagePosition', mode);
      }
      return item;
    });
    this.onPropertyChange('bookmarks', newBookmark);
  }

  handleShowSimpleClick = evt => {
    const { showSimple } = this.state;
    this.setState({ showSimple: !showSimple });
  }

  handleShowAdvanceClick = evt => {
    const { showAdvance } = this.state;
    this.setState({ showAdvance: !showAdvance });
  }

  handleShowArrangementClick = () => {
    const { showArrangement } = this.state;
    this.setState({ showArrangement: !showArrangement });
  }

  handlePageStyleChange = (evt) => {
    const value = evt?.target?.value
    this.onPropertyChange('pageStyle', value);
  }

  handleDisplayTypeChange = (evt) => {
    const value = evt?.target?.value
    this.onPropertyChange('displayType', value);
  }

  onTransitionTypeChange = (type: TransitionType) => {
    this.onPropertyChange('transition', type);
  }

  onTransitionDirectionChange = (dir: TransitionDirection) => {
    this.onPropertyChange('transitionDirection', dir);
  }

  getPageStyleOptions = (): JSX.Element[] => {
    return [
      <option key={PageStyle.Scroll} value={PageStyle.Scroll}>{this.formatMessage('scroll')}</option>,
      <option key={PageStyle.Paging} value={PageStyle.Paging}>{this.formatMessage('paging')}</option>
    ]
  }

  handleDirectionClick = (evt) => {
    const direction = evt.currentTarget.dataset.value;
    this.onPropertyChange('direction', direction);
  }

  handleSpaceChange = (valueFloat: number) => {
    this.onPropertyChange('space', valueFloat);
  }

  handleItemSizeChange = (value: number, isVertical: boolean) => {
    isVertical ? this.onPropertyChange('itemHeight', value) : this.onPropertyChange('itemWidth', value);
  }

  duplicateNewLayouts = (originLayoutId: string, widgetId: string, layoutName: string, layoutLabel: string, layoutType?: LayoutType, newAppConfig?: IMAppConfig) => {
    let { appConfig } = this.props;
    if(newAppConfig) appConfig = newAppConfig;
    const appConfigAction = getAppConfigAction(appConfig);
    const newLayoutId = appConfigAction.createEmptyLayoutForWidgetOnCurrentSizeMode(widgetId, layoutName, layoutLabel, layoutType);
    appConfigAction.duplicateLayoutItems(originLayoutId, newLayoutId, true);
    appConfigAction.exec();
    return newLayoutId;
  }

  renderTemplate = () => {
    const { config, theme } = this.props;
    const { showSimple, showAdvance } = this.state;

    return (
      <Fragment>
        <SettingSection title={this.formatMessage('chooseTemplateTip')}>
          <SettingRow flow="wrap" label={
            <div className="w-100 d-flex">
              <div className="text-truncate p-1">
                {this.formatMessage('simple')}
              </div>
              <Tooltip title={this.formatMessage('simpleTemplateTip')} showArrow={true} placement="left">
                <span className="mt-1 ml-2">
                  <Icon icon={require('jimu-ui/lib/icons/info-12.svg')} size={12} />
                </span>
              </Tooltip>
              <Button size={'sm'} type={'tertiary'} icon onClick={this.handleShowSimpleClick} className="collapse-btn">
                <Icon size={12} color={theme.colors.black} icon={showSimple ? arrowUp : arrowDown} />
              </Button>
            </div>
          }>
            <Collapse isOpen={showSimple} className="w-100">
              <div className="template-group w-100">
                <div className="d-flex justify-content-between w-100">
                  <div data-value={TemplateType.Card} onClick={this.handleTemplateTypeImageClick} title={this.formatMessage('typeCard')}>
                    <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Card && 'active'}`}
                      icon={require('./assets/tradition_card.svg')} />
                  </div>
                  <div data-value={TemplateType.List} onClick={this.handleTemplateTypeImageClick} title={this.formatMessage('typeList')}>
                    <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.List && 'active'}`}
                      icon={require('./assets/tradition_list.svg')} />
                  </div>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <div data-value={TemplateType.Gallery} onClick={this.handleTemplateTypeImageClick} style={{marginTop: 10}} title={this.formatMessage('typeGallery')}>
                    <Icon autoFlip={true} className={`template-img template-img-gallery ${config.templateType === TemplateType.Gallery && 'active'}`}
                      icon={require('./assets/presentation_gallery_h.svg')} />
                  </div>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <div data-value={TemplateType.Slide1} onClick={this.handleTemplateTypeImageClick} style={{marginTop: 10}} title={this.formatMessage('slideOne')}>
                    <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Slide1 && 'active'}`}
                      icon={require('./assets/presentation_slide1.svg')} />
                  </div>
                  <div data-value={TemplateType.Slide2} onClick={this.handleTemplateTypeImageClick} style={{marginTop: 10}} title={this.formatMessage('slideTwo')}>
                    <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Slide2 && 'active'}`}
                      icon={require('./assets/presentation_slide2.svg')} />
                  </div>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <div data-value={TemplateType.Slide3} onClick={this.handleTemplateTypeImageClick} style={{marginTop: 10}} title={this.formatMessage('slideThree')}>
                    <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Slide3 && 'active'}`}
                      icon={require('./assets/presentation_slide3.svg')} />
                  </div>
                </div>
                {/* <div className="vertical-space" /> */}
                {/* <div data-value={TemplateType.Navigator} onClick={this.handleTemplateTypeImageClick} style={{marginTop: 10}} title="Navigator">
                  <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Navigator && 'active'}`}
                    icon={require('./assets/presentation_navigator.svg')} />
                </div> */}
              </div>
            </Collapse>
          </SettingRow>

          <SettingRow flow="wrap" label={
            <div className="w-100 d-flex">
              <div className="text-truncate p-1">
                {this.formatMessage('advance')}
              </div>
              <Tooltip title={this.formatMessage('advancedTemplateTip')} showArrow={true} placement="left">
                <span className="mt-1 ml-2">
                  <Icon icon={require('jimu-ui/lib/icons/info-12.svg')} size={12} />
                </span>
              </Tooltip>
              <Button size={'sm'} type={'tertiary'} icon onClick={this.handleShowAdvanceClick} className="collapse-btn">
                <Icon size={12} color={theme.colors.black} icon={showAdvance ? arrowUp : arrowDown} />
              </Button>
            </div>
          }>
            <Collapse isOpen={showAdvance} className="w-100">
              <div className="template-group w-100">
                <div className="d-flex justify-content-between w-100">
                  <div data-value={TemplateType.Custom1} onClick={this.handleTemplateTypeImageClick} title={this.formatMessage('customOne')}>
                    <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Custom1 && 'active'}`}
                      icon={require('./assets/custom_template1.svg')} />
                  </div>
                  <div data-value={TemplateType.Custom2} onClick={this.handleTemplateTypeImageClick} title={this.formatMessage('customTwo')}>
                    <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Custom2 && 'active'}`}
                      icon={require('./assets/custom_template2.svg')} />
                  </div>
                </div>
              </div>
            </Collapse>
          </SettingRow>

          <SettingRow>
            <Button type="primary" className="w-100" onClick={this.handleTemplateConfirmClick} >{this.formatMessage('next')}</Button>
          </SettingRow>
        </SettingSection>
      </Fragment>
    )
  }

  onTransitionSettingChange = (transition: Transition) => {
    const transitionInfo = this.props.config.transitionInfo.asMutable({deep: true});
    transitionInfo.transition = transition;
    this.onConfigChange(['transitionInfo'], Immutable(transitionInfo));
  }

  previewTransitionAndOnebyOne = () => {
    this.onConfigChange(['transitionInfo', 'previewId'], Symbol());
  }

  renderArrangementSetting = () => {
    const { config, theme } = this.props;
    const { transitionInfo } = config;
    const { showArrangement } = this.state;
    const isVertical = config.direction === DirectionType.Vertical;

    return (
      <SettingRow flow="wrap" label={
        <div className="w-100 d-flex justify-content-between">
          <div className="text-truncate">
            {this.formatMessage('arrangement')}
          </div>
          <Button size={'sm'} type={'tertiary'} icon onClick={this.handleShowArrangementClick}>
            <Icon size={12} color={theme.colors.black} icon={showArrangement ? arrowUp : arrowDown} />
          </Button>
        </div>
      }>
        <Collapse isOpen={showArrangement} className="w-100">
          <SettingRow label={this.formatMessage('pagingStyle')} flow="wrap">
            <Select value={config.pageStyle} onChange={this.handlePageStyleChange} className="drop-height">
              {this.getPageStyleOptions()}
            </Select>
          </SettingRow>
          {config.pageStyle !== PageStyle.Scroll &&
            <Fragment>
              <SettingRow>
                <div className="d-flex w-100">
                  <Checkbox
                    data-field="initBookmark"
                    onClick={this.handleCheckboxChange}
                    checked={config.initBookmark}
                  />
                  <div className="text-truncate ml-2" title={this.formatMessage('initBookmark')}>{this.formatMessage('initBookmark')}</div>
                  <Tooltip title={this.formatMessage('initBookmarkTips')} showArrow={true} placement="left">
                    <span className="inline-block ml-2 tips-pos">
                      <Icon icon={require('jimu-ui/lib/icons/info-12.svg')} size={12} />
                    </span>
                  </Tooltip>
                </div>
              </SettingRow>
              <SettingRow>
                <div className="d-flex justify-content-between w-100">
                  <label className="w-75 text-truncate d-inline-block font-dark-600">{this.formatMessage('autoPlayAllow')}</label>
                  <Switch className="can-x-switch" checked={(config && config.autoPlayAllow) || false}
                    data-key="autoRefresh" onChange={evt => {this.onSwitchChanged(evt.target.checked, 'autoPlayAllow')}} />
                </div>
              </SettingRow>
              {config.autoPlayAllow &&
                <Fragment>
                  <SettingRow flow="wrap" label={`${this.formatMessage('autoInterval')} (${this.formatMessage('second')})`}>
                    <NumericInput
                      style={{ width: '100%' }}
                      value={config.autoInterval || 3}
                      min={2}
                      max={60}
                      onChange={this.handleAutoInterval}
                    />
                  </SettingRow>
                  <SettingRow>
                    <div className="d-flex w-100">
                      <Checkbox
                        data-field="autoLoopAllow"
                        onClick={this.handleCheckboxChange}
                        checked={config.autoLoopAllow} />
                      <div style={{ marginLeft: polished.rem(8) }} className="text-truncate">{this.formatMessage('autoLoopAllow')}</div>
                    </div>
                  </SettingRow>
                </Fragment>
              }
            </Fragment>
          }
          {config.pageStyle !== PageStyle.Paging &&
            <SettingRow label={this.formatMessage('direction')}>
              <ButtonGroup size="sm" >
                {
                  directions.map((data, i) => {
                    return <Button key={i} icon active={config.direction === data.value}
                      data-value={data.value}
                      onClick={this.handleDirectionClick}>
                      <Icon size={12} icon={data.icon} />
                    </Button>
                  })
                }
              </ButtonGroup>
            </SettingRow>
          }
          {config.pageStyle === PageStyle.Paging &&
            <SettingRow label={this.formatMessage('transition')} flow="wrap">
              <TransitionSetting
                transition={transitionInfo?.transition}
                onTransitionChange={this.onTransitionSettingChange}
                onPreviewAsAWhoneClicked={this.previewTransitionAndOnebyOne}
                formatMessage={this.formatMessage}
                showOneByOne={false}
              />
            </SettingRow>
          }
          {config.pageStyle === PageStyle.Scroll &&
            <Fragment>
              <SettingRow flow="wrap" label={`${isVertical ? this.formatMessage('itemHeight') : this.formatMessage('itemWidth')}(px)`}>
                <NumericInput
                  style={{ width: '100%' }}
                  value={(isVertical ? config.itemHeight : config.itemWidth) || 240}
                  onChange={(value) => this.handleItemSizeChange(value, isVertical)}
                />
              </SettingRow>
              <SettingRow flow="wrap" label={(isVertical ? this.formatMessage('verticalSpacing') : this.formatMessage('horizontalSpacing')) + ' (px)'}>
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <Slider
                    style={{ width: '60%' }}
                    data-field="space"
                    onChange={this.handleFormChange}
                    value={config.space}
                    title="0-50"
                    size="sm"
                    min={0}
                    max={50}
                  />
                  <NumericInput
                    style={{ width: '25%' }}
                    value={config.space}
                    min={0}
                    max={50}
                    title="0-50"
                    onChange={this.handleSpaceChange}
                  />
                </div>
              </SettingRow>
            </Fragment>
          }
        </Collapse>
      </SettingRow>
    )
  }

  renderDataSetting = () => {
    const { id, theme, useDataSources, useMapWidgetIds, config } = this.props;
    const { activeId, tempLayoutType } = this.state;
    const activeBookmark = config.bookmarks.find(x => x.id === activeId);
    const activeImgName = activeBookmark?.imgParam?.originalName;
    const activeName = (activeBookmark && activeBookmark.name) ? activeBookmark.name : '---';
    const slideType = [TemplateType.Slide1, TemplateType.Slide2, TemplateType.Slide3];
    const runtimeType = [TemplateType.Slide1, TemplateType.Slide2, TemplateType.Slide3, TemplateType.Custom1, TemplateType.Custom2];
    const noImgType = [TemplateType.List, TemplateType.Custom1, TemplateType.Custom2];
    const customType = [TemplateType.Custom1, TemplateType.Custom2];

    return (
      <div className="bookmark-setting">
        <SettingSection>
          <SettingRow flow="wrap">
            <span className="w-100 overflow-hidden">
              <a className="resetting-template w-100 text-break" onClick={this.handleResetTemplateClick} >{this.formatMessage('resettingTheTemplate')}</a>
              {customType.indexOf(config.templateType) > -1 &&
                <Fragment>
                  {this.formatMessage('customBookmarkDesign')}
                  <Tooltip title={this.formatMessage('customTips')} showArrow={true} placement="left">
                    <span className="inline-block ml-2">
                      <Icon icon={require('jimu-ui/lib/icons/info-12.svg')} size={12} />
                    </span>
                  </Tooltip>
                </Fragment>
              }
            </span>
          </SettingRow>
          <SettingRow label={this.formatMessage('selectMapWidget')}>
          </SettingRow>
          <SettingRow>
            <JimuMapViewSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={useMapWidgetIds} />
          </SettingRow>
          {this.props.useMapWidgetIds && this.props.useMapWidgetIds.length === 1 &&
            <SettingRow>
              <MarkPopper
                id={id}
                theme={theme}
                title={`${this.formatMessage('setBookmarkView')}: ${activeName}`}
                buttonLabel={this.formatMessage('addBookmark')}
                useDataSources={useDataSources}
                useMapWidgetIds={useMapWidgetIds}
                jimuMapConfig={config}
                onBookmarkUpdated={this.onBookmarkUpdated}
                onShowBookmarkConfiger={(ref) => this.showBookmarkConfiger(ref)}
                maxBookmarkId={this.getArrayMaxId(config.bookmarks)}
                activeBookmarkId={activeId}
                onAddNewBookmark={this.addNewBookmark}
                formatMessage={this.formatMessage}
                duplicateNewLayouts={this.duplicateNewLayouts}
                tempLayoutType={tempLayoutType}
                isUseWidgetSize
              />
            </SettingRow>
          }
          {config.bookmarks && config.bookmarks.length !== 0 &&
            <SettingRow>
              <div className={'w-100'}>
                {config.bookmarks.map((item, index) => {
                  const titleTextInput = React.createRef<HTMLInputElement>();
                  return <Fragment key={index}>
                    <div className={`${activeId === item.id ? 'active-mark' : ''} setting-bookmark-list`} onClick={() => this.handleSelect(item.id as number,item)}>
                      <TextInput className="header-title-input h5 bookmark-edit-input" ref={titleTextInput} size="sm"
                        title={item.name} value={item.name || ''}
                        onChange={evt => this.onBookmarkTextChange(item.id, evt.target.value, 'name')}
                        onClick={evt => evt.stopPropagation()}
                        onKeyDown={(e) => this.handleKeydown(e, titleTextInput)}>
                      </TextInput>
                      {
                        <span className="float-right">
                          <Button title={this.formatMessage('changeBookmarkView')} onClick={(evt) => this.handleEditBookmark(item, evt)} type="tertiary" icon>
                            <Icon icon={require('jimu-ui/lib/icons/widget-map.svg')} size={12}/>
                          </Button>
                          <Button title={this.formatMessage('deleteOption')} onClick={(evt) => this.handleDelete(item, evt)} type="tertiary" icon>
                            <Icon icon={require('jimu-ui/lib/icons/delete.svg')} size={12}/>
                          </Button>
                        </span>
                      }
                    </div>
                    {
                      ((noImgType.indexOf(config.templateType) === -1) && activeId === item.id) &&
                      <div className="active-mark-content">
                        <SettingRow label={this.formatMessage('imageSource')} className="mb-2"></SettingRow>
                        <Tabs fill pills onTabSelect={this.onTabSelect}>
                          <Tab id="Snapshot" defaultActive={!item.imgSourceType || item.imgSourceType === ImgSourceType.Snapshot} title={this.formatMessage('imageSnapshot')}>
                            <div className="mt-2"></div>
                          </Tab>
                          <Tab id="Custom" defaultActive={item.imgSourceType === ImgSourceType.Custom} title={this.formatMessage('custom')}>
                            <div className="mt-2">
                              <SettingRow>
                                <div className="w-100 d-flex align-items-center mb-1 mt-1">
                                  <div style={{minWidth: '60px'}}>
                                    <ImageSelector
                                      buttonClassName="text-dark d-flex justify-content-center btn-browse"
                                      widgetId={this.props.id}
                                      buttonLabel={this.formatMessage('setAnImage')}
                                      buttonSize="sm"
                                      onChange={this.onResourceChange}
                                      imageParam={item.imgParam}
                                    />
                                  </div>
                                  <div style={{width: '70px'}} className="uploadFileName ml-2 text-truncate" title={activeImgName ? activeImgName : this.formatMessage('none')}>
                                    {activeImgName ? activeImgName : this.formatMessage('none')}
                                  </div>
                                </div>
                              </SettingRow>
                            </div>
                          </Tab>
                        </Tabs>
                        <SettingRow label={this.formatMessage('imagePosition')} className="mt-2">
                          <div style={{width: '40%'}}>
                            <Select size="sm" value={item.imagePosition} onChange={this.handleImageFillModeChange}>
                              <option key={0} value={ImageFillMode.Fill}>{this.formatMessage('fill')}</option>
                              <option key={1} value={ImageFillMode.Fit}>{this.formatMessage('fit')}</option>
                            </Select>
                          </div>
                        </SettingRow>
                        {(slideType.indexOf(config.templateType) > -1) &&
                          <SettingRow  flow="wrap" label={this.formatMessage('description')} className="mb-2">
                            <TextInput
                              type="textarea"
                              className="w-100"
                              title={item.description}
                              value={item.description || ''}
                              onChange={evt => this.onBookmarkTextChange(item.id, evt.target.value, 'description')}
                              spellCheck={false}
                            />
                          </SettingRow>
                        }
                      </div>
                    }
                  </Fragment>
                })}
              </div>
            </SettingRow>
          }
        </SettingSection>

        <SettingSection>
          <SettingRow label={this.formatMessage('drawingDisplay')} flow="wrap">
            <Select value={config.displayType} onChange={this.handleDisplayTypeChange} className="drop-height">
              <option value={DisplayType.All}>{this.formatMessage('displayAll')}</option>
              <option value={DisplayType.Selected}>{this.formatMessage('displaySelected')}</option>
            </Select>
          </SettingRow>
          {config.templateType === TemplateType.Gallery &&
            <Fragment>
              <SettingRow label={this.formatMessage('galleryDirection')}>
                <ButtonGroup size="sm" >
                  {
                    directions.map((data, i) => {
                      return <Button key={i} icon active={config.direction === data.value}
                        data-value={data.value}
                        onClick={this.handleDirectionClick}>
                        <Icon size={12} icon={data.icon} />
                      </Button>
                    })
                  }
                </ButtonGroup>
              </SettingRow>
            </Fragment>
          }
          {/* <SettingRow>
            <div className="d-flex w-100">
              <Checkbox
                data-field="initBookmark"
                onClick={this.handleCheckboxChange}
                checked={config.initBookmark}
              />
              <div className="text-truncate ml-2" title={this.formatMessage('initBookmark')}>{this.formatMessage('initBookmark')}</div>
              <Tooltip title={this.formatMessage('initBookmarkTips')} showArrow={true} placement="left">
                <span className="inline-block ml-2 tips-pos">
                  <Icon icon={require('jimu-ui/lib/icons/info-12.svg')} size={12} />
                </span>
              </Tooltip>
            </div>
          </SettingRow> */}
          {(runtimeType.indexOf(config.templateType) === -1) &&
            <SettingRow>
              <div className="d-flex w-100">
                <Checkbox
                  data-field="runtimeAddAllow"
                  onClick={this.handleCheckboxChange}
                  checked={config.runtimeAddAllow} />
                <div className="text-truncate ml-2" title={this.formatMessage('runtimeAddAllow')}>{this.formatMessage('runtimeAddAllow')}</div>
              </div>
            </SettingRow>
          }
          {(customType.indexOf(config.templateType) === -1) &&
            <SettingRow>
              <div className="d-flex w-100">
                <Checkbox
                  data-field="displayFromWeb"
                  onClick={this.handleCheckboxChange}
                  checked={config.displayFromWeb} />
                <div className="text-truncate ml-2" title={this.formatMessage('displayFromWeb')}>{this.formatMessage('displayFromWeb')}</div>
              </div>
            </SettingRow>
          }
          {(runtimeType.indexOf(config.templateType) > -1) && this.renderArrangementSetting()}
        </SettingSection>
      </div>
    )
  }

  render() {
    const { config } = this.props;
    const { changeCustomConfirmOpen, confirmMapChangeOpen } = this.state;

    return (
      <Fragment>
        <div className={classNames(`${prefix}bookmark-setting`, `${prefix}setting`)} css={this.getStyle(this.props.theme)} >
          {config.isTemplateConfirm ? this.renderDataSetting(): this.renderTemplate()}
        </div>
        {
          changeCustomConfirmOpen &&
          <Modal className={classNames('d-flex justify-content-center')} isOpen={changeCustomConfirmOpen} centered={true}>
            <ModalBody className="text-break">
              {this.formatMessage('changeRemind')}
            </ModalBody>
            <ModalFooter>
              <Button type="danger" onClick={this.handleChangeOk}>
                {this.formatMessage('commonModalOk')}
              </Button>
              <Button type="secondary" onClick={this.handleChangeClose}>
                {this.formatMessage('commonModalCancel')}
              </Button>
            </ModalFooter>
          </Modal>
        }
        {
          confirmMapChangeOpen &&
          <Modal isOpen={confirmMapChangeOpen} centered={true}>
            <ModalBody className="text-break">
              {this.formatMessage('switchRemind')}
            </ModalBody>
            <ModalFooter>
              <Button type="primary" onClick={this.handleMapChangeOk}>
                {this.formatMessage('yes')}
              </Button>
              <Button type="secondary" onClick={this.handleMapChangeClose}>
                {this.formatMessage('commonModalCancel')}
              </Button>
            </ModalFooter>
          </Modal>
        }
      </Fragment>
    );
  }
}
