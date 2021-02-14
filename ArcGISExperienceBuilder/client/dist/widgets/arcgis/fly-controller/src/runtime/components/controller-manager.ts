import { FlyStyle, PathStyle/*, RotateDirection*/} from '../../config';
import { FlyState, InitOptions, FlyCallbacks } from './controllers/base-fly-controller';
import RotatingFly from './controllers/rotating-fly';
import CurveFly from './controllers/curve-fly';
import LineFly from './controllers/line-fly';

interface ControllerOptions {
  debug?: boolean;
  sceneView: __esri.SceneView;
  callbacks: FlyCallbacks;
}

export default class ControllerManager {
  sceneView: __esri.SceneView;
  //controllers
  rotationFlyController: RotatingFly;
  curveFlyController: CurveFly;
  lineFlyController: LineFly;
  //recordFlyController: RecordFly;

  state: {
    activedController: RotatingFly | CurveFly | LineFly | null;
    activedFlyStyle: FlyStyle | null;
    callbacks: any;
    debug: boolean;
  }

  constructor(options: ControllerOptions) {
    this.sceneView = options.sceneView;
    this.state = {
      activedController: null,
      activedFlyStyle: null,
      debug: options.debug,
      callbacks: options.callbacks,
    }
    //this.createOrUpdateControllers();
    this.rotationFlyController = new RotatingFly({
      sceneView: this.sceneView,
      debug: this.state.debug,
      callbacks: this.state.callbacks,
    });
    this.curveFlyController = new CurveFly({
      sceneView: this.sceneView,
      debug: this.state.debug,
      callbacks: this.state.callbacks,
    });
    this.lineFlyController = new LineFly({
      sceneView: this.sceneView,
      debug: this.state.debug,
      callbacks: this.state.callbacks,
    });
    // this.recordFlyController = new RecordFly({
    //   sceneView: this.sceneView,
    //   debug: this.state.debug,
    //   widget: this.state.callbacks
    // });
  }
  destructor() {
    this.stop();
    this.clearAll();
  }

  //1. setter , getter
  getController() {
    return this.state.activedController;
  }
  useController(item) {
    if (item) {
      this.state.activedController = this.getControllerByItem(item);//TODO change to use hashMap
      this.state.activedFlyStyle = item.name;
    } else {
      this.state.activedController = null;
      this.state.activedFlyStyle = null;
    }

    if (this.rotationFlyController !== this.state.activedController) {
      this.rotationFlyController.clear();
    }
    if (this.curveFlyController !== this.state.activedController) {
      this.curveFlyController.clear();
    }
    if (this.lineFlyController !== this.state.activedController) {
      this.lineFlyController.clear();
    }
  }

  getControllerStyle() {
    return this.state.activedFlyStyle;
  }
  // setControllerStyle(style) {
  //   this.state.activedFlyStyle = style;
  // }
  private getControllerByItem(item) {
    var flyStyle = item.name;
    if (FlyStyle.Rotate === flyStyle) {
      //1. point
      if (this.rotationFlyController) {
        return this.rotationFlyController;
      }
    } else if (FlyStyle.Path === flyStyle) {
      //2. line
      var mode = this._getMode(item);
      if (PathStyle.Smoothed === mode) {
        if (this.curveFlyController) {
          return this.curveFlyController;
        }
      } else if (PathStyle.RealPath === mode) {
        if (this.lineFlyController) {
          return this.lineFlyController;
        }
      }
    }
    return null;
  }
  _getMode(item) {
    var mode = PathStyle.Smoothed; //default
    if (item && item.name === FlyStyle.Path && item.style) {
      mode = item.style;
    }
    return mode;
  }

  //2. fly lifecycle
  init = (opts: InitOptions) => {
    var flyController = this.getController();
    flyController?.init(opts);
  }
  prepare = (opts?: InitOptions) => {
    var flyController = this.getController();
    //param, options
    flyController?.prepare(opts);
  }
  fly(settingSpeed) {
    this.settingPreview(false);//clean state
    var flyController = this.getController();
    if (flyController.isEnableToFly()) {
      flyController.realtimeSetting.setSpeedFactor(settingSpeed);

      flyController.fly();
    }
  }
  stop() {
    var flyController = this.getController();
    if (flyController) {
      flyController.stop();
      flyController.clear();
    }
    // if (this.rotationFlyController.state.flyState !== FlyState.STOPPED) {
    //   this.rotationFlyController.stop();
    // }
    // if (this.curveFlyController.state.flyState !== FlyState.STOPPED) {
    //   this.curveFlyController.stop();
    // }
    // if (this.lineFlyController.state.flyState !== FlyState.STOPPED) {
    //   this.lineFlyController.stop();
    // }
  }
  pause() {
    var flyController = this.getController();
    if (flyController.isEnableToPause()) {
      flyController.pause();
    }
    // if (this.rotationFlyController.state.flyState === FlyState.RUNNING) {
    //   this.rotationFlyController.pause();
    // }
    // if (this.curveFlyController.state.flyState === FlyState.RUNNING) {
    //   this.curveFlyController.pause();
    // }
    // if (this.lineFlyController.state.flyState === FlyState.RUNNING) {
    //   this.lineFlyController.pause();
    // }
  }
  getProgress() {
    var flyController = this.getController();
    return flyController.getProgress();
  }
  // resume = () => {
  //   if (this.rotationFlyController.state.flyState === FlyState.PAUSED) {
  //     this.rotationFlyController.resume();
  //   } else if (this.curveFlyController.state.flyState === FlyState.PAUSED) {
  //     this.curveFlyController.resume();
  //   } else if (this.lineFlyController.state.flyState === FlyState.PAUSED) {
  //     this.lineFlyController.resume();
  //   }
  // }
  clear = () => {
    var flyController = this.getController();
    if (flyController) {
      flyController.clear();
    }
  }
  clearAll () {
    if (this.rotationFlyController.state.flyState !== FlyState.RUNNING) {
      this.rotationFlyController.clear();
    }
    if (this.curveFlyController.state.flyState !== FlyState.RUNNING) {
      this.curveFlyController.clear();
    }
    if (this.lineFlyController.state.flyState !== FlyState.RUNNING) {
      this.lineFlyController.clear();
    }
  }

  //3. runtime setting
  settingPreview = (isSetting) => {
    return new Promise((resolve, reject) => {
      var flyController = this.getController();
      flyController?.settingPreview(isSetting).then(()=>{
        resolve();
      })
    });
  }
  setSpeedFactor = (val) => {
    var flyController = this.getController();
    if (flyController) {
      //console.log('controller-manager Speed==>' + val);
      flyController.realtimeSetting.setSpeedFactor(val);
    }
  }
  onHeadingChange = (val) => {
    var flyController = this.getController();
    if (flyController) {
      //console.log('controller-manager Heading==>' + val);
      flyController.realtimeSetting.setHeadingFactor(val);
    }
  }
  onTiltChange = (val) => {
    var flyController = this.getController();
    if (flyController) {
      //console.log('controller-manager Tilt==>' + val);
      flyController.setRuntimeSetting({ tilt: val });
    }
  }
  onAltitudeChange = (val) => {
    var flyController = this.getController();
    if (flyController) {
      //console.log('controller-manager Altitude==>' + val);
      flyController.setRuntimeSetting({ altitude: val });
    }
  }

  getLiveviewSettingInfo() {
    var flyController = this.getController();
    if (flyController) {
      return flyController.getRuntimeSettingInfo();
    } else {
      return null;
    }
  }


  //4. setable info
  // getSetableInfo() {
  //   var flyController = this.getController();
  //   if (flyController) {
  //     return flyController.realtimeSetting.initCamOffset;
  //   }
  // }
}