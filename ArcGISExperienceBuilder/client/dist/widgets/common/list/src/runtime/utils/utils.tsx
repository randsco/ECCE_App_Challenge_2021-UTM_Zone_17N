import {DirectionType, CardSize, Status, PageStyle, DS_TOOL_H, BOTTOM_TOOL_H, SelectionModeType} from '../../config'
import { DataRecord, DataSourceManager, IMUseDataSource } from 'jimu-core';
import { ListProps, ListStates } from '../widget';
import { SortSettingOption } from 'jimu-ui/advanced/setting-components';

export function isScrollStart(listDiv: HTMLDivElement, lastScrollOffset: number): boolean{
  if(!listDiv)return true;
  const scrollTOrL = lastScrollOffset;
  const isStart = scrollTOrL < 2
  return isStart;
}

export function isEqualCardSizeByDirection(cardSize1: CardSize, cardSize2: CardSize, direction: DirectionType){
  if(direction === DirectionType.Horizon){
    return isEqualNumber(cardSize1.width, cardSize2.width);
  }
  return isEqualNumber(cardSize1.height, cardSize2.height);
}

export function isEqualNumber(num1: number, num2: number): boolean{
  if(Math.abs(num1 - num2) < 0.0001){
    return true;
  }else{
    return false;
  }
}

export function createOutputDs(records: DataRecord[], outputDsId: string, useDs: IMUseDataSource){
  if(!outputDsId || !useDs) return;
  const dsManager = DataSourceManager.getInstance();
  if(dsManager.getDataSource(outputDsId)){
    if(dsManager.getDataSource(outputDsId).getDataSourceJson().originDataSources[0].dataSourceId !== useDs.dataSourceId){
      dsManager.destroyDataSource(outputDsId);

      dsManager.createDataSource(outputDsId).then(ods => {
        ods.setRecords(records);
      });
    }else{
      const ods = dsManager.getDataSource(outputDsId);
      ods.setRecords(records);
    }
  }else {
    dsManager.createDataSource(outputDsId).then(ods => {
      ods.setRecords(records);
    });
  }
}

export function getCardSizeInConfig(props: ListProps): CardSize{
  const {config, builderStatus, browserSizeMode} = props;
  let cardConfigs = config.cardConfigs[builderStatus];
  if(!cardConfigs || !cardConfigs.cardSize){
    cardConfigs = config.cardConfigs[Status.Regular];
  }
  let cardSize = cardConfigs.cardSize[browserSizeMode];
  if(!cardSize){
    cardSize = cardConfigs.cardSize[Object.keys(cardConfigs.cardSize)[0]]
  }
  return cardSize;
}

export function getPageSize(widgetRect, listHeight: number, props: ListProps): number{
  const cardSize = getCardSizeInConfig(props);
  const {config, isHeightAuto, isWidthAuto} = props;
  let pageSize;
  if(config.pageStyle === PageStyle.Scroll){
    if(!widgetRect){
      return 0;
    }
    if(config.direction === DirectionType.Vertical){
      if(widgetRect.height === 0) return 0;
      if(isHeightAuto){
        listHeight = document.body.scrollHeight
      }
      pageSize = Math.ceil(listHeight / (cardSize.height + config.space)) + 1;
    }else {
      if(widgetRect.width === 0) return 0;
      let listWidth = widgetRect.width
      if(isWidthAuto){
        listWidth = document.body.scrollWidth
      }
      pageSize = Math.ceil(listWidth / (cardSize.width + config.space)) + 1;
    }
    if(config.navigatorOpen){
      pageSize = Math.max(pageSize, config.scrollStep)
    }
  }else {
    pageSize = config.itemsPerPage;
  }
  return pageSize;
}

export function getBottomToolH(paginatorDiv: HTMLDivElement, showBottomTools: boolean): number{
  let bottomToolH = BOTTOM_TOOL_H;
  if(paginatorDiv){
    bottomToolH = paginatorDiv.clientHeight;
  }
  bottomToolH = showBottomTools ? bottomToolH : 0;
  return bottomToolH;
}

export function getListHeight(widgetRect, bottomToolH: number, showTopTool: boolean): number{
  const dsToolH = showTopTool ? DS_TOOL_H : 0;
  if(!widgetRect)return 0;
  const height = widgetRect.height - dsToolH - bottomToolH;
  return height < 0 ? 0 : height;
}

export function showBottomTools(props: ListProps, state: ListStates): boolean{
  const {config} = props;
  const {datasource} = state;
  return !!datasource && !(config.pageStyle === PageStyle.Scroll && !config.navigatorOpen)
}

export function showTopTools(props: ListProps): boolean{
  return showSort(props) || showDisplaySelectedOnly(props) ||
    showClearSelected(props) || showFilter(props) || showSearch(props)
}

export function showSort(props: ListProps): boolean{
  const {config} = props;
  if(!config.sortOpen || !config.sorts || config.sorts.length < 1)return false;
  const sorts = config.sorts;
  let isValid = false;
  sorts.some((sort: SortSettingOption) => {
    sort.rule && sort.rule.some(sortData => {
      if(sortData && !!sortData.jimuFieldName){
        isValid = true;
      }
      return isValid
    })
    return isValid
  })
  return isValid;
}

export function showSearch(props: ListProps): boolean{
  const {config} = props;
  return config.searchOpen && config.searchFields && config.searchFields !== '';
}

export function showFilter(props: ListProps): boolean{
  const {config} = props;
  return config.filterOpen && !!config.filter;
}

export function showDisplaySelectedOnly(props: ListProps): boolean{
  const {config} = props;
  return config.showSelectedOnlyOpen && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None;
}

export function showClearSelected(props: ListProps): boolean{
  const {config} = props;
  return config.showClearSelected && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None;
}

export function intersectionObserver(
  ref: HTMLElement,
  rootElement: HTMLElement,
  onChange?: (isIn: boolean) => void,
  options?: IntersectionObserverInit
) {
  const option: any= options || {root: rootElement};
  const callback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver){
    const isIn = entries[0].intersectionRatio > 0;
    onChange && onChange(isIn)
  };
  const observer = new IntersectionObserver(
    callback,
    option
  );
  observer.observe(ref);
  return observer;
}
