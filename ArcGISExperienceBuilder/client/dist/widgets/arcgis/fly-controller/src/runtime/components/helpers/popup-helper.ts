import { JimuMapView } from 'jimu-arcgis';
import * as SceneView from 'esri/views/SceneView';

interface Options {
  jimuMapView: JimuMapView;
  sceneView: __esri.SceneView;
}

export default class PopupHelper {
  sceneView: SceneView;
  jimuMapView: JimuMapView;

  cache: {
    mapState: {
      popup: boolean,
      hightLight: boolean
    },
    // currentHighlightGeo: {
    //   hightlightGeo: any,
    //   hightlightHanlder: any
    // };
  }

  constructor(options: Options) {
    this.jimuMapView = options.jimuMapView;
    this.sceneView = options.sceneView;

    this.cache = {
      mapState: {
        popup: null,
        hightLight: null
      },
      // currentHighlightGeo: {
      //   hightlightGeo: null,
      //   hightlightHanlder: null
      // }
    }

    this.clearCacheMapState();
    //this.clearCacheHighlightGeo();
  }
  destructor() {
    //this.clear();
    this.restoreMapPopupHightlightState();
  }

  private clearCacheMapState = () => {
    this.cache.mapState = {
      popup: null,
      hightLight: null
    }
  }
  // private clearCacheHighlightGeo = () => {
  //   this.cache.currentHighlightGeo = {
  //     hightlightGeo: null,
  //     hightlightHanlder: null
  //   };
  // }

  //enable&disable
  enablePopupAndHighlight = () => {
    const jimuMapView = this.jimuMapView;
    if (jimuMapView) {
      jimuMapView.startEdit();
      jimuMapView.enablePopup();
      jimuMapView.enableHighlight();
      jimuMapView.exitEdit();
      //console.log("==> EnablePopupAndHighlight")
    }
  }
  disablePopupAndHighlight = () => {
    const jimuMapView = this.jimuMapView;
    if (jimuMapView) {
      jimuMapView.startEdit();
      jimuMapView.disablePopup();
      jimuMapView.disableHighlight();
      jimuMapView.exitEdit();
      //console.log("==> DisablePopupAndHighlight")
    }
  }

  //cache&restore
  cacheMapPopupHightlightState = () => {
    this.cache.mapState.popup = this.jimuMapView?.getIsEnablePopup();
    this.cache.mapState.hightLight = this.jimuMapView?.getIsEnableHighlight();
  }
  restoreMapPopupHightlightState = () => {
    const jimuMapView = this.jimuMapView;
    if (jimuMapView) {
      let update = false;
      jimuMapView.startEdit();

      const popup = this.cache.mapState.popup;
      if (true === popup) {
        jimuMapView.enablePopup();
        update = true;
      } else if (false === popup) {
        jimuMapView.disablePopup();
        update = true;
      }

      const hightLight = this.cache.mapState.hightLight;
      if (true === hightLight) {
        jimuMapView.enableHighlight();
        update = true;
      } else if (false === hightLight) {
        jimuMapView.disableHighlight();
        update = true;
      }

      if (update) {
        this.clearCacheMapState();//restore once
      }

      jimuMapView.exitEdit();
    }
  }

  // getIsEnablePopupAndHighlight = () => {
  //   var jimuMapView = this.jimuMapView;
  //   if (jimuMapView) {
  //     jimuMapView.getIsEnablePopup();
  //     jimuMapView.getIsEnableHighlight();
  //   }
  // }

  //Graphic
  // getHighlightGraphic = () => {
  //   return this.cache.currentHighlightGeo.hightlightGeo;
  // }
  // cacheHighlightGraphic = (hanlder, geo) => {
  //   this.clear();
  //   this.cache.currentHighlightGeo.hightlightGeo = geo;
  //   this.cache.currentHighlightGeo.hightlightHanlder = hanlder;
  // }
  // clear = () => {
  //   if (this.cache.currentHighlightGeo.hightlightHanlder) {
  //     this.cache.currentHighlightGeo.hightlightHanlder.remove();
  //   }
  //   this.cache.currentHighlightGeo.hightlightGeo = null;
  //   this.cache.currentHighlightGeo.hightlightHanlder = null;
  // };
  // clear = () => {
  //   this.restoreMapPopupHightlightState();
  // }
}