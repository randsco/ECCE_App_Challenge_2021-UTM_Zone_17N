/** @jsx jsx */
import { React, jsx, css } from 'jimu-core';
import { Button, Icon } from 'jimu-ui';
import { UiMode } from '../../../../config';
import { IBackable } from '../base-item';
import { stopPropagation } from '../utils';

const IconImage = require('../assets/icons/backarrow.svg');
interface Props extends IBackable {
  uiMode: UiMode,
  onBackBtnClick: (() => void);
}

export class BackBtn extends React.PureComponent<Props> implements IBackable{
  constructor(props) {
    super(props);
  }

  onBackBtnClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    this.props.onBackBtnClick();

    stopPropagation(evt);
  }

  getStyle = () => {
    return css`
      border: none;
      margin: 16px 0;
    `;
  }

  render() {
    let content = null;

    if (this.props.uiMode === UiMode.Inline) {
      content = null;
    } else {
      content = <Button onClick={evt => this.onBackBtnClick(evt)} size={'sm'} css={this.getStyle()} icon>
        <Icon icon={IconImage} options={{ currentColor: false }} width={20} height={20}/>
      </Button>;
    }

    return content;
  }
}