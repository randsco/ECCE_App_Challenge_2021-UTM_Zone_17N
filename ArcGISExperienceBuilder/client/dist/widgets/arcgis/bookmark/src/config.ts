import { ImmutableObject } from 'seamless-immutable';
import { ImageParam, ImageFillMode } from 'jimu-ui';
import { AnimationSetting, TransitionType, TransitionDirection } from 'jimu-core';

interface WidgetStyle {
  id: string;
}

export enum DirectionType{
  Horizon = 'HORIZON',
  Vertical = 'VERTICAL'
}

export enum PageStyle{
  Scroll = 'SCROLL',
  Paging = 'PAGING'
}

export enum DisplayType{
  All = 'ALL',
  Selected = 'SELECTED'
}

export enum TemplateType{
  Card = 'CARD',
  List = 'LIST',
  Slide1 = 'SLIDE1',
  Slide2 = 'SLIDE2',
  Slide3 = 'SLIDE3',
  Gallery = 'GALLERY',
  Navigator = 'NAVIGATOR',
  Custom1 = 'CUSTOM1',
  Custom2 = 'CUSTOM2',
}

export enum Status{
  Default = 'DEFAULT',
  Regular = 'REGULAR',
  Hover = 'HOVER'
}

export enum ImgSourceType{
  Snapshot = 'SNAPSHOT',
  Custom = 'CUSTOM',
}

export interface Transition{
  type: TransitionType;
  direction: TransitionDirection;
}

export interface TransitionInfo{
  transition: Transition;
  effect: AnimationSetting;
  oneByOneEffect: AnimationSetting;
  previewId: symbol;
}

export interface LayersConfig{
  [layerId: string]: {
    visibility?: boolean;
    layers?: LayersConfig;
  }
}

export interface Bookmark {
  id: number | string;
  name: string;
  title?: string;
  description?: string;
  type: string;
  imgParam?: ImageParam;
  snapParam?: ImageParam;
  imagePosition?: ImageFillMode;
  imgSourceType?: ImgSourceType;
  extent?: __esri.Extent,
  viewpoint?: __esri.Viewpoint,
  graphics?: __esri.Graphic[];
  showFlag?: boolean;
  mapViewId: string;
  mapDataSourceId: string;
  customLayout?: any;
  runTimeFlag?: boolean;
  mapOriginFlag?: boolean;
  visibleLayers?: any[];
  layoutId?: string;
  layoutName?: string;
  layersConfig?: LayersConfig;
  baseMap?: any; // This field reads from existing bookmark data
}

export interface Config {
  templateType?: TemplateType;
  isTemplateConfirm?: boolean;
  style?: ImmutableObject<WidgetStyle>;
  isInitialed?: boolean;
  bookmarks: Bookmark[];
  initBookmark?: boolean;
  runtimeAddAllow?: boolean;
  displayFromWeb?: boolean;
  autoPlayAllow?: boolean;
  autoInterval?: number;
  autoLoopAllow?: boolean;
  direction?: DirectionType;
  pageStyle?: PageStyle;
  space?: number;
  scrollBarOpen?: boolean;
  navigatorOpen?: boolean;
  transition?: TransitionType;
  transitionDirection?: TransitionDirection;
  displayType?: DisplayType;
  itemHeight?: number;
  itemWidth?: number;
  transitionInfo?: TransitionInfo;
}

export type IMConfig = ImmutableObject<Config>;