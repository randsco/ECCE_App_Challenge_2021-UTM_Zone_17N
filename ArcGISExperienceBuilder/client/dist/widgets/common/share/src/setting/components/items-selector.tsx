/** @jsx jsx */
import { css, jsx, React, ThemeVariables, IntlShape } from 'jimu-core';
import { Checkbox, Label, defaultMessages } from 'jimu-ui';
import { UiMode, ItemsName } from '../../config';

interface State {
  //url: string;
  //items: [];
}
interface Props {
  uiMode: UiMode;
  items?: string[];
  onItemsChange: ((items: string[]) => void);

  intl: IntlShape;
  theme: ThemeVariables;
}

export class ItemsSelector extends React.PureComponent<Props, State>{
  itemsDATAPopup: {id:string,des:string}[];
  itemsDATAInline: {id:string,des:string}[];

  rootRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.itemsDATAPopup = [
      { id: ItemsName.Embed, des: this.props.intl.formatMessage({ id: 'embed', defaultMessage: defaultMessages.embed }) },
      { id: ItemsName.QRcode, des: this.props.intl.formatMessage({ id: 'qrcode', defaultMessage: defaultMessages.qrcode }) },
      { id: ItemsName.Email, des: this.props.intl.formatMessage({ id: 'email', defaultMessage: defaultMessages.email }) },
      //{ id: ItemsName.Sharelink, des: this.props.intl.formatMessage({ id: 'sharelink', defaultMessage: defaultMessages.shareLink }) },
      { id: ItemsName.Facebook, des: this.props.intl.formatMessage({ id: 'facebook', defaultMessage: defaultMessages.facebook }) },
      { id: ItemsName.Twitter, des: this.props.intl.formatMessage({ id: 'twitter', defaultMessage: defaultMessages.twitter }) },
      { id: ItemsName.Pinterest, des: this.props.intl.formatMessage({ id: 'pinterest', defaultMessage: defaultMessages.pinterest }) },
      { id: ItemsName.Linkedin, des: this.props.intl.formatMessage({ id: 'linkedin', defaultMessage: defaultMessages.linkedin }) },
    ];
    this.itemsDATAInline = [
      { id: ItemsName.Facebook, des: this.props.intl.formatMessage({ id: 'facebook', defaultMessage: defaultMessages.facebook }) },
      { id: ItemsName.Twitter, des: this.props.intl.formatMessage({ id: 'twitter', defaultMessage: defaultMessages.twitter }) },
      { id: ItemsName.Pinterest, des: this.props.intl.formatMessage({ id: 'pinterest', defaultMessage: defaultMessages.pinterest }) },
      { id: ItemsName.Linkedin, des: this.props.intl.formatMessage({ id: 'linkedin', defaultMessage: defaultMessages.linkedin }) },
      { id: ItemsName.Embed, des: this.props.intl.formatMessage({ id: 'embed', defaultMessage: defaultMessages.embed }) },
      { id: ItemsName.QRcode, des: this.props.intl.formatMessage({ id: 'qrcode', defaultMessage: defaultMessages.qrcode }) },
      { id: ItemsName.Email, des: this.props.intl.formatMessage({ id: 'email', defaultMessage: defaultMessages.email }) },
      { id: ItemsName.Sharelink, des: this.props.intl.formatMessage({ id: 'sharelink', defaultMessage: defaultMessages.sharelink }) },
    ];

    this.rootRef = React.createRef();
  }

  _isItemChecked = (id) => {
    if (!this.props.items || !this.props.items.length) {
      return false;
    }

    for (let i = 0, len = this.props.items.length; i < len; i++) {
      const itemId = this.props.items[i];
      if (id === itemId) {
        return true;
      }
    }
    return false;
  }
  _createItemUI = () => {
    const elements = [];

    let datas = [];
    const mode = this.props.uiMode;
    if (mode === UiMode.Popup) {
      datas = this.itemsDATAPopup;
    } else {
      datas = this.itemsDATAInline;
    }

    for (let i = 0, len = datas.length; i < len; i++) {
      const item = datas[i];
      const isChecked = this._isItemChecked(item.id);
      elements.push(
        <li className="d-flex item" key={'key-' + i}>
          <Label for={item.id} className="d-flex item-label justify-content-start flex-grow-1 text-break" >{item.des}</Label>
          <Checkbox className="d-flex" id={item.id} checked={isChecked} onChange={this.onItemChange}></Checkbox>
        </li>
      );
    }
    return elements;
  }

  onItemChange = (/*e*/) => {
    //var itemId = e.target.id;
    //var isChecked = e.target.checked;
    this.onOptionsChange();
  }
  onOptionsChange = () => {
    const checkedItems = [];

    const inputs = this.rootRef.current.querySelectorAll('input');
    for (let i = 0, len = inputs.length; i < len; i++) {
      const item = inputs[i];

      if (item.checked === true) {
        checkedItems.push(item.id);
      }
    }

    this.props.onItemsChange(checkedItems);
  }


  getStyle = () => {
    const theme = this.props.theme;

    return css`
      font-size: 13px;
      font-weight: lighter;

      .items-option{
        padding: 6px;
        margin: 0;
        list-style: none;
        list-style-type: none;
        background: ${theme.colors.palette.light[200]};
      }

      .items-option .item{
        margin: 6px 0;
      }

      .items-option .item .item-label{
        margin: 0;
      }
    `;
  }
  render() {
    return <div ref={this.rootRef} css={this.getStyle()}>
      <ul className={'items-option'}>
        {this._createItemUI()}
      </ul>
    </div>
  }
}