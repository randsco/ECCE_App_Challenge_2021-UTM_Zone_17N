/** @jsx jsx */
import { React, IMAppConfig, IMState, jsx, ThemeVariables, IMThemeVariables, Immutable, UseDataSource, Expression, JimuFieldType } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { Icon, Radio, TextInput, Label, Switch, NumericInput, defaultMessages as jimuUiMessages } from 'jimu-ui';
import defaultMessages from './translations/default';
import { IMConfig, EmbedType } from '../config';
import { getStyle } from './style';
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector';
import { ExpressionInput, ExpressionInputType } from 'jimu-ui/advanced/expression-builder';

interface ExtraProps {
  appConfig: IMAppConfig;
  appTheme: ThemeVariables;
}

interface CustomeProps {
  theme: IMThemeVariables;
}

interface State {
  showUrlError: boolean;
  urlError: string;
  isExpPopupOpen: boolean;
  staticUrl: string;
}

const expressionInputTypes = Immutable([ExpressionInputType.Attribute, ExpressionInputType.Expression]);

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State>{
  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer]);
  attributePlaceHolder: string;
  expressionPlaceHolder: string;
  constructor(props) {
    super(props);

    const {config} = props;
    this.state = {
      showUrlError: false,
      urlError: '',
      isExpPopupOpen: false,
      staticUrl: config.staticUrl
    }
  }

  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme
    }
  }

  embedTypeChange = (type: EmbedType) => {
    const {config} = this.props;
    if (this.props.config.embedType !== type) {
      this.props.onSettingChange({
        id: this.props.id,
        config: config.set('embedType', type)
      });
    }
  }

  checkURL = (str: string): boolean => {
    if(!str || str === '') {
      this.setState({ urlError: '' });
      return true;
    }
    const httpsRex = '^(([h][t]{2}[p][s])?://)';
    const re = new RegExp(httpsRex);
    if(!re.test(str)){
      this.setState({
        urlError: this.formatMessage('httpsUrlMessage')
      })
      return false;
    }
    const index = str.indexOf('.');
    if(index < 0 || index === str.length - 1){
      this.setState({
        urlError: this.formatMessage('invalidUrlMessage')
      })
      return false;
    }
    return true;
  }

  embedCodeChangeRightAway = (value) => {
    const {config, id} = this.props;
    this.props.onSettingChange({
      config: config.set('embedCode', value),
      id: id
    })
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: {...jimuUiMessages, ...defaultMessages}[id]})
  }

  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if(!useDataSources){
      return;
    }

    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources
    });
  }

  onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSourcesEnabled
    });
  }

  onSwitchChanged = (checked, name): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(name, checked),
    });
  };

  handleAutoInterval = (valueInt: number) => {
    const {config, id} = this.props;
    this.props.onSettingChange({
      id,
      config: config.set('autoInterval', valueInt),
    });
  }

  openExpPopup = () => this.setState({isExpPopupOpen: true})

  closeExpPopup = () => this.setState({isExpPopupOpen: false})

  webAddressExpressionChange = (e: Expression) => {
    const {config, onSettingChange, id} = this.props;
    onSettingChange({
      id,
      config: config.set('expression', e),
    })
    this.closeExpPopup();
  }

  staticUrlChange = (event) => {
    let value;
    if (!event || !event.target || !event.target.value){
      value = ''
    }else {
      value = event.target.value.trim();
    }
    const alterState = {
      staticUrl: value,
      showUrlError: false
    } as any;
    if(!this.checkURL(value)){
      alterState.showUrlError = true;
    }
    this.setState(alterState);
  }

  staticUrlSubmit = (value) => {
    if(!this.checkURL(value)){
      this.setState({
        showUrlError: true
      })
      return;
    }
    const {config, onSettingChange, id} = this.props;
    onSettingChange({
      id,
      config: config.set('staticUrl', value),
    })
  }

  isUsedDataSource = () => {
    const {useDataSources, useDataSourcesEnabled} = this.props;
    return useDataSourcesEnabled && useDataSources && useDataSources.length > 0
  }

  render() {
    const {theme, config, useDataSourcesEnabled} = this.props;
    const { embedType} = config;
    const {staticUrl} = this.state;
    //const useDataSources = this.props.useDataSources || [];
    //const dataSourceIds: ImmutableArray<string> = useDataSources[0] ? Immutable([useDataSources[0].dataSourceId]) : Immutable([]);

    return (
      <div css={getStyle(this.props.theme)}>
        <div className="widget-iframe jimu-widget">
          <div>
            <SettingSection>
              <SettingRow label={this.formatMessage('embedBy')}>
              </SettingRow>
              <SettingRow>
                <Radio onChange={() => this.embedTypeChange(EmbedType.Url)}
                  checked={embedType === EmbedType.Url} />
                <Label className="ml-2 " onClick={evt => this.embedTypeChange(EmbedType.Url)} >{this.formatMessage('websiteAddress')}</Label>
              </SettingRow>
              <SettingRow>
                <Radio onChange={() => this.embedTypeChange(EmbedType.Code)}
                  checked={embedType === EmbedType.Code} />
                <Label className="ml-2 " onClick={evt => this.embedTypeChange(EmbedType.Code)} >{this.formatMessage('code')}</Label>
              </SettingRow>
              <SettingRow>
                {embedType === EmbedType.Url ?
                  <div className="d-flex flex-column w-100" style={{zIndex: 3}}>
                    {
                      this.isUsedDataSource() ?
                        <ExpressionInput useDataSources={this.props.useDataSources}
                          fieldTypes={Immutable([JimuFieldType.String])}
                          onChange={this.webAddressExpressionChange}
                          expression={config.expression && config.expression.asMutable({deep: true})}
                          placeHolders={{
                            [ExpressionInputType.Attribute]: this.formatMessage('attributeHint'),
                            [ExpressionInputType.Expression]: this.formatMessage('expressionHint')}}
                          closeExpPopup={this.closeExpPopup} openExpPopup={this.openExpPopup} isExpPopupOpen={this.state.isExpPopupOpen}
                          types={expressionInputTypes}
                        /> :
                        <TextInput
                          invalid={this.state.showUrlError}
                          type="text"
                          className="w-100"
                          placeholder={this.formatMessage('websitePlaceholder')}
                          value={staticUrl}
                          onChange={this.staticUrlChange}
                          onAcceptValue={this.staticUrlSubmit}
                          spellCheck={false}
                        />
                    }
                    {this.state.showUrlError &&
                      <div className="d-flex w-100 align-items-center justify-content-between" style={{ marginTop: '5px' }}>
                        <Icon size={16} icon={require('jimu-ui/lib/icons/warning.svg')} color={theme.colors.danger} />
                        <div
                          style={{
                            width: 'calc(100% - 20px)',
                            margin: '0 4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: theme.colors.danger }} >
                          {this.state.urlError}
                        </div>
                      </div>
                    }
                  </div> :
                  <TextInput type="textarea"
                    style={{ height: '300px' }}
                    className="w-100"
                    spellCheck={false}
                    placeholder={this.formatMessage('codePlaceholder')}
                    value={config.embedCode || ''}
                    onAcceptValue={this.embedCodeChangeRightAway} />
                }
              </SettingRow>
              {embedType === EmbedType.Url &&
                <SettingRow>
                  <div className="choose-ds w-100">
                    <DataSourceSelector types={this.supportedDsTypes} useDataSources={this.props.useDataSources}
                      useDataSourcesEnabled={useDataSourcesEnabled} onToggleUseDataEnabled={this.onToggleUseDataEnabled}
                      onChange={this.onDataSourceChange} widgetId={this.props.id}
                    />
                  </div>
                </SettingRow>
              }
              <SettingRow>
                <div className="d-flex justify-content-between w-100">
                  <label className="w-75 text-truncate d-inline-block font-dark-600">{this.formatMessage('autoRefresh')}</label>
                  <Switch className="can-x-switch" checked={(this.props.config && this.props.config.autoRefresh) || false}
                    data-key="autoRefresh" onChange={evt => {this.onSwitchChanged(evt.target.checked, 'autoRefresh')}} />
                </div>
              </SettingRow>
              {config.autoRefresh &&
                <SettingRow flow="wrap" label={`${this.formatMessage('autoInterval')} (${this.formatMessage('autoUnit')})`}>
                  <NumericInput
                    style={{ width: '100%' }}
                    value={config.autoInterval || 1}
                    precision={2}
                    min={0.2}
                    max={1440}
                    onChange={this.handleAutoInterval}
                  />
                </SettingRow>
              }
            </SettingSection>
          </div>
        </div>
      </div>
    )
  }
}
