import { utils as jimuUtils } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
import { FlyStyle } from '../../../config';
import * as utils from '../utils/utils';
import GraphicInteractionManager from '../graphic-interaction-manager';

interface Options {
  widget: any;
  manager: any;
  jimuMapView: JimuMapView;
  sceneView: __esri.SceneView;
}

// export enum PickMode {
//   RunTime = 'RUNTIME',
//   RecordPoint = 'RECORD_POINT',//TODO
//   RecordSmoothed = 'RECORD_CURVE',
//   RecordRealpath = 'RECORD_LINE',
// }

export default class PickingHelper {
  widget: any;
  manager: GraphicInteractionManager;
  sceneView: __esri.SceneView;
  jimuMapView: JimuMapView;
  pointerMoveEvent: any;
  pointerDownEvent: any;

  geoCache: any;//hoverHightlightHanlder

  constructor(options: Options) {
    this.widget = options.widget;
    this.manager = options.manager;
    this.sceneView = options.sceneView;
    this.jimuMapView = options.jimuMapView;

    //events
    if (this.pointerMoveEvent) {
      this.pointerMoveEvent.remove();
      this.pointerMoveEvent = null;
    }
    if (this.pointerDownEvent) {
      this.pointerDownEvent.remove();
      this.pointerDownEvent = null;
    }

    this.pointerMoveEvent = this.sceneView.on('pointer-move', this.pointerMoveHandler);
    this.pointerDownEvent = this.sceneView.on('pointer-down', this.pointerClickHandler);

    this.geoCache = {};
  }

  destructor() {
    this.clear();
    if (this.pointerMoveEvent) {
      this.pointerMoveEvent.remove();
      this.pointerMoveEvent = null;
    }
    if (this.pointerDownEvent) {
      this.pointerDownEvent.remove();
      this.pointerDownEvent = null;
    }
  }

  //states
  getState = () => {
    return this.widget.state.isPicking;
  }
  setState = (state/*: PickMode | null*/) => {
    if (true !== state) {
      this.cacheHoverHighlight(null, null);
    }

    this.widget.setState({ isPicking: state });
  }

  isPicking = () => {
    if (true === this.getState()) {
      return true;
    } else {
      return false;
    }
  }
  clear = () => {
    this.setState(null);
    this.cacheHoverHighlight(null, null);
    //this.cachePickedHighlight(null, null);
  }

  //events
  private pointerMoveHandler = (event) => {
    if (true === this.isPicking()) {
      this.sceneView.hitTest(event).then(this.highlightGraphicsByHover);
    }
  }
  private highlightGraphicsByHover = (response) => {
    var item = utils.getCurrentActiveItem(this.widget.props, this.widget.state);
    var name = item?.name;

    var results = response.results;
    if (results && results.length > 0) {
      var res0 = results[0];
      var graphic = res0.graphic;
      var type = graphic?.geometry?.type;

      if (type === 'polyline' && (name === FlyStyle.Path)) {
        this.sceneView.whenLayerView(graphic.layer).then((layerView) => {
          this.cacheHoverHighlight(layerView.highlight(graphic), graphic);
        });
      } else if (type === 'point' && (name === FlyStyle.Rotate)) {
        this.sceneView.whenLayerView(graphic.layer).then((layerView) => {
          this.cacheHoverHighlight(layerView.highlight(graphic), graphic);
        });
      }/* else if ((type === 'point' || type === 'polyline') && name === FlyStyle.Record) {
        //Record
        this.sceneView.whenLayerView(graphic.layer).then((layerView) => {
          this.cacheHoverHighlight(layerView.highlight(graphic), graphic);
        });
      }*/
    }
  }
  private pointerClickHandler = (event) => {
    if (true === this.isPicking()) {
      this.sceneView.hitTest(event).then(res => this.clickGraphicsByPick(res, event));
    }
  }
  private clickGraphicsByPick = (response, event) => {
    var results = response.results;
    if (results && results.length > 0) {
      var res0 = results[0];
      var graphic = res0.graphic;
      var type = graphic.geometry.type;

      if (type === 'polyline') {
        if (jimuUtils.isTouchDevice) {
          this.pickAndClickLine(graphic);//mobile
        } else if (utils.isPolylineEquals(graphic.geometry, this.geoCache.hoverHightlightGeo.geometry)) {
          this.pickAndClickLine(graphic);//desktop
        }
      } else if (type === 'point') {
        if (jimuUtils.isTouchDevice) {
          this.pickAndClickPoint(graphic);//mobile
        } else if (graphic.geometry.equals(this.geoCache.hoverHightlightGeo.geometry)) {
          this.pickAndClickPoint(graphic);//desktop
        }
      }
    }
  }
  pickAndClickPoint = (graphic) => {
    event.stopPropagation();

    this.manager.onPicked({
      graphic: graphic,
      cameraInfo: null
    });
  }
  pickAndClickLine = (graphic) => {
    event.stopPropagation();

    this.manager.onPicked({
      graphic: graphic,
      cameraInfo: null
    });
  }

  //cache
  private cacheHoverHighlight = (hanlder, geo) => {
    if (this.geoCache.hoverHightlightHanlder) {
      this.geoCache.hoverHightlightHanlder.remove();
    }
    this.geoCache.hoverHightlightGeo = null;
    this.geoCache.hoverHightlightHanlder = null;

    this.geoCache.hoverHightlightGeo = geo;
    this.geoCache.hoverHightlightHanlder = hanlder;
  }
}