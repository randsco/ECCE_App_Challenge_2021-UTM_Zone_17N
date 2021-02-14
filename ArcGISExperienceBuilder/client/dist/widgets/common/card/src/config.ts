import { ImmutableObject } from 'seamless-immutable';
import { FillType, BorderStyle, ImageParam, FourSidesUnit } from 'jimu-ui';
import { IMLinkParam } from 'jimu-ui/advanced/setting-components';
import { BoxShadowStyle } from 'jimu-ui';
import { AnimationSetting, TransitionType, TransitionDirection } from 'jimu-core';

export const defaultTransitionInfo = {
  transition: {
    type: TransitionType.None,
    direction: TransitionDirection.Horizontal
  },
  oneByOneEffect: null
}

interface WidgetStyle {
  id: string;
}

export enum ItemStyle{
  Style0 = 'STYLE0',
  Style1 = 'STYLE1',
  Style2 = 'STYLE2',
  Style3 = 'STYLE3',
  Style4 = 'STYLE4',
  Style5 = 'STYLE5',
  Style6 = 'STYLE6',
  Style7 = 'STYLE7',
  Style8 = 'STYLE8',
  Style9 = 'STYLE9',
  Style10 = 'STYLE10',
}

export enum Status{
  Regular = 'REGULAR',
  Hover = 'HOVER'
}

export enum Direction{
  Horizontal = 'Horizontal',
  Vertical   = 'Vertical'
}

export interface CardBackgroundStyle {
  background: {
    color: string,
    fillType: FillType,
    image: ImageParam,
  },
  border: BorderStyle,
  borderRadius: FourSidesUnit,
  boxShadow: BoxShadowStyle
}

export interface CardConfig{
  backgroundStyle?: CardBackgroundStyle,
  enable?: boolean;
}

export interface Transition {
  type: TransitionType,
  direction: TransitionDirection
}

interface TransitionInfo{
  transition: Transition;
  oneByOneEffect: AnimationSetting;
  previewId: symbol;
}

export interface Config {
  builderStatus: Status,
  itemStyle?: ItemStyle;
  style?: ImmutableObject<WidgetStyle>;
  //link
  linkParam?: IMLinkParam;

  isItemStyleConfirm?: boolean;// Is Confirm select template
  isInitialed?: boolean;
  isOpenAdvabceSetting?: boolean;
  REGULAR: ImmutableObject<CardConfig>;
  HOVER: ImmutableObject<CardConfig>;
  direction?: Direction;
  transitionInfo?: TransitionInfo;
}

export type IMConfig = ImmutableObject<Config>;