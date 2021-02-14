import {
  React, ReactRedux, IMState, ImmutableArray, css, polished, appActions, SectionNavInfo,
  Immutable, ThemeSliderVariant, LinkType, lodash, getIndexFromProgress, getAppStore, LayoutItemType
} from 'jimu-core';
const { useEffect, useMemo, useCallback } = React;
const { useSelector, useDispatch } = ReactRedux;
import { ViewType } from '../config';
import { ViewNavigationType, ViewNavigationDisplay } from './components/view-navigation';
import { NavigationItem, hooks, componentStyleUtils, styleUtils, NavigationVariant, NavIconButtonGroupVariant,
  IconPosition, utils, TextAlignValue, defaultMessages as jimuDefaultMessage } from 'jimu-ui';
import defaultMessages from './translations/default';
import { searchUtils } from 'jimu-layouts/layout-runtime';
const dotIcon = require('jimu-ui/lib/icons/navigation/dot.svg');
const leftArrowIcon = require('jimu-ui/lib/icons/arrow-left-12.svg');
const rightArrowIcon = require('jimu-ui/lib/icons/arrow-right-12.svg');

const MIN_SIZE = 16;

const addFloatNumber = (base: number, increase: number): number => {
  const magnification = 100;
  const baseInt = base * magnification;
  const increaseInt = increase * magnification;
  return (baseInt + increaseInt) / magnification;
}

export const useWidgetStyle = (vertical: boolean) => {
  return useMemo(() => {
    return css`
    overflow: hidden;
    min-height: ${vertical ? polished.rem(MIN_SIZE) : 'unset'};
    min-width: ${!vertical ? polished.rem(MIN_SIZE) : 'unset'};
  `;
  }, [vertical]);
}

export const useContainerSections = (id: string): string[] => {
  const layouts = ReactRedux.useSelector((state: IMState) => state?.appConfig?.layouts);

  const sections = ReactRedux.useSelector((state: IMState) =>state?.appConfig?.sections);

  const sizeMode = ReactRedux.useSelector((state: IMState) => state?.browserSizeMode);

  return React.useMemo(() => {
    const appConfig = getAppStore().getState().appConfig;
    return searchUtils.getContentsInTheSameContainer(appConfig, id, LayoutItemType.Widget, LayoutItemType.Section, sizeMode) || [];
    // We listen for changes in appConfig.sections and appConfig.layouts instead of appConfig, which can reduce the number of times we re render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sizeMode, sections, layouts]);
}

/**
 * Get currentPageId from appRuntimeInfo or get defaultPageId from appConfig.pages
 * @param pages
 */
const useCurrentPageId = () => {
  return useSelector((state: IMState) => {
    const pages = state.appConfig.pages;
    const defaultPageId = Object.keys(pages).find(pId => pages?.[pId]?.isDefault);
    const currentPageId = state.appRuntimeInfo.currentPageId;
    return currentPageId || defaultPageId;
  });
}
/**
 * Get view id from NavigationItem
 * @param item
 */
export const getViewId = (item: NavigationItem): string => {
  if (!item?.value) return '';
  const splits = item.value.split(',');
  return splits?.length ? splits[1] : '';
}

/**
 * When `appMode` changed, close quick style planel
 * @param widgetId
 */
export const useAppModeChange = (widgetId: string) => {
  const dispatch = useDispatch();
  const appMode = useSelector((state: IMState) => utils.isWidgetSelected(widgetId, state) ?  state.appRuntimeInfo.appMode : null);
  hooks.useUpdateEffect(() => {
    dispatch(appActions.widgetStatePropChange(widgetId, 'showQuickStyle', false));
  }, [appMode, widgetId]);
}

/**
 * When the views of specified section changed, trigger a callback function
 * @param section
 * @param callback
 */
export const useSectionViewsChange = (section: string, callback: (views?: ImmutableArray<string>) => void) => {
  const views = useSelector((state: IMState) => state?.appConfig?.sections?.[section]?.views);
  const { current: isInBuilder } = React.useRef(getAppStore().getState().appContext.isInBuilder);
  const callbackRef = hooks.useRefValue(callback);
  useEffect(() => {
    isInBuilder && callbackRef.current?.(views);
  }, [views, callbackRef, isInBuilder]);
}

/**
 * When widget container sections changed, trigger a callback function
 * @param id Widget id
 * @param callback
 */
export const useContainerSectionChange = (id: string, callback: (sections: string[]) => void) => {
  const sections = useContainerSections(id);
  const callbackRef = hooks.useRefValue(callback);
  const { current: isInBuilder } = React.useRef(getAppStore().getState().appContext.isInBuilder);
  //When the sections are changed, check whether the current section is in the sections.
  //If not, set the sections[0] as config.data.section
  useEffect(() => {
    isInBuilder && callbackRef.current?.(sections);
  }, [sections, isInBuilder, callbackRef]);
}

/**
 * When widget selected state changed to is false, close quick style planel
 * @param widgetId
 * @param callback
 */
export const useWidgetSelectedChange = (widgetId: string) => {
  const selected = hooks.useWidgetSelected(widgetId);
  const dispatch = useDispatch();
  hooks.useUpdateEffect(() => {
    if(!selected){
      dispatch(appActions.widgetStatePropChange(widgetId, 'showQuickStyle', false));
    }
  }, [selected, widgetId]);
}

/**
 * Get next(previous) `SectionNavInfo`
 * @param section
 * @param nextViewId
 */
const getNextNavInfo = (previous: boolean, currentViewId: string, views: ImmutableArray<string> = Immutable([]), visibleViews: ImmutableArray<string>): SectionNavInfo => {
  let currentIndex = views.indexOf(currentViewId);
  currentIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = previous ? Math.max(0, currentIndex - 1) : Math.min(views.length - 1, currentIndex + 1);
  const nextViewId = views[nextIndex];

  return Immutable({ visibleViews }).set('previousViewId', currentViewId)
    .set('currentViewId', nextViewId)
    .set('useProgress', false)
    .set('progress', views.indexOf(nextViewId) / (views.length - 1)) as any
};

/**
 * Return a function to change `SectionNavInfo` with previous or next view id(when step is 1) or progress (when step is 0 - 1)
 * @param section
 */
export const useSwitchView = (section: string) => {
  const dispatch = useDispatch();
  return useCallback((previous: boolean, step: number) => {
    const state = getAppStore()?.getState();
    const views = state.appConfig.sections?.[section]?.views;
    const sectionNavInfo = state?.appRuntimeInfo?.sectionNavInfos?.[section];
    const currentViewId = sectionNavInfo?.currentViewId;
    const visibleViews = sectionNavInfo?.visibleViews;
    const progress = sectionNavInfo?.progress ?? 0;

    let nextNavInfo = null;
    if (step === 1) {
      nextNavInfo = getNextNavInfo(previous, currentViewId, views, visibleViews);
    } else {
      const nextProgress = previous ? Math.max(addFloatNumber(progress, -(step / (views.length - 1))), 0) : Math.min(addFloatNumber(progress, step / (views.length - 1)), 1);
      nextNavInfo = getProgressNavInfo(nextProgress, views, visibleViews);
    }
    dispatch(appActions.sectionNavInfoChanged(section, nextNavInfo));
  }, [dispatch, section]);
}

/**
 * Get `SectionNavInfo` by new progress
 * @param section
 * @param progress
 */
export const getProgressNavInfo = (progress: number, views: ImmutableArray<string> = Immutable([]), visibleViews: ImmutableArray<string>): SectionNavInfo => {
  const result = getIndexFromProgress(progress, views.length);

  return Immutable({ visibleViews }).set('previousViewId', views[result.previousIndex])
    .set('currentViewId', views[result.currentIndex])
    .set('useProgress', true)
    .set('progress', progress) as any;
}

/**
 * Return a function to change `SectionNavInfo` by new progress
 * @param section
 */
export const useUpdateProgress = (section: string) => {
  const dispatch = useDispatch();
  return useCallback((progress: number) => {
    const state = getAppStore()?.getState();
    const views = state.appConfig.sections?.[section]?.views;
    const visibleViews = state.appRuntimeInfo?.sectionNavInfos?.[section]?.visibleViews;
    const nevInfo = getProgressNavInfo(progress, views, visibleViews) as SectionNavInfo;
    dispatch(appActions.sectionNavInfoChanged(section, nevInfo));
  }, [dispatch, section])
}

/**
 * Generate component styles to override the default
 * @param type
 * @param navStyle
 * @param advanced
 * @param variant
 * @param vertical
 */
export const useAdvanceStyle = (type: ViewNavigationType, navStyle: string, advanced: boolean, variant, vertical?: boolean, hideThumb?: boolean) => {
  return useMemo(() => {
    if (!advanced || !variant) return css``;
    const isRTL = getAppStore()?.getState()?.appContext?.isRTL;
    if (type === 'nav') return navAdvanceStyle(navStyle, variant as NavigationVariant, vertical, isRTL);
    if (type === 'navButtonGroup') return navButtonGroupAdvanceStyle(variant as NavIconButtonGroupVariant);
    if (type === 'slider') return sliderAdvanceStyle(variant as ThemeSliderVariant, hideThumb, isRTL);
    return css``;
  }, [advanced, type, navStyle, variant, vertical, hideThumb]);
}

const navAdvanceStyle = (navStyle: string, variant: NavigationVariant, vertical?: boolean, isRTL?: boolean) => {
  return css`
    .jimu-nav{
      ${componentStyleUtils.nav.getRootStyles((variant as any)?.root)};
      ${componentStyleUtils.nav.getVariantStyles(navStyle as any, variant as any, vertical, isRTL)};
      ${styleUtils.getButtonStyleByState(variant?.item, true)}
    }
`;
}

const navButtonGroupAdvanceStyle = (variant: NavIconButtonGroupVariant) => {
  return css`
    .nav-button-group {
      ${componentStyleUtils.navButtonGroup.getVariantStyles(variant as any)};
      ${styleUtils.getButtonStyleByState(variant?.item, false)}
    }
 `
}

const sliderAdvanceStyle = (variant: ThemeSliderVariant, hideThumb: boolean, isRTL?: boolean) => {
  return css`
   > .jimu-slider {
    ${componentStyleUtils.slider.getRootStyles(variant?.root)};
    ${componentStyleUtils.slider.getVariantStyles(variant, hideThumb, isRTL)};
   }
 `;
}
/**
 * When the container sections are changed, check whether the current section is in the sections,
 * if not, set the sections[0] as  config.data.section
 * @param id
 * @param config
 * @param getAppConfigAction
 */
export const useHandleSectionsChange = (id: string, getAppConfigAction) => {
  return useCallback((sections: string[]) => {
    const config = getAppStore().getState().appConfig.widgets[id].config;
    const section = config?.data?.section;
    if (sections?.indexOf(section) === -1) {
      if (!section && !sections?.[0]) return;
      getAppConfigAction().editWidgetProperty(id, 'config', config.setIn(['data', 'section'], sections?.[0])).exec(false);
    }
  }, [getAppConfigAction, id])
}

/**
 * When views changed, if `ViewType` is `auto`, set all views to config
 * if `custom` and `config.views` is in current views, keep them, otherwise, clear config.views
 * @param id
 * @param config
 * @param getAppConfigAction
 */
export const useHandleViewsChange = (id: string, getAppConfigAction) => {
  return useCallback((views: string[] | ImmutableArray<string>) => {
    const config = getAppStore().getState().appConfig.widgets[id].config;
    const viewType = config?.data?.type;
    const vs = viewType === ViewType.Custom ? config?.data?.views?.filter(view => views?.indexOf(view) > -1) : views;
    if(!vs?.length && !config?.data?.views?.length) return;
    if (!lodash.isDeepEqual(vs, config?.data?.views)) {
      getAppConfigAction().editWidgetProperty(id, 'config', config.setIn(['data', 'views'], vs)).exec(false);
    }
  }, [getAppConfigAction, id]);
}

/**
 * Generate navigation data by view ids
 * @param views
 */
export const useNavigationLinks = (views: ImmutableArray<string>): ImmutableArray<NavigationItem> => {
  const viewJsons = useSelector((state: IMState) => state.appConfig.views);
  const pageId = useCurrentPageId();

  return React.useMemo(() => {
    return views?.map((view: string) => {
      const label = viewJsons?.[view]?.label;
      return {
        name: label,
        linkType: LinkType.View,
        value: `${pageId},${view}`
      } as NavigationItem;
    }) ?? Immutable([]);

  }, [pageId, viewJsons, views])
}

/**
 * When the type is `ViewType.Auto`, we use the latest section views. Otherwise, we use the views of config
 * @param section
 * @param configViews
 * @param type
 */
export const useNavigationViews = (section: string, configViews: ImmutableArray<string>, type: ViewType): ImmutableArray<string> => {
  const views = useSelector((state: IMState) => state?.appConfig?.sections?.[section]?.views);
  return React.useMemo(() => {
    const _Views = ((type === ViewType.Custom ? configViews : views) || Immutable([])).asMutable();
    _Views.sort((a, b) => {
      return views?.indexOf(a) - views?.indexOf(b);
    });
    return Immutable(_Views);
  }, [configViews, views, type]);
}

/**
 * Automatically display quick style panel for the newly added navigation widget
 * @param widgetId
 */
export const useQuickStyleOpen = (widgetId: string) => {
  const selected = hooks.useWidgetSelected(widgetId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selected) {
      dispatch(appActions.widgetStatePropChange(widgetId, 'showQuickStyle', true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * Generate a key for a view navigation config
 * @param display
 */
export const generateDisplayKey = (display: Partial<ViewNavigationDisplay>) => {
  const { type, navStyle } = display || {};
  const { showIcon, showText, alternateIcon, showPageNumber } = display?.standard ?? {};

  if (display.type === 'nav') {
    const { filename } = alternateIcon?.properties ?? {};
    return `${type}-${navStyle}-${showIcon ? 'showIcon' : 'hideIcon'}-${showText ? 'showText' : 'hideText'}-icon-${filename}`;
  } else if (type === 'navButtonGroup') {
    return `${type}-${navStyle}-${showPageNumber ? 'showPageNumber' : ''}`;
  }
}

export type NavTemplate = Partial<ViewNavigationDisplay> & {
  label: string;
}

/**
 * Generate view navigation display array for quick-style
 */
export const useNavTemplates = (isInBuilder: boolean): NavTemplate[] => {
  const translate = hooks.useTranslate([jimuDefaultMessage, defaultMessages]);
  return useMemo(() => {
    if(!isInBuilder) return;
    return [{
      label: translate('tabDefault'),
      type: 'nav',
      navStyle: 'default',
      standard: {
        gap:'0px',
        scrollable: true,
        showIcon: false,
        showText: true,
        iconPosition: 'start' as IconPosition,
        textAlign: TextAlignValue.CENTER
      }
    }, {
      label: translate('tabUnderline'),
      type: 'nav',
      navStyle: 'underline',
      standard: {
        gap:'0px',
        scrollable: true,
        showIcon: false,
        showText: true,
        iconPosition: 'start' as IconPosition,
        textAlign: TextAlignValue.CENTER
      }
    }, {
      label: translate('tabPills'),
      type: 'nav',
      navStyle: 'pills',
      standard: {
        gap:'0px',
        scrollable: true,
        showIcon: false,
        showText: true,
        iconPosition: 'start' as IconPosition,
        textAlign: TextAlignValue.CENTER
      }
    }, {
      label: translate('symbol'),
      type: 'nav',
      navStyle: 'default',
      standard: {
        scrollable: false,
        gap: '10px',
        showIcon: true,
        alternateIcon: utils.toIconResult(dotIcon, 'dot-6', 8),
        activedIcon: utils.toIconResult(dotIcon, 'dot-10', 8),
        showText: false,
        iconPosition: 'start' as IconPosition,
        textAlign: TextAlignValue.CENTER
      }
    }, {
      label: translate('slider'),
      type: 'slider',
      navStyle: 'default',

    }, {
      label: translate('arrow1'),
      type: 'navButtonGroup',
      navStyle: 'default',
      standard: {
        showPageNumber: true,
        previousText: '',
        previousIcon: utils.toIconResult(leftArrowIcon, 'left-arrow-12', 12),
        nextText: '',
        nextIcon: utils.toIconResult(rightArrowIcon, 'right-arrow-12', 12)
      }
    }, {
      label: translate('arrow2'),
      type: 'navButtonGroup',
      navStyle: 'tertiary',
      standard: {
        previousText: translate('prev'),
        previousIcon: utils.toIconResult(leftArrowIcon, 'left-arrow-12', 12),
        nextText: translate('next'),
        nextIcon: utils.toIconResult(rightArrowIcon, 'right-arrow-12', 12),
      }
    }, {
      label: translate('arrow3'),
      type: 'navButtonGroup',
      navStyle: 'tertiary',
      standard: {
        showPageNumber: true,
        previousText: '',
        previousIcon: utils.toIconResult(leftArrowIcon, 'left-arrow-12', 12),
        nextText: '',
        nextIcon: utils.toIconResult(rightArrowIcon, 'right-arrow-12', 12),
      }
    }]
  }, [translate, isInBuilder])
};