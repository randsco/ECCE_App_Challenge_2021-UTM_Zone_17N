/** @jsx jsx */
import {React, IMState, urlUtils, jsx, Immutable, IMThemeVariables, ImmutableArray, ExpressionPartType, IMIconResult, ThemeButtonType,
  IMExpression, UseDataSource, expressionUtils, defaultMessages as jimuCoreMessages, ThemeButtonSize,
  ThemeButtonStyles, IconProps, LinkType, Expression} from 'jimu-core';
import { AllWidgetSettingProps, builderAppSync} from 'jimu-for-builder';
import {SettingSection, SettingRow} from 'jimu-ui/advanced/setting-components';
import {IconPicker} from 'jimu-ui/advanced/resource-selector';
import {Button, Icon, TextInput, Select, Tabs, Tab, defaultMessages as jimuUIMessages, styleUtils, LineType, UnitTypes, FillType, utils as uiUtils} from 'jimu-ui';
import {DataSourceSelector, AllDataSourceTypes} from 'jimu-ui/advanced/data-source-selector';
import {IMLinkParam, LinkSettingPopup} from 'jimu-ui/advanced/setting-components';
import {ExpressionInput, ExpressionInputType} from 'jimu-ui/advanced/expression-builder';

import {IMConfig, IconPosition, IMAdvanceStyleSettings, AdvanceStyleSettings} from '../config';
import {getStyle} from './style';
import AdvanceStyleSetting from './components/advance-style-setting';
import AdvanceCollapse from './components/advance-collapse';
import {getIconPropsFromTheme} from '../utils';
import {defaultMessages as jimuUiDefaultMessages} from 'jimu-ui';

const IconRefresh = require('jimu-ui/lib/icons/link-12.svg');

interface ExtraProps{
  appTheme: IMThemeVariables;
}

interface State{
  isLinkSettingShown: boolean;
  isTextExpOpen: boolean;
  isTipExpOpen: boolean;
  currentTextInput: string;
  currentTipInput: string;
}

const expressionInputTypes = Immutable([ExpressionInputType.Static, ExpressionInputType.Attribute, ExpressionInputType.Statistics, ExpressionInputType.Expression]);
const supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer]);

const enum SettingTabs{
  hover = 'HOVER',
  regular = 'REGULAR'
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps, State>{

  constructor(props) {
    super(props);

    this.state = {
      isLinkSettingShown: false,
      isTextExpOpen: false,
      isTipExpOpen: false,
      currentTextInput: typeof this.props.config?.functionConfig?.text === 'string' ? this.props.config?.functionConfig?.text :
        this.props.intl.formatMessage({id: 'variableButton', defaultMessage: jimuUiDefaultMessages.variableButton}),
      currentTipInput: (this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip) || ''
    }
  }

  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    return {
      appTheme: (state && state.appStateInBuilder && state.appStateInBuilder.theme) || Immutable({})
    }
  }

  componentDidUpdate(prevProps: AllWidgetSettingProps<IMConfig> & ExtraProps){
    if(!this.getIsDataSourceUsed()){
      if(this.props.config?.functionConfig?.text !== prevProps.config?.functionConfig?.text){
        this.setState({
          currentTextInput: typeof this.props.config?.functionConfig?.text === 'string' ? this.props.config?.functionConfig?.text :
            this.props.intl.formatMessage({id: 'variableButton', defaultMessage: jimuUiDefaultMessages.variableButton})
        });
      }
      if(this.props.config?.functionConfig?.toolTip !== prevProps.config?.functionConfig?.toolTip){
        this.setState({
          currentTipInput: (this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip) || ''
        });
      }
    }
  }

  componentWillUnmount(){
    builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'isConfiguringHover', value: false});
  }

  toggleLinkSetting = () => {
    this.setState({ isLinkSettingShown: !this.state.isLinkSettingShown});
  }

  onSettingLinkConfirm = (linkResult: IMLinkParam) => {
    let config;
    if(!linkResult){
      return;
    }
    if(!linkResult.expression){
      let mergedUseDataSources;
      if(this.getIsDataSourceUsed()){
        const textExpression = this.getTextExpression();
        const tooltipExpression = this.getTipExpression();
        mergedUseDataSources = this.mergeUseDataSources(textExpression, tooltipExpression, null);
      }else{
        mergedUseDataSources = this.getUseDataSourcesWithoutFields();
      }
      config = {
        id: this.props.id,
        config: this.props.config.setIn(['functionConfig', 'linkParam'], linkResult),
        useDataSources: mergedUseDataSources
      };
    }else{
      const textExpression = this.getTextExpression();
      const tooltipExpression = this.getTipExpression();
      const expression = linkResult.expression;
      const mergedUseDataSources = this.mergeUseDataSources(textExpression, tooltipExpression, expression);

      config = {
        id: this.props.id,
        config: this.props.config.setIn(['functionConfig', 'linkParam'], linkResult),
        useDataSources: mergedUseDataSources
      };
    }

    this.props.onSettingChange(config);

    this.setState({
      isLinkSettingShown: false
    });
  }

  onTextChange = () => {
    const config = {
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'text'], this.state.currentTextInput)
        .setIn(['functionConfig', 'textExpression'], null),
      useDataSources: this.getUseDataSourcesWithoutFields() as any
    };

    this.props.onSettingChange(config);
  }

  onToolTipChange = () => {
    const config = {
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTip'], this.state.currentTipInput)
        .setIn(['functionConfig', 'toolTipExpression'], null),
      useDataSources: this.getUseDataSourcesWithoutFields() as any
    };
    this.props.onSettingChange(config);
  }

  onTextExpChange = (expression: Expression) => {
    if(!expression){
      return;
    }
    const tooltipExpression = this.getTipExpression();
    const linkSettingExpression = this.getLinkSettingExpression();
    const mergedUseDataSources = this.mergeUseDataSources(Immutable(expression), tooltipExpression, linkSettingExpression);
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'textExpression'], expression).setIn(['functionConfig', 'text'], ''),
      useDataSources: mergedUseDataSources as any
    });
    this.setState({isTextExpOpen: false});
  }

  onTipExpChange = (expression: Expression) => {
    if(!expression){
      return;
    }
    const textExpression = this.getTextExpression();
    const linkSettingExpression = this.getLinkSettingExpression();
    const mergedUseDataSources = this.mergeUseDataSources(textExpression, Immutable(expression), linkSettingExpression);
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTipExpression'], expression).setIn(['functionConfig', 'toolTip'], ''),
      useDataSources: mergedUseDataSources as any
    });
    this.setState({isTipExpOpen: false});
  }

  onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    let config = this.props.config;
    if(useDataSourcesEnabled){
      config = config.setIn(['functionConfig', 'textExpression'], this.getTextExpression())
        .setIn(['functionConfig', 'toolTipExpression'], this.getTipExpression());
      config = config.set('functionConfig', config.functionConfig.without('text').without('toolTip'));

      if(this.props.config?.functionConfig?.linkParam?.linkType === LinkType.WebAddress){
        config = config.setIn(['functionConfig', 'linkParam', 'expression'], this.getLinkSettingExpression());
        config = config.setIn(['functionConfig', 'linkParam'], config.functionConfig.linkParam.without('value'));
      }
    }else{
      config = config.setIn(['functionConfig', 'text'], this.state.currentTextInput)
        .setIn(['functionConfig', 'toolTip'], this.state.currentTipInput);
      config = config.set('functionConfig', config.functionConfig.without('textExpression').without('toolTipExpression'));

      if(this.props.config?.functionConfig?.linkParam?.linkType === LinkType.WebAddress){
        config = config.setIn(['functionConfig', 'linkParam', 'value'], '');
        config = config.setIn(['functionConfig', 'linkParam'], config.functionConfig.linkParam.without('expression'));
      }
    }
    this.props.onSettingChange({
      id: this.props.id,
      useDataSourcesEnabled,
      config
    });
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

  getDefaultIconColor = (isRegular: boolean) => {
    const status = isRegular ? 'regular' : 'hover';
    return this.props.config.getIn(['styleConfig', 'customStyle', status, 'iconProps', 'color']) || this.props.appTheme.colors.dark;
  }

  onIconResultChange = (result: IMIconResult) => {
    let config;
    if(result){
      config = this.props.config;
      const position = this.props.config.getIn(['functionConfig', 'icon', 'position']) || IconPosition.Left;
      const regularColor = this.getDefaultIconColor(true);
      const hoverColor = this.getDefaultIconColor(false);
      const regularSize = this.props.config.getIn(['styleConfig', 'customStyle', 'regular', 'iconProps', 'size']) || result.properties.size;
      const hoverSize = this.props.config.getIn(['styleConfig', 'customStyle', 'hover', 'iconProps', 'size']) || result.properties.size;
      config = config.setIn(['functionConfig', 'icon', 'data'], result.svg)
        .setIn(['functionConfig', 'icon', 'position'], position)
        .setIn(['styleConfig', 'customStyle', 'regular', 'iconProps', 'color'], regularColor)
        .setIn(['styleConfig', 'customStyle', 'regular', 'iconProps', 'size'], regularSize)
        .setIn(['styleConfig', 'customStyle', 'hover', 'iconProps', 'color'], hoverColor)
        .setIn(['styleConfig', 'customStyle', 'hover', 'iconProps', 'size'], hoverSize);
    }else{
      config = this.props.config.set('functionConfig', this.props.config.functionConfig.without('icon'))
        .setIn(['styleConfig', 'customStyle', 'regular'], this.props.config.getIn(['styleConfig', 'customStyle', 'regular'], Immutable({}) as IMAdvanceStyleSettings).without('iconProps'))
        .setIn(['styleConfig', 'customStyle', 'hover'], this.props.config.getIn(['styleConfig', 'customStyle', 'hover'], Immutable({}) as IMAdvanceStyleSettings).without('iconProps'));
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
  }

  getWhetherHaveCustomStyle = (isRegular: boolean): boolean => {
    const status = isRegular ? 'regular' : 'hover';
    let style = this.props.config.getIn(['styleConfig', 'customStyle', status]);
    if(style && style.iconProps){ // iconProps is not custom style, user can select icon before opening advanced style
      style = style.without('iconProps');
    }
    return !!(style && Object.keys(style).length > 0);
  }

  onRegularStyleChange = (style: IMAdvanceStyleSettings) => {
    let config = this.props.config.setIn(['styleConfig', 'customStyle', 'regular'], style);
    if(!this.getWhetherHaveCustomStyle(false)){
      config = config.setIn(['styleConfig', 'customStyle', 'hover'], this.getThemeStyle(false));
    }
    if(config.getIn(['styleConfig', 'themeStyle'])){
      config = config.set('styleConfig', config.styleConfig.without('themeStyle'));
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
  }

  onHoverStyleChange = (style: IMAdvanceStyleSettings) => {
    let config = this.props.config.setIn(['styleConfig', 'customStyle', 'hover'], style);
    if(!this.getWhetherHaveCustomStyle(true)){
      config = config.setIn(['styleConfig', 'customStyle', 'regular'], this.getThemeStyle(true));
    }
    if(config.getIn(['styleConfig', 'themeStyle'])){
      config = config.set('styleConfig', config.styleConfig.without('themeStyle'));
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
  }

  onIconPositionChange = e => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'icon', 'position'], e.target.value)
    });
  }

  onAdvanceTabSelect = id => {
    const isConfiguringHover = id === SettingTabs.hover;

    builderAppSync.publishChangeWidgetStatePropToApp({widgetId: this.props.id, propKey: 'isConfiguringHover', value: isConfiguringHover});
  }

  mergeUseDataSources = (textExpression: IMExpression, tipExpression: IMExpression, linkSettingExpression: IMExpression): ImmutableArray<UseDataSource> => {
    const textDss = expressionUtils.getUseDataSourceFromExpParts(textExpression && textExpression.parts, this.props.useDataSources);
    const tipDss = expressionUtils.getUseDataSourceFromExpParts(tipExpression && tipExpression.parts, this.props.useDataSources);
    const linkSettingDss = expressionUtils.getUseDataSourceFromExpParts(linkSettingExpression && linkSettingExpression.parts, this.props.useDataSources);
    return this.mergeUseDataSourcesByDss(textDss, tipDss, linkSettingDss);
  }

  mergeUseDataSourcesByDss = (textUseDss: ImmutableArray<UseDataSource>, tipUseDss: ImmutableArray<UseDataSource>,
    linkSettingUseDss: ImmutableArray<UseDataSource>): ImmutableArray<UseDataSource> => {
    const useDataSourcesWithoutFields = this.getUseDataSourcesWithoutFields();
    let mergedUseDss = expressionUtils.mergeUseDataSources(useDataSourcesWithoutFields, textUseDss)
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, tipUseDss);
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, linkSettingUseDss);
    return mergedUseDss;
  }

  getUseDataSourcesWithoutFields = (): ImmutableArray<UseDataSource> => {
    if(this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId){
      return Immutable([this.props.useDataSources[0].without('fields').asMutable({deep: true})]);
    }else{
      return Immutable([]);
    }
  }

  getIsDataSourceUsed = () => {
    return !!this.props.useDataSourcesEnabled;
  }

  getTipExpression = (): IMExpression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTipExpression &&
      this.props.config.functionConfig.toolTipExpression;
    return expression || Immutable({name: '', parts: [{type: ExpressionPartType.String, exp: `"${this.state.currentTipInput}"`}]});
  }

  getTextExpression = (): IMExpression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.textExpression &&
      this.props.config.functionConfig.textExpression;
    return expression || Immutable({name: '', parts: [{type: ExpressionPartType.String, exp: `"${this.state.currentTextInput}"`}]});
  }

  getLinkSettingExpression = (): IMExpression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.linkParam &&
      this.props.config.functionConfig.linkParam && this.props.config.functionConfig.linkParam.expression;

    return expression ||
      (
        this.props.config?.functionConfig?.linkParam?.linkType === LinkType.WebAddress && this.props.config?.functionConfig?.linkParam?.value ?
          Immutable({name: '', parts: [{type: ExpressionPartType.String, exp: `"${this.props.config?.functionConfig?.linkParam?.value}"`}]}) : null
      );
  }

  getThemeStyle = (isRegular: boolean): IMAdvanceStyleSettings => {
    if(!this.props.config.getIn(['styleConfig', 'themeStyle'])){
      return Immutable({});
    }
    const quickStyleType: ThemeButtonType = this.props.config.getIn(['styleConfig', 'themeStyle', 'quickStyleType']);
    const status = isRegular ? 'default' : 'hover';
    const themeVars = this.props.appTheme.getIn(['components', 'button', 'variants', quickStyleType, status]) || ({} as ThemeButtonStyles);
    const themeSize = this.props.appTheme.getIn(['components', 'button', 'sizes', 'default']) || ({} as ThemeButtonSize);

    const borderRadiusInPx: number = parseFloat(styleUtils.remToPixel(themeSize.borderRadius as string));
    const iconProps = {
      color: themeVars.color,
      size: parseFloat(styleUtils.remToPixel(themeSize.fontSize as string))
    } as IconProps;
    const style: AdvanceStyleSettings = {
      background: {
        color: themeVars.bg,
        fillType: FillType.FILL
      },
      border: {
        type: LineType.SOLID,
        color: themeVars.border && themeVars.border.color,
        width: uiUtils.stringOfLinearUnit({
          distance: themeVars.border && typeof themeVars.border.width === 'string' ? parseFloat(styleUtils.remToPixel(themeVars.border.width as string)) : undefined,
          unit: UnitTypes.PIXEL
        })
      },
      text: {
        color: themeVars.color,
        size: styleUtils.remToPixel(themeSize.fontSize as string)
      },
      borderRadius: {
        unit: UnitTypes.PIXEL,
        number: [borderRadiusInPx, borderRadiusInPx, borderRadiusInPx, borderRadiusInPx]
      },
      iconProps
    };

    return Immutable(style);
  }

  openTextExpPopup = () => {
    this.setState({
      isTextExpOpen: true,
      isTipExpOpen: false
    });
  }

  openTipExpPopup = () => {
    this.setState({
      isTextExpOpen: false,
      isTipExpOpen: true
    });
  }

  closeTextExpPopup = () => {
    this.setState({
      isTextExpOpen: false,
      isTipExpOpen: false
    });
  }

  closeTipExpPopup = () => {
    this.setState({
      isTextExpOpen: false,
      isTipExpOpen: false
    });
  }

  showTextSetting = (): boolean => {
    return !!(
      !this.getIsDataSourceUsed() ? !!this.state.currentTextInput :
        !!(
          !this.props.config.getIn(['functionConfig', 'textExpression']) ||
          (
            this.props.config.getIn(['functionConfig', 'textExpression']) &&
            this.props.config.getIn(['functionConfig', 'textExpression', 'parts']) &&
            (this.props.config.getIn(['functionConfig', 'textExpression', 'parts']).length > 1 || this.props.config.getIn(['functionConfig', 'textExpression', 'parts', '0', 'exp']) !== '""')
          )
        )
    );
  }

  showIconSetting = (): boolean => {
    return !!this.props.config.getIn(['functionConfig', 'icon']);
  }

  toggleUseCustom = () => {
    let config = this.props.config;
    config = config.setIn(['styleConfig', 'useCustom'], !config.getIn(['styleConfig', 'useCustom']));
    if(config.getIn(['styleConfig', 'useCustom'])){
      config = config.setIn(['styleConfig', 'customStyle', 'hover'], this.getThemeStyle(false));
      config = config.setIn(['styleConfig', 'customStyle', 'regular'], this.getThemeStyle(true));
      config = config.set('styleConfig', config.styleConfig.without('themeStyle'));
    }else{
      config = config.setIn(['styleConfig', 'themeStyle', 'quickStyleType'], 'default');
      config = config.setIn(['styleConfig', 'customStyle', 'regular'], {iconProps: getIconPropsFromTheme(true, 'default', this.props.appTheme)});
      config = config.setIn(['styleConfig', 'customStyle', 'hover'], {iconProps: getIconPropsFromTheme(false, 'default', this.props.appTheme)});
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    });
  }

  render() {
    const icon = this.props.config.functionConfig.icon ? {svg: this.props.config.functionConfig.icon.data} : null;
    const customStyle = this.props.config.styleConfig && this.props.config.styleConfig.customStyle;
    const isTextSettingOpen = this.showTextSetting();
    const isIconSettingOpen = this.showIconSetting();
    const isPositionOpen = isTextSettingOpen && isIconSettingOpen;
    return(
      <div css={getStyle(this.props.theme)}>
        <div className="widget-setting-link jimu-widget">
          <div>
            <SettingSection>
              <SettingRow>
                <div className="choose-ds w-100">
                  <DataSourceSelector types={supportedDsTypes} useDataSources={this.props.useDataSources}
                    useDataSourcesEnabled={this.getIsDataSourceUsed()} onToggleUseDataEnabled={this.onToggleUseDataEnabled}
                    onChange={this.onDataSourceChange} widgetId={this.props.id}
                  />
                </div>
              </SettingRow>
            </SettingSection>

            <SettingSection>
              <SettingRow>
                <Button className="w-100 text-dark set-link-btn" type="primary" onClick={this.toggleLinkSetting}>
                  <div className="w-100 px-2 text-truncate">
                    <Icon icon={IconRefresh} size={12} className="add-data-icon" />
                    {this.props.intl.formatMessage({id: 'setLink', defaultMessage: jimuUIMessages.setLink})}
                  </div>
                </Button>
              </SettingRow>
              <SettingRow label={this.props.intl.formatMessage({id: 'tooltip', defaultMessage: jimuUiDefaultMessages.tooltip})} />
              <SettingRow>
                {
                  this.getIsDataSourceUsed() ?
                    <div className="w-100">
                      <ExpressionInput useDataSources={this.props.useDataSources} onChange={this.onTipExpChange} openExpPopup={this.openTipExpPopup}
                        expression={this.getTipExpression()} isExpPopupOpen={this.state.isTipExpOpen} closeExpPopup={this.closeTipExpPopup}
                        types={expressionInputTypes}
                        widgetId={this.props.id}
                      />
                    </div> :
                    <TextInput className="w-100" value={this.state.currentTipInput}
                      onChange={(event) => { this.setState({currentTipInput: event.target.value}); }}
                      onBlur={() => {this.onToolTipChange()}}
                      onKeyUp={() => {this.onToolTipChange()}}
                    />
                }
              </SettingRow>
              <SettingRow label={this.props.intl.formatMessage({id: 'text', defaultMessage: jimuUiDefaultMessages.text})} />
              <SettingRow>
                {
                  this.getIsDataSourceUsed() ?
                    <div className="w-100">
                      <ExpressionInput useDataSources={this.props.useDataSources} onChange={this.onTextExpChange} openExpPopup={this.openTextExpPopup}
                        expression={this.getTextExpression()} isExpPopupOpen={this.state.isTextExpOpen} closeExpPopup={this.closeTextExpPopup}
                        types={expressionInputTypes}
                        widgetId={this.props.id}
                      />
                    </div> :
                    <TextInput className="w-100" value={this.state.currentTextInput}
                      onChange={(event) => { this.setState({ currentTextInput: event.target.value}); }}
                      onBlur={() => {this.onTextChange()}}
                      onKeyUp={() => {this.onTextChange()}}
                    />
                }
              </SettingRow>
              <SettingRow label={this.props.intl.formatMessage({id: 'icon', defaultMessage: jimuCoreMessages.icon})}>
                <IconPicker  icon={icon} configurableOption={'none'} onChange={this.onIconResultChange} />
              </SettingRow>
              {
                isPositionOpen &&
                <SettingRow label={this.props.intl.formatMessage({id: 'position', defaultMessage: jimuUIMessages.position})}>
                  <div>
                    <Select onChange={this.onIconPositionChange}
                      value={this.props.config.functionConfig && this.props.config.functionConfig.icon && this.props.config.functionConfig.icon.position}
                    >
                      {
                        Object.keys(IconPosition).map(p => <option value={IconPosition[p]} key={p}>
                          {this.props.intl.formatMessage({id: p.toLowerCase(), defaultMessage: jimuUIMessages[p.toLowerCase()]})}
                        </option>)
                      }
                    </Select>
                  </div>
                </SettingRow>
              }
            </SettingSection>

            <SettingSection>
              <AdvanceCollapse title={this.props.intl.formatMessage({id: 'advance', defaultMessage: jimuUIMessages.advance})}
                isOpen={!!this.props.config?.styleConfig?.useCustom} toggle={this.toggleUseCustom}
              >
                <Tabs fill pills onTabSelect={this.onAdvanceTabSelect}>
                  <Tab id={SettingTabs.regular} defaultActive title={this.props.intl.formatMessage({id: 'regular', defaultMessage: jimuUIMessages.regular})}>
                    <AdvanceStyleSetting intl={this.props.intl} appTheme={this.props.appTheme}
                      style={customStyle && customStyle.regular} themeStyle={this.getThemeStyle(true)} onChange={this.onRegularStyleChange}
                      isTextSettingOpen={isTextSettingOpen} isIconSettingOpen={isIconSettingOpen}
                    />
                  </Tab>
                  <Tab id={SettingTabs.hover} title={this.props.intl.formatMessage({id: 'hover', defaultMessage: jimuUIMessages.hover})}>
                    <AdvanceStyleSetting intl={this.props.intl} appTheme={this.props.appTheme}
                      style={customStyle && customStyle.hover} themeStyle={this.getThemeStyle(false)} onChange={this.onHoverStyleChange}
                      isTextSettingOpen={isTextSettingOpen} isIconSettingOpen={isIconSettingOpen}
                    />
                  </Tab>
                </Tabs>
              </AdvanceCollapse>
            </SettingSection>

          </div>

          {
            this.state.isLinkSettingShown && !urlUtils.getAppIdPageIdFromUrl().pageId &&
            <LinkSettingPopup isOpen={this.state.isLinkSettingShown}
              onSettingCancel={() => {this.setState({ isLinkSettingShown: false}); }}
              onSettingConfirm={this.onSettingLinkConfirm}
              linkParam={this.props.config.functionConfig.linkParam}
              useDataSources={this.getIsDataSourceUsed() && this.props.useDataSources}
              widgetId={this.props.id}
            />
          }
        </div>
      </div>
    )
  }
}
