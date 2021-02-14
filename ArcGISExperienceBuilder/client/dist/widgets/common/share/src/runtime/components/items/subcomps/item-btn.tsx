/** @jsx jsx */
import { React, jsx, css, defaultMessages, IntlShape } from 'jimu-core';
import { Button, ButtonSize, Icon } from 'jimu-ui';
import { ItemsName, IMConfig, IconRadius, BtnIconSize, IconColorMode, IconSize, UiMode } from '../../../../config';
import { ShownMode } from '../base-item';
import { stopPropagation } from '../utils';

interface Props {
  name: ItemsName;
  intl: IntlShape;
  nls: string;
  attr: any;
  iconImages: IconImages;

  onClick: ((ref) => void)
}

export interface IconImages {
  default: NodeRequire;
  white: NodeRequire;
  black: NodeRequire;
}

export class ItemBtn extends React.PureComponent<Props> {
  btnRef: React.RefObject<any>;
  //btn
  hideLabel: boolean;
  btnSize: ButtonSize;
  btnColor: string;
  iconColor: IconColorMode;
  btnRad: IconRadius;

  constructor(props) {
    super(props);
    this.btnRef = React.createRef();
  }

  //btn style
  getBtnStyles() {
    const { isShowInModal, uiMode, config, shownMode } = this.props.attr;
    const { name } = this.props;

    const isPopupUIMode = (uiMode === UiMode.Popup);
    const hideLabel = isPopupUIMode ? true : config.inline.design.hideLabel;

    const btnSize = this.getBtnSize(config, isShowInModal/*isPopupUIMode,*/);
    const btnColor = isPopupUIMode ? null : config.inline.design.btnColor;
    const iconColor = isPopupUIMode ? null : config.inline.design.iconColor;
    const btnRad = isPopupUIMode ? IconRadius.Rad50 : config.inline.design.btnRad;

    this.hideLabel = hideLabel;
    this.btnSize = btnSize;
    this.btnColor = btnColor;
    this.iconColor = iconColor;
    this.btnRad = btnRad;

    const showMode = shownMode || ShownMode.Btn;
    const btnStyle = this.getBtnBgStyle(this.btnColor, null, this.btnRad, this.btnSize),
      btnShadow = '',//this.getBtnShadow(),
      iconStyle = this.getIconStyle(this.btnRad, this.hideLabel),
      iconSize = this.getIconSize(this.btnSize),
      labelInBtn = this.getLabel(name, this.hideLabel, this.btnRad),
      labelOutOfBtn = this.getOutOfBtnLabel(name, this.hideLabel, this.btnRad),
      iconImg = this.updateIconImgByColor(this.iconColor);

    return {
      shownMode: showMode,
      btnSize: this.btnSize,
      btnStyle: btnStyle,
      btnShadow: btnShadow,
      iconStyle: iconStyle,
      iconSize: iconSize,
      iconImg: iconImg,
      labelInBtn: labelInBtn,
      labelOutOfBtn: labelOutOfBtn
    }
  }
  //Keep this behavior in 8.3 to fix btnRad (from Beta2)
  private fixRadForBeta2(): IconRadius {
    return IconRadius.Rad50;
  }

  private getLabel(name, hideLabel, btnRad) {
    btnRad = this.fixRadForBeta2();
    if (hideLabel || IconRadius.Rad50 === btnRad) {
      return null;
    } else {
      return name;
    }
  }
  private getOutOfBtnLabel(name, hideLabel, btnRad) {
    btnRad = this.fixRadForBeta2();
    if (!hideLabel && IconRadius.Rad50 === btnRad) {
      return name;
    } else {
      return null;
    }
  }

  // getBtnPaddingBySize(size) {
  //   if (window._appState) {
  //     var sizeInTheme = window._appState.theme.components.button.sizes;
  //     return sizeInTheme[size].paddingX;
  //   } else {
  //     if (size === BtnIconSize.Small) {
  //       return '0.25rem';
  //     } else if (size === BtnIconSize.Medium) {
  //       return '0.25rem';
  //     } else if (size === BtnIconSize.Large) {
  //       return '0.5rem';
  //     }
  //   }
  // }

  private getBtnBgStyle(bgColor, defaultBgColor, btnRad, size) {
    btnRad = this.fixRadForBeta2();
    let cssObj = { border: 'none', lineHeight: 1, fontSize: '1rem', padding: 0/*, padding: '0.5rem', width: '100%'*/ };
    // if (size === BtnIconSize.Small) {
    //   cssObj = Object.assign(cssObj, { padding: '0.25rem' });
    // } else if (size === BtnIconSize.Medium) {
    //   cssObj = Object.assign(cssObj, { padding: '0.5rem' });
    // } else if (size === BtnIconSize.Large) {
    //   cssObj = Object.assign(cssObj, { padding: '1rem' });
    // }
    // if (size === BtnIconSize.Small || size === BtnIconSize.Medium || size === BtnIconSize.Large) {
    //   cssObj = Object.assign(cssObj, { padding: this.getBtnPaddingBySize(size)});
    // }
    // if (bgColor) {
    //   cssObj = Object.assign(cssObj, { backgroundColor: bgColor });
    // } else if ('' === bgColor) {
    //   cssObj = Object.assign(cssObj, { backgroundColor: defaultBgColor });
    // }
    if ('undefined' !== btnRad) {
      cssObj = Object.assign(cssObj, { borderRadius: btnRad });
    }
    return cssObj;
  }

  //delete it since 8.3
  // private getBtnShadow(isShowInModal: boolean) {
  //   //return isShowInModal ? '' : 'shadow';
  //   return '';
  // }
  // //copy btn
  // getCopyBtnStyle() {
  //   return { color: 'none' };
  // }

  //Icon
  private getIconStyle(btnRad, isHideLabel) {
    btnRad = this.fixRadForBeta2();
    let cssObj = {/*width: '100%', height: '100%'*/ };
    // if (btnColor) {
    //   cssObj = Object.assign({ 'backgroundColor': btnColor }, cssObj);
    // } else if ('' === btnColor) {
    //   cssObj = Object.assign({ 'backgroundColor': defaultBgColor }, cssObj);
    // }
    if (btnRad === IconRadius.Rad50 || true === isHideLabel) {
      cssObj = Object.assign(cssObj, { margin: 0 });
    }

    return cssObj;
  }

  private getIconSize(size/*: BtnIconSize*/) {
    var s = IconSize.Medium;
    if (size === BtnIconSize.Small) {
      s = IconSize.Small;
    } else if (size === BtnIconSize.Medium) {
      s = IconSize.Medium;
    } else if (size === BtnIconSize.Large) {
      s = IconSize.Large;
    }

    return s;
  }

  private updateIconImgByColor(color: IconColorMode) {
    let img;
    switch (color) {
      case IconColorMode.White: {
        img = this.props.iconImages.white;
        break;
      }
      case IconColorMode.Black: {
        img = this.props.iconImages.black;
        break;
      }
      default: {//IconColorMode.Default
        img = this.props.iconImages.default;
        break;
      }
    }

    return img;
  }
  //1.uiMode == popup
  //  1.1 main btn, 1.2 btn in popup,
  //2.uiMode == list
  //  2.1 btn list
  //3.uiMode == slide
  //  2.1 btn list
  private getBtnSize(config: IMConfig, isShowInModal: boolean/*isPopupUIMode,*/) {
    let size;
    //btns in the popup
    if (isShowInModal) {
      size = BtnIconSize.Large; //1.2 btn in popup
      return size;
    }
    //btns outside popup
    /*if (isPopupUIMode) {
        if (config.popup.icon) {
          size = config.popup.icon.properties.size;//1.1 main btn size
        }
      }*/ else {
      size = config.inline.design.size; //2.1 btn list
    }
    return size;
  }

  getStyle = () => {
    return css`
      border: none;
      margin: 16px 0;
    `;
  }

  onClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    this.props.onClick(this.btnRef);

    stopPropagation(evt);
  }

  getNlsLabel(name, intl: IntlShape) {
    if (!name || name.length < 1) {
      return name;
    }
    //name = name.toLowerCase(); //.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()); //firstUpperCase
    return intl.formatMessage({ id: name, defaultMessage: defaultMessages[name] });
  }

  render() {
    const { intl, nls } = this.props;
    const { /*shownMode,*/ btnSize, btnStyle, btnShadow, iconStyle, iconSize, iconImg, labelInBtn, labelOutOfBtn } = this.getBtnStyles();

    const labelOutOfBtnContent = (null != labelOutOfBtn) ? <div className={'label-outof-btn text-truncate'}>{this.getNlsLabel(labelOutOfBtn, intl)}</div> : null;
    const labelInBtnContent = (null != labelInBtn) ? <div className={'label-in-btn'}>{this.getNlsLabel(labelInBtn, intl)}</div> : null;

    return <div className={'d-flex align-items-center flex-column'}>
      <Button ref={this.btnRef} onClick={evt => this.onClick(evt)} style={btnStyle} size={btnSize} className={btnShadow} title={nls} icon>
        <Icon icon={iconImg} options={{ currentColor: false }} style={iconStyle} width={iconSize} height={iconSize}/> {labelInBtnContent}
      </Button>
      {labelOutOfBtnContent}
    </div>;
  }
}