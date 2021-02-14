import {LayoutInfo, getAppStore, React, BrowserSizeMode, themeUtils} from 'jimu-core';
import {interact} from 'jimu-core/dnd';
import { ButtonGroup, Button, Popper} from 'jimu-ui'
import { searchUtils } from 'jimu-layouts/layout-runtime';
import { getAppConfigAction} from 'jimu-for-builder';
import { GLOBAL_DRAGGING_CLASS_NAME, GLOBAL_RESIZING_CLASS_NAME, GLOBAL_H5_DRAGGING_CLASS_NAME } from 'jimu-layouts/layout-builder'
import MyDropDown, {MyDropdownProps} from './components/my-dropdown';
const {withBuilderStyle, withBuilderTheme} = themeUtils;

const widgetModules = {
  ButtonGroup: ButtonGroup,
  interact: interact,
  searchUtils: searchUtils,
  getAppConfigAction: getAppConfigAction,
  GLOBAL_DRAGGING_CLASS_NAME: GLOBAL_DRAGGING_CLASS_NAME,
  GLOBAL_RESIZING_CLASS_NAME: GLOBAL_RESIZING_CLASS_NAME,
  GLOBAL_H5_DRAGGING_CLASS_NAME: GLOBAL_H5_DRAGGING_CLASS_NAME,
  withBuilderStyle: withBuilderStyle,
  withBuilderTheme: withBuilderTheme,
  BuilderDropDown: withBuilderTheme((props: MyDropdownProps) => { return <MyDropDown {...props} withBuilderStyle={withBuilderStyle} /> }),
  BuilderPopper: withBuilderStyle(Popper),
  BuilderButton: withBuilderStyle(Button),

  selectionIsSelf: (layoutInfo: LayoutInfo, id: string, appConfig: any) => {
    if(!layoutInfo || !layoutInfo.layoutItemId || !layoutInfo.layoutId){
      return false;
    }
    const layoutItem = searchUtils.findLayoutItem(appConfig, layoutInfo);
    if(layoutItem && layoutItem.widgetId && layoutItem.widgetId === id){
      return true;
    }
    return false;
  },

  selectionInCard: (layoutInfo: LayoutInfo, id: string, appConfig: any, useCurrentSizeMode: boolean = true) => {
    if(!layoutInfo || !layoutInfo.layoutItemId || !layoutInfo.layoutId){
      return false;
    }
    let layoutItems;
    if(useCurrentSizeMode){
      layoutItems = searchUtils.getRelatedLayoutItemsInWidgetByLayoutInfo(appConfig, layoutInfo, id, getAppStore().getState().browserSizeMode);
    }else {
      layoutItems = [];
      layoutItems.push(...searchUtils.getRelatedLayoutItemsInWidgetByLayoutInfo(appConfig, layoutInfo, id, BrowserSizeMode.Large))
      layoutItems.push(...searchUtils.getRelatedLayoutItemsInWidgetByLayoutInfo(appConfig, layoutInfo, id, BrowserSizeMode.Medium))
      layoutItems.push(...searchUtils.getRelatedLayoutItemsInWidgetByLayoutInfo(appConfig, layoutInfo, id, BrowserSizeMode.Small))
    }
    return layoutItems.length > 0
  }
}

export default widgetModules;