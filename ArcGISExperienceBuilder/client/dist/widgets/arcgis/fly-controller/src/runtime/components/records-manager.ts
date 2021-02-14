import { Constraints } from '../../constraints';
import { FlyCallbacks } from './controllers/base-fly-controller';
//import { RecordStyle } from '../../config';
import RotatingFly from './controllers/rotating-fly';
import CurveFly from './controllers/curve-fly';
import LineFly from './controllers/line-fly';
//import { RotateRecord, PathRecord, RotateDirection, RecordsConstraint } from '../../config';

export interface RecordOption {
  speedFactor: number,
  duration: number,
  angleLimit?: number,
}

interface Options {
  debug?: boolean;
  sceneView: __esri.SceneView;
  callbacks: FlyCallbacks;
}

export default class RecordsManager {
  //controllers
  rotationFlyController: RotatingFly;
  curveFlyController: CurveFly;
  lineFlyController: LineFly;
  //cache: {
  //  currentIdx: number
  //};
  sceneView: __esri.SceneView;

  state: {
    playingIdx: number;
    //records: (RecordsConstraint)[];// (RotateRecord | PathRecord)[];
    //activedController: RotatingFly | CurveFly | LineFly | RecordFly | null;
    //activedFlyStyle: FlyStyle | null;
    callbacks: any;
    debug: boolean
  }

  constructor(options: Options) {
    this.sceneView = options.sceneView;
    this.state = {
      playingIdx: Constraints.RECORD.INIT_IDX,
      //records: [],
      // activedController: null,
      // activedFlyStyle: null,
      debug: options.debug,
      callbacks: options.callbacks,
    }

    this.rotationFlyController = new RotatingFly({
      sceneView: this.sceneView,
      debug: true,//this.state.debug,
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
    //observeStore(this.onFlyStop.bind(this), ['widgetsState', this.state.widgetId, 'flyStop']);
    //observeStore(this.onFlyPause.bind(this), ['widgetsState', this.state.widgetId, 'flyPause']);
  }
  destructor() {
    this.stop();
    this.clearAll();
  }

  // //test add
  // _testAddPoint1(lastHit, options) {
  //   var data: RotateRecord = {
  //     hitPoint: lastHit,
  //     cameraInfo: options.cameraInfo,
  //     direction: RotateDirection.CCW, //options.direction
  //     angle: 360,
  //     duration: 60,//s
  //     delay: 1000
  //   }
  //   this.add({
  //     type: RecordStyle.Rotate,
  //     data: data
  //   });
  // }
  // _testAddCurve1 = (line, options) => {
  //   var data: PathRecord = {
  //     geo: line,
  //     duration: 60,//s
  //     delay: 1000
  //   }
  //   this.add({
  //     type: RecordStyle.Smoothed,
  //     data: data
  //   });
  // }
  // _testAddLine1 = (line, options) => {
  //   var data: PathRecord = {
  //     geo: line,
  //     duration: 60,//s
  //     delay: 1000
  //   }
  //   this.add({
  //     type: RecordStyle.RealPath,
  //     data: data
  //   });
  // }

  // //test runtime-setting
  // _setRealimeSetting = (isInSetting) => {
  //   var record = this.getRecord();
  //   // ...
  //   // this.rotationFlyController?.settingPreview(isInSetting);
  //   this.realtimeSetting(record, isInSetting);
  // }
  // _onTiltChange1 = (val) => {
  //   this.rotationFlyController?.setRuntimeSetting({ tilt: val });
  // }






  // get = (idx) => {

  // }
  // add = (data: RecordsConstraint) => {
  //   // if(!data.idx){
  //   //   data.idx = this.cache.currentIdx++;
  //   // }
  //   //(data.record as RotateRecord).camera = this.sceneView.camera.clone();
  //   this.state.records.push(data);
  //   this.onAdd(data);
  // }
  // update = () => {

  // }
  // clear = () => {
  //   this.deleteAll();
  //   this.onClear();
  // }
  // deleteAll = () => {
  //   if (this.rotationFlyController) {
  //     this.rotationFlyController.stop();
  //     this.rotationFlyController.clear();
  //   }

  //   this.state.playingIdx = 0;
  //   this.state.records = null;
  //   this.state.records = [];
  // }

  // play = () => {
  //   this.state.playingIdx = Constraints.RECORD.INIT_IDX;
  //   this.nextRecord();

  //   this.start(this.getRecord());
  // }
  // resume = () => {
  //   var record = this.getRecord();
  //   //var data = record.data;

  //   if (record && record.type === RecordStyle.Rotate) {
  //     //var angle = (data as RotateRecord).angle;
  //     this.rotationFlyController?.fly();
  //   } else if (record && record.type === RecordStyle.RealPath) {
  //     this.lineFlyController?.fly().then(() => {
  //       console.log('finish lineFly 22')
  //     });
  //   } else if (record && record.type === RecordStyle.Smoothed) {
  //     this.curveFlyController?.fly().then(() => {
  //       console.log('finish curveFly 33')
  //     });
  //   }
  // }

  // //events
  // onAdd = (data: RecordsConstraint) => {
  //   //var len = this.state.records.length;
  //   //getAppStore().dispatch(appActions.widgetStatePropChange(this.state.widgetId, 'recordAdd', { len: len }));
  // }
  // onClear = () => {
  //   //var len = this.state.records.length;
  //   //getAppStore().dispatch(appActions.widgetStatePropChange(this.state.widgetId, 'recordClear', { len: len }));
  // }
  // onUpdateRecord = () => {
  //   //var len = this.state.records.length;
  //   //var idx = this.state.playingIdx;
  //   //getAppStore().dispatch(appActions.widgetStatePropChange(this.state.widgetId, 'recordNext', { len: len, idx: idx }));
  // }

  // //events
  // onFlyStop(preState: any, state: any) {
  //   //var a = state;
  //   //console.log("onStoreChange event 111");
  //   //if stop
  //   //this.state.playingIdx++;
  //   this.nextRecord();
  //   var record = this.getRecord();
  //   if (record) {
  //     var data = record.data;
  //     setTimeout(() => {
  //       this.start(record);
  //     }, data.delay)
  //   }
  // }
  // onFlyPause(preState: any, state: any) {
  //   //this.pause(record);
  // }

  // //PlayerPlay
  // start = (record: RecordsConstraint) => {
  //   var data;
  //   if (record && record.type === RecordStyle.Rotate) {
  //     data = record.data;
  //     var angle = data.angle;// (data as RotateRecord).angle,
  //     //hitPoint = data.hitPoint,//(data as RotateRecord).hitPoint,
  //     //options = data;
  //     // this.rotationFlyController.prepare(hitPoint, options).then(() => {
  //     //   this.rotationFlyController.fly({ angleLimit: angle }).then(() => {
  //     //     console.log("finish rotationFly 1")
  //     //   });
  //     // })
  //     //this.rotationFlyController.clear();
  //     //this.rotationFlyController.init({geo: hitPoint, options: options});
  //     this.rotationFlyController.fly({ speedFactor: 0.5/*0.2*/, angleLimit: angle, duration: 20 }).then(() => {
  //       console.log('finish rotationFly 1')
  //     });
  //   } else if (record && record.type === RecordStyle.RealPath) {
  //     data = record.data;
  //     //this.lineFlyController.prepare(data.geo, options).then(() => {
  //     this.lineFlyController.fly().then(() => {
  //       console.log('finish lineFly 2')
  //     });
  //     //})
  //   } else if (record && record.type === RecordStyle.Smoothed) {
  //     data = record.data;
  //     //this.curveFlyController.prepare(data.geo, options).then(() => {
  //     this.curveFlyController.fly({ speedFactor: 0.5, duration: 20 })/*.then(() => {
  //       console.log("finish curveFly 3")
  //     });*/
  //     //})
  //   }
  // }

  // realtimeSetting = (record: RecordsConstraint, isInSetting: boolean) => {
  //   //var data;
  //   //data = record.data;
  //   //var options = data;
  //   if (record && record.type === RecordStyle.Rotate) {
  //     this.rotationFlyController?.settingPreview(isInSetting);
  //   } else if (record && record.type === RecordStyle.RealPath) {
  //     //data = record.data;
  //     this.lineFlyController?.settingPreview(isInSetting);
  //   } else if (record && record.type === RecordStyle.Smoothed) {
  //     //data = record.data;
  //     this.curveFlyController?.settingPreview(isInSetting);
  //   }
  // }

  // //PlayerNext
  // nextRecord = () => {
  //   this.state.playingIdx++;
  //   var record = this.getRecord();
  //   if (record && record.type === RecordStyle.Rotate) {
  //     this.rotationFlyController.clear();

  //     var hitPoint = (record.data as RotateRecord).hitPoint,
  //       options = record.data;
  //     this.rotationFlyController.init({ geo: hitPoint, options: options });
  //   } else if (record && record.type === RecordStyle.RealPath) {
  //     this.lineFlyController.clear();
  //   } else if (record && record.type === RecordStyle.Smoothed) {
  //     this.curveFlyController.clear();
  //   }
  // }
  // getRecord = () => {
  //   var record = this.state.records[this.state.playingIdx]
  //   return record;
  // }


  // _prepare = (param, options) => {
  //   this.rotationFlyController.prepare(param, options);
  // }

  //2. fly lifecycle
  prepare = (param, options) => {

  }
  fly(settingSpeed) {

  }
  stop() {

  }
  pause() {

  }
  clearAll() {

  }
}

// {/* 3 records */}
// <div className={'records-test ' + getRecordTestClass(2 === this.state.activedItemIdx)}>
//   <div className="item" style={{ color: 'red' }}>
//     RECORD mode test:
//   </div>
//   <div className="item">
//     Records len=> {this.state.recordLen} ,idx=> {this.state.recordIdx}
//   </div>
//   <div className="item">
//     <Button onClick={this.testRecordsSetting}>RecordsSetting</Button>
//     Records setting=> {this.state.recordSetting ? 'true' : 'false'}
//   </div>
//   <div className="item">
//     Add point
//     <Button onClick={this.testAddPointRecord}>point</Button>

//     {(this.state.recordSetting) ?
//       <Slider id="setting-tilt" className="d-flex" value={this.state.recordTilt1} min={0} max={90} step={1} size="sm"
//         onChange={(evt) => this.onTiltChange1(evt.target.value)} />
//       : null}
//   </div>

//   <div className="item">
//     Add line
//     <Button onClick={this.testAddCurveRecord}>curve</Button>
//     <Button onClick={this.testAddLineRecord}>line</Button>
//   </div>

//   <hr></hr>
//   <div className="item">
//     Pick-
//     <Button onClick={this.testPickPointRecord}>point</Button>
//     <Button onClick={this.testPickCurveRecord}>curve</Button>
//     <Button onClick={this.testPickLineRecord}>line</Button>
//   </div>
//   <hr></hr>

//   <div className="item">
//     Opers-
//     <Button onClick={this.testPlayRecord}>re-play all</Button>
//     <Button onClick={this.testResumeRecord}>resume</Button>
//     <Button onClick={this.testClearRecord}>clear</Button>
//   </div>
// </div>

// //Record runtime-setting
// testRecordsSetting = () => {
//   var val = !this.state.recordSetting
//   this.setState({ recordSetting: val });
//   this.recordsManager._setRealimeSetting(val);
// }
// onTiltChange1 = (value) => {
//   this.setState({ recordTilt1: value });
//   this.recordsManager._onTiltChange1(value);
// }

// //Record test
// //1
// testAddPointRecord = () => {
//   this.onDrawPoint(/*PickMode.RecordPoint*/);
// }

// testAddLineRecord = () => {
//   this.onDrawLine(/*PickMode.RecordRealpath*/);
// }
// testAddCurveRecord = () => {
//   this.onDrawLine(/*PickMode.RecordSmoothed*/);
// }
// //2
// testPickPointRecord = () => {
//   this.onPickBtnClick(/*PickMode.RecordPoint*/);
// }
// testPickLineRecord = () => {
//   this.onPickBtnClick(/*PickMode.RecordRealpath*/);
// }
// testPickCurveRecord = () => {
//   this.onPickBtnClick(/*PickMode.RecordSmoothed*/);
// }
// //3
// testPlayRecord = () => {
//   this.recordsManager.play();
// }
// testResumeRecord = () => {
//   this.recordsManager.resume();
// }
// testClearRecord = () => {
//   this.onClearBtnClick();
//   this.recordsManager.clear();
// }

// //events
// onFlyStop = (preState: any, state: any) => {
//   //var a = state;
// }
// onRecordAdd = (preState: any, state: any) => {
//   var a = state.len;
//   this.setState({ recordLen: a });
// }
// onRecordClear = (preState: any, state: any) => {
//   this.setState({ recordLen: state?.len });
// }
// onRecordNext = (preState: any, state: any) => {
//   this.setState({ recordIdx: state?.idx });
// }