import {ThemeButtonType, IconProps, ThemeVariables, Immutable} from 'jimu-core';
import {styleUtils} from 'jimu-ui';

export function getIconPropsFromTheme(isRegular: boolean, type: ThemeButtonType, theme: ThemeVariables): IconProps{
  const status = isRegular ? 'default' : 'hover';
  const t = Immutable(theme);
  const color = t.getIn(['components', 'button', 'variants', type, status, 'color']);
  const size = t.getIn(['components', 'button', 'sizes', 'default', 'fontSize']);
  const iconProps = {
    color,
    size: parseFloat(styleUtils.remToPixel(size as string)),
  } as IconProps;

  return iconProps;
}