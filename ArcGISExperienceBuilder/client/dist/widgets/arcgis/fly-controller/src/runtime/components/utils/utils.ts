/* eslint-disable camelcase */
import * as externalRenderers from 'esri/views/3d/externalRenderers';
//import * as webMercatorUtils from 'esri/geometry/support/webMercatorUtils';
import { Constraints } from '../../../constraints';
import { FlyStyle } from '../../../config';
import nls from '../../translations/default';
//import { loadArcGISJSAPIModules } from 'jimu-arcgis';

// export function Animation_Tick (fun, time) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       //console.log(value);
//       if(fun){
//         return fun().then(function() {
//           return resolve(/*value*/)
//         });
//       } else {
//         resolve();
//       }

//     }, time);
//   });
// }

export function getHitPointOnTheGround(hitTestResult) {
  var lastHit = null;
  if (hitTestResult.results.length > 0) {
    lastHit = hitTestResult.results[hitTestResult.results.length - 1];
  }
  if (hitTestResult.ground.mapPoint) {
    if (lastHit) {
      if (hitTestResult.ground.distance > lastHit.distance) {
        // an object under the ground could be more far away, check first the distance before set the ground as last point
        lastHit = hitTestResult.ground;
      }
    } else {
      lastHit = hitTestResult.ground;
    }
  }

  //this.aux_drawPoint(lastHit.mapPoint);

  return lastHit;
}

//camera
export function getCurentGLCameraInfo(sceneView) {
  var innerGLCamera_copy = sceneView.state.camera.clone();
  return {
    eye: innerGLCamera_copy.eye,
    center: innerGLCamera_copy.center,
    up: innerGLCamera_copy.up
  }
}

//coord
export function geoCoordToRenderCoord(inCood, num, sceneView) {
  var transNum = num ? num : 1;

  var var_renderCoordinates = [];
  externalRenderers.toRenderCoordinates(sceneView, inCood, 0,
    null, //null: means follow this.scene.sp
    var_renderCoordinates, 0, transNum);

  return var_renderCoordinates;
}
export function renderCoordToGeoCoord(varCood, num, sceneView) {
  var transNum = num ? num : 1;
  var scene = sceneView ? sceneView : this.sceneView;

  var out_geographicCoordinates = [];
  externalRenderers.fromRenderCoordinates(scene, varCood, 0, out_geographicCoordinates, 0,
    null,
    transNum);

  return out_geographicCoordinates;
}

// //ll - xy
// this._tmpZ = 200;
// export function lngLatToXY(tmpLon, tmpLat, elevZ) {
//   var tp = webMercatorUtils.lngLatToXY(tmpLon, tmpLat);
//   var z = elevZ ? elevZ : this._tmpZ;
//   return [tp[0], tp[1], z];
// }
// export function xyToLngLat(x, y) {
//   var p2 = webMercatorUtils.xyToLngLat(x, y);
//   //halfLon = Math.abs(p1[0] - p2[0]) / 8;
//   return p2;
// }


//math
export function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
export function radToDeg(radians) {
  return radians * 180 / Math.PI;
}
export function distance(from, to) {
  const x = to[0] - from[0];
  const y = to[1] - from[1];
  const z = to[2] - from[2];

  const len = x * x + y * y + z * z;
  return Math.sqrt(len);
}
export function sign(num: number) {
  return (num < 0) ? - 1 : (num > 0) ? 1 : 0;
}
//x in range<a1,a2> mappingto range<b1,b2>
export function mapLinear(x, a1, a2, b1, b2) {
  return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
}
//interpolation
export function lerp(from, to, factor: number) {
  //var inter = { x: 0, y: 0, z: 0 };
  var inter = [];
  inter[0] = ((to[0] - from[0]) * factor) + from[0];
  inter[1] = ((to[1] - from[1]) * factor) + from[1];
  inter[2] = ((to[2] - from[2]) * factor) + from[2];

  return inter;
}

export function getRotatedAngle(p1, p2, p3, vec3, vec3d, sceneView, esriMathUtils) {
  var prePos = p1;
  var basePos = p2 || null;
  var nextPos = p3 || null;

  if (!basePos || !nextPos) {
    return 0;
  }

  var prePos_gl = prePos;//utils.geoCoordToRenderCoord([prePos[0], prePos[1], prePos[2]], null, this.sceneView);
  var basePos_gl = basePos;//utils.geoCoordToRenderCoord([basePos[0], basePos[1], basePos[2]], null, this.sceneView);
  var nextPos_gl = nextPos;//utils.geoCoordToRenderCoord([nextPos[0], nextPos[1], nextPos[2]], null, this.sceneView);

  var lastVec = vec3d.create();
  vec3.subtract(lastVec, basePos_gl, prePos_gl);
  var nextVec = vec3d.create();
  vec3.subtract(nextVec, nextPos_gl, basePos_gl);

  var auxUpVec = vec3d.create();
  sceneView.renderCoordsHelper.worldUpAtPosition(basePos_gl, auxUpVec); //up-aux-line
  var angle = radToDeg(esriMathUtils.angle(lastVec, nextVec, auxUpVec));
  //if (this.state.DEBUG) {
  //console.log('angle==>' + angle);
  //}
  return angle;// * Constraints.SPEED.MULTIPLIER;//Math.abs(Math.round(angle)) * Constraints.SPEED.MULTIPLIER;
}
// }
// export function controlUIWidget(mapBaseView: __esri.MapView | __esri.SceneView, isOpen: boolean, uiWidget: __esri.Widget, position?: string, widgetName?: string) {
//   let ui = mapBaseView.ui as any;
//   if (!uiWidget) {
//     return;
//   }
//   if (isOpen) {
//     ui.add(uiWidget, position);
//     if (widgetName && ui.specialComponents.indexOf(widgetName) === -1) {
//       ui.specialComponents.push(widgetName);
//     }
//   } else {
//     ui.remove(uiWidget);
//   }
// }

//geo
export function isPolylineEquals(polyline1, polyline2) {
  if (!(polyline1.type === 'polyline' && polyline2.type === 'polyline')) {
    return false;
  }
  if (!polyline1.extent.equals(polyline2.extent)) {
    return false;
  }
  if (polyline1.paths.length !== polyline2.paths.length) {
    return false;
  }
  if (polyline1.paths[0].length !== polyline2.paths[0].length) {
    return false;
  }

  var line1 = polyline1.paths[0];
  var line2 = polyline2.paths[0];
  for (var i = 0, len = line1.length; i < len; i++) {
    var p1Val = line1[i];
    var p2Val = line2[i];
    if (p1Val[0] !== p2Val[0] || p1Val[1] !== p2Val[1]) {//TODO
      return false;
    }
  }

  return true;
}
export function getDistanceFrom2LngLat(lng1, lat1, lng2, lat2) {
  var radLng1 = degToRad(lng1);
  var radLat1 = degToRad(lat1);
  var radLng2 = degToRad(lng2);
  var radLat2 = degToRad(lat2);

  var a = radLat1 - radLat2;
  var b = radLng1 - radLng2;

  var km = 2 * Math.asin(Math.sqrt(Math.sin(a / 2) * Math.sin(a / 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(b / 2) * Math.sin(b / 2))) * 6378.137
  return km;
}

//widget
export function getCurrentActiveItem(props, state, idx?, isRecord?) {
  var i;
  if ('undefined' !== typeof idx) {
    i = idx;
  } else {
    i = state.activedItemIdx;
  }
  var config = props.config;
  var itemInConfig = config.itemsList[i];

  return itemInConfig;
}
export function findFirstUsedItem(itemsList) {
  for (var i = 0, len = itemsList.length; i < len; i++) {
    var item = itemsList[i];
    if (item && item.isInUse) {
      return { idx: i, item: item };
    }
  }

  return { idx: null, item: null };
}
export function getEnabledItemNum(itemsList) {
  var count = 0;
  for (var i = 0, len = itemsList.length; i < len; i++) {
    var item = itemsList[i];
    if (item && item.isInUse) {
      count++;
    }
  }
  return count;
}
export function getFlyStyleTitle(flyStyle, props) {
  if (flyStyle === FlyStyle.Rotate) {
    return props.intl.formatMessage({ id: 'flyStyleRotate', defaultMessage: nls.flyStyleRotate });
  } else if (flyStyle === FlyStyle.Path) {
    return props.intl.formatMessage({ id: 'flyStylePath', defaultMessage: nls.flyStylePath });
  } else {
    return null;
  }
}

//speed
//TODO static fun in base-setting-controller
//num: [0-1] ==> speed: [1/8 - 8]
export function speedMapping(num: number, decimal?: number): number {
  var min = Constraints.SPEED.MIN,
    max = Constraints.SPEED.MAX,
    fac = Constraints.SPEED.MULTIPLIER;
  var speed, half = (max - min) / 2;
  if (num < half) {
    speed = 1 / ((half - num) / (half) * fac);
    // if (0 === speed) {
    //   speed = 1 / fac;//0
    // }
  } else {
    speed = (num - half) / (max - half) * fac;

    if (0 === speed) {
      speed = 1;//== half
    }
  }

  return parseFloat(speed.toFixed(decimal ? decimal : Constraints.SPEED.DECIMAL));
}
//runtime setting
export function getInitLiveviewSetting() {
  return {
    speed: 0.5, // [0 - 1], show as [1/8 - 8]
    //heading: 0,
    tilt: 0, // [0 - 90]
    altitude: 0, // [0 - 500]
  }
}
export function clampTilt(tilt) {
  if (tilt <= 0) {
    return 0.1;
  } else if (tilt >= 90) {
    return 89.9;
  } else {
    return tilt;
  }
}
export function showLiveviewSetting(num: number, unit: string) {
  return Math.floor(num).toString() + ' ' + unit;
}