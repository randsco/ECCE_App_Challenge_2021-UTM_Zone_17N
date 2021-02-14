/** @jsx jsx */
import { React, jsx, BaseWidget, AllWidgetProps, appActions/*observeStore*/ } from 'jimu-core';
import { Button, Icon, Slider, Dropdown, DropdownButton, DropdownMenu, DropdownItem, WidgetPlaceholder, defaultMessages as commonMessages, NumericInput, Progress } from 'jimu-ui';
import nls from './translations/default';

import BarLayout from './skins/bar/layout';
import PaletteLayout from './skins/palette/layout';
import { getPaletteDropdownStyle } from './skins/palette/style';

import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import { IMConfig, FlyStyle, ControllerLayout } from '../config';
import { getStyle, getDropdownStyle/*, getRecordTestClass*/ } from './style';
import * as utils from './components/utils/utils';

import GraphicInteractionManager from './components/graphic-interaction-manager';
import ControllerManager from './components/controller-manager';
//import RecordsManager from './components/records-manager';
import { DrawRes } from './components/helpers/draw-helper';
import ErrorTipsManager, { ErrorTypes } from './components/error-tips-manager';

const flyIcon = require('jimu-ui/lib/icons/fly-controller.svg');
const rotateIconImage = require('../assets/icons/fly-rotate.svg');
const pathIconImage = require('../assets/icons/fly-path.svg');

export enum operActionState { //TODO
  None = 0,
  Drawing,
  Picking,
  Playing
}
export enum DrawingType {
  Point,
  Line
}
interface TriggerActionsJudgment {
  subCompsLoaded?: boolean,//default false
  isLiveview?: boolean,
  isPlaying?: boolean,
  isCachedGeo?: boolean
}

interface State {
  //0.
  errorTip: string;
  subCompsLoaded: boolean;
  isCachedGeo: boolean;
  //1.fly style
  isFlyStylePopupOpen: boolean;
  activedItemIdx: number | null;
  //2.triggerAction
  isDrawing: boolean;
  isPlaying: boolean;
  isPicking: boolean;
  //3.liveview
  isLiveview: boolean;
  settingSpeed: number;  // [0 - 1]
  //settingHeading: number;
  settingTilt: number; // [0 - 90]
  settingAltitude: number; // [0 - 500]
  //4.progresser
  progress: number;
  //5. speed
  isSpeedPopupOpen: boolean;
  //6. record
  // recordLen: number;
  // recordIdx: number;
  // recordSetting: boolean;
  // recordTilt1: number;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, State>{
  jimuMapView: JimuMapView;
  //mapView: MapView;
  sceneView: __esri.SceneView;
  //webMap: __esri.WebMap;
  errorTipsManager: ErrorTipsManager;
  graphicInteractionManager: GraphicInteractionManager;
  controllerManager: ControllerManager;
  //recordsManager: RecordsManager;

  constructor(props) {
    super(props);

    this.errorTipsManager = new ErrorTipsManager({ widget: this });

    var initLiveviewSetting = utils.getInitLiveviewSetting();
    this.state = {
      //0
      errorTip: this.errorTipsManager.getDefaultError(), //for errorTipsManager
      subCompsLoaded: false,
      isCachedGeo: false,
      //1.fly style
      isFlyStylePopupOpen: false,
      activedItemIdx: null,
      //2.triggerAction
      isPlaying: false,
      isDrawing: false, //for drawHelper
      isPicking: false, //for pickHelper
      //3.liveview
      isLiveview: false,
      settingSpeed: initLiveviewSetting.speed,
      //settingHeading: 0,
      settingTilt: initLiveviewSetting.tilt,
      settingAltitude: initLiveviewSetting.altitude,
      //4.progresser
      progress: 0,
      //5. speed
      isSpeedPopupOpen: false
      //6. record
      // recordLen: null,
      // recordIdx: -1,
      // recordSetting: false,
      // recordTilt1: initLiveviewSetting.tilt
    }

    // observeStore(this.onFlyStop.bind(this), ['widgetsState', this.props.id, 'flyStop']);
    // observeStore(this.onRecordAdd.bind(this), ['widgetsState', this.props.id, 'recordAdd']);
    // observeStore(this.onRecordClear.bind(this), ['widgetsState', this.props.id, 'recordClear']);
    // observeStore(this.onRecordNext.bind(this), ['widgetsState', this.props.id, 'recordNext']);
  }

  //for map selector cb
  onActiveViewChange = (jimuMapView: JimuMapView) => {
    //Async errors
    if (null === jimuMapView || undefined === jimuMapView) {
      this.errorTipsManager.setErrorByType(ErrorTypes.Choose3DMap);
      this.jimuMapView = null;
      return; //skip null
    }

    if ('2d' === jimuMapView.view.type) {
      this.errorTipsManager.setErrorByType(ErrorTypes.Choose3DMap);
      this.jimuMapView = null;
      return; //skip 2D
    }
    this.errorTipsManager.setError(''); //ok, so clean errortip

    //cache view id
    if (this.jimuMapView?.id !== jimuMapView.id) {
      this.onClearBtnClick(); //change init map in liveview, need to remove feature drew
    }

    //cache view when jimuMapView changed
    this.sceneView = jimuMapView.view as __esri.SceneView; //3d scene
    this.jimuMapView = jimuMapView;

    this.controllerManager?.destructor();
    this.graphicInteractionManager?.destructor();

    this.graphicInteractionManager = new GraphicInteractionManager({ widget: this, sceneView: this.sceneView, jimuMapView: this.jimuMapView });
    this.controllerManager = new ControllerManager({
      sceneView: this.sceneView,
      debug: false,
      callbacks: {
        onFly: this.onFlyPlay,
        onPause: this.onFlyPause,
        onUpdateProgress: this.onUpdateProgress
      }
    });
    // this.recordsManager = new RecordsManager({
    //   sceneView: this.sceneView,
    //   debug: false,
    //   callbacks: {
    //     onFly: this.onFlyPlay,
    //     onPause: this.onFlyPause,
    //     onUpdateProgress: this.onUpdateProgress
    //   }
    // });
  }

  componentDidMount() {
    const { layoutId, layoutItemId, id } = this.props;
    this.props.dispatch(appActions.widgetStatePropChange(id, 'layoutInfo', { layoutId, layoutItemId }));
  }
  // call exec manuly
  // editStatus = (name, value) => {
  //   const {dispatch, id} = this.props;
  //   dispatch(appActions.widgetStatePropChange(id, name, value));
  // }
  componentWillUnmount() {
    this.clearUIStateAndEvents();
    this.controllerManager?.destructor();
    this.graphicInteractionManager?.destructor();
  }
  componentDidUpdate(prevProps: AllWidgetProps<IMConfig>, prevState: State) {
    if (this.errorTipsManager.isError()) {
      this.errorTipsManager.checkErrorInConfig();
    }

    if (this.controllerManager && null === this.controllerManager.getController()) {
      this.onFlyStyleChange(null); //init
    }

    if (this.props.config !== prevProps.config) {
      this.onFlyStyleChange(null);
      //this.controllerManager?.destructor();
      //this.graphicInteractionManager?.destructor();
      this.onClearBtnClick();
    }
  }

  //0 state
  isGraphicInteractionManagerReady = () => {
    return (this.graphicInteractionManager && this.graphicInteractionManager.isReady());
  }
  clearUIStateAndEvents = (actionList?) => {
    this.setState({ isFlyStylePopupOpen: false, /*isDrawing: false, isPicking: false,*/ isLiveview: false });

    this.graphicInteractionManager?.setStates({ isDrawing: false, isPicking: false });
    this.graphicInteractionManager?.restoreMapPopupHightlightState();

    this.controllerManager?.settingPreview(false);
  }
  //0.1 flyMode
  onFlyStyleChange = (idx: number | null, option?: { isRecord: boolean }) => {
    // if (this.errorTipsManager.isError()) {
    //   return;
    // }
    var index = 0;
    if (null === idx) {  //null means reset UI, and findFirstUsedItem in config
      var itemsList = this.props.config.itemsList.asMutable();
      var item = utils.findFirstUsedItem(itemsList);
      index = item.idx;
    } else {
      index = idx;
    }

    if (true !== option?.isRecord) {
      this.controllerManager?.useController(utils.getCurrentActiveItem(this.props, this.state, index, option?.isRecord));
    }
    this.setState({ activedItemIdx: index });

    this.clearUIStateAndEvents();
    this.onClearBtnClick();
  }
  //0.2 draw
  onIsDrawingChange = (mode) => {
    if (!this.isGraphicInteractionManagerReady()) {
      return;
    }

    if (true === this.state.isPlaying) {
      return;
    }
    this.clearUIStateAndEvents();

    this.graphicInteractionManager?.toggleDrawState();

    if (DrawingType.Point === mode) {
      this.onDrawPoint();
    } else {
      this.onDrawLine();
    }
  }

  //0.3 picking
  onPickBtnClick = (type?/*: PickMode*/) => {
    if (!this.isGraphicInteractionManagerReady()) {
      return;
    }

    var isPicking = this.graphicInteractionManager?.getStates().isPicking;
    this.clearUIStateAndEvents();

    this.graphicInteractionManager?.setPickingState(!isPicking);
  }

  //0.4
  onPlayStateBtnClick = () => {
    if (false === this.state.isPlaying) {
      this.onPlay();
    } else {
      this.onPause();
    }
  }
  setPlayStatePlaying = (playState) => {
    this.setState({ isPlaying: !!playState, /*isDrawing: false, isPicking: false,*/isLiveview: false })
    this.graphicInteractionManager.setStates({ isDrawing: false, isPicking: false })
  }

  //for callbacks
  onFlyPlay = () => {
    if (this.state.isLiveview) {
      return;
    }

    if (!this.state.isPlaying) {
      this.setPlayStatePlaying(true);
    }
  }
  onFlyPause = () => {
    this.setPlayStatePlaying(false);
  }
  isLiveviewMode = () => {
    return this.state.isLiveview;
  }
  onUpdateProgress = (p) => {
    this.setState({ progress: p });
  }
  onGraphicInteractionManagerLoad = () => {
    this.setState({ subCompsLoaded: true });
  }


  //1 fly mode
  getFlyStyleContent = () => {
    var item = utils.getCurrentActiveItem(this.props, this.state);
    var flyStyle = item && item.name;

    var flyStyleContent = null;
    if (flyStyle === FlyStyle.Rotate) {
      flyStyleContent = <Icon icon={rotateIconImage} />
    } else if (flyStyle === FlyStyle.Path) {
      flyStyleContent = <Icon icon={pathIconImage} />
    }

    return flyStyleContent;
  }
  toggleFlyStylePopup = () => {
    if (utils.getEnabledItemNum(this.props.config.itemsList) <= 1) {
      this.setState({ isFlyStylePopupOpen: false });
      return; //no dropdown if itemlist.length < 2
    }

    if (this.state.isPlaying) {
      return; //no disable in dropdown
    }
    this.setState({ isFlyStylePopupOpen: !this.state.isFlyStylePopupOpen });
  }


  //2 trigger action
  private isDisableButton = (judgment: TriggerActionsJudgment) => {
    const { isPlaying, isLiveview, isCachedGeo } = judgment;
    let work = !this.state.subCompsLoaded;
    if (isPlaying) {
      work = work && !this.state.isPlaying;
    }
    if (isLiveview) {
      work = work && !this.state.isLiveview;
    }
    if (isCachedGeo) {
      work = work || !this.state.isCachedGeo;
    }
    return work;
  }
  getDrawBtnContent = () => {
    const drawPointIconImage = require('../assets/icons/trigger-draw-point.svg');
    const drawLineIconImage = require('../assets/icons/trigger-draw-line.svg');
    let DrawBtn = null;

    const isDrawActive = this.graphicInteractionManager?.getStates().isDrawing;//this.state.isDrawing;
    const isDisable = this.isDisableButton({ isPlaying: true });

    const pointTips = this.props.intl.formatMessage({ id: 'triggerSelectPoint', defaultMessage: nls.triggerSelectPoint });
    const lineTips = this.props.intl.formatMessage({ id: 'triggerDrwaPath', defaultMessage: nls.triggerDrwaPath });

    const item = utils.getCurrentActiveItem(this.props, this.state);
    const flyStyle = item && item.name;
    if (flyStyle === FlyStyle.Rotate) {
      DrawBtn =
        <Button icon active={isDrawActive} onClick={() => this.onIsDrawingChange(DrawingType.Point)} disabled={isDisable} title={pointTips} className="btns draw-btn" type="tertiary">
          <Icon icon={drawPointIconImage} />
        </Button>
    } else if (flyStyle === FlyStyle.Path) {
      DrawBtn =
        <Button icon active={isDrawActive} onClick={() => this.onIsDrawingChange(DrawingType.Line)} disabled={isDisable} title={lineTips} className="btns draw-btn" type="tertiary">
          <Icon icon={drawLineIconImage} />
        </Button>
    }

    return DrawBtn;
  }
  getPickBtnContent = () => {
    const pickIconImage = require('../assets/icons/trigger-pick.svg');
    const isDisable = this.isDisableButton({ isPlaying: true });
    const pickTips = this.props.intl.formatMessage({ id: 'triggerSelectFeature', defaultMessage: nls.triggerSelectFeature });
    let pickBtn = null;
    const isPickingActive = this.graphicInteractionManager?.getStates().isPicking;

    pickBtn = <Button icon onClick={(evt) => this.onPickBtnClick(/*PickMode.RunTime*/)} active={isPickingActive} disabled={isDisable} title={pickTips} className="btns pick-btn" type="tertiary">
      <Icon icon={pickIconImage} />
    </Button>
    return pickBtn;
  }
  getClearBtnContent = () => {
    const clearIconImage = require('../assets/icons/trigger-clear.svg');
    const clearTips = this.props.intl.formatMessage({ id: 'triggerClear', defaultMessage: nls.triggerClear });
    const isDisable = this.isDisableButton({ isPlaying: true, isCachedGeo: true });
    let clearBtn = null;
    clearBtn = <Button icon onClick={this.onClearBtnClick} disabled={isDisable} title={clearTips} className="btns clear-btn" type="tertiary">
      <Icon icon={clearIconImage} />
    </Button>
    return clearBtn;
  }
  //2.1
  onDrawPoint = (/*recordMode?: PickMode*/) => {
    if (true === this.state.isPlaying) {
      return;
    }
    if (true === this.graphicInteractionManager?.getStates().isDrawing) {
      return;
    }

    this.graphicInteractionManager.drawPoint().then((res: DrawRes) => {
      if (null !== res) {
        this.onDrawHanlder(res);
      }//else: cancel
      this.clearUIStateAndEvents();
    });
  }
  onDrawLine = (/*recordMode?: PickMode*/) => {
    if (true === this.state.isPlaying) {
      return;
    }
    if (true === this.graphicInteractionManager?.getStates().isDrawing) {
      return;
    }

    this.graphicInteractionManager.drawLine().then((res: DrawRes) => {
      if (null !== res) {
        this.onDrawHanlder(res);
      }//else: cancel
      this.clearUIStateAndEvents();
    });
  }
  onDrawHanlder = (res: DrawRes) => {
    const { graphic, cameraInfo } = res;
    var item = utils.getCurrentActiveItem(this.props, this.state);
    var options = {};
    if (item && item.direction) {
      options = Object.assign(options, { direction: item.direction });
    }
    if (cameraInfo) {
      options = Object.assign(options, { cameraInfo: cameraInfo });
    }

    var flyStyle = item.name;
    if (flyStyle === FlyStyle.Rotate) {
      //1.Point
      var point /*: typeof PointType*/ = (graphic.geometry as __esri.Point);
      var screenPoint = this.sceneView.toScreen(point);
      this.sceneView.hitTest(screenPoint, { exclude: [this.sceneView.graphics] }).then((hitTestResult) => {
        var lastHit = utils.getHitPointOnTheGround(hitTestResult);
        this.controllerManager.init({ geo: lastHit, options: options });
        this.controllerManager.prepare();
      });
    } else if (flyStyle === FlyStyle.Path) {
      //2. Line
      this.onAltitudeChange(0, true, false);

      var line = graphic.geometry;
      this.controllerManager.init({ geo: line, options: options });
      this.controllerManager.prepare();

    }/*else if (flyStyle === FlyStyle.Record) {
      if (recordMode === PickMode.RecordPoint) {
        var point = (graphic.geometry as __esri.Point);
        var screenPoint = this.sceneView.toScreen(point);
        this.sceneView.hitTest(screenPoint, { exclude: [this.sceneView.graphics] }).then((hitTestResult) => {
          var lastHit = utils.getHitPointOnTheGround(hitTestResult);

          this.recordsManager._testAddPoint1(lastHit, options);
        });
      } else if (recordMode === PickMode.RecordSmoothed) {
        var line = graphic.geometry;
        this.recordsManager._testAddCurve1(line, options);
      } else if (recordMode === PickMode.RecordRealpath) {
        var line = graphic.geometry;
        this.recordsManager._testAddLine1(line, options);
      }
    }*/
  }

  //2.2 picking
  //2.3 clearBtn
  onClearBtnClick = () => {
    this.clearUIStateAndEvents();

    this.graphicInteractionManager?.clear();
    //clear play res
    if (this.controllerManager) {
      this.onStop();
    }

    this.resetLiveviewSetting();//clear runtime liveview
  }

  //2.4 liveview
  toggleLiveviewSettingPopup = () => {
    if (!this.state.isCachedGeo) {
      return;
    }

    var isOpen = !this.state.isLiveview;
    //TODO bug in then()
    // this.controllerManager.settingPreview(isOpen).then(() => {
    //   var camInfo = this.controllerManager.getLiveviewSettingInfo();
    //   console.log('tilt    ==>' + camInfo.tilt);
    //   console.log('altitude==>' + camInfo.altitude);
    //   this.onTiltChange(camInfo.tilt);
    //   this.onAltitudeChange(camInfo.altitude);
    //   this.setState({ isLiveview: isOpen });
    // });
    this.controllerManager.settingPreview(isOpen)
    var camInfo = this.controllerManager.getLiveviewSettingInfo();
    if (camInfo) {
      // console.log('tilt    ==>' + camInfo.tilt);
      //console.log('altitude==>' + camInfo.altitude);
      this.onTiltChange(camInfo.tilt);
      this.onAltitudeChange(camInfo.altitude);

      this.setState({ isLiveview: isOpen });
    }
  }
  //live view
  onSpeedChange = (value) => {
    this.setState({ settingSpeed: value });
    this.controllerManager?.setSpeedFactor(value);
  }
  // onHeadingChange = (evt) => {
  //   this.setState({ settingHeading: evt.target.value });
  //   this.controllerManager.setSpeedFactor(evt.target.value);
  // }
  onTiltChange = (value, setToController?: boolean) => {
    this.setState({ settingTilt: value });
    if (this.controllerManager && setToController) {
      this.controllerManager.onTiltChange(value);
    }
  }
  onAltitudeChange = (value, setToController?: boolean, updateLine?: boolean) => {
    this.setState({ settingAltitude: value });
    if (this.controllerManager && setToController) {
      this.controllerManager.onAltitudeChange(value);
    }

    //update the shown line
    if (updateLine !== false && this.graphicInteractionManager) {
      var settingInfo = this.controllerManager.getLiveviewSettingInfo();
      this.graphicInteractionManager.updateLineByAltitude(settingInfo.altitude);
    }
  }
  // restoreLiveviewSetting = () => {
  //   if (this.controllerManager && this.controllerManager.getLiveviewSettingInfo()) {
  //     //this.onTiltChange(this.state.settingTilt, true);
  //     this.onAltitudeChange(this.state.settingAltitude, true);
  //   }
  // }
  resetLiveviewSetting = () => {
    this.setState({ isLiveview: false });//close popup
    var initLiveviewSetting = utils.getInitLiveviewSetting();

    if (this.controllerManager && this.controllerManager.getLiveviewSettingInfo()) {
      this.onSpeedChange(initLiveviewSetting.speed);
      this.onTiltChange(initLiveviewSetting.tilt, true);
      this.onAltitudeChange(initLiveviewSetting.altitude, true, false);
    }
  }


  //3 play state
  onPlay = () => {
    if (!this.state.isCachedGeo) {
      return;
    }
    this.controllerManager.fly(this.state.settingSpeed);
  }
  onStop = () => {
    this.controllerManager.stop();
  }
  onPause = () => {
    this.controllerManager.pause();
  }
  // onResume = () => {
  //   this.controllerManager.resume();
  // }
  onClear = () => {
    this.controllerManager.clear();
  }

  //speed
  toggleSpeedPopup = () => {
    this.setState({ isSpeedPopupOpen: !this.state.isSpeedPopupOpen });
  }


  /////////////
  //for render
  renderFlyStyleSelectorContent(layout: ControllerLayout) {
    const itemsList = this.props.config.itemsList.asMutable();
    //const isDisable = this.isDisableButton({ isPlaying: true });
    const item = utils.getCurrentActiveItem(this.props, this.state);

    const styleTips = item && utils.getFlyStyleTitle(item.name, this.props);
    const rotateTips = this.props.intl.formatMessage({ id: 'flyStyleRotate', defaultMessage: nls.flyStyleRotate });
    const pathTips = this.props.intl.formatMessage({ id: 'flyStylePath', defaultMessage: nls.flyStylePath });

    const isShowArrow = ((layout === ControllerLayout.Palette) ? false : true);

    const flyStyleContent = this.getFlyStyleContent();
    return <Dropdown isOpen={this.state.isFlyStylePopupOpen} toggle={this.toggleFlyStylePopup} className={'dropdowns flystyle-btn'} activeIcon>
      <DropdownButton icon className={'btns d-flex'} title={styleTips} type="tertiary" arrow={isShowArrow}>
        {flyStyleContent}
      </DropdownButton>
      <DropdownMenu showArrow={false} /*css={getDropdownStyle(this.props.theme)}*/>
        {itemsList.map((itemConfig, idx) => {
          const style = itemConfig.name;
          var isActived = !!(idx === this.state.activedItemIdx);
          if (!itemConfig.isInUse) {
            return null;
          }

          if (FlyStyle.Rotate === style) {
            return <div key={idx}>
              <DropdownItem onClick={() => this.onFlyStyleChange(idx)} /*disabled={isDisable}*/ active={isActived} className="dropdown-items">
                <Icon icon={rotateIconImage} />
                <span className="mx-2">{rotateTips}</span>
              </DropdownItem>
            </div>
          } else if (FlyStyle.Path === style) {
            return <div key={idx}>
              <DropdownItem onClick={() => this.onFlyStyleChange(idx)} /*disabled={isDisable}*/ active={isActived} className="dropdown-items">
                <Icon icon={pathIconImage} />
                <span className="mx-2">{pathTips}</span>
              </DropdownItem>
            </div>
          }/* else if (FlyStyle.Record === style) {
            return <div key={idx}>
              <DropdownItem onClick={() => this.onFlyStyleChange(idx, { isRecord: true })} disabled={isDisable} active={isActived}>
                <Icon icon={pathIconImage} />
                <span className="mx-2">{'TODO: Record'}</span>
              </DropdownItem>
            </div>
          }*/
        })}
      </DropdownMenu>
    </Dropdown>
  }

  renderLiveviewSettingContent() {
    const settingIconImage = require('../assets/icons/setting.svg');
    const isDisable = this.isDisableButton({ isPlaying: true, isCachedGeo: true });

    const settings = this.props.intl.formatMessage({ id: 'settings', defaultMessage: commonMessages.settings });
    //var heading = this.props.intl.formatMessage({ id: 'heading', defaultMessage: nls.heading });
    const tilt = this.props.intl.formatMessage({ id: 'tilt', defaultMessage: nls.tilt });
    const altitude = this.props.intl.formatMessage({ id: 'altitude', defaultMessage: nls.altitude });

    const degree = this.props.intl.formatMessage({ id: 'degree', defaultMessage: commonMessages.degree });
    const meter = this.props.intl.formatMessage({ id: 'meter', defaultMessage: commonMessages.meter });
    const meterAbbr = this.props.intl.formatMessage({ id: 'meterAbbr', defaultMessage: commonMessages.meterAbbr });

    const ground = this.props.intl.formatMessage({ id: 'ground', defaultMessage: nls.ground });
    const space = this.props.intl.formatMessage({ id: 'outerSpace', defaultMessage: nls.outerSpace });
    const relative2Ground = this.props.intl.formatMessage({ id: 'relative2Ground', defaultMessage: nls.relative2Ground });

    const flyStyle = this.controllerManager?.getControllerStyle();
    return <Dropdown isOpen={this.state.isLiveview} toggle={this.toggleLiveviewSettingPopup} className={'dropdowns liveview-btn'}>
      <DropdownButton icon className={'btns d-flex'} disabled={isDisable} title={settings} type="tertiary" arrow={false}>
        <Icon icon={settingIconImage} />
      </DropdownButton>
      <DropdownMenu showArrow={false} css={getDropdownStyle(this.props.theme)}>
        {/*<DropdownItem>
          <div className="d-flex flex-column">
            <span className="d-flex">{heading}</span>
            <Slider id="setting-heading" className="d-flex" value={this.state.settingHeading} min={-90} max={90} step={1} style={{}} size="sm"
              onChange={this.onHeadingChange} title={heading} />
          </div>
        </DropdownItem>*/}
        {(flyStyle !== FlyStyle.Path) ?
          <div className="d-flex dropdown-items flex-column">
            <span className="d-flex dropdown-item-title">{tilt}</span>
            <Slider id="setting-tilt" className="d-flex" value={this.state.settingTilt} min={0} max={90} step={1} size="sm"
              onChange={(evt) => this.onTiltChange(evt.target.value, true)}
              title={utils.showLiveviewSetting(this.state.settingTilt, degree)} />
          </div>
          : null
        }
        {(flyStyle !== FlyStyle.Rotate) ?
          <React.Fragment>
            <div className="d-flex dropdown-items flex-column">
              <span className="d-flex dropdown-item dropdown-item-title">{altitude}</span>
              <Slider id="setting-altitude" className="d-flex dropdown-item" value={this.state.settingAltitude} min={0} max={800} step={10} size="sm"
                onChange={(evt) => this.onAltitudeChange(evt.target.value, true)}
                title={utils.showLiveviewSetting(this.state.settingAltitude, meter)} />

              <div className="d-flex justify-content-between dropdown-item-comment dropdown-item"><span>{ground}</span><span>{space}</span></div>
            </div>
            <div className="d-flex dropdown-items flex-column">
              <div className="d-flex alt-wapper">
                <div className="alt-input">
                  <NumericInput defaultValue="0" size="sm" value={this.state.settingAltitude} onChange={(val) => this.onAltitudeChange(val, true)} />
                </div>
                <span className="setting-altitude-separator">{meterAbbr}</span>
                {relative2Ground}
              </div>
            </div>
          </React.Fragment>
          : null
        }
        {/*<DropdownItem >
            <div className="d-flex flex-column">
              <div><Label for="setting-att" style={{ cursor: 'pointer' }}> Altitude </Label></div>
              <div><Slider id="setting-att" value="40" style={{ width: '150px' }} size="sm" /></div>
              <div className="d-flex justify-content-between">
                <div>Ground</div><div>Space</div>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem>
            <TextInput style={{ width: '50px' }} size="sm" value="40" />
          //TODO selector
          </DropdownItem>*/}
      </DropdownMenu>
    </Dropdown>
  }
  renderPlayStateContent() {
    const playIconImage = require('../assets/icons/play.svg');
    const pauseIconImage = require('../assets/icons/pause.svg');
    let tips = null;
    const isDisable = this.isDisableButton({ isPlaying: true, isLiveview: true, isCachedGeo: true });

    let iconContent = null;
    if (this.state.isPlaying) {
      iconContent = <Icon icon={pauseIconImage} />
      tips = this.props.intl.formatMessage({ id: 'pause', defaultMessage: commonMessages.pause });
    } else {
      iconContent = <Icon icon={playIconImage} />
      tips = this.props.intl.formatMessage({ id: 'play', defaultMessage: commonMessages.play });
    }

    return <Button icon onClick={this.onPlayStateBtnClick} title={tips} disabled={isDisable} className="btns play-btn" type="tertiary">
      {iconContent}
    </Button>
  }
  renderProgressBarContent(layout: ControllerLayout) {
    const type = (layout === ControllerLayout.Palette ? 'circular' : 'linear');

    if (this.controllerManager?.getControllerStyle() === FlyStyle.Path) {
      return <Progress type={type as ('circular' | 'linear')} value={this.state.progress} className="w-100" />
    } else {
      return null;
    }
  }
  renderSpeedControllerContent() {
    const speedTips = this.props.intl.formatMessage({ id: 'speed', defaultMessage: nls.speed });
    const speed = this.props.intl.formatNumber(utils.speedMapping(this.state.settingSpeed));
    const title = speedTips + ': ' + (speed + 'x');
    //Hash: settingSpeed,   shown
    //            0,        0.125x
    //            0.25,     0.25x
    //            0.375,    0.5x
    //            0.5 ,     1x
    //            0.59375,  1.5x
    //            0.625,    2x
    //            0.75,     4x
    //            1,        8x
    const speedList = [0, 0.25, 0.375, 0.5, 0.59375, 0.625, 0.75, 1];
    const len = speedList.length;

    return <div className="d-flex item align-items-center h-100">
      <Slider id="setting-speed" className="d-flex speed-controller" value={speedList.indexOf(this.state.settingSpeed)} min={0} max={len - 1} step={1} size="sm"
        onChange={(evt) => this.onSpeedChange(speedList[evt.target.value])} title={title} />
    </div>
  }
  renderSpeedControllerContentPalette() {
    const speedTips = this.props.intl.formatMessage({ id: 'speed', defaultMessage: nls.speed });
    const speed = utils.speedMapping(this.state.settingSpeed);
    const formattedSpeed = this.props.intl.formatNumber(speed);
    const title = speedTips + ': ' + (formattedSpeed + 'x');
    const speedList = [0, 0.25, 0.375, 0.5, 0.59375, 0.625, 0.75, 1];

    return <Dropdown isOpen={this.state.isSpeedPopupOpen} toggle={this.toggleSpeedPopup} className={'speedcontroller-btn'} direction={'up'}>
      <DropdownButton icon className={'d-flex speedcontroller-text'} title={title} type="tertiary" arrow={false}>
        {formattedSpeed + 'x'}
      </DropdownButton>
      <DropdownMenu showArrow={false} css={getPaletteDropdownStyle(this.props.theme)}>
        <div className="speed-popup-wapper">
          {speedList.map((speed, idx) => {
            const isActived = (speed === this.state.settingSpeed);
            const formattedSpeed = this.props.intl.formatNumber(utils.speedMapping(speed));
            return <div key={idx}>
              <DropdownItem onClick={() => this.onSpeedChange(speed)} active={isActived}>
                <span className="mx-2">{formattedSpeed + 'x'}</span>
              </DropdownItem>
            </div>
          })}
        </div>
      </DropdownMenu>
    </Dropdown>
  }

  renderWidgetPlaceholder() {
    return <WidgetPlaceholder icon={flyIcon} widgetId={this.props.id} message={this.state.errorTip} />;
  }

  render() {
    const mapContent = <JimuMapViewComponent useMapWidgetIds={this.props.useMapWidgetIds} onActiveViewChange={this.onActiveViewChange} />

    const layout = this.props.config.layout

    const flyStyleContent = this.renderFlyStyleSelectorContent(layout);
    const drawBtn = this.getDrawBtnContent();
    const pickBtn = this.getPickBtnContent();
    const clearBtn = this.getClearBtnContent();
    const liveviewSettingContent = this.renderLiveviewSettingContent();
    const playStateContent = this.renderPlayStateContent();
    const progressBar = this.renderProgressBarContent(layout);

    const speedController = this.renderSpeedControllerContent();
    const speedControllerPalette = this.renderSpeedControllerContentPalette();

    let flyControllerContent = null;
    if (this.errorTipsManager.isError()) {
      flyControllerContent = this.renderWidgetPlaceholder();
    } else if (layout === ControllerLayout.Horizontal) {
      flyControllerContent =
        <BarLayout flyStyleContent={flyStyleContent}
          drawBtn={drawBtn}
          pickBtn={pickBtn}
          clearBtn={clearBtn}
          liveviewSettingContent={liveviewSettingContent}
          playStateContent={playStateContent}
          progressBar={progressBar}
          speedController={speedController}
          isPlaying={this.state.isPlaying}
          theme={this.props.theme}>
        </BarLayout>
    } else if (layout === ControllerLayout.Palette) {
      flyControllerContent =
        <PaletteLayout flyStyleContent={flyStyleContent}
          drawBtn={drawBtn}
          pickBtn={pickBtn}
          clearBtn={clearBtn}
          liveviewSettingContent={liveviewSettingContent}
          playStateContent={playStateContent}
          progressBar={progressBar}
          speedController={speedControllerPalette}
          isPlaying={this.state.isPlaying}
          theme={this.props.theme}>
        </PaletteLayout>
    }

    return <div css={getStyle(this.props.theme)} className="d-flex align-items-center justify-content-center">
      {flyControllerContent}
      <div className="fly-map">
        <div>{mapContent}</div>
      </div>
    </div>
  }
}