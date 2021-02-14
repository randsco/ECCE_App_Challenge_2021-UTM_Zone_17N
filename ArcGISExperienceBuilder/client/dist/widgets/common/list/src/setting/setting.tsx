/** @jsx jsx */
import {
  classNames, Immutable, DataSource, IMState, React,
  IMAppConfig, ThemeVariables, SerializedStyles, css, jsx, IMThemeVariables,
  polished, AppMode, BrowserSizeMode, UseDataSource, DataSourceComponent,
  getAppStore, ImmutableArray, DataSourceJson, JimuFieldType,
  OrderByOption, IMSqlExpression, SqlExpression, urlUtils, expressionUtils
} from 'jimu-core';
import {
  AllWidgetSettingProps,
  getAppConfigAction, builderAppSync, templateUtils
} from 'jimu-for-builder';
import { searchUtils, defaultMessages as jimuLayoutsDefaultMessages} from 'jimu-layouts/layout-runtime';
import { SettingSection, SettingRow, SortSetting, SortSettingOption, LinkSettingPopup, IMLinkParam, DirectionSelector} from 'jimu-ui/advanced/setting-components';
import { BackgroundSetting, BorderSetting, BorderRadiusSetting } from 'jimu-ui/advanced/style-setting-components';
import {
  Slider, Select, Switch, Checkbox, Icon, Button,
  MultiSelect, MultiSelectItem, Collapse, defaultMessages as jimuUIDefaultMessages, Tooltip, TextInput
} from 'jimu-ui';
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector';
import { IMConfig, PageStyle, ItemStyle, DirectionType, SelectionModeType, Status, CardSize, LIST_CARD_MIN_SIZE } from '../config';
import defaultMessages from './translations/default';
import { Fragment } from 'react';
import { SqlExpressionBuilderPopup } from 'jimu-ui/advanced/sql-expression-builder';
import { handleResizeCard } from '../common-builder-support';
import { getJimuFieldNamesBySqlExpression } from 'jimu-ui/basic/sql-expression-runtime';
import { MyNumericInput } from './components/my-input';
import { Template } from 'jimu-for-builder/templates';

const prefix = 'jimu-widget-';

const IconRefresh = require('jimu-ui/lib/icons/link-12.svg');

const arrowDown = require('jimu-ui/lib/icons/arrow-down-12.svg');
const arrowUp = require('jimu-ui/lib/icons/arrow-up-12.svg');

const originAllStyles: {[key: string]: Template} = {
  STYLE0: require('./template/card-style0.json'),
  STYLE1: require('./template/card-style1.json'),
  STYLE2: require('./template/card-style2.json'),
  STYLE3: require('./template/card-style3.json'),
  STYLE4: require('./template/card-style4.json'),
  STYLE5: require('./template/card-style5.json'),
  STYLE6: require('./template/card-style6.json'),
  STYLE7: require('./template/card-style7.json')
}

let AllStyles: {[key: string]: Template};
const MESSAGES = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuLayoutsDefaultMessages);

function initStyles(widgetId: string){
  if(AllStyles){
    return AllStyles;
  }
  AllStyles = {};
  Object.keys(originAllStyles).forEach(style => {
    AllStyles[style] = templateUtils.processForTemplate(originAllStyles[style], widgetId, MESSAGES)
  })
}

// const getAlignTypes = (direction: DirectionType) => {
//   return direction === DirectionType.Horizon ? [
//     {icon: require('jimu-ui/lib/icons/align-v-top-10.svg'), value: AlignType.Start},
//     {icon: require('jimu-ui/lib/icons/align-v-center-10.svg'), value: AlignType.Center},
//     {icon: require('jimu-ui/lib/icons/align-v-bottom-10.svg'), value: AlignType.End}
//   ] :
//   [
//     {icon: require('jimu-ui/lib/icons/align-h-left-10.svg'), value: AlignType.Start},
//     {icon: require('jimu-ui/lib/icons/align-h-center-10.svg'), value: AlignType.Center},
//     {icon: require('jimu-ui/lib/icons/align-h-right-10.svg'), value: AlignType.End}
//   ]
// }

// const pageTransitions = [
//   {label: 'Glide', icon: require('./assets/img-glide.svg'), value: PageTransitonType.Glide},
//   {label: 'Fade', icon: require('./assets/img-fade.svg'), value: PageTransitonType.Fade},
//   {label: 'Float', icon: require('./assets/img-float.svg'), value: PageTransitonType.Float},
// ]

interface State {
  datasource: DataSource;
  isTextExpPopupOpen: boolean;
  currentTextInput: string;
  isTipExpPopupOpen: boolean;
  isLinkSettingShown: boolean;
  isSqlExprShow: boolean;
  showItemStyle: boolean;
  showTools: boolean;
  showArrangement: boolean;
}

interface ExtraProps {
  appConfig: IMAppConfig;
  appTheme: ThemeVariables;
  appMode: AppMode;
  browserSizeMode: BrowserSizeMode;
  showCardSetting: Status;
  selectionIsInSelf: boolean;
}

interface CustomeProps {
  theme: IMThemeVariables
}

const DSSelectorTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State> {
  needUpdateFields: boolean;
  listUseTipRef: any;
  lastHoverLayout = {
    layout: [],
    widgets: {}
  };
  lastSelectedLayout = {
    layout: [],
    widgets: {}
  };
  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    const { id } = props;
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme,
      appMode: state && state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo && state.appStateInBuilder.appRuntimeInfo.appMode,
      browserSizeMode: state && state.appStateInBuilder && state.appStateInBuilder.browserSizeMode,
      showCardSetting: state && state.appStateInBuilder && state.appStateInBuilder.widgetsState
        && state.appStateInBuilder.widgetsState[id] && state.appStateInBuilder.widgetsState[id]['showCardSetting'] || Status.Regular,
      selectionIsInSelf: state?.appStateInBuilder?.widgetsState[id]?.selectionIsInSelf
    }
  }


  constructor(props) {
    super(props);
    initStyles(props.id)
    this.state = {
      datasource: null,
      isTextExpPopupOpen: false,
      currentTextInput: '',
      isTipExpPopupOpen: false,
      isLinkSettingShown: false,
      isSqlExprShow: false,
      showItemStyle: false,
      showTools: false,
      showArrangement: false
    };
    this.listUseTipRef = React.createRef();
  }

  componentDidMount(){
    const { config, id, useDataSourcesEnabled } = this.props;
    let { appConfig } = this.props;
    if (!config.isInitialed) {
      if (!useDataSourcesEnabled) {
        appConfig = getAppConfigAction().editWidget(appConfig.widgets[id].set('useDataSourcesEnabled', true) as any).appConfig;
      }
      this.onItemStyleChanged(config.itemStyle, appConfig);
    }
  }

  onPropertyChange = (name, value) => {
    const { config } = this.props;

    if (value === config[name]) {
      return;
    }
    if (name === 'sorts' || name === 'filter' || name === 'searchFields') {
      this.needUpdateFields = true;
    }
    const newConfig = config.set(name, value);
    this.onConfigChange(newConfig);
  };

  changeUsedFields = () => {
    const { useDataSources } = this.props;
    if (useDataSources && useDataSources[0]) {
      const useDS = useDataSources[0].asMutable({ deep: true });
      useDS.fields = this.getAllFields();
      const alterProps = {
        id: this.props.id,
        useDataSources: [useDS]
      }
      this.props.onSettingChange(alterProps);
    }
  }

  onConfigChange = (newConfig) => {

    const alterProps = {
      id: this.props.id,
      config: newConfig
    };
    this.props.onSettingChange(alterProps);

  };

  onBackgroundStyleChange = (status: Status, key, value) => {
    let { config } = this.props;
    config = config.setIn(['cardConfigs', status, 'backgroundStyle', key], value);
    this.onConfigChange(config);
  }

  onSelectionModeChange = (evt) => {
    const value = evt.target.value;
    this.changeSelectionMode(value);
  }

  private changeSelectionMode = (value: SelectionModeType) => {
    const { id, layouts, browserSizeMode, appConfig } = this.props;
    let { config } = this.props;
    if (config.cardConfigs[Status.Selected].selectionMode === value) {
      return;
    }
    let action = getAppConfigAction();
    if (config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None && value === SelectionModeType.None) {//remove selected layout
      const desLayoutId = searchUtils.findLayoutId(layouts[Status.Selected], browserSizeMode, appConfig.mainSizeMode);
      action = action.resetLayout(desLayoutId, true);
      this.changeBuilderStatus(Status.Regular);
    } else if (config.cardConfigs[Status.Selected].selectionMode === SelectionModeType.None && value !== SelectionModeType.None) {
      const oriLayoutId = searchUtils.findLayoutId(layouts[Status.Regular], browserSizeMode, appConfig.mainSizeMode);
      const desLayoutId = searchUtils.findLayoutId(layouts[Status.Selected], browserSizeMode, appConfig.mainSizeMode);
      action = action.duplicateLayoutItems(oriLayoutId, desLayoutId, false);
      this.changeBuilderStatus(Status.Selected);
    }
    config = config.setIn(['cardConfigs', Status.Selected, 'selectionMode'], value);
    action.editWidgetConfig(id, config).exec();
  }

  onSelectionSwitch = (evt) => {
    const selected = evt.target.checked;
    if (selected) {
      this.changeSelectionMode(SelectionModeType.Single);
    } else {
      this.changeSelectionMode(SelectionModeType.None);
    }
  }

  onHoverLayoutOpenChange = (evt) => {
    const { config, id, layouts, browserSizeMode, appConfig } = this.props;
    const value = evt.target.checked;
    if (config.cardConfigs[Status.Hover].enable === value) return;
    let action = getAppConfigAction();
    if (config.cardConfigs[Status.Hover].enable && !value) {//remove hover layout
      const desLayoutId = searchUtils.findLayoutId(layouts[Status.Hover], browserSizeMode, appConfig.mainSizeMode);
      action = action.resetLayout(desLayoutId, true);
      this.changeBuilderStatus(Status.Regular);
    } else if (!config.cardConfigs[Status.Hover].enable && value) {
      const oriLayoutId = searchUtils.findLayoutId(layouts[Status.Regular], browserSizeMode, appConfig.mainSizeMode);
      const desLayoutId = searchUtils.findLayoutId(layouts[Status.Hover], browserSizeMode, appConfig.mainSizeMode);
      action = action.duplicateLayoutItems(oriLayoutId, desLayoutId, false);
      this.changeBuilderStatus(Status.Hover);
    }
    const newConfig = config.setIn(['cardConfigs', Status.Hover, 'enable'], value);
    action.editWidgetConfig(id, newConfig).exec();
  }

  onOpenCardSetting = (evt) => {
    const status = evt.currentTarget.dataset.value;
    this.changeCardSettingAndBuilderStatus(status)
  }

  // Export list template, use it in a single fullscreen page
  onExportClick = (evt) => {
    const { appConfig, layouts, id, browserSizeMode } = this.props;
    const currentPageId = getAppStore().getState().appStateInBuilder.appRuntimeInfo.currentPageId;
    const pageJson = appConfig.pages[currentPageId === 'default' ? 'home' : currentPageId];

    const pageTemplates = [
      {
        widgetId: id,
        config: {
          layouts: appConfig.layouts.without(pageJson.layout[browserSizeMode], layouts[Status.Selected][browserSizeMode], layouts[Status.Hover][browserSizeMode]),
          widgets: appConfig.widgets.without(id),
          views: appConfig.views,
          sections: appConfig.sections
        }
      }
    ]


    const template0 = pageTemplates[0];
    template0.config.layouts && Object.keys(template0.config.layouts).forEach(layoutId => {
      let layoutJson = template0.config.layouts[layoutId].without('id');
      layoutJson.content && Object.keys(layoutJson.content).forEach(lEId => {
        const lEJson = (layoutJson.content[lEId] as any).without('id', 'parentId', 'layoutId').setIn(['setting', 'lockParent'], true);
        layoutJson = layoutJson.setIn(['content', lEId], lEJson);
      })
      template0.config.layouts = template0.config.layouts.set(layoutId, layoutJson);
    })

    template0.config.widgets && Object.keys(template0.config.widgets).forEach((wId, index) => {
      const wJson = template0.config.widgets[wId];
      template0.config.widgets = template0.config.widgets.set(wId, wJson.without('context', 'icon', 'label', 'manifest', '_originManifest',
        'version', 'id', 'useDataSourcesEnabled', 'useDataSources'))
    })

    template0.config.sections && Object.keys(template0.config.sections).forEach((sId, index) => {
      const sJson = template0.config.sections[sId];
      template0.config.sections = template0.config.sections.set(sId, sJson.without('id', 'label'));
    })

    template0.config.views && Object.keys(template0.config.views).forEach((vId, index) => {
      const vJson = template0.config.views[vId];
      template0.config.views = template0.config.views.set(vId, vJson.without('id', 'label'));
    })
    console.log(JSON.stringify(pageTemplates[0]));


    // const wJson = appConfig.widgets[this.props.id];
    // let embedLayoutJson = appConfig.layouts[wJson.layouts[Status.Regular].LARGE]

    // const template = {
    //   cardSize: config.cardSize,
    //   cardSpace: config.space,
    //   layout: [],
    //   widgets: {}
    // }
    // Object.keys(embedLayoutJson).forEach((key) => {
    //   if(key === 'id' || key === 'ROOT_ID')return;
    //   let layoutEle = embedLayoutJson[key];
    //   if (layoutEle.type === LayoutItemType.Widget && layoutEle.widgetId){
    //     template.widgets[layoutEle.widgetId] = appConfig.widgets[layoutEle.widgetId].without('context', 'icon', 'label', 'manifest', '_originManifest', 'version', 'useDataSources');
    //     template.layout.push(layoutEle);
    //   }
    // });
    // console.log(JSON.stringify(template));
  }

  onCardSettingReturnBackClick = (evt) => {
    this.changeCardSettingAndBuilderStatus(Status.Regular);
  }

  showSqlExprPopup = () => {
    this.setState({ isSqlExprShow: true });
  }

  toggleSqlExprPopup = () => {
    const { isSqlExprShow } = this.state;
    this.setState({ isSqlExprShow: !isSqlExprShow });
  }

  onSqlExprBuilderChange = (sqlExprObj: IMSqlExpression) => {
    this.onPropertyChange('filter', sqlExprObj);
  }

  private changeCardSettingAndBuilderStatus = (status: Status) => {
    const { id, config } = this.props;
    builderAppSync.publishChangeWidgetStatePropToApp({
      widgetId: id,
      propKey: 'showCardSetting',
      value: status
    });
    if (status === Status.Regular ||
      (status === Status.Hover && config.cardConfigs[Status.Hover].enable) ||
      (status === Status.Selected && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None)) {
      this.changeBuilderStatus(status)
    }
  }

  private switchLoading = (show: boolean) => {
    const {id} = this.props;
    builderAppSync.publishChangeWidgetStatePropToApp({
      widgetId: id,
      propKey: 'showLoading',
      value: show
    });
  }

  private changeBuilderStatus = (status: Status) => {
    const { id } = this.props;
    builderAppSync.publishChangeWidgetStatePropToApp({
      widgetId: id,
      propKey: 'builderStatus',
      value: status
    });
  }

  onItemStyleChanged = (style: ItemStyle, updatedAppConfig = undefined) => {
    // if(this.props.appMode === AppMode.Run) return;
    this.switchLoading(true)
    const { id } = this.props;
    let { appConfig } = this.props;
    if (updatedAppConfig) {
      appConfig = updatedAppConfig;
    }
    const styleTemp = AllStyles[style];
    templateUtils.updateWidgetByTemplate(appConfig, styleTemp, id, styleTemp.widgetId, {}, defaultMessages).then(newAppConfig => {
      this._onItemStyleChange(newAppConfig, style)
      this.switchLoading(false)
    })
  }

  private getCardSize = (props): CardSize => {
    props = props || this.props;
    const { config, builderStatus, browserSizeMode } = props;
    let cardConfigs = config.cardConfigs[builderStatus];
    if (!cardConfigs || !cardConfigs.cardSize) {
      cardConfigs = config.cardConfigs[Status.Regular];
    }
    let cardSize = cardConfigs.cardSize[browserSizeMode];
    if (!cardSize) {
      cardSize = cardConfigs.cardSize[Object.keys(cardConfigs.cardSize)[0]]
    }
    return cardSize.asMutable({ deep: true });
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

  handleItemsPerPageChange = (value) => {
    if (!value || value === '') {
      value = '1';
    }
    let valueInt = parseInt(value);
    if (valueInt < 0) valueInt = 1;
    this.onPropertyChange('itemsPerPage', valueInt)
  }

  handleScrollStepChange = (valueInt: number) => {
    if (valueInt < 0) valueInt = 1;
    this.onPropertyChange('scrollStep', valueInt)
  }

  handleSpaceChange = (valueFloat: number) => {
    this.onPropertyChange('space', valueFloat)
  }

  handleItemSizeChange = (valueInt: number) => {
    const { config } = this.props;
    const oldCardSize = this.getCardSize(this.props);
    const ratio = oldCardSize.width / oldCardSize.height;
    valueInt = valueInt < LIST_CARD_MIN_SIZE ? LIST_CARD_MIN_SIZE : valueInt;
    if (config.direction === DirectionType.Horizon) {
      oldCardSize.width = valueInt;
      if (config.lockItemRatio) {
        oldCardSize.height = valueInt / ratio;
      }
    } else {
      oldCardSize.height = valueInt;
      if (config.lockItemRatio) {
        oldCardSize.width = valueInt * ratio;
      }
    }
    handleResizeCard(this.props, oldCardSize).exec();

  }

  componentDidUpdate(preProps: AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps) {
    const { useDataSources, config } = this.props;
    //if fields will change in componentDidUpdate
    let fieldsWillChange = false;
    if (useDataSources !== preProps.useDataSources) {
      const old = preProps.useDataSources?.[0];
      const now = this.props.useDataSources?.[0];
      if (!now || !old || old?.dataSourceId !== now?.dataSourceId) {
        this.onConfigChange(config.set('sorts', undefined).set('searchFields', undefined).set('filter', undefined));
        fieldsWillChange = true;
        if (!this.needUpdateFields) {
          this.needUpdateFields = true
        }
        if (old && !now) {//remove from ds manager
          this.setDatasource(undefined)
        }
      }
      if (!useDataSources || useDataSources.length < 1 || !preProps.useDataSources || preProps.useDataSources.length < 1 ||
        preProps.useDataSources[0].dataSourceId !== useDataSources[0].dataSourceId) {
        this.onConfigChange(config.set('sorts', undefined).set('searchFields', undefined).set('filter', undefined));
        fieldsWillChange = true;
        if (!this.needUpdateFields) {
          this.needUpdateFields = true
        }
      }
    }

    if (this.needUpdateFields && !fieldsWillChange) {
      this.needUpdateFields = false;
      this.changeUsedFields();
    }

  }

  onSettingSortChange = (sortData: Array<SortSettingOption>, index?: number) => {
    this.onPropertyChange('sorts', sortData);
  };

  private _onItemStyleChange = (appConfig, style) => {
    const { id, config: oldConfig} = this.props;
    const appConfigAction = getAppConfigAction(appConfig)
    const wJson = appConfig.widgets[id]
    const template: Template = AllStyles[style]
    const templateWidgetJson = template.config.widgets[template.widgetId]
    wJson.layouts && Object.keys(wJson.layouts).forEach(name => {
      wJson.layouts[name] && Object.keys(wJson.layouts[name]).forEach(device => {
        if (templateWidgetJson?.layouts?.[name]?.[device] || !templateWidgetJson?.layouts) return;
        let embedLayoutJson = undefined;
        const config = wJson.config;
        // Judge if layout is empty
        let sizeLayouts = templateWidgetJson.layouts[name];
        if (!sizeLayouts) {
          const layoutKeys = Object.keys(templateWidgetJson.layouts);
          sizeLayouts = wJson.layouts[layoutKeys[layoutKeys.length - 1]];
        }else {
          sizeLayouts = wJson.layouts[name]
        }
        const length = Object.keys(sizeLayouts).length;
        embedLayoutJson = appConfig.layouts[sizeLayouts[Object.keys(sizeLayouts)[length - 1]]]

        if (!embedLayoutJson?.content) {
          return;
        }
        const desLayoutId = wJson.layouts[name][device]
        appConfigAction.editLayoutType({layoutId: desLayoutId}, embedLayoutJson.type)
        if (name === Status.Selected) {
          if (config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None) {
            //reference to
            appConfigAction.duplicateLayoutItems(embedLayoutJson.id, desLayoutId, false);
          }
        } else if (name === Status.Hover) {
          if (config.cardConfigs[Status.Hover].enable) {
            appConfigAction.duplicateLayoutItems(embedLayoutJson.id, desLayoutId, false);
          }
        } else {
          appConfigAction.duplicateLayoutItems(embedLayoutJson.id, desLayoutId, false);
        }
      })
    })



    //process inherit properties
    if (wJson.useDataSources && wJson.useDataSources.length > 0) {
      appConfigAction.copyUseDataSourceToAllChildWidgets(wJson.set('useDataSources', null), wJson)
    }

    const config = wJson.config.set('itemStyle', style).set('isItemStyleConfirm', false).set('isInitialed', true)
    appConfigAction.editWidgetProperty(wJson.id, 'config', config).exec(!oldConfig.isInitialed);
    // selectSelf(this.props);
  }


  setDatasource = (ds: DataSource) => {
    this.setState({
      datasource: ds
    });
  }

  getIndexForPickerData(value, data) {
    let index = -1;
    data.some((d, i) => {
      if (value === d.value) {
        index = i;
        return true;
      }
    })
    return index;
  }

  getSelectModeOptions = (): JSX.Element[] => {
    return [
      <option key={SelectionModeType.Single} value={SelectionModeType.Single}>{this.formatMessage('single')}</option>,
      <option key={SelectionModeType.Multiple} value={SelectionModeType.Multiple}>{this.formatMessage('multiple')}</option>,
    ]
  }

  getSearchingFields = (isSearch: boolean): MultiSelectItem[] => {
    const { datasource } = this.state;
    if (datasource) {
      const scheme = datasource.getSchema();
      if (scheme && scheme.fields) {
        const res = [];
        Object.keys(scheme.fields).forEach(fieldKey => {
          const field = scheme.fields[fieldKey];
          if (isSearch) {
            if (field.type == JimuFieldType.String) {
              res.push({
                value: fieldKey,
                label: scheme.fields[fieldKey].alias || scheme.fields[fieldKey].name
              });
            }
          } else {
            res.push({
              value: fieldKey,
              label: scheme.fields[fieldKey].alias || scheme.fields[fieldKey].name
            });
          }
        })
        return res;
      }
    }
    return []
  }

  getPageStyleOptions = (): JSX.Element[] => {
    return [
      <option key={PageStyle.Scroll} value={PageStyle.Scroll}>{this.formatMessage('scroll')}</option>,
      <option key={PageStyle.MultiPage} value={PageStyle.MultiPage}>{this.formatMessage('multiPage')}</option>
    ]
  }

  onDsCreate = ds => {
    this.setDatasource(ds)
  };

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      &.jimu-widget-list-setting{
        .sort-container {
          margin-top: 12px;
          .sort-multi-select {
            width: 100%;
          }
        }
        .lock-item-ratio-label {
          margin-left: ${polished.rem(8)};
        }
        .search-container {
          margin-top: 12px;
          .search-multi-select {
            width: 100%;
          }
        }
        .lock-item-ratio {
          margin-top: ${polished.rem(3)};
        }

        .resetting-template {
          cursor: pointer;
          color: ${theme.colors.palette.primary[700]};
          vertical-align: middle;
        }

        .resetting-template:hover {
          cursor: pointer;
          color: ${theme.colors.palette.primary[800]};
        }

        .setting-next {
          width: auto;
          max-width: 50%;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: end;
          font-size: ${polished.rem(13)};
        }

        .card-setting-return {
          cursor: pointer;
        }

        .search-placeholder {
          & {
            height: ${polished.rem(32)};
            background: ${theme.colors.palette.light[200]};
            color: ${theme.colors.black};
            border: none;
            outline: none;
            box-sizing: border-box;
            padding: 0 ${polished.rem(10)};
            border-radius: 2px;
            font-size: ${polished.rem(14)};
          }
          &:focus {
            border: 1px solid ${theme.colors.palette.primary[700]};
          }
        }

        .style-group {
          .style-img {
            cursor: pointer;
            width: 100%;
            height: 70px;
            border: 1px solid ${theme.colors.palette.light[500]};
            background-color: ${theme.colors.white};
            &.active {
              border: 2px solid ${theme.colors.primary};
            }
            &.style-img-h {
              width: 109px;
              height: 109px;
            }
            &.low {
              height: 48px;
            }
            &.empty {
              height: 40px;
              line-height: 40px;
              color: ${theme.colors.palette.dark[200]};
            }
          }
          .vertical-space {
            height: 10px;
          }

        }
      }
    `
  }

  getAllFields = (): string[] => {
    const { config, useDataSources } = this.props;
    const useDS = useDataSources && useDataSources[0];
    if (!useDS) return [];

    const usedFields = {};
    if (config.sortOpen && config.sorts) {
      config.sorts.forEach(sort => {
        sort.rule.forEach(sortData => {
          sortData.jimuFieldName && (usedFields[sortData.jimuFieldName] = 0);
        })
      })
    }
    // if (useDS.query && useDS.query.orderBy && useDS.query.orderBy.length > 0) {
    //   useDS.query.orderBy.forEach(sortData => {
    //     sortData.jimuFieldName && (usedFields[sortData.jimuFieldName] = 0);
    //   })
    // }

    // if (useDS.query && useDS.query.where) {
    //   (getJimuFieldNamesBySqlExpression(useDS.query.where) || []).forEach(field => usedFields[field] = 0)
    // }

    if (config.filter) {
      (getJimuFieldNamesBySqlExpression(config.filter) || []).forEach(field => usedFields[field] = 0)
    }

    if (config.searchOpen && config.searchFields) {
      (config.searchFields.split(',') || []).forEach(field => usedFields[field] = 0)
    }

    if(config?.linkParam?.expression){
      const linkSettingDss = expressionUtils.getUseDataSourceFromExpParts(config.linkParam.expression?.parts, this.props.useDataSources)
      linkSettingDss?.[0]?.fields?.forEach(field => usedFields[field] = 0)
    }
    return usedFields && Object.keys(usedFields) || [];
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: MESSAGES[id] }, values);
  }

  getWhetherDsInUseDataSources = (ds: UseDataSource, useDataSources: ImmutableArray<UseDataSource>): boolean => {
    if (!ds || !useDataSources) {
      return false;
    }
    return useDataSources.some(u => u.dataSourceId === ds.dataSourceId);
  }

  getOutputDataSourceJson = (useDataSources: UseDataSource[]): DataSourceJson => {
    // outputDataSourceJson should bind widget instance, such as MapviewDataSource
    const dsJson: DataSourceJson = {
      id: `${this.props.id}-output`,
      label: this.formatMessage('outputDsLabel', { label: this.props.label }),
      type: AllDataSourceTypes.FeatureSet,
      originDataSources: useDataSources
    };

    return dsJson;
  }

  onFilterChange = (sqlExprObj: SqlExpression, dsId: string) => {
    const { useDataSources } = this.props;
    if (!useDataSources || !useDataSources[0] || useDataSources[0].dataSourceId !== dsId) return;
    this.needUpdateFields = true;
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [useDataSources[0].setIn(['query', 'where'], sqlExprObj).asMutable({ deep: true })]
    });
  }

  toggleLinkSetting = () => {
    const {isLinkSettingShown} = this.state;
    this.setState({ isLinkSettingShown: !isLinkSettingShown});
  }

  onSettingLinkConfirm = (linkResult: IMLinkParam) => {
    let { config } = this.props
    if(!linkResult){
      return;
    }
    config = config.set('linkParam', linkResult)

    this.setState({
      isLinkSettingShown: false
    }, () => {
      if(linkResult.expression){
        this.needUpdateFields = true;
      }
      this.onConfigChange(config);
    });
  }

  onDSSelectorSortChange = (sortData: Array<OrderByOption>, dsId: string) => {
    const { useDataSources } = this.props;
    if (!useDataSources || !useDataSources[0] || useDataSources[0].dataSourceId !== dsId) return;
    this.needUpdateFields = true;
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [useDataSources[0].setIn(['query', 'orderBy'], sortData).asMutable({ deep: true })]
    });
  }

  onDataChange = (useDataSources: UseDataSource[]) => {
    if(useDataSources && useDataSources.length > 0){
      this.onDataSelect(useDataSources[0]);
    }else{
      this.onDataRemove(this.props.useDataSources[0].asMutable({deep: true}));
    }
  }

  onDataSelect = (currentSelectedDs: UseDataSource) => {
    const widgets = this.props.appConfig && this.props.appConfig.widgets;

    const widgetJson = widgets[this.props.id];
    const udpateWidgetJson = { id: this.props.id } as any;
    const appConfigAction = getAppConfigAction();
    let useDataSources: UseDataSource[];
    let singleUsedDs: UseDataSource;
    if (this.getWhetherDsInUseDataSources(currentSelectedDs, widgetJson.useDataSources)) {
      useDataSources = widgetJson.useDataSources.asMutable({ deep: true });
    } else {
      singleUsedDs = currentSelectedDs;
      useDataSources = [singleUsedDs];
      udpateWidgetJson['config'] = widgetJson.config
        .set('searchFields', null)
        .set('filters', null)
        .set('sorts', null);
    }
    // Instead of function onSettingChange, use action to change widget json, which can avoid conflict.
    // Because editing widget json in builder needs pub-sub and pub-sub is async.
    udpateWidgetJson['useDataSources'] = useDataSources;
    appConfigAction.editWidget(udpateWidgetJson).exec();
    //outputdatasource
    // const outputDataSourceJson = this.getOutputDataSourceJson(useDataSources)
    // if (outputDataSourceJson) {
    //   const outputDataSources = [outputDataSourceJson]
    //   appConfigAction.editWidget(udpateWidgetJson, outputDataSources).exec();
    // } else {
    //   appConfigAction.editWidget(udpateWidgetJson).exec();
    // }
    this.needUpdateFields = true;
  }

  onDataRemove = (currentRemovedDs: UseDataSource) => {
    const widgets = this.props.appConfig && this.props.appConfig.widgets;
    const widgetJson = widgets[this.props.id];
    const updateWidgetJson = { id: this.props.id } as any;
    const appConfigAction = getAppConfigAction();
    const useDataSources: ImmutableArray<UseDataSource> = widgetJson.useDataSources.filter(usedDs => usedDs.dataSourceId !== currentRemovedDs.dataSourceId);

    // Instead of function onSettingChange, use action to change widget json, which can avoid conflict.
    // Because editing widget json in builder needs pub-sub and pub-sub is async.
    updateWidgetJson['config'] = widgetJson.config
      .set('sqlExprObj', null)
      .set('searchFields', null)
      .set('filters', null)
      .set('sortFields', null);
    updateWidgetJson['useDataSources'] = useDataSources;
    appConfigAction.editWidget(updateWidgetJson, []).exec();
    this.needUpdateFields = true;
  }

  rednerBgSetting() {
    const { config, showCardSetting } = this.props;

    return (
      <Fragment>
        <SettingRow label={this.formatMessage('background')} flow="wrap">
          <BackgroundSetting
            background={config.cardConfigs[showCardSetting].backgroundStyle.background}
            onChange={value => this.onBackgroundStyleChange(showCardSetting, 'background', value)} />
        </SettingRow>
        <SettingRow label={this.formatMessage('border')} flow="wrap">
          <BorderSetting value={config.cardConfigs[showCardSetting].backgroundStyle.border}
            onChange={value => this.onBackgroundStyleChange(showCardSetting, 'border', value)} />
        </SettingRow>
        <SettingRow label={this.formatMessage('borderRadius')} flow="wrap">
          <BorderRadiusSetting
            value={config.cardConfigs[showCardSetting].backgroundStyle.borderRadius}
            onChange={value => this.onBackgroundStyleChange(showCardSetting, 'borderRadius', value)}
          />
        </SettingRow>
        {/* <SettingRow label="Box shadow" flow="wrap">
          <BoxShadowSetting
            value={config.cardConfigs[showCardSetting].backgroundStyle.boxShadow}
            onChange={value => this.onBackgroundStyleChange(showCardSetting, 'boxShadow', value)} />
        </SettingRow> */}
      </Fragment>
    )
  }

  handleItemStyleConfirmClick = (evt) => {
    this.onPropertyChange('isItemStyleConfirm', true)
  }

  handleResetItemstyleClick = (evt) => {
    this.onPropertyChange('isItemStyleConfirm', false)
  }

  handleItemStyleImageClick = evt => {
    const style = evt.currentTarget.dataset.value;
    const { config } = this.props;
    if (config.itemStyle === style) return;
    this.onItemStyleChanged(style)
  }

  onDirectionChange = (vertical: boolean) => {
    const direction = vertical ? DirectionType.Vertical : DirectionType.Horizon;
    this.onPropertyChange('direction', direction)
  }

  handleShowItemStyleClick = evt => {
    const { showItemStyle } = this.state;
    this.setState({ showItemStyle: !showItemStyle })
  }

  handleShowArrangementClick = evt => {
    const { showArrangement } = this.state;
    this.setState({ showArrangement: !showArrangement })
  }

  handleShowToolsClick = evt => {
    const { showTools } = this.state;
    this.setState({ showTools: !showTools })
  }

  handlePageStyleChange = (evt) => {
    const value = evt?.target?.value
    this.onPropertyChange('pageStyle', value)
  }

  handleChooseSearchingFieldsChange = (evt, value, values) => {
    this.onPropertyChange('searchFields', values.join(','))
  }

  displaySelectedFields = (values) => {
    return this.formatMessage('searchSelected', { selectedCount: values.length })
  }

  onSearchPlaceholderChange = (searctHint) => {
    const preSearctHint = this.props?.config?.searchHint;
    if(preSearctHint == searctHint) return;
    this.onPropertyChange('searchHint', searctHint);
  }

  renderTemplate = () => {
    const {config} = this.props;

    return (
      <SettingSection title={this.formatMessage('chooseTemplateTip')}>
        <SettingRow>
          <div className="style-group w-100">
            <div className="d-flex justify-content-between w-100">
              <div data-value={ItemStyle.Style0} onClick={this.handleItemStyleImageClick}>
                <Icon className={`style-img style-img-h ${config.itemStyle === ItemStyle.Style0 && 'active'}`}
                  icon={require('./assets/style1.png')} />
              </div>
              <div data-value={ItemStyle.Style1} onClick={this.handleItemStyleImageClick}>
                <Icon className={`style-img style-img-h ${config.itemStyle === ItemStyle.Style1 && 'active'}`}
                  icon={require('./assets/style2.png')} />
              </div>
            </div>
            <div className="vertical-space" />
            <div className="d-flex justify-content-between w-100">
              <div data-value={ItemStyle.Style2} onClick={this.handleItemStyleImageClick}>
                <Icon autoFlip={true} className={`style-img style-img-h ${config.itemStyle === ItemStyle.Style2 && 'active'}`}
                  icon={require('./assets/style3.png')} />
              </div>
              <div data-value={ItemStyle.Style3} onClick={this.handleItemStyleImageClick}>
                <Icon autoFlip={true} className={`style-img style-img-h ${config.itemStyle === ItemStyle.Style3 && 'active'}`}
                  icon={require('./assets/style4.png')} />
              </div>
            </div>
            <div className="vertical-space" />
            <div data-value={ItemStyle.Style4} onClick={this.handleItemStyleImageClick}>
              <Icon autoFlip={true} className={`style-img ${config.itemStyle === ItemStyle.Style4 && 'active'}`}
                icon={require('./assets/style5.png')} />
            </div>

            <div className="vertical-space" />

            <div data-value={ItemStyle.Style5} onClick={this.handleItemStyleImageClick}>
              <Icon autoFlip={true} className={`style-img ${config.itemStyle === ItemStyle.Style5 && 'active'}`}
                icon={require('./assets/style6.png')} />
            </div>

            <div className="vertical-space" />
            <div data-value={ItemStyle.Style6} onClick={this.handleItemStyleImageClick}>
              <Icon autoFlip={true} className={`style-img low ${config.itemStyle === ItemStyle.Style6 && 'active'}`}
                icon={require('./assets/style7.png')} />
            </div>

            <div className="vertical-space" />
            <div data-value={ItemStyle.Style7} className={`style-img empty  text-center  pr-1 pl-1 text-truncate ${config.itemStyle === ItemStyle.Style7 && 'active'}`}
              onClick={this.handleItemStyleImageClick} >
              {this.formatMessage('emptyTemplate')}
            </div>
          </div>
        </SettingRow>
        <SettingRow >
          <Button type="primary" className="w-100" onClick={this.handleItemStyleConfirmClick} >{this.formatMessage('start')}</Button>
        </SettingRow>
      </SettingSection>
    )
  }

  renderDataSetting = () => {
    const {useDataSources, selectionIsInSelf} = this.props;
    // const filterConfig = {} as any;
    // const sortConfig = {} as any;
    // const useDsIds = useDataSources && useDataSources.map(useDs => {
    //   // filterConfig[useDs.dataSourceId] = useDs.query && useDs.query.where;
    //   // sortConfig[useDs.dataSourceId] = useDs.query && useDs.query.orderBy;
    //   return useDs.dataSourceId;
    // })
    return (
      <SettingSection >
        {/* <SettingRow label={'export style'}>
          <Button type="primary" onClick={this.onExportClick} >Test</Button>
        </SettingRow> */}
        <SettingRow flow="wrap">
          <span className="w-100 overflow-hidden">
            <a className="resetting-template w-100" onClick={this.handleResetItemstyleClick} >{this.formatMessage('resettingTheTemplate')}</a>
            {this.formatMessage('customListDesign')}
            <Tooltip title={this.formatMessage('listUseGuide')} showArrow={true}  placement="left">
              <Button type="tertiary">
                <Icon icon={require('jimu-ui/lib/icons/info-12.svg')} size={12}></Icon>
              </Button>
            </Tooltip>
          </span>

        </SettingRow>
        <SettingRow flow="wrap" label={this.formatMessage('data')}>
          {!selectionIsInSelf && <DataSourceSelector
            types={DSSelectorTypes}
            useDataSources={useDataSources}
            mustUseDataSource={true} onChange={this.onDataChange}
            widgetId={this.props.id}
            // filterEnabled={true} sortEnabled={true}
            // sortConfig={Immutable(sortConfig)}
            // filterConfig={Immutable(filterConfig)}
            // onFilterChange={this.onFilterChange}
            // onSortChange={this.onDSSelectorSortChange}
          />}
        </SettingRow>
      </SettingSection>
    )
  }

  renderArrangementSetting = () => {
    const {config, theme} = this.props;
    const { showArrangement } = this.state;

    const cardSize = this.getCardSize(this.props);
    return (
      <SettingSection title={
        <div className="w-100 d-flex justify-content-between">
          <div className="text-truncate">
            {this.formatMessage('arrangement')}
          </div>
          <Button size={'sm'} type={'tertiary'} icon onClick={this.handleShowArrangementClick}>
            <Icon size={12} color={theme.colors.black} icon={showArrangement ? arrowUp : arrowDown} />
          </Button>
        </div>
      }>
        <Collapse isOpen={showArrangement} >
          <SettingRow label={this.formatMessage('direction')}>
            <DirectionSelector vertical={config.direction == DirectionType.Vertical} onChange={this.onDirectionChange}></DirectionSelector>
          </SettingRow>
          <SettingRow flow="wrap" label={`${config.direction === DirectionType.Vertical ? this.formatMessage('itemHeight') : this.formatMessage('itemWidth')}(px)`}>
            <MyNumericInput
              style={{ width: '100%' }}
              value={parseFloat((config.direction === DirectionType.Vertical ? cardSize.height : cardSize.width).toFixed(2))}
              min={LIST_CARD_MIN_SIZE}
              disabled={config.lockItemRatio}
              onAcceptValue={this.handleItemSizeChange}
            />
          </SettingRow>
          <SettingRow label="">
            <div className="d-flex w-100">
              <Checkbox
                className="lock-item-ratio"
                data-field="lockItemRatio"
                onClick={this.handleFormChange}
                checked={config.lockItemRatio} />
              <div className="lock-item-ratio-label">{this.formatMessage('lockItemRatio')}</div>
            </div>
          </SettingRow>
          <SettingRow flow="wrap" label={(config.direction === DirectionType.Vertical ? this.formatMessage('verticalSpacing') : this.formatMessage('horizontalSpacing')) + ' (px)'}>
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
              <MyNumericInput
                style={{ width: '25%' }}
                value={config.space}
                min={0}
                max={50}
                title="0-50"
                onAcceptValue={this.handleSpaceChange}
              />
            </div>
          </SettingRow>
          <SettingRow label={this.formatMessage('pagingStyle')} flow="wrap">
            <Select style={{ width: '100%' }} value={config.pageStyle}
              onChange={this.handlePageStyleChange}>
              {
                this.getPageStyleOptions()
              }
            </Select>
          </SettingRow>
          {config.pageStyle === PageStyle.Scroll &&
            <SettingRow label={this.formatMessage('scrollBar')}>
              <div className="d-flex">
                <Switch
                  checked={config.scrollBarOpen}
                  data-field="scrollBarOpen"
                  onChange={this.handleFormChange}
                />
              </div>
            </SettingRow>
          }
          {config.pageStyle === PageStyle.Scroll &&
            <SettingRow label={this.formatMessage('navigator')}>
              <div className="d-flex">
                <Switch
                  checked={config.navigatorOpen}
                  data-field="navigatorOpen"
                  onChange={this.handleFormChange}
                />
              </div>
            </SettingRow>
          }
          {config.pageStyle === PageStyle.Scroll && config.navigatorOpen &&
            <SettingRow label={this.formatMessage('listStep')} flow="wrap">
              <MyNumericInput
                value={config.scrollStep}
                style={{ width: '100%' }}
                min={1}
                onAcceptValue={this.handleScrollStepChange}
              />
            </SettingRow>
          }
          {config.pageStyle === PageStyle.MultiPage &&
            <SettingRow label={this.formatMessage('itemPerPage')} flow="wrap">
              <MyNumericInput
                value={config.itemsPerPage}
                style={{ width: '100%' }}
                min={1}
                onAcceptValue={this.handleItemsPerPageChange}
              />
            </SettingRow>
          }
        </Collapse>
      </SettingSection>
    )
  }

  renderStatsSetting = (): React.ReactNode => {
    const {config, theme} = this.props;
    const { showItemStyle, isLinkSettingShown} = this.state;
    return (
      <SettingSection title={
        <div className="w-100 d-flex justify-content-between">
          <div className="text-truncate">
            {this.formatMessage('states')}
          </div>
          <Button size={'sm'} type={'tertiary'} icon onClick={this.handleShowItemStyleClick}>
            <Icon size={12} color={theme.colors.black} icon={showItemStyle ? arrowUp : arrowDown} />
          </Button>
        </div>
      }>
        <Collapse isOpen={showItemStyle} >
          <SettingRow >
            <Button className="w-100 text-dark set-link-btn" type="primary" onClick={this.toggleLinkSetting}>
              <div className="w-100 px-2 text-truncate">
                <Icon icon={IconRefresh} size={12} className="add-data-icon" />
                {this.formatMessage('setLink')}
              </div>
            </Button>
          </SettingRow>
          {
            isLinkSettingShown && !urlUtils.getAppIdPageIdFromUrl().pageId &&
            <LinkSettingPopup showDialog={isLinkSettingShown}
              onSettingCancel={() => {this.setState({ isLinkSettingShown: false}); }}
              onSettingConfirm={this.onSettingLinkConfirm}
              linkParam={config.linkParam}
              useDataSources={this.props.useDataSources}
              widgetId={this.props.id}
            />
          }
          {this.rednerBgSetting()}
          <SettingRow label={this.formatMessage('hover')}>
            <div className="setting-next d-flex text-break" data-value={Status.Hover} onClick={this.onOpenCardSetting}>
              <div>{config.cardConfigs[Status.Hover].enable ? this.formatMessage('on') : this.formatMessage('off')}</div>
              <Icon autoFlip={true} style={{ flex: 'none' }} size={12} icon={require('jimu-ui/lib/icons/arrow-right-12.svg')} />
            </div>
          </SettingRow>
          <SettingRow label={this.formatMessage('selected')}>
            <div className="setting-next d-flex text-break" data-value={Status.Selected} onClick={this.onOpenCardSetting}>
              <div>{config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None ? this.formatMessage('on') : this.formatMessage('off')}</div>
              <Icon autoFlip={true} style={{ flex: 'none' }} size={12} icon={require('jimu-ui/lib/icons/arrow-right-12.svg')} />
            </div>
          </SettingRow>
        </Collapse>
      </SettingSection>
    )
  }

  renderToolSetting = () => {
    const {config, theme, useDataSources} = this.props;
    const { showTools } = this.state;
    const searchHint = config?.searchHint;
    return (
      <SettingSection title={
        <div className="w-100 d-flex justify-content-between">
          {this.formatMessage('tools')}
          <Button size={'sm'} type={'tertiary'} icon onClick={this.handleShowToolsClick}>
            <Icon size={12} color={theme.colors.black} icon={showTools ? arrowUp : arrowDown} />
          </Button>
        </div>
      }>
        <Collapse isOpen={showTools}>
          <SettingRow label={this.formatMessage('search')}>
            <div className="d-flex">
              <Switch
                checked={config.searchOpen}
                data-field="searchOpen"
                onChange={this.handleFormChange}
              />
            </div>
          </SettingRow>
          {config.searchOpen &&
            <SettingRow flow="wrap" label={this.formatMessage('chooseSearchingFields')}>
              <div className="d-flex w-100 search-container" style={{ zIndex: 3 }}>
                <MultiSelect
                  items={Immutable(this.getSearchingFields(true))}
                  values={config.searchFields && Immutable(config.searchFields.split(','))}
                  className="search-multi-select"
                  fluid={true}
                  placeHolder={this.formatMessage('selectSearchFields')}
                  onClickItem={this.handleChooseSearchingFieldsChange}
                  displayByValues={this.displaySelectedFields} />
              </div>
              <div className="d-flex" style={{ marginTop: '10px' }}>
                <Checkbox
                  data-field="searchExact"
                  onClick={this.handleFormChange}
                  checked={config.searchExact} />
                <div className="text-truncate lock-item-ratio-label">{this.formatMessage('exactMatch')}</div>
              </div>
            </SettingRow>
          }
          {config.searchOpen &&
            <SettingRow flow="wrap" label={this.formatMessage('searctHint')}>
              <TextInput
                className="search-placeholder w-100"
                placeholder={this.formatMessage('search')}
                value={searchHint}
                onAcceptValue={this.onSearchPlaceholderChange}/>
            </SettingRow>
          }
          <SettingRow label={this.formatMessage('sort')}>
            <div className="d-flex">
              <Switch
                checked={config.sortOpen}
                data-field="sortOpen"
                onChange={this.handleFormChange}
              />
            </div>
          </SettingRow>
          {config.sortOpen &&
            <SettingRow flow="wrap">
              <SortSetting
                onChange={this.onSettingSortChange}
                useDataSource={useDataSources && useDataSources[0]}
                value={config.sorts || Immutable([])}
              />
            </SettingRow>
          }
          <SettingRow label={this.formatMessage('filter')}>
            <div className="d-flex">
              <Switch
                checked={config.filterOpen}
                data-field="filterOpen"
                onChange={this.handleFormChange}
              />
            </div>
          </SettingRow>
          {
            config.filterOpen &&
            <Fragment>
              <SettingRow>
                <div className="d-flex justify-content-between w-100 align-items-center">
                  {
                    <Button className="w-100 text-dark set-link-btn" color={!this.state.datasource ? 'secondary' : 'primary'} disabled={!this.state.datasource}
                      onClick={this.showSqlExprPopup} title={this.formatMessage('setFilters')}>
                      {this.formatMessage('setFilters')}
                    </Button>
                  }
                </div>
              </SettingRow>
              <SettingRow flow="wrap">
                <SqlExpressionBuilderPopup
                  dataSource={this.state.datasource}
                  isOpen={this.state.isSqlExprShow} toggle={this.toggleSqlExprPopup}
                  expression={config.filter} onChange={this.onSqlExprBuilderChange} />
              </SettingRow>
            </Fragment>
          }
          {config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None &&
            <Fragment>
              <SettingRow label={this.formatMessage('listShowSelectedOnly')}>
                <Switch
                  checked={config.showSelectedOnlyOpen}
                  data-field="showSelectedOnlyOpen"
                  onChange={this.handleFormChange}
                />
              </SettingRow>
              <SettingRow label={this.formatMessage('clearSelected')}>
                <Switch
                  checked={config.showClearSelected}
                  data-field="showClearSelected"
                  onChange={this.handleFormChange}
                />
              </SettingRow>
            </Fragment>
          }

        </Collapse>

      </SettingSection>
    )
  }

  renderRegularSetting = () => {
    const {datasource} = this.state;
    return (
      <div className="list-list-setting">
        {this.renderDataSetting()}
        {datasource &&
          <Fragment>
            {this.renderArrangementSetting()}
            {this.renderStatsSetting()}
            {this.renderToolSetting()}
          </Fragment>
        }
      </div>
    )
  }

  renderListCardSetting = () => {
    const statusIntl: { [key: string]: string } = {}
    statusIntl[Status.Hover] = this.formatMessage('hover');
    statusIntl[Status.Selected] = this.formatMessage('selected');
    statusIntl[Status.Regular] = this.formatMessage('regular');
    const {showCardSetting, config} = this.props;
    return (
      <div className="list-card-setting">
        <SettingSection >
          <SettingRow label={
            <div className="d-flex text-truncate align-items-center card-setting-return" onClick={this.onCardSettingReturnBackClick} >
              <Icon autoFlip={true} size={14} icon={require('jimu-ui/lib/icons/arrow-left-14.svg')} />
              {statusIntl[showCardSetting]}
            </div>
          }>

          </SettingRow>
        </SettingSection>

        <SettingSection >
          <SettingRow label={this.formatMessage('enableStatus', { status: statusIntl[showCardSetting].toLocaleLowerCase() })}>
            <Switch
              checked={showCardSetting === Status.Hover ? config.cardConfigs[Status.Hover].enable : config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None}
              onChange={showCardSetting === Status.Hover ? this.onHoverLayoutOpenChange : this.onSelectionSwitch} />
          </SettingRow>
          {((showCardSetting === Status.Selected && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None) ||
            (showCardSetting === Status.Hover && config.cardConfigs[Status.Hover].enable)) &&
            <Fragment>
              {showCardSetting === Status.Selected &&
                <SettingRow flow="wrap" label={this.formatMessage('selectMode')}>
                  <Select value={config.cardConfigs[Status.Selected].selectionMode}
                    onChange={this.onSelectionModeChange}>
                    {
                      this.getSelectModeOptions()
                    }
                  </Select>

                </SettingRow>
              }
              {this.rednerBgSetting()}
            </Fragment>
          }

        </SettingSection>
      </div>
    )
  }

  render() {
    const {
      config,
      showCardSetting
    } = this.props;
    return (
      <div className={classNames(`${prefix}list-setting`, `${prefix}setting`)} css={this.getStyle(this.props.theme)} >
        {
          !config.isItemStyleConfirm ?
            this.renderTemplate() :
            <Fragment>
              {showCardSetting === Status.Regular &&
                this.renderRegularSetting()
              }
              {showCardSetting !== Status.Regular &&
                this.renderListCardSetting()
              }
            </Fragment>
        }

        {this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0] &&
          <div className="waiting-for-database">
            <DataSourceComponent useDataSource={this.props.useDataSources[0]} onDataSourceCreated={this.onDsCreate}/>
          </div>
        }
      </div>);
  }
}