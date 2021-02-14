/* eslint-disable camelcase */
import * as utils from '../../../utils/utils';
//import { Constraints } from '../../../../constraints';

export default class RealPath {
  arcLengthDivisions: number;// = 200000;
  //cacheArcLengths: any;
  //needsUpdate: false;
  points: any;
  length: number;
  //closed: any;
  //curveType: any;
  //tension: any;
  sceneView: any;
  vec3: any;
  vec3d: any;
  esriMathUtils: any;

  constructor(points, sceneView, glMatrix_vec3, glMatrix_vec3d, esriMathUtils) {
    //this.points = this._geoArrayToCoords(points);
    // this.closed = closed || false;
    this.sceneView = sceneView;
    this.points = this.geoArrayToCoords(points) || [];
    this.vec3 = glMatrix_vec3;
    this.vec3d = glMatrix_vec3d;
    this.esriMathUtils = esriMathUtils;
    // this.curveType = curveType || 'centripetal';
    // this.tension = tension || 0.5;
    this.arcLengthDivisions = 20000;//TODO
  }

  private geoArrayToCoords = (geoArray) => {
    var vecs = [];
    for (var i = 0, len = geoArray.length; i < len; i++) {
      var p = geoArray[i];
      p = utils.geoCoordToRenderCoord([p[0], p[1], p[2]], null, this.sceneView);
      vecs.push(p);
    }
    return vecs;
  }

  getLength = () => {
    if (this.points.length < 2) {
      alert('line.length < 2');
    }

    var len = 0;
    for (var i = 0, l = this.points.length; i < l - 1; i++) {
      len += this.getLineLen(this.points[i + 0], this.points[i + 1]);
      len += Math.abs(utils.getRotatedAngle(this.points[i + 0], this.points[i + 1], this.points[i + 2], this.vec3, this.vec3d, this.sceneView, this.esriMathUtils));
    }

    this.length = len;
    return len;
  }
  private getLineLen(p1, p2) {
    var point1_gl = p1;//utils.geoCoordToRenderCoord([p1[0], p1[1], p1[2]], null, this.sceneView);
    var point2_gl = p2;//utils.geoCoordToRenderCoord([p2[0], p2[1], p2[2]], null, this.sceneView);
    var d = utils.distance(point1_gl, point2_gl);
    //console.log('distance==>' + d);
    return d;
  }

  getPoint(nil, tarLen) {
    var sumLen = 0;
    for (var i = 0, l = this.points.length; i < l - 1; i++) {
      var current = this.points[i + 0],
        next = this.points[i + 1],
        next2 = this.points[i + 2];

      //test 1: line
      var lineLen = this.getLineLen(current, next);
      if (tarLen < (sumLen + lineLen)) {
        //console.log("line:==>p0:" + current + "__p1:" + next);
        var subLen = tarLen - sumLen;//Math.abs(tarLen - sumLen);
        var ratio = (subLen / lineLen);
        var p = utils.lerp(current, next, ratio);
        //console.log("distance:" + subLen);
        return {
          type: 'line',
          len: subLen,
          point: p
        };
      }
      sumLen += lineLen;

      //test 2: rotate
      var rotatedAngle = utils.getRotatedAngle(current, next, next2, this.vec3, this.vec3d, this.sceneView, this.esriMathUtils);
      var rotatedLen = Math.abs(rotatedAngle);
      //rotatedLen = rotatedLen / Constraints.SPEED.MULTIPLIER;
      if (tarLen < (sumLen + rotatedLen)) {
        //console.log("Rotate:==>p0:" + current + "__p1:" + next + "__p2:" + next2);
        var sign = utils.sign(rotatedAngle);
        var angle = (tarLen - sumLen) * sign;
        //console.log("angle:==>" + angle);
        return {
          type: 'rotate',
          angle: angle,
          point: next,
          points: {
            pre: current,
            base: next,
            next: next2
          },
          lastLineLen: sumLen
        };
      }
      sumLen += rotatedLen;
    }
  }

  //arcgis
  // _geoArrayToCoords = (geoArray) => {
  //   var vecs = [];
  //   for (var i = 0, len = geoArray.length; i < len; i++) {
  //     vecs.push(new Vector3(geoArray[i][0], geoArray[i][1], geoArray[i][2]));
  //   }
  //   return vecs;
  // }
}