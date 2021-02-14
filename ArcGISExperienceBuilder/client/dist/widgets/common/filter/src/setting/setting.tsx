/** @jsx jsx */
import { React, jsx, DataSourceManager, classNames, Immutable, UseDataSource, ImmutableObject, IMSqlExpression,
  IMIconResult, ClauseLogic, urlUtils, defaultMessages as jimuCoreMessages} from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { SettingSection, SettingRow, SidePopper } from 'jimu-ui/advanced/setting-components';
import FilterItem from './filter-item';
import { Button, Icon, ButtonGroup, Switch, Tooltip, defaultMessages as jimuUIMessages, Checkbox } from 'jimu-ui';
import { WidgetConfig, filterItemConfig, FilterArrangeType, FilterTriggerType } from '../config';
import defaultMessages from './translations/default'
import { getStyleForWidget } from './style';
import { getJimuFieldNamesBySqlExpression } from 'jimu-ui/basic/sql-expression-runtime';

const IconClose = require('jimu-ui/lib/icons/close.svg');
const IconAdd = require('jimu-ui/lib/icons/add-16.svg');
const FilterIcon = require('jimu-ui/lib/icons/filter-16.svg');
const WarningIcon = require('jimu-ui/lib/icons/info-16.svg');

const DefaultIconResult: IMIconResult = Immutable({
  svg: FilterIcon,
  properties: {
    color: '',
    filename: 'filter-16.svg',
    originalName: 'filter-16.svg',
    inlineSvg: true,
    path: ['general', 'filter'],
    size: 14
  }
});

interface State {
  showFilterItemPanel: boolean;
  refreshFilterItemPanel: boolean;
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<WidgetConfig> & State, any>{
  index: number;
  dsHash: {[index: number]: ImmutableObject<UseDataSource>};
  dsManager: DataSourceManager;

  constructor(props){
    super(props);
    this.index = 0;
    this.dsManager = DataSourceManager.getInstance();
    this.state = {
      showFilterItemPanel: false,
      refreshFilterItemPanel: false
    };
  }
  // optionsContainerStyle : any = {position: 'absolute', bottom: '0', height: 'auto'};

  /************ For widget ***********/
  i18nMessage = (id: string, messages?: any) => {
    messages = messages || defaultMessages;
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] });
  }


  toggleTimeout: NodeJS.Timer;
  onShowFilterItemPanel = (index?: number) => {
    if(index === this.index){
      this.setState({
        showFilterItemPanel: !this.state.showFilterItemPanel
      });
    }else{
      this.setState({
        showFilterItemPanel: true
      });
      this.setState({
        refreshFilterItemPanel: !this.state.refreshFilterItemPanel
      });
      this.index = index;
    }
  }

  onCloseFilterItemPanel = () => {
    this.setState({
      showFilterItemPanel: false
    });
    this.index = 0;
  }

  updateConfigForOptions = (prop: string, value: boolean | ClauseLogic | FilterArrangeType | FilterTriggerType) => {
    const config = {
      id: this.props.id,
      config: this.props.config.set(prop, value)
    }
    this.props.onSettingChange(config);
  }


  /************ For Filter Item config ***********/
  removeFilterItem = (index: number) => {
    if(this.index === index){
      this.onCloseFilterItemPanel();
    }
    //del current filter item
    const _fis = this.props.config.filterItems.asMutable({deep: true});
    _fis.splice(index, 1);
    const fis = this.props.config.set('filterItems', _fis);

    const config = {
      id: this.props.id,
      config: fis,
      useDataSources: this.getUseDataSourcesByDsHash(_fis)
    }
    this.props.onSettingChange(config);

    if(this.index > index){
      this.index--;
    }
  }

  optionChangeForFI = (prop: string, value: string | boolean | IMIconResult) => {
    const currentFI = this.props.config.filterItems[this.index];
    if(currentFI){
      const fItems = this.props.config.filterItems.asMutable({deep: true});
      const fItem = Immutable(fItems[this.index]).set(prop, value);
      fItems.splice(this.index, 1, fItem.asMutable({deep: true}));

      const config = {
        id: this.props.id,
        config: this.props.config.set('filterItems', fItems)
      }
      this.props.onSettingChange(config);
    }
  }

  //save currentSelectedDs to array;
  dataSourceChangeForFI = (useDataSources: UseDataSource[]) => {
    if(!useDataSources){
      return;
    }
    const currentIMUseDs = Immutable(useDataSources[0]);
    this.dsManager.createDataSourceByUseDataSource(Immutable(useDataSources[0])).then(currentDs => {
      const filterItem: filterItemConfig = {
        icon: DefaultIconResult,
        name: currentDs.getLabel(),
        useDataSource: currentIMUseDs,
        sqlExprObj: null,
        autoApplyWhenWidgetOpen: false,
        collapseFilterExprs: false
      };

      const currentFI = this.props.config.filterItems[this.index];
      let filterItems;
      if(currentFI){ //update FI, reset other opts for current FI
        const _fis = this.props.config.filterItems.asMutable({deep: true});
        _fis.splice(this.index, 1, filterItem);
        filterItems = Immutable(_fis);
      }else{ //add new FI to FIs
        filterItems = this.props.config.filterItems.concat(Immutable([Immutable(filterItem)]));
      }

      const config = {
        id: this.props.id,
        config: this.props.config.set('filterItems', filterItems),
        useDataSources: this.getUseDataSourcesByDsHash(filterItems)
      };
      this.props.onSettingChange(config);
    })
  }

  sqlExprBuilderChange = (sqlExprObj: IMSqlExpression) => {
    let fields = [];
    if(sqlExprObj?.parts?.length > 0){
      fields =  getJimuFieldNamesBySqlExpression(sqlExprObj); //get fields
    }else{
      sqlExprObj = null; //when no valid clauses in builder
    }
    const currentUseDs = this.props.config.filterItems[this.index].useDataSource;
    const updatedDs: UseDataSource = {
      dataSourceId: currentUseDs.dataSourceId,
      mainDataSourceId: currentUseDs.mainDataSourceId,
      dataViewId: currentUseDs.dataViewId,
      rootDataSourceId: currentUseDs.rootDataSourceId,
      fields: fields
    };

    //update sqlExprObj, sqlExprObj and ds
    const fItems = this.props.config.filterItems.asMutable({deep: true});
    const fItem = Object.assign({}, fItems[this.index], {sqlExprObj: sqlExprObj, useDataSource: updatedDs});
    fItems.splice(this.index, 1, fItem);

    const config = {
      id: this.props.id,
      config: this.props.config.set('filterItems', Immutable(fItems)),
      useDataSources: this.getUseDataSourcesByDsHash(fItems)
    };
    this.props.onSettingChange(config);
  }

  getUniqueValues = (array1: any[] = [], array2: any[] = []): any[] => {
    const array = array1.concat(array2);
    const res = array.filter(function(item, index, array){
      return array.indexOf(item) === index;
    })
    return res;
  }

  getUseDataSourcesByDsHash = (fItems: filterItemConfig[]): UseDataSource[] => {
    // get new ds array from filter items.
    const dsArray = [];
    fItems.map(item => {
      dsArray.push(item.useDataSource);
    });
    return dsArray;
  }

  getDataSourceById = (useDataSources: UseDataSource[], dataSourceId: string): ImmutableObject<UseDataSource> => {
    const dsList = useDataSources.filter(ds => ds.dataSourceId === dataSourceId);
    return Immutable(dsList[0]);
  }

  changeAndOR = (logicalOperator: ClauseLogic) => {
    this.updateConfigForOptions('logicalOperator', logicalOperator);
  }

  changeUseWrap = (wrap: boolean) => {
    this.updateConfigForOptions('wrap', wrap);
  }

  changeArrangeType = (type: FilterArrangeType) => {
    if(type !== this.props.config.arrangeType){
      this.updateConfigForOptions('arrangeType', type);
      //TODO: change wrap
    }
  }

  changeTriggerType = (type: FilterTriggerType) => {
    this.updateConfigForOptions('triggerType', type);
  }

  changeOmitInternalStyle = (omit: boolean) => {
    this.updateConfigForOptions('omitInternalStyle', omit);
  }

  render(){
    const { config } = this.props;
    return <div css={getStyleForWidget(this.props.theme)}>
      <div className="jimu-widget-setting widget-setting-filter">
        <SettingSection className="border-0" >
          <SettingRow className="filter-items-desc">
            {this.i18nMessage('filtersDesc')}
          </SettingRow>
          <SettingRow>
            <Button className="w-100 text-dark set-link-btn" type="primary" onClick={() => {this.onShowFilterItemPanel(config.filterItems.length)}}>
              <div className="w-100 px-2 text-truncate">
                <Icon icon={IconAdd} className="mr-1" size={14}/>
                {this.i18nMessage('newFilter')}
              </div>
            </Button>
          </SettingRow>
        </SettingSection>

        <SettingSection className="pt-0">
          {
            config.filterItems.length > 1 &&
            <SettingRow>
              <ButtonGroup className="w-100 and-or-group">
                <Button onClick={() => { this.changeAndOR(ClauseLogic.And) }} className="btn-secondary max-width-50" size="sm"
                  type={config.logicalOperator === ClauseLogic.And ? 'primary' : 'secondary'} >
                  <div className="text-truncate">
                    {this.i18nMessage('and')}
                  </div>
                </Button>
                <Button onClick={() => { this.changeAndOR(ClauseLogic.Or) }} className="btn-secondary max-width-50" size="sm"
                  type={config.logicalOperator === ClauseLogic.Or ? 'primary' : 'secondary'} >
                  <div className="text-truncate">
                    {this.i18nMessage('or')}
                  </div>
                </Button>
              </ButtonGroup>
            </SettingRow>
          }
          <div className="filter-items-container mt-2">
            {config.filterItems.asMutable().map((item: ImmutableObject<filterItemConfig>, index: number) => {
              return (
                <div key={index} className={classNames('filter-item',
                  (this.state.showFilterItemPanel && this.index === index) ? 'filter-item-active' : '')} >
                  {
                    item.icon && <div className="filter-item-icon">
                      <Icon icon={item.icon.svg} size={14} />
                    </div>
                  }
                  <div className="filter-item-name flex-grow-1" onClick={() => {this.onShowFilterItemPanel(index)}} >{item.name}</div>
                  <Button size="sm" icon onClick={() => this.removeFilterItem(index)}>
                    <Icon icon={IconClose} size={12}></Icon>
                  </Button>
                </div>
              )
            })}
            {(config.filterItems.length === this.index && this.state.showFilterItemPanel) ?
              <div className="d-flex pt-2 pb-2 mb-1 filter-item filter-item-active" >
                <Button size="sm" icon type="tertiary" disabled={true}>
                  <Icon icon={DefaultIconResult.svg} size={DefaultIconResult.properties.size} />
                </Button>
                <div className="filter-item-name flex-grow-1" >......</div>
              </div> : null
            }
          </div>
        </SettingSection>

        {
          config.filterItems.length > 0 && <SettingSection className="arrange-style-container" title={this.i18nMessage('arrangeAndStyle')}>
            <SettingRow className="arrange_container">
              <Tooltip title={this.i18nMessage('vertical', jimuUIMessages)} placement="bottom">
                <Button onClick={() => this.changeArrangeType(FilterArrangeType.Block)}
                  icon size="sm" type="tertiary" active={config.arrangeType === FilterArrangeType.Block}>
                  <Icon width={68} height={68} icon={require('./assets/arrange_block.svg')} autoFlip ></Icon>
                </Button>
              </Tooltip>
              <Tooltip title={this.i18nMessage('horizontal', jimuUIMessages)} placement="bottom">
                <Button onClick={() => this.changeArrangeType(FilterArrangeType.Inline)}
                  icon size="sm" type="tertiary" active={config.arrangeType === FilterArrangeType.Inline}>
                  <Icon width={68} height={68} icon={require('./assets/arrange_inline.svg')} autoFlip ></Icon>
                </Button>
              </Tooltip>
              <Tooltip title={this.i18nMessage('icon', jimuCoreMessages)} placement="bottom">
                <Button onClick={() => this.changeArrangeType(FilterArrangeType.Popper)}
                  icon size="sm" type="tertiary" active={config.arrangeType === FilterArrangeType.Popper}>
                  <Icon width={68} height={68} icon={require('./assets/arrange_popup.svg')} autoFlip ></Icon>
                </Button>
              </Tooltip>
            </SettingRow>
            {
              config.arrangeType === FilterArrangeType.Inline && <SettingRow label={this.i18nMessage('wrapFilters')}>
                <Switch checked={config.wrap} onChange={() => this.changeUseWrap(!config.wrap)} />
              </SettingRow>
            }
            <SettingRow label={this.i18nMessage('activationMethods')}></SettingRow>
            <SettingRow className="trigger_container">
              {
                [{ type: FilterTriggerType.Toggle, icon: 'toggle' },
                  { type: FilterTriggerType.Button, icon: 'button' }].map((item, index) => {
                  return <Tooltip key={index} title={this.i18nMessage(`${item.icon}Tooltip`)} placement="bottom">
                    <Button onClick={() => this.changeTriggerType(item.type)}
                      icon size="sm" type="tertiary" active={item.type === config.triggerType}>
                      <Icon width={70} height={50} icon={require(`./assets/trigger_${item.icon}.svg`)} autoFlip ></Icon>
                    </Button>
                  </Tooltip>
                })
              }
            </SettingRow>

            <SettingRow>
              <div className="w-100 d-flex">
                <Checkbox style={{cursor: 'pointer', marginTop: '2px'}} onChange={() => this.changeOmitInternalStyle(!config.omitInternalStyle)}
                  checked={config.omitInternalStyle} />
                <div className="m-0 ml-2 flex-grow-1 omit-label">
                  {this.i18nMessage('omitInternalStyle')}
                  <Tooltip title={this.i18nMessage('omitInternalStyleTip')} showArrow={true} placement="left">
                    <div className="ml-2 d-inline">
                      <Icon size={16} icon={WarningIcon} />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </SettingRow>
          </SettingSection>
        }

        {
          <SidePopper isOpen={this.state.showFilterItemPanel && !urlUtils.getAppIdPageIdFromUrl().pageId} position="right">
            <FilterItem {...config.filterItems[this.index]} intl={this.props.intl} theme={this.props.theme}
              useDataSource={config.filterItems[this.index]?.useDataSource}
              dataSourceChange={this.dataSourceChangeForFI} optionChange={this.optionChangeForFI}
              onSqlExprBuilderChange={this.sqlExprBuilderChange} onClose={this.onCloseFilterItemPanel} />
          </SidePopper>
        }
        {/*
        <div style={this.optionsContainerStyle}>
          <SettingSection className="options-container">
            <SettingRow>
              <div className="d-flex w-100 align-items-start">
                <label>{this.i18nMessage('options')}</label>
              </div>
            </SettingRow>
            <SettingRow>
              <div className="d-flex justify-content-between w-100">
                <label>{this.i18nMessage('groupByLayer')}</label>
                <Switch checked={config.groupByLayer} onChange={() => this.updateConfigForOptions('groupByLayer', !config.groupByLayer)}/>
              </div>
            </SettingRow>
            <SettingRow>
              <div className="d-flex justify-content-between w-100">
                <label>{this.i18nMessage('custom')}</label>
                <Switch checked={config.custom} onChange={() => this.updateConfigForOptions('custom', !config.custom)}/>
              </div>
            </SettingRow>

            <SettingRow>
              <div className="d-flex justify-content-between w-100">
                <label>{this.i18nMessage('resetAll')}</label>
                <Switch checked={config.resetAll} onChange={() => this.updateConfigForOptions('resetAll', !config.resetAll)}/>
              </div>
            </SettingRow>

            <SettingRow>
              <div className="d-flex justify-content-between w-100">
                <label>{this.i18nMessage('turnOffAll')}</label>
                <Switch checked={config.turnOffAll} onChange={() => this.updateConfigForOptions('turnOffAll', !config.turnOffAll)}/>
              </div>
            </SettingRow>
          </SettingSection>
        </div>*/}
      </div>
    </div>
  }
}