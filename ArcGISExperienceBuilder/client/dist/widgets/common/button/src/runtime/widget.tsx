/** @jsx jsx */
import {React, LinkType,  AllWidgetProps, ExpressionPartType, ExpressionResolverErrorCode, appActions, LinkTo, LinkResult, classNames,
  RepeatedDataSource, IMExpression, jsx, ExpressionResolverComponent, Immutable, IMState, AppMode, ThemeButtonType, css, IMIconProps, SerializedStyles,
  getAppStore,
  IMUrlParameters} from 'jimu-core';
import {styleUtils, Link, ButtonProps, LinkTarget, Icon, UnitTypes} from 'jimu-ui';
import {IMConfig, IconPosition, IMWidgetState} from '../config';
import {getStyle} from './style';
import {versionManager} from '../version-manager';
import {getIconPropsFromTheme} from '../utils';
import {defaultMessages as jimuUiDefaultMessages} from 'jimu-ui';

enum RepeatType { None, Main, Sub }

interface State{
  text: string;
  toolTip: string;
  url: string;
  textExpression: IMExpression;
  tipExpression: IMExpression;
  urlExpression: IMExpression;
}

interface ExtraProps {
  active: boolean;
  showQuickStyle: boolean;
  appMode: AppMode;
  queryObject: IMUrlParameters;
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig> & ExtraProps, State>{
  domNode: React.RefObject<HTMLDivElement>;
  repeat: RepeatType = 0;

  constructor(props) {
    super(props);
    this.state = {
      text: this.getTextFromProps(),
      toolTip: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip || '',
      url: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.linkParam && this.props.config.functionConfig.linkParam.value || '',
      textExpression: this.props.useDataSourcesEnabled && this.getTextExpression(),
      tipExpression: this.props.useDataSourcesEnabled && this.getTipExpression(),
      urlExpression: this.props.useDataSourcesEnabled && this.getUrlExpression()
    };
    this.domNode = React.createRef();
  }

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<IMConfig>): ExtraProps => {
    let selected = false;
    const selection = state.appRuntimeInfo.selection;
    if (selection && state.appConfig.layouts[selection.layoutId]) {
      const layoutItem = state.appConfig.layouts[selection.layoutId].content[selection.layoutItemId];
      selected = layoutItem && layoutItem.widgetId === ownProps.id
    }
    const isInBuilder = state.appContext.isInBuilder;
    const active = isInBuilder && selected;

    const widgetState = state.widgetsState[ownProps.id] || Immutable({});
    const showQuickStyle = !!widgetState.showQuickStyle;
    return {
      active,
      showQuickStyle,
      appMode: active ? state.appRuntimeInfo.appMode : null,
      queryObject: state.queryObject
    }
  };

  static versionManager = versionManager;

  componentDidMount(){
    this.setRepeatType();
    window.jimuConfig.isInBuilder && this.props.active
      && this.props.dispatch(appActions.widgetStatePropChange(this.props.id, 'showQuickStyle', true));
  }

  componentDidUpdate(prevProps: AllWidgetProps<IMConfig> & ExtraProps, prevState: State){
    if(!this.props.useDataSourcesEnabled &&
      (
        this.props.config !== prevProps.config || prevProps.useDataSourcesEnabled
      )
    ){
      this.setState({
        text: this.getTextFromProps(),
        toolTip: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip,
        url: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.linkParam && this.props.config.functionConfig.linkParam.value
      });
    }

    if(this.props.useDataSourcesEnabled &&
      (
        this.props.config !== prevProps.config || !prevProps.useDataSourcesEnabled
      )
    ){
      this.setState({
        textExpression: this.getTextExpression(),
        tipExpression: this.getTipExpression(),
        urlExpression: this.getUrlExpression()
      });
    }

    if(
      window.jimuConfig.isInBuilder &&
      ((this.props.appMode !== prevProps.appMode && this.props.appMode === AppMode.Run) ||
      (!this.props.active && prevProps.active))
    ){
      this.props.dispatch(appActions.widgetStatePropChange(this.props.id, 'showQuickStyle', false));
    }
  }

  getTextFromProps = (): string => {
    return typeof this.props.config?.functionConfig?.text === 'string' ? this.props.config?.functionConfig?.text :
      this.props.intl.formatMessage({id: 'variableButton', defaultMessage: jimuUiDefaultMessages.variableButton});
  }

  setRepeatType = () => {
    const repeatedDataSource = this.props.repeatedDataSource as RepeatedDataSource;
    let repeat;
    if (!repeatedDataSource) {
      repeat = RepeatType.None;
    } else {
      if (repeatedDataSource.recordIndex === 0) {
        repeat = RepeatType.Main;
      } else {
        repeat = RepeatType.Sub;
      }
    }
    this.repeat = repeat;
  }

  getTipExpression = (): IMExpression => {
    return (this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTipExpression &&
      this.props.config.functionConfig.toolTipExpression) ||
      Immutable({
        name: '',
        parts: [{type: ExpressionPartType.String, exp: `"${this.props.config?.functionConfig?.toolTip || ''}"`}]
      });
  }

  getTextExpression = (): IMExpression => {
    return (this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.textExpression &&
      this.props.config.functionConfig.textExpression) ||
      Immutable({
        name: '',
        parts: [{type: ExpressionPartType.String, exp: `"${this.props.config?.functionConfig?.text || this.getTextFromProps()}"`}]
      });
  }

  getUrlExpression = (): IMExpression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.linkParam &&
      this.props.config.functionConfig.linkParam && this.props.config.functionConfig.linkParam.expression;

    return expression || null;
  }

  onTextExpResolveChange = result => {
    if(result.isSuccessful){
      this.setState({text: result.value});
    }else{
      let res: string = '';
      const errorCode = result.value;
      if(errorCode === ExpressionResolverErrorCode.Failed){
        res = this.state.textExpression && this.state.textExpression.name;
      }

      this.setState({text: res});
    }
  }

  onTipExpResolveChange = result => {
    if(result.isSuccessful){
      this.setState({toolTip: result.value});
    }else{
      let res: string = '';
      const errorCode = result.value;
      if(errorCode === ExpressionResolverErrorCode.Failed){
        res = this.state.tipExpression && this.state.tipExpression.name;
      }

      this.setState({toolTip: res});
    }
  }

  onUrlExpResolveChange = result => {
    if(result.isSuccessful){
      this.setState({url: result.value});
    }else{
      let res: string = '';
      const errorCode = result.value;
      if(errorCode === ExpressionResolverErrorCode.Failed){
        res = this.state.urlExpression && this.state.urlExpression.name;
      }

      this.setState({url: res});
    }
  }

  showQuickStylePanel = (): boolean => {
    if(!window.jimuConfig.isInBuilder){
      return false;
    }
    const repeat = this.repeat;
    const { active } = this.props;
    return this.props.showQuickStyle && active && repeat !== RepeatType.Sub;
  }

  getWhetherUseQuickStyle = (config: IMConfig): boolean => {
    return !!(config && config.styleConfig && config.styleConfig.themeStyle && config.styleConfig.themeStyle.quickStyleType);
  }

  getIconStyle = (regularIconProps: IMIconProps, hoverIconProps: IMIconProps): SerializedStyles => {
    const r = regularIconProps || ({} as IMIconProps);
    const h = hoverIconProps || ({} as IMIconProps);

    return css`
      & img, & svg{
        color: ${r.color};
        fill: ${r.color};
        width: ${r.size}${UnitTypes.PIXEL};
        height: ${r.size}${UnitTypes.PIXEL};
      }
      &:hover{
        img, svg{
          color: ${h.color};
          fill: ${h.color};
          width: ${h.size}${UnitTypes.PIXEL};
          height: ${h.size}${UnitTypes.PIXEL};
        }
      }
    `;
  }

  removeUndefinedStyle = (style: React.CSSProperties): React.CSSProperties => {
    if(!style){
      return style;
    }
    const removedUndefinedStyle = {};
    Object.keys(style).forEach(styleName => {
      if((typeof style[styleName] === 'string' && style[styleName].indexOf('undefined') < 0)
        || typeof style[styleName] === 'number'){
        removedUndefinedStyle[styleName] = style[styleName];
      }
    });
    return removedUndefinedStyle;
  }

  getLinkComponent = () => {
    const config = this.props.config;
    const linkParam = config.functionConfig.linkParam;
    const text = this.state.text;
    const toolTip = this.state.toolTip;

    let customStyle;
    let iconStyle;
    if(config.styleConfig && config.styleConfig.customStyle){
      const regular = config.styleConfig.customStyle.regular;
      const hover = config.styleConfig.customStyle.hover;
      if(config.styleConfig.useCustom){
        const style = styleUtils.toCSSStyle(regular && regular.without('iconProps').asMutable({deep: true})) as React.CSSProperties;
        const hoverStyle = styleUtils.toCSSStyle(hover && hover.without('iconProps').asMutable({deep: true})) as React.CSSProperties;
        if(this.props.active && this.props.appMode !== AppMode.Run){
          const widgetState: IMWidgetState = getAppStore().getState().widgetsState[this.props.id] || Immutable({});
          customStyle = {
            style: widgetState.isConfiguringHover ?
              {...this.removeUndefinedStyle(style), ...this.removeUndefinedStyle(hoverStyle)}
              : style,
            hoverStyle
          };
          iconStyle = this.getIconStyle(
            widgetState.isConfiguringHover ? {...regular?.iconProps, ...hover?.iconProps} : regular?.iconProps,
            hover?.iconProps
          );
        }else{
          customStyle = {
            style,
            hoverStyle
          };
          iconStyle = this.getIconStyle(regular && regular.iconProps, hover && hover.iconProps);
        }
      }
    }

    const useQuickStyle = this.getWhetherUseQuickStyle(config);
    const themeStyle: ButtonProps = useQuickStyle ? {
      type: config.styleConfig.themeStyle.quickStyleType
    } : null;

    const basicClassNames = 'widget-button-link text-truncate w-100 h-100 p-0 d-flex align-items-center justify-content-center';

    let queryObject;
    let target: LinkTarget;
    let linkTo: LinkTo;
    if(linkParam && linkParam.linkType){
      target = linkParam.openType;
      linkTo = {
        linkType: linkParam.linkType
      } as LinkResult;

      if(linkParam.linkType === LinkType.WebAddress){
        linkTo.value = this.state.url;
      }else{
        linkTo.value = linkParam.value;
        queryObject = this.props.queryObject;
      }
    }

    const icon = config.functionConfig.icon;

    return <Link to={linkTo} target={target} queryObject={queryObject}
      title={toolTip} className={basicClassNames}
      customStyle={customStyle} themeStyle={themeStyle} css={iconStyle}
    >
      <span className="text-truncate widget-button-text">
        {
          icon && (!icon.position || icon.position === IconPosition.Left) && <Icon icon={icon.data} className={classNames({'mr-2 ml-0': !!text, 'mx-0': !text})}/>
        }
        {text}
        {
          icon && icon.position && icon.position === IconPosition.Right && <Icon icon={icon.data} className={classNames({'ml-2 mr-0': !!text, 'mx-0': !text})}/>
        }
      </span>
    </Link>;
  }

  onQuickStyleChange = (t: ThemeButtonType) => {
    let { config } = this.props;
    const id = this.props.id;
    const builderSupportModules = this.props.builderSupportModules;
    const getAppConfigAction = builderSupportModules && builderSupportModules.jimuForBuilderLib.getAppConfigAction;
    if (getAppConfigAction) {
      config = config.setIn(['styleConfig', 'useCustom'], false);
      config = config.setIn(['styleConfig', 'themeStyle', 'quickStyleType'], t);
      config = config.setIn(['styleConfig', 'customStyle', 'regular'], {iconProps: getIconPropsFromTheme(true, t, this.props.theme)});
      config = config.setIn(['styleConfig', 'customStyle', 'hover'], {iconProps: getIconPropsFromTheme(false, t, this.props.theme)});

      getAppConfigAction().editWidgetProperty(id, 'config', config).exec();
    }
  }

  onClick = e => {
    (e as any).exbEventType = 'linkClick';
  }

  onQuickStyleClose = () => this.props.dispatch(appActions.widgetStatePropChange(this.props.id, 'showQuickStyle', false))

  getQuickStyleComponent = () => {
    const QuickStyle = this.props.builderSupportModules && this.props.builderSupportModules.widgetModules && this.props.builderSupportModules.widgetModules.QuickStyle;
    return !QuickStyle ? null : <QuickStyle onChange={this.onQuickStyleChange} reference={this.domNode && this.domNode.current} onClose={this.onQuickStyleClose}
      selectedType={!this.props.config?.styleConfig?.useCustom && this.props.config?.styleConfig?.themeStyle?.quickStyleType}
    />;
  }

  render() {
    const isDataSourceUsed = this.props.useDataSourcesEnabled;
    const showQuickStylePanel = this.showQuickStylePanel();

    const LinkComponent = this.getLinkComponent();
    const QuickStyleComponent = this.getQuickStyleComponent();

    return (
      <div className="jimu-widget widget-button w-100 h-100" css={getStyle(this.props.theme)} ref={this.domNode} onClick={this.onClick} onTouchEnd={this.onClick}>
        {LinkComponent}

        {
          showQuickStylePanel && QuickStyleComponent
        }

        <div style={{ display: 'none' }}>
          {
            isDataSourceUsed &&
            <div>
              <ExpressionResolverComponent useDataSources={this.props.useDataSources} expression={this.state.textExpression}
                onChange={this.onTextExpResolveChange} widgetId={this.props.id}
              />
              <ExpressionResolverComponent useDataSources={this.props.useDataSources} expression={this.state.tipExpression}
                onChange={this.onTipExpResolveChange} widgetId={this.props.id}
              />
              <ExpressionResolverComponent useDataSources={this.props.useDataSources} expression={this.state.urlExpression}
                onChange={this.onUrlExpResolveChange} widgetId={this.props.id}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}
