/** @jsx jsx */
import { React, jsx, ThemeVariables, Immutable, IntlShape, DataSourceManager, DataSourceComponent, IMUseDataSource, IMSqlExpression,
  IMIconResult, dataSourceUtils, defaultMessages as defaultMsgsCore, UseDataSource } from 'jimu-core';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { Icon, TextInput, Button, Switch, defaultMessages as jimuUIMessages } from 'jimu-ui';
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector';
import { SqlExpressionBuilderPopup } from 'jimu-ui/advanced/sql-expression-builder'
import { filterItemConfig } from '../config';
import defaultMessages from './translations/default'
import { getStyleForFI } from './style';
import { IconPicker } from 'jimu-ui/advanced/resource-selector';

const IconClose = require('jimu-ui/lib/icons/close-16.svg');

interface Props {
  useDataSource: IMUseDataSource;
  intl: IntlShape;
  theme: ThemeVariables;
  // defaultIconResult: IMIconResult;
  onClose?: () => void;
  optionChange: (prop: string, value: string | boolean | IMIconResult) => void;
  dataSourceChange: (useDataSources: UseDataSource[]) => void;
  onSqlExprBuilderChange: (sqlExprObj: IMSqlExpression) => void;
}

interface State {
  isSqlExprShow: boolean;
  showAdvance: boolean;
}

export default class FilterItem extends React.PureComponent<Props & filterItemConfig, State>{
  dsManager: DataSourceManager = window && window.jimuConfig && window.jimuConfig.isBuilder ? DataSourceManager.getInstance()
    : DataSourceManager.getInstance();
  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer]);

  constructor(props) {
    super(props);

    this.state = {
      isSqlExprShow: false,
      showAdvance: false
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.collapseFilterExprs !== this.props.collapseFilterExprs){
      // this.setState({supportCollapse: this.props.collapseFilterExprs});
    }
  }

  showSqlExprPopup = () => {
    this.setState({isSqlExprShow: true});
  }

  toggleSqlExprPopup = () => {
    this.setState({isSqlExprShow: !this.state.isSqlExprShow});
  }

  nameChange = (event) => {
    if(event && event.target && event.target.value){
      const value = event.target.value.trim();
      this.props.optionChange('name', value);
    }
  }

  i18nMessage = (id: string, messages?: any) => {
    messages = messages || defaultMessages;
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] });
  }

  toggleAdvance = () => {
    this.setState({showAdvance: !this.state.showAdvance});
  }

  render(){
    const { useDataSource, sqlExprObj } = this.props;
    const isDisabled = (useDataSource && useDataSource.dataSourceId) ? false : true;
    return(
      <div className="w-100 h-100" css={getStyleForFI(this.props.theme)}>
        <div className="w-100 h-100 filter-item-panel">
          <div className="w-100 d-flex align-items-center justify-content-between setting-header setting-title pb-2">
            <h5 className="text-truncate filter-item-label mt-2">{this.i18nMessage('setFilterItem')}</h5>
            <Button size="sm" icon type="tertiary" className="ml-2" onClick={this.props.onClose}><Icon icon={IconClose} size="16"/></Button>
          </div>
          <div className="setting-container">
            <SettingSection title={this.i18nMessage('data')} >
              <SettingRow>
                <DataSourceSelector types={this.supportedDsTypes} disableRemove={() => true}
                  useDataSources={useDataSource ? Immutable([useDataSource]) : Immutable([])}
                  mustUseDataSource={true} onChange={this.props.dataSourceChange} closeDataSourceListOnChange={true} />
              </SettingRow>
            </SettingSection>

            <SettingSection title={this.i18nMessage('label', jimuUIMessages)} >
              <SettingRow>
                <TextInput type="text" className="w-100" value={this.props.name ? this.props.name : ''}
                  onChange={this.nameChange} />
              </SettingRow>
            </SettingSection>

            <SettingSection title={
              <div className="w-100 d-flex justify-content-between">
                <span className="pt-1 mr-2 line-height-1 text-truncate">{this.props.intl.formatMessage({ id: 'icon', defaultMessage: defaultMsgsCore['icon'] })}</span>
                <IconPicker buttonOptions={{ type: 'default', size: 'sm' }} icon={this.props.icon ? (this.props.icon as any) : null}
                  onChange={(icon) => this.props.optionChange('icon', icon)} configurableOption={'none'}></IconPicker>
              </div>}>
            </SettingSection>

            <SettingSection title={this.i18nMessage('sqlExpr')} >
              <SettingRow label={this.i18nMessage('sqlExprDesc')} ></SettingRow>
              <SettingRow>
                <div className="d-flex justify-content-between w-100 align-items-center">
                  {
                    <Button className="w-100 text-dark set-link-btn" type={isDisabled ? 'secondary' : 'primary'} disabled={isDisabled}
                      onClick={this.showSqlExprPopup} title={this.i18nMessage('openFilterBuilder')}>
                      <div className="w-100 px-2 text-truncate">
                        {this.i18nMessage('openFilterBuilder')}
                      </div>
                    </Button>
                  }
                </div>
              </SettingRow>
              <SettingRow>
                <TextInput type="textarea" style={{ height: '80px' }} className="w-100" spellCheck={false} placeholder={this.i18nMessage('setExprTips')}
                  value={(sqlExprObj && sqlExprObj.displaySQL) ? sqlExprObj.displaySQL : ''}
                  onClick={e => e.currentTarget.select()} readOnly />
              </SettingRow>
            </SettingSection>

            <SettingSection title={this.i18nMessage('options')} className="border-0">
              <SettingRow label={this.i18nMessage('autoApplyWhenWidgetOpen')}>
                <Switch checked={this.props.autoApplyWhenWidgetOpen}
                  onChange={() => this.props.optionChange('autoApplyWhenWidgetOpen', !this.props.autoApplyWhenWidgetOpen)}/>
              </SettingRow>
              <SettingRow label={this.i18nMessage('collapseFilterExprs')}>
                <Switch checked={this.props.collapseFilterExprs} onChange={() => this.props.optionChange('collapseFilterExprs', !this.props.collapseFilterExprs)}/>
              </SettingRow>
            </SettingSection>

            {!isDisabled &&
              <DataSourceComponent useDataSource={useDataSource} >{(ds) => {
                //check if timezone is changed
                if(sqlExprObj){
                  const sqlResult = dataSourceUtils.getArcGISSQL(sqlExprObj, ds);
                  if(sqlResult.displaySQL !== sqlExprObj.displaySQL){
                    this.props.onSqlExprBuilderChange(Object.assign({}, sqlExprObj, sqlResult));
                  }
                }
                return <SqlExpressionBuilderPopup dataSource={ds}
                  isOpen={this.state.isSqlExprShow} toggle={this.toggleSqlExprPopup}
                  expression={sqlExprObj} onChange={this.props.onSqlExprBuilderChange} />
              }}</DataSourceComponent>
            }
          </div>
        </div>
      </div>
    )
  }
}
