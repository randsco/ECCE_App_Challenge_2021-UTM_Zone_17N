import { React, ImmutableArray, Immutable, themeUtils, ReactRedux, IMState, getAppStore, LayoutItemType } from 'jimu-core';
import { MultiSelectItem, NavigationVariant } from 'jimu-ui';
import { ViewNavigationType, ViewNavigationVariant } from '../runtime/components/view-navigation';
import { searchUtils } from 'jimu-layouts/layout-runtime';
const { useMemo } = React;
const END_NUMBER_REGEXP = /\d+$/;

export const getAppConfig = () => getAppStore().getState().appStateInBuilder.appConfig;

export const toMultiSelectItems = (views: string[]): MultiSelectItem[] => {
  const appConfig = getAppConfig();
  return views?.map(value => {
    const label = appConfig.views?.[value]?.label;
    return {
      label,
      value
    }
  }) ?? [];
}

export const getEndNumber = (string: string) => {
  const match = string.match(END_NUMBER_REGEXP);
  return match?.[0] ? Number(match[0]) : 0;
}

//Get the label of section
export const getSectionLabel = (sectionId: string): string => {
  const appConfig = getAppConfig();
  return appConfig?.sections?.[sectionId]?.label ?? '';
}

//Convert views to the data of multi-select component
export const getViewSelectItems = (views): ImmutableArray<MultiSelectItem> => {
  const selectItems = toMultiSelectItems(views);
  return Immutable(selectItems);
}

export const getViewNavigationVariant = (type: ViewNavigationType, navStyle: string, showIcon:boolean): ViewNavigationVariant => {
  const variants = themeUtils.getThemeVariablesByCategory('navigation', false);
  let variant = variants.find(_ => _.component === type)?.styles?.[navStyle];
  if(type === 'nav' && navStyle === 'default' && showIcon) {
    const mixin = {
      item: {
        default: {
          icon: {
            size: '8px'
          }
        },
        active: {
          icon: {
            color: 'var(--primary)',
            size: '8px'
          }
        },
        hover: {
          icon: {
            color: 'var(--primary)',
            size: '8px'
          }
        }
      }
    } as Partial<NavigationVariant>;
    variant = Immutable(variant).merge(mixin, {deep: true});
  }
  return variant;
}

//Get theme navigation variants from theme
export const useViewNavigationVariant = (type: ViewNavigationType, navStyle: string, advanced: boolean, advanceVariant: ViewNavigationVariant, showIcon:boolean): ViewNavigationVariant => {
  return useMemo(() => {
    if (advanced) return advanceVariant;
    return getViewNavigationVariant(type, navStyle, showIcon);
  }, [advanced, advanceVariant, type, navStyle, showIcon]);
}

export const useContainerSections = (id: string): string[] => {
  const layouts = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.appConfig?.layouts);

  const sections = ReactRedux.useSelector((state: IMState) =>state?.appStateInBuilder?.appConfig?.sections);

  const sizeMode = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.browserSizeMode);

  return React.useMemo(() => {
    const appConfig = getAppStore().getState().appStateInBuilder.appConfig;
    return searchUtils.getContentsInTheSameContainer(appConfig, id, LayoutItemType.Widget, LayoutItemType.Section, sizeMode) || [];
    // We listen for changes in appConfig.sections and appConfig.layouts instead of appConfig, which can reduce the number of times we re render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sizeMode, sections, layouts]);
}

export const useSectionViews = (section?: string) => {
  return ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.appConfig?.sections?.[section]?.views);
}
