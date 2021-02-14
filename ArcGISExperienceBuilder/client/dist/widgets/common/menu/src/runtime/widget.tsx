import { React, AllWidgetProps } from 'jimu-core';
import { IMConfig } from '../config';
import { versionManager } from '../version-manager';
import { MenuNavigation, MenuNavigationProps } from './menu-navigation';

type MenuProps = AllWidgetProps<IMConfig>;

const Widget = (props: MenuProps) => {
  const { config } = props;

  return <div className="widget-menu jimu-widget">
    <MenuNavigation {...config as MenuNavigationProps} />
  </div>
}

Widget.versionManager = versionManager;

export default Widget;
