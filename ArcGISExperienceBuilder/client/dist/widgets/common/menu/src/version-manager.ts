import { BaseVersionManager, ThemeNavType, IMThemeNavVariant, Immutable } from 'jimu-core';
import { IMConfig, MenuType } from './config';

export const DEFAULT_CONFIG = {
  type: 'HORIZONTAL',
  subOpenMode: 'FOLDABLE',
  main: {
    alignment: 'center',
    space: {
      distance: 0,
      unit: 'px'
    },
    showText: true,
    showIcon: false,
    iconPosition: 'start'
  },
  navType: 'default',
  advanced: false
};

const upgradeThemeNavVariant = (variants, type: ThemeNavType): IMThemeNavVariant => {
  if (!variants) return;
  const _variant = variants?.[type];
  if (!_variant) return;
  let variant = _variant as IMThemeNavVariant;
  if (_variant.bg) {
    variant = variant.setIn(['root', 'bg'], _variant.bg);
    variant = (variant as any).without('bg');
  }
  return variant;
}

const getSubmenuMode = (menuType: MenuType, subOpenMode: 'EXPAND' | 'FOLDABLE') => {
  if (menuType === MenuType.Horizontal) {
    return 'dropdown';
  } else {
    return subOpenMode === 'EXPAND' ? 'static' : 'foldable'
  }
}

const upgradeOnePointOne = (oldConfig): IMConfig => {
  if (!oldConfig) return;
  const _config = oldConfig;

  const config = Immutable({}) as IMConfig;

  const type = _config.type === MenuType.Icon ? 'drawer' : 'nav';
  const menuStyle = _config.navType;
  const vertical = _config.type !== MenuType.Horizontal;

  const icon = _config?.icon;
  const anchor = _config?.drawerDirection;
  const submenuMode = getSubmenuMode(_config.type, _config.subOpenMode);
  const textAlign = _config?.main?.alignment;
  const showText = _config?.main?.showText;
  const showIcon = _config?.main?.showIcon;
  const iconPosition = _config?.main?.iconPosition;
  const space = _config?.main?.space ?? { distance: 0, unit: 'px' };
  const gap = `${space?.distance}${space?.unit}`;
  const standard = { icon, anchor, submenuMode, textAlign, showIcon, showText, iconPosition, gap };

  const advanced = _config.advanced;
  const paper = _config.paper;

  const variant = upgradeThemeNavVariant(_config?.main?.variants, _config.navType);

  return config.set('type', type)
    .set('menuStyle', menuStyle)
    .set('vertical', vertical)
    .set('standard', standard)
    .set('advanced', advanced)
    .set('paper', paper)
    .set('variant', variant)
}

class VersionManager extends BaseVersionManager {
  versions = [{
    version: '1.0.0',
    description: 'The first release.',
    upgrader: (oldConfig) => {
      if (!oldConfig) return DEFAULT_CONFIG;

      let newConfig = oldConfig;

      if (oldConfig?.main?.variants) {
        newConfig = newConfig.set('advanced', true);
      }

      return newConfig;
    }
  }, {
    version: '1.1.0',
    description: 'Version manager for release 1.1',
    upgrader: (oldConfig: IMConfig) => {
      return upgradeOnePointOne(oldConfig || DEFAULT_CONFIG);
    }
  }]
}

export const versionManager = new VersionManager();