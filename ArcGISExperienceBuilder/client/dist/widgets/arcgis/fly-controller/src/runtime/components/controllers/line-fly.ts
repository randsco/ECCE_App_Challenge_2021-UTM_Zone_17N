/* eslint-disable camelcase */
import * as utils from '../utils/utils';
import RealPath from './common/path/real-path';
import BaseFlyController, { InitOptions } from './base-fly-controller';
import { EasingMode } from './common/animat/ease';

export default class LineFly extends BaseFlyController {
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
  //   } /*else if(this.getAltitudeFactor() < this.setting.initCamOffset.fixHeight){
  //     return this.getAltitudeFactor();
  //   } */else {
  //     return this.realtimeSetting.getAltitudeFactor();
  //   }
  // }
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////


  prepare = (initOpts?: InitOptions): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      var geo = initOpts?.geo ? initOpts?.geo : this.state.init.geo;

      if (!geo || 'polyline' !== geo.type) {
        alert('Wrong geo type!')
      }
      super.preparing();
      //var paths = geo.paths[0]; //format
      // if (this.state.DEBUG) {
      //   this.auxHelper.drawLineXY(paths, 'lightgreen');
      // }
      geo = this.queryGeometryElevInfo(geo);
      this.cachedGeo = this.getDilutionPath((geo as __esri.Polyline).paths[0]);
      this.paths = new RealPath(this.cachedGeo, this.sceneView, this.glMatrix_vec3, this.glMatrix_vec3d, this.esriMathUtils);

      var len = this.paths.getLength();
      this.animat.setAmount(len);

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

  // getSpeedByHight = (hight) => {
  //   // var factor = 1; //0.8; //1;
  //   // //var step = hight / 100 * factor;
  //   // var step = this.sceneView.scale / 2000;
  //   // return Math.ceil(step);
  //   return 1;
  // }

  _doFly = (): Promise<any> => {
    super._doFly();

    return this.updateAnimat((frameInfo) => {
      if (true === this.state.settingMode) {
        //stop there for realtime-setting
      } else {
        this.animat.easing(frameInfo.deltaTime, this.realtimeSetting.getSpeedFactor());
      }

      this.updateProgressBar();

      var isStopFly = (this.animat.getProgress() >= 1);
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

  getCameraByProgress = (progress?) => {
    var move0, move1;
    if (0 === this.animat.getProgress()) {
      move0 = this.animat.getAmount() * 0;
      this.animat.progressForward();
      move1 = this.animat.getAmount() * this.animat.getProgress();
    } else {
      move0 = this.animat.getAmount() * this.animat.progressBackward();
      move1 = this.animat.getAmount() * this.animat.getProgress();
    }
    var point0 = this.paths.getPoint(0, move0);
    var point1 = this.paths.getPoint(0, move1);

    var cameraPos_gl = [0, 0, 0];
    var lookAtPos_gl = [0, 0, 0];
    var worldUpVec = this.glMatrix_vec3d.create();

    if (point0.type === 'line') {
      var start = point0.point;
      var end = point1.point;

      var startPos_gl = start;//utils.geoCoordToRenderCoord([start[0], start[1], start[2] + elevOffest], null, this.sceneView);

      var camPos_gl = this.getCameraPosition(start, end);
      if (!camPos_gl) {
        camPos_gl = this._cache.camera_gl.pos;
      }

      this.sceneView.renderCoordsHelper.worldUpAtPosition(camPos_gl, worldUpVec); //up-aux-line

      cameraPos_gl[0] = camPos_gl[0];
      cameraPos_gl[1] = camPos_gl[1];
      cameraPos_gl[2] = camPos_gl[2];

      lookAtPos_gl[0] = startPos_gl[0];
      lookAtPos_gl[1] = startPos_gl[1];
      lookAtPos_gl[2] = startPos_gl[2];

    } else if (point0.type === 'rotate') {
      var prePos_gl = point0.points.pre;//utils.geoCoordToRenderCoord([prePos[0], prePos[1], prePos[2]], null, this.sceneView);
      var basePos_gl = point0.points.base;//utils.geoCoordToRenderCoord([basePos[0], basePos[1], basePos[2]], null, this.sceneView);
      var nextPos_gl = point0.points.next;//utils.geoCoordToRenderCoord([nextPos[0], nextPos[1], nextPos[2]], null, this.sceneView);

      var lastVec = this.glMatrix_vec3d.create();
      this.glMatrix_vec3.subtract(lastVec, basePos_gl, prePos_gl);
      var nextVec = this.glMatrix_vec3d.create();
      this.glMatrix_vec3.subtract(nextVec, nextPos_gl, basePos_gl);

      var lastLineLen = point0.lastLineLen;
      var start = this.paths.getPoint(0, lastLineLen - 0.02);
      var end = this.paths.getPoint(0, lastLineLen - 0.01);
      var camPos_gl = this.getCameraPosition(start.point, end.point);

      //var auxUpVec = this.glMatrix_vec3d.create();
      this.sceneView.renderCoordsHelper.worldUpAtPosition(basePos_gl, worldUpVec); //up-aux-line
      var angle = point0.angle;//utils.radToDeg(this.esriMathUtils.angle(lastVec, nextVec, auxUpVec));

      //TODO Quaternion
      //  var rotatedAngle = (angle / factor) * step;
      camPos_gl = this.rotateBySceneMode(camPos_gl, worldUpVec, angle, basePos_gl);

      cameraPos_gl[0] = camPos_gl[0];
      cameraPos_gl[1] = camPos_gl[1];
      cameraPos_gl[2] = camPos_gl[2];

      lookAtPos_gl[0] = basePos_gl[0];
      lookAtPos_gl[1] = basePos_gl[1];
      lookAtPos_gl[2] = basePos_gl[2];
    }

    //cache
    this._cache.camera_gl.pos = cameraPos_gl;
    this._cache.camera_gl.upDir = worldUpVec;
    this._cache.lookAtTarget_gl.pos = lookAtPos_gl;
    this._cache.lookAtTarget_gl.upAxis = null;//this.glMatrix_vec3d.create();
    this._cache.lookAtTarget_gl.baseAlt = null;//lastHit.mapPoint.z;

    return {
      lookAt: lookAtPos_gl,
      camPos: cameraPos_gl,
      up: worldUpVec,
      type: point0.type
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
    initPos.z = initPos.z + this.realtimeSetting.getAltitudeFactor();//fix Altitude
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

    if (this.state.DEBUG) {
      this.auxHelper.drawLine_gl([pos, lookAt], this.sceneView, 'yellow');
    }

    var glCamera = new this.GLCamera(pos, lookAt, up); //eye Pos, center Pos, up-direction
    var apiCamera = this.cameraUtils.internalToExternal(this.sceneView, glCamera);

    //TODO fix heading&tilt , moveto base-class
    // if(1){
    //apiCamera.heading = apiCamera.heading + this.getHeadingFactor();
    //apiCamera.tilt = apiCamera.tilt + this.getTiltFactor();
    //apiCamera.position.z = apiCamera.position.z + this.getAltitudeFactor();
    // }
    return apiCamera;
  }

  private getCameraPosition(basePos, nextPos) {
    if (basePos[0] === nextPos[0] && basePos[1] === nextPos[1] && basePos[2] === nextPos[2]) {
      return null;
    }

    var cameraHeight = this.realtimeSetting.getCamOffsetHeight() || 100; //metre
    var fixDistance = this.realtimeSetting.getCamOffsetDistance() || 100; //metre

    //1.init Pos
    var point1_gl = basePos;//utils.geoCoordToRenderCoord([basePos[0], basePos[1], basePos[2]], null, this.sceneView);
    var point2_gl = nextPos;//utils.geoCoordToRenderCoord([nextPos[0], nextPos[1], nextPos[2]], null, this.sceneView);

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
      this.auxHelper.drawPoint(initPos, 'red');
    }

    var fixedCamPos_gl = utils.geoCoordToRenderCoord([initPos.x, initPos.y, initPos.z], null, this.sceneView);

    //5. move camera
    //var glCamera = new this.GLCamera(fixedCamPos_gl, point1_gl, worldUpVec); //camPos, lookAtPos, up-direction
    //var apiCamera = this.cameraUtils.internalToExternal(this.sceneView, glCamera);
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