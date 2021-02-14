/** @jsx jsx */
import {
  React, RepeatedDataSourceProvider, jsx, css, IMThemeVariables,
  AppMode, LayoutInfo, utils,
  LayoutItemType, appActions, Immutable, ImmutableArray,
  LayoutItemConstructorProps, ReactRedux, IMState, classNames
} from 'jimu-core';
import { ListGroupItem, styleUtils, Icon } from 'jimu-ui';
import { DirectionType, CardSize, Status, SelectionModeType, LIST_CARD_MIN_SIZE } from '../../config';
import { searchUtils } from 'jimu-layouts/layout-runtime';
import { MyDropDownItem } from './my-dropdown';
import ListCard, { ListCardProps, ListCardStates } from './list-card-base';

const cornerSize = 12;
const cornerPosition = -10;
const sideSize = 16;
const sidePosition = -10;
const zindexHandle = 20;

const toolIsolate = require('jimu-ui/lib/icons/unlink-16.svg');
const toolSync = require('jimu-ui/lib/icons/link-16.svg');

interface ExtraProps {
  selection: LayoutInfo,
  showBreak: boolean
}

const statesPopperOffset = [0, 5];
const statesModifiers = [{
  name: 'flip',
  options: {
    boundary: document.body,
    fallbackPlacements: ['right-start', 'bottom-start', 'top-end']

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


interface ListCardEditorProps extends ListCardProps {
  builderSupportModules?: any,
  isEditing?: boolean,
  LayoutEntry?: any,
  selectionIsList?: boolean,
  selectionIsInList?: boolean,
  builderStatus?: Status,
  interact?: any,
  dispatch?: any,
  isRTL?: boolean,
  lockItemRatio?: boolean,
  hideCardTool?: boolean,
  cardConfigs?: any,
  changeIsResizingCard: (isResizing: boolean) => void,
  handleResizeCard?: (newCardSize: CardSize, resizeEnd?: boolean, isLeft?: boolean, isTop?: boolean, isEnd?: boolean) => void;
  selectCard?: () => void
}

interface ListCardEditorStates extends ListCardStates {
  didMount: boolean;
}

class _ListCardEditor extends ListCard<ListCardEditorProps & ExtraProps, ListCardEditorStates>{
  interactable: Interact.Interactable;
  resizeRef: React.RefObject<HTMLDivElement>;
  lastResizeCall = null;

  constructor(props) {
    super(props);

    this.state = {
      didMount: false
    }
    this.resizeRef = React.createRef();

    this.providerData = this.getNewProviderData();
  }

  shouldComponentUpdate(nextProps, nextStats){
    let shouldUpdate = this.shouldComponentUpdateExcept(nextProps, nextStats, ['listStyle', 'selection'])
    shouldUpdate = shouldUpdate || !utils.isDeepEqual(this.props['listStyle'], nextProps['listStyle'])
    if(!shouldUpdate){
      const {selectionIsInList, selectionIsList} = this.props
      if(selectionIsList || selectionIsInList){
        shouldUpdate = !utils.isDeepEqual(this.props['selection'], nextProps['selection'])
      }
    }
    return shouldUpdate
  }

  componentDidUpdate(preProps) {
    const { selectionIsInList, isEditing, direction, isRTL, lockItemRatio, index } = this.props;
    if (window.jimuConfig.isInBuilder && index === 0) {
      if (this.interactable) {
        if (isEditing && !selectionIsInList && !lockItemRatio) {
          this.interactable.resizable({
            edges: {
              top: false,
              left: direction === DirectionType.Horizon && isRTL,
              bottom: direction === DirectionType.Vertical,
              right: direction === DirectionType.Horizon && !isRTL
            }
          })
          this.interactable.resizable(true);
        } else {
          this.interactable.resizable(false);
        }
      }

    }
  }

  componentDidMount() {
    const { index } = this.props;
    if (index === 0 && window.jimuConfig.isInBuilder && this.resizeRef.current) {
      const { interact, handleResizeCard, direction, isRTL } = this.props;
      this.interactable = interact(this.resizeRef.current)
        .resizable({
          // resize from all edges and corners
          edges: {
            top: false,
            left: direction === DirectionType.Horizon && isRTL,
            bottom: direction === DirectionType.Vertical,
            right: direction === DirectionType.Horizon && !isRTL
          },
          modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
              outer: 'parent',
              endOnly: true,
            }),

            // minimum size
            interact.modifiers.restrictSize({
              min: { width: LIST_CARD_MIN_SIZE, height: LIST_CARD_MIN_SIZE },
            }),
          ],
          inertia: false,
          onstart: (event: Interact.InteractEvent) => {
            const {changeIsResizingCard} = this.props;
            if(changeIsResizingCard){
              changeIsResizingCard(true);
            }
            event.stopPropagation();
          },
          onmove: (event: Interact.ResizeEvent) => {
            event.stopPropagation();

            if (this.lastResizeCall) {
              cancelAnimationFrame(this.lastResizeCall);
            }
            const rect = event.rect;
            const newCardSize = {
              width: rect.right - rect.left,
              height: rect.bottom - rect.top
            };

            this.lastResizeCall = requestAnimationFrame(() => {
              const edges = {} as any; //event.interaction.edges;
              handleResizeCard(newCardSize, false, edges.top, edges.left);
            });
          },
          onend: (event: Interact.ResizeEvent) => {
            event.stopPropagation();
            if (this.lastResizeCall) {
              cancelAnimationFrame(this.lastResizeCall);
            }
            this.lastResizeCall = requestAnimationFrame(() => {
              const rect = event.rect;
              const newCardSize = {
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
              };
              handleResizeCard(newCardSize, true);
              const {changeIsResizingCard} = this.props;
              if(changeIsResizingCard){
                changeIsResizingCard(false);
              }
            });
          }
        })
    }
    this.setState({
      didMount: true
    })
  }

  componentWillUnMount() {
    if (this.lastResizeCall) {
      cancelAnimationFrame(this.lastResizeCall);
    }
    if (this.interactable) {
      this.interactable.unset();
      this.interactable = null;
    }
  }

  handleItemClick = (evt) => {
    const { selectCard } = this.props;
    if (evt) {
      evt.stopPropagation();
    }
    selectCard();
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

  handleBuilderStatusChange(evt, status) {

    this.editStatus('showCardSetting', status);
    this.editStatus('builderStatus', status);

    const { selectCard } = this.props;
    selectCard()

    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
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
    let linkedToSelect = cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None ? true : false;
    let linkedToHover = !!cardConfigs[Status.Hover].enable;
    const isWidgetInLayout = (layoutId: string, widgetId: string): boolean => {
      const searchUtils = builderSupportModules.widgetModules.searchUtils;
      const widgets = searchUtils.getContentsInLayoutWithLayoutWidgetOnly(appConfig, layoutId, LayoutItemType.Widget, browserSizeMode);
      return widgets.indexOf(widgetId) > -1;
    }

    const syncToHover = () => {
      if (cardConfigs[Status.Hover].enable) {
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

    const syncToSelected = () => {
      if (cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None) {
        const layoutId = searchUtils.findLayoutId(layouts[Status.Selected], browserSizeMode, appConfig.mainSizeMode);
        if (!isWidgetInLayout(layoutId, appConfig.layouts[selection.layoutId].content[selection.layoutItemId].widgetId)) {
          linkedToSelect = false;
        }
        items.push({
          label: this.formatMessage('applyTo', { status: this.formatMessage('selected').toLocaleLowerCase() }),
          event: (evt) => { this.handleCopyTo(evt, Status.Selected, selectedLayoutItem, linkedToSelect) },
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
      syncToSelected();
      if (linkedToHover && linkedToSelect) {
        title = this.formatMessage('linkedToAnd', { where1: this.formatMessage('selected').toLocaleLowerCase(), where2: this.formatMessage('hover').toLocaleLowerCase() })
      } else if (linkedToHover) {
        title = this.formatMessage('linkedTo', { where: this.formatMessage('hover').toLocaleLowerCase() })
      } else if (linkedToSelect) {
        title = this.formatMessage('linkedTo', { where: this.formatMessage('selected').toLocaleLowerCase() })
      }
    } else if (builderStatus === Status.Hover) {
      syncToRegular();
      syncToSelected();
      if (linkedToRegular && linkedToSelect) {
        title = this.formatMessage('linkedToAnd', { where1: this.formatMessage('regular').toLocaleLowerCase(), where2: this.formatMessage('selected').toLocaleLowerCase() })
      } else if (linkedToRegular) {
        title = this.formatMessage('linkedTo', { where: this.formatMessage('regular').toLocaleLowerCase() })
      } else if (linkedToSelect) {
        title = this.formatMessage('linkedTo', { where: this.formatMessage('selected').toLocaleLowerCase() })
      }
    } else {
      syncToRegular();
      syncToHover();
      if (linkedToRegular && linkedToHover) {
        title = this.formatMessage('linkedToAnd', { where1: this.formatMessage('regular').toLocaleLowerCase(), where2: this.formatMessage('hover').toLocaleLowerCase() })
      } else if (linkedToRegular) {
        title = this.formatMessage('linkedTo', { where: this.formatMessage('regular').toLocaleLowerCase() })
      } else if (linkedToHover) {
        title = this.formatMessage('linkedTo', { where: this.formatMessage('hover').toLocaleLowerCase() })
      }
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

  _renderAction = () => {
    const handlers = [];
    const { theme, direction } = this.props;
    const sideHandle = css`
      box-shadow: none;

      &:after {
        position: absolute;
        content: "";
        width: ${cornerSize}px;
        height: ${cornerSize}px;
        background-color: ${theme.colors.palette.primary[500]};
        border: 2px solid ${theme.colors.white};
        border-radius: 50%;
        z-index: ${zindexHandle};
      }
    `;

    const bottomSideLine = css`
      box-shadow: none;
      height: ${sideSize}px;
      left: 0px;
      right: 0px;
      bottom: ${-1 * (sideSize / 2)}px;
      &:after {
        position: absolute;
        content: "";
        bottom: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${theme.colors.palette.primary[300]};
        z-index: ${zindexHandle};
      }
    `;

    const rightSideLine = css`
      box-shadow: none;
      width: ${sideSize}px;
      top: 0px;
      bottom: 0px;
      right: ${-1 * (sideSize / 2)}px;
      &:after {
        position: absolute;
        content: "";
        right: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: ${theme.colors.palette.primary[300]};
        z-index: ${zindexHandle};
      }
    `;

    const handle = css`
      position: absolute;
    `;

    const rightSideCursor = css`
      width: ${sideSize}px;
      top: ${-1 * sidePosition}px;
      bottom: ${-1 * sidePosition}px;
      right: ${-1 * (sideSize / 2)}px;

      &:after {
        top: 50%;
        right: 50%;
        margin-top: ${cornerPosition / 2}px;
        margin-right: ${cornerPosition / 2}px;
      }
    `;
    const bottomSideCursor = css`
      height: ${sideSize}px;
      left: ${-1 * sidePosition}px;
      right: ${-1 * sidePosition}px;
      bottom: ${-1 * (sideSize / 2)}px;

      &:after {
        left: 50%;
        bottom: 50%;
        margin-left: ${cornerPosition / 2}px;
        margin-bottom: ${cornerPosition / 2}px;
      }
    `;

    if (direction === DirectionType.Horizon) {
      handlers.push(
        <span key="10" className="list-card-rnd-resize-left-line" css={[handle, rightSideLine]}></span>
      );
      handlers.push(
        <span key="4" className="list-card-rnd-resize-right" css={[handle, sideHandle, rightSideCursor]}></span>
      );

      // handlers.push(
      //   <span key="8" className="list-card-rnd-resize-left" css={[handle, sideHandle, leftSideCursor]}></span>
      // );
    } else {
      // handlers.push(
      //   <span key="2" className="list-card-rnd-resize-top" css={[handle, sideHandle, topSideCursor]}></span>
      // );
      handlers.push(
        <span key="9" className="list-card-rnd-resize-bottom-line" css={[handle, bottomSideLine]}></span>
      );
      handlers.push(
        <span key="6" className="list-card-rnd-resize-bottom" css={[handle, sideHandle, bottomSideCursor]}></span>
      );

    }

    return handlers;
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
    const { index } = this.props;
    const isInBuilder = window.jimuConfig.isInBuilder;
    if (!isInBuilder || index > 0) return;
    const { cardConfigs, selection, widgetId, appMode, builderSupportModules, datasourceId,
      browserSizeMode, builderStatus, selectionIsInList, selectionIsList, hideCardTool } = this.props;

    const action = builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    const appConfig = action.appConfig;

    let showTools = true;
    const { searchUtils, BuilderDropDown, BuilderPopper, GLOBAL_RESIZING_CLASS_NAME, GLOBAL_H5_DRAGGING_CLASS_NAME,
      GLOBAL_DRAGGING_CLASS_NAME, BuilderButton, withBuilderTheme } = builderSupportModules.widgetModules;

    const isInList = selectionIsInList;
    const isSelf = selectionIsList;
    if ((!isInList && !isSelf) ||
        appMode === AppMode.Run ||
        hideCardTool || !datasourceId) {
      showTools = false;
    }

    const showBreak = !isSelf && selection && searchUtils && searchUtils.getRelatedLayoutItemsInWidgetByLayoutInfo(appConfig as any, selection, widgetId, browserSizeMode).length > 1;
    const { items: syncItems, title: syncTitle } = this.getCopyDropdownItems(showBreak);
    const showSync = syncItems && syncItems.length > 0;

    const CardMenu = withBuilderTheme((theme) => {
      return (
        <div className="status-group d-flex flex-column align-items-center p-2" css={this.getCardToolsStyle(theme)} >
          <BuilderButton active={builderStatus === Status.Regular}
            onClick={evt => this.handleBuilderStatusChange(evt, Status.Regular)}>{this.formatMessage('regular')}</BuilderButton>
          {cardConfigs[Status.Hover].enable &&
            <BuilderButton active={builderStatus === Status.Hover} className="mt-1"
              onClick={evt => this.handleBuilderStatusChange(evt, Status.Hover)}>{this.formatMessage('hover')}</BuilderButton>}
          {cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None &&
            <BuilderButton active={builderStatus === Status.Selected} className="mt-1"
              onClick={evt => this.handleBuilderStatusChange(evt, Status.Selected)}>{this.formatMessage('selected')}</BuilderButton>}
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
      showTools && this.props.isEditing
      && (cardConfigs[Status.Hover].enable || cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None)
      &&
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
        reference={this.resizeRef.current}
        offset={statesPopperOffset}
        modifiers={statesModifiers}
        open={showTools}>
        {CardMenu()}
      </BuilderPopper>
    )
  }

  isItemAccept = (item: LayoutItemConstructorProps, isPlaceholder: boolean): boolean => {
    if (!item) return false;
    const { isEditing } = this.props;
    const supportRepeat = item.manifest?.properties?.supportRepeat;
    // if(!supportRepeat && item.itemType === LayoutItemType.Widget && !item.id){//support placeholder
    //   supportRepeat = true;
    // }
    const { builderSupportModules, widgetId, } = this.props;
    const action = builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    const appConfig = action.appConfig;
    const selectionInList = builderSupportModules.widgetModules.selectionInList;
    return isEditing && supportRepeat && (!item.layoutInfo || (item.layoutInfo && selectionInList(item.layoutInfo, widgetId, appConfig, false)));
  }

  getEditorStyle = () => {
    return css`
      &.list-card-content {
        .fixed-layout {
          border: 0 !important;
        }
      }
    `;
  }

  render() {
    const { selectable, active, cardConfigs, LayoutEntry,
      selectionIsInList, isEditing, widgetId, listStyle, lockItemRatio,
      builderStatus, layouts } = this.props;
    const { didMount } = this.state;
    const layout = layouts[builderStatus]
    const bgStyle = cardConfigs[builderStatus].backgroundStyle;

    const mergedStyle: any = {
      ...styleUtils.toCSSStyle(bgStyle || {} as any),
    };
    const cardContentStyle: any = {
      ...styleUtils.toCSSStyle({
        borderRadius: bgStyle?.borderRadius || 0,
      } || {} as any),
    };

    const newProviderData = this.getNewProviderData();
    if (!this.isProviderEqual(newProviderData, this.providerData)) {
      this.providerData = newProviderData;
    }

    return (
      <RepeatedDataSourceProvider
        data={this.providerData}
      >

        <ListGroupItem
          active={selectable && active}
          css={this.getStyle()}
          style={{...cardContentStyle, ...listStyle}}
          className={classNames('surface-1',`list-card-${widgetId}`)}
          onClick={this.handleItemClick}
        >
          {didMount && this.renderCardTools()}
          <div className="list-card-content d-flex"
            style={mergedStyle}
            css={this.getEditorStyle()}
            ref={this.resizeRef}
          >
            <LayoutEntry
              isItemAccepted={this.isItemAccept}
              isRepeat={true} layouts={layout} isInWidget={true} >
            </LayoutEntry>
            {isEditing && !selectionIsInList && !lockItemRatio && this._renderAction()}
          </div>
        </ListGroupItem>
      </RepeatedDataSourceProvider>
    )
  }
}

export default ReactRedux.connect<ExtraProps, unknown, ListCardEditorProps>(
  (state: IMState, props: ListCardEditorProps) => {
    const { selectionIsList, builderSupportModules, appMode, widgetId, browserSizeMode } = props;
    if (!window.jimuConfig.isInBuilder || appMode === AppMode.Run) {
      return {
        selection: undefined,
        showBreak: false
      }
    }
    const searchUtils = builderSupportModules?.widgetModules?.searchUtils;
    const action = builderSupportModules.jimuForBuilderLib.getAppConfigAction();
    const appConfig = action.appConfig;
    const selection = props.index === 0 && props.selectionIsInList
      && state && state.appRuntimeInfo && state.appRuntimeInfo.selection;
    const showBreak = !selectionIsList && selection && searchUtils
      && searchUtils.getRelatedLayoutItemsInWidgetByLayoutInfo(appConfig as any, selection, widgetId, browserSizeMode).length > 1;
    return {
      selection,
      showBreak
    }
  }
)(_ListCardEditor);