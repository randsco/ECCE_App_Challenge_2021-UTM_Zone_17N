import { loadArcGISJSAPIModules } from 'jimu-arcgis';
import { Constraints } from '../../../../../constraints';
import Ease, { EasingMode } from './ease';

export default class Animat {
  private scheduling: __esri.scheduling;
  private animatHandler: __esri.FrameTaskHandle;

  speed: number;//Uniform speed

  private mode: EasingMode;
  private progress: number;//[0,1]
  private amount: number;

  private interp: any;

  constructor() {
    loadArcGISJSAPIModules([
      'esri/core/scheduling',
    ]).then(modules => {
      [this.scheduling] = modules;
    });

    this.speed = Constraints.SPEED.DEFAULT_SPEED;// meters-per-second OR degrees-per-second

    this.mode = EasingMode.NONE;
    this.progress = 0;
    this.amount = -1;

    this.interp = {
      time: {
        begin: 0,
        currentDuration: 0,
        duration: 10 * 1000,//10s
      },
      value: {
        start: 0,
        end: 0,
      },
      cache: {
        lastVal: 0,
        lastStep: 0
      }
    }
  }

  init(mode: EasingMode, start: number, end: number, duration: number) {
    this.mode = mode;

    this.interp.value.start = start,
    this.interp.value.end = end;
    this.interp.time.duration = duration;
    //this.progress = 0;
  }
  reset() {
    this.interp.time.begin = 0;
    this.interp.time.currentDuration = 0;
    this.progress = 0;
  }

  computeDuration() {
    return this.amount / this.speed * 1000;
  }

  //amount
  setAmount(num: number) {
    this.amount = num;
    //console.log('amount=>' + this.amount);
    return this;
  }
  getAmount() {
    return this.amount;
  }
  //progress
  getProgress() {
    return this.progress;
  }
  progressForward() {
    this.progress += 0.0001;
    return this.progress;
  }
  progressBackward() {
    return this.progress - 0.0001
    //return this.progress;
  }

  //interp
  getInterDuration() {
    return this.interp.time.currentDuration;
  }
  private updateCurrentDuration(d: number) {//sum add
    this.interp.time.currentDuration = this.interp.time.currentDuration + d;
    if (isNaN === this.interp.time.currentDuration) {
      this.interp.time.currentDuration = 0;
    }
    return this.interp.time.currentDuration;
  }
  // setBeginTime() {
  //   this.interp.beginTime = Date.now();
  // }
  // getBeginTime() {
  //   return this.interp.beginTime;
  // }
  // setSumTime(t) {
  //   this.interp.sumTime = t + this.interp.sumTime;
  //   return this.interp.sumTime;
  // }
  // getSumTime() {
  //   return this.interp.sumTime;
  // }

  //easing
  easing = (deltaTime, speedFactor) => {
    switch (this.mode) {
      case EasingMode.In: {
        return this.easingIn(deltaTime, speedFactor);
        break;
      }
      case EasingMode.InOut: {
        return this.easingInOut(deltaTime, speedFactor);
        break;
      }
      case EasingMode.Linear: {
        return this.linear(deltaTime, speedFactor);
        break;
      }
      case EasingMode.NONE: {
        return this.uniformSpeed(deltaTime, speedFactor);
        break;
      }
      default: {
        break;
      }
    }
  }

  private uniformSpeed = (deltaTime, speedFactor) => {
    this.updateCurrentDuration(deltaTime * speedFactor);
    var speed = this.getMovementByFrame(deltaTime) * speedFactor;
    this.progress = 0;
    return {
      interp: 0,
      step: speed,
      progress: this.progress
    }
  }
  private linear = (deltaTime, speedFactor) => {
    var sum = this.updateCurrentDuration(deltaTime * speedFactor);
    var val = 0, step = 0;

    if (sum < this.interp.time.duration) {
      val = Ease.linear(sum, this.interp.value.start, this.interp.value.end, this.interp.time.duration);
      step = val - this.interp.cache.lastVal;
      this.interp.cache.lastVal = val;

      this.progress = val / this.interp.value.end;
    } else {
      this.progress = 1;
    }

    return {
      interp: val,
      step: step,
      progress: this.progress
    }
  }
  private easingIn = (deltaTime, speedFactor) => {
    var sum = this.updateCurrentDuration(deltaTime * speedFactor);
    var val = 0, step = 0;

    if (sum < this.interp.time.duration) {
      val = Ease.easeIn(sum, this.interp.value.start, this.interp.value.end, this.interp.time.duration);
      step = val - this.interp.cache.lastVal;
      this.interp.cache.lastVal = val;

      this.interp.cache.lastStep = step;
    } else {
      step = this.interp.cache.lastStep * speedFactor
    }

    this.progress = -1;

    return {
      interp: val,
      step: step,
      progress: this.progress
    }
  }
  //TODO if timeScale changed, duration should change by the progress
  private easingInOut = (deltaTime, speedFactor) => {
    var sum = this.updateCurrentDuration(deltaTime * speedFactor);
    var val = 0, step = 0;

    if (sum < this.interp.time.duration) {
      val = Ease.easeInOut(sum, this.interp.value.start, this.interp.value.end, this.interp.time.duration);
      step = val - this.interp.cache.lastVal;
      this.interp.cache.lastVal = val;

      this.progress = val / this.interp.value.end;
    } else {
      this.progress = 1;
    }

    return {
      interp: val,
      step: step,
      progress: this.progress
    }
  }

  //speed
  getSpeed() {
    return this.speed;
  }
  setSpeed(s: number) {
    this.speed = s;
  }
  setSpeedByLimittime(limit: number) {
    var speed;
    if (!limit) {
      speed = Constraints.SPEED.DEFAULT_SPEED;
    } else {
      speed = this.amount / limit;
    }
    this.setSpeed(speed)
  }

  //Uniform speed
  //update speed, after amount&duration set
  // updateSpeed(): void {
  //   if(this.duration && !isNaN(this.duration) && this.amount){
  //     this.setSpeed(this.amount / this.duration);
  //   }
  // }

  //speed
  getMovementByFrame = (deltaTime) => {
    var movementPerSecond = this.getSpeed(), // m/second
      frameRate = 1000 / deltaTime;
    // if (frameRate > 60) {
    //   frameRate = 60;
    // }
    return movementPerSecond / frameRate;
  }

  //
  update(fun): Promise<any> {
    if (this.animatHandler) {
      return;
    }

    this.animatHandler = this.scheduling.addFrameTask({
      //prepare: fun
      //render: fun
      update: (frameInfo) => { fun(frameInfo); }
    });
  }
  stop() {
    if (this.animatHandler) {
      this.animatHandler.pause();
      this.animatHandler.remove();
      this.animatHandler = null;
    }
  }
  //for setting without playing
  insertAnExtraFrame(fun) {
    this.scheduling?.schedule((frameInfo) => {
      fun(frameInfo);
    });
  }
}