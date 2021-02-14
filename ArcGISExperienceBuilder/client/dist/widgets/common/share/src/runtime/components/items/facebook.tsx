/** @jsx jsx */
import { jsx } from 'jimu-core';
import { defaultMessages } from 'jimu-ui';
import BaseItem, { ExpandType, BaseItemConstraint } from './base-item';
import { ItemsName } from '../../../config';
import { ItemBtn, IconImages } from './subcomps/item-btn';

const IconImage: IconImages = {
  default: require('./assets/icons/default/facebook.svg'),
  white: require('./assets/icons/white/facebook.svg'),
  black: require('./assets/icons/black/facebook.svg')
}

export interface FacebookConstraint extends BaseItemConstraint {
}

export class Facebook extends BaseItem<FacebookConstraint> {
  onClick = (ref) => {
    this.props.onItemClick(ItemsName.Facebook, ref, ExpandType.BtnRedirect);
    const appTitle = this.getAppTitle() + this.getMsgBy();

    const url = 'https://www.facebook.com/sharer/sharer.php?' +
      'u=' + encodeURIComponent(this.props.url) +
      '&t=' + encodeURIComponent(appTitle);

    this.openInNewTab(url);
  }

  render() {
    const facebookNls = this.props.intl.formatMessage({ id: ItemsName.Facebook, defaultMessage: defaultMessages.facebook });

    return <ItemBtn
      name={ItemsName.Facebook}
      intl={this.props.intl}
      nls={facebookNls}
      iconImages={IconImage}
      attr={this.props}

      onClick={this.onClick}
    ></ItemBtn>
  }
}