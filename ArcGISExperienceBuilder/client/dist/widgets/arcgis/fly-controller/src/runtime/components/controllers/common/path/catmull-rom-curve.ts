class CubicPoly {
  c0 = 0; c1 = 0; c2 = 0; c3 = 0;
  /*
	 * Compute coefficients for a cubic polynomial
	 *   p(s) = c0 + c1*s + c2*s^2 + c3*s^3
	 * such that
	 *   p(0) = x0, p(1) = x1
	 *  and
	 *   p'(0) = t0, p'(1) = t1.
	 */
  init = (x0, x1, t0, t1) => {
    this.c0 = x0;
    this.c1 = t0;
    this.c2 = - 3 * x0 + 3 * x1 - 2 * t0 - t1;
    this.c3 = 2 * x0 - 2 * x1 + t0 + t1;
  };
  initCatmullRom = (x0, x1, x2, x3, tension) => {
    this.init(x1, x2, tension * (x2 - x0), tension * (x3 - x1));
  };
  initNonuniformCatmullRom = (x0, x1, x2, x3, dt0, dt1, dt2) => {
    // compute tangents when parameterized in [t1,t2]
    var t1 = (x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;
    var t2 = (x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2;
    // rescale tangents for parametrization in [0,1]
    t1 *= dt1;
    t2 *= dt1;
    this.init(x1, x2, t1, t2);
  };
  calc = (t) => {
    var t2 = t * t;
    var t3 = t2 * t;
    return this.c0 + this.c1 * t + this.c2 * t2 + this.c3 * t3;
  };
}

//
class Vector3 {
  x; y; z;
  constructor(x?, y?, z?) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  set = (x, y, z) => {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  };
  add = (v) => {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  };
  subVectors = (a, b) => {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  };
  distanceToSquared = (v) => {
    var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  };
  distanceTo = (v) => {
    return Math.sqrt(this.distanceToSquared(v));
  };
}
var tmp = new Vector3();
var px = new CubicPoly(), py = new CubicPoly(), pz = new CubicPoly();


export default class CatmullRomCurve3 {
  arcLengthDivisions: number;// = 200000;
  cacheArcLengths: any;
  needsUpdate: false;
  points: any;
  closed: any;
  curveType: any;
  tension: any;

  constructor(points, closed?, curveType?, tension?) {
    //this.type = 'CatmullRomCurve3';
    this.points = points || [];
    this.points = this._geoArrayToCoords(this.points);

    this.closed = closed || false;
    this.curveType = curveType || 'centripetal';//chordal
    this.tension = tension || 0.3;

    this.arcLengthDivisions = 20000;//TODO
  }

  //arcgis
  _geoArrayToCoords = (geoArray) => {
    var vecs = [];
    for (var i = 0, len = geoArray.length; i < len; i++) {
      vecs.push(new Vector3(geoArray[i][0], geoArray[i][1], geoArray[i][2]));
    }
    return vecs;
  }

  getPoint = (t, optionalTarget?) => {
    var point = optionalTarget || new Vector3();

    var points = this.points;
    var l = points.length;

    var p = (l - (this.closed ? 0 : 1)) * t;
    var intPoint = Math.floor(p);
    var weight = p - intPoint;

    if (this.closed) {
      intPoint += intPoint > 0 ? 0 : (Math.floor(Math.abs(intPoint) / l) + 1) * l;
    } else if (weight === 0 && intPoint === l - 1) {
      intPoint = l - 2;
      weight = 1;
    }

    var p0, p1, p2, p3; // 4 points

    if (this.closed || intPoint > 0) {
      p0 = points[(intPoint - 1) % l];
    } else {
      // extrapolate first point
      tmp.subVectors(points[0], points[1]).add(points[0]);
      p0 = tmp;
    }

    p1 = points[intPoint % l];
    p2 = points[(intPoint + 1) % l];

    if (this.closed || intPoint + 2 < l) {
      p3 = points[(intPoint + 2) % l];
    } else {
      // extrapolate last point
      tmp.subVectors(points[l - 1], points[l - 2]).add(points[l - 1]);
      p3 = tmp;
    }

    if (this.curveType === 'centripetal' || this.curveType === 'chordal') {
      // init Centripetal / Chordal Catmull-Rom
      var pow = this.curveType === 'chordal' ? 0.5 : 0.25;
      var dt0 = Math.pow(p0.distanceToSquared(p1), pow);
      var dt1 = Math.pow(p1.distanceToSquared(p2), pow);
      var dt2 = Math.pow(p2.distanceToSquared(p3), pow);

      // safety check for repeated points
      if (dt1 < 1e-4) dt1 = 1.0;
      if (dt0 < 1e-4) dt0 = dt1;
      if (dt2 < 1e-4) dt2 = dt1;

      px.initNonuniformCatmullRom(p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2);
      py.initNonuniformCatmullRom(p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2);
      pz.initNonuniformCatmullRom(p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2);

    } else if (this.curveType === 'catmullrom') {
      px.initCatmullRom(p0.x, p1.x, p2.x, p3.x, this.tension);
      py.initCatmullRom(p0.y, p1.y, p2.y, p3.y, this.tension);
      pz.initCatmullRom(p0.z, p1.z, p2.z, p3.z, this.tension);
    }

    point.set(
      px.calc(weight),
      py.calc(weight),
      pz.calc(weight)
    );

    return point;
  };


  //Curve
  getSpacedPoints = (divisions?) => {
    if (divisions === undefined) divisions = 5;

    var points = [];
    for (var d = 0; d <= divisions; d++) {//TODO d+=10
      points.push(this.getPointAt(d / divisions));
    }

    return points;
  };

  getPointAt = (u, optionalTarget?) => {
    var t = this.getUtoTmapping(u);
    return this.getPoint(t, optionalTarget);
  };

  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping = (u, distance?) => {
    var arcLengths = this.getLengths();
    var i = 0, il = arcLengths.length;
    var targetArcLength; // The targeted u distance value to get

    if (distance) {
      targetArcLength = distance;
    } else {
      targetArcLength = u * arcLengths[il - 1];
    }

    // binary search for the index with largest value smaller than target u distance
    var low = 0, high = il - 1, comparison;
    while (low <= high) {
      i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats
      comparison = arcLengths[i] - targetArcLength;
      if (comparison < 0) {
        low = i + 1;
      } else if (comparison > 0) {
        high = i - 1;
      } else {
        high = i;
        break;
        // DONE
      }
    }

    i = high;
    if (arcLengths[i] === targetArcLength) {
      return i / (il - 1);
    }

    // we could get finer grain at lengths, or use simple interpolation between two points
    var lengthBefore = arcLengths[i];
    var lengthAfter = arcLengths[i + 1];
    var segmentLength = lengthAfter - lengthBefore;
    // determine where we are between the 'before' and 'after' points
    var segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
    // add that fractional amount to t
    var t = (i + segmentFraction) / (il - 1);
    return t;
  };

  getLength =() =>{
    var lengths = this.getLengths();
    return lengths[ lengths.length - 1 ];
  }

  // Get list of cumulative segment lengths
  getLengths = (divisions?) => {
    if (divisions === undefined) divisions = this.arcLengthDivisions;
    if (this.cacheArcLengths &&
      (this.cacheArcLengths.length === divisions + 1) &&
      !this.needsUpdate) {
      return this.cacheArcLengths;
    }

    this.needsUpdate = false;

    var cache = [];
    var current, last = this.getPoint(0);
    var p, sum = 0;
    cache.push(0);

    for (p = 1; p <= divisions; p++) {
      current = this.getPoint(p / divisions);
      sum += current.distanceTo(last);
      cache.push(sum);
      last = current;
    }

    this.cacheArcLengths = cache;
    return cache; // { sums: cache, sum: sum }; Sum is in the last element.
  };

  // CatmullRomCurve3.prototype.copy = function (source) {
  //   Curve.prototype.copy.call(this, source);
  //   this.points = [];
  //   for (var i = 0, l = source.points.length; i < l; i++) {
  //     var point = source.points[i];
  //     this.points.push(point.clone());
  //   }
  //   this.closed = source.closed;
  //   this.curveType = source.curveType;
  //   this.tension = source.tension;
  //   return this;
  // };

  // CatmullRomCurve3.prototype.toJSON = function () {
  //   var data = Curve.prototype.toJSON.call(this);
  //   data.points = [];
  //   for (var i = 0, l = this.points.length; i < l; i++) {
  //     var point = this.points[i];
  //     data.points.push(point.toArray());
  //   }

  //   data.closed = this.closed;
  //   data.curveType = this.curveType;
  //   data.tension = this.tension;
  //   return data;
  // };

  // CatmullRomCurve3.prototype.fromJSON = function (json) {
  //   Curve.prototype.fromJSON.call(this, json);
  //   this.points = [];
  //   for (var i = 0, l = json.points.length; i < l; i++) {
  //     var point = json.points[i];
  //     this.points.push(new Vector3().fromArray(point));
  //   }

  //   this.closed = json.closed;
  //   this.curveType = json.curveType;
  //   this.tension = json.tension;
  //   return this;
  // };
}
//CatmullRomCurve3.prototype.isCatmullRomCurve3 = true;