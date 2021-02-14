/** @jsx jsx */
import { React, Immutable, ImmutableObject, DataSourceJson, IMState, jsx, classNames,
  UseDataSource, ThemeVariables, SerializedStyles, css, urlUtils, DataSourceManager, IMUseDataSource, ImmutableArray } from 'jimu-core';
import { defaultMessages as jimuUIDefaultMessages, Button, Icon, Tooltip } from 'jimu-ui';
import LayerConfig from './layer-config';
import { SettingSection, SettingRow, SidePopper } from 'jimu-ui/advanced/setting-components';
import { AllWidgetSettingProps, builderAppSync } from 'jimu-for-builder';
import { IMConfig, LayersConfig, TableArrangeType } from '../config';
import defaultMessages from './translations/default';

const IconClose = require('jimu-ui/lib/icons/close.svg');

interface ExtraProps{
  dsJsons: ImmutableObject<{ [dsId: string]: DataSourceJson }>;
  activeTabId: string;
}

export interface WidgetSettingState{
  showLayerPanel: boolean;
  refreshPanel: boolean;
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps, WidgetSettingState>{
  index: number;
  dsManager: DataSourceManager;
  dsHash: {[index: number]: ImmutableObject<UseDataSource>};

  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>): ExtraProps => {
    return {
      dsJsons: state.appStateInBuilder.appConfig.dataSources,
      activeTabId: state && state.appStateInBuilder?.widgetsState[props.id]?.activeTabId,
    }
  }

  constructor(props){
    super(props);
    this.index = 0;
    this.dsManager = DataSourceManager.getInstance();
    this.updateDsHash(this.props.config.layersConfig ? this.props.config.layersConfig as unknown as LayersConfig[] : []);
    this.state = {
      showLayerPanel: false,
      refreshPanel: false,
    };
  }

  updateDsHash = (layersConfig: LayersConfig[]) => {
    this.dsHash = {};
    let index = 0;
    layersConfig.map(item => {
      this.dsHash[index] = item.useDataSource;
      index ++;
    });
  }

  getArrayMaxId(layersConfigs: ImmutableArray<LayersConfig>): number {
    const numbers = layersConfigs.map(layersConfig => {
      return layersConfig.id.split('-').reverse()[0];
    });
    return numbers.length > 0 ? Math.max.apply(null, numbers) : 0;
  }

  getNewConfigId = (dsId): string => {
    const index = this.props.config?.layersConfig.length > 0 ? this.getArrayMaxId(this.props.config.layersConfig) : 0;
    return `${dsId}-${index+1}`;
  }

  //save currentSelectedDs to array;
  dataSourceChangeSave = (useDataSources: UseDataSource[]) => {
    if(!useDataSources){
      return;
    }
    const currentIMUseDs = Immutable(useDataSources[0]);
    const selectedDs = this.dsManager.getDataSource(currentIMUseDs.dataSourceId);
    const allFields = selectedDs && selectedDs.getSchema();
    const defaultInvisible = ['CreationDate', 'Creator', 'EditDate', 'Editor', 'GlobalID'];
    const allFieldsDetails = Object.values(allFields.fields);
    const initTableFields = allFieldsDetails.filter(item => defaultInvisible.indexOf(item.jimuName) < 0);
    this.dsManager.createDataSourceByUseDataSource(Immutable(useDataSources[0])).then(currentDs => {
      const layerItem: LayersConfig = {
        id: this.getNewConfigId(currentDs.id),
        name: currentDs.getLabel(),
        useDataSource: currentIMUseDs,
        allFields: allFieldsDetails,
        tableFields: initTableFields,
        enableAttachements: false,
        enableEdit: false,
        allowCsv: false,
        enableSearch: false,
        searchFields: '',
        enableRefresh: true,
        enableSelect: true,
      };

      const currentLayer = this.props.config.layersConfig[this.index];
      let layerItems;
      if(currentLayer){ //update config, reset other opts for current config
        const _conf = this.props.config.layersConfig.asMutable({deep: true});
        _conf.splice(this.index, 1, layerItem);
        layerItems = Immutable(_conf);
      }else{ //add new config
        layerItems = this.props.config.layersConfig.concat([Immutable(layerItem)]);
      }
      //update dsHash
      this.dsHash[this.index] = currentIMUseDs;
      this.updateDsHash(layerItems);

      const config = {
        id: this.props.id,
        config: this.props.config.set('layersConfig', layerItems),
        useDataSources: this.getUseDataSourcesByDsHash()
      };
      this.props.onSettingChange(config);
    })
  }

  onCloseLayerPanel = () => {
    this.setState({ showLayerPanel: false });
    this.index = 0;
  }

  getUniqueValues = (array1: any[] = [], array2: any[] = []): any[] => {
    const array = array1.concat(array2);
    const res = array.filter(function(item, index, array){
      return array.indexOf(item) === index;
    })
    return res;
  }

  getUseDataSourcesByDsHash = (): UseDataSource[] => {
    const dsHash: any = {};
    Object.keys(this.dsHash).map((index) => {
      const dsId = this.dsHash[index].dataSourceId;
      let ds: IMUseDataSource;
      if(!dsHash[dsId]){
        ds = this.dsHash[index];
      }else{
        ds = Immutable({
          dataSourceId: this.dsHash[index].dataSourceId,
          mainDataSourceId: this.dsHash[index].mainDataSourceId,
          dataViewId: this.dsHash[index].dataViewId,
          rootDataSourceId: this.dsHash[index].rootDataSourceId,
          fields: this.getUniqueValues(dsHash[dsId].fields, this.dsHash[index].fields as unknown as any[])
        });
      }
      dsHash[dsId] = ds;
    });

    // get new array from hash
    const dsArray = [];
    Object.keys(dsHash).map(dsId => {
      dsArray.push(dsHash[dsId]);
    });
    return dsArray;
  }

  removeLayer = (index: number) => {
    if(this.index === index){
      this.onCloseLayerPanel();
    }
    //del current filter item
    const _layer = this.props.config.layersConfig.asMutable({deep: true});
    _layer.splice(index, 1);
    const fis = this.props.config.set('layersConfig', _layer);

    //update dsHash
    delete this.dsHash[index];
    this.updateDsHash(_layer);

    const config = {
      id: this.props.id,
      config: fis,
      useDataSources: this.getUseDataSourcesByDsHash()
    }
    this.props.onSettingChange(config);

    if(this.index > index){
      this.index--;
    }
    builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'removeLayerFlag', value: true});
  }

  optionChangeSave = (prop: string, value: any) => {
    const currentLayer = this.props.config.layersConfig[this.index];
    if(currentLayer){
      const layerItems = this.props.config.layersConfig.asMutable({deep: true});
      const layerItem = Immutable(layerItems[this.index]).set(prop, value);
      layerItems.splice(this.index, 1, layerItem.asMutable({deep: true}));

      const config = {
        id: this.props.id,
        config: this.props.config.set('layersConfig', layerItems)
      }
      this.props.onSettingChange(config);
    }
    builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'removeLayerFlag', value: true});
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      .widget-setting-table{
        .filter-item {
          display: flex;
          padding: 0.5rem 0.75rem;
          margin-bottom: 0.25rem;
          line-height: 23px;
          cursor: pointer;
          background-color: ${theme.colors.secondary};

          .filter-item-icon{
            width: 14px;
            margin-right: 0.5rem;
          }
          .filter-item-name{
            word-break: break-all;
          }
        }

        .filter-item-active {
          border-left: 2px solid ${theme.colors.palette.primary[600]};
        }

        .arrange-style-container{
          .arrange_container{
            margin-top: 10px;
            display: flex;
            .jimu-btn {
              padding: 0;
              background: ${theme.colors.palette.light[200]};
              &.active{
                border: 1px solid ${theme.colors.palette.primary[600]};
              }
            }
          }
        }
      }
    `
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages);
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] }, values);
  }

  onShowLayerPanel = (index?: number) => {
    const { showLayerPanel } = this.state;
    if(index === this.index){
      this.setState({ showLayerPanel: !showLayerPanel });
    }else{
      this.setState({
        showLayerPanel: true,
        refreshPanel: !this.state.refreshPanel,
      });
      this.index = index;
    }
  }

  switchTableType = (type: TableArrangeType) => {
    if(type !== this.props.config.arrangeType){
      const config = {
        id: this.props.id,
        config: this.props.config.set('arrangeType', type)
      }
      this.props.onSettingChange(config);
    }
  }

  render(){
    const { showLayerPanel } = this.state;
    const { theme, config } = this.props;

    return (
      <div css={this.getStyle(theme)}>
        <div className="widget-setting-table">
          <SettingSection className="border-0" >
            <SettingRow>
              <Button className="w-100 text-dark set-link-btn" type="primary" onClick={() => {this.onShowLayerPanel(config.layersConfig.length)}}>
                <div className="w-100 px-2 text-truncate">
                  {this.formatMessage('newSheet')}
                </div>
              </Button>
            </SettingRow>
          </SettingSection>

          <SettingSection className="pt-0">
            <div className="filter-items-container mt-2">
              {config.layersConfig.asMutable().map((item: ImmutableObject<LayersConfig>, index: number) => {
                return (
                  <div key={index} className={classNames('filter-item', (showLayerPanel && this.index === index) ? 'filter-item-active' : '')}>
                    <div className="filter-item-name flex-grow-1" onClick={() => {this.onShowLayerPanel(index)}} >{item.name}</div>
                    <Button size="sm" icon onClick={() => this.removeLayer(index)}>
                      <Icon icon={IconClose} size={12}></Icon>
                    </Button>
                  </div>
                )
              })}
              {(config.layersConfig.length === this.index && showLayerPanel) ?
                <div className="d-flex pt-2 pb-2 mb-1 filter-item filter-item-active">
                  <div className="filter-item-name flex-grow-1" >......</div>
                </div> : null
              }
            </div>
          </SettingSection>
          {config.layersConfig.length > 0 &&
            <SettingSection className="arrange-style-container" title={this.formatMessage('sheetStyle')}>
              <SettingRow className="arrange_container">
                <Tooltip title={this.formatMessage('tabs')} placement="bottom">
                  <Button onClick={() => this.switchTableType(TableArrangeType.Tabs)}
                    icon size="sm" type="tertiary" active={config.arrangeType === TableArrangeType.Tabs}>
                    <Icon autoFlip={true} width={109} height={70} icon={require('./assets/image_table_tabs.svg')}></Icon>
                  </Button>
                </Tooltip>
                <Tooltip title={this.formatMessage('dropdown')} placement="bottom">
                  <Button onClick={() => this.switchTableType(TableArrangeType.Dropdown)} className="ml-2"
                    icon size="sm" type="tertiary" active={config.arrangeType === TableArrangeType.Dropdown}>
                    <Icon autoFlip={true} width={109} height={70} icon={require('./assets/image_table_dropdown.svg')}></Icon>
                  </Button>
                </Tooltip>
              </SettingRow>
            </SettingSection>
          }
          <SidePopper isOpen={showLayerPanel && !urlUtils.getAppIdPageIdFromUrl().pageId} position="right">
            <LayerConfig
              {...config.layersConfig.asMutable({deep: true})[this.index]}
              intl={this.props.intl} theme={theme}
              useDataSource={this.dsHash[this.index] ? this.dsHash[this.index] : null}
              dataSourceChange={this.dataSourceChangeSave}
              optionChange={this.optionChangeSave}
              onClose={this.onCloseLayerPanel} />
          </SidePopper>
        </div>
      </div>
    );
  }
}
