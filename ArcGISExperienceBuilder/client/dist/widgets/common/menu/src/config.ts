import { MenuNavigationProps } from './runtime/menu-navigation';
import { ImmutableObject } from 'seamless-immutable';

export enum MenuType {
  Icon = 'ICON',
  Vertical = 'VERTICAL',
  Horizontal = 'HORIZONTAL'
}

export type IMConfig = ImmutableObject<MenuNavigationProps>;