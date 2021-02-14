/* eslint-disable camelcase */
import { loadArcGISJSAPIModules } from 'jimu-arcgis';
import { RotateDirection } from '../../../config';
import AuxHelper from './common/aux-lines-helper';
import * as utils from '../utils/utils';
import Animat from './common/animat/animat';
import RealTimeSetting, {RealtimeSettingOptions} from './realtime-setting';

export interface InitOptions {
  geo?: any,
  options?: any,
}

export interface FlyCallbacks {
  isSettingMode?: (() => void),//Function,
  onFly?: (() => void),//Function,
  onPause?: (() => void),//Function,
  onStop?: (() => void),//Function,
  onUpdateProgress?: ((number) => void),//Function
}

export interface FlyOptions {
  fixTilt?: number; //d
  direction?: RotateDirection;
  debug?: boolean;
  sceneView: __esri.SceneView;
  callbacks?: FlyCallbacks;
}

export enum FlyState {
  //init
  INITED = -1,
  //before fly
  PREPARING = 0,//flying to init cam pos
  PREPARED,//inited cam after draw
  //flying
  //READY = 'ready',
  RUNNING,
  //PAUSED = 'paused',
  //INTERRUPTED = 'interrupted',
  //RESUME = 'resume',
  //stop
  STOPPED,
  //continue to slow down
  //DAMPING
}

export interface HitTestRes {
  z: number,
  dis: number
}

export default abstract class BaseFlyController{
  //glMatrix: any;
  vec3f64: any; vec3: any; glMatrix_vec3: any; glMatrix_vec3d: any;
  mat4f64: any; mat4: any; glMatrix_mat4: any; glMatrix_mat4d: any;
  cameraUtils: any;
  GLCamera: any;
  Point: any; //__esri.Point;
  sceneView: __esri.SceneView;
  esriMathUtils: any;

  watchUtils: __esri.watchUtils;
  //elements
  auxHelper?: AuxHelper;
  //cache
  cachedGeo: any;
  //animat
  animat: Animat;
  //realtimeSetting
  realtimeSetting: RealTimeSetting;

  //for cb
  callbacks: FlyCallbacks;

  _cache: {
    camera_gl: {
      pos: any;
      upDir: any;
    }
    lookAtTarget_gl: {
      pos: any;
      upAxis: any;
      baseAlt: any;
    };
    //initCam: any;
  };

  //state
  state: {
    DEBUG: boolean;
    flyState: FlyState;
    settingMode: boolean; //is in setting mode
    //segmentsNum: number;
    init: {
      geo?;
      options?//:RecordOption
    };
    shownProgress: number;
    _debugTime: boolean;
    _debug: {
      startTime: number;
      endTime: number;
    }
  };

  constructor(options: FlyOptions) {
    loadArcGISJSAPIModules([
      'esri/core/libs/gl-matrix-2/vec3f64',
      'esri/core/libs/gl-matrix-2/mat4f64',
      'esri/core/libs/gl-matrix-2/vec3',
      'esri/core/libs/gl-matrix-2/mat4',
      'esri/views/3d/support/cameraUtils',
      'esri/views/3d/webgl-engine/lib/Camera',
      'esri/geometry/Point',
      'esri/core/watchUtils',
      'esri/views/3d/support/mathUtils'
    ]).then(modules => {
      [
        this.vec3f64, this.mat4f64, this.vec3, this.mat4, this.cameraUtils, this.GLCamera, this.Point, this.watchUtils, this.esriMathUtils
      ] = modules;
      this.glMatrix_vec3 = this.vec3.vec3; this.glMatrix_vec3d = this.vec3f64.vec3f64;
      this.glMatrix_mat4 = this.mat4.mat4; this.glMatrix_mat4d = this.mat4f64.mat4f64;
    });

    this.clear();

    this.sceneView = options.sceneView;
    this.callbacks = options.callbacks;

    this.state.DEBUG = options.debug;
    if (this.state.DEBUG) {
      this.auxHelper = new AuxHelper({ sceneView: this.sceneView });
    }
    //events
    // this.sceneView.on('key-down', ((event) => {
    //   if (FlyState.RUNNING === this.state.flyState) {
    //     var keyPressed = event.key;
    //     if (keyPressed.slice(0, 5) === 'Arrow') {
    //       event.stopPropagation(); //TODO prevents panning with the arrow keys
    //     }
    //   }
    // }));
    // this.sceneView.on('drag', ((event) => {
    //   if (FlyState.RUNNING === this.state.flyState) {
    //     if ('start' === event.action) {
    //       this.pause();
    //     } else {
    //       event.stopPropagation(); //update===event.action
    //     }
    //   } else if (FlyState.PAUSED === this.state.flyState) {
    //     if ('end' === event.action) {
    //       //event.stopPropagation();
    //     }
    //   }
    // }));
    this.sceneView.on('drag', ((event) => {
      if (FlyState.RUNNING === this.state.flyState /*|| FlyState.PREPARING === this.state.flyState*/ ) {// in flying
        if ('start' === event.action) {
          this.pause();
        } else {
          //event.stopPropagation();
        }
      }
    }));
    this.sceneView.on('mouse-wheel', ((event) => {
      if (FlyState.RUNNING === this.state.flyState /*|| FlyState.PREPARING === this.state.flyState*/ ) {
        this.pause();
      }
    }));
  }
  destructor() {
    this.clear();
  }

  //states check
  isPrepared() {
    var state = this.state.flyState;
    if (state === null || state === FlyState.INITED){
      return false;
    } else {
      return true;//FlyState.INITED FlyState.PREPARED...
    }
  }

  isEnableToFly() {
    var state = this.state.flyState;
    if (state === FlyState.PREPARED || state === FlyState.STOPPED || state === FlyState.PREPARING) {
      return true;
    } else {
      return false;//, RUNNING,
    }
  }
  isEnableToPause() {
    var state = this.state.flyState;
    if (state === FlyState.RUNNING /*|| state === FlyState.PREPARING*/) { //flying | going to init pos
      return true;
    } else {
      return false;
    }
  }
  // setFlyState() {
  // }

  //camera
  // setCameraInfo(options) {
  //   var camera = null;
  //   if (options && options.cameraInfo) {
  //     camera = options.cameraInfo;
  //     this.initCamera = camera;
  //   }
  //   if (!camera) {
  //     camera = this.sceneView.camera.clone(); //cache current camera
  //   }
  //   this.setting.initCamPos.cameraHeight = camera.position.z;
  //   //this.fixTilt = camera.tilt;
  // }
  //getCameraInfo() {
  //cache current camera
  //}

  //fly lifecycle
  init(opts: InitOptions) {
    this.state.init = {
      geo: opts.geo,
      options: opts.options
    }

    this.state.flyState = FlyState.INITED;
    this.animat.reset();
  }
  prepare(opts: InitOptions) {
  }
  preparing(): Promise<any>  {
    const promise = new Promise((resolve, reject) => {
      this.state.flyState = FlyState.PREPARING;
      resolve();
    })
    return promise;
  }
  prepared(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.state.flyState = FlyState.PREPARED;

      setTimeout(() => {
        resolve();
      }, 50)
    })
    return promise;
  }
  abstract fly(options?);
  _doFly() {
    this.onStart();
  }

  pause(): Promise<any>  {
    if (false === this.isEnableToPause()) {
      return Promise.resolve();
    }
    //console.log('pause');
    this.stopAnimat();
    this.onPause();
    return Promise.resolve();
  }

  resume(animate?: boolean) {
    //this.state.flyState = FlyState.RESUME; //TODO
  }
  _resume = (fun): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      this.preparing().then(() => {
        //goBack to pause point, then go on flying
        fun.then(() => {
          this.prepared().then(() => {
            // if (this.interruptPrepareHandler) {
            //   this.interruptPrepareHandler.remove();
            // }
            // if (this.state.flyState === FlyState.INTERRUPTED) {
            //  this.pause();
            // } else {
            if (this.state._debugTime) {
              this._debugTimeStart();
            }
            return this._doFly();
            // }
          })
        })
      }).catch((err) => {
        return reject();
        console.log('rejected:', err)
      });

    });
    return promise;
  }

  stop() {
    if (this.state?._debugTime) {
      this._debugTimeEnd();
      this._debugDeltaTime();
    }

    this.stopAnimat();
    //this.clear();
    this.onStop();
  }

  clear() {
    this.animat?.stop();

    this.state = {
      DEBUG: false,
      flyState: null,//FlyState.INITED,
      settingMode: false,
      init: {
        geo: null,
        options: null
      },
      shownProgress: 0,
      _debugTime: false,
      _debug: {
        startTime: null,
        endTime: null
      }
    };

    this.cachedGeo = null;
    this._cache = {
      camera_gl: {
        pos: null,
        upDir: null,
      },
      lookAtTarget_gl: {
        pos: null,
        upAxis: null,
        baseAlt: null
      },
    };

    this.animat = null;
    this.animat = new Animat();

    this.realtimeSetting = null;
    this.realtimeSetting = new RealTimeSetting();

    if (this.state.DEBUG) {
      this.auxHelper?.clearAll();
    }
  }



  //animat
  updateAnimat(fun): Promise<any> {
    // if(this.animatHandler){
    //   return;
    // }
    // this.animatHandler = this.scheduling.addFrameTask({
    //   //prepare: fun
    //   //render: fun
    //   update: (frameInfo) => { fun(frameInfo); }
    // });
    //this.onStart();
    return this.animat.update((frameInfo) => { fun(frameInfo); });
  }
  private stopAnimat() {
    // if (this.animatHandler) {
    //   this.animatHandler.pause();
    //   //resume()
    //   this.animatHandler.remove();
    //   this.animatHandler = null;
    // }
    this.animat.stop();
    this.updateProgressBar();
    //this.state.flyState = FlyState.STOPPED;
    this.onPause();
  }

  //real time setting
  settingPreview(isPreview: boolean): Promise<any>  {
    return new Promise((resolve, reject) => {
      this.state.settingMode = isPreview;
      if (true === isPreview) {
        this.fly({ animate: false });
        //setTimeout(() => {
        resolve();
        //}, 2000);
      } else {
        return this.pause();
      }
    });
  }
  setRuntimeSetting(settingParamObj: RealtimeSettingOptions, updateFun) {
    if (!settingParamObj) {/*false===this.state.settingMode ||*/
      return;
    }

    if (settingParamObj) {
      var shouldSet = false;
      var altitude = settingParamObj.altitude;
      if ('undefined' !== typeof altitude) {
        shouldSet = true;
        this.realtimeSetting.setAltitudeFactor(altitude);
      }
      var heading = settingParamObj.heading;
      if ('undefined' !== typeof heading) {
        shouldSet = true;
        this.realtimeSetting.setHeadingFactor(heading);
      }
      var tilt = settingParamObj.tilt;
      if ('undefined' !== typeof tilt) {
        shouldSet = true;
        this.realtimeSetting.setTiltFactor(tilt);
      }

      if (shouldSet && this.animat) {
        this.animat.insertAnExtraFrame((frameInfo) => { updateFun(frameInfo); });
      }
    }
  }


  //events
  onStart() {
    this.state.flyState = FlyState.RUNNING;
    //var t = new Date().getTime();
    //getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, 'flyStart', t));
    if(this.callbacks?.onFly){
      this.callbacks.onFly();
    }
  }
  onPause() {
    this.state.flyState = FlyState.STOPPED;//FlyState.PAUSED; //only STOPPED rightnow
    // var t = new Date().getTime();
    // getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, 'flyPause', t));
    if(this.callbacks?.onPause){
      this.callbacks.onPause();
    }
  }
  onStop(){
    this.state.flyState = FlyState.STOPPED;
    //var t = new Date().getTime();
    //getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, 'flyStop', t));
    if(this.callbacks?.onStop){
      this.callbacks.onStop();
    }
  }

  //progress
  abstract getProgress(): number;
  updateProgressBar() {
    if (this.callbacks?.onUpdateProgress) {
      //frequency reduction
      const p = Math.ceil(this.getProgress() * 100);
      let isUpdate = false;
      if (p <= 1 || p >= 99) {
        isUpdate = true;
      } else if (Math.abs(p - this.state.shownProgress) >= 1) {
        isUpdate = true;
      }

      if (true === isUpdate) {
        this.state.shownProgress = p;
      }

      if (isUpdate) {
        this.callbacks.onUpdateProgress(this.state.shownProgress);
      }
    }
  }

  //debug fly time
  _debugTimeStart() {
    this.state._debug.startTime = new Date().getTime();
  }
  _debugTimeEnd() {
    this.state._debug.endTime = new Date().getTime();
  }
  _debugDeltaTime(): number {
    if (this.state._debug.endTime > 0 && this.state._debug.startTime > 0) {
      var delta = this.state._debug.endTime - this.state._debug.startTime;
      console.log('debug_DeltaTime__' + delta / 1000 + '_s');
      alert('debug_DeltaTime__' + delta / 1000 + '_s');
      return delta;
    } else {
      return -1;
    }
  }


  //rotate
  //3D: scene mode / local mode
  rotateBySceneMode = (cameraPos_gl, upVec, rotateSpeed, offset_gl?) => {
    var tmpPos = this.glMatrix_vec3d.fromValues(cameraPos_gl[0], cameraPos_gl[1], cameraPos_gl[2]);

    if (this.sceneView.state.isLocal && offset_gl) {
      var offsetToOrigin = this.glMatrix_vec3d.create();
      this.glMatrix_vec3.negate(offsetToOrigin, offset_gl); //origin - offset_gl
      this.glMatrix_vec3.add(tmpPos, tmpPos, offsetToOrigin);
    }

    var rMatrix = this.glMatrix_mat4d.create();
    this.glMatrix_mat4.rotate(rMatrix, rMatrix, utils.degToRad(rotateSpeed), upVec);
    this.glMatrix_vec3.transformMat4(tmpPos, tmpPos, rMatrix);

    if (this.sceneView.state.isLocal && offset_gl) {
      this.glMatrix_vec3.subtract(tmpPos, tmpPos, offsetToOrigin);
    }
    return tmpPos;
  }
  //Dilution
  //TODO Thinning by lines angle, ex < 30
  getDilutionPath = (ref, max?) => {
    var maxNum = max || 3000;
    if (ref.length && ref.length > maxNum) {
      var res = [];
      var step = Math.floor(ref.length / maxNum);
      for (var i = 0, len = ref.length; i < len; i = i + step) {
        res.push(ref[i]);
      }
      return res;
    } else {
      return ref;
    }
  }
  //geo
  getDisLen = (start, end) => {
    var vecDir = this.glMatrix_vec3d.create();
    this.glMatrix_vec3.subtract(vecDir, end, start);
    var vecLen = this.glMatrix_vec3.length(vecDir);
    // if (vecLen < 1) {
    //   vecLen = 1;
    // }
    if (this.state.DEBUG) {
      console.log('LinerLen =>' + vecLen);
    }
    return vecLen;
  }
  //Elev
  queryGeometryElevInfo = (geometry) => {
    if(this.sceneView.groundView.elevationSampler){
      return this.sceneView.groundView.elevationSampler.queryElevation(geometry);
    } else if (geometry.hasZ) {
      return geometry;
    }
  }
  // getIncreaseSetp = () => {
  //   var step = this.sceneView.scale / 2000;
  //   return step;
  // }
  //hit-test
  // getHitTestInfo = (graphic) => {
  //   //"polyline" === graphic.geometry.type
  //   var paths = graphic.geometry.paths[0];
  //   var point = paths[0];
  //   this._getPointHitTestRes(point[0], point[1], this.sceneView).then((res: HitTestRes) => {
  //     this.setting.initCamPos.fixHeight = 100;//res.z;
  //     this.setting.initCamPos.fixDistance = 100;//res.dis;
  //   })
  // }
  // //Altitude
  // _getPointHitTestRes = (x, y, sceneView) => {
  //   const promise = new Promise((resolve, reject) => {
  //     var initPos = new this.Point({
  //       x: x,
  //       y: y,
  //       //z:
  //       type: 'point',
  //       spatialReference: sceneView.spatialReference
  //     });

  //     var screenPoint = sceneView.toScreen(initPos);
  //     //var tilt = sceneView.camera.tilt;
  //     sceneView.hitTest(screenPoint, { exclude: [sceneView.graphics] }).then((hitTestResult) => {
  //       var lastHit = utils.getHitPointOnTheGround(hitTestResult);
  //       var dis = Math.cos(utils.degToRad(90 - sceneView.camera.tilt)) * lastHit.distance;
  //       return resolve({
  //         z: lastHit.mapPoint.z,
  //         dis: dis
  //       });
  //     });
  //   });

  //   return promise;
  // }
  _coordsToGeoArray = (coords) => {
    var geos = [];
    var g;
    for(var i=0,len=coords.length; i<len; i++){
      g = this.glMatrix_vec3d.fromValues(coords[i].x, coords[i].y, coords[i].z);
      geos.push(g)
    }

    return geos;
  }
  //TODO catmull-rom only
  _coordToGeo = (coord) => {
    if (coord) {
      return this.glMatrix_vec3d.fromValues(coord.x, coord.y, coord.z);
    } else {
      return null;
    }
  }
}