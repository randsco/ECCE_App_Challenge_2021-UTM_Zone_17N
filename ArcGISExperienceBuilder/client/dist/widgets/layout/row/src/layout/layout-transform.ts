import {
  IMAppConfig,
  extensionSpec,
  IMLayoutJson,
  IMState,
  Immutable,
  BrowserSizeMode,
  IMLayoutItemJson,
  getAppStore,
} from 'jimu-core';
import { searchUtils, utils } from 'jimu-layouts/layout-runtime';
import { TOTAL_COLS } from './types';

function getAppState(): IMState {
  const state = getAppStore().getState();
  if (window.jimuConfig.isBuilder) {
    return state?.appStateInBuilder;
  } else {
    return state;
  }
}

export function getWidgetHeight(appConfig: IMAppConfig, widgetsState: { [key: string]: any }, widgetId: string): number {
  const widgetJson = appConfig.widgets[widgetId];
  if (widgetJson) {
    const padding = widgetJson.config?.style?.padding?.number || [0];
    const paddingValues = utils.expandStyleArray(padding);
    const widgetHeight = widgetsState?.[widgetId]?.height || 0;

    let pt = paddingValues[0];
    let pb = paddingValues[2];
    if (utils.isPercentage(pt)) {
      pt = utils.fromRatio(pt, widgetHeight);
    }
    if (utils.isPercentage(pb)) {
      pb = utils.fromRatio(pb, widgetHeight);
    }

    return widgetHeight - pt - pb;
  }
  return 0;
}

export function getHeightOfLayoutItems(
  appConfig: IMAppConfig,
  widgetsState: { [key: string]: any },
  layoutId: string
): { [key: string]: { height?: number; setting: any } } {
  const widgetId = searchUtils.getWidgetIdThatUseTheLayoutId(appConfig, layoutId);
  const widgetHeight = getWidgetHeight(appConfig, widgetsState, widgetId);
  if (widgetHeight > 0) {
    const rowLayout = appConfig.layouts[layoutId];
    const itemIds = rowLayout.order || [];
    const result = {};

    itemIds.forEach(itemId => {
      const layoutItem = appConfig.layouts[layoutId].content[itemId];
      result[itemId] = utils.calHeightOfLayoutItem(widgetHeight, layoutItem);
    });
    return result;
  }
  return null;
}

export default class RowLayoutTransformer implements extensionSpec.LayoutTransformer {
  id = 'row-layout-transformer';

  layoutType = 'ROW';

  transformLayout(layout: IMLayoutJson, fromSizeMode: BrowserSizeMode, toSizeMode: BrowserSizeMode): IMLayoutJson {
    if (fromSizeMode === toSizeMode) {
      return layout;
    }

    let updatedLayout: IMLayoutJson = Immutable(layout);

    if (toSizeMode === BrowserSizeMode.Small) {
      const state = getAppState();
      const itemHeights = getHeightOfLayoutItems(state.appConfig, window.runtimeInfo?.widgets, layout.id);
      let index = 0;
      const order = Object.keys(layout.content || {}).sort((a, b) => {
        return parseInt(layout.content[a].bbox.left, 10) - parseInt(layout.content[b].bbox.left, 10);
      });
      order.forEach(itemId => {
        const layoutItem = layout.content[itemId];
        if (!layoutItem.isPending) {
          updatedLayout = updatedLayout.setIn(['content', itemId, 'bbox'], {
            left: index * TOTAL_COLS,
            width: TOTAL_COLS,
            height: layoutItem.bbox?.height ?? 'auto',
          });
          if (itemHeights) {
            const setting = layoutItem.setting ?? Immutable({});
            updatedLayout = updatedLayout
              .setIn(['content', itemId, 'bbox', 'height'], itemHeights[itemId].height)
              .setIn(['content', itemId, 'setting'], setting.merge(itemHeights[itemId].setting));
          }
          index += 1;
        }
      });
    }

    return updatedLayout;
  }

  transformLayoutItem(
    item: IMLayoutItemJson,
    index: number,
    fromLayoutId: string,
    toLayoutId: string,
    fromSizeMode: BrowserSizeMode,
    toSizeMode: BrowserSizeMode
  ): { item: IMLayoutItemJson; index: number } {
    return { item, index };
  }
}
