import { loadArcGISJSAPIModules, JimuMapView } from 'jimu-arcgis';
import * as webMercatorUtils from 'esri/geometry/support/webMercatorUtils';
import GraphicInteractionManager from '../graphic-interaction-manager';


interface DrawOptions {
  widget: any;
  manager: any;
  jimuMapView: JimuMapView;
  sceneView: __esri.SceneView;
}

export interface DrawRes {
  graphic: any, //TODO graphic.geometry
  cameraInfo: any,
}

//let PointType;
export default class DrawHelper {
  widget: any;
  manager: GraphicInteractionManager;
  Graphic: any;
  GraphicsLayer: any;
  Point: any;
  SketchViewModel: any;
  sceneView: __esri.SceneView;
  jimuMapView: JimuMapView;
  sketchVM: __esri.SketchViewModel;

  ready: boolean;
  //layers
  graphicslayer: __esri.GraphicsLayer;
  drawCompleteHanlder: any;
  //elevLayer

  //material
  materials: {
    markerColor: string | Array<any>;
    outlineColor: string | Array<any>;
    markerSize: number;
    startPtMarker: any;
    endPtMarker: any;
    lineColor: string | Array<any>
  };
  //cache
  _cache: {
    graphic: any;//__esri.Graphic;
    startPt: any;
    endPt: any;
  };

  constructor(options: DrawOptions) {
    loadArcGISJSAPIModules([
      'esri/Graphic',
      'esri/geometry/Point',
      'esri/layers/GraphicsLayer',
      'esri/widgets/Sketch/SketchViewModel',
    ]).then(modules => {
      [this.Graphic, this.Point, this.GraphicsLayer, this.SketchViewModel] = modules;
      this.graphicslayer = new this.GraphicsLayer({
        // elevationInfo: "relative-to-ground",//"absolute-height",
        // offset: 100,
        // unit: "meters"
      });

      this.sceneView.map.addMany([this.graphicslayer]);

      this.materials = {
        markerColor: '0D89FF',
        markerSize: 10,
        outlineColor: '[128, 128, 128, 0.8]',
        startPtMarker: this.getPointMaterials({ color: '#36D516', vOffset: 10 }),
        endPtMarker: this.getPointMaterials({ color: '#FF4159', vOffset: 10 }),
        lineColor: [13, 137, 255, 0.5]
      }
      //create Sketch
      this.sketchVM = null;

      this.ready = true;
      this.manager.onLoad();
    });

    this.widget = options.widget;
    this.manager = options.manager;
    this.sceneView = options.sceneView;
    this._cache = {
      graphic: null,
      startPt: null,
      endPt: null
    };
  }

  destructor() {
    this.sketchVM = null;
    this.cancel();
    this.destroySketchVM();
    this.cleanHanlder(); // delete point drawed
  }

  createSketchVM() {
    const route = {
      type: 'line-3d',
      symbolLayers: [{
        type: 'path',
        profile: 'quad', //strip
        height: 1,
        width: 1,
        material: { color: this.materials.lineColor },
        cap: 'round',
        join: 'round',
        castShadows: false
      }]
    };
    this.sketchVM = new this.SketchViewModel({
      layer: this.graphicslayer,
      view: this.sceneView,
      pointSymbol: this.getPointMaterials({ color: '#36D516', vOffset: 5 }),
      polylineSymbol: route,
      //polygonSymbol: extrudedPolygon,
    });
  }
  destroySketchVM() {
    this.sketchVM?.destroy();
    this.sketchVM = null;
  }

  //states
  getState = (): boolean => {
    return this.widget.state.isDrawing;
  }
  setState = (state: boolean) => {
    if (!state) {
      this.cancel();
      this.destroySketchVM();
      this.cleanHanlder(); // delete point drawed
    }

    this.widget.setState({ isDrawing: state });
  }

  drawPoint = (/*mapPoint?*/): Promise<any> => {
    // this.setMapCursor();
    // this.revertMapCursor();
    // var point = new this.Graphic({
    //   geometry: mapPoint,
    //   symbol: {
    //     type: "point-3d",
    //     symbolLayers: [{
    //       type: "icon", size: this.material.markerSize,
    //       resource: { primitive: "circle" },
    //       material: { color: this.material.markerColor },
    //       outline: { color: this.material.outlineColor }
    //     }]
    //   }
    // });
    //this.graphicslayer.add(point);
    //return point;
    const promise = new Promise((resolve, reject) => {
      this.createSketchVM();
      this.sketchVM.create('point', { mode: 'click' });
      this.drawCompleteHanlder = this.sketchVM.on('create', ((event) => {
        var initCameraInfo = null;
        if (event.state === 'complete' /*&& !event.cancelled*/) {
          initCameraInfo = this.sceneView.camera.clone();

          var graphic = event.graphic;
          this._cache.graphic = graphic;

          this.clear();
          this.graphicslayer.add(graphic);
          this.cleanHanlder();

          //update elev info
          graphic.geometry = this.queryGeometryElevInfo(graphic.geometry);

          return resolve({ graphic: graphic, cameraInfo: initCameraInfo }); //just on the ground
        } else if (event.state === 'cancel' /*&& true === event.cancelled*/) {
          return reject('cancel'); // drawHelper.cancel() or ESC-key
        }
      }));
    });

    return promise;
  }

  drawLine = (graphic?) => {
    const promise = new Promise((resolve, reject) => {
      if (graphic) {
        const g = this.doDrawLine(graphic);
        return resolve({ graphic: g, cameraInfo: initCameraInfo });
      } else {
        //2
        this.createSketchVM();
        this.sketchVM.create('polyline', { mode: 'click', hasZ: false });
        var initCameraInfo = null;
        this.drawCompleteHanlder = this.sketchVM.on('create', ((event) => {
          if (event.state === 'start') {
            this.clear(true);
            initCameraInfo = this.sceneView.camera.clone();
          } else if (event.state === 'complete' /*&& !event.cancelled*/) {
            var graphic = event.graphic;
            const g = this.doDrawLine(graphic);

            return resolve({ graphic: g, cameraInfo: initCameraInfo });
          } else if (event.state === 'cancel'/*&& true === event.cancelled*/) {
            //this.clear();
            return reject('cancel'); // drawHelper.cancel() or ESC-key
          }
        }));
      }
    });

    return promise;
  }
  private doDrawLine = (graphic) => {
    this.clear();

    this._cache.graphic = graphic;
    this.graphicslayer.add(graphic);
    this.cleanHanlder();

    graphic.geometry = this.queryGeometryElevInfo(graphic.geometry);//update elev info
    this.drawStartEndPoint(graphic);

    return graphic;
  }
  private drawStartEndPoint = (graphic) => {
    var path = graphic.geometry.paths[0];
    var startPt = path[0];
    var endPt = path[path.length - 1];

    this._cache.startPt = this.cacheAndAddPoint(startPt, this.materials.startPtMarker);
    this._cache.endPt = this.cacheAndAddPoint(endPt, this.materials.endPtMarker);
  }
  private cacheAndAddPoint(p, symbol) {
    let pt = p;

    if ('local' === this.sceneView.viewingMode) {
      pt = new this.Point({ x: pt[0], y: pt[1], z: pt[2], spatialReference: this.sceneView.spatialReference });
    } else {
      pt = this.xyToLngLat(pt[0], pt[1]);
      pt = new this.Point({ x: pt[0], y: pt[1] });

      pt = this.queryGeometryElevInfo(pt);
    }

    pt = new this.Graphic({
      geometry: pt,
      symbol: symbol,
      spatialReference: this.sceneView.spatialReference
    });
    this.graphicslayer.add(pt);
    return pt;
  }

  isCachedGeo = () => {
    return this._cache.graphic;
  }
  updateLineByAltitude = (alt) => {
    if (!this.isCachedGeo()) {
      return;
    }

    this.graphicslayer.removeAll(); //remove start/end pt, line

    var geo = this._cache.startPt.clone(); //start pt
    this.setGeoZ(geo, alt);
    this.graphicslayer.add(geo);

    geo = this._cache.endPt.clone(); //end pt
    this.setGeoZ(geo, alt);
    this.graphicslayer.add(geo);

    geo = this._cache.graphic.clone();
    if (geo.geometry && geo.geometry.paths) {
      var paths = geo.geometry.paths[0];
      for (var i = 0, len = paths.length; i < len; i++) {
        var p = paths[i];
        p[2] = p[2] + parseFloat(alt);
        //console.log("p[2]=>"+p[2]);
      }

      this.graphicslayer.add(geo);

      this.sceneView.whenLayerView(this.graphicslayer).then((layerView) => {
        layerView.highlight(geo);
      });
    }

    //this.graphicslayer.elevationInfo.offset = alt;
  }
  private setGeoZ = (geo, alt) => {
    if ('undefined' === typeof geo.geometry.z || isNaN(geo.geometry.z)) {
      geo.geometry.z = 0;
    }

    geo.geometry.z = geo.geometry.z + parseFloat(alt);
  }


  //elev info
  queryGeometryElevInfo = (geometry) => {
    return this.sceneView.groundView.elevationSampler.queryElevation(geometry)
  }

  //lifecycle
  cancel = () => {
    if (this.sketchVM && this.sketchVM.cancel) {
      this.sketchVM.cancel();
    }
  }
  cleanHanlder = () => {
    if (this.sketchVM && this.sketchVM.cancel) {
      this.sketchVM.cancel();
    }

    if (this.drawCompleteHanlder && this.drawCompleteHanlder.remove) {
      this.drawCompleteHanlder.remove();
    }
  }
  clear = (keepHanlderCommand?: boolean) => {
    this._cache = {
      graphic: null,
      startPt: null,
      endPt: null
    }

    this.graphicslayer?.removeAll();

    if (true !== keepHanlderCommand) {
      this.cleanHanlder();
    }
    //this.revertMapCursor();
  }

  //materials
  getPointMaterials = (option: { color: string, vOffset: number }) => {
    return {
      type: 'point-3d',
      symbolLayers: [{
        type: 'icon',
        //outline: { width: 4, color: '#36D516' },
        //resource: { primitive: "inverted-cone" },// for type: "object"
        material: { color: option.color },
        outline: { width: 4, color: '#FFF' }
      }],
      verticalOffset: {
        screenLength: option.vOffset,
        maxWorldLength: option.vOffset * 2,
        minWorldLength: option.vOffset
      },
      callout: {
        type: 'line',
        color: 'white',
        size: 2,
        border: { color: [50, 50, 50] }
      }
    }
  }

  //mouse styles
  // setMapCursor = () => {
  //   if (this.sceneView) {
  //     this.cache.cursorStyle = this.sceneView.get('cursor');
  //   }
  //   this.sceneView.set('cursor', 'crosshair');
  // }
  // revertMapCursor = () => {
  //   var cursorStyle = 'default';
  //   // if (this.cache && this.cache.cursorStyle) {
  //   //   cursorStyle = this.cache.cursorStyle;
  //   // }
  //   this.sceneView.set('cursor', cursorStyle);
  // }
  // _drawStartPoint = (graphic) => {
  //   var paths = graphic.geometry.paths[0];
  //   var point = paths[0];
  //   var p = utils.xyToLngLat(point[0], point[1]);

  //   point = new this.Point({x: p[0], y: p[1]});
  //   point = this.queryGeometryElevInfo(point);

  //   this._cache.startPt = new this.Graphic({
  //     geometry: point,
  //     symbol: this.materials.startPtMarker
  //   });
  //   this.graphicslayer.add(this._cache.startPt);
  // }
  // _drawEndPoint = (graphic) => {
  //   var paths = graphic.geometry.paths[0];
  //   var point = paths[paths.length - 1];
  //   var p = utils.xyToLngLat(point[0], point[1]);

  //   point = new this.Point({x: p[0], y: p[1]});
  //   point = this.queryGeometryElevInfo(point);

  //   this._cache.endPt = new this.Graphic({
  //     geometry: point,
  //     symbol: this.materials.endPtMarker
  //   });
  //   this.graphicslayer.add(this._cache.endPt);
  // }
  //this._tmpZ = 200;
  lngLatToXY = (tmpLon, tmpLat, elevZ) => {
    var tp = webMercatorUtils.lngLatToXY(tmpLon, tmpLat);
    var z = elevZ ? elevZ : 200;
    return [tp[0], tp[1], z];
  }
  xyToLngLat = (x, y) => {
    var p2 = webMercatorUtils.xyToLngLat(x, y);
    //halfLon = Math.abs(p1[0] - p2[0]) / 8;
    return p2;
  }
}