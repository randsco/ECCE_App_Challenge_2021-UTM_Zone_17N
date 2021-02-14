/** @jsx jsx */
import {  IMState, classNames, React, jsx,  AllWidgetProps,
  DataRecord, DataSourceStatus, AppMode,
  BrowserSizeMode, appActions, DataSourceComponent, MessageManager,
  DataRecordsSelectionChangeMessage, getAppStore, ReactResizeDetector,
  DataSourceManager, ImmutableArray,
  IMSqlExpression, LayoutType, Immutable, QueriableDataSource, IMDataSourceInfo, DataSource, IMUrlParameters, lodash } from 'jimu-core';

import { WidgetPlaceholder, Button, Icon, Popper, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui';
import { IMConfig, DirectionType, SelectionModeType, Status, LIST_CARD_MIN_SIZE,
  PageStyle, CardSize, Suggestion, DS_TOOL_H, LIST_TOOL_MIN_SIZE, ListDivSize } from '../config';
import ListCardEditor from './components/list-card-editor';
import ListCardViewer from './components/list-card-viewer';
import { FixedLayoutViewer, searchUtils, LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import defaultMessages from './translations/default';
import SearchBox from './components/search-box';
import { VariableSizeList as List} from 'react-window';
import { Fragment, forwardRef } from 'react';
import MyDropDown, { MyDropDownItem } from './components/my-dropdown';
import FilterPicker from './components/filter-picker';
import { ListBottomTools } from './components/bottom-tools';
import {getQueryOptions, fetchSuggestionRecords, compareQueryOptionsExceptPaging} from './utils/list-service'
import * as listUtils from './utils/utils'
import { getToolsPopperStyle, getSearchToolStyle, getStyle, listStyle } from './styles/style';
import {versionManager} from '../version-manager';

const showSelectedOnlyIcon = require('jimu-ui/lib/icons/show-selected-only.svg');
const clearSelectionIcon = require('jimu-ui/lib/icons/clear-selection.svg');
const searchIcon = require('jimu-ui/lib/icons/search-16.svg');
const menuIcon = require('jimu-ui/lib/icons/menu.svg');

const defaultRecords = [{fake: true} as any, {fake: true} as any, {fake: true} as any];
const MESSAGES = Object.assign({}, defaultMessages, jimuUIDefaultMessages);
// const overSpeed = 1.5;

interface Props{
  selectionIsSelf: boolean,
  selectionIsInSelf: boolean,
  selectionStatus: Status,
  appMode: AppMode,
  browserSizeMode: BrowserSizeMode,
  builderStatus: Status,
  isRTL: boolean,
  subLayoutType: LayoutType,
  left: number | string,
  top: number | string,
  isWidthAuto: boolean,
  isHeightAuto: boolean,
  showLoading: boolean,
  queryObject: IMUrlParameters
}

export type ListProps = AllWidgetProps<IMConfig> & Props

export interface ListStates {
  LayoutEntry: any;
  page: number;
  sortOptionName?: string,
  searchText: string;
  currentFilter: IMSqlExpression;
  filterApplied: boolean;
  currentCardSize: CardSize;
  forceShowMask: boolean;
  showList: boolean;
  showSelectionOnly: boolean;
  widgetRect: {
    width: number,
    height: number
  },
  hideCardTool: boolean,
  scrollStatus: 'start' | 'end' | 'mid',
  datasource: DataSource;
  hoverIndex: number;
  isScrolling: boolean;
  isScrollSpeedOver: boolean;
  isResizingCard: boolean;
  searchSuggestion: Array<Suggestion>;
  isSearchBoxVisible: boolean;
  isOpenTopToolsPopper: boolean;
  latestUpdateTime: number;
  autoRefreshLoadingString: string;
  showLoading: boolean;
  listDivSize: ListDivSize;
  toolsDivWidth: number;
  listDivBoundRect: DOMRect;
  isScrollEnd: boolean;

}

export class Widget extends React.PureComponent<ListProps, ListStates>{
  static versionManager = versionManager;
  lastSelectedIndex: number;
  isMySelected: boolean;
  lastSelectedRecordIds: string[];
  listRef: any;
  listOutDivRef: HTMLDivElement;
  paginatorDiv: React.RefObject<HTMLDivElement>
  listTopRightToolsDiv: React.RefObject<HTMLDivElement> ;
  records: Array<any>;
  queryStatus: DataSourceStatus;
  totalCount: number;
  lastQueryStart: number;
  isSwitchPage: boolean;
  needScroll: boolean;
  lastPageSize: number;
  needRefreshListOnListRendered: boolean;
  listVisibleStartIndex: number;
  listVisibleStopIndex: number;
  innerElementType: React.ElementType;
  lastSpace: number;
  lastQuery: any;
  suggestionsQueryTimeout: any;
  reference: HTMLDivElement;
  showPopperTimeOut: any;
  isFirstLoad: boolean = true;
  autoRefreshLoadingTime: any;
  resetAutoRefreshTime: any;
  setPageTimeout: any;
  onItemsRenderedTimeout: any;
  isMount: boolean = false;
  isHasScrolled: boolean = false;  /*Whether the List has scrolled*/
  debounceOnResize: (width, height) => void;

  static mapExtraStateProps = (state: IMState, props: AllWidgetProps<IMConfig>): Props => {
    const appConfig = state && state.appConfig;
    const { layouts, layoutId, layoutItemId, builderSupportModules, id} = props;
    const browserSizeMode = state && state.browserSizeMode;
    const builderStatus = state && state.widgetsState && state.widgetsState[props.id] && state.widgetsState[props.id]['builderStatus'] || Status.Regular;
    let subLayoutType;
    if(appConfig){
      const subLayout = appConfig && state.appConfig.layouts
        && state.appConfig.layouts[searchUtils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode)];
      subLayoutType = subLayout && subLayout.type;
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

    const selection = state && state.appRuntimeInfo && state.appRuntimeInfo.selection;
    const selectionIsInSelf = selection && builderSupportModules && builderSupportModules.widgetModules &&
      builderSupportModules.widgetModules.selectionInList(selection, id, appConfig, false);
    let selectionStatus;
    if(selectionIsInSelf){
      selectionStatus = Object.keys(layouts).find(status => searchUtils.findLayoutId(layouts[status], browserSizeMode, appConfig.mainSizeMode) === selection.layoutId);
    }
    const selectionIsSelf = !!(selection && selection.layoutId === layoutId && selection.layoutItemId === layoutItemId);
    return {
      selectionIsSelf: selectionIsSelf,
      selectionIsInSelf: !!selectionIsInSelf,
      selectionStatus,
      appMode: state?.appRuntimeInfo?.appMode,
      browserSizeMode: state && state.browserSizeMode,
      builderStatus: state && state.widgetsState && state.widgetsState[props.id] && state.widgetsState[props.id]['builderStatus'] || Status.Regular,
      showLoading: state?.widgetsState?.[props.id]?.['showLoading'],
      isRTL: state && state.appContext && state.appContext.isRTL,
      subLayoutType,
      left: widgetPosition && widgetPosition.left,
      top: widgetPosition && widgetPosition.top,
      isHeightAuto,
      isWidthAuto,
      queryObject: state.queryObject
    };
  };

  constructor(props) {
    super(props);
    const {config} = props;
    this.paginatorDiv = React.createRef<HTMLDivElement>();
    this.listTopRightToolsDiv = React.createRef<HTMLDivElement>();
    const stateObj: ListStates = {
      LayoutEntry: null,
      page: 1,
      sortOptionName: config.sorts && config.sorts[0] && config.sorts[0].ruleOptionName,
      currentCardSize: listUtils.getCardSizeInConfig(props),
      forceShowMask: false,
      showList: true,
      widgetRect: undefined,
      searchText: '',
      currentFilter: undefined,
      filterApplied: false,
      showSelectionOnly: false,
      hideCardTool: false,
      scrollStatus: 'start',
      datasource: undefined,
      hoverIndex: -1,
      isScrolling: false,
      isScrollSpeedOver: false,
      isResizingCard: false,
      searchSuggestion: [],
      isSearchBoxVisible: false,
      isOpenTopToolsPopper: false,
      latestUpdateTime: 0,
      showLoading: false,
      autoRefreshLoadingString: '',
      listDivSize: {
        clientWidth: null,
        clientHeight: null
      },
      toolsDivWidth: null,
      listDivBoundRect: null,
      isScrollEnd: false
    };
    this.selectSelf = this.selectSelf.bind(this);
    this.handleResizeCard = this.handleResizeCard.bind(this);
    this.listRef = React.createRef();

    if (window.jimuConfig.isInBuilder) {
      stateObj.LayoutEntry = this.props.builderSupportModules.LayoutEntry;
    }else {
      stateObj.LayoutEntry = FixedLayoutViewer;
    }
    this.state = stateObj;

    this.onResize = this.onResize.bind(this);
    this.changeIsResizingCard = this.changeIsResizingCard.bind(this);
    this.setRefreshLoadingString = this.setRefreshLoadingString.bind(this);
    this.resetAutoRefreshTimes = this.resetAutoRefreshTimes.bind(this);
    this.debounceOnResize = lodash.debounce((width, height) => this.onResize(width, height), 200);
  }

  componentDidMount(){
    this.isMount = true;
    // const {outputDataSources, useDataSources} = this.props

    // if(this.records != defaultRecords){
    //   listUtils.createOutputDs(this.records, outputDataSources?.[0], useDataSources?.[0]);
    // }
  }
  componentWillUnmount(){
    clearTimeout(this.resizeTimeout);
    clearTimeout(this.updateCardToolTimeout);
    clearTimeout(this.mouseClickTimeout);
    clearTimeout(this.suggestionsQueryTimeout);
    clearTimeout(this.showPopperTimeOut);
    clearTimeout(this.resetAutoRefreshTime);
    clearTimeout(this.setPageTimeout);
    clearTimeout(this.onItemsRenderedTimeout);
    clearInterval(this.autoRefreshLoadingTime);
    this.isMount = false;
  }
  updateWidgetRectTimeout: NodeJS.Timer = undefined;
  componentDidUpdate(preProps, preState){
    const {config, appMode, top, left, selectionIsSelf, selectionStatus, builderStatus, isHeightAuto} = this.props
    const {datasource, listDivSize} = this.state;
    if (!window.jimuConfig.isInBuilder || appMode === AppMode.Run) {
      //Listen selected records change from outside
      if (datasource && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None) {
        this.scrollToSelectedItems(datasource)
      }
    }

    if(window.jimuConfig.isInBuilder){
      let refreshList: boolean = false;
      let hideCardTool = false;
      // listen layout properties change and then update list
      const currentCardSize = listUtils.getCardSizeInConfig(this.props);
      const oldCardSize = listUtils.getCardSizeInConfig(preProps);

      this.updateScrollContentSize(preProps.config)

      if (config.direction !== preProps.config.direction ||
          !listUtils.isEqualCardSizeByDirection(oldCardSize, currentCardSize, config.direction) ||//for change template
          (top !== preProps.top || left !== preProps.left)) {
        hideCardTool = true
        if(!listUtils.isEqualCardSizeByDirection(oldCardSize, currentCardSize, config.direction)){
          const newState = {
            currentCardSize
          };
          refreshList = true;
          this.setState(newState, () => {
            if(refreshList)
              this.refreshList();
          })
        }else if(config.direction !== preProps.config.direction){
          this.handleResizeCard(this.state.currentCardSize, true, false, false, true);
        }
      }

      if(!refreshList){
        if(!listUtils.isEqualNumber(config.space, preProps.config.space)
          || config.direction !== preProps.config.direction){
          refreshList = true;
          this.refreshList();
        }
      }

      //listen paging type change
      const {pageStyle} = config;
      const oldPageStyle = preProps.config.pageStyle;
      if(pageStyle !== oldPageStyle){
        this.setState({
          page: 1
        })
      }

      //listen useDatasources change
      const {useDataSources} = this.props;
      const oldUseDataSources = preProps.useDataSources;
      if(useDataSources && useDataSources[0]){
        const oldUseDataSource = oldUseDataSources && oldUseDataSources[0];
        if(!oldUseDataSource || oldUseDataSource.dataSourceId !== useDataSources[0].dataSourceId){
          //reset querysStart
          this.setState({
            page: 1
          })
        }
      }else {//remove ds maybe
        this.setState({
          datasource: undefined
        })
      }

      //listening listDiv size's change
      const showBT = listUtils.showBottomTools(this.props, this.state)
      const oldShowBT = listUtils.showBottomTools(preProps, preState)
      const showDS = listUtils.showTopTools(this.props)
      const oldShowDS = listUtils.showTopTools(preProps)
      if(showBT !== oldShowBT || showDS !== oldShowDS){
        if(!isHeightAuto){
          if(config.direction === DirectionType.Horizon){
            let cardH = this.state.widgetRect?.height || listDivSize?.clientHeight
            cardH -= (listUtils.getBottomToolH(this.paginatorDiv.current, showBT) + (showDS ? 1 : 0) * DS_TOOL_H)
            if(cardH < LIST_CARD_MIN_SIZE) return;
            const cardSize = {
              height: cardH,
              width: currentCardSize.width
            }
            this.handleResizeCard(cardSize, true, false, false, true);
          }
        }else{
          hideCardTool = true
        }
      }

      if(hideCardTool){
        this.updateCardToolPosition();
      }


      //listen sort change
      if(config.sortOpen){
        const sorts = config.sorts;
        const oldSorts = preProps.config.sorts;
        if(sorts !== oldSorts){
          this.setState({
            sortOptionName: undefined
          })
        }
      }

      //listen filter change
      if(config.filterOpen){
        const filter = config.filter;
        const oldFilter = preProps.config.filter;
        if(filter !== oldFilter){
          this.setState({
            currentFilter: undefined,
            filterApplied: false
          })
        }
      }

      if(config.cardConfigs[Status.Selected].selectionMode !== preProps.config.cardConfigs[Status.Selected].selectionMode){
        this.selectRecords([])
      }
    }

    if(preProps.appMode != appMode){
      if(appMode === AppMode.Run){
        this.editBuilderAndSettingStatus(Status.Regular);
      }else {
        if(selectionStatus !== builderStatus){
          //change status by toc
          if(!selectionStatus){
            if(!selectionIsSelf){
              this.editBuilderAndSettingStatus(Status.Regular);
            }
          }else {
            this.editBuilderAndSettingStatus(selectionStatus);
          }
        }
        this.setState({
          showSelectionOnly: false,
          searchText: undefined,
          filterApplied: false,
          hoverIndex: -1,
        }, () => {
          this.scrollToIndex(0)
        })
      }
    }

    if(preProps?.selectionIsInSelf !== this.props?.selectionIsInSelf){
      this.setSelectionStatus()
    }

    //update output ds
    // if(this.records != defaultRecords){
    //   listUtils.createOutputDs(this.records, outputDataSources?.[0], useDataSources?.[0]);
    // }
  }
  setSelectionStatus = () => {
    const { id, selectionIsInSelf } = this.props;
    this.props.dispatch(appActions.widgetStatePropChange(id, 'selectionIsInSelf', selectionIsInSelf));
  }
  updateScrollContentSize = (preConfig) => {
    const {config} = this.props;
    if(config.direction !== preConfig.direction || config.space !== preConfig.space){
      this.setScrollContentSize();
    }
  }

  scrollToSelectedItems = (datasource: DataSource) => {
    const selectedRecordIds = datasource.getSelectedRecordIds();
    if (this.isMySelected) {
      this.isMySelected = false;
      this.lastSelectedRecordIds = selectedRecordIds || [];
      return;
    }
    if (selectedRecordIds && selectedRecordIds.length > 0) {
      let isSame = true;
      if(!this.lastSelectedRecordIds || selectedRecordIds.length !== this.lastSelectedRecordIds.length){
        isSame = false;
      }else {
        selectedRecordIds.some(recordId => {
          const rId = this.lastSelectedRecordIds.find(lastRecordId => lastRecordId === recordId);
          if(!rId){
            isSame = false;
            return true;
          }
        })
      }
      if (!isSame || this.needScroll) {
        let index = -1;
        this.records && this.records.find((record, i) => {
          if(record.getId?.() === selectedRecordIds[0]){
            index = i;
            return true;
          }
        })
        if(index === -1){// Can't find it, need to search in all records again
          const records = datasource.getRecords()
          records && records.find((record, i) => {
            if(record.getId?.() === selectedRecordIds[0]){
              index = i;
              return true;
            }
          })
          if(index > -1){
            const newPage = Math.ceil((index + 1) / this.getPageSize());
            this.needScroll = true;
            this.setState({
              page: newPage
            })
          }
        }else {
          this.scrollToIndex(index)
          this.needScroll = false;
        }
      }
    }
    this.lastSelectedRecordIds = selectedRecordIds || [];
  }

  onDSCreated = (ds: DataSource) => {
    this.setState({
      datasource: ds,
    });
  }

  resizeTimeout: NodeJS.Timer;
  onResize = (width, height) => {
    const newWidgetRect = {
      width,
      height
    }
    const {config} = this.props;
    const {isResizingCard} = this.state
    if(isResizingCard) {
      return;
    }
    const showBottomTool = listUtils.showBottomTools(this.props, this.state)
    const bottomToolH = listUtils.getBottomToolH(this.paginatorDiv.current, showBottomTool)
    const showTopTool = listUtils.showTopTools(this.props)
    const listH = listUtils.getListHeight(newWidgetRect, bottomToolH, showTopTool);
    const oldCardSize = this.state.currentCardSize;
    const cardSize = {
      width: oldCardSize.width,
      height: oldCardSize.height
    }
    let needRefreshList: boolean = false
    if(config.lockItemRatio){
      const ratio = cardSize.width / cardSize.height;
      if(config.direction === DirectionType.Horizon){
        cardSize.height = listH;
        cardSize.width = listH * ratio;
        if(!listUtils.isEqualNumber(cardSize.width, oldCardSize.width)){
          needRefreshList = true
        }
      }else {
        cardSize.height = width / ratio;
        cardSize.width = width;
        if(!listUtils.isEqualNumber(cardSize.height, oldCardSize.height)){
          needRefreshList = true
        }
      }
    }else {
      if(config.direction === DirectionType.Horizon){
        cardSize.height = listH;
      }else {
        cardSize.width = width;
      }
    }
    if(cardSize.width < LIST_CARD_MIN_SIZE || cardSize.height < LIST_CARD_MIN_SIZE) return;
    this.setState({
      widgetRect: newWidgetRect,
      currentCardSize: cardSize,
    }, () => {
      if(needRefreshList){
        this.refreshList()
      }
    })
    if(this.resizeTimeout){
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = undefined;
    }
    if(config.lockItemRatio){
      this.resizeTimeout = setTimeout(() => {
        this.handleResizeCard(cardSize, true, false, false, true)
      }, 500);
    }
    this.updateCardToolPosition();
    this.setListDivSize();
    if(listUtils.isEqualCardSizeByDirection(cardSize, oldCardSize, config.direction)){
      return
    }
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

  private refreshList = (shouldForceUpdate: boolean = true) => {
    if(this.listRef.current){
      this.listRef.current.resetAfterIndex(0, shouldForceUpdate);
    }
  }

  private isDsConfigured = (): boolean => {
    const {useDataSources} = this.props;
    return !!useDataSources && !!useDataSources[0]
  }

  private selectRecords = (records: DataRecord[]) => {
    const {datasource} = this.state;

    if(datasource){
      MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, records));

      if(records){
        this.isMySelected = true;
        datasource.selectRecordsByIds(
          records.map(record => record.getId()),
        )
        const outputDs = this.getOutputDs();
        outputDs && outputDs.selectRecordsByIds(records.map(record => record.getId()));
      }
    }

  }

  formatMessage = (id: string, values?: {[key: string]: any}) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: MESSAGES[id] }, values);
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

  scrollToIndex = (index: number, type: string = 'start') => {
    if (this.listRef.current) {
      this.listRef.current.scrollToItem(index, type)
    }
  }

  isEditing = (): boolean => {
    const {appMode, config, selectionIsSelf, selectionIsInSelf} = this.props;
    if(!window.jimuConfig.isInBuilder) return false;
    return (selectionIsSelf || selectionIsInSelf)
          && window.jimuConfig.isInBuilder && appMode !== AppMode.Run && config.isItemStyleConfirm
  }

  private handleItemChange = (itemRecord: DataRecord) => {
    const {config} = this.props;
    const {datasource} = this.state;
    if(!datasource || !itemRecord)return;

    let selectedRecords = datasource.getSelectedRecords() || [];
    if(config.cardConfigs[Status.Selected].selectionMode && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None){
      const recordId = itemRecord.getId();
      const record = selectedRecords.find(record => record.getId() === recordId);
      if(config.cardConfigs[Status.Selected].selectionMode === SelectionModeType.Single){

        if(record) {
          this.selectRecords([])
        }else {
          this.selectRecords([itemRecord])
        }
      }else{
        if(record){
          selectedRecords = selectedRecords.filter(record => record.getId() !== recordId)
        }else {
          selectedRecords = [itemRecord].concat(selectedRecords)
        }
        this.selectRecords(selectedRecords);
      }
    }
  }

  mouseClickTimeout: NodeJS.Timer;

  handleListPointerDown = (evt) => {
    this.setState({
      forceShowMask: true
    })
    if(this.mouseClickTimeout){
      clearTimeout(this.mouseClickTimeout);
      this.mouseClickTimeout = undefined;
    }
    this.mouseClickTimeout = setTimeout(() => {
      this.setState({
        forceShowMask: false
      })
    }, 200);
  }

  handleScrollUp = (e) => {
    const {scrollStep} = this.props.config;
    const listVisibleStartIndex = this.getListVisibleStartIndex()
    let toIndex = listVisibleStartIndex - scrollStep;
    if(toIndex < 0){
      toIndex = 0;
    }
    this.scrollToIndex(toIndex, 'start');
  }

  handleScrollDown = (e) => {
    const {scrollStep} = this.props.config;
    const {listVisibleStopIndex} = this;
    const listVisibleStartIndex = this.getListVisibleStartIndex()
    if(listVisibleStopIndex + scrollStep >= this.records.length - 1 && this.records.length < this.getTotalCount()){
      this.isSwitchPage = true;
      this.setState({
        page: this.state.page + 1
      })
    }else {
      this.scrollToIndex(listVisibleStartIndex + scrollStep, 'start');
    }
  }

  handleSwitchPage = (pageNum: number) => {
    const totalPages = this.getTotalPage();
    if(pageNum < 1 || pageNum > totalPages) return;
    if(pageNum !== this.state.page){
      this.isSwitchPage = true;
      this.lastQueryStart = this.state.page;
      this.setState({
        page: pageNum
      })
    }
  }

  handleListMouseLeave = (evt: React.MouseEvent<HTMLDivElement>) => {
    if(this.isEditing())return;
    this.setState({
      hoverIndex: -1
    })
  }

  handleListMouseMove = (evt: React.MouseEvent<HTMLDivElement>) => {
    if(this.isEditing())return;
    const {listDivBoundRect} = this.state;
    const {config, isRTL} = this.props;
    const listDiv = this.listOutDivRef;
    if(!listDiv)return false;
    // const scrollTOrL = config.direction === DirectionType.Vertical ? listDiv.scrollTop : listDiv.scrollLeft;
    const scrollTOrL = this.lastScrollOffset
    let clientXorY
    if(config.direction === DirectionType.Horizon){
      clientXorY = isRTL ? (listDivBoundRect.right - evt.clientX) : (evt.clientX - listDivBoundRect.left)
    }else {
      clientXorY = evt.clientY - listDivBoundRect.top
    }
    const itemSize = this.itemSize(0);
    let hoverIndex = Math.floor((scrollTOrL + clientXorY) / itemSize);
    const mode = scrollTOrL + clientXorY - hoverIndex * itemSize;
    if(mode > itemSize - config.space){
      hoverIndex = -1;
    }
    if(hoverIndex === this.state.hoverIndex)return;
    this.setState({
      hoverIndex: hoverIndex
    })
  }

  lastScrollOffset = 0;
  timeStamp;
  handleListScroll = ({scrollDirection, scrollOffset, scrollUpdateWasRequested}) => {
    const {appMode, config} = this.props;
    const listDiv = this.listOutDivRef;
    const {datasource, scrollStatus} = this.state;
    this.lastScrollOffset = scrollOffset;
    if(!listDiv || (this.records?.length ?? 0) < 1)return;
    if(config.pageStyle === PageStyle.Scroll &&
      this.queryStatus !== DataSourceStatus.Loading &&
      datasource &&
      (!window.jimuConfig.isInBuilder || appMode === AppMode.Run)){
      this.isHasScrolled = true;
      if(listUtils.isScrollStart(listDiv, this.lastScrollOffset)){
        if(scrollStatus !== 'start')
          this.setState({
            scrollStatus: 'start'
          })
      }else {
        if(scrollStatus !== 'mid')
          this.setState({
            scrollStatus: 'mid'
          })
      }
    }
  }

  getTotalPage = () => {
    const {totalCount} = this;
    const {config} = this.props;
    const total = totalCount;
    const totalPage = Math.floor(total / config.itemsPerPage);
    const mode = total % config.itemsPerPage;
    return mode === 0 ? totalPage : totalPage + 1;
  }

  getListVisibleStartIndex = () => {
    const {lastScrollOffset} = this
    const {config} = this.props
    const itemSize = this.itemSize(0)
    const base = lastScrollOffset * 1.0 / itemSize
    let index = Math.floor(base)
    const mo = (base - index) * itemSize
    if(mo > itemSize - config.space){
      index ++
    }
    return index
  }

  handleSortOptionChange = (evt, item: MyDropDownItem) => {
    this.setState({
      sortOptionName: item.label,
      page: 1
    }, () => {
      // this.selectRecords([])
    })
  }

  handleSearchTextChange = (searchText) => {
    const _this = this;
    if(searchText === '' || !searchText){
      this.handleSearchSubmit(undefined);
    }
    clearTimeout(_this.suggestionsQueryTimeout);
    this.suggestionsQueryTimeout = setTimeout(() => {
      _this.getSearchSuggestions(searchText)
    }, 200);
  }

  getSearchSuggestions = (searchText) => {
    const {config} = this.props
    const {datasource} = this.state
    fetchSuggestionRecords(searchText, config, datasource).then(searchSuggestion => {
      this.setState({
        searchSuggestion: searchSuggestion
      });
    });
  }

  handleSearchSubmit = (searchText, isEnter = false) => {
    const oldSearchText = this.state.searchText;
    if(oldSearchText === searchText && !isEnter){
      return;
    }
    this.setState({
      searchText: searchText,
      page: 1
    }, () => {
      // this.selectRecords([])
    })
  }

  changeIsResizingCard(isResizingCard: boolean){
    this.setState({
      isResizingCard: isResizingCard
    })
  }

  handleResizeCard(newCardSize, resizeEnd: boolean = false, isTop?: boolean, isLeft?: boolean, isReplace: boolean = false){

    if(resizeEnd){
      newCardSize.width = parseFloat(newCardSize.width.toFixed(2))
      newCardSize.height = parseFloat(newCardSize.height.toFixed(2))
      window.jimuConfig.isInBuilder && this.props.builderSupportModules.widgetModules.handleResizeCard(this.props, newCardSize, isTop, isLeft, resizeEnd, isReplace);
    }else {
      this.setState({
        currentCardSize: newCardSize
      }, () => {
        this.refreshList(false);
      })
    }
  }

  handleFilterChange = (sqlExprObj: IMSqlExpression) => {
    this.setState({
      currentFilter: sqlExprObj,
      page: 1
    }, () => {
      // this.selectRecords([])
    })
  }

  handleFilterApplyChange = (applied: boolean) => {
    const alterState = {
      filterApplied: applied,
      queryStart: 0
    } as any;

    if(!applied){
      // alterState.currentFilter = undefined
    }
    this.setState(alterState, () => {
      // this.selectRecords([])
    })
  }

  handleShowSelectionClick = (evt) => {
    const {showSelectionOnly} = this.state;
    this.setState({showSelectionOnly: !showSelectionOnly})
  }

  handleClearSelectionClick = (evt) => {
    this.setState({showSelectionOnly: false})
    this.selectRecords([]);
  }

  _getCurrentPage = () => {
    return this.state.page;
  }

  getTotalCount = () => {
    const total = this.totalCount || 0;
    return total
  }

  selectCard = () => {
    const {selectionIsInSelf} = this.props;
    if(selectionIsInSelf){
      this.selectSelf();
    }
  }

  selectSelf(){
    window.jimuConfig.isInBuilder && this.props.builderSupportModules.widgetModules.selectSelf(this.props);
  }

  editBuilderAndSettingStatus = (status: Status) => {
    this.editStatus('showCardSetting', status);
    this.editStatus('builderStatus', status);
  }

  getSortItems = (): ImmutableArray<MyDropDownItem> => {
    const {config} = this.props;
    const options = [] as any;
    if(config.sorts){
      config.sorts.forEach((sort) => {
        sort.rule && sort.rule.forEach(sortData => {
          if(sortData && !!sortData.jimuFieldName){
            options.push({
              label: sort.ruleOptionName,
              event: this.handleSortOptionChange,
            })
          }
        })
      })
    }
    return Immutable(options);
  }

  getOutputDs(): DataSource{
    const outputDsId = this.props.outputDataSources && this.props.outputDataSources[0];
    const useDs = this.props.useDataSources && this.props.useDataSources[0]
    if(!outputDsId || !useDs) return;
    const dsManager = DataSourceManager.getInstance();
    return dsManager.getDataSource(outputDsId);
  }

  renderListTopTools = (ds: DataSource, queryStatus?: DataSourceStatus) => {
    const { widgetRect, isSearchBoxVisible, isOpenTopToolsPopper } = this.state;
    const listWidth = widgetRect?.width || 620;
    return (
      <div className="datasource-tools w-100">
        {listWidth >= LIST_TOOL_MIN_SIZE && <div className="tool-row row1 d-flex align-items-end w-100 justify-content-between">
          {this.renderSearchTools(ds, queryStatus)}
          {(!isSearchBoxVisible || listWidth >= 360) && this.renderTopRightTools(ds, queryStatus)}
        </div>}
        {listWidth < LIST_TOOL_MIN_SIZE && <div className="float-right" ref={ref => this.reference = ref}>
          <Button type="tertiary" icon size="sm"
            className="tools-menu"
            title={this.formatMessage('guideStep9Title')}
            onClick={evt => {this.setState({isOpenTopToolsPopper: !isOpenTopToolsPopper})}} >
            <Icon size={16} icon={menuIcon}  />
          </Button>
          {this.renderListTopToolsInPoper(ds, queryStatus)}
        </div>}

        {window.jimuConfig.isInBuilder && this.isEditing() &&
          <div className="editing-mask-ds-tool" ></div>}
      </div>
    )
  }

  renderListTopToolsInPoper = (ds: DataSource, queryStatus?: DataSourceStatus) => {
    const {widgetRect, isSearchBoxVisible, isOpenTopToolsPopper} = this.state;
    const toolsDisabled = this.isEditing();
    const listWidth = widgetRect?.width || 620;
    const isOpen = listWidth < LIST_TOOL_MIN_SIZE && isOpenTopToolsPopper && !toolsDisabled;
    return (
      <div >
        <Popper
          placement="bottom-start"
          reference={this.reference}
          offset={[-10, 0]}
          open={isOpen}
          showArrow={true}
          toggle={e => {this.setState({isOpenTopToolsPopper: !isOpen})}}>
          <div className="tool-row row1 d-flex align-items-end justify-content-between" css={getToolsPopperStyle(this.props)}>
            {this.renderSearchTools(ds, queryStatus)}
            {!isSearchBoxVisible && this.renderTopRightTools(ds, queryStatus)}
          </div>
        </Popper>
      </div>
    )
  }

  renderSearchTools = (ds: DataSource, queryStatus?: DataSourceStatus) => {
    const toolsDisabled = this.isEditing() || !ds || queryStatus !== DataSourceStatus.Loaded;
    const { searchText, widgetRect, isSearchBoxVisible, showLoading } = this.state;
    const listWidth = widgetRect?.width || 620;
    const {theme, config} = this.props;
    const toolLineClassName = listWidth < 360 ? 'ds-tools-line-blue' : '';
    const placeholder = config?.searchHint || this.formatMessage('search');
    const isShowBackButton = listWidth < 360 && isSearchBoxVisible;
    return (
      <div className="list-search-div flex-grow-1" css={getSearchToolStyle(this.props)}>
        {
          listUtils.showSearch(this.props) &&
          <div className="d-flex search-box-content">
            {(listWidth >= 360 || isSearchBoxVisible) &&
              <div className="flex-grow-1 w-100">
                <SearchBox
                  theme={theme}
                  placeholder={placeholder}
                  searchText={searchText}
                  onSearchTextChange={this.handleSearchTextChange}
                  onSubmit={this.handleSearchSubmit}
                  disabled={toolsDisabled}
                  searchSuggestion={this.state.searchSuggestion}
                  suggestionWidth={listWidth}
                  showLoading={showLoading}
                  formatMessage={this.formatMessage}
                  isShowBackButton={isShowBackButton}
                  toggleSearchBoxVisible={this.toggleSearchBoxVisible}
                  className="list-search "
                />
                <div className={classNames('ds-tools-line', toolLineClassName)}/>
              </div>
            }
            {(listWidth < 360 && !isSearchBoxVisible) && <Button type="tertiary" icon size="sm"
              onClick={evt => {this.toggleSearchBoxVisible(true)}} title={this.formatMessage('search')}>
              <Icon size={16} icon={searchIcon} color={theme.colors.palette.light[800]} />
            </Button>}
          </div>
        }
      </div>
    )
  }

  toggleSearchBoxVisible = (isVisible = false) => {
    const { widgetRect } = this.state;
    this.setState({
      isSearchBoxVisible: isVisible
    });
    const listWidth = widgetRect?.width || 620;
    if(listWidth < LIST_TOOL_MIN_SIZE){
      clearTimeout(this.showPopperTimeOut);
      this.showPopperTimeOut = setTimeout(() => {
        this.setState({
          isOpenTopToolsPopper: true
        });
      })
    }
  }

  getPageSize = () => {
    const {widgetRect} = this.state;
    const showBottomTool = listUtils.showBottomTools(this.props, this.state)
    const bottomToolH = listUtils.getBottomToolH(this.paginatorDiv.current, showBottomTool)
    const showTopTools = listUtils.showTopTools(this.props)
    const listHeight = listUtils.getListHeight(widgetRect, bottomToolH, showTopTools) || 1
    const recordSizePerPage = Math.max(listUtils.getPageSize(widgetRect, listHeight, this.props), 1);
    return recordSizePerPage
  }

  renderTopRightTools = (ds: DataSource, queryStatus?: DataSourceStatus) => {
    const {sortOptionName, showSelectionOnly, currentFilter, filterApplied} = this.state;
    const {config, theme, id, appMode} = this.props;
    const sortItems = this.getSortItems();
    const selectedRecords = ds && ds.getSelectedRecords();
    const hasSelection = selectedRecords && selectedRecords.length > 0;
    return (
      <div className="d-flex align-items-center mr-1" ref={this.listTopRightToolsDiv}>
        {
          listUtils.showSort(this.props) &&
          <Fragment>
            <MyDropDown
              theme={theme}
              items={sortItems}
              appMode={appMode}
              toggleType="tertiary"
              toggleContent={theme => sortOptionName || sortItems && sortItems[0].label}
              size="sm"
              caret={true}
              showActive={true}
              toggleTitle={this.formatMessage('listSort')}
              activeLabel={sortOptionName || sortItems && sortItems[0].label}
            />
          </Fragment>
        }
        {
          listUtils.showFilter(this.props) &&
          <FilterPicker
            filter={currentFilter || config.filter}
            appMode={appMode}
            applied={filterApplied}
            title={this.formatMessage('filter')}
            selectedDs={this.state.datasource}
            handleFilterChange={this.handleFilterChange}
            handleFilterApplyChange={this.handleFilterApplyChange}
            formatMessage={this.formatMessage}
            theme={theme}
            widgetId={id}
          />
        }
        {listUtils.showDisplaySelectedOnly(this.props) &&
          <Button disabled={!hasSelection} type="tertiary" title={this.formatMessage('showSelected')} icon size="sm" active={showSelectionOnly}
            onClick={this.handleShowSelectionClick}
          ><Icon icon={showSelectedOnlyIcon}
              size={16}></Icon>
          </Button>
        }
        {listUtils.showClearSelected(this.props) &&
          <Button disabled={!hasSelection} type="tertiary" title={this.formatMessage('clearSelected')} icon size="sm"
            onClick={this.handleClearSelectionClick}
          ><Icon icon={clearSelectionIcon}
              size={16}></Icon>
          </Button>
        }
      </div>
    )
  }

  // ds: DataSource, info: IMDataSourceInfo, fields?: string[]
  renderList = (ds?: QueriableDataSource, dsInfo?: IMDataSourceInfo) => {
    const {LayoutEntry, showSelectionOnly, widgetRect, scrollStatus, autoRefreshLoadingString, toolsDivWidth, currentCardSize, isScrollEnd} = this.state;
    const {config, isRTL, appMode, showLoading: mustLoading, theme, isHeightAuto, isWidthAuto} = this.props;
    const queryStatus = dsInfo?.status;
    const count = ds?.count;
    this.queryStatus = queryStatus;

    if(!this.isMount){
      return false
    }

    //total count
    if(queryStatus === DataSourceStatus.Unloaded){
      ds = undefined;
    }else if(queryStatus === DataSourceStatus.Loaded && count !== null){
      if(this.totalCount !== count){
        this.setPageTimeout = setTimeout(() => {
          this.setState({
            page: 1
          })
        }, 1)
      }
      this.totalCount = count;
    }

    //loading
    let showLoading = false;
    if(mustLoading || (window.jimuConfig.isInBuilder && !LayoutEntry) || (ds && queryStatus === DataSourceStatus.Loading)){
      showLoading = true;
    }

    const interval = ds?.getAutoRefreshInterval() || 0;
    this.resetAutoRefreshTimes(showLoading, interval);
    if(interval > 0){
      this.setRefreshLoadingString(showLoading);
    }

    //get new records
    let records = defaultRecords
    const showBottomTool = listUtils.showBottomTools(this.props, this.state)
    const bottomToolH = listUtils.getBottomToolH(this.paginatorDiv.current, showBottomTool)
    const showTopTools = listUtils.showTopTools(this.props)
    const listHeight = listUtils.getListHeight(widgetRect, bottomToolH, showTopTools) || 1
    const recordSizePerPage = listUtils.getPageSize(widgetRect, listHeight, this.props);
    const listWidth = widgetRect && widgetRect.width || LIST_CARD_MIN_SIZE;
    const overscanCount = (window.jimuConfig.isInBuilder && appMode !== AppMode.Run) ? 0 : recordSizePerPage;
    if(ds && config.isItemStyleConfirm){
      records = ds && (config.pageStyle === PageStyle.Scroll ? ds.getRecordsByPage(1, recordSizePerPage * this.state.page) : ds.getRecordsByPage(this.state.page, recordSizePerPage)) || [];
      const selectRecords = ds.getSelectedRecords();
      if(showSelectionOnly){
        records = selectRecords;
      }else{
        records = this.initSelectedRecords(records, selectRecords);
      }
    }
    if(window.jimuConfig.isInBuilder && appMode !== AppMode.Run && !showLoading && records.length < 1){
      records = defaultRecords
    }

    if(!showLoading || this.isFirstLoad){
      this.records = records;
    }
    this.isFirstLoad = false;

    if(records.length == 0){
      // this.scrollToIndex(0, 'start');
    }

    if(this.lastSpace !== config.space){
      this.lastSpace = config.space;
      // eslint-disable-next-line react/prop-types
      this.innerElementType = forwardRef(({ style, ...rest }, ref) => (
        <div
          ref={ref}
          onMouseMove={this.handleListMouseMove}
          onMouseLeave={this.handleListMouseLeave}
          style={{
            ...style,
            // eslint-disable-next-line react/prop-types
            height: `${parseFloat(style.height) - (config.direction === DirectionType.Horizon ? 0 : config.space)}px`,
            // eslint-disable-next-line react/prop-types
            width: `${parseFloat(style.width) - (config.direction === DirectionType.Vertical ? 0 : config.space)}px`,
          }}
          {...rest}
        />
      ));
    }

    const listStyleOption = {
      pageStyle: config?.pageStyle,
      scrollBarOpen: config?.scrollBarOpen,
      direction: config?.direction,
      appMode: appMode,
      theme: theme,
      isHeightAuto: isHeightAuto,
      isWidthAuto: isWidthAuto,
      currentCardSize: currentCardSize,
      showTopTools: showTopTools,
      bottomToolH: bottomToolH,
      topRightToolW: toolsDivWidth,
      hasRecords: (this.records?.length ?? 0) > 0
    }

    const listStyles = listStyle(listStyleOption);
    return (
      <div className={'list-container animation'}
        css={listStyles} >
        {/* render top tool */}
        {showTopTools &&
          this.renderListTopTools(ds, queryStatus)}
        {/* render list */}
        <List
          className="widget-list-list"
          ref={this.listRef}
          useIsScrolling
          outerRef={this.setListOutDivRef}
          direction={isRTL ? 'rtl' : 'ltr'}
          layout={config.direction === DirectionType.Horizon ? 'horizontal' : 'vertical'}
          itemCount={this.records.length}
          overscanCount={overscanCount}
          itemKey={this.itemKey}
          width={listWidth}
          height={listHeight}
          onItemsRendered={this.onItemsRendered}
          itemData={this.getItemsByRecords(this.records)}
          innerElementType={this.innerElementType}
          itemSize={this.itemSize}
          onScroll={this.handleListScroll} >
          {this.itemRender}
        </List>
        {/* render bottom tools */}
        {showBottomTool && <div ref={this.paginatorDiv}>
          <ListBottomTools
            isRTL={isRTL}
            totalPage={this.getTotalPage()}
            currentPage={this._getCurrentPage()}
            isEditing={this.isEditing()}
            isScrollEnd={isScrollEnd}
            pageStyle={config.pageStyle}
            direction={config.direction}
            scrollStatus={scrollStatus}
            handleScrollUp={this.handleScrollUp}
            handleScrollDown={this.handleScrollDown}
            handleSwitchPage={this.handleSwitchPage}
            formatMessage={this.formatMessage} />
        </div>}
        {/* mask tip and loading */}
        {window.jimuConfig.isInBuilder && this.isEditing() && !(!showLoading && (!records || records.length < 1)) &&
              <div className="editing-mask-list" ></div>}
        {(!showLoading && (!records || records.length < 1)) && <div className="tip-mask-list text-center">{this.formatMessage('listNoData')}</div>}
        {/* {(showLoading) && <Loading type={LoadingType.Secondary}/>} */}
        {(showLoading || interval > 0) && <div className={classNames('position-absolute refresh-loading-con d-flex align-items-center', this.getRefreshLoadingClass())}>
          {showLoading && <div className="loading-con"></div>}
          {interval > 0 && <div className="flex-grow-1 auto-refresh-loading">{autoRefreshLoadingString}</div>}
        </div>}
      </div>
    )
  }

  //If the selected feature has not been loaded, it will be filled to the last line of the record list
  initSelectedRecords = (records: DataRecord[], selectRecords: DataRecord[]): DataRecord[] => {
    const newRecords = records || [];
    selectRecords?.forEach(selectDs => {
      let isContainSelectRecords = false;
      const selectDatasourceId = selectDs?.getId();
      records?.forEach(ds => {
        const datasourceId = ds?.getId();
        if(selectDatasourceId == datasourceId){
          isContainSelectRecords = true;
        }
      })
      if(!isContainSelectRecords){
        newRecords.push(selectDs);
      }
    })
    return newRecords;
  }

  setListOutDivRef = (current) => {
    if(!current) return;
    const bottomBoundaryId = `bottomBoundary${this.props.id}`;
    this.listOutDivRef = current;
    this.setListDivSize();
    const bottomBoundary = document.createElement('div');
    bottomBoundary.id =  bottomBoundaryId;
    bottomBoundary.className = 'bottom-boundary'
    const listScrollContent = this.listOutDivRef.getElementsByTagName('div')[0]
    this.setScrollContentSize();

    listScrollContent.appendChild(bottomBoundary);
    listUtils.intersectionObserver(
      document.getElementById(bottomBoundaryId),
      this.listOutDivRef,
      this.intersectionObserverCallback
    )
  }

  setScrollContentSize = () => {
    if(!this.listOutDivRef) return;
    const {direction} = this.props?.config
    const listScrollContent = this.listOutDivRef.getElementsByTagName('div')[0]

    if(direction === DirectionType.Horizon){
      listScrollContent.style.height = '100%'
    }else{
      listScrollContent.style.width = '100%'
    }
  }

  intersectionObserverCallback = (isScrollEnd: boolean) => {
    const {appMode, config} = this.props;
    const listDiv = this.listOutDivRef;
    const {datasource} = this.state;
    this.setState({
      isScrollEnd: isScrollEnd
    });
    if(!listDiv || (this.records?.length ?? 0) < 1)return;
    if(config.pageStyle === PageStyle.Scroll
      && this.queryStatus !== DataSourceStatus.Loading && datasource && (!window.jimuConfig.isInBuilder || appMode === AppMode.Run && isScrollEnd) && this.isHasScrolled){
      if(this.records.length < this.getTotalCount()){
        this.setState({
          page : this.state.page + 1,
          scrollStatus: 'end'
        });
        this.isSwitchPage = true;
      }else{
        this.setState({
          scrollStatus: 'end'
        })
      }
    }
  }

  setListDivSize = () => {
    const listDiv = this.listOutDivRef;
    const clientWidth = listDiv?.clientWidth || null;
    const clientHeight = listDiv?.clientHeight || null;
    const toolsDivWidth = this.listTopRightToolsDiv.current?.clientWidth || 0;
    const listDivBoundRect = listDiv?.getBoundingClientRect() || null;
    const listDivSize = {
      clientWidth: clientWidth,
      clientHeight: clientHeight,
    };
    this.setState({
      listDivSize: listDivSize,
      toolsDivWidth: toolsDivWidth,
      listDivBoundRect: listDivBoundRect
    });
  }

  getRefreshLoadingClass = () => {
    const {config, appMode} = this.props;
    const {direction, scrollBarOpen} = config;
    const isEditor = window.jimuConfig.isInBuilder && appMode === AppMode.Design;
    if(!scrollBarOpen || isEditor) {
      return '';
    }
    if(direction == DirectionType.Vertical){
      return 'vertical-loading';
    }else{
      return 'horizon-loading';
    }

  }

  resetAutoRefreshTimes = (showLoading = false, interval: number) => {
    const _this = this;
    clearTimeout(this.resetAutoRefreshTime);
    if(interval <= 0){
      clearInterval(this.autoRefreshLoadingTime);
    }

    this.resetAutoRefreshTime = setTimeout(() => {
      if(showLoading && interval > 0){
        _this.setState({
          autoRefreshLoadingString: _this.formatMessage('lastUpdateAFewTime'),
        })
      }
      _this.setState({
        showLoading: showLoading,
      })
    },0);

  }

  setRefreshLoadingString = (showLoading = false) => {
    if(!showLoading){
      return false;
    }

    let time = 0;
    const _this = this;
    clearInterval(this.autoRefreshLoadingTime);

    this.autoRefreshLoadingTime = setInterval(() => {
      time++

      _this.setState({
        autoRefreshLoadingString: _this.getLoadingString(time)
      })
    }, 60000)
  }

  getLoadingString = (time: number): string => {
    let loadingString= this.formatMessage('lastUpdateAFewTime');
    if(time > 1 && time <= 2){
      loadingString= this.formatMessage('lastUpdateAMinute');
    }else if(time > 2){
      loadingString= this.formatMessage('lastUpdateTime',{updateTime: time});
    }
    return loadingString;
  }

  onItemsRendered = ({
    overscanStartIndex,
    overscanStopIndex,
    visibleStartIndex,
    visibleStopIndex
  }) => {
    // All index params are numbers.
    this.listVisibleStartIndex = visibleStartIndex;
    this.listVisibleStopIndex = visibleStopIndex;
    const {config} = this.props;
    if(this.needRefreshListOnListRendered){
      this.needRefreshListOnListRendered = false;
      this.refreshList();
    }
    if(this.isSwitchPage) {
      if(config.pageStyle === PageStyle.Scroll){
        if(this.records.length > visibleStopIndex + 1){
          this.isSwitchPage = false;
          this.onItemsRenderedTimeout = setTimeout(() => {
            this.handleScrollDown(null);
          }, 500);
        }
      }else{
        this.isSwitchPage = false;
      }
    }

  }

  itemSize = (index) => {
    const {config} = this.props;
    const {currentCardSize} = this.state;

    const size = config.direction === DirectionType.Horizon ? (currentCardSize.width + config.space) :
      (currentCardSize.height + config.space)
    // const size = config.direction === DirectionType.Horizon ?
    // ((index === (this.records.length - 1) && index !== 0) ?
    //   currentCardSize.width : (currentCardSize.width + config.space)) :
    //   ((index === (this.records.length - 1) && index !== 0) ?
    //   currentCardSize.height : (currentCardSize.height + config.space))
    return size;
  }

  getItemsByRecords = (records) => {
    const {config, selectionIsInSelf, selectionIsSelf, builderStatus,
      appMode, queryObject, useDataSources} = this.props;
    const {datasource, hoverIndex} = this.state;
    const selectedRecordIds = (!datasource || !config.isItemStyleConfirm ?  [] : datasource.getSelectedRecordIds()).map(v => v + '');

    return records && records.map((record, index) => {
      const isEditor = index === 0 && window.jimuConfig.isInBuilder && appMode === AppMode.Design;
      const editProps = isEditor ? {
        hideCardTool: this.state.hideCardTool,
        selectionIsList: selectionIsSelf,
        selectionIsInList: selectionIsInSelf,
        isEditing: this.isEditing(),
        builderStatus: builderStatus,
        lockItemRatio: config.lockItemRatio,
        changeIsResizingCard: this.changeIsResizingCard
      } : {
        linkParam: config.linkParam,
        queryObject: queryObject,
        useDataSources,
      };
      return {
        index,
        isHover: hoverIndex === index,
        record: config.isItemStyleConfirm ? record : undefined,
        active: !record.fake && config.isItemStyleConfirm && datasource && selectedRecordIds.indexOf(record.getId()) > -1,
        ...this.getOtherProps(),
        ...editProps
      }
    })
  }

  getOtherProps = () => {
    const {config, theme, id, appMode, builderSupportModules, layouts,
      browserSizeMode, dispatch, isRTL} = this.props;
    const {datasource} = this.state;
    return {
      browserSizeMode: browserSizeMode,
      space: config.space,
      isRTL: isRTL,
      builderSupportModules: builderSupportModules,
      formatMessage: this.formatMessage,
      dispatch: dispatch,
      widgetId: id,
      interact: window.jimuConfig.isInBuilder && builderSupportModules.widgetModules.interact,
      selectCard: this.selectCard,
      handleResizeCard: this.handleResizeCard,
      appMode: appMode,
      onChange: this.handleItemChange,
      hoverLayoutOpen: config.cardConfigs[Status.Hover].enable,
      selectable: config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None,
      direction: config.direction,
      theme: theme,
      LayoutEntry: this.state.LayoutEntry,
      layouts: layouts,
      cardConfigs: config.cardConfigs,
      datasourceId: datasource && datasource.id
    }
  }

  itemRender = (props) => {
    let style = props['style'];
    const index = props['index'];
    const items = props['data'];
    const {appMode, config} = this.props;
    if(config.direction === DirectionType.Horizon){//for the last item
      style = {
        ...style,
        width: `${parseFloat(style.width) - config.space}px`
      }
    }else {
      style = {
        ...style,
        height: `${parseFloat(style.height) - config.space}px`
      }
    }

    const isEditor = index === 0 && window.jimuConfig.isInBuilder && appMode === AppMode.Design;
    const ListCard = isEditor ? ListCardEditor : ListCardViewer;
    return (
      <ListCard
        listStyle={style}
        widgetId={this.props.id}
        {...items[index]}
      />
    )
  }

  itemKey = (index) => {
    const item = this.records[index];
    return `${(item.getId && item.getId()) || index}`;
  }

  render() {
    const {config, id, appMode, browserSizeMode, selectionIsInSelf, selectionIsSelf,
      useDataSources, builderStatus, layouts} = this.props;
    const appConfig = getAppStore().getState().appConfig
    const {forceShowMask, datasource, widgetRect, page} = this.state;
    const isInBuilder = window.jimuConfig.isInBuilder;
    const classes = classNames(
      'jimu-widget',
      'widget-list',
      'list-widget-' + id
    );

    if(!config.itemStyle){
      return <WidgetPlaceholder widgetId={this.props.id} icon={require('./assets/icon.svg')} message={this.formatMessage('placeHolderTip')}/>;
    }

    const showBottomTool = listUtils.showBottomTools(this.props, this.state)
    const bottomToolH = listUtils.getBottomToolH(this.paginatorDiv.current, showBottomTool)
    const showTopTools = listUtils.showTopTools(this.props)
    const listHeight = listUtils.getListHeight(widgetRect, bottomToolH, showTopTools)
    const pageSize = listUtils.getPageSize(widgetRect, listHeight, this.props)
    const queryPageSize = pageSize;

    let query = getQueryOptions(this.state, this.props, queryPageSize);
    if(!compareQueryOptionsExceptPaging(query, this.lastQuery, datasource as QueriableDataSource)){
      if(page !== 1){
        const temp = query
        query = this.lastQuery
        this.lastQuery = temp
        this.setState({
          page: 1
        })
      }
    }

    const currentLayout = appConfig.layouts[searchUtils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode)];
    const currentLayoutType = currentLayout && currentLayout.type;

    return <div className={classes} css={getStyle(this.props, this.isEditing(), showBottomTool)}
      onPointerDown={evt => isInBuilder && appMode !== AppMode.Run && !selectionIsSelf && !selectionIsInSelf && this.handleListPointerDown(evt)}  >

      <div className={'widget-list d-flex'}>
        {
          this.isDsConfigured() ?
            <DataSourceComponent
              query={datasource ? query : null}
              useDataSource={useDataSources && useDataSources[0]}
              onDataSourceCreated={this.onDSCreated}
              widgetId={this.props.id}
              queryCount={true}
            >
              {this.renderList}
            </DataSourceComponent>
            :
            this.renderList()
        }
      </div>

      {((isInBuilder && appMode !== AppMode.Run) && (forceShowMask || (!selectionIsInSelf && !selectionIsSelf) || (!config.isItemStyleConfirm && currentLayoutType))) &&
      <div
        className="list-with-mask"
      />}
      <ReactResizeDetector handleWidth handleHeight onResize={this.debounceOnResize} />

    </div>
  }
}

export default Widget;

