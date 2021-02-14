/** @jsx jsx */
import {
  React,
  classNames,
  LayoutInfo,
  polished,
  jsx,
  css,
  LayoutItemJson,
  LayoutItemConstructorProps,
  getAppStore,
  appActions,
  IMLayoutJson,
  IMThemeVariables,
  BoundingBox,
  IMAppConfig,
  OneByOneAnimation,
} from 'jimu-core';
import { getAppConfigAction } from 'jimu-for-builder';
import * as SVG from 'svg.js';
import { IMRowConfig } from '../../config';
import RowItemForBuilder from './layout-item';
import {
  LayoutProps,
  PageContext,
  PageContextProps,
  utils,
  LayoutZIndex,
} from 'jimu-layouts/layout-runtime';
import { DropArea, addItemToLayout, DropHandlers } from 'jimu-layouts/layout-builder';
import { snapLeft, resizeItem, moveItem, insertItem } from './utils';
import { ChildRect, IMChildRect, TOTAL_COLS } from '../types';
import { flipRowItemPos, ROW_STYLE } from '../utils';

type RowLayoutProps = LayoutProps & {
  config: IMRowConfig;
  layout: IMLayoutJson;
  transformedLayout: IMLayoutJson;
  isMultiRow: boolean;
};

const dropareaStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const guideOverlay = css`
  ${dropareaStyle};
  bottom: 0;
  top: 0;
  z-index: ${LayoutZIndex.DragMoveTip};
  pointer-events: none;
`;

interface State {
  // dragEnterred: boolean;
  isResizing: boolean;
  updatingRects: IMChildRect[];
  isDragoverCenter: boolean;
}

export class Row extends React.PureComponent<RowLayoutProps, State> implements DropHandlers {
  ref: HTMLElement;
  guideColRef: HTMLElement;
  guideDragOverRef: HTMLElement;
  guideDragOverDraw: SVG.Doc;
  dropArea: SVG.Rect;
  boundingRect: ClientRect;
  // childrenRef: { [key: string]: React.RefObject<HTMLDivElement> };
  childRects: ChildRect[];
  flippedChildRects: ChildRect[];
  domRect: ClientRect;
  resizingRect: ClientRect;
  referenceId: string;
  colWidth: number;
  dragInsertPos: number;
  // paddings: number[];
  space: number;
  flowLayoutId: string;
  maxPageWidth: number;
  builderTheme: IMThemeVariables;
  flipLeftRight: boolean;

  state: State = {
    // dragEnterred: false,
    isResizing: false,
    updatingRects: null,
    isDragoverCenter: false,
  };

  constructor(props) {
    super(props);
    // this.childrenRef = {};
    utils.autoBindHandlers(this, [
      'onItemResizeStart',
      'onItemResizing',
      'onItemResizeEnd',
      'onDrop',
      'onPaste',
      'onDragOver',
      'onDragEnter',
      'onDragLeave',
      'toggleDragoverCenterEffect',
    ]);
    this.flipLeftRight = utils.isRTL();
  }

  componentDidMount() {
    this.guideDragOverDraw = SVG(this.guideDragOverRef);
  }

  onItemResizeStart(id: string) {
    this.domRect = this.ref.getBoundingClientRect();

    this.setState({
      isResizing: true,
    });
  }

  onItemResizing(id: string, x: number, y: number, dw: number, dh: number) {
    const colWidth = this.domRect.width / TOTAL_COLS;
    let deltaX = Math.round(x / colWidth);
    let deltaW = Math.round(dw / colWidth);

    if (this.flipLeftRight) {
      deltaX = -deltaX;
      deltaW = -deltaW;
    }

    const resizingRects = resizeItem(id, deltaX, deltaW, this.childRects);
    this.setState({
      updatingRects: resizingRects,
    });
  }

  onItemResizeEnd(id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) {
    const { layout } = this.props;
    const colWidth = this.domRect.width / TOTAL_COLS;
    let deltaX = Math.round(x / colWidth);
    let deltaW = Math.round(dw / colWidth);

    if (this.flipLeftRight) {
      deltaX = -deltaX;
      deltaW = -deltaW;
    }

    const appConfigAction = getAppConfigAction();
    const resizingRects = resizeItem(id, deltaX, deltaW, this.childRects);
    resizingRects.forEach((rectItem) => {
      const bbox = layout.content[rectItem.id].bbox;
      let updatedHeight = bbox.height;
      if (rectItem.id === id) {
        if (utils.isPercentage(bbox.height)) {
          updatedHeight = `${(parseFloat(rectItem.height as any) + (dh * 100 / this.domRect.height)).toFixed(4)}%`;
        } else {
          updatedHeight = `${Math.round(parseFloat(rectItem.height as any) + dh)}px`;
        }
      }
      const rect: any = {
        left: rectItem.left,
        width: rectItem.width,
        height: updatedHeight,
      };
      appConfigAction.editLayoutItemBBox(
        {
          layoutId: layout.id,
          layoutItemId: rectItem.id,
        },
        rect,
      );
    });
    appConfigAction.exec();

    this.setState({
      isResizing: false,
      updatingRects: null,
    });
  }

  toggleDragoverCenterEffect(value: boolean) {
    this.referenceId = null;
    if (value) {
      this.collectBounds();
    }
    this.setState({
      isDragoverCenter: value,
    });
  }

  onDragOver(
    draggingItem: LayoutItemConstructorProps,
    draggingElement: HTMLElement,
    containerRect: Partial<ClientRect>,
    itemRect: Partial<ClientRect>,
    clientX: number,
    clientY: number,
  ) {
    // const { layout } = this.props;
    const layoutInfo = draggingItem.layoutInfo || {} as LayoutInfo;

    const updatedRects: IMChildRect[] = this.reCalculateRects(
      draggingItem,
      containerRect,
      itemRect,
      clientX,
    );
    let targetRect: IMChildRect;

    updatedRects.some((childRect) => {
      if (!childRect.id || (childRect.layoutId === layoutInfo.layoutId && childRect.id === layoutInfo.layoutItemId)) {
        targetRect = childRect;
        return true;
      }
    });
    let available = true;
    let insertPos = targetRect.left;
    this.flippedChildRects.some((childRect) => {
      if (childRect.layoutId === targetRect.layoutId && childRect.id === targetRect.id) {
        return;
      }
      if (childRect.left <= targetRect.left && (childRect.left + childRect.width) > targetRect.left) {
        available = false;
      }
      if (!available) {
        const updatedChildRect = updatedRects.find(item => item.layoutId === item.layoutId && item.id === childRect.id);
        if (updatedChildRect.left + updatedChildRect.width <= targetRect.left) {
          insertPos = childRect.left + childRect.width;
        } else {
          insertPos = childRect.left;
        }
        return true;
      }
    });
    this.dragInsertPos = insertPos;

    if (!this.dropArea) {
      if (available) {
        this.dropArea = this.guideDragOverDraw.rect(targetRect.width * this.colWidth - this.space, targetRect.height)
          .fill(polished.rgba(this.builderTheme.colors.palette.primary[700], 0.2)).stroke('none').attr({
            x: insertPos * this.colWidth + this.space / 2,
            y: 0,
          });
      } else {
        const restrainedInsertPos = Math.min(
          containerRect.width - this.space / 2,
          Math.max(0, insertPos * this.colWidth - this.space / 2),
        );
        this.dropArea = this.guideDragOverDraw.rect(10, containerRect.height)
          .fill(polished.rgba(this.builderTheme.colors.palette.primary[700], 1)).stroke('none').attr({
            x: restrainedInsertPos,
            y: 0,
          });
      }
    } else {
      if (available) {
        this.dropArea.move(insertPos * this.colWidth + this.space / 2, 0)
          .fill(polished.rgba(this.builderTheme.colors.palette.primary[700], 0.2))
          .size(targetRect.width * this.colWidth - this.space, targetRect.height);
      } else {
        const restrainedInsertPos = Math.min(
          containerRect.width - this.space / 2,
          Math.max(0, insertPos * this.colWidth - this.space / 2),
        );
        this.dropArea.move(restrainedInsertPos, 0)
          .fill(polished.rgba(this.builderTheme.colors.palette.primary[700], 1))
          .size(10, containerRect.height);
      }

      if (!this.dropArea.visible()) {
        this.dropArea.show();
      }
    }
  }

  onDragEnter() {

  }

  onDragLeave() {

  }

  reCalculateRects(
    draggingItem: LayoutItemConstructorProps,
    containerRect: Partial<ClientRect>,
    itemRect: Partial<ClientRect>,
    clientX: number,
  ) {
    const layoutInfo = draggingItem.layoutInfo || {} as LayoutInfo;
    const { config, layout } = this.props;
    this.space = config.space || 0;
    // this.paddings = styleUtils.expandStyleArray(lodash.getValue(config, 'style.padding.number', [0]));
    // width should add the marginLeft and marginRight, which equals to this.space
    const rowWidth = this.maxPageWidth > 0 ? Math.min(this.maxPageWidth, containerRect.width) : containerRect.width;
    const cursorLeft = clientX - (containerRect.width - rowWidth) / 2;
    const itemLeft = itemRect.left - (containerRect.width - rowWidth) / 2;
    this.colWidth = rowWidth / TOTAL_COLS;
    const cursorLeftInRow1 = Math.round(cursorLeft / this.colWidth);
    const itemLeftInRow = Math.round(itemLeft / this.colWidth);
    const span = Math.round(itemRect.width / this.colWidth);

    const cursorLeftInRow = snapLeft(layout.id, draggingItem, itemLeftInRow, span, cursorLeftInRow1, this.flippedChildRects);

    if (!draggingItem.id && this.isInRow(layoutInfo)) { // move in the same layout, exclude the pending item
      return moveItem(layoutInfo.layoutItemId, cursorLeftInRow, this.flippedChildRects);
    }
    // drag from different layout or from widget list
    return insertItem(
      {
        width: span,
        height: itemRect.height,
        layoutId: layoutInfo.layoutId,
        id: layoutInfo.layoutItemId,
      },
      cursorLeftInRow,
      this.flippedChildRects,
    );
  }

  onDrop(
    draggingItem: LayoutItemConstructorProps,
    containerRect: ClientRect,
    itemRect: ClientRect,
    // clientX: number,
    // clientY: number,
  ) {
    const { layout } = this.props;
    let appConfigAction = getAppConfigAction();
    const {addedItemRect, insertIndex, appConfig} = this.calDropPosition(
      appConfigAction.appConfig,
      draggingItem,
      containerRect,
      itemRect,
      false
    );

    if (addedItemRect) {
      addItemToLayout(
        appConfig,
        draggingItem,
        {
          layoutId: layout.id,
        },
        containerRect, addedItemRect, insertIndex
      ).then((result) => {
        const { layoutInfo, updatedAppConfig } = result;
        appConfigAction = getAppConfigAction(updatedAppConfig);
        if (draggingItem.layoutInfo?.layoutId !== layout.id) {
          appConfigAction.editLayoutItemSetting(layoutInfo, { heightMode: 'fit' });
        }
        // only left, width and height are necessary
        const { layoutId, layoutItemId } = layoutInfo;
        let bbox = updatedAppConfig.layouts[layoutId].content[layoutItemId].bbox;
        bbox = bbox.without('top').without('right').without('bottom');
        appConfigAction.editLayoutItemBBox(layoutInfo, bbox);
        getAppStore().dispatch(appActions.layoutChanged(appConfigAction.appConfig, layoutInfo));
      });
    } else {
      getAppStore().dispatch(appActions.layoutChanged(appConfig, draggingItem.layoutInfo));
    }

    if (this.dropArea) {
      this.dropArea.hide();
    }
    // this.hideColGuide();
  }

  calDropPosition(
    appConfig: IMAppConfig,
    draggingItem: LayoutItemConstructorProps,
    containerRect: ClientRect,
    itemRect: ClientRect,
    isPaste: boolean
  ) {
    // const clientX = itemRect.left;
    const rowWidth = this.maxPageWidth > 0 ? Math.min(this.maxPageWidth, containerRect.width) : containerRect.width;
    // const cursorLeft = clientX - (containerRect.width - rowWidth) / 2;
    // const itemLeft = itemRect.left - (containerRect.width - rowWidth) / 2;

    const layoutInfo = draggingItem.layoutInfo || {} as LayoutInfo;
    const { layout } = this.props;
    const colWidth = rowWidth / TOTAL_COLS;
    // let cursorLeftInRow = Math.round(cursorLeft / colWidth);
    const cursorLeftInRow = this.dragInsertPos;
    // const itemLeftInRow = Math.round(itemLeft / this.colWidth);
    const span = Math.round(itemRect.width / colWidth);

    // cursorLeftInRow = snapLeft(layout.id, draggingItem, itemLeftInRow, span, cursorLeftInRow, this.flippedChildRects);

    const appConfigAction = getAppConfigAction(appConfig);

    let updatedRects: IMChildRect[];
    if (!isPaste && !draggingItem.id && this.isInRow(layoutInfo)) { // move in the same row
      updatedRects = moveItem(layoutInfo.layoutItemId, cursorLeftInRow, this.flippedChildRects);
    } else { // drag from different layout or from widget list
      updatedRects = insertItem(
        {
          width: span,
          height: itemRect.height,
          layoutId: layoutInfo.layoutId,
          id: layoutInfo.layoutItemId,
        },
        cursorLeftInRow,
        this.flippedChildRects,
      );
    }

    let addedItemRect;
    let insertIndex;
    updatedRects.forEach((rectItem, index) => {
      let rect: any = {
        left: rectItem.left,
        width: rectItem.width,
        height: rectItem.height,
      };
      if (this.flipLeftRight) {
        rect = flipRowItemPos(rect as BoundingBox);
      }
      if (rectItem.layoutId === layout.id) { // item that is in the same layout
        appConfigAction.editLayoutItemBBox(
          {
            layoutId: rectItem.layoutId,
            layoutItemId: rectItem.id,
          },
          rect,
        );
        if (rectItem.id === draggingItem.layoutInfo?.layoutItemId && draggingItem.id) {
          // set pending to false
          appConfigAction.setLayoutItemToPending(
            {
              layoutId: rectItem.layoutId,
              layoutItemId: rectItem.id,
            },
            false
          );
        }
      } else {
        const firstIndexInRow = 0;
        addedItemRect = rect;
        insertIndex = firstIndexInRow + index;
      }
    });

    return { addedItemRect, insertIndex, appConfig: appConfigAction.appConfig };
  }

  isInRow(layoutInfo: LayoutInfo) {
    const { layout } = this.props;
    return layoutInfo && layoutInfo.layoutId === layout.id;
  }

  collectBounds() {
    const { transformedLayout } = this.props;
    const content = transformedLayout.order || [];
    this.childRects = [];

    content.forEach((itemId) => {
      if (transformedLayout.content[itemId].isPending) {
        return;
      }
      const bbox = transformedLayout.content?.[itemId]?.bbox;
      if (bbox) {
        this.childRects.push({
          layoutId: transformedLayout.id,
          id: itemId,
          left: parseInt(bbox.left, 10),
          width: parseInt(bbox.width, 10),
          height: bbox.height as any,
        });
      }
    });
    this.childRects.sort((a, b) => a.left - b.left);

    if (this.flipLeftRight) {
      this.flippedChildRects = [];
      this.childRects.forEach((item) => {
        let rect: any = {
          left: item.left,
          width: item.width,
          height: item.height,
        };
        rect = flipRowItemPos(rect as BoundingBox);
        this.flippedChildRects.push({
          layoutId: item.layoutId,
          id: item.id,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      });
      this.flippedChildRects.sort((a, b) => a.left - b.left);
    } else {
      this.flippedChildRects = this.childRects;
    }

    return this.childRects;
  }

  createItem(childRects: ChildRect[], index: number, layoutStyle) {
    const { transformedLayout, itemDraggable, itemResizable, itemSelectable, config, isMultiRow } = this.props;
    const childRect = childRects[index];
    const gutter = config.space || 0;

    let offset;
    if (index === 0) {
      offset = childRect.left;
    } else {
      const previousBBox = childRects[index - 1];
      offset = childRect.left - previousBBox.left - previousBBox.width;
    }

    return (
      <RowItemForBuilder
        key={childRect.id}
        order={index + 1}
        offset={offset}
        span={childRect.width}
        gutter={gutter}
        isMultiRow={isMultiRow}
        builderTheme={this.builderTheme}
        layoutId={transformedLayout.id}
        layoutItemId={childRect.id}
        layoutItem={transformedLayout.content[childRect.id]}
        draggable={itemDraggable}
        resizable={itemResizable}
        selectable={itemSelectable}
        alignItems={layoutStyle.alignItems}
        // itemDisplaySetting={itemDisplaySetting}
        onResizeStart={this.onItemResizeStart}
        onResizing={this.onItemResizing}
        onResizeEnd={this.onItemResizeEnd}
      />
    );
  }

  render() {
    const { transformedLayout, className, config } = this.props;
    const { isResizing, isDragoverCenter } = this.state;
    const isDragover = isDragoverCenter;
    let content: ChildRect[];
    if (isResizing && this.state.updatingRects) {
      content = this.state.updatingRects;
    } else {
      this.collectBounds();
      content = this.childRects;
    }

    const layoutStyle: any = config.style || {};
    const gutter = config.space || 0;

    // this.paddings = styleUtils.expandStyleArray(lodash.getValue(config, 'style.padding.number', [0]));

    return (<PageContext.Consumer>
      {(props: PageContextProps) => {
        this.maxPageWidth = props.maxWidth;
        this.builderTheme = props.builderTheme;

        return <div className={classNames('row-layout', className, { 'row-rtl': this.flipLeftRight })}
          css={ROW_STYLE} data-layoutid={transformedLayout.id}>
          <div css={css`
            width: 100%;
            max-width: ${props.maxWidth > 0 ? props.maxWidth + 'px' : 'none'};
          `}>
            <div
              ref={el => (this.ref = el)}
              css={css`
                position: relative;
                height: 100%;
                margin-left: ${-gutter / 2}px;
                margin-right: ${-gutter / 2}px;
                display: flex;
                flex-direction: column;
                .row {
                  overflow: ${this.props.isMultiRow ? 'auto' : 'unset'};
                }
              `}>
              <OneByOneAnimation
                className={classNames('row m-0', {
                  'flex-nowrap': !this.props.isMultiRow,
                  'h-100': content.length > 0
                })}
                data-layoutid={transformedLayout.id}
              >
                <DropArea
                  css={dropareaStyle}
                  layouts={this.props.layouts}
                  highlightDragover={false}
                  onDragEnter={this.onDragEnter}
                  onDragLeave={this.onDragLeave}
                  onDragOver={this.onDragOver}
                  onDrop={this.onDrop}
                  onToggleDragoverEffect={this.toggleDragoverCenterEffect}>
                </DropArea>
                {content.map((_, index) => this.createItem(content, index, layoutStyle))}
              </OneByOneAnimation>
              {content.length === 0 && this.props.children}
              <div
                ref={el => this.guideColRef = el}
                css={css`
                  pointer-events: none;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0px;
                  position: absolute;
                  z-index: 1;
                  display: ${(isDragover || isResizing) ? 'flex' : 'none'};
                `}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((key) => {
                  return (
                    <div
                      key={key}
                      css={css`
                        width: 8.333333%;
                      `}>
                      <div
                        css={css`
                          padding-left: ${gutter / 2}px;
                          padding-right: ${gutter / 2}px;
                          height: 100%;
                          width: 100%;
                          overflow: hidden;
                        `}>
                        <div
                          css={css`
                            transform: translateY(-5%);
                            border: 1px dashed ${polished.rgba(props.builderTheme.colors.palette.dark[300], 0.6)};
                            height: 110%;
                            width: 100%;
                          `}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div css={css`
                ${guideOverlay};
                display: ${isDragover ? 'block' : 'none'};
              `} ref={el => (this.guideDragOverRef = el)} />
            </div>
          </div>
        </div>;
      }}
    </PageContext.Consumer>
    );
  }
}
