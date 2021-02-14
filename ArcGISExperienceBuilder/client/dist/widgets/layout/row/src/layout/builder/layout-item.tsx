/** @jsx jsx */
import {
  React,
  jsx,
  css,
  classNames,
  LayoutItemType,
  LayoutItemJson,
  IMLayoutItemJson,
  lodash,
  getAppStore,
  WidgetType,
  IMThemeVariables,
  LayoutItemConstructorProps,
  IMSizeModeLayoutJson,
  BrowserSizeMode,
  Immutable,
  BoundingBox,
} from 'jimu-core';
import {
  LayoutItemProps,
  LayoutZIndex,
  utils,
  LayoutItemSizeModes,
} from 'jimu-layouts/layout-runtime';
import { getAppConfigAction } from 'jimu-for-builder';
import {
  LayoutItemInBuilder,
  DropArea,
  mergeWidgetsIntoColumn,
} from 'jimu-layouts/layout-builder';
import { RowLayoutItemSetting } from '../../config';
import { DEFAULT_ROW_ITEM_SETTING } from '../../default-config';

interface OwnProps {
  layoutItem: IMLayoutItemJson;
  isMultiRow: boolean;
  offset: number;
  span: number;
  order: number;
  gutter: number;
  alignItems?: string;
  builderTheme: IMThemeVariables;
  children?: any;
  onResizeStart: (id: string) => void;
  onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
  onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) => void;
}

const dropareaStyle = css`
  position: absolute;
  left: 0;
  max-height: 40px;
  height: 20%;
  right: 0;
  z-index: ${LayoutZIndex.BoundaryDropArea};
  display: flex;
  pointer-events: all;
  display: flex;

  &.drop-active {
    background: transparent !important;
  }

  body:not(.design-mode) & {
    display: none !important;
  }
`;

const topDropareaStyle = css`
  ${dropareaStyle};
  top: 0;
`;

const bottomDropareaStyle = css`
  ${dropareaStyle};
  bottom: 0;
`;

interface State {
  isResizing: boolean;
  dh: number;
}

export default class RowItem extends React.PureComponent<LayoutItemProps & OwnProps, State> {
  initHeight: number;
  initWidth: number;
  fakeTopLayouts: IMSizeModeLayoutJson;
  fakeBottomLayouts: IMSizeModeLayoutJson;

  state: State = {
    isResizing: false,
    dh: 0,
  };

  constructor(props) {
    super(props);
    this.fakeTopLayouts = Immutable({
      [BrowserSizeMode.Large]: `${this.props.layoutId}_${this.props.layoutItemId}_tlarge`,
      [BrowserSizeMode.Medium]: `${this.props.layoutId}_${this.props.layoutItemId}_tmedium`,
      [BrowserSizeMode.Small]: `${this.props.layoutId}_${this.props.layoutItemId}_tsmall`
    }) as any;

    this.fakeBottomLayouts = Immutable({
      [BrowserSizeMode.Large]: `${this.props.layoutId}_${this.props.layoutItemId}_blarge`,
      [BrowserSizeMode.Medium]: `${this.props.layoutId}_${this.props.layoutItemId}_bmedium`,
      [BrowserSizeMode.Small]: `${this.props.layoutId}_${this.props.layoutItemId}_bsmall`
    }) as any;

  }

  onResizeStart = (id: string, initW: number, initH: number) => {
    this.initWidth = initW;
    this.initHeight = initH;
    this.props.onResizeStart(id);
    this.setState({
      isResizing: true,
    });
  }

  onResizing = (id: string, x: number, y: number, dw: number, dh: number) => {
    this.props.onResizing(id, x, y, dw, dh);
    this.setState({
      dh,
      isResizing: true,
    });
  }

  onResizeEnd = (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => {
    const { layoutItem } = this.props;
    this.props.onResizeEnd(id, x, y, dw, dh, layoutItem);
    this.setState({
      isResizing: false,
      dh: 0,
    });
  }

  isFunctionalWidget() {
    const { layoutItem } = this.props;
    if (layoutItem.type === LayoutItemType.Widget) {
      let isLayoutWidget = false;
      const widget = getAppStore().getState().appConfig?.widgets?.[layoutItem.widgetId];
      if (widget && widget.manifest && widget.manifest.properties) {
        isLayoutWidget =
          widget.manifest.widgetType === WidgetType.Layout ||
          widget.manifest.properties.hasEmbeddedLayout;
      }
      return !isLayoutWidget;
    }
    return false; // layoutItem.type is LayoutItemType.Section
  }

  dropAtTop = (
    draggingItem: LayoutItemConstructorProps,
    containerRect: ClientRect,
    itemRect: ClientRect,
  ) => {
    this.dropAtBoundary(draggingItem, containerRect, itemRect, 'top');
  }

  dropAtBottom = (
    draggingItem: LayoutItemConstructorProps,
    containerRect: ClientRect,
    itemRect: ClientRect,
  ) => {
    this.dropAtBoundary(draggingItem, containerRect, itemRect, 'bottom');
  }

  dropAtBoundary = (
    draggingItem: LayoutItemConstructorProps,
    containerRect: ClientRect,
    itemRect: ClientRect,
    side: 'top' | 'bottom',
  ) => {
    let appConfigAction = getAppConfigAction();
    mergeWidgetsIntoColumn(
      appConfigAction.appConfig,
      draggingItem,
      containerRect,
      itemRect,
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItemId,
      },
      side,
    ).then(({ updatedAppConfig }) => {
      appConfigAction = getAppConfigAction(updatedAppConfig);
      appConfigAction.exec();
    });
  }

  pasteAtBoundary = (
    draggingItem: LayoutItemConstructorProps,
    containerRect: ClientRect,
    itemRect: ClientRect,
    side: 'top' | 'bottom',
  ) => {
    let appConfigAction = getAppConfigAction();
    const { layoutId, layoutItemId } = draggingItem.layoutInfo;
    const layoutInfo = appConfigAction.duplicateLayoutItem(layoutId, layoutId, layoutItemId, true);

    mergeWidgetsIntoColumn(
      appConfigAction.appConfig,
      { layoutInfo } as LayoutItemConstructorProps,
      containerRect,
      itemRect,
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItemId,
      },
      side,
    ).then(({ updatedAppConfig }) => {
      appConfigAction = getAppConfigAction(updatedAppConfig);
      appConfigAction.exec();
    });
  }

  calHeight(itemSetting: RowLayoutItemSetting, bbox: BoundingBox) {
    if (this.props.isMultiRow) {
      return { height: bbox.height, alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    }
    // 1. aspect ratio
    if (itemSetting.heightMode === 'ratio') {
      return { alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    }
    // 2. use autoProps.height first
    if (itemSetting.autoProps?.height === LayoutItemSizeModes.Auto) {
      return { height: 'auto', alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    } else if (itemSetting.autoProps?.height === LayoutItemSizeModes.Custom) {
      return { height: bbox.height, alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    } else if (itemSetting.autoProps?.height === LayoutItemSizeModes.Stretch) {
      return { alignSelf: 'stretch' };
    }
    // 3. back compatible, use setting.heightMode
    if (itemSetting.heightMode === 'fit') {
      return { alignSelf: 'stretch' };
    } else if (parseFloat(bbox.height) > 0) {
      return { height: bbox.height, alignSelf: itemSetting.style?.alignSelf ?? 'flex-start' };
    }

    return { alignSelf: 'stretch' };
  }

  getStyle(itemSetting: RowLayoutItemSetting) {
    const { gutter, layoutItem, isMultiRow } = this.props;
    const { dh, isResizing } = this.state;
    const bbox = layoutItem.bbox;

    const mergedStyle: any = this.calHeight(itemSetting, bbox);

    if (itemSetting.offsetX || itemSetting.offsetY) {
      mergedStyle.transform = `translate(${itemSetting.offsetX || 0}px, ${itemSetting.offsetY || 0}px)`;
    }

    if (isResizing && dh) {
      mergedStyle.height = this.initHeight + dh;
    }

    if (isMultiRow) {
      return css`
        padding: ${gutter / 2}px 0;
        transform: ${itemSetting.offsetX || itemSetting.offsetY ? `translate(${itemSetting.offsetX || 0}px, ${itemSetting.offsetY || 0}px)` : null};
        height: ${utils.getValueOfBBox(mergedStyle, 'height')};
        align-self: ${mergedStyle.alignSelf};
      `;
    }
    return css`
      padding: 0 ${gutter / 2}px;
      transform: ${itemSetting.offsetX || itemSetting.offsetY ? `translate(${itemSetting.offsetX || 0}px, ${itemSetting.offsetY || 0}px)` : null};
      height: ${utils.getValueOfBBox(mergedStyle, 'height')};
      align-self: ${mergedStyle.alignSelf};
    `;
  }

  render() {
    const {
      order,
      span,
      offset,
      layoutId,
      layoutItem,
      draggable,
      resizable,
      selectable,
    } = this.props;
    if (!layoutItem || layoutItem.isPending) {
      return null;
    }

    const itemSetting: RowLayoutItemSetting = lodash.assign({}, DEFAULT_ROW_ITEM_SETTING, layoutItem.setting);
    const isRatio = itemSetting.heightMode === 'ratio';
    const heightMode = itemSetting.autoProps?.height;
    const mergedClass = classNames('row-layout-item d-flex', `col-${span}`, `offset-${offset}`, `order-${order}`, {
      'fix-height': heightMode === LayoutItemSizeModes.Custom
    });

    const canDropAtBoundary = this.isFunctionalWidget();

    const highlightStyle = css`
      width: 100%;
      height: 10px;
      background: ${this.props.builderTheme.colors.palette.primary[700]};
    `;
    const ratio = utils.parseAspectRatio(itemSetting.aspectRatio);
    const oneByOneAnimationProps = utils.handleOnebyOneAnimation(this.props);
    return (
      <LayoutItemInBuilder
        css={this.getStyle(itemSetting)}
        layoutId={layoutId}
        layoutItemId={layoutItem.id}
        onResizeStart={this.onResizeStart}
        onResizing={this.onResizing}
        onResizeEnd={this.onResizeEnd}
        left={true}
        right={true}
        top={false}
        bottom={heightMode === LayoutItemSizeModes.Custom && !isRatio}
        draggable={draggable}
        resizable={resizable}
        selectable={selectable}
        onClick={this.props.onClick}
        className={mergedClass}
        forceAspectRatio={isRatio}
        aspectRatio={ratio}
        {...oneByOneAnimationProps}>
        <React.Fragment>
          {canDropAtBoundary && <DropArea
            css={css`
              ${topDropareaStyle};
            `}
            layouts={this.fakeTopLayouts}
            highlightDragover={true}
            onDrop={this.dropAtTop}>
            <div css={highlightStyle}></div>
          </DropArea>}
          {canDropAtBoundary && <DropArea
            css={css`
              ${bottomDropareaStyle};
            `}
            layouts={this.fakeBottomLayouts}
            highlightDragover={true}
            onDrop={this.dropAtBottom}>
            <div css={css`${highlightStyle};position: absolute; bottom:0;`}></div>
          </DropArea>}
        </React.Fragment>
      </LayoutItemInBuilder>
    );
  }
}
