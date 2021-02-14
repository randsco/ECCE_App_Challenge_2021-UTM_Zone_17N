import {css} from 'jimu-core';
import { Direction } from '../config'
export function getStrokeStyle(size ,color, direction = Direction.Horizontal, isSetting = false){
  const isHorizontal      = direction == Direction.Horizontal;
  const horizontalLineCss = {} as any;
  const verticalLineCss   = {} as any;
  color = color ? color : 'transparent';

  horizontalLineCss.Style0 = css`
    &{
      border-bottom: ${size} solid ${color};
    }
  `;
  horizontalLineCss.Style1 = css`
    &{
      border-bottom: ${size} dashed ${color};
    }
  `;
  horizontalLineCss.Style2 = css`
    &{
      border-bottom: ${size} dotted ${color};
    }
  `;
  horizontalLineCss.Style3 = css`
    &{
      height: ${size};
      position: relative;
    }
    &:before {
      position: absolute;
      content: '';
      height: ${size};
      left: ${getSizeByRatio(size, 4)};
      right: 0;
      background-image: repeating-linear-gradient(to right, ${color} 0, ${color} ${getSizeByRatio(size, 1)}, transparent 0,transparent ${getSizeByRatio(size, 6)})
    }
    &:after {
      position: absolute;
      content: '';
      height: ${size};
      left: 0;
      right: 0;
      background-image: repeating-linear-gradient(to right, ${color} 0, ${color} ${getSizeByRatio(size, 3)}, transparent 0,transparent ${getSizeByRatio(size, 6)})
    }
  `;
  // horizontalLineCss.Style4 = css`
  //   &{
  //     height: ${size};
  //     background-image: repeating-linear-gradient(to right, ${color} 0, ${color} ${getSizeByRatio(size, 2.5)}, transparent 0,transparent ${getSizeByRatio(size, 3)})
  //   }
  // `;
  // horizontalLineCss.Style5 = css`
  //   &{
  //     height: ${size};
  //     background-image: repeating-linear-gradient(to right, ${color} 0, ${color} ${getSizeByRatio(size, 4)},
  //       transparent 0,transparent ${getSizeByRatio(size, 5)}, ${color} 0, ${color} ${getSizeByRatio(size, 2)});
  //   }
  // `;
  horizontalLineCss.Style6 = css`
    &{
      height: ${size};
      background-image: repeating-linear-gradient(to right, ${color} 0, ${color} ${getSizeByRatio(size, 4)}, transparent 0,transparent ${getSizeByRatio(size, 6)})
    }
  `;
  horizontalLineCss.Style7 = css`
    &{
      border-color: ${color};
      border-bottom-style: double;
      border-bottom-width: ${isSetting ? '4px' : size}
    }
  `;
  horizontalLineCss.Style8 = css`
    &{
      height: ${size};
      min-height: ${isSetting ? '6px' : 'unset'};
      position: relative;
    }
    &:before{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: ${getSizeByRatio(size, 0.2, '4px')};
      background: ${color};
    }
    &:after{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: ${getSizeByRatio(size, 0.4, '4px')};
      background: ${color};
    }
  `;

  horizontalLineCss.Style9 = css`
    &{
      height: ${size};
      min-height: ${isSetting ? '6px' : 'unset'};
      position: relative;
    }
    &:before{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: ${getSizeByRatio(size, 0.4, '4px')};
      background: ${color};
    }
    &:after{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: ${getSizeByRatio(size, 0.2, '4px')};
      background: ${color};
    }
  `;
  horizontalLineCss.Style10 = css`
    &{
      height: ${size};
      min-height: ${isSetting ? '8px' : 'unset'};
      position: relative;
      background-clip:content-box;
      border-top: ${getSizeByRatio(size, 0.167)} solid ${color};
      border-bottom: ${getSizeByRatio(size, 0.167)} solid ${color};
    }
    &:before{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: ${isSetting ? '2px' : getSizeByRatio(size, 0.3)};
      background: ${color};
      transform: translateY(-50%);
    }
  `;

  verticalLineCss.Style0 = css`
    &{
      border-left: ${size} solid ${color};
    }
  `;
  verticalLineCss.Style1 = css`
    &{
      border-left: ${size} dashed ${color}
    }
  `;
  verticalLineCss.Style2 = css`
    &{
      border-left: ${size} dotted ${color};
    }
  `;
  verticalLineCss.Style3 = css`
    &{
      width: ${size};
      position: relative;
    }
    &:before {
      position: absolute;
      content: '';
      width: ${size};
      top: ${getSizeByRatio(size, 3.8)};
      bottom: 0;
      background-image: repeating-linear-gradient(to bottom, ${color} 0, ${color} ${getSizeByRatio(size, 1)}, transparent 0,transparent ${getSizeByRatio(size, 6)})
    }
    &:after {
      position: absolute;
      content: '';
      width: ${size};
      top: 0;
      bottom: 0;
      background-image: repeating-linear-gradient(to bottom, ${color} 0, ${color} ${getSizeByRatio(size, 2.5)}, transparent 0,transparent ${getSizeByRatio(size, 6)})
    }
  `;
  // verticalLineCss.Style4 = css`
  //   &{
  //     width: ${size};
  //     background-image: repeating-linear-gradient(to bottom, ${color} 0, ${color} ${getSizeByRatio(size, 2.5)}, transparent 0,transparent ${getSizeByRatio(size, 3)});
  //   }
  // `;
  // verticalLineCss.Style5 = css`
  //   &{
  //     width: ${size};
  //     background-image: repeating-linear-gradient(to bottom, ${color} 0, ${color} ${getSizeByRatio(size, 4)},
  //       transparent 0,transparent ${getSizeByRatio(size, 5)}, ${color} 0, ${color} ${getSizeByRatio(size, 2)})
  //   }
  // `;
  verticalLineCss.Style6 = css`
    &{
      width: ${size};
      background-image: repeating-linear-gradient(to bottom, ${color} 0, ${color} ${getSizeByRatio(size, 4)}, transparent 0,transparent ${getSizeByRatio(size, 6)});
    }
  `;
  verticalLineCss.Style7 = css`
    &{
      border-left: ${size} double ${color};
    }
  `;
  verticalLineCss.Style8 = css`
    &{
      width: ${size};
      position: relative;
    }
    &:before{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${getSizeByRatio(size, 0.2, '4px')};
      background: ${color};
    }
    &:after{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: ${getSizeByRatio(size, 0.4, '4px')};
      background: ${color};
    }
  `;

  verticalLineCss.Style9 = css`
    &{
      width: ${size};
      position: relative;
    }
    &:before{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${getSizeByRatio(size, 0.4, '4px')};
      background: ${color};
    }
    &:after{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: ${getSizeByRatio(size, 0.2, '4px')};
      background: ${color};
    }
  `;
  verticalLineCss.Style10 = css`
    &{
      width: ${size};
      position: relative;
      background-clip:content-box;
      border-left: ${getSizeByRatio(size, 0.167)} solid ${color};
      border-right: ${getSizeByRatio(size, 0.167)} solid ${color};
    }
    &:before{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: ${isSetting ? '2px' : getSizeByRatio(size, 0.3)};
      background: ${color};
      transform: translateX(-50%);
    }
  `;

  return isHorizontal ? horizontalLineCss : verticalLineCss;
}

export function getPointStyle(size, color, direction = Direction.Horizontal, isPointStart = true){
  const pointSize  = getSizeByRatio(size, 1);
  const pointSize2 = getSizeByRatio(size, 0.5);
  const pointSize3 = getSizeByRatio(size, 0.1);
  const pointSize4 = getSizeByRatio(size, 0.3);
  color = color ? color : 'transparent';

  const position = 0;
  const isHorizontal = direction == Direction.Horizontal;
  let pointHorizontalCss = {None: 'None'} as any;
  let pointVerticalCss   = {None: 'None'} as any;
  pointHorizontalCss.Point0 = css`
    &{
      width: ${pointSize};
      height: ${pointSize};
      border-radius: 50%;
      background-color: ${color};
      left: ${isPointStart ? position : 'unset'};
      right: ${!isPointStart ? position : 'unset'};
      top: 50%;
      transform: translateY(-50%);
    }
  `;
  pointHorizontalCss.Point1 = css`
    &{
      width: ${pointSize4};
      height: ${pointSize};
      background-color: ${color};
      left: ${isPointStart ? '4%' : 'unset'};
      right: ${!isPointStart ? '4%' : 'unset'};
      top: 50%;
      transform: translateY(-50%);
    }
  `;
  pointHorizontalCss.Point2 = css`
    &{
      width: ${pointSize4};
      height: ${pointSize};
      background-color: ${color};
      left: ${isPointStart ? position : 'unset'};
      right: ${!isPointStart ? position : 'unset'};
      top: 50%;
      transform: translateY(-50%);
    }
  `;
  pointHorizontalCss.Point3 = css`
    &{
      width: ${pointSize};
      height: ${pointSize};
      background-color: ${color};
      left: ${isPointStart ? position : 'unset'};
      right: ${!isPointStart ? position : 'unset'};
      top: 50%;
      transform: translateY(-50%);
    }
  `;
  pointHorizontalCss.Point4 = css`
    &{
      width: ${getSizeByRatio(size, .71)};
      height: ${getSizeByRatio(size, .71)};
      background-color: ${color};
      left: ${isPointStart ? getSizeByRatio(size, 0.2) : 'unset'};
      right: ${!isPointStart ? getSizeByRatio(size, 0.2) : 'unset'};
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
  `;

  const horizontalCssPoint5 = css`
    .jimu-rtl &{
      border-color: transparent ${color} transparent transparent;
    }
    &{
      width: 0;
      height: 0;
      border-width: ${pointSize2};
      border-style: solid;
      border-color: transparent transparent transparent ${color};
      left: ${isPointStart ? position : 'unset'};
      right: ${!isPointStart ? `-${getSizeByRatio(size, .5)}` : 'unset'};
      top: 50%;
      transform: translateY(-50%);
    }
  `;
  const horizontalCssPoint6 = css`
    .jimu-rtl &{
      border-color: transparent transparent transparent ${color};
    }
    &{
      width: 0;
      height: 0;
      border-width: ${pointSize2};
      border-style: solid;
      border-color: transparent ${color} transparent  transparent;
      left: ${isPointStart ? `-${getSizeByRatio(size, .5)}` : 'unset'};
      right: ${!isPointStart ? position : 'unset'};
      top: 50%;
      transform: translateY(-50%)
    }
  `;
  const horizontalCssPoint7 = css`
    .jimu-rtl &{
      border-top: ${pointSize4} solid ${color};
      border-left: ${pointSize4} solid ${color};
    }
    .jimu-ltr &{
      border-bottom: ${pointSize4} solid ${color};
      border-left: ${pointSize4} solid ${color};
    }
    &{
      width: ${getSizeByRatio(size, .8)};
      height: ${getSizeByRatio(size, .8)};
      left: ${isPointStart ? `${getSizeByRatio(size, .2)}` : 'unset'};
      right: ${!isPointStart ? `-${getSizeByRatio(size, .2)}` : 'unset'};
      top: 50%;
      border-radius: ${pointSize3};
      transform: translateY(-50%) rotate(45deg);
    }
  `;
  const horizontalCssPoint8 = css`
    .jimu-rtl &{
      border-right: ${pointSize4} solid ${color};
      border-bottom: ${pointSize4} solid ${color};
    }
    .jimu-ltr &{
      border-top: ${pointSize4} solid ${color};
      border-right: ${pointSize4} solid ${color};
    }
    &{
      width: ${getSizeByRatio(size, .8)};
      height: ${getSizeByRatio(size, .8)};
      left: ${isPointStart ? `-${getSizeByRatio(size, .2)}` : 'unset'};
      right: ${!isPointStart ? `${getSizeByRatio(size, .2)}` : 'unset'};
      top: 50%;
      border-radius: ${pointSize3};
      transform: translateY(-50%) rotate(45deg);
    }
  `;

  pointVerticalCss.Point0 = css`
    &{
      width: ${pointSize};
      height: ${pointSize};
      border-radius: 50%;
      background-color: ${color};
      top: ${isPointStart ? position : 'unset'};
      bottom: ${!isPointStart ? position : 'unset'};
      left: 50%;
      transform: translateX(-50%);
    }
  `;
  pointVerticalCss.Point1 = css`
    &{
      width: ${pointSize};
      height: ${pointSize4};
      background-color: ${color};
      top: ${isPointStart ? '4%' : 'unset'};
      bottom: ${!isPointStart ? '4%' : 'unset'};
      left: 50%;
      transform: translateX(-50%);
    }
  `;
  pointVerticalCss.Point2 = css`
    &{
      width: ${pointSize};
      height: ${pointSize4};
      background-color: ${color};
      top: ${isPointStart ? position : 'unset'};
      bottom: ${!isPointStart ? position : 'unset'};
      left: 50%;
      transform: translateX(-50%);
    }
  `;
  pointVerticalCss.Point3 = css`
    &{
      width: ${pointSize};
      height: ${pointSize};
      background-color: ${color};
      top: ${isPointStart ? position : 'unset'};
      bottom: ${!isPointStart ? position : 'unset'};
      left: 50%;
      transform: translateX(-50%);
    }
  `;
  pointVerticalCss.Point4 = css`
    &{
      width: ${getSizeByRatio(size, .71)};
      height: ${getSizeByRatio(size, .71)};
      background-color: ${color};
      top: ${isPointStart ? getSizeByRatio(size, 0.2) : 'unset'};
      bottom: ${!isPointStart ? getSizeByRatio(size, 0.2) : 'unset'};
      left: 50%;
      transform: translateX(-50%) rotate(45deg)
    }
  `;
  const verticalCssPoint5 = css`
    &{
      width: 0;
      height: 0;
      border-width: ${pointSize2};
      border-style: solid;
      border-color: transparent transparent ${color} transparent ;
      top: ${isPointStart ? `-${getSizeByRatio(size, .5)}` : 'unset'};
      bottom: ${!isPointStart ? position : 'unset'};
      left: 50%;
      transform: translateX(-50%)
    }
  `;
  const verticalCssPoint6 = css`
    &{
      width: 0;
      height: 0;
      border-width: ${pointSize2};
      border-style: solid;
      border-color:${color} transparent transparent transparent;
      top: ${isPointStart ? position : 'unset'};
      bottom: ${!isPointStart ? `-${getSizeByRatio(size, .5)}` : 'unset'};
      left: 50%;
      transform: translateX(-50%);
    }
  `;
  const verticalCssPoint7 = css`
    .jimu-rtl &{
      border-bottom: ${pointSize4} solid ${color};
      border-left: ${pointSize4} solid ${color};
    }
    .jimu-ltr &{
      border-bottom: ${pointSize4} solid ${color};
      border-right: ${pointSize4} solid ${color};
    }
    &{
      width: ${getSizeByRatio(size, .8)};
      height: ${getSizeByRatio(size, .8)};
      top: ${isPointStart ? `-${getSizeByRatio(size, .2)}` : 'unset'};
      bottom: ${!isPointStart ? `${getSizeByRatio(size, .2)}` : 'unset'};
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-radius: ${pointSize3};
    }
  `;
  const verticalCssPoint8 = css`
    .jimu-rtl &{
      border-top: ${pointSize4} solid ${color};
      border-right: ${pointSize4} solid ${color};
    }
    .jimu-ltr &{
      border-top: ${pointSize4} solid ${color};
      border-left: ${pointSize4} solid ${color};
    }
    &{
      width: ${getSizeByRatio(size, .8)};
      height: ${getSizeByRatio(size, .8)};
      top: ${isPointStart ? `${getSizeByRatio(size, .2)}` : 'unset'};
      bottom: ${!isPointStart ? `-${getSizeByRatio(size, .2)}` : 'unset'};
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-radius: ${pointSize3};
    }
  `;

  let horizontalCss, verticalCss;
  if(isPointStart){
    horizontalCss = {
      Point5: horizontalCssPoint5,
      Point6: horizontalCssPoint6,
      Point7: horizontalCssPoint7,
      Point8: horizontalCssPoint8,
    }
    verticalCss = {
      Point5: verticalCssPoint6,
      Point6: verticalCssPoint5,
      Point7: verticalCssPoint8,
      Point8: verticalCssPoint7,
    }
  }else{
    horizontalCss = {
      Point5: horizontalCssPoint6,
      Point6: horizontalCssPoint5,
      Point7: horizontalCssPoint8,
      Point8: horizontalCssPoint7,
    }
    verticalCss = {
      Point5: verticalCssPoint5,
      Point6: verticalCssPoint6,
      Point7: verticalCssPoint7,
      Point8: verticalCssPoint8,
    }
  }

  pointHorizontalCss = {...pointHorizontalCss, ...horizontalCss};
  pointVerticalCss   = {...pointVerticalCss, ...verticalCss};
  return isHorizontal ? pointHorizontalCss : pointVerticalCss;
}

function getSizeByRatio(size: string, spaceRatio = 1.5, minSize: string = null ) {
  if(!size) return '0px'
  const minWidth = minSize ? Number(minSize.split('px')[0]) : 0;
  let width = Number(size.split('px')[0]);
  width = minWidth > width ? minWidth : width;
  return width*spaceRatio < 1 ? '1px' : `${Math.round(width*spaceRatio)}px`;
}

export function getDividerLineStyle(isHorizontal: boolean, isPointStartEnable: boolean, isPointEndEnable: boolean, pointStartSize, pointEndSize) {
  const startPosition  = isPointStartEnable ? `${pointStartSize/2}px` : 0;
  const startPosition1 = isPointStartEnable ? `${pointStartSize/2.5}px` : 0;

  const endPosition  = isPointEndEnable ? `${pointEndSize/2}px` : 0;
  const endPosition1 = isPointEndEnable ? `${pointEndSize/2.5}px` : 0;
  const horizontalStyle = css`
    left: ${startPosition};
    right: ${endPosition};
    top: 50%;
    transform: translateY(-50%);
    &.point-start-Point1, &.point-start-Point2, &.point-start-Point5
    {
      left: 0;
    }
    &.point-end-Point1, &.point-end-Point2, &.point-end-Point5
    {
      right: 0;
    }
    &.point-start-Point7 {
      left: ${startPosition1};
    }
    &.point-end-Point7 {
      right: ${endPosition1};
    }
  `;
  const verticalStyle = css`
    top: ${startPosition};
    bottom: ${endPosition};
    left: 50%;
    transform: translateX(-50%);
    &.point-start-Point1, &.point-start-Point2, &.point-start-Point5
    {
      top: 0;
    }
    &.point-end-Point1, &.point-end-Point2, &.point-end-Point5
    {
      bottom: 0;
    }
  `
  return isHorizontal ? horizontalStyle : verticalStyle
}