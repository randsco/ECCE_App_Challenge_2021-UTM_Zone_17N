
export default class Bspline {
  points: any;
  iter: number;

  constructor(points, iterF?) {
    this.points = points || [];
    this.points = this.normalPoints4Bspline(this.points);
    this.iter = iterF || 3;
  }

  getSpline() {
    var bPoints = this.bspline(this.points, this.iter);
    var vecsBspline = this.mergePoints(bPoints);
    ///*var _len = */getSplineLen(vecsBspline);
    return vecsBspline;
  }

  clear() {
    this.points = null;
    this.iter = null;
  }

  // getSplineLen (vecArr){
  //   var totalLen = 0;
  //   for(var i = 0, len = vecArr.length - 1; i < len; i++){
  //     var baseVec = vecArr[i];
  //     var nextVec = vecArr[i + 1];

  //     var sub = [];
  //     _subtract(sub, nextVec, baseVec);

  //     var l = _getVecLength(sub); //TODO BUG: vec[2]-vec[1], for(100->0)
  //     totalLen += l;
  //   }
  //   return totalLen;
  // }
  // export function _getVecLength(a): number {
  //   const x = a[0];
  //   const y = a[1];
  //   const z = a[2];
  //   return Math.sqrt(x * x + y * y + z * z);
  // }
  // export function _subtract(out, a, b) {
  //   out[0] = a[0] - b[0];
  //   out[1] = a[1] - b[1];
  //   out[2] = a[2] - b[2];
  //   return out;
  // }

  normalPoints4Bspline(rawPoints) {
    var outPoints = [];
    for (var i = 0, len = rawPoints.length; i < len; i++) {
      var p = rawPoints[i];
      var x = p[0];
      var y = p[1];
      var z = p[2] || 0;
      outPoints.push(x, y, z);
    }
    return outPoints;
  }
  mergePoints(panedPoints) {
    var outPoints = [];
    for (var i = 0, len = panedPoints.length / 3; i < len; i++) {
      var px = panedPoints[3 * i];
      var py = panedPoints[3 * i + 1];
      var pz = panedPoints[3 * i + 2];
      var tar = [];
      tar.push(px, py, pz);
      outPoints.push(tar);
    }
    return outPoints;
  }
  bspline(pts, iterations) {
    if (!iterations || iterations == 0) {
      return pts;
    }
    var items = pts.length / 3.0
    var pts2 = [pts[0], pts[1], pts[2]];

    var controlPoint1 = 0.2, controlPoint2 = 0.8;
    for (var i = 0; i < items - 1; i++) {
      var j = 3 * i;
      pts2[3 + 2 * j + 0] = controlPoint2 * pts[j + 0] + controlPoint1 * pts[j + 3];
      pts2[3 + 2 * j + 1] = controlPoint2 * pts[j + 1] + controlPoint1 * pts[j + 4];
      pts2[3 + 2 * j + 2] = controlPoint2 * pts[j + 2] + controlPoint1 * pts[j + 5];

      pts2[3 + 2 * j + 3] = controlPoint1 * pts[j + 0] + controlPoint2 * pts[j + 3];
      pts2[3 + 2 * j + 4] = controlPoint1 * pts[j + 1] + controlPoint2 * pts[j + 4];
      pts2[3 + 2 * j + 5] = controlPoint1 * pts[j + 2] + controlPoint2 * pts[j + 5];
    }
    pts2.push(pts[pts.length - 3], pts[pts.length - 2], pts[pts.length - 1]);

    return this.bspline(pts2, iterations - 1);
  }
}