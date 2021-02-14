/* eslint-disable camelcase */
import * as utils from '../utils/utils';
import BaseFlyController, { InitOptions } from './base-fly-controller';
import { RotateDirection } from '../../../config';
import { EasingMode } from './common/animat/ease';

export default class RotatingFly extends BaseFlyController {
  direction: any;

  duration: number;
  angleLimit: number;

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  settingPreview = (isPreview: boolean): Promise<any> => {
    return new Promise((resolve, reject) => {
      super.settingPreview(isPreview).then(() => {
        this.setRuntimeSetting(this.getRuntimeSettingInfo());
        resolve();
      })
    });
  }
  setRuntimeSetting = (paramObj) => {
    super.setRuntimeSetting(paramObj, (() => {
      if (paramObj && paramObj.tilt && this._cache.lookAtTarget_gl.pos) { //TODO
        var h = this.setFlyTilt(paramObj.tilt);

        var camera = this.sceneView.camera.clone();
        camera.position.z = h + this._cache.lookAtTarget_gl.baseAlt;// fix baseAlt
        if (camera.position.z < 0) {//up-on the ground
          camera.position.z = 0;
        }

        var cameraFixed_gl = this.cameraUtils.externalToInternal(this.sceneView, camera);
        this._cache.camera_gl.pos = cameraFixed_gl.eye;
        this._cache.camera_gl.upDir = cameraFixed_gl.up;

        this.sceneView.goTo(this.getApiCamera(), { animate: false })
      }
    }));
  }
  getFlyTilt = () => {
    if (!this._cache.lookAtTarget_gl.pos) {
      return
    }

    var cam2Target = this.glMatrix_vec3d.create();
    this.glMatrix_vec3.subtract(cam2Target, this._cache.camera_gl.pos, this._cache.lookAtTarget_gl.pos);

    var angle = this.glMatrix_vec3.angle(this._cache.lookAtTarget_gl.upAxis, cam2Target);
    angle = (90 - utils.radToDeg(angle));
    //console.log('angle==>' + angle);
    return angle;
  }
  setFlyTilt = (tilt) => {
    var camera = this.sceneView.camera.clone();
    tilt = utils.clampTilt(tilt);

    var oldTileAngle = this.getFlyTilt();
    oldTileAngle = utils.degToRad(oldTileAngle);
    var S = (camera.position.z - this._cache.lookAtTarget_gl.baseAlt) / Math.tan(oldTileAngle);

    var h = S * Math.tan(utils.degToRad(tilt)); //new cam pos.z
    return h;
  }

  getRuntimeSettingInfo() {
    //var cam = this.sceneView.camera;
    return {
      //heading: cam.heading,
      tilt: this.getFlyTilt(),
      altitude: null//cam.position.z
    }
  }
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  //init
  prepare = (initOpts?: InitOptions/*lastHitGeo?, opts?*/): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      const lastHit = initOpts?.geo ? initOpts?.geo : this.state.init.geo,
        options = initOpts?.options ? initOpts?.options : this.state.init.options;

      super.preparing();
      //cache lookAt pos
      if (this.state.DEBUG) {
        this.auxHelper.drawPoint(lastHit.mapPoint);
      }
      this._cache.lookAtTarget_gl.pos = utils.geoCoordToRenderCoord([lastHit.mapPoint.x, lastHit.mapPoint.y, lastHit.mapPoint.z], null, this.sceneView);
      this._cache.lookAtTarget_gl.upAxis = this.glMatrix_vec3d.create();
      this._cache.lookAtTarget_gl.baseAlt = lastHit.mapPoint.z;
      this.sceneView.renderCoordsHelper.worldUpAtPosition(this._cache.lookAtTarget_gl.pos, this._cache.lookAtTarget_gl.upAxis);

      if (options && options.direction) {
        this.direction = options.direction;
      }
      var camera;
      if (options && options.cameraInfo) {
        camera = options.cameraInfo;
      } else {
        camera = this.sceneView.camera.clone();
      }

      camera.position.z += 0; //200;
      var cameraFixed_gl = this.cameraUtils.externalToInternal(this.sceneView, camera);
      this._cache.camera_gl.pos = cameraFixed_gl.eye;
      this._cache.camera_gl.upDir = cameraFixed_gl.up;

      //goto init cam-pos
      this.sceneView.goTo(this.getApiCamera()).then(() => {
        super.prepared().then(() => {
          resolve();
        });
      });
    });
    return promise;
  }

  fly = (options?): Promise<any> => {
    if (options) {
      if (options.speedFactor) {
        this.realtimeSetting.setSpeedFactor(options.speedFactor);
      }
      if (options.angleLimit) {
        this.angleLimit = options.angleLimit;
      } else {
        this.angleLimit = null;//no limit
      }

      if (options.duration) {
        this.duration = options.duration;
      }
    }

    // var segNum = this.angleLimit ? this.angleLimit : 360;// limit an angle or 360
    this.animat.init(EasingMode.NONE, 0, 0, this.duration);

    //have not inited
    if (false === this.isPrepared()) {
      return this.prepare().then(() => {
        this.resume();
      })
    } else if (this.isEnableToFly()) {
      return this.resume(options?.animate);
    } else {
      return Promise.reject();
    }
    // this.watchUtils.whenOnce(this.state, 'flyState', () => {
    //   this.stopAnimat();
    // });
  }

  _doFly = (): Promise<any> => {
    //const promise = new Promise((resolve, reject) => {
    super._doFly();

    return this.updateAnimat((frameInfo) => {
      var interp = this.animat.easing(frameInfo.deltaTime, this.realtimeSetting.getSpeedFactor());
      var rotateSpeed = interp.step;
      if (this.direction && this.direction === RotateDirection.CW) {
        rotateSpeed = -rotateSpeed; //CCW default
      }
      //console.log("rotateSpeed => " + rotateSpeed);

      if (true === this.state.settingMode) {
        //stop there for setting
      } else {
        if (null === this.angleLimit || isNaN(this.angleLimit)) {
          this._cache.camera_gl.pos = this.rotateBySceneMode(this._cache.camera_gl.pos, this._cache.lookAtTarget_gl.upAxis, rotateSpeed, this._cache.lookAtTarget_gl.pos);
        } else {
          if (this.angleLimit > 0) {
            var angle = Math.min(Math.abs(rotateSpeed), this.angleLimit);
            this.angleLimit -= angle;

            this._cache.camera_gl.pos = this.rotateBySceneMode(this._cache.camera_gl.pos, this._cache.lookAtTarget_gl.upAxis, angle, this._cache.lookAtTarget_gl.pos);
          } else if (this.angleLimit <= 0) {
            this.stop(); //resolve();//finish
          }
        }
      }

      if (this.state.DEBUG) {
        this.auxHelper.drawPoint_gl(this._cache.camera_gl.pos, 'red');
      }

      //5. move camera
      var apiCamera = this.getApiCamera();
      this.sceneView.goTo(apiCamera, { animate: false });
    });
    //})
    // this.watchUtils.whenOnce(this.sceneView, 'interacting', () => {
    //   this.stopAnimat();
    // });
  }

  private getApiCamera = () => {
    var glCamera = new this.GLCamera(this._cache.camera_gl.pos, this._cache.lookAtTarget_gl.pos, this._cache.camera_gl.upDir); //camPos, lookAt, up
    var apiCamera = this.cameraUtils.internalToExternal(this.sceneView, glCamera);
    return apiCamera;
  }

  resumeCamera = (animate?: boolean): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      var useAnimate = true;
      if (false === animate) {
        useAnimate = false;
      }
      this.sceneView.goTo(this.getApiCamera(), { animate: useAnimate }).then(() => {
        resolve();
      });
    })
    return promise;
  }
  resume = (animate?: boolean): Promise<any> => {
    super.resume();
    return this._resume(this.resumeCamera(animate));
  }

  clear = () => {
    this._cache.lookAtTarget_gl.pos = null;
    super.clear();
  }

  getProgress = () => {
    return 0;
  }
}