/** @jsx jsx */
import { jsx } from 'jimu-core';
import { defaultMessages } from 'jimu-ui';
import { QRCode as JimuQRCode } from 'jimu-ui/basic/qr-code';
import { BackBtn } from './subcomps/back-btn';
import BaseItem, { ShownMode, ExpandType, BaseItemConstraint, IBackable } from './base-item';
import { ItemsName } from '../../../config';
import { ItemBtn, IconImages } from './subcomps/item-btn';

const IconImage: IconImages = {
  default: require('./assets/icons/default/qrcode.svg'),
  white: require('./assets/icons/white/qrcode.svg'),
  black: require('./assets/icons/black/qrcode.svg')
}

export interface QRCodeConstraint extends BaseItemConstraint, IBackable {
  onBackBtnClick: (() => void)
}

export class QRCode extends BaseItem<QRCodeConstraint> implements IBackable {
  onClick = (ref) => {
    this.props.onItemClick(ItemsName.QRcode, ref, ExpandType.ShowInPopup);
  }
  onBackBtnClick = () => {
    this.props.onBackBtnClick();
  }

  render() {
    let content = null;
    const { shownMode } = this.props;
    const qrcodeNls = this.props.intl.formatMessage({ id: ItemsName.QRcode, defaultMessage: defaultMessages.qrcode });

    if (shownMode !== ShownMode.Btn) {
      content = <div>
        <BackBtn uiMode={this.props.uiMode} onBackBtnClick={this.onBackBtnClick}></BackBtn>
        <JimuQRCode value={this.props.url} level="L" includeMargin={true} downloadFileName="Exb_QRCode"></JimuQRCode>
      </div>
    } else {
      content = <ItemBtn
        name={ItemsName.QRcode}
        intl={this.props.intl}
        nls={qrcodeNls}
        iconImages={IconImage}

        attr={this.props}

        onClick={this.onClick}
      ></ItemBtn>
    }

    return content;
  }
}