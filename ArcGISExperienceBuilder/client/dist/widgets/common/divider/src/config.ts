import { ImmutableObject } from 'seamless-immutable';
interface WidgetStyle {
  id: string;
}

export enum Status{
  Regular = 'REGULAR',
  Hover = 'HOVER'
}
export enum Direction{
  Horizontal = 'Horizontal',
  Vertical = 'Vertical'
}

export enum LineStyle{
  Style0 = 'Style0',
  Style1 = 'Style1',
  Style2 = 'Style2',
  Style3 = 'Style3',
  Style4 = 'Style4',
  Style5 = 'Style5',
  Style6 = 'Style6',
  Style7 = 'Style7',
  Style8 = 'Style8',
  Style9 = 'Style9',
  Style10 = 'Style10'
}

export enum PointStyle{
  None = 'None',
  Point0 = 'Point0',
  Point1 = 'Point1',
  Point2 = 'Point2',
  Point3 = 'Point3',
  Point4 = 'Point4',
  Point5 = 'Point5',
  Point6 = 'Point6',
  Point7 = 'Point7',
  Point8 = 'Point8'
}

export enum QuickStyleType{
  None='None',
  Default = 'Default',
  Style1 = 'Style1',
  Style2 = 'Style2',
  Style3 = 'Style3',
  Style4 = 'Style4',
  Style5 = 'Style5',
  Style6 = 'Style6',
  Style7 = 'Style7',
  Style8 = 'Style8',
  Style9 = 'Style9',
  Style10 = 'Style10',
  Style11 = 'Style11',
  Style12 = 'Style12',
  Style13 = 'Style13',
  Style14 = 'Style14',
  Style15 = 'Style15',
  Style16 = 'Style16',
  Style17 = 'Style17',
  Style18 = 'Style18',
  Style19 = 'Style19',
}

export interface StrokeStyle {
  type: LineStyle,
  color: string,
  size: string
}

export interface Point {
  pointStyle: PointStyle;
  pointSize: number;
}

export interface ThemeStyle {
  quickStyleType: QuickStyleType
}

export interface Config {
  style?: ImmutableObject<WidgetStyle>;
  direction?: Direction;
  pointEnd?: ImmutableObject<Point>;
  pointStart?: ImmutableObject<Point>;
  strokeStyle?: ImmutableObject<StrokeStyle>;
  themeStyle?: ImmutableObject<ThemeStyle>
}

export type IMConfig = ImmutableObject<Config>;