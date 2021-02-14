/* eslint-disable camelcase */
import { loadArcGISJSAPIModules } from 'jimu-arcgis';
//import SceneView = require('esri/views/SceneView');
import * as utils from '../../utils/utils';
//import { any } from 'prop-types';

interface AuxOptions {
  // webMapId: string;
  // parentMapView: __esri.MapView;
  // parentMap:  __esri.Map;
  sceneView: __esri.SceneView;
}

export default class AuxLinesHelper {
  GraphicsLayer: any;
  Point: any;
  utils: any;
  Graphic: any;
  projectionUtils: any;
  webMercatorUtils: any;
  sceneView: __esri.SceneView;

  //layers
  _aux_graphicsLayer: __esri.GraphicsLayer;
  _aux_movingObjLayer: __esri.GraphicsLayer;

  constructor(options: AuxOptions) {
    loadArcGISJSAPIModules([
      'esri/layers/GraphicsLayer',
      'esri/geometry/Point',
      'esri/Graphic',
      'esri/views/3d/support/projectionUtils',
      'esri/geometry/support/webMercatorUtils',
    ]).then(modules => {
      [
        this.GraphicsLayer, this.Point, this.Graphic, this.projectionUtils, this.webMercatorUtils
      ] = modules;
      this._aux_graphicsLayer = new this.GraphicsLayer();
      this.sceneView.map.add(this._aux_graphicsLayer);
      this._aux_movingObjLayer = new this.GraphicsLayer();
      this.sceneView.map.add(this._aux_movingObjLayer);
    });

    this.sceneView = options.sceneView;
  }

  clearAll = () => {
    if (this._aux_graphicsLayer) {
      this._aux_graphicsLayer.removeAll(); //clean layer
    }
    if (this._aux_movingObjLayer) {
      this._aux_movingObjLayer.removeAll(); //clean layer
    }
  };
  deposeMoving = () => {
    this._aux_movingObjLayer.removeAll(); //clean layer
  };

  //aux point
  drawPoint = (mapPoint, color?) => {
    var c = color ? color : 'darkgreen';
    var point = new this.Graphic({
      geometry: mapPoint,
      symbol: {
        type: 'point-3d',
        symbolLayers: [{
          type: 'icon', size: 12,
          resource: { primitive: 'circle' },
          material: { color: c },
          outline: { color: 'limegreen' }
        }]
      }
    });
    this._aux_movingObjLayer.add(point);
    return point;
  };
  drawPoint_gl = (point_gl, color) => {
    var point_geo = utils.renderCoordToGeoCoord(point_gl, 1, this.sceneView);
    var pt = new this.Point({
      x: point_geo[0],
      y: point_geo[1],
      z: point_geo[2],
      type: 'point',
      spatialReference: this.sceneView.spatialReference
    });

    if (pt.z < 100) {
      pt.z = 100;
    }

    var c = color ? color : 'darkgreen';
    var point = new this.Graphic({
      geometry: pt,
      symbol: {
        type: 'point-3d',
        symbolLayers: [{
          type: 'icon', size: 12,
          // resource: { primitive: "circle" },
          // material: { color: c },
          // outline: { color: "limegreen" }
          resource: { primitive: 'circle' },
          material: { color: c },
          outline: { color: 'limegreen' }
        }]
      }
    });
    this._aux_movingObjLayer.add(point);
    return point;
  };
  //aux line
  drawLine = (linesPoints, color) => {
    var c = color ? color : 'lightblue';
    var line = new this.Graphic({
      geometry: {
        type: 'polyline',
        paths: linesPoints,
        spatialReference: this.sceneView.spatialReference
      },
      symbol: { type: 'line-3d', symbolLayers: [{ type: 'line', material: { color: c }, size: 3 }] }
    });
    this._aux_graphicsLayer.add(line);
    return line;
  };
  drawLineXY = (linesPoints, color) => {
    var xypoints = [];
    for (var i = 0, len = linesPoints.length; i < len; i++) {
      var p = linesPoints[i];
      var x = p[0], y = p[1], z = p[2];

      if (z === 0) {
        xypoints.push([x, y]);
      } else {
        xypoints.push([x, y, z]);
      }
    }

    var c = color ? color : 'lightblue';
    var line = new this.Graphic({
      geometry: {
        type: 'polyline',
        paths: xypoints,
        spatialReference: this.sceneView.spatialReference
      },
      symbol: { type: 'line-3d', symbolLayers: [{ type: 'line', material: { color: c }, size: 3 }] }
    });
    this._aux_graphicsLayer.add(line);
    return line;
  };
  drawLine_gl = (linesPoints, sceneView, color) => {
    var c = color ? color : 'lightblue';

    var geoLines = [];
    for (var i = 0, len = linesPoints.length; i < len; i++) {
      var p_gl = linesPoints[i];
      var p = utils.renderCoordToGeoCoord(p_gl, 1, sceneView);
      geoLines.push(p);
    }

    var line = new this.Graphic({
      geometry: {
        type: 'polyline',
        paths: geoLines,
        spatialReference: this.sceneView.spatialReference
      },
      symbol: { type: 'line-3d', symbolLayers: [{ type: 'line', material: { color: c }, size: 3 }] }
    });
    this._aux_graphicsLayer.add(line);
    return line;
  };

  /*
    aux_genAFakeLine = (refPoint) => {
      var lines = [];

      var octLon, octLat;
      if (true === this.sceneView.spatialReference.isWebMercator) {
        var extent = this.sceneView.extent;

        var p1 = webMercatorUtils.xyToLngLat(extent.xmax, extent.ymax);
        var p2 = webMercatorUtils.xyToLngLat(extent.xmin, extent.ymin);

        octLon = Math.abs(p1[0] - p2[0]) / 16;
        octLat = Math.abs(p1[1] - p2[1]) / 16;
      }

      var tmpLon = refPoint.longitude,
        tmpLat = refPoint.latitude;

      var p1 = [refPoint.x, refPoint.y, refPoint.z];

      tmpLon += octLon;
      tmpLat += octLat;
      var tp2 = webMercatorUtils.lngLatToXY(tmpLon, tmpLat);
      var p2 = [tp2[0], refPoint.y, 200];

      tmpLon += octLon;
      tmpLat += octLat;
      var tp3 = webMercatorUtils.lngLatToXY(tmpLon, tmpLat);
      var p3 = [tp3[0], tp3[1], 400];

      tmpLon -= octLon;
      tmpLat += octLat;
      var tp4 = webMercatorUtils.lngLatToXY(tmpLon, tmpLat);
      var p4 = [tp4[0], tp4[1], 100];

      tmpLon += 2*octLon;
      tmpLat += 2*octLat;
      var tp5 = webMercatorUtils.lngLatToXY(tmpLon, tmpLat);
      var p5 = [tp5[0], tp5[1], 100];

      tmpLon += octLon;
      tmpLat += 0//octLat;
      var tp6 = webMercatorUtils.lngLatToXY(tmpLon, tmpLat);
      var p6 = [tp6[0], tp6[1], 100];

      lines.push(p1, p2, p3, p4, p5, p6);

      // aux line
      this.aux_drawLine(lines);

      return lines;
    };


    mo.aux_genAFakeLine2 = function (refPoint) {
      var lines = [];

      var halfLon, halfLat;
      if (true === this.sceneView.spatialReference.isWebMercator) {
        var extent = this.sceneView.extent;

        var p1 = webMercatorUtils.xyToLngLat(extent.xmax, extent.ymax);
        var p2 = webMercatorUtils.xyToLngLat(extent.xmin, extent.ymin);

        halfLon = Math.abs(p1[0] - p2[0]) / 8;
        halfLat = Math.abs(p1[1] - p2[1]) / 8;
      }

      var tmpLon = refPoint.longitude,
        tmpLat = refPoint.latitude;

      var p1 = [refPoint.x, refPoint.y, refPoint.z];

      tmpLon += halfLon;
      tmpLat += halfLat;
      var tp2 = webMercatorUtils.lngLatToXY(tmpLon, tmpLat);
      var p2 = [tp2[0], tp2[1], 200];

      lines.push(p1, p2);

      // aux line
      this.aux_drawLine(lines);

      return lines;
    };*/
}