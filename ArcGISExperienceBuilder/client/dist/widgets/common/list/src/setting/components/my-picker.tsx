/** @jsx jsx */
import { React, classNames, SerializedStyles, css, jsx, IMThemeVariables } from 'jimu-core';
import { ListGroup, Icon, ListGroupItem} from 'jimu-ui';
export interface PickerItem{
  icon: any,
  value: any,
  iconSize?: number,
  label?: string
}

export interface ItemSize{
  width: number,
  height: number
}

export enum StyleType {
  ButtonGroup = 'BUTTON_GROUP',
  List = 'LIST'
}

interface Props{
  theme: IMThemeVariables,
  dataSource: PickerItem[],
  itemSize?: ItemSize,
  iconSize?: number,
  useImg?: boolean,
  gap?: number,
  selectedIndex?: number,
  itemClassname?: string,
  onSelected?: (value: any, index: number) => void,
  itemActiveStyle?: SerializedStyles,
  type?: StyleType
}

interface Stats{
  selectedIndex: number
}

const defaultItemSize = {
  width: 32,
  height: 32
};

const defaultIconSize = 24;
export default class MyPicker extends React.Component<Props, Stats>{

  constructor(props){
    super(props);

    const {selectedIndex} = this.props;
    this.state = {
      selectedIndex: selectedIndex || 0
    }
  }

  componentDidUpdate(){
    if(this.props.selectedIndex !== this.state.selectedIndex){
      this.setState({
        selectedIndex: this.props.selectedIndex
      })
    }
  }

  getStyle = (): SerializedStyles => {
    const {itemSize, gap, itemActiveStyle, type, theme} = this.props;
    return css`
      overflow: hidden;
      width: auto;
      max-width: 100%;
      .my-picker{
        overflow: auto;
        width: auto;
        overflow-y: hidden;
        .my-picker-item {
          width: ${(itemSize && itemSize.width) || defaultItemSize.width}px;
          height: ${(itemSize && itemSize.height) || defaultItemSize.height}px;
          padding: 0;
          background: ${theme.colors.white};
          border: 1px solid ${theme.colors.palette.light[500]};
          align-items: center;
          .picker-label {
            font-size: 10px;
            text-align: center;
            margin-top: 3px;
          }
          &.active {
            ${
              itemActiveStyle ||
              `
                background-color: ${theme.colors.palette.light[500]};
              `
            }
          }
        }
        ${(!type || type === StyleType.ButtonGroup) &&
          `
          .my-picker-item {
            border-left-width: 0;
          };
          li:first-of-type {
            border-radius: 2px 0 0 2px;
            border-left-width: 1px;
          };
          li:last-of-type {
            border-radius: 0 2px 2px 0;
          }
          `
        }
        ${
          type === StyleType.List &&
          `
          li:not(:first-of-type){
            margin-left: ${gap || 10}px;
          };
          `
        }
      }
    `
  }

  handleItemSelected = (evt, value, index: number) => {
    const {onSelected} = this.props;
    this.setState({
      selectedIndex: index
    })
    if(onSelected){
      onSelected(value, index);
    }
  }

  render(){

    const {dataSource, itemClassname, iconSize, useImg} = this.props;
    const {selectedIndex} = this.state;

    const itemClasses = classNames(
      itemClassname,
      'my-picker-item',
      'd-flex',
      'justify-content-center'
    );
    return(
      <div css={this.getStyle()} >

        <ListGroup
          className="my-picker flex-row">
          {dataSource.map((data, i) => {
            return (<ListGroupItem
              key={i}
              className={itemClasses}
              active={i === selectedIndex}
              onClick={evt => {this.handleItemSelected(evt, data.value, i)}}
            >
              <div>
                {
                  useImg ? <img src={data.icon}></img> :
                    <Icon size={data.iconSize || iconSize || defaultIconSize} icon={data.icon}></Icon>
                }
                {data.label && <div className="picker-label">{data.label}</div>}
              </div>
            </ListGroupItem>)
          })}
        </ListGroup>
      </div>

    )
  }
}