/** @jsx jsx */
import { React, IMState, classNames, css, jsx,  AllWidgetProps, AppMode, appActions, Immutable, ImmutableObject, polished } from 'jimu-core';
import { IMConfig, Direction, PointStyle, Config } from '../config';
import { getStrokeStyle, getPointStyle, getDividerLineStyle } from '../common/template-style';
interface Props{
  appMode: AppMode,
  active: boolean;
  showQuickStyle: boolean;
}

interface States {}

export class Widget extends React.PureComponent<AllWidgetProps<IMConfig> & Props, States>{
  domNode: HTMLDivElement;

  static mapExtraStateProps = (state: IMState, props: AllWidgetProps<IMConfig>): Props => {
    let selected    = false;
    const selection = state.appRuntimeInfo.selection;
    if (selection && state.appConfig.layouts[selection.layoutId]) {
      const layoutItem = state.appConfig.layouts[selection.layoutId].content[selection.layoutItemId];
      selected         = layoutItem && layoutItem.widgetId === props.id
    }
    const isInBuilder = state.appContext.isInBuilder;
    const active      = isInBuilder && selected;

    const widgetState    = state.widgetsState[props.id] || Immutable({});
    const showQuickStyle = !!widgetState.showQuickStyle;
    return {
      appMode: selection ? state?.appRuntimeInfo?.appMode : null,
      active,
      showQuickStyle,
    };
  };

  componentDidMount(){
    if(this.props.active){
      this.toggleQuickStyle(true);
    }
  }

  componentDidUpdate(prevProps: AllWidgetProps<IMConfig> & Props, prevState: States){
    if(
      (this.props.appMode !== prevProps.appMode && this.props.appMode === AppMode.Run) ||
      (this.props.active !== prevProps.active)
    ){
      this.toggleQuickStyle();
    }
  }

  editWidgetConfig = (newConfig) => {
    if(!window.jimuConfig.isInBuilder)return;

    const appConfigAction = this.props.builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    appConfigAction.editWidgetConfig(this.props.id, newConfig).exec();
  }

  getStyle = () => {
    return css`
      & {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: ${polished.rem(6)};
      }
      .divider-con {
        height: 100%;
        width: 100%;
      }
    `
  }

  getDividerLinePositionStyle = (config: Config) => {
    const { direction, pointEnd, pointStart, strokeStyle } = config
    const isHorizontal       = direction == Direction.Horizontal;
    const pointStartStyle    = pointStart.pointStyle;
    const pointStartSize     = pointStart.pointSize * this.getSize(strokeStyle?.size);
    const pointEndStyle      = pointEnd.pointStyle;
    const pointEndSize       = pointEnd.pointSize * this.getSize(strokeStyle?.size);
    const isPointStartEnable = pointStartStyle != PointStyle.None;
    const isPointEndEnable   = pointEndStyle != PointStyle.None;
    return getDividerLineStyle(isHorizontal,isPointStartEnable, isPointEndEnable, pointStartSize, pointEndSize )
  }

  getSize = (size: string): number => {
    const sizeNumber = size.split('px')[0];
    return Number(sizeNumber);
  }

  getDividerLineStyle = (config) => {
    const { direction } = config;
    const { size, color, type } = config.strokeStyle;
    return getStrokeStyle(size,color, direction)[type]
  }

  getPointStyle = (config, isPointStart = true) => {
    const { pointEnd, pointStart, strokeStyle, direction } = config;
    const strokeSize = Number(this.getSize(strokeStyle.size));
    const size  = `${isPointStart ? pointStart.pointSize*strokeSize : pointEnd.pointSize*strokeSize}px`;
    const color = strokeStyle?.color;
    const style = isPointStart ? pointStart.pointStyle : pointEnd.pointStyle;
    const pointStyle = getPointStyle(size, color, direction, isPointStart);
    return pointStyle[style];
  }

  onQuickStyleChange = (newConfig: ImmutableObject<Config>) => {
    const id = this.props.id;
    const builderSupportModules = this.props.builderSupportModules;
    const getAppConfigAction    = builderSupportModules?.jimuForBuilderLib?.getAppConfigAction;
    if (getAppConfigAction) {
      getAppConfigAction().editWidgetProperty(id, 'config', newConfig).exec();
      // this.props.dispatch(appActions.widgetStatePropChange(this.props.id, 'showQuickStyle', false));
    }
  }

  toggleQuickStyle = (isOpen = false) => {
    this.props.dispatch(appActions.widgetStatePropChange(this.props.id, 'showQuickStyle', isOpen));
  }

  getQuickStyleComponent = () => {
    const {config, showQuickStyle, active, theme} = this.props;
    const { direction, themeStyle } = config;
    const QuickStyle = this?.props?.builderSupportModules?.widgetModules?.QuickStyle;
    return !QuickStyle ? null :
      <QuickStyle
        direction={direction}
        isOpen={showQuickStyle && active}
        theme={theme}
        selectedType={themeStyle?.quickStyleType}
        onChange={this.onQuickStyleChange}
        reference={this?.domNode}
        getDividerLineStyle={this.getDividerLineStyle}
        getDividerLinePositionStyle={this.getDividerLinePositionStyle}
        closeQuickStyle={this.toggleQuickStyle}
        getPointStyle={this.getPointStyle}/>;
  }

  render() {
    const {config, id} = this.props;
    const { direction, pointEnd, pointStart } = config;
    const classes = classNames(
      'jimu-widget',
      'widget-divider',
      'position-relative',
      'divider-widget-' + id
    );

    const dividerLineClassName     = direction == Direction.Horizontal ? 'horizontal' : 'vertical';
    const dividerLineStyle         = this.getDividerLineStyle(config);
    const dividerLinePositionStyle = this.getDividerLinePositionStyle(config);

    const pointStartStyle    = this.getPointStyle(config, true);
    const pointEndStyle      = this.getPointStyle(config, false);
    const dividerLineClasses = classNames(
      'divider-line',
      'position-absolute',
      dividerLineClassName,
      `point-start-${pointStart.pointStyle}`,
      `point-end-${pointEnd.pointStyle}`,
    )
    return (<div className={classes} css={this.getStyle()} ref={node => this.domNode = node}>
      <div className="position-relative divider-con">
        <div className="point-con">
          {pointStart.pointStyle != PointStyle.None && <span className="point-start position-absolute" css={pointStartStyle}></span>}
          {pointEnd.pointStyle != PointStyle.None && <span className="point-end position-absolute" css={pointEndStyle}></span>}
        </div>
        <div className={dividerLineClasses} css={[dividerLineStyle, dividerLinePositionStyle]} ></div>
        {window.jimuConfig.isInBuilder && this.getQuickStyleComponent()}
      </div>
    </div>)
  }
}

export default Widget;