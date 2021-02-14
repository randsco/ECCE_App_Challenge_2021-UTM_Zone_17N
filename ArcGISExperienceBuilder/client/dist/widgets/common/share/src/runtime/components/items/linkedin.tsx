/** @jsx jsx */
import { jsx } from 'jimu-core';
import { defaultMessages } from 'jimu-ui';
import BaseItem, { ExpandType, BaseItemConstraint } from './base-item';
import { ItemsName } from '../../../config';
import { ItemBtn, IconImages } from './subcomps/item-btn';

const IconImage: IconImages = {
  default: require('./assets/icons/default/linkedin.svg'),
  white: require('./assets/icons/white/linkedin.svg'),
  black: require('./assets/icons/black/linkedin.svg')
}

export interface LinkedinConstraint extends BaseItemConstraint {
}

export class Linkedin extends BaseItem<LinkedinConstraint> {
  //https://www.linkedin.com/shareArticle?mini=true&url={}&title={}&summary={}&source={}
  onClick = (ref) => {
    this.props.onItemClick(ItemsName.Linkedin, ref, ExpandType.BtnRedirect);
    const appTitle = this.props.getAppTitle();
    const by = this.getMsgBy();

    const url = 'https://www.linkedin.com/sharing/share-offsite/?' +
      'url=' + this.props.url +
      '&title=' + appTitle +
      '&summary=' + by +
      '&source=' + appTitle;

    this.openInNewTab(url);
  }

  render() {
    const linkedinNls = this.props.intl.formatMessage({ id: ItemsName.Linkedin, defaultMessage: defaultMessages.linkedin });

    return <ItemBtn
      name={ItemsName.Linkedin}
      intl={this.props.intl}
      nls={linkedinNls}
      iconImages={IconImage}
      attr={this.props}

      onClick={this.onClick}
    ></ItemBtn>
  }
}