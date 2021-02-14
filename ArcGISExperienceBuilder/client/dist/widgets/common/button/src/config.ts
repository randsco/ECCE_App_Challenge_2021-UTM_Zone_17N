import {ImmutableObject, Expression, ThemeButtonType, IconProps} from 'jimu-core';
import {LinkParam} from 'jimu-ui/advanced/setting-components';
import {StyleSettings} from 'jimu-ui';

export type IMConfig = ImmutableObject<Config>;

export interface Config{
  functionConfig: FunctionConfig;
  styleConfig?: StyleConfig;
}

export interface FunctionConfig{
  toolTip?: string;
  text?: string;
  icon?: IconConfig;
  textExpression?: Expression;
  toolTipExpression?: Expression;
  linkParam?: LinkParam;
}

export enum IconPosition{
  Left = 'LEFT',
  Right = 'RIGHT'
}

export interface IconConfig{
  data: string;
  position: IconPosition;
}

export interface StyleConfig{
  useCustom: boolean;
  themeStyle?: ThemeStyle;
  customStyle?: CustomStyle;
}

export interface ThemeStyle{
  quickStyleType: ThemeButtonType;
}

export interface CustomStyle{
  regular: AdvanceStyleSettings;
  hover: AdvanceStyleSettings;
}

export interface AdvanceStyleSettings extends StyleSettings{
  iconProps?: IconProps;
}

export interface WidgetState{
  showQuickStyle?: boolean;
  isConfiguringHover?: boolean;
}

export type IMAdvanceStyleSettings = ImmutableObject<AdvanceStyleSettings>;

export type IMIconProps = ImmutableObject<IconProps>;

export type IMCustomStyle = ImmutableObject<CustomStyle>;

export type IMThemeStyle = ImmutableObject<ThemeStyle>;

export type IMStyleConfig = ImmutableObject<StyleConfig>;

export type IMIconPosition = ImmutableObject<IconPosition>;

export type IMIconConfig = ImmutableObject<IconConfig>;

export type IMWidgetState = ImmutableObject<WidgetState>;
