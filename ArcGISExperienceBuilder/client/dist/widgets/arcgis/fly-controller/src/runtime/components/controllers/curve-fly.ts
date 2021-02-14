/* eslint-disable camelcase */
import * as utils from '../utils/utils';
import BaseFlyController, { InitOptions } from './base-fly-controller';
import Bspline from './common/path/bspline';
import CatmullRomCurve from './common/path/catmull-rom-curve';
import { EasingMode } from './common/animat/ease';

export default class CurvedLinesFly extends BaseFlyController {
  esriMathUtils: any;
  paths: any;
  worldUpVec: any;
  upVec: any;

  duration: number;

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  setRuntimeSetting = (paramObj) => {
    super.setRuntimeSetting(paramObj, (() => {
      var apiCam = this.getApiCamera(this.getCameraByProgress());
      this.sceneView.goTo(apiCam, { animate: false });
    }));
  }
  /*
  getFlyTilt = () => {
    // var camGL = this.frameTasks[this._frameIdx];
    // var pos = camGL.cameraGL.pos;
    // var lookAt = camGL.cameraGL.lookAt;
    // var up = camGL.cameraGL.up;

    // var cam2Target = this.glMatrix_vec3d.create();
    // this.glMatrix_vec3.subtract(cam2Target, pos, lookAt);

    // var angle = this.glMatrix_vec3.angle(up, cam2Target);
    // angle = (90 - utils.radToDeg(angle));
    // console.log('angle==>' + angle);

    var task = this.frameTasks[this._frameIdx];
    var pos = task.cameraGL.pos;
    var lookAt = task.cameraGL.lookAt;
    var up = task.cameraGL.up;
////////////////////////////////////////
    var tmp = utils.renderCoordToGeoCoord(lookAt, 1, this.sceneView);
    var initPos = new this.Point({
      x: tmp[0], y: tmp[1], z: tmp[2], type: 'point',
      spatialReference: this.sceneView.spatialReference
    });
    initPos.z = initPos.z + this.getAltitudeFactor();//rawPos + runtime-setting altitude
    lookAt = utils.geoCoordToRenderCoord([initPos.x, initPos.y, initPos.z], null, this.sceneView);

    tmp = utils.renderCoordToGeoCoord(pos, 1, this.sceneView);
    initPos = new this.Point({
      x: tmp[0], y: tmp[1], z: tmp[2], type: 'point',
      spatialReference: this.sceneView.spatialReference
    });
    initPos.z = this.getCameraAltitude();//initPos.z - this.setting.initCamOffset.fixHeight + this.runtimeAltitudeHeight + this.tiltChangedHeight;
    pos = utils.geoCoordToRenderCoord([initPos.x, initPos.y, initPos.z], null, this.sceneView);
////////////////////////////////////////

    var cam2Target = this.glMatrix_vec3d.create();
    this.glMatrix_vec3.subtract(cam2Target, pos, lookAt);

    var angle = this.glMatrix_vec3.angle(up, cam2Target);
    angle = (90 - utils.radToDeg(angle));
    console.log('angle==>' + angle);

    return angle;
  }
  setFlyTilt = (tilt) => {
    var task = this.frameTasks[this._frameIdx];
    var pos = task.cameraGL.pos;
    var lookAt = task.cameraGL.lookAt;
    var up = task.cameraGL.up;
    var tmp = utils.renderCoordToGeoCoord(pos, 1, this.sceneView);
    var initPos = new this.Point({
      x: tmp[0], y: tmp[1], z: tmp[2], type: 'point',
      spatialReference: this.sceneView.spatialReference
    });
    // if(0 == this.runtimeAltitudeHeight){
    //   this.getAltitudeFactor();
    // }
    initPos.z = initPos.z - this.setting.initCamOffset.fixHeight + this.runtimeAltitudeHeight + this.tiltChangedHeight;
    //pos = utils.geoCoordToRenderCoord([initPos.x, initPos.y, initPos.z], null, this.sceneView);
    /////////////////

    tilt = utils.clampTilt(tilt);

    var oldTileAngle = this.getFlyTilt();
    oldTileAngle = utils.degToRad(oldTileAngle);
    var S = initPos.z / Math.tan(oldTileAngle);

    var h = S * Math.tan(utils.degToRad(tilt)); //new cam pos.z
    return h ;
  }*/
  getRuntimeSettingInfo() {
    //var cam = this.sceneView.camera;
    return {
      //heading: cam.heading,
      tilt: null,//this.getFlyTilt(),
      altitude: this.realtimeSetting.getAltitudeFactor()
    }
  }
  // getCameraAltitude() {
  //   if (this.realtimeSetting.getAltitudeFactor() === 0) {
  //     return this.realtimeSetting.initCamOffset.fixHeight;
  //   }/* else if(this.getAltitudeFactor() < this.setting.initCamOffset.fixHeight){
  //     return this.getAltitudeFactor();
  //   } */else {
  //     return this.realtimeSetting.getAltitudeFactor();
  //   }
  // }
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  preProcessing(cachedGeo) {
    var glGeos = [];
    //var dimension = cachedGeo[0].length
    // var f32 = new Float32Array(dimension * cachedGeo.length);
    // for(let i=0,l=cachedGeo.length; i<l; i++) {
    //   var p = cachedGeo[i];
    //   // p = utils.geoCoordToRenderCoord([p[0], p[1], p[2]], null, this.sceneView);
    //   // glGeos.push(p);
    //   glGeos[i+0] = p[0];
    //   glGeos[i+1] = p[1];
    //   glGeos[i+2] = p[2];
    // }
    // glGeos = utils.geoCoordToRenderCoord(new Float32Array(glGeos), cachedGeo.length, this.sceneView);

    for (let i = 0, l = cachedGeo.length; i < l; i++) {
      var p = cachedGeo[i];
      p = utils.geoCoordToRenderCoord([p[0], p[1], p[2]], null, this.sceneView);
      glGeos.push(p);
    }

    var threshold = 100;//m
    var vecDir = this.glMatrix_vec3d.create();
    for (let ii = 0; ii < (glGeos.length - 1); ii++) {
      var p0 = glGeos[ii];
      var p1 = glGeos[ii + 1];
      var p2 = glGeos[ii + 2];

      this.glMatrix_vec3.subtract(vecDir, p0, p1); //dir: 2->1
      var vecLen01 = this.glMatrix_vec3.length(vecDir);

      //insert point
      if (vecLen01 > threshold) {
        var angle = utils.getRotatedAngle(p0, p1, p2, this.glMatrix_vec3, this.glMatrix_vec3d, this.sceneView, this.esriMathUtils);
        if (angle >= 90 || angle <= -90) {
          var vecNor = this.glMatrix_vec3d.create();
          this.glMatrix_vec3.normalize(vecNor, vecDir);

          var tmp = this.glMatrix_vec3d.create();
          this.glMatrix_vec3.scale(tmp, vecNor, threshold);

          var pointTarget = this.glMatrix_vec3d.create();
          this.glMatrix_vec3.add(pointTarget, p1, tmp);

          glGeos.splice(ii + 1, 0, pointTarget);
          ii++;
          //console.log("add 1")
        }
      }
    }

    for (let i = 0, ll = glGeos.length; i < ll; i++) {
      var p = glGeos[i];
      p = utils.renderCoordToGeoCoord(p, null, this.sceneView)
      glGeos.splice(i, 1, p);
    }
    //glGeos = utils.renderCoordToGeoCoord(new Float32Array(glGeos), glGeos.length, this.sceneView)
    return glGeos;
  }

  prepare = (initOpts?: InitOptions): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      var geo = initOpts?.geo ? initOpts?.geo : this.state.init.geo;
      //options = initOpts?.options ? initOpts?.options : this.state.init.options;
      if (!geo || 'polyline' !== geo.type) {
        alert('Wrong geo type!')
      }
      super.preparing();
      geo = this.queryGeometryElevInfo(geo);
      this.cachedGeo = this.getDilutionPath((geo as __esri.Polyline).paths[0]); //Dilution
      this.cachedGeo = this.preProcessing(this.cachedGeo);

      var bspline = new Bspline(this.cachedGeo);
      var crCurve = new CatmullRomCurve(bspline.getSpline());
      bspline.clear();

      var len = crCurve.getLength();
      this.animat.setAmount(len);

      this.paths = crCurve;
      if (this.state.DEBUG) {
        this.auxHelper.drawLineXY(this.paths, 'lightgreen');
      }
      //TODO back fly

      //goto 1st pos
      var apiCamera = this.getApiCamera(this.getCameraByProgress());
      this.sceneView.goTo(apiCamera).then(() => {
        super.prepared().then(() => {
          resolve();
        });
      }).catch(function (error) { console.log(error); })
    });
    return promise;
  }

  fly = (options?): Promise<any> => {
    if (options) {
      if (options.speedFactor) {
        this.realtimeSetting.setSpeedFactor(options.speedFactor);
      }
      if (options.duration) {
        this.duration = options.duration;
      }
    }

    if (!this.state.settingMode) {
      var d = this.animat.computeDuration();
      this.animat.init(EasingMode.Linear, 0, this.animat.getAmount(), this.duration || d);
    }

    if (super.isEnableToFly()) {
      return this.resume();
    }

    return Promise.reject();
  }

  //=>
  // "cameraOfFlyElevation/100*factor"(factor=1) as default speed per frame,
  //eg. factor=2 is double-speed to default, 0.5 is half-speed to default
  // getSpeedByHight = (hight) => {
  //   // var factor = 1; //0.8; //1;
  //   // //var step = hight / 100 * factor;
  //   // var step = this.sceneView.scale / 2000;

  //   // return Math.ceil(step);
  //   return 1;
  // }

  _doFly = () => {
    super._doFly();

    this.updateAnimat((frameInfo) => {
      if (true === this.state.settingMode) {
        //stop there for realtime-setting
      } else {
        this.animat.easing(frameInfo.deltaTime, this.realtimeSetting.getSpeedFactor());
      }

      this.updateProgressBar();

      var isStopFly = (this.getProgress() >= 1);
      if (!isStopFly) {
        var task = this.getCameraByProgress();
        var apiCamera = this.getApiCamera(task);
        if (apiCamera) {
          this.sceneView.goTo(apiCamera, { animate: false });
        }
      } else {
        this.animat.reset();
        this.stop();
      }
    });
  }

  getProgress = () => {
    return this.animat.getProgress();
  }

  getCameraByProgress = () => {
    var move0, move1;
    if (0 === this.animat.getProgress()) {
      move0 = this.animat.getAmount() * 0;
      this.animat.progressForward();
      move1 = this.animat.getAmount() * this.animat.getProgress();
    } else {
      move0 = this.animat.getAmount() * this.animat.progressBackward();
      if (move0 < 0) {
        move0 = 0;
        this.animat.progressForward();
      }
      move1 = this.animat.getAmount() * this.animat.getProgress();
    }

    var point0 = this.paths.getUtoTmapping(0, move0);
    point0 = this.paths.getPoint(point0);
    point0 = this._coordToGeo(point0);

    var point1 = this.paths.getUtoTmapping(0, move1);
    point1 = this.paths.getPoint(point1);
    point1 = this._coordToGeo(point1);

    var elevOffest = 0;
    var startPos_gl = utils.geoCoordToRenderCoord([point0[0], point0[1], point0[2] + elevOffest], null, this.sceneView);

    var camPos_gl = this.getCameraPosition(point0, point1);
    if (!camPos_gl) {
      camPos_gl = this._cache.camera_gl.pos;
    }

    var worldUpVec = this.glMatrix_vec3d.create();
    this.sceneView.renderCoordsHelper.worldUpAtPosition(camPos_gl, worldUpVec); //up-aux-line

    var cameraPos_gl = [0, 0, 0];
    cameraPos_gl[0] = camPos_gl[0];
    cameraPos_gl[1] = camPos_gl[1];
    cameraPos_gl[2] = camPos_gl[2];
    var lookAtPos_gl = [0, 0, 0];
    lookAtPos_gl[0] = startPos_gl[0];
    lookAtPos_gl[1] = startPos_gl[1];
    lookAtPos_gl[2] = startPos_gl[2];

    //cache
    this._cache.camera_gl.pos = cameraPos_gl;
    this._cache.camera_gl.upDir = worldUpVec;
    this._cache.lookAtTarget_gl.pos = lookAtPos_gl;
    this._cache.lookAtTarget_gl.upAxis = null;//this.glMatrix_vec3d.create();
    this._cache.lookAtTarget_gl.baseAlt = null;//lastHit.mapPoint.z;

    return {
      lookAt: lookAtPos_gl,
      camPos: cameraPos_gl,
      up: worldUpVec
    }
  }
  getApiCamera = (cam) => {
    var pos = cam.camPos,
      lookAt = cam.lookAt,
      up = cam.up;
    if (!pos || !lookAt || !up) {
      return null;
    }

    var baseAlt = 0;

    //lookAt
    var tmp = utils.renderCoordToGeoCoord(lookAt, 1, this.sceneView);
    var initPos = new this.Point({
      x: tmp[0], y: tmp[1], z: tmp[2], type: 'point',
      spatialReference: this.sceneView.spatialReference
    });
    baseAlt = initPos.z;
    initPos.z = initPos.z + this.realtimeSetting.getAltitudeFactor();//rawPos + runtime-setting altitude
    if (initPos.z < 0) {
      initPos.z = 0;
    }
    lookAt = utils.geoCoordToRenderCoord([initPos.x, initPos.y, initPos.z], null, this.sceneView);

    //pos
    tmp = utils.renderCoordToGeoCoord(pos, 1, this.sceneView);
    initPos = new this.Point({
      x: tmp[0], y: tmp[1], z: tmp[2], type: 'point',
      spatialReference: this.sceneView.spatialReference
    });
    initPos.z = baseAlt + this.realtimeSetting.getAltitudeFactor() + this.realtimeSetting.getCamOffsetHeight();
    pos = utils.geoCoordToRenderCoord([initPos.x, initPos.y, initPos.z], null, this.sceneView);

    var glCamera = new this.GLCamera(pos, lookAt, up); //eye Pos, center Pos, up-direction
    var apiCamera = this.cameraUtils.internalToExternal(this.sceneView, glCamera);

    return apiCamera;
  }

  //test route on the sky
  private getCameraRoutes = (line) => {
    var cameraRoutes = [];
    for (var i = 0, len = line.length - 1; i < len; i++) {
      var p1 = line[i];
      var p2;
      if (i === len - 1) {
        p2 = p1;
      } else {
        p2 = line[i + 1];
      }

      var cp = this.getCameraPosition(p1, p2);
      if (cp) {
        cameraRoutes.push(cp);
      }
    }
    if (this.state.DEBUG) {
      this.auxHelper.drawLine_gl(cameraRoutes, this.sceneView, 'yellow');
    }
    return cameraRoutes;
  }

  getCameraPosition = (basePos, nextPos) => {
    if (basePos[0] === nextPos[0] && basePos[1] === nextPos[1] && basePos[2] === nextPos[2]) {
      return null;
    }

    var cameraHeight = this.realtimeSetting.getCamOffsetHeight() || 100; //metre
    var fixDistance = this.realtimeSetting.getCamOffsetDistance() || 100; //metre
    //var fixDistance = fixHeight / Math.tan(utils.degToRad(90 - this.fixTilt));
    //worldUpVec
    //var innerGLCamera_copy = this.sceneView.state.camera.clone();
    //var cameraPos = innerGLCamera_copy.eye;
    //var worldUpVec = this.glMatrix_vec3d.create();
    //this.sceneView.renderCoordsHelper.worldUpAtPosition(cameraPos, worldUpVec); //up-aux-line
    //this.worldUpVec = worldUpVec;

    //1.init Pos
    var point1_gl = utils.geoCoordToRenderCoord([basePos[0], basePos[1], basePos[2]], null, this.sceneView);
    var point2_gl = utils.geoCoordToRenderCoord([nextPos[0], nextPos[1], nextPos[2]], null, this.sceneView);

    var vecDir = this.glMatrix_vec3d.create();
    this.glMatrix_vec3.subtract(vecDir, point1_gl, point2_gl); //dir: 2->1
    var vecLen = this.glMatrix_vec3.length(vecDir);

    var vecNor = this.glMatrix_vec3d.create();
    this.glMatrix_vec3.normalize(vecNor, vecDir);

    var tarLen = vecLen + fixDistance; //fix distance
    var tmp = this.glMatrix_vec3d.create();
    this.glMatrix_vec3.scale(tmp, vecNor, tarLen);

    var pointTarget = this.glMatrix_vec3d.create();
    this.glMatrix_vec3.add(pointTarget, point2_gl, tmp);

    var pMove_pos = utils.renderCoordToGeoCoord(pointTarget, 1, this.sceneView);
    var initPos = new this.Point({
      x: pMove_pos[0],
      y: pMove_pos[1],
      z: pMove_pos[2],
      type: 'point',
      spatialReference: this.sceneView.spatialReference
    });
    if (initPos.z < cameraHeight) {
      initPos.z = cameraHeight;
    }
    if (initPos.z < 0) {//for under the ground
      initPos.z = 0;
    }
    if (this.state.DEBUG) {
      this.auxHelper.drawPoint(initPos);
    }

    var fixedCamPos_gl = utils.geoCoordToRenderCoord([initPos.x, initPos.y, initPos.z], null, this.sceneView);
    //5 for test
    //var glCamera = new this.GLCamera(fixedCamPos_gl, point1_gl, worldUpVec); //camPos, lookAtPos, up-direction
    //var apiCamera = this.cameraUtils.internalToExternal(this.sceneView, glCamera);
    // this.sceneView.goTo(apiCamera/*,{animate:false}*/).then(lang.hitch(this, function () {
    //   return def.resolve();
    // }));
    return fixedCamPos_gl;
  }

  resume = (): Promise<any> => {
    super.resume();
    return this._resume(this.sceneView.goTo(this.getApiCamera(this.getCameraByProgress())));
  }

  // stop = () => {
  //   if(this.frameTasks){
  //     this.frameTasks = null;
  //     this.frameTasks = [];
  //   }
  //   super.stop();
  // }
  clear = () => {
    // this._frameIdx = -1;
    // if(this.frameTasks) {
    //   this.frameTasks = null;
    //   this.frameTasks = [];
    // }
    super.clear();
  }
}