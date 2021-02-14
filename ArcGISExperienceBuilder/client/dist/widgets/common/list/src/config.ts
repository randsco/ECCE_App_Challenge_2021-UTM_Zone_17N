import { ImmutableObject } from 'seamless-immutable';
import { ImageProps, FillType, ImageParam, BorderStyle, FourSidesUnit } from 'jimu-ui';
import { SqlExpression } from 'jimu-core';
import { SortSettingOption, IMLinkParam } from 'jimu-ui/advanced/setting-components';
import { BoxShadowStyle } from 'jimu-ui';

// TODO: move to core
// eslint-disable-next-line  @typescript-eslint/naming-convention
export interface gotoProps {
  views: string[]
}
// eslint-disable-next-line  @typescript-eslint/naming-convention
export interface gotoAction {
  goto: gotoProps;
}

export interface Suggestion {
  suggestionHtml: string | Element;
  suggestion: string
}

export const LIST_CARD_PADDING = 0;
export const LIST_CARD_MIN_SIZE = 20;
export const DS_TOOL_H = 42;
export const BOTTOM_TOOL_H = 40;
export const COMMON_PADDING = 0;
export const DS_TOOL_BOTTOM_PADDING = 14;
export const BOTTOM_TOOL_TOP_PADDING = 14;
export const LIST_TOOL_MIN_SIZE = 175;

interface WidgetHeaderTitle {
  text: string;
  // Add color, size, alignment, etc.
  // Add an option to bind text to a field
}

export interface WidgetHeader {
  title: ImmutableObject<WidgetHeaderTitle>;
  // TODO:
  // Add "action" such as filter
}

export interface ListDivSize {
  clientWidth: number;
  clientHeight: number;
}

interface WidgetStyle {
  id: string;
}
// END: TODO

interface ListItemComponent {
  field: string;
}

export interface ListItemTitleComponent extends ListItemComponent { }
export interface ListItemDescriptionComponent extends ListItemComponent { }
export interface ListItemSelectionModeComponent extends ListItemComponent { }
export interface ListItemImageComponent extends ListItemComponent, ImageProps {}

export enum SelectionModeType {
  None = 'NONE',
  Single = 'SINGLE',
  Multiple = 'MULTIPLE'
}

export enum PageStyle{
  Scroll = 'SCROLL',
  MultiPage = 'MULTIPAGE'
}

export enum AlignType {
  Start = 'FLEX-START',
  Center = 'CENTER',
  End = 'FLEX-END'
}

export enum DirectionType{
  Horizon = 'HORIZON',
  Vertical = 'VERTICAL'
}

export enum PageTransitonType {
  Glide = 'GLIDE',
  Fade = 'FADE',
  Float = 'FLOAT'
}

export enum HoverType {
  Hover0 = 'HOVER0',
  Hover1 = 'HOVER1',
  Hover2 = 'HOVER2',
  Hover3 = 'HOVER3',
}

export enum SelectedStyle{
  Style0 = 'STYLE0',
  Style1 = 'STYLE1',
  Style2 = 'STYLE2',
  Style3 = 'STYLE3',
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
}

export enum Status{
  Regular = 'REGULAR',
  Selected = 'SELECTED',
  Hover = 'HOVER'
}

export interface CardSize{
  height: number,
  width: number
}

export interface DeviceCardSize {
  [deviceMode: string]: CardSize;
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
  enable?: boolean,
  selectionMode?: SelectionModeType,
  cardSize?: DeviceCardSize
}

export interface Config {
  pageTransition?: PageTransitonType;
  hoverType?: HoverType;
  selectedStyle?: SelectedStyle;
  differentOddEven?: boolean;
  itemStyle?: ItemStyle;
  isItemStyleConfirm?: boolean;
  direction?: DirectionType;
  alignType?: AlignType;
  space?: number;
  itemsPerPage?: number;
  pageStyle?: PageStyle;
  scrollBarOpen?: boolean;
  navigatorOpen?: boolean;
  scrollStep?: number;
  style?: ImmutableObject<WidgetStyle>;
  isInitialed?: boolean;
  lockItemRatio?: boolean;
  showSelectedOnlyOpen?: boolean;
  showClearSelected?: boolean;

  //link
  linkParam?: IMLinkParam;

  //search
  searchOpen?: boolean;
  searchFields?: string;
  searchExact?: boolean;
  //filter
  filterOpen?: boolean;
  filter?: SqlExpression;
  //sort
  sortOpen?: boolean;
  sorts?: Array<SortSettingOption>

  //card background
  cardConfigs?: ImmutableObject<{ [status: string]: CardConfig }>;
  searchHint?: string;
}

export type IMConfig = ImmutableObject<Config>;