/** @jsx jsx */
import { jsx } from 'jimu-core';
import { defaultMessages } from 'jimu-ui';
import BaseItem, { ExpandType, BaseItemConstraint } from './base-item';
import { ItemsName } from '../../../config';
import { ItemBtn, IconImages } from './subcomps/item-btn';

const IconImage: IconImages = {
  default: require('./assets/icons/default/twitter.svg'),
  white: require('./assets/icons/white/twitter.svg'),
  black: require('./assets/icons/black/twitter.svg')
}

export interface TwitterConstraint extends BaseItemConstraint {
}

export class Twitter extends BaseItem<TwitterConstraint> {
  // constructor(props) {
  //   super(props);
  //   this.init(ItemsName.Twitter, '#1DA1F2', ExpandType.BtnRedirect);
  // }

  //https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
  onClick = (ref) => {
    this.props.onItemClick(ItemsName.Twitter, ref, ExpandType.BtnRedirect);

    const appTitle = this.getAppTitle() + this.getMsgBy();
    const atAccount = ' @ArcGISOnline \n';

    const url = 'https://twitter.com/intent/tweet?text=' + appTitle + atAccount +
      '&url=' + encodeURIComponent(this.props.url) + '&related=';

    this.openInNewTab(url);
  }

  render() {
    const twitterNls = this.props.intl.formatMessage({ id: ItemsName.Twitter, defaultMessage: defaultMessages.twitter });

    return <ItemBtn
      name={ItemsName.Twitter}
      intl={this.props.intl}
      nls={twitterNls}
      iconImages={IconImage}
      attr={this.props}

      onClick={this.onClick}
    ></ItemBtn>
  }
}