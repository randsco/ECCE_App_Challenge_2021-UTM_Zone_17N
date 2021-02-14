/** @jsx jsx */
import {
  React, jsx, /*ImmutableArray, Immutable, lodash,*/ SerializedStyles,
  ThemeVariables, css, /*polished, getAppStore, ImmutableObject, LayoutType, ResourceType,*/ IntlShape
} from 'jimu-core';
import { Button, TextInput, /*Modal, ModalBody, ModalFooter, FloatingPanel, ImageFillMode,*/ Icon, /*Label, defaultMessages*/ } from 'jimu-ui';
//import { Fragment } from 'react';
import { RecordStyleConstraint,FlyStyle } from '../../config';
import { PageMode } from '../setting';

interface Props {
  //mode: RecordType
  routeInfo: RecordStyleConstraint;
  theme: ThemeVariables;
  intl: IntlShape;
  //isActived: boolean;
  onShowDialogChange: ((isShow: boolean) => void);
  onSettingPageModeChange: ((mode: PageMode) => void);
}
interface States {
  //isShowDialog: boolean;
  folded: boolean;
}

export class RouteItemDetail extends React.PureComponent<Props, States>{
  constructor(props) {
    super(props);
    this.state = {
      folded: false,
    }
  }

  handleFold = (id: number) => {
    this.setState({
      folded: !this.state.folded
    });
  }

  handleKeydown = (e: any, ref) => {
    if (e.keyCode === 13) {
      ref.current.blur();
    } else {
      return
    }
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      border: 1px solid #FF0000;

      .record-item{
        display: flex;
        justify-content: space-between;

        .record-name-input{
          padding: 3px 0;
          width: 90px;
        }
      }

      .param-setting-row{
        border: 1px solid #00FF00;
        display: flex;
        align-items: center;
        justify-content: end;

        .param-input{
          padding: 3px 0;
          width: 90px;
        }
      }
      `
  }

  onRecordNameChange = (id: number, val: string) => {

  }

  backBtnClick = () => {
    this.props.onShowDialogChange(false);
    this.props.onSettingPageModeChange(PageMode.Common);
  }

  render() {
    const { theme, } = this.props;
    let { routeInfo } = this.props;

    if(!routeInfo) {
      routeInfo = {
        id: 0,
        name: FlyStyle.Record,
        isInUse: true,
        routes: []
      } as RecordStyleConstraint;
    }

    //const { folded } = this.state;
    const titleTextInput = React.createRef<HTMLInputElement>();

    return <div className={'w-100'} css={this.getStyle(theme)}>
      22222: Record item Detail Page

      <div className="">
        <Button className="mr-1" onClick={this.backBtnClick}> back </Button>
        <Button className="mr-1" onClick={this.backBtnClick}> delete </Button>
      </div>

      <div className={'record-item'} onClick={() => this.handleFold(routeInfo.id)}>
        <TextInput className="h5 record-name-input" ref={titleTextInput} size="sm"
          title={routeInfo.name} value={routeInfo.name || ''}
          onChange={evt => this.onRecordNameChange(routeInfo.id, evt.target.value)}
          onKeyDown={(e) => this.handleKeydown(e, titleTextInput)}>
        </TextInput>
        <span className="">
          <Button title={''} type="tertiary" icon>
            <Icon icon={require('jimu-ui/lib/icons/widget-map.svg')} size={12} />
          </Button>
        </span>
      </div>

      <div className={'record-item'} onClick={() => this.handleFold(routeInfo.id)}>
        <span className="">
          <Button title={''} type="tertiary" icon> new feature </Button>
          <Button title={''} type="tertiary" icon> preview </Button>
        </span>
      </div>

      {/* TODO records */}
      <div>

      </div>
    </div>
  }
}