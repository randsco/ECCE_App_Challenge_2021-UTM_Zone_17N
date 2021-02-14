/** @jsx jsx */
import { React, jsx, ImmutableArray, SerializedStyles, IMThemeVariables, AppMode, css } from 'jimu-core';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Direction, Modifiers } from 'jimu-ui';

export interface MyDropDownItem {
  label: string;
  event: (evt, item?: MyDropDownItem) => void;
  hide?: boolean;
}

export interface MyDropdownProps {
  appMode: AppMode,
  theme?: IMThemeVariables,
  toggleTitle?: string,
  toggleIsIcon?: boolean,
  toggleType?: string,
  items?: ImmutableArray<MyDropDownItem>,
  fluid?: boolean;
  size?: string,
  appendToBody?: boolean;
  caret?: boolean;
  modifiers?: Modifiers;
  isDropDownOpen?: boolean;
  direction?: Direction;
  className?: string;
  withBuilderStyle?: any;
  showActive?: boolean;
  activeLabel?: string;
  menuCss?: (theme: IMThemeVariables) => SerializedStyles;
  menuContent?: (theme: IMThemeVariables) => any,
  toggleContent?: (theme: IMThemeVariables) => any,
  onDropDownOpenChange?: (isOpen: boolean) => void;
}
export default class MyDropDown extends React.PureComponent<MyDropdownProps, { isOpen: boolean }>{

  MyDropdown: any;
  MyDropdownToggle: any;
  MyDropdownMenu: any;
  MyDropdownItem: any;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    const { withBuilderStyle } = props;
    this.MyDropdown = withBuilderStyle ? withBuilderStyle(Dropdown) : Dropdown;
    this.MyDropdownToggle = withBuilderStyle ? withBuilderStyle(DropdownToggle) : DropdownToggle;
    this.MyDropdownMenu = withBuilderStyle ? withBuilderStyle(DropdownMenu) : DropdownMenu;
    this.MyDropdownItem = withBuilderStyle ? withBuilderStyle(DropdownItem) : DropdownItem;
  }

  onDropDownToggle = (evt) => {
    evt.stopPropagation();

    const { isDropDownOpen, onDropDownOpenChange } = this.props;
    if (isDropDownOpen !== undefined) {
      onDropDownOpenChange && onDropDownOpenChange(!isDropDownOpen)
    } else {
      const { isOpen } = this.state;
      this.setState({ isOpen: !isOpen });
    }
  }

  onItemClick = (evt, item) => {
    const { isDropDownOpen, onDropDownOpenChange } = this.props;
    if (isDropDownOpen !== undefined) {
      onDropDownOpenChange && onDropDownOpenChange(false)
    } else {
      this.setState({ isOpen: false });
    }
    item.event(evt, item);
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  onDropDownMouseClick = (evt) => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  getStyle = () => {
    return css`
      & button {
        padding: 0
      }
    `
  }

  render() {
    const { items, toggleContent, caret, toggleType, menuContent, appMode,
      modifiers, toggleIsIcon, theme, isDropDownOpen, size, appendToBody,
      toggleTitle, direction, menuCss, className, showActive, activeLabel,
      fluid } = this.props;
    let { isOpen } = this.state;
    isOpen = isDropDownOpen === undefined ? isOpen : isDropDownOpen;
    const { MyDropdown, MyDropdownToggle, MyDropdownMenu, MyDropdownItem } = this;
    return (
      <MyDropdown size={size} toggle={this.onDropDownToggle} direction={direction} fluid={fluid}
        isOpen={isOpen && appMode !== AppMode.Design} className={`my-dropdown ${className}`} css={this.getStyle()}>
        {toggleContent &&
          <MyDropdownToggle icon={toggleIsIcon} title={toggleTitle} size={size} type={toggleType} caret={caret}>
            {toggleContent && toggleContent(theme)}
          </MyDropdownToggle>
        }
        <MyDropdownMenu appendToBody={appendToBody} modifiers={modifiers} css={menuCss && menuCss(theme)} >
          {menuContent ?
            menuContent(theme) :
            items && items.asMutable().map((item: MyDropDownItem, i: number) => {
              return !item.hide &&
                <MyDropdownItem key={i} className="no-user-select" title={item.label} active={showActive && item.label === activeLabel}
                  onClick={(evt) => this.onItemClick(evt, item)}>
                  {item.label}
                </MyDropdownItem>;
            })
          }
        </MyDropdownMenu>
      </MyDropdown>
    )

  }
}
