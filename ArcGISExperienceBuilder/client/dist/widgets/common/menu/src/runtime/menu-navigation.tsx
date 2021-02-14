/** @jsx jsx */
import { React, jsx, ThemeNavType, css, ThemePaper } from 'jimu-core';
import { Navigation, NavigationVariant } from 'jimu-ui';
import { DrawerMenuProps, DrawerMenu } from './drawer-menu';
import { useAvtivePage, useNavigationData, useAnchor, useNavAdvanceStyle } from './utils';
const { useMemo } = React;

export type MenuNavigationType = 'nav' | 'drawer';

export type MenuNavigationStandard = Omit<DrawerMenuProps, 'advanced' | 'variant' | 'paper' | 'data'> & {
  subMenu?: MenuNavigationStandard
}

export interface MenuNavigationProps {
  /**
    * Directions of navigation
    */
  vertical?: boolean;
  /**
   * Type of navigation, optional values:  'nav' | 'drawer';
   */
  type: MenuNavigationType;
  /**
   * Subtypes of each type
   * nav: 'default', 'underline', 'pills'
   * drawer: 'default'
   */
  menuStyle: ThemeNavType;
  /**
   * Configurable parameters for `Navigation` and `DrawerMenu`
   */
  standard?: MenuNavigationStandard;
  /**
   * Whether to enable advanced style (override the style provided by the component in the widget)
   */
  advanced?: boolean;

  paper?: ThemePaper;
  /**
   * Configurable variables in advanced style
   *
   */
  variant?: NavigationVariant;
}

const useStyle = (vertical: boolean) => {
  return useMemo(() => {
    return css`
      width: 100%;
      height: 100%;
      .nav-item {
        &.nav-link {
          width: ${vertical ? '100%' : 'unset'};
          height: ${!vertical ? '100%' : 'unset'};
        }
      }

    `;
  }, [vertical]);
}

export const MenuNavigation = (props: MenuNavigationProps) => {
  const {
    type,
    menuStyle,
    vertical,
    standard,
    advanced,
    paper,
    variant
  } = props;

  const data = useNavigationData();
  const isActive = useAvtivePage();

  const { icon, anchor: _anchor, ...others } = standard;
  const anchor = useAnchor(_anchor);

  const style = useStyle(vertical);

  const navStyle = useNavAdvanceStyle(advanced, menuStyle, variant, vertical);

  return <div className="menu-navigation" css={[style, navStyle]}>
    {type === 'nav' && <Navigation
      data={data}
      vertical={vertical}
      isActive={isActive}
      scrollable={true}
      {...others}
      type={menuStyle} />}
    {type === 'drawer' && <DrawerMenu
      data={data}
      advanced={advanced}
      variant={variant}
      paper={paper}
      type={menuStyle}
      vertical={vertical}
      isActive={isActive}
      scrollable={false}
      icon={icon}
      anchor={anchor}
      {...others}
    />}
  </div>;
}