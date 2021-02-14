/** @jsx jsx */
import {React, css, IMThemeVariables,
  RepeatedDataSource, AppMode, BrowserSizeMode, DataRecord} from 'jimu-core';
import { DirectionType} from '../../config';

export interface ListCardProps{
  isHover: boolean,
  isScrolling: boolean,
  theme: IMThemeVariables,
  index: number,
  widgetId: string,
  record: DataRecord,
  datasourceId: string,
  listStyle: any,
  layouts: any,
  direction: DirectionType,
  space: number,
  active: boolean,
  selectable: boolean,
  hoverLayoutOpen: boolean,
  browserSizeMode: BrowserSizeMode,
  formatMessage: (id: string, values?: {[key: string]: any}) => string,
  appMode: AppMode,
  onChange: (itemRecord: DataRecord) => void,
  cardConfigs?: any,
}

export interface ListCardStates {

}

export default class ListCard<P extends ListCardProps = ListCardProps, S extends ListCardStates = ListCardStates> extends React.Component<P, S>{

  providerData: RepeatedDataSource;

  getNewProviderData = () => {
    const {widgetId, datasourceId, index, record} = this.props;
    return {
      widgetId: widgetId,
      dataSourceId: datasourceId,
      recordIndex: index,
      record: record
    }
  }

  shouldComponentUpdateExcept = (nextProps, nextStats, exceptPropKeys: string[], exceptStatKeys: string[] = []) => {
    let shouldUpdate = false;
    this.props && Object.keys(this.props).some(key => {
      if(exceptPropKeys.indexOf(key) > -1)return false;
      if(this.props[key] !== nextProps[key]){
        // console.log(`props has changed: ${key}`)
        shouldUpdate = true;
        return true;
      }
    })
    this.state && Object.keys(this.state).some(key => {
      if(exceptStatKeys.indexOf(key) > -1)return false;
      if(this.state[key] !== nextStats[key]){
        // console.log(`states has changed: ${key}`)
        shouldUpdate = true;
        return true;
      }
    })

    return shouldUpdate;
  }

  isProviderEqual = (providerData: RepeatedDataSource, oldProviderData: RepeatedDataSource): boolean => {
    let isEqual = true;
    if(providerData){
      Object.keys(providerData).some(key => {
        if(!oldProviderData){
          isEqual = false;
          return true;
        }
        const data = providerData[key];
        const oldData = oldProviderData[key];
        if(data !== oldData){
          isEqual = false;
          return true;
        }
      })
    }else if(oldProviderData){
      return false;
    }

    return isEqual;
  }

  formatMessage = (id: string, values?: {[key: string]: any}) => {
    return this.props.formatMessage(id, values);
  }

  getStyle = () => {
    const {widgetId, selectable, appMode} = this.props;
    return css`
    ${'&.list-card-' + widgetId} {
      padding: 0;
      border: 0;
      background-color: transparent;
      .list-card-content {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
    &.surface-1{
      border: none !important;
    }
    .list-clear-background {
      background: transparent;
    }
    ${'&.list-card-' + widgetId}:hover {
      ${
        (!window.jimuConfig.isInBuilder || appMode === AppMode.Run) && selectable ?
          'cursor: pointer;' :
          ''
      }
    }
    `;
  }
}