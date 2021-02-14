//import { FlyStyle, PathStyle } from '../../config';
//import { uuidv1 } from 'jimu-core';
import { FlyCallbacks } from './controllers/base-fly-controller';
import RotatingFly from './controllers/rotating-fly';
import CurveFly from './controllers/curve-fly';
import LineFly from './controllers/line-fly';
//import { utils } from 'svg.js';

export enum FlyMode {
  Rotate,
  Line,
  Curve
}

interface ControllerOptions {
  uuid: string;
  mode: FlyMode;
  debug?: boolean;
  sceneView: __esri.SceneView;
  callbacks: FlyCallbacks;
}

export default class ControllerFactory {
  // static generateUUID(): string { // Public Domain/MIT
  //   var d = new Date().getTime();//Timestamp
  //   var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //     var r = Math.random() * 16;//random number between 0 and 16
  //     if (d > 0) {//Use timestamp until depleted
  //       r = (d + r) % 16 | 0;
  //       d = Math.floor(d / 16);
  //     } else {//Use microseconds since page-load if supported
  //       r = (d2 + r) % 16 | 0;
  //       d2 = Math.floor(d2 / 16);
  //     }
  //     return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  // }

  static make(ops: ControllerOptions) {
    let controller;
    switch (ops.mode) {
      case FlyMode.Rotate: {
        controller = new RotatingFly({
          id: ops.uuid,//id: this.generateUUID(),
          sceneView: ops.sceneView,
          debug: ops.debug,
          callbacks: ops.callbacks,
        });
        break;
      }
      case FlyMode.Line: {
        controller = new LineFly({
          id: ops.uuid,
          sceneView: ops.sceneView,
          debug: ops.debug,
          callbacks: ops.callbacks,
        });
        break;
      }
      case FlyMode.Curve: {
        controller = new CurveFly({
          id: ops.uuid,
          sceneView: ops.sceneView,
          debug: ops.debug,
          callbacks: ops.callbacks,
        });
        break;
      }

      default: {
        console.log('ControllerFactory error:make mode ' + ops.mode);
      }
    }

    return controller;
  }

  // setControllerStyle(style) {
  //   this.state.activedFlyStyle = style;
  // }
  // private getControllerByItem(item) {
  //   var flyStyle = item.name;
  //   if (FlyStyle.Rotate === flyStyle) {
  //     //1. point
  //     if (this.rotationFlyController) {
  //       return this.rotationFlyController;
  //     }
  //   } else if (FlyStyle.Path === flyStyle) {
  //     //2. line
  //     var mode = this._getMode(item);
  //     if (PathStyle.Smoothed === mode) {
  //       if (this.curveFlyController) {
  //         return this.curveFlyController;
  //       }
  //     } else if (PathStyle.RealPath === mode) {
  //       if (this.lineFlyController) {
  //         return this.lineFlyController;
  //       }
  //     }
  //   }
  //   return null;
  // }


  //2. fly lifecycle
  // init = (opts: InitOptions) => {
  //   var flyController = this.getController();
  //   flyController?.init(opts);
  // }
  // prepare = (opts?: InitOptions) => {
  //   var flyController = this.getController();
  //   //param, options
  //   flyController?.prepare(opts);
  // }

  // fly(settingSpeed) {
  //   this.settingPreview(false);//clean state
  //   var flyController = this.getController();
  //   if (flyController.isEnableToFly()) {
  //     flyController.realtimeSetting.setSpeedFactor(settingSpeed);

  //     flyController.fly();
  //   }
  // }
  // stop() {
  //   var flyController = this.getController();
  //   if (flyController) {
  //     flyController.stop();
  //     flyController.clear();
  //   }
  // }
  // pause() {
  //   var flyController = this.getController();
  //   if (flyController.isEnableToPause()) {
  //     flyController.pause();
  //   }
  // }
  // getProgress() {
  //   var flyController = this.getController();
  //   return flyController.getProgress();
  // }

  // clear = () => {
  //   var flyController = this.getController();
  //   if (flyController) {
  //     flyController.clear();
  //   }
  // }


  //3. runtime setting
  // settingPreview = (isSetting) => {
  //   return new Promise((resolve, reject) => {
  //     var flyController = this.getController();
  //     flyController?.settingPreview(isSetting).then(()=>{
  //       resolve();
  //     })
  //   });
  // }
  // setSpeedFactor = (val) => {
  //   var flyController = this.getController();
  //   if (flyController) {
  //     //console.log('controller-manager Speed==>' + val);
  //     flyController.realtimeSetting.setSpeedFactor(val);
  //   }
  // }
  // onHeadingChange = (val) => {
  //   var flyController = this.getController();
  //   if (flyController) {
  //     //console.log('controller-manager Heading==>' + val);
  //     flyController.realtimeSetting.setHeadingFactor(val);
  //   }
  // }
  // onTiltChange = (val) => {
  //   var flyController = this.getController();
  //   if (flyController) {
  //     //console.log('controller-manager Tilt==>' + val);
  //     flyController.setRuntimeSetting({ tilt: val });
  //   }
  // }
  // onAltitudeChange = (val) => {
  //   var flyController = this.getController();
  //   if (flyController) {
  //     //console.log('controller-manager Altitude==>' + val);
  //     flyController.setRuntimeSetting({ altitude: val });
  //   }
  // }

  // getLiveviewSettingInfo() {
  //   var flyController = this.getController();
  //   if (flyController) {
  //     return flyController.getRuntimeSettingInfo();
  //   } else {
  //     return null;
  //   }
  // }

}