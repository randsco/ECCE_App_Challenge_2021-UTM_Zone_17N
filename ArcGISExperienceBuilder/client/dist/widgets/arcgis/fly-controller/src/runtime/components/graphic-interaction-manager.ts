import { JimuMapView } from 'jimu-arcgis';
import DrawHelper, { DrawRes } from './helpers/draw-helper';
import HighlightHelper from './helpers/highlight-helper';
import PickHelper from './helpers/pick-helper';
import * as utils from './utils/utils';
import { FlyStyle } from '../../config';

interface Options {
  widget: any;
  jimuMapView: JimuMapView;
  sceneView: __esri.SceneView;
}

// export enum PickMode {
//   RunTime = 'RUNTIME',
//   RecordPoint = 'RECORD_POINT',//TODO
//   RecordSmoothed = 'RECORD_CURVE',
//   RecordRealpath = 'RECORD_LINE',
// }
interface States {
  isDrawing: boolean;
  isPicking: boolean;
  isPlaying?: boolean;
}

export default class GraphicInteractionManager {
  widget: any;

  sceneView: __esri.SceneView;
  jimuMapView: JimuMapView;

  pickHelper: PickHelper;
  drawHelper: DrawHelper;
  highlightHelper: HighlightHelper;

  cachePickedLine: any;

  constructor(options: Options) {
    this.widget = options.widget;
    this.sceneView = options.sceneView;
    this.jimuMapView = options.jimuMapView;

    this.pickHelper = new PickHelper({ widget: this.widget, manager: this, sceneView: this.sceneView, jimuMapView: this.jimuMapView });
    this.drawHelper = new DrawHelper({ widget: this.widget, manager: this, sceneView: this.sceneView, jimuMapView: this.jimuMapView });
    this.highlightHelper = new HighlightHelper({ sceneView: this.sceneView, jimuMapView: this.jimuMapView });

    this.cachePickedLine = null;
  }
  destructor() {
    this.clear();
    this.pickHelper.destructor();
    this.drawHelper.destructor();
    this.highlightHelper.destructor();
  }

  //callbacks
  onLoad = () => {
    this.widget.onGraphicInteractionManagerLoad();
  }

  isReady = () => {
    return this.drawHelper.ready;//async load
  }

  //States
  setStates = (stat: States) => {
    const drawing = (stat.isDrawing !== true) ? false : true;
    const picking = (stat.isPicking !== true) ? false : true;

    this.drawHelper?.setState(drawing);
    this.pickHelper?.setState(picking);
  }
  getStates = (): States => {
    return {
      isDrawing: this.drawHelper?.getState(),
      isPicking: this.pickHelper?.getState()
    }
  }


  clear = () => {
    this.cachePickedLine = null;
    // this.pickHelper?.EnablePopupAndHighlight();
    this.pickHelper?.clear();
    this.drawHelper?.clear();//clear draw res
    this.highlightHelper?.clear();

    this.setGeo(null, null);
  }

  private setGeo = (hanlder, geo) => {
    if (hanlder && geo) {
      this.widget.setState({ isCachedGeo: true });
    } else {
      this.widget.setState({ isCachedGeo: false });
    }

    this.highlightHelper?.cacheHighlightGraphic(hanlder, geo)
  }


  //1. draw
  toggleDrawState = () => {
    var isDraw = this.drawHelper?.getState();
    if (true === !isDraw) {
      this.pickHelper?.setState(null);
    }
    //this.setState({ isDrawing: !this.state.isDrawing })
    this.drawHelper?.setState(!isDraw)
  }
  drawPoint = (): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      this.beforInteract();

      this.drawHelper.drawPoint().then((res: DrawRes) => {
        return resolve(this.setAndHighlightGraphic(res));
      })
        .catch(function (error) { console.log(error); })
        .finally(() => {
          this.afterInteract();
          return resolve(null);//this.disableDrawing();
        });
    });

    return promise;
  }
  drawLine = (): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      this.beforInteract();

      this.drawHelper.drawLine().then((res: DrawRes) => {
        return resolve(this.setAndHighlightGraphic(res));
      })
        .catch(function (error) { console.log(error); })
        .finally(() => {

          this.afterInteract();
          return resolve(null);//this.disableDrawing();
        });
    });

    return promise;
  }


  //live view
  updateLineByAltitude = (altitude: number) => {
    if(null === altitude){
      return;
    }

    //1 drawn line
    if (!this.cachePickedLine) {
      this.drawHelper.updateLineByAltitude(altitude);
      return;
    }

    //2 picked line
    if(altitude > 0){
      this.highlightHelper.clear();//remove highlight raw line
      if(!this.drawHelper.isCachedGeo()){
        this.drawHelper.drawLine(this.cachePickedLine);//draw & highlight drawn line
      }

      this.drawHelper.updateLineByAltitude(altitude)
    } else {
      this.onPicked({graphic: this.cachePickedLine, cameraInfo:null}, true);//revert highlight raw line
    }
    //this.drawHelper.updateLineByAltitude(altitude);
  }
  // cleanLineAltitude = (res: DrawRes, needDrawAgain?: boolean) => {
  //   const g = res.graphic;
  //   if ('polyline' === g.geometry.type) {
  //     this.widget.resetLiveviewSetting();//clean liveview setting, when pick a line

  //     if (needDrawAgain) {
  //       this.drawHelper?.drawLine(res.graphic);
  //     }
  //   }
  // }


  //2.pick
  private validPicking = (res: DrawRes) => {
    let isValid = false;
    const { graphic } = res;
    const geo = graphic.geometry;

    var item = utils.getCurrentActiveItem(this.widget.props, this.widget.state);
    var flyStyle = item.name;
    if (flyStyle === FlyStyle.Rotate && (geo.type === 'point')) {
      isValid = true;
    } else if (flyStyle === FlyStyle.Path && (geo.type === 'polyline')) {
      isValid = true;
    }

    return isValid;
  }
  //pick-helper cb
  onPicked = (res: DrawRes, avoidTrigger?: boolean) => {
    if (!this.validPicking(res)) {
      return;
    }

    this.clear();

    if('polyline' === res.graphic.geometry.type) {
      this.setAndHighlightGraphic(res, 'pickline');//highlight raw line
      this.drawHelper?.drawLine(res.graphic);//then draw a line after pick
    } else {
      this.setAndHighlightGraphic(res);
    }

    if(true !== avoidTrigger){
      this.widget.onDrawHanlder(res);
    }
  }
  // isPicking = (): boolean => {
  //   return this.pickHelper?.isPicking();
  // }
  setPickingState = (isPicking: boolean) => {
    var currentState = isPicking;
    if (true === currentState) {
      this.beforInteract();//api popup
      this.drawHelper?.setState(false);
    } else {
      this.afterInteract();
    }

    this.pickHelper?.setState(currentState);
  }


  //3. highlight
  setAndHighlightGraphic = (res: DrawRes, mode?) => {
    var { graphic, cameraInfo } = res;
    this.setGeo(null, null);

    if (mode === 'pickline') {
      this.cachePickedLine = graphic;
    } else {
      this.cachePickedLine = null;
    }

    if (graphic.layer) {
      this.sceneView.whenLayerView(graphic.layer).then((layerView) => {
        this.setGeo(layerView.highlight(graphic), graphic);
      });
    } else if (this.drawHelper) {
      this.sceneView.whenLayerView(this.drawHelper.graphicslayer).then((layerView) => {
        this.setGeo(layerView.highlight(graphic), graphic);
      });
    }

    return {
      graphic: graphic,
      cameraInfo: cameraInfo
    }
  }

  //cache Popup&Highlight state
  private beforInteract = () => {
    this.highlightHelper?.cacheMapPopupHightlightState();
    this.highlightHelper?.disablePopupAndHighlight();//disable map default HighLight&Popup
  }
  private afterInteract = () => {
    this.restoreMapPopupHightlightState();
  }

  restoreMapPopupHightlightState = () => {
    this.highlightHelper?.restoreMapPopupHightlightState();
  }
}