/** @jsx jsx */
import {
  React, jsx, /*ImmutableArray, Immutable, lodash,*/ SerializedStyles,
  ThemeVariables, css, /*polished, getAppStore, ImmutableObject, LayoutType, ResourceType,*/ IntlShape
} from 'jimu-core';
import { Button, TextInput, /*Modal, ModalBody, ModalFooter, FloatingPanel, ImageFillMode,*/ Icon, Label, defaultMessages } from 'jimu-ui';
//import { Fragment } from 'react';

export enum RecordType {
  Point = 0,
  LineRealPath,
  LineSmoothed
}

interface Props {
  //mode: RecordType
  item: any;
  theme: ThemeVariables;
  intl: IntlShape;
  //isActived: boolean;
}
interface States {
  //isShowDialog: boolean;
  folded: boolean;
}
// interface RecordConfigs {
//   name: string;
//   duration: number;
//   degree: number;
//   waitingTime: number;
// }
export enum RecordConfigs {
  Name,
  Duration,
  Degree,
  WaitingTime
}

export class RouteItem extends React.PureComponent<Props, States>{

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
  handleDelete = (id: number) => {
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

  onRecordChange = (id: number, val: string, attr: RecordConfigs) => {
  }

  render() {
    const { theme, item } = this.props;
    //const { folded } = this.state;

    const titleTextInput = React.createRef<HTMLInputElement>();

    const durationInput = React.createRef<HTMLInputElement>();
    const degreeInput = React.createRef<HTMLInputElement>();
    const waitingInput = React.createRef<HTMLInputElement>();

    const second = this.props.intl.formatMessage({ id: 'second', defaultMessage: defaultMessages.second });
    const degree = this.props.intl.formatMessage({ id: 'degree', defaultMessage: defaultMessages.degree });
    //const meter = this.props.intl.formatMessage({ id: 'meter', defaultMessage: defaultMessages.meter });

    const subItemType = item.type;

    return <div className={'w-100'} css={this.getStyle(theme)}>
      <div className={'record-item'} onClick={() => this.handleFold(item.id as number)}>
        <TextInput className="h5 record-name-input" ref={titleTextInput} size="sm"
          title={item.name} value={item.name || ''}
          onChange={evt => this.onRecordChange(item.id, evt.target.value, RecordConfigs.Name)}
          onKeyDown={(e) => this.handleKeydown(e, titleTextInput)}>
        </TextInput>
        <span className="">
          <Button title={''} type="tertiary" icon>
            <Icon icon={require('jimu-ui/lib/icons/widget-map.svg')} size={12} />
          </Button>
          <Button title={''} type="tertiary" icon>
            <Icon icon={require('jimu-ui/lib/icons/delete.svg')} size={12} />
          </Button>
        </span>
      </div>

      {/* point */
        (subItemType === RecordType.Point) && <div>
          <div className={'param-setting-row'}>{/* 1.duration */}
            <Icon icon={require('jimu-ui/lib/icons/widget-map.svg')} size={12} />
            <Label for="" className="">{second}</Label>
            <TextInput className="h5 param-input" ref={durationInput} size="sm"
              title={item.name} value={item.name || ''}
              onChange={evt => this.onRecordChange(item.id, evt.target.value, RecordConfigs.Duration)}
              onKeyDown={(e) => this.handleKeydown(e, durationInput)}>
            </TextInput>
          </div>
          <div className={'param-setting-row'}>{/* 2.degree */}
            <Icon icon={require('jimu-ui/lib/icons/widget-map.svg')} size={12} />
            <Label for="" className="">{degree}</Label>
            <TextInput className="h5 param-input" ref={degreeInput} size="sm"
              title={item.name} value={item.name || ''}
              onChange={evt => this.onRecordChange(item.id, evt.target.value, RecordConfigs.Degree)}
              onKeyDown={(e) => this.handleKeydown(e, degreeInput)}>
            </TextInput>
          </div>
          <div className={'param-setting-row'}>{/* 3.waitingTime */}
            <Icon icon={require('jimu-ui/lib/icons/widget-map.svg')} size={12} />
            <Label for="" className="">{second}</Label>
            <TextInput className="h5 param-input" ref={waitingInput} size="sm"
              title={item.name} value={item.name || ''}
              onChange={evt => this.onRecordChange(item.id, evt.target.value, RecordConfigs.WaitingTime)}
              onKeyDown={(e) => this.handleKeydown(e, waitingInput)}>
            </TextInput>
          </div>
        </div>
      }
      {/* path */
        ((subItemType === RecordType.LineRealPath) || (subItemType === RecordType.LineSmoothed)) && <div>
          <div className={'param-setting-row'}>{/* 1.duration */}
            <Icon icon={require('jimu-ui/lib/icons/widget-map.svg')} size={12} />
            <Label for="" className="">{second}</Label>
            <TextInput className="h5 param-input" ref={durationInput} size="sm"
              title={item.name} value={item.name || ''}
              onChange={evt => this.onRecordChange(item.id, evt.target.value, RecordConfigs.Duration)}
              onKeyDown={(e) => this.handleKeydown(e, durationInput)}>
            </TextInput>
          </div>
          <div className={'param-setting-row'}>{/* 3.waitingTime */}
            <Icon icon={require('jimu-ui/lib/icons/widget-map.svg')} size={12} />
            <Label for="" className="">{second}</Label>
            <TextInput className="h5 param-input" ref={waitingInput} size="sm"
              title={item.name} value={item.name || ''}
              onChange={evt => this.onRecordChange(item.id, evt.target.value, RecordConfigs.WaitingTime)}
              onKeyDown={(e) => this.handleKeydown(e, waitingInput)}>
            </TextInput>
          </div>
        </div>
      }
    </div>
  }
}