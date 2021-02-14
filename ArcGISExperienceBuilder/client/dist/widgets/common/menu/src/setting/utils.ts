import { React, themeUtils, ThemeNavType, Immutable } from 'jimu-core';
import { NavigationVariant } from 'jimu-ui';
import { MenuNavigationType } from '../runtime/menu-navigation';
const { useMemo } = React;

export const getMenuNavigationVariant = (type: MenuNavigationType, navStyle: ThemeNavType, showIcon: boolean): NavigationVariant => {
  const variants = themeUtils.getThemeVariablesByCategory('navigation', false);
  let variant = variants.find(_ => _.component === type)?.styles?.[navStyle];

  if(showIcon) {
    const activeColor = navStyle === 'pills' ? 'var(--white)' : 'var(--primary)';

    const mixin = {
      item: {
        default: {
          icon: {
            size: '16px'
          }
        },
        active: {
          icon: {
            color: activeColor,
            size: '16px'
          }
        },
        hover: {
          icon: {
            color: 'var(--primary)',
            size: '16px'
          }
        }
      }
    } as Partial<NavigationVariant>;
    variant = Immutable(variant).merge(mixin, {deep: true});
  }
  return variant;
}

//Get theme navigation variants from theme
export const useMenuNavigationVariant = (type: MenuNavigationType, menuStyle: ThemeNavType, advanced: boolean, advanceVariant: NavigationVariant, showIcon: boolean): NavigationVariant => {
  return useMemo(() => {
    if (advanced) return advanceVariant;
    return getMenuNavigationVariant(type, menuStyle, showIcon)
  }, [advanced, advanceVariant, type, menuStyle, showIcon]);
}