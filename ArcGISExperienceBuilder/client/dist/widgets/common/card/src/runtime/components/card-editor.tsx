/** @jsx jsx */
import { React, jsx, css, IMThemeVariables, AppMode, LayoutInfo, LayoutItemType, appActions,
  Immutable, ImmutableArray, ReactRedux, IMState, AnimationContext, AnimationTriggerType,
  TransitionContainer, TransitionDirection, TransitionType } from 'jimu-core';
import { styleUtils, Icon } from 'jimu-ui';
import { Status } from '../../config';
import { searchUtils } from 'jimu-layouts/layout-runtime';
import { MyDropDownItem } from './my-dropdown';
import Card, { CardProps, CardStates } from './card-base';

const toolIsolate = require('jimu-ui/lib/icons/unlink-16.svg');
const toolSync = require('jimu-ui/lib/icons/link-16.svg');

interface ExtraProps {
  selection?: LayoutInfo
}

const statesPopperOffset = [0, 5];
const statesModifiers = [{
  name: 'flip',
  options: {
    boundary: document.body,
    fallbackPlacements: ['right-start', 'bottom-start', 'top-start']

  },
}];
const applyPopperModifiers = [{
  name: 'offset',
  options: {
    offset: [0, 10]
  }
}, {
  name: 'arrow',
  enabled: true
}];


interface CardEditorProps extends CardProps {
  builderSupportModules?: any,
  isEditing?: boolean,
  LayoutEntry?: any,
  selectionIsCard?: boolean,
  selectionIsInCard?: boolean,
  builderStatus?: Status,
  interact?: any,
  dispatch?: any,
  isRTL?: boolean,
  hideCardTool?: boolean,
  selectSelf?: () => void
}

interface CardEditorStates extends CardStates {
  didMount: boolean;
  previousIndex: number,
  currentIndex: number,
  regularPlayId: symbol;
  hoverPlayId: symbol;
}

export class _CardEditor extends Card<CardEditorProps & ExtraProps, CardEditorStates>{
  interactable: Interact.Interactable;
  lastResizeCall = null;
  regularLayoutRef: React.RefObject<HTMLDivElement>;
  hoverLayoutRef: React.RefObject<HTMLDivElement>;
  layoutRef: React.RefObject<HTMLDivElement>;
  isUpdateFirst: boolean;

  constructor(props) {
    super(props);

    this.state = {
      didMount: false,
      previousIndex: 1,
      currentIndex: 0,
      regularPlayId: null,
      hoverPlayId: null
    }
    this.regularLayoutRef = React.createRef();
    this.hoverLayoutRef = React.createRef();
    this.layoutRef = React.createRef();
    this.isUpdateFirst = true;
  }

  componentDidMount() {
    this.setState({
      didMount: true
    })
  }

  componentDidUpdate(prveProps){
    const {cardConfigs, builderStatus, isEditing} = this.props;
    const prveCardConfigs = prveProps.cardConfigs;
    const isPreviewIdChange = prveCardConfigs?.transitionInfo?.previewId == cardConfigs?.transitionInfo?.previewId;
    const isStatusChange = prveProps.builderStatus && (prveProps.builderStatus != builderStatus) && !this.isUpdateFirst;
    const isHoverEnableChange = prveCardConfigs[Status.Hover].enable != cardConfigs[Status.Hover].enable;
    if(!isPreviewIdChange || isStatusChange || isHoverEnableChange){
      this.toggleStatus(builderStatus);
    }

    if(!isEditing && !this.isUpdateFirst){
      this.setState({
        previousIndex: 1,
        currentIndex: 0
      })
    }

    if(this.isUpdateFirst){
      this.isUpdateFirst = false;
    }
  }

  handleCopyTo = (evt, status: Status, selectedLayoutItem, linked: boolean) => {
    if (!selectedLayoutItem) return;
    const { layouts, builderSupportModules, browserSizeMode, builderStatus } = this.props;
    const action = builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    const appConfig = action.appConfig;
    const originLayoutId = searchUtils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode)
    const desLayoutId = searchUtils.findLayoutId(layouts[status], browserSizeMode, appConfig.mainSizeMode);
    if (linked) {
      const searchUtils = builderSupportModules.widgetModules.searchUtils;
      const layoutItem = searchUtils.getContainerLayoutItem(appConfig.layouts[desLayoutId], selectedLayoutItem.widgetId, LayoutItemType.Widget);
      !!layoutItem && action.removeLayoutItem({ layoutId: desLayoutId, layoutItemId: layoutItem.id }, false);
    }
    action.duplicateLayoutItem(originLayoutId, desLayoutId, selectedLayoutItem.id, false, linked);
    action.exec();
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  editStatus = (name, value) => {
    const { dispatch, widgetId } = this.props;
    dispatch(appActions.widgetStatePropChange(widgetId, name, value));
  }

  handleBuilderStatusChange(evt, status: Status) {
    // this.toggleStatus(status);
    this.editStatus('showCardSetting', status);
    this.editStatus('builderStatus', status);

    this?.props?.selectSelf();
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  toggleStatus = (status: Status) => {
    const { cardConfigs } = this.props;
    const isHoverEnable = cardConfigs?.HOVER?.enable;
    const isHover = status === Status.Hover
    let {previousIndex, currentIndex, hoverPlayId, regularPlayId} = this.state;
    if(isHoverEnable) {
      previousIndex = isHover ? 0 : 1;
      currentIndex = isHover ? 1 : 0;
      hoverPlayId = isHover ? Symbol() : null;
      regularPlayId = isHover ? null : Symbol();
    }
    this.setState({
      previousIndex: previousIndex,
      currentIndex: currentIndex,
      hoverPlayId: hoverPlayId,
      regularPlayId: regularPlayId,
    });
  }

  handleBreakLink = (evt) => {

    const { layouts, builderSupportModules, browserSizeMode, selection, builderStatus, dispatch } = this.props;
    const action = builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    const appConfig = action.appConfig;
    const selectedLayoutItem = searchUtils.findLayoutItem(appConfig, selection);
    if (!selectedLayoutItem) return;
    const currentLayoutId = searchUtils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode);
    action.duplicateLayoutItem(currentLayoutId, currentLayoutId, selectedLayoutItem.id, true);
    action.removeLayoutItem({ layoutId: currentLayoutId, layoutItemId: selectedLayoutItem.id }, false)
    action.exec();

    if (selection.layoutId === currentLayoutId && selection.layoutItemId === selectedLayoutItem.id) {
      dispatch(appActions.selectionChanged(null));
    }
    const content = action.appConfig.layouts[currentLayoutId].content;
    const newItemKey = Object.keys(content)[Object.keys(content).length - 1]
    if (newItemKey) {
      const newItem = content[newItemKey];
      dispatch(appActions.selectionChanged({
        layoutId: currentLayoutId,
        layoutItemId: newItem.id
      }))
    }

    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  private getCopyDropdownItems = (showBreak: boolean): { items: ImmutableArray<MyDropDownItem>, title: string } => {
    const { cardConfigs, layouts, browserSizeMode, selection, builderStatus, builderSupportModules } = this.props;
    const action = builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    const appConfig = action.appConfig;
    const selectedLayoutItem = searchUtils.findLayoutItem(appConfig, selection);
    if (!selection || !selectedLayoutItem || !window.jimuConfig.isInBuilder) return {
      items: Immutable([]),
      title: ''
    }
    const items = [] as any;
    let title = '';
    let linkedToRegular = true;
    let linkedToHover = true;
    const isWidgetInLayout = (layoutId: string, widgetId: string): boolean => {
      const searchUtils = builderSupportModules.widgetModules.searchUtils;
      const widgets = searchUtils.getContentsInLayoutWithLayoutWidgetOnly(appConfig, layoutId, LayoutItemType.Widget, browserSizeMode);
      return widgets.indexOf(widgetId) > -1;
    }

    const syncToHover = () => {
      if (cardConfigs[Status.Hover]) {
        const layoutId = searchUtils.findLayoutId(layouts[Status.Hover], browserSizeMode, appConfig.mainSizeMode);
        if (!isWidgetInLayout(layoutId, appConfig.layouts[selection.layoutId].content[selection.layoutItemId].widgetId)) {
          linkedToHover = false;
        }
        items.push({
          label: this.formatMessage('applyTo', { status: this.formatMessage('hover').toLocaleLowerCase() }),
          event: (evt) => { this.handleCopyTo(evt, Status.Hover, selectedLayoutItem, linkedToHover) },
        })
      }
    }

    const syncToRegular = () => {
      const layoutId = searchUtils.findLayoutId(layouts[Status.Regular], browserSizeMode, appConfig.mainSizeMode);
      if (!isWidgetInLayout(layoutId, appConfig.layouts[selection.layoutId].content[selection.layoutItemId].widgetId)) {
        linkedToRegular = false;
      }
      items.push({
        label: this.formatMessage('applyTo', { status: this.formatMessage('regular').toLocaleLowerCase() }),
        event: (evt) => { this.handleCopyTo(evt, Status.Regular, selectedLayoutItem, linkedToRegular) },
      })
    }

    if (builderStatus === Status.Regular) {
      syncToHover();
      title = this.formatMessage('linkedTo', { where: this.formatMessage('hover').toLocaleLowerCase() })
    } else if (builderStatus === Status.Hover) {
      syncToRegular();
      title = this.formatMessage('linkedTo', { where: this.formatMessage('regular').toLocaleLowerCase() })
    }
    if (showBreak) {
      items.push({
        label: this.formatMessage('isolate'),
        event: this.handleBreakLink
      })
    } else {
      title = this.formatMessage('isolate');
    }

    return {
      items: Immutable(items),
      title: title
    }
  }

  getCardToolsStyle = (theme: IMThemeVariables) => {
    return css`
        width: 100%;
        .btn {
          width: 100%;
        }
        .dropdown-toggle {
          justify-content: center;
        }
        `
  }

  renderCardTools = () => {
    const isInBuilder = window.jimuConfig.isInBuilder;
    if (!isInBuilder) return;
    const { selection, widgetId, builderSupportModules, browserSizeMode, builderStatus, selectionIsCard, selectionIsInCard, appMode, hideCardTool, cardConfigs } = this.props;

    const action = builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    const appConfig = action.appConfig;

    const { searchUtils, BuilderDropDown, BuilderPopper, GLOBAL_RESIZING_CLASS_NAME, GLOBAL_H5_DRAGGING_CLASS_NAME,
      GLOBAL_DRAGGING_CLASS_NAME, BuilderButton, withBuilderTheme } = builderSupportModules.widgetModules;

    const isSelf = selectionIsCard;
    let showTools = true;

    const showBreak = !isSelf && selection && searchUtils && searchUtils.getRelatedLayoutItemsInWidgetByLayoutInfo(appConfig as any, selection, widgetId, browserSizeMode).length > 1;
    const { items: syncItems, title: syncTitle } = this.getCopyDropdownItems(showBreak);
    const showSync = syncItems && syncItems.length > 0;
    if ((!selectionIsInCard && !isSelf) || appMode === AppMode.Run || hideCardTool) {
      showTools = false;
    }
    const CardMenu = withBuilderTheme((theme) => {
      return (
        <div className="status-group d-flex flex-column align-items-center p-2" css={this.getCardToolsStyle(theme)} >
          <BuilderButton active={builderStatus === Status.Regular}
            onClick={evt => this.handleBuilderStatusChange(evt, Status.Regular)}>{this.formatMessage('regular')}</BuilderButton>
          <BuilderButton active={builderStatus === Status.Hover} className="mt-1"
            onClick={evt => this.handleBuilderStatusChange(evt, Status.Hover)}>{this.formatMessage('hover')}</BuilderButton>
          {!isSelf && (showSync || showBreak) &&
            <BuilderDropDown
              className="mt-1 w-100"
              toggleIsIcon={true}
              toggleTitle={syncTitle}
              toggleType="default"
              direction="left"
              toggleContent={(theme) => <Icon icon={showBreak ? toolSync : toolIsolate} size={16} />}
              modifiers={applyPopperModifiers} items={syncItems} />
          }

        </div>)
    });

    return (
      (this.props.isEditing && cardConfigs[Status.Hover].enable) &&
      <BuilderPopper placement="left-start"
        css={
          css`
          .${GLOBAL_DRAGGING_CLASS_NAME} &,
          .${GLOBAL_RESIZING_CLASS_NAME} &,
          .${GLOBAL_H5_DRAGGING_CLASS_NAME} & {
            &.popper{
              display: none;
            }
          }
        `
        }
        reference={this.layoutRef.current}
        offset={statesPopperOffset}
        modifiers={statesModifiers}
        open={showTools}>
        {CardMenu()}
      </BuilderPopper>
    )
  }

  getEditorStyle = () => {
    return css`
      &.card-content {
        .fixed-layout {
          border: 0 !important;
        }
      }
    `;
  }

  renderCardEditor = () => {
    const { cardConfigs, LayoutEntry, layouts } = this.props;
    const { hoverPlayId, regularPlayId } = this.state;
    const regularLayout = layouts[Status.Regular];
    const hoverLayout = layouts[Status.Hover];

    const regularBgStyle = cardConfigs[Status.Regular].backgroundStyle.setIn(['boxShadow', 'color'], 'transparent');
    const hoverBgStyle = cardConfigs[Status.Hover].backgroundStyle.setIn(['boxShadow', 'color'], 'transparent');

    const transitionInfo = cardConfigs.transitionInfo;
    const editorContent = [];

    const regularMergedStyle: any = {
      ...styleUtils.toCSSStyle(regularBgStyle || {} as any),
    };

    const regularEditor = (
      <div className="card-content d-flex surface-1"
        css={this.getEditorStyle()}
        ref={this.regularLayoutRef}
        key={Status.Regular}
      >
        <div className="w-100, h-100 animation-list" style={regularMergedStyle}>
          <AnimationContext.Provider value={{
            trigger: AnimationTriggerType.Manual,
            setting: transitionInfo?.oneByOneEffect || null,
            inheritedOneByOneSetting: null,
            playId : regularPlayId,
            depth: 100
          }}>
            <LayoutEntry className="h-100" isRepeat={true} layouts={regularLayout} isInWidget={true} />
          </AnimationContext.Provider>
        </div>
      </div>
    )
    editorContent.push(regularEditor);
    if(!cardConfigs[Status.Hover].enable){
      return editorContent;
    }

    const hoverMergedStyle: any = {
      ...styleUtils.toCSSStyle(hoverBgStyle || {} as any),
    };
    const hoverEditor = (
      <div className="card-content d-flex surface-1"
        css={this.getEditorStyle()}
        ref={this.hoverLayoutRef}
        key={Status.Hover}
      >
        <div className="w-100, h-100 animation-list" style={hoverMergedStyle}>
          <AnimationContext.Provider value={{
            trigger: AnimationTriggerType.Manual,
            setting: transitionInfo?.oneByOneEffect || null,
            inheritedOneByOneSetting: null,
            playId : hoverPlayId,
            depth: 100
          }}>
            <LayoutEntry className="h-100"  isRepeat={true} layouts={hoverLayout} isInWidget={true} />
          </AnimationContext.Provider>
        </div>
      </div>
    );
    editorContent.push(hoverEditor);
    return editorContent;
  }

  getCardStyle = () => {
    const {builderStatus, cardConfigs} = this.props;
    const status = cardConfigs[Status.Hover].enable ? builderStatus : Status.Regular;
    const style = {
      boxShadow: cardConfigs[status]?.backgroundStyle?.boxShadow,
      borderRadius: cardConfigs[status]?.backgroundStyle?.borderRadius
    };

    const cardShaowStyle: any = {
      ...styleUtils.toCSSStyle(style as any),
    };
    return cardShaowStyle;
  }

  render() {
    const { cardConfigs, widgetId, isEditing } = this.props;
    const { didMount, previousIndex, currentIndex } = this.state;
    const transitionInfo = cardConfigs.transitionInfo;

    const cardEditClass = `card-${widgetId}`;
    const previewId = transitionInfo?.previewId || null;

    return (
      <div
        css={this.getStyle()}
        style={this.getCardStyle()}
        className={cardEditClass}
        // onClick={this.handleItemClick}
      >
        {didMount && this.renderCardTools()}
        <div className="w-100, h-100" ref={this.layoutRef}>
          <TransitionContainer
            previousIndex={previousIndex}
            currentIndex={currentIndex}
            transitionType={transitionInfo?.transition?.type as TransitionType}
            direction={transitionInfo?.transition?.direction as TransitionDirection}
            playId={didMount ? previewId : null}
            withOneByOne={!!transitionInfo?.oneByOneEffect}
          >
            {this.renderCardEditor()}
          </TransitionContainer>
        </div>
        {!isEditing && <div className="edit-mask position-absolute"></div>}
      </div>
    )
  }
}

export default ReactRedux.connect<ExtraProps, unknown, CardEditorProps>(
  (state: IMState, props: CardEditorProps) => {
    const { appMode } = props;
    if (!window.jimuConfig.isInBuilder || appMode === AppMode.Run) {
      return {
        selection: undefined
      }
    }
    const selection =  props.selectionIsInCard && state?.appRuntimeInfo?.selection;
    return {
      selection
    }
  }
)(_CardEditor);