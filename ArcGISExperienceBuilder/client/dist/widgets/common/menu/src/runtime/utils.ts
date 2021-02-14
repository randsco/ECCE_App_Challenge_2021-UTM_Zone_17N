import { React, ReactRedux, ThemeNavType, css, ThemePaper, getAppStore } from 'jimu-core';
import { IMPageJson, ImmutableArray, ImmutableObject, PageType, LinkType, PageJson, Immutable, IMState, BrowserSizeMode } from 'jimu-core';
import { LinkTarget, NavigationItem, AnchorDirection, componentStyleUtils, NavigationVariant, styleUtils, utils } from 'jimu-ui';
const { useState, useEffect, useMemo } = React;
const { useSelector } = ReactRedux;
const isRTL = getAppStore().getState().appContext.isRTL;
const normalIcon = require('jimu-ui/lib/icons/toc-page.svg');
const linkIcon = require('jimu-ui/lib/icons/toc-link.svg');
const folderIcon = require('jimu-ui/lib/icons/toc-folder.svg');

const icons = { [PageType.Normal]: normalIcon, [PageType.Link]: linkIcon, [PageType.Folder]: folderIcon };

type PageStructureItem = { [pageId: string]: string[] };
type IMPageStructure = ImmutableArray<PageStructureItem>;

type Pages = { [pageId: string]: PageJson };
type IMpages = ImmutableObject<Pages>;

/**
 * Filter out hidden pages
 * @param pageStructure
 * @param pages
 */
export const filterPageStructure = (pageStructure: IMPageStructure, pages: IMpages): IMPageStructure => {

  pageStructure = pageStructure.filter(item => {
    const id = Object.keys(item)[0];
    const info = pages?.[id];
    return info.isVisible;
  });

  return pageStructure.map(item => {
    const entries = Object.entries(item)[0];
    const id = entries[0];
    let subs = entries[1];
    subs = subs.filter(id => {
      const info = pages?.[id];
      return info.isVisible;
    });
    return item.set(id, subs) as any;
  });

}

/**
 * Generate the data of menu navigation
 * @param pageStructure
 * @param pages
 */
export const getMenuNavigationData = (pageStructure: IMPageStructure, pages: IMpages): ImmutableArray<ImmutableObject<NavigationItem>> => {
  pageStructure = filterPageStructure(pageStructure, pages);
  return pageStructure.map(item => {
    const entries = Object.entries(item)[0];
    const id = entries[0];
    const subs = entries[1];
    const info = pages[id];
    const navItem = getMenuNavigationItem(info);

    const subNavItems = subs.map(subPageId => {
      const info = pages[subPageId];
      return getMenuNavigationItem(info);
    });
    return navItem.set('subs', subNavItems);
  });
}

const getMenuNavigationItem = (page: IMPageJson): ImmutableObject<NavigationItem> => {
  const linkType = getLinkType(page);
  const value = getLinkValue(page);
  const icon = page.icon || icons[page.type];

  return Immutable({
    linkType,
    value,
    icon: Object.prototype.toString.call(icon) === '[object Object]' ? icon : utils.toIconResult(icon, page.type, 16),
    target: page.openTarget as LinkTarget,
    name: page.label
  })
}

const getLinkType = (page: IMPageJson) => {
  if (page.type === PageType.Link) {
    return LinkType.WebAddress;
  } else if (page.type === PageType.Normal) {
    return LinkType.Page;
  } else if(page.type === PageType.Folder) {
    return LinkType.None;
  }
}

const getLinkValue = (page: IMPageJson) => {
  if (page.type === PageType.Link) {
    return page.linkUrl;
  } else if (page.type === PageType.Normal) {
    return page.id;
  } else if (page.type === PageType.Folder) {
    return '#';
  }
}

/**
 * Get page id from `NavigationItem`
 * @param item
 */
export const getPageId = (item: NavigationItem): string => {
  if (!item?.value) return '';
  const splits = item.value.split(',');
  return splits?.length ? splits[0] : '';
}

/**
 * Return a function to check navigation item is actived or not
 */
export const useAvtivePage = () => {
  const currentPageId = useSelector((state: IMState) => state?.appRuntimeInfo?.currentPageId);
  return React.useCallback((item: NavigationItem) => {
    return getPageId(item) === currentPageId;
  }, [currentPageId]);
}

/**
 * Listen page info and update menu navigation data
 */
export const useNavigationData = (): NavigationItem[] => {
  const [data, setData] = useState<NavigationItem[]>([]);
  const pages = useSelector((state: IMState) => state?.appConfig?.pages);
  const pageStructure = useSelector((state: IMState) => state?.appConfig?.pageStructure);

  useEffect(() => {
    const data = getMenuNavigationData(pageStructure, pages);
    setData(data as any);
  }, [pages, pageStructure]);

  return data;
}

/**
 * When run in small device, set anchor as 'full'
 * @param anchor
 */
export const useAnchor = (anchor: AnchorDirection): AnchorDirection => {
  return useSelector((state: IMState) => state?.browserSizeMode === BrowserSizeMode.Small ? 'full' : anchor )
}

/**
 * Generate style to override the default style of navigation component
 * @param menuStyle
 * @param variant
 * @param vertical
 */
export const useNavAdvanceStyle = (advanced: boolean, menuStyle: ThemeNavType, variant: NavigationVariant, vertical?: boolean) => {
  return useMemo(() => {
    if (!advanced) return css``;
    return css`
    .jimu-nav,
    &.jimu-nav {
      ${componentStyleUtils.nav.getRootStyles((variant as any)?.root)};
      ${componentStyleUtils.nav.getVariantStyles(menuStyle as any, variant as any, vertical, isRTL)};
      ${styleUtils.getButtonStyleByState(variant?.item, true)}
    }
`;
  }, [advanced, menuStyle, variant, vertical]);
}

/**
 * Generate style to override the default style of drawer component
 * @param advanced
 * @param variant
 * @param paper
 */
export const useDrawerAdvanceStyle = (advanced: boolean, variant: NavigationVariant, paper: ThemePaper) => {
  const bg = paper?.bg;
  const color = variant?.item?.default?.color;

  return useMemo(() => {
    if (!advanced) return css``;
    return css`
      .paper {
        background: ${bg};
        .header {
          color:  ${color};
        }
      }
    `;
  }, [advanced, bg, color]);
}

