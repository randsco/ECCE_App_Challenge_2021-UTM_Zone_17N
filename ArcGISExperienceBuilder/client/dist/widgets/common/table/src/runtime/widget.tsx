/** @jsx jsx */
import { React, jsx, AllWidgetProps, classNames, ThemeVariables, SerializedStyles, css, DataSourceComponent, QueriableDataSource, Immutable,
  appActions, lodash, QueryParams, MessageManager, DataRecordsSelectionChangeMessage, ClauseValuePair, ReactResizeDetector, Global, DataSourceInfo,
  IMDataSourceInfo, getAppStore, CONSTANTS } from 'jimu-core';
import { IMConfig, LayersConfig, TableArrangeType } from '../config';
import { loadArcGISJSAPIModules, FeatureDataRecord, FeatureLayerDataSource } from 'jimu-arcgis';
import defaultMessages from './translations/default';
import { WidgetPlaceholder, defaultMessages as jimuUIDefaultMessages, Button, Icon, TextInput, Tabs, Tab, Select, AdvancedSelect } from 'jimu-ui';

const { BREAK_POINTS } = CONSTANTS;
const showSelectedOnlyIcon = require('jimu-ui/lib/icons/show-selected-only.svg');
const uncheckAllIcon = require('jimu-ui/lib/icons/uncheck-all.svg');
const resetIcon = require('jimu-ui/lib/icons/reset.svg');
const showHideIcon = require('jimu-ui/lib/icons/show-hide-cols.svg');

export interface Props{
  dataSourcesInfo?: {[dsId: string]: DataSourceInfo};
}

export interface State{
  apiLoaded: boolean,
  dataSource: QueriableDataSource,
  activeTabId: string,
  downloadOpen: boolean,
  searchText: string,
  query: string,
  selectQueryFalg: boolean,
  mobileFlag: boolean,
  tableShowColumns: ClauseValuePair[],
  creatingFlag: boolean,
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig> & Props, State>{
  table: __esri.FeatureTable;
  dataSourceChange: boolean;
  dropdownCsv: any;
  refs: {
    tableContainer: HTMLInputElement;
    advancedSelect: HTMLElement;
  };
  debounceOnResize: (width, height) => void;
  FeatureTable: typeof __esri.FeatureTable = null;
  FeatureLayer: typeof __esri.FeatureLayer = null;

  constructor(props) {
    super(props);

    this.state = {
      apiLoaded: false,
      dataSource: undefined,
      activeTabId: undefined,
      downloadOpen: false,
      searchText: '',
      query: undefined,
      selectQueryFalg: false,
      mobileFlag: false,
      tableShowColumns: undefined,
      creatingFlag: false,
    };
    this.dataSourceChange = false;
    this.debounceOnResize = lodash.debounce((width, height) => this.onToolStyleChange(width, height), 200);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { config } = nextProps;
    const { layersConfig } = config;
    const { activeTabId } = prevState;
    if(!activeTabId || layersConfig.findIndex(x => x.id === activeTabId) < 0) {
      return {
        activeTabId: layersConfig.length > 0 ? layersConfig[0].id : undefined,
      };
    }
    return null;
  }

  componentDidMount() {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules([
        'esri/widgets/FeatureTable',
        'esri/layers/FeatureLayer'
      ]).then(modules => {
        [this.FeatureTable, this.FeatureLayer] = modules;
        this.setState({
          apiLoaded: true
        });
        this.createTable();
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { creatingFlag } = this.state;
    const { id } = this.props;
    const removeLayerFlag = this.props?.stateProps?.removeLayerFlag || false;
    if(removeLayerFlag){
      const popover = document.getElementsByClassName('esri-popover esri-popover--open');
      if(popover && popover.length > 0) popover[0].remove();
      this.props.dispatch(appActions.widgetStatePropChange(id, 'removeLayerFlag', false));
    }

    const prevCurConfig = prevProps.config.layersConfig.find(item => item.id === prevState.activeTabId);
    const newCurConfig = this.props.config.layersConfig.find(item => item.id === this.state.activeTabId);
    if(!prevCurConfig || !newCurConfig) return;
    const optionKeys = ['enableAttachements', 'enableEdit', 'allowCsv', 'enableSearch', 'searchFields', 'enableRefresh', 'enableSelect', 'tableFields'];
    let optionChangeFlag = false;
    for(const i in optionKeys){
      const item = optionKeys[i];
      if(prevCurConfig[item] !== newCurConfig[item]) {
        optionChangeFlag = true;
        break;
      }
    }
    const updateTable = () => {
      const tableOptionChange = prevCurConfig.id === newCurConfig.id && optionChangeFlag;
      const tableActiveChange = prevCurConfig.id !== newCurConfig.id && !this.dataSourceChange;
      return !creatingFlag && (tableOptionChange || tableActiveChange);
    }
    if(updateTable()){
      this.setState({
        searchText: '',
        query: undefined,
        tableShowColumns: undefined,
      },() => {
        this.destoryTable().then(() => {
          this.createTable();
        });
      });
    }
  }

  onToolStyleChange = (width, height) => {
    width < BREAK_POINTS[0] ? this.setState({ mobileFlag: true }) : this.setState({ mobileFlag: false });
  }

  subSet = (array1, array2) => {
    const arr1 = array1.map(JSON.stringify);
    const arr2 = array2.map(JSON.stringify);
    return arr1.concat(arr2).filter((v, i, arr) => {
      return arr.indexOf(v) === arr.lastIndexOf(v);
    }).map(JSON.parse)
  }

  onDataSourceCreated = (dataSource: QueriableDataSource): void => {
    this.dataSourceChange = true;
    this.setState({ dataSource }, () => {
      this.destoryTable().then(() => {
        this.createTable();
      });
    });
  }

  onDataSourceInfoChange = (info: IMDataSourceInfo) => {
    const { dataSource } = this.state;
    const selectedRecords = dataSource && dataSource.getSelectedRecords();
    if(this.table && this.table.clearSelection) this.table.clearSelection();
    if(selectedRecords && selectedRecords.length !== 0){
      const featuresArray = selectedRecords.map(record => {
        return (record as FeatureDataRecord)?.feature as __esri.Graphic;
      })
      this.table && this.table.selectRows(featuresArray);
    }
    const curQuery = dataSource && dataSource.getCurrentQueryParams();
    this.searchTable(curQuery);
  }

  searchTable = (curQuery) => {
    if(this.table && this.table.layer) this.table.layer.definitionExpression = curQuery.where;
  }

  getFeatureLayer = (dataSource) =>{
    let featureLayer;
    if(dataSource.layer) {
      featureLayer = dataSource.layer;
    }else{
      if(dataSource.itemId) {
        featureLayer = new this.FeatureLayer({
          portalItem: {
            id: dataSource.itemId,
            portal: {
              url: dataSource.portalUrl
            }
          },
        });
      } else {
        featureLayer = new this.FeatureLayer({
          url: dataSource.url,
        });
      }
    }
    // Bug: js-api does not enter the when callback if there is no load method here.
    return featureLayer.load().then(() => {
      return Promise.resolve(featureLayer);
    });
  }

  createTable = () => {
    const { config, id, theme } = this.props;
    const { layersConfig } = config;
    const { dataSource, activeTabId } = this.state;
    this.setState({ creatingFlag: true });
    this.createDomStyle(theme);
    const curLayer = layersConfig.asMutable({deep: true}).find(item => item.id === activeTabId);
    if(!curLayer) return;
    let container;
    if(document.getElementsByClassName(`table-container-${id}`).length === 0){
      container = document && document.createElement('div');
      container.className = `table-container-${id}`;
      this.refs.tableContainer && this.refs.tableContainer.appendChild(container);
    }else{
      container = document.getElementsByClassName(`table-container-${id}`)[0];
    }
    const invisibleColumns = this.subSet(curLayer.allFields, curLayer.tableFields).map(item => {
      return item.jimuName;
    });
    const fieldConfigs = curLayer.tableFields.map(item => {
      return {
        name: item.jimuName,
        label: item.alias,
        visible: invisibleColumns.indexOf(item.jimuName) < 0,
      };
    });
    let tableMenuItem = [];
    if(curLayer.enableSelect) {
      tableMenuItem = tableMenuItem.concat([{
        label: this.formatMessage('toggleSelect'),
        iconClass: 'widget-table-tool-icon-show-selection',
        clickFunction: () => {
          this.onShowSelection();
        }
      },
      {
        label: this.formatMessage('clearSelection'),
        iconClass: 'widget-table-tool-icon-selection-clear',
        clickFunction: () => {
          this.onSelectionClear();
        }
      }
      ]);
    }
    if(curLayer.enableRefresh) {
      tableMenuItem.push({
        label: this.formatMessage('refresh'),
        iconClass: 'widget-table-tool-icon-refresh',
        clickFunction: () => {
          this.onTableRefresh();
        }
      })
    }
    tableMenuItem.push({
      label: this.formatMessage('showHideCols'),
      iconClass: 'widget-table-tool-icon-show-hide-cols',
      clickFunction: () => {
        this.popupShowHideCols();
      }
    });

    dataSource && this.getFeatureLayer(dataSource).then(featureLayer => {
      this.table = new this.FeatureTable({
        layer: featureLayer,
        container: container,
        visibleElements: {
          header: true,
          menu: true,
          menuItems: {
            clearSelection: false,
            refreshData: false,
            toggleColumns: false
          }
        },
        menuConfig: {
          items: tableMenuItem,
        },
        fieldConfigs,
        attachmentsEnabled: curLayer.enableAttachements,
        editingEnabled: curLayer.enableEdit,
      });

      const realQuery: any = dataSource.getRealQueryParams({ where: '1=1' } as QueryParams,'query');
      if(this.table && this.table.layer) this.table.layer.definitionExpression = realQuery.where;
      (this.table as any).grid.visibleElements.selectionColumn = false;
      if(curLayer.enableSelect) {
        (this.table as any).grid.on('row-click', ({ context, native }) => {
          const feature = context.item.feature;
          context.selected ? this.table.deselectRows(feature) : this.table.selectRows(feature);

          const selectedItems = (this.table as any).grid?.selectedItems?.toArray();
          const objectIdField = (dataSource as FeatureLayerDataSource)?.layer?.objectIdField || 'OBJECTID';
          const selectedQuery = selectedItems && selectedItems.length > 0 ? `${objectIdField} IN (${selectedItems.map(item => {
            return item.feature?.attributes[objectIdField] || item.objectId;
          }).join()})` : '1=2';
          dataSource.query({ where: selectedQuery, returnGeometry: true} as QueryParams).then(result => {
            if(result.records) {
              const records = result.records;
              MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(id, result.records));
              dataSource.selectRecordsByIds(
                records.map(record => record.getId())
              );
            }
          });
        });
      }
      this.setState({ creatingFlag: false });
      this.dataSourceChange = false;
    });
  }

  destoryTable() {
    this.table && !this.table.destroyed && this.table.destroy();
    return Promise.resolve();
  }

  createDomStyle = (theme: ThemeVariables) => {
    const themeName =  getAppStore().getState()?.appConfig?.theme;
    const alreadyGrid = document.getElementById('exb-grid-styles');
    const alreadySort = document.getElementById('exb-sorter-styles');
    if(alreadyGrid) alreadyGrid.remove();
    if(alreadySort) alreadySort.remove();
    const gridDom = document && document.createElement('dom-module');
    gridDom.setAttribute('id', 'exb-grid-styles');
    gridDom.setAttribute('theme-for', 'vaadin-grid');
    const sortDom = document && document.createElement('dom-module');
    sortDom.setAttribute('id', 'exb-sorter-styles');
    sortDom.setAttribute('theme-for', 'vaadin-grid-sorter');
    let moduleCssHTML = `<template>
      <style>
        [part~="header-cell"] {
          color: ${theme.colors.palette.dark[700]};
          background-color: ${theme.colors.palette.light[100]};
        }
      </style>
    </template>`;
    let moduleSortHTML = `<template>
      <style>
        :host([direction]) {
          color: ${theme.colors.palette.dark[700]};
        }
      </style>
    </template>`;
    switch (themeName) {
      case 'themes/default/':
      case 'themes/shared-theme/':
      case 'themes/ink/':
        moduleCssHTML = `<template>
          <style>
            [part~="header-cell"] {
              color: ${theme.colors.palette.dark[700]};
              background-color: ${theme.colors.palette.light[100]};
            }
          </style>
        </template>`;
        break;
      case 'themes/dark/':
      case 'themes/morandi/':
        moduleCssHTML = `<template>
          <style>
            [part~="header-cell"] {
              color: ${theme.colors.palette.dark[700]};
              background-color: ${theme.colors.palette.light[300]};
            }
          </style>
        </template>`;
        moduleSortHTML = `<template>
          <style>
            :host([direction]) {
              color: ${theme.colors.palette.dark[700]};
            }
          </style>
        </template>`;
        break;
      case 'themes/vivid/':
        moduleCssHTML = `<template>
          <style>
            [part~="header-cell"] {
              color: ${theme.colors.palette.dark[700]};
              background-color: ${theme.colors.palette.light[200]};
            }
          </style>
        </template>`;
        moduleSortHTML = `<template>
          <style>
            :host([direction]) {
              color: ${theme.colors.palette.dark[700]};
            }
          </style>
        </template>`;
        break;
    }
    gridDom.innerHTML = moduleCssHTML;
    sortDom.innerHTML = moduleSortHTML;
    document.head.appendChild(gridDom);
    document.head.appendChild(sortDom);
  }

  formatMessage = (id: string, values?: {[key: string]: any}) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages);
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] }, values);
  }

  onTagClick = (dataSourceId: string) => {
    const { id } = this.props;
    this.setState({
      activeTabId: dataSourceId,
      selectQueryFalg: false,
      tableShowColumns: undefined,
    });
    this.props.dispatch(appActions.widgetStatePropChange(id, 'activeTabId', dataSourceId));
  }

  handleTagChange = (evt) => {
    const dataSourceId = evt?.target?.value;
    const { id } = this.props;
    this.setState({
      activeTabId: dataSourceId,
      selectQueryFalg: false,
    });
    this.props.dispatch(appActions.widgetStatePropChange(id, 'activeTabId', dataSourceId));
  }

  onShowSelection = () => {
    const { dataSource, selectQueryFalg } = this.state;
    if(selectQueryFalg){
      const curQuery = dataSource && dataSource.getCurrentQueryParams();
      this.searchTable(curQuery);
    }else{
      const selectedArray = (this.table as any).grid.selectedItems.items;
      if(selectedArray.length === 0) return;
      const objectIdField = (dataSource as FeatureLayerDataSource)?.layer?.objectIdField || 'OBJECTID';
      const selectedQuery = `${objectIdField} IN (${selectedArray.map(item => {
        return item.feature?.attributes[objectIdField] || item.objectId;
      }).join()})`;
      this.table.layer.definitionExpression = selectedQuery;
    }
    this.setState({ selectQueryFalg: !selectQueryFalg });
  }

  onSelectionClear = () => {
    this.table && this.table.clearSelection();
  }

  onTableRefresh = () => {
    this.table && this.table.refresh();
  }

  popupShowHideCols = () => {
    const advancedElement = this.refs.advancedSelect.getElementsByTagName('button')[0]
    advancedElement && advancedElement.click();
  }

  getQueryOptions = (curLayer: LayersConfig) => {
    let options = '1=1';
    const { useDataSources, id } = this.props;
    const { searchText, dataSource } = this.state;
    const useDS = useDataSources && useDataSources[0];
    if(!dataSource || !useDS) return null;
    // not queryiable data source, return
    if(!(dataSource as QueriableDataSource).query){
      return null;
    }
    // searchText
    if(!searchText){
      return dataSource.getRealQueryParams({ where: options } as QueryParams,'load', {widgetId: id});
    }
    if(curLayer.enableSearch && curLayer.searchFields){
      options = (options || '1=1') + ' AND ';
      options += `(${curLayer.searchFields.split(',').map(field => {
        if(curLayer.searchExact){
          return `${field} = '${searchText}'`
        }else {
          return `${field} LIKE '%${searchText}%'`
        }
      }).join(' OR ')})`;
    }
    return dataSource.getRealQueryParams({ where: options } as QueryParams,'load', {widgetId: id});
  }

  handleChange = searchText => {
    if(!searchText){
      this.setState({ searchText }, ()=>{
        this.handleSubmit();
      });
    }else{
      this.setState({ searchText });
    }
  }

  handleSubmit = () => {
    const curLayer = this.props.config.layersConfig.find(item => item.id === this.state.activeTabId);
    const realQuery: any = this.getQueryOptions(curLayer);
    this.setState({ query: realQuery.where });
  }

  onKeyUp = (evt) => {
    if(!evt || !evt.target) return;
    if (evt.keyCode === 13) {
      this.handleSubmit();
    }
  }

  renderSearchTools = () => {
    const { searchText } = this.state;
    const { theme } = this.props;

    return (
      <div className="table-search-div">
        <div className="d-flex align-items-center table-search">
          <Button type="tertiary" icon size="sm" onClick={evt => this.handleSubmit()} className="search-icon">
            <Icon size={16} icon={require('jimu-ui/lib/icons/search-16.svg')} color={theme.colors.palette.light[800]} />
          </Button>
          <TextInput
            className="search-input"
            placeholder={this.formatMessage('search')}
            onChange={e => this.handleChange(e.target.value)}
            value={searchText || ''}
            onKeyDown ={e => this.onKeyUp(e)}>
          </TextInput>
        </div>
      </div>
    )
  }

  getInitFields = () => {
    const { activeTabId } = this.state;
    const { config } = this.props;
    const { layersConfig } = config;
    const curLayer = layersConfig.find(item => item.id === activeTabId);
    const defaultInvisible = ['CreationDate', 'Creator', 'EditDate', 'Editor', 'GlobalID'];
    const allFields = curLayer.tableFields;
    const initSelectTableFields = [];
    for(const i in allFields){
      const item = allFields[i];
      if(defaultInvisible.indexOf(item.name) < 0) {
        initSelectTableFields.push({ value: item.name, label: item.alias });
      }
    }
    return initSelectTableFields;
  }

  onValueChangeFromRuntime = (valuePairs: ClauseValuePair[]) => {
    if(!valuePairs) valuePairs = [];
    const { tableShowColumns } = this.state;
    const initTableFields = this.getInitFields();
    const tableColumns = tableShowColumns ? tableShowColumns : initTableFields;
    const selectFlag = valuePairs.length > tableColumns.length;
    this.subSet(tableColumns, valuePairs).map(item => {
      selectFlag ? this.table.showColumn(item.value) : this.table.hideColumn(item.value);
    });
    this.setState({ tableShowColumns: valuePairs });
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    const { id } = this.props;
    const { mobileFlag } = this.state;

    return css`
      ${'&.table-widget-' + id} {
        .table-indent{
          width: calc(100% - 32px);
          height: calc(100% - 26px);
          margin: 10px 16px 16px;
        }
        .nav-underline{
          border-bottom: 1px solid ${theme.colors.palette.light[300]};
        }
        .nav-item + .nav-item{
          margin-left: 0;
        }
        .csv-dropdown-con{
          button{
            border-radius: 13px;
          }
        }
        .vertical-tag-list{
          width: 20%;
          display: inline-block;
          .tagBtn{
            width: 100%;
          }
        }
        .horizontal-tag-list{
          .tagBtn{
            width: 150px;
          }
          .tab-content{
            height: 8px;
          }
        }
        .vertical-tag-list,
        .horizontal-tag-list{
          margin-bottom: 4px;
          .activeBtn{
            color: #fff;
            background-color: #076fe5;
          }
        }
        .dropdown-tag-list{
          height: 40px;
          margin-bottom: 4px;
          .dropdown-button{
            height: 30px;
          }
        }
        .vertical-render-con{
          width: 80%;
          position: absolute;
          left: 20%;
          height: 100%;
          top: 0;
        }
        .dropdown-render-con,
        .horizontal-render-con{
          width: 100%;
          height: 100%;
        }
        .top-button-list{
          margin: 8px 0;
          position: absolute;
          right: 17px;
          top: 47px;
          ${mobileFlag && 'display: none'};
          .top-button{
            display: inline-flex;
            button{
              width: 32px;
              height: 32px;
            }
          }
        }
        .table-search-div{
          position: absolute;
          left: 20px;
          .table-search{
            .search-icon{
              z-index: 2;
            }
            .search-input{
              padding-left: 30px;
              margin-left: -30px;
            }
          }
        }
        .table-con{
          width: 100%;
          height: calc(100% - 46px);
          .esri-feature-table__loader-container{
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -16px;
            margin-top: -20px;
            z-index: 2;
          }
          .esri-feature-table__title{
            display: none
          }
          .esri-feature-table__menu{
            position: absolute;
            right: 17px;
            top: 51px;
            ${!mobileFlag && 'display: none'};
          }
          .esri-column__sorter{
            overflow-x: hidden;
          }
        }
        .adv-select-con{
          width: 200px;
          visibility: hidden;
          position: absolute;
          right: 17px;
          top: 56px;
        }
        .ds-container{
          position: absolute;
          display: none;
        }
      }
    `
  }

  getGlobalTableTools = (theme: ThemeVariables): SerializedStyles => {
    return css`
      .widget-table-tool-icon-show-selection{
        background: url('data:image/svg+xml;utf8,${encodeURIComponent(showSelectedOnlyIcon)}') no-repeat center;
        background-size: 100%;
        width: 16px;
        height: 16px;
      }
      .widget-table-tool-icon-selection-clear{
        background: url('data:image/svg+xml;utf8,${encodeURIComponent(uncheckAllIcon)}') no-repeat center;
        background-size: 100%;
        width: 16px;
        height: 16px;
      }
      .widget-table-tool-icon-refresh{
        background: url('data:image/svg+xml;utf8,${encodeURIComponent(resetIcon)}') no-repeat center;
        background-size: 100%;
        width: 16px;
        height: 16px;
      }
      .widget-table-tool-icon-show-hide-cols{
        background: url('data:image/svg+xml;utf8,${encodeURIComponent(showHideIcon)}') no-repeat center;
        background-size: 100%;
        width: 16px;
        height: 16px;
      }
      .esri-button-menu__item .esri-button-menu__item-label{
        padding: 4px 15px !important;
      }
    `
  }

  render() {
    const { activeTabId, query, dataSource, selectQueryFalg, tableShowColumns } = this.state;
    const { config, id, theme } = this.props;
    const { layersConfig, arrangeType } = config;
    let useDataSource;
    const curLayer = layersConfig.find(item => item.id === activeTabId);
    if(layersConfig.length > 0) {
      useDataSource = curLayer ? curLayer.useDataSource : layersConfig[0].useDataSource;
    }
    const classes = classNames(
      'jimu-widget',
      'widget-table',
      'surface-1',
      'table-widget-' + id
    );

    if(!useDataSource){
      return <WidgetPlaceholder widgetId={id} icon={require('./assets/icon.svg')} message={this.formatMessage('_widgetLabel')}/>;
    }

    const horizontalTag = arrangeType === TableArrangeType.Tabs;
    const advancedTableField = curLayer.tableFields.map(item => {
      return { value: item.name, label: item.alias };
    });
    const initSelectTableFields = this.getInitFields();

    return (
      <div className={classes} css={this.getStyle(theme)}>
        <div className="table-indent">
          <div className={`${horizontalTag ? 'horizontal-tag-list' : 'dropdown-tag-list'}`}>
            {/* someting wrong in lint check for Tabs */}
            {horizontalTag ?
              <Tabs underline onTabSelect={this.onTagClick}>
                {
                  layersConfig.map(item => {
                    return <Tab key={item.id} id={item.id} defaultActive={item.id === activeTabId} title={item.name} className="text-truncate tag-size">
                      <div className="mt-2"></div>
                    </Tab>
                  }) as any
                }
              </Tabs>
              : <Select size="sm" value={activeTabId} onChange={this.handleTagChange} style={{width: 120}} className="top-drop">
                {layersConfig.map(item => {
                  return <option key={item.id} value={item.id} title={item.name}>{item.name}</option>;
                })}
              </Select>
            }
          </div>
          <div className={`${arrangeType === TableArrangeType.Tabs ? 'horizontal-render-con' : 'dropdown-render-con'}`}>
            {curLayer.enableSearch && curLayer.searchFields && this.renderSearchTools()}
            <div className="top-button-list">
              {/* {curLayer.allowCsv &&
                <Dropdown className="csv-dropdown-con ml-2">
                  <DropdownButton size="sm" arrow={true} type="default" title={this.formatMessage('downloadCsv')}>
                    {this.formatMessage('downloadCsv')}
                  </DropdownButton>
                  <DropdownMenu>
                    <DropdownItem title={this.formatMessage('exportAll')} onClick={this.handleExportCSVAll}>
                      {this.formatMessage('exportAll')}
                    </DropdownItem>
                    <DropdownItem title={this.formatMessage('exportSelected')} onClick={this.handleExportCSVSelected}>
                      {this.formatMessage('exportSelected')}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              } */}
              {curLayer.enableSelect &&
                <div className="top-button ml-2">
                  <Button size="sm" onClick={this.onShowSelection} icon active={selectQueryFalg}
                    title={selectQueryFalg ? this.formatMessage('showAllRecords') : this.formatMessage('showSelection')}>
                    <Icon icon={showSelectedOnlyIcon} size={14} />
                  </Button>
                </div>
              }
              {curLayer.enableSelect &&
                <div className="top-button ml-2">
                  <Button size="sm" onClick={this.onSelectionClear} icon title={this.formatMessage('clearSelection')}>
                    <Icon icon={uncheckAllIcon} size={14} />
                  </Button>
                </div>
              }
              {curLayer.enableRefresh &&
                <div className="top-button ml-2">
                  <Button size="sm" onClick={this.onTableRefresh} icon title={this.formatMessage('refresh')}>
                    <Icon icon={resetIcon} size={14} />
                  </Button>
                </div>
              }
              <div className="top-button ml-2">
                <Button size="sm" onClick={this.popupShowHideCols} icon title={this.formatMessage('showHideCols')}>
                  <Icon icon={showHideIcon} size={14} />
                </Button>
              </div>
            </div>
            {dataSource &&
              <div ref="advancedSelect" className="adv-select-con">
                <AdvancedSelect
                  fluid={true}
                  dataSource={dataSource}
                  field={curLayer.allFields[0]}
                  codedValues={advancedTableField}
                  isMultiple={true}
                  values={Immutable(tableShowColumns || initSelectTableFields)}
                  isEmptyOptionHidden={false}
                  onChange={this.onValueChangeFromRuntime}
                />
              </div>
            }
            <div ref="tableContainer" className="table-con"></div>
            <div className="ds-container">
              <DataSourceComponent
                widgetId={id}
                query={dataSource ? {where: query} as QueryParams : null}
                useDataSource={Immutable(useDataSource)}
                onDataSourceCreated={this.onDataSourceCreated}
                onDataSourceInfoChange={this.onDataSourceInfoChange}
              />
            </div>
            <Global styles={this.getGlobalTableTools(theme)} />
            <ReactResizeDetector handleWidth handleHeight onResize={this.debounceOnResize} />
          </div>
        </div>
      </div>
    );
  }
}
