import * as utils from '../utils/utils';

export interface RealtimeSettingOptions {
  tilt?: number;
  altitude?: number;
  heading?: number;
}

export default class RealtimeSetting {
  //runtime setting
  private initCamOffset: {
    height: number;
    distance: number;
  };
  //in runtime setting popup
  speedFactor: number;
  fixHeading: number;
  fixTilt: number;
  fixAltitude: number;

  constructor(/*options: FlyOptions*/) {
    //super(options);
    this.initCamOffset = {
      height: 0,
      distance: 0
    };
    this.speedFactor = 1;
    this.fixHeading = 0;
    this.fixTilt = 0;
    this.fixAltitude = 0;
    //init them for line fly:
    this.initCamOffset.height = 60; //m
    this.initCamOffset.distance = 90; //m
  }

  getCamOffsetHeight() {
    return this.initCamOffset.height;
  }
  getCamOffsetDistance() {
    return this.initCamOffset.distance;
  }
  //runtime setting
  // setSettingModeFlag = (isSettingMode) => {
  //   this.state.settingMode = isSettingMode;
  // }
  // settingPreview = (isPreview: boolean) => {
  //   this.state.settingMode = isPreview;
  //   if (true === isPreview) {
  //     this.fly({animate: false});
  //   } else {
  //     this.pause();
  //   }
  // }
  // setRuntimeSetting(settingParamObj: SettingParam, updateFun) {
  //   if (false===this.state.settingMode || !settingParamObj) {
  //     return;
  //   }

  //   if (settingParamObj) {
  //     var shouldSet = false;
  //     var altitude = settingParamObj.altitude;
  //     if ('undefined' !== typeof altitude) {
  //       shouldSet = true;
  //       this.setAltitudeFactor(altitude);
  //     }
  //     var heading = settingParamObj.heading;
  //     if ('undefined' !== typeof heading) {
  //       shouldSet = true;
  //       this.setHeadingFactor(heading);
  //     }
  //     var tilt = settingParamObj.tilt;
  //     if ('undefined' !== typeof tilt) {
  //       shouldSet = true;
  //       this.setTiltFactor(tilt);
  //     }

  //     if (shouldSet && this.animat) {
  //       // this.scheduling.schedule((frameInfo) => {
  //       //   updateFun(frameInfo);
  //       // });
  //       this.animat.insertAnExtraFrame((frameInfo) => { updateFun(frameInfo); });
  //     }
  //   }
  // }
  // updateCurrentCamera = (fun?) => {
  //   // this.scheduling.schedule(() => {
  //   //   var camera = this.sceneView.camera.clone();
  //   //   //camera.heading += this.getHeadingFactor();
  //   //   camera.tilt = this.getTiltFactor();
  //   //   console.log("camera.tilt==>" + camera.tilt )
  //   //   //camera.position.z = this.getAltitudeFactor();
  //   //   this.sceneView.goTo(camera, { animate: false });
  //   // });
  // }
  //speed
  setSpeedFactor(speed?) {
    var speedFactor;
    if ('undefined' === typeof speed) {
      speedFactor = 1;
    } else {
      speedFactor = speed;
    }
    this.speedFactor = parseFloat(speedFactor);
  }
  getSpeedFactor() {
    if ('undefined' === typeof this.speedFactor) {
      return 1;
    } else {
      return utils.speedMapping(this.speedFactor);
    }
  }
  setHeadingFactor(heading?) {
    var fixHeading = 0;
    if ('undefined' !== typeof heading) {
      fixHeading = parseFloat(heading);
    }
    this.fixHeading = fixHeading;
    //this.updateCurrentCamera();
  }
  getHeadingFactor() {
    return this.fixHeading || 0;
  }
  setTiltFactor(tilt?) {
    var fixTilt = 0;
    if ('undefined' !== typeof tilt) {
      fixTilt = parseFloat(tilt);
    }
    this.fixTilt = fixTilt;
    //this.updateCurrentCamera();
  }
  getTiltFactor() {
    return this.fixTilt || 0;
  }

  setAltitudeFactor(altitude?) {
    var fixAltitude = 0;
    if ('undefined' !== typeof altitude) {
      fixAltitude = parseFloat(altitude);
    }
    this.fixAltitude = fixAltitude;
    //this.updateCurrentCamera();
  }
  getAltitudeFactor() {
    //console.log('getAltitudeFactor==>' + this.fixAltitude);
    return this.fixAltitude || 0;
  }
  // startRuntimeSettingAnimat(fun) {
  //   this.runtimeSettingScheduler = this.scheduling.addFrameTask({
  //     update: () => { fun(); }
  //   });
  // }
  // stopRuntimeSettingAnimat() {
  //   if (this.runtimeSettingScheduler) {
  //     this.runtimeSettingScheduler.remove();
  //   }
  // }
  getRuntimeSettingInfo() {
    /*var cam = this.sceneView.camera;
    return {
      //heading: cam.heading,
      tilt: cam.tilt,
      altitude: cam.position.z
    }*/
  }
}