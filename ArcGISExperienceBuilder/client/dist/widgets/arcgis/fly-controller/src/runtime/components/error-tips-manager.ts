import * as utils from './utils/utils';
import nls from '../translations/default';

interface Options {
  widget: any;
}

export enum ErrorTypes {
  Choose3DMap,
  ConfigError
}

export default class ErrorTipsManager {
  widget: any;
  sceneView: __esri.SceneView;

  //tips
  chooseMapTip;
  configErrorTip;

  constructor(options: Options) {
    this.widget = options.widget;

    this.chooseMapTip = this.widget.props.intl.formatMessage({ id: 'chooseMapTip', defaultMessage: nls.chooseMapTip });
    this.configErrorTip = this.widget.props.intl.formatMessage({ id: 'configErrorTip', defaultMessage: nls.configErrorTip });
  }

  getDefaultError = (): string => {
    return this.chooseMapTip;
  }

  isError = () => {
    return (this.isNoMapId() || this.isErrorTipShown() || this.isNoScene() || this.isNoModeInSetting());
  }

  setError = (tip: string) => {
    if (tip !== this.widget.state.errorTip) {
      this.widget.setState({ errorTip: tip })
    }
  }
  setErrorByType = (type: ErrorTypes) => {
    if (type === ErrorTypes.Choose3DMap) {
      this.setError(this.chooseMapTip);
    }
  }


  private isNoScene = () => {
    return !this.widget.jimuMapView;
  }
  private isNoModeInSetting = () => {
    return utils.getEnabledItemNum(this.widget.props.config.itemsList) < 1;
  }
  private isNoMapId = () => {
    return !(this.widget.props.useMapWidgetIds && this.widget.props.useMapWidgetIds[0])
  }
  private isErrorTipShown = () => {
    return this.widget.state.errorTip
  }

  checkErrorInConfig = () => {
    const choseSceneInSetting = this.isNoScene() || this.isNoMapId();//for change map
    if (choseSceneInSetting) {
      this.setError(this.chooseMapTip); // no 3d map
      return;
    }
    if (this.isNoModeInSetting()) {
      this.setError(this.configErrorTip); //no item in config
      return;
    }

    if (this.widget.jimuMapView) {
      this.setError(''); // ok
    }
  }
}