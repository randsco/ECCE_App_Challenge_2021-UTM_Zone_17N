import { getAppConfigAction, AppConfigAction, builderAppSync } from 'jimu-for-builder';
import { IMAppConfig, LayoutItemType, getAppStore, appActions } from 'jimu-core';
import { searchUtils } from 'jimu-layouts/layout-runtime';
import { Status } from './config';


export function selectSelf(props, fromPage?: boolean){
  const {id, dispatch, browserSizeMode} = props;
  const appConfig = getAppConfigAction().appConfig;
  const layoutInfos = searchUtils.getContentLayoutInfosInOneSizeMode(appConfig, id, LayoutItemType.Widget, browserSizeMode);
  if(layoutInfos){
    if(layoutInfos.length > 1){
      const widgetId = searchUtils.getWidgetIdThatUseTheLayoutId(appConfig, layoutInfos[0].layoutId);
      if(widgetId){
        const widgetJson = appConfig.widgets[widgetId];
        if(widgetJson && widgetJson.manifest && widgetJson.manifest.name && widgetJson.manifest.name === 'list'){
          const currentStatus = getAppStore().getState().widgetsState && getAppStore().getState().widgetsState[widgetJson.id] &&
                                  getAppStore().getState().widgetsState[widgetJson.id]['builderStatus'];
          if(currentStatus){
            const currentLayoutId = searchUtils.findLayoutId(widgetJson.layouts[currentStatus], browserSizeMode, appConfig.mainSizeMode);
            const layoutInfo = layoutInfos.find(lInfo => lInfo.layoutId === currentLayoutId);
            if(fromPage){
              dispatch(appActions.selectionChanged(layoutInfo))
            }else{
              builderAppSync.publishChangeSelectionToApp(layoutInfo);
            }
          }
        }
      }
    }else if(layoutInfos.length > 0){
      if(fromPage){
        dispatch(appActions.selectionChanged(layoutInfos[0]))
      }else{
        builderAppSync.publishChangeSelectionToApp(layoutInfos[0]);
      }
    }
  }
}

export function handleResizeCard(props, newCardSize, isTop: boolean = false, isLeft: boolean = false, isEnd: boolean = false, appConfig: IMAppConfig = undefined): AppConfigAction{
  const {id, browserSizeMode} = props;
  if(!appConfig){
    appConfig = getAppConfigAction().appConfig;
  }
  const config = appConfig.widgets[id].config;
  const action = getAppConfigAction(appConfig);

  action.editWidgetConfig(id,
    config.setIn(['cardConfigs', Status.Regular, 'cardSize', browserSizeMode], newCardSize)
      .setIn(['cardConfigs', Status.Hover, 'cardSize', browserSizeMode], newCardSize)
      .setIn(['cardConfigs', Status.Selected, 'cardSize', browserSizeMode], newCardSize)
  );

  // const layoutInfos = appConfigUtils.getContentLayoutInfosInOneSizeMode(appConfig, id, LayoutItemType.Widget);
  // let layoutInfo = undefined;
  // if(layoutInfos){
  //   if(layoutInfos.length > 1){
  //     const widgetId = appConfigUtils.getWidgetIdThatUseTheLayoutId(appConfig, layoutInfos[0].layoutId);
  //     if(widgetId){
  //       const widgetJson = appConfig.widgets[widgetId];
  //       if(widgetJson && widgetJson.manifest && widgetJson.manifest.name && widgetJson.manifest.name === 'list'){
  //         const currentStatus = getAppStore().getState().widgetsState && getAppStore().getState().widgetsState[widgetJson.id] &&
  //                                 getAppStore().getState().widgetsState[widgetJson.id]['builderStatus'];
  //         if(currentStatus){
  //           const currentLayoutId = utils.findLayoutId(widgetJson.layouts[currentStatus], getAppStore().getState().browserSizeMode, appConfig.isMobileFirst);
  //           layoutInfo = layoutInfos.find(lInfo => lInfo.layoutId === currentLayoutId);
  //         }
  //       }
  //     }
  //   }else if(layoutInfos.length > 0){
  //     layoutInfo = layoutInfos[0];
  //   }
  // }
  // if(!layoutInfo){
  //   return action;
  // }
  // const layoutItem = appConfig.layouts[layoutInfo.layoutId].content && appConfig.layouts[layoutInfo.layoutId].content[layoutInfo.layoutItemId];
  // if(layoutItem){

  //   let bbox = Immutable(layoutItem.bbox || {});

  //   if(config.direction === DirectionType.Vertical){
  //     const bboxW = _getNumberFromStyle(bbox.width);
  //     if(!bboxW || newCardSize.width > bboxW){
  //       if(isLeft){
  //         const bboxL = _getNumberFromStyle(bbox.left);
  //         bbox = bbox.set('left', `${bboxL - (newCardSize.width - bboxW)}px`);
  //       }
  //       bbox = bbox.set('width', `${newCardSize.width}px`);
  //       action.editLayoutItemBBox(layoutInfo, bbox)
  //     }
  //   }else{
  //     const bboxH = _getNumberFromStyle(bbox.height);
  //     if (!bboxH || newCardSize.height > bboxH){
  //       if(isTop){
  //         const bboxT = _getNumberFromStyle(bbox.top);
  //         bbox = bbox.set('top', `${bboxT - (newCardSize.height - bboxH)}px`);
  //       }
  //       bbox = bbox.set('height', `${newCardSize.height}px`);
  //       action.editLayoutItemBBox(layoutInfo, bbox)
  //     }
  //   }
  // }

  return action;
}

// export function handleResizeCardForStyleChange(id, config, appConfig: IMAppConfig = undefined): AppConfigAction{
//   const space = config.space;
//   const newCardSize = config.cardSize;
//   const layoutInfos = appConfigUtils.getContentLayoutInfosInOneSizeMode(appConfig, id, LayoutItemType.Widget, browserSizeMode);
//   let layoutInfo = undefined;
//   if(layoutInfos){
//     if(layoutInfos.length > 1){
//       const widgetId = appConfigUtils.getWidgetIdThatUseTheLayoutId(appConfig, layoutInfos[0].layoutId);
//       if(widgetId){
//         const widgetJson = appConfig.widgets[widgetId];
//         if(widgetJson && widgetJson.manifest && widgetJson.manifest.name && widgetJson.manifest.name === 'list'){
//           const currentStatus = getAppStore().getState().widgetsState && getAppStore().getState().widgetsState[widgetJson.id] &&
//                                   getAppStore().getState().widgetsState[widgetJson.id]['builderStatus'];
//           if(currentStatus){
//             const currentLayoutId = utils.findLayoutId(widgetJson.layouts[currentStatus], getAppStore().getState().browserSizeMode, appConfig.mainSizeMode);
//             layoutInfo = layoutInfos.find(lInfo => lInfo.layoutId === currentLayoutId);
//           }
//         }
//       }
//     }else if(layoutInfos.length > 0){
//       layoutInfo = layoutInfos[0];
//     }
//   }
//   if(!layoutInfo){
//     return;
//   }
//   const layoutItem = appConfig.layouts[layoutInfo.layoutId].content && appConfig.layouts[layoutInfo.layoutId].content[layoutInfo.layoutItemId];
//   if(!layoutItem)return;
//   const action = getAppConfigAction(appConfig);
//   if(layoutItem){
//     let bbox = Immutable(layoutItem.bbox || {});

//     if(config.direction === DirectionType.Vertical){
//       bbox = bbox.set('width', `${newCardSize.width + LIST_CARD_PADDING * 2}px`);
//       bbox = bbox.set('height', `${newCardSize.height * 2 + space * 2 + LIST_CARD_PADDING}px`);
//     }else{
//       bbox = bbox.set('width', `${newCardSize.width * 2 + space * 2  + LIST_CARD_PADDING}px`);
//       bbox = bbox.set('height', `${newCardSize.height + LIST_CARD_PADDING * 2}px`);
//     }
//     action.editLayoutItemBBox(layoutInfo, bbox)
//   }
//   return action;
// }

// function _getNumberFromStyle(style: string){
//   style = (style && style.toString()) || '';
//   const remIndex = style && style.toLowerCase().indexOf('rem');
//   const pxIndex = style && style.toLowerCase().indexOf('px');
//   if(remIndex > -1){
//     style = style.substr(0, remIndex);
//   }else if(pxIndex > -1){
//     style = style.substring(0, pxIndex);
//   }
//   return parseInt(style);
// }