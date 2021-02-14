import { ImmutableObject/*, ImmutableArray*/ } from 'jimu-core';

//0
export enum FlyStyle {
  Rotate = 'ROTATE',
  Path = 'PATH'
  //Record = 'RECORD'
}

//1
export interface FlyStyleConstraint {
  name: FlyStyle,
  isInUse: boolean,
  direction: RotateDirection | PathDirection
}
//1.1
export interface RotateStyleConstraint extends FlyStyleConstraint {
  name: FlyStyle.Rotate,
  isInUse: boolean,
  direction: RotateDirection
}
export enum RotateDirection {
  CW = 'CW', //Clockwise
  CCW = 'CCW'//CounterClockwise
}
//1.2
export interface PathStyleConstraint extends FlyStyleConstraint {
  name: FlyStyle.Path,
  isInUse: boolean,
  direction: PathDirection
  style: PathStyle,
}
export enum PathStyle {
  Smoothed = 'CURVED',
  RealPath = 'LINE'
}
export enum PathDirection {
  Forward = 'FORWARD',
  Backward = 'BACKWARD'
}
//1.3
// export interface RecordStyleConstraint extends FlyStyleConstraint {
//   name: FlyStyle.Record,
//   isInUse: boolean,
//   records: (RecordsConstraint)[],
// }
// export enum RecordStyle {
//   //ViewSnapshot = 'VIEW',
//   Rotate = 'ROTATE',
//   Smoothed = 'CURVED',
//   RealPath = 'LINE'
// }
// export interface RecordsConstraint {
//   type: RecordStyle,
//   data: RotateRecord | PathRecord,
//   //timeScale: number
// }
// export interface RotateRecord {
//   idx?: number,
//   //camera: __esri.Camera | null,
//   hitPoint: any, //TODO
//   cameraInfo: any,//TODO
//   direction: RotateDirection,
//   angle: number,
//   duration: number,
//   delay: number,
// }
// export interface PathRecord {
//   idx?: number,
//   geo: (__esri.Geometry)[],
//   duration: number,
//   delay: number,
// }


//2
export enum ControllerLayout {
  Horizontal = 'HORIZONTAL',//Bar
  Vertical = 'VERTICAL',
  Palette = 'PALETTE'
}


//config
export interface Config {
  //1 map
  //useMapWidgetIds: string[];
  //2 Rotate/Path config
  itemsList: (RotateStyleConstraint | PathStyleConstraint/*| RecordStyleConstraint*/)[];
  //3 UI
  layout: ControllerLayout;
}
export type IMConfig = ImmutableObject<Config>;