import { React } from 'jimu-core';
import { defaultMessages } from 'jimu-ui';
import BaseItem, { ExpandType, BaseItemConstraint } from './base-item';
import nls from '../../translations/default';
import { ItemsName } from '../../../config';
import { ItemBtn, IconImages } from './subcomps/item-btn';

const IconImage: IconImages = {
  default: require('./assets/icons/default/email.svg'),
  white: require('./assets/icons/white/email.svg'),
  black: require('./assets/icons/black/email.svg')
}

export interface EmailConstraint extends BaseItemConstraint {
}

export class Email extends BaseItem<EmailConstraint>{
  hiddenLinkRef: React.RefObject<any>;

  shareEmailSubject: string;
  shareEmailTxt1: string;
  shareEmailTxt2: string;
  shareEmailTxt3: string;

  constructor(props) {
    super(props);
    //this.init(ItemsName.Email, '#35465C', ExpandType.BtnRedirect);
    this.hiddenLinkRef = React.createRef();

    this.shareEmailSubject = this.props.intl.formatMessage({ id: 'emailSubject', defaultMessage: nls.emailSubject });
    this.shareEmailTxt1 = this.props.intl.formatMessage({ id: 'emailText1', defaultMessage: nls.emailText1 });
    this.shareEmailTxt2 = this.props.intl.formatMessage({ id: 'emailText2', defaultMessage: nls.emailText2 });
    this.shareEmailTxt3 = this.props.intl.formatMessage({ id: 'emailText3', defaultMessage: nls.emailText3 });
  }

  onClick = (ref) => {
    this.props.onItemClick(ItemsName.Email, ref, ExpandType.BtnRedirect);
    this._updateHref();
    this.clickANode();
  }

  clickANode = () => {
    this.hiddenLinkRef.current.click();
  }

  _updateHref = () => {
    const appTitle = this.props.getAppTitle();
    //const by = this.getMsgBy();

    const aNode = this.hiddenLinkRef.current;
    if (aNode) {
      let href = 'mailto:?subject\x3d' + this.shareEmailSubject + appTitle;
      href = href + ('\x26body\x3d' + encodeURIComponent(this.shareEmailTxt1) + '%0D%0A%0D%0A' + appTitle);
      href = href + ('%0D%0A' + encodeURIComponent(this.props.url));
      href = href + ('%0D%0A%0D%0A' + encodeURIComponent(this.shareEmailTxt2));
      href = href + ('%0D%0A%0D%0A' + encodeURIComponent(this.shareEmailTxt3));

      aNode.href = href;
    }
  }

  render() {
    const emailNls = this.props.intl.formatMessage({ id: ItemsName.Email, defaultMessage: defaultMessages.email });

    return <React.Fragment>
      <ItemBtn
        name={ItemsName.Email}
        intl={this.props.intl}
        nls={emailNls}
        iconImages={IconImage}
        attr={this.props}

        onClick={this.onClick}
      ></ItemBtn>

      <div style={{ display: 'none' }}>
        <a href="" ref={this.hiddenLinkRef}></a>
      </div>
    </React.Fragment>;
  }
}