/** @jsx jsx */
import { React, jsx, polished, css } from 'jimu-core';
import { Icon, Popper } from 'jimu-ui';

interface State {
  isTipOpen: boolean;
}

interface Props {
  tipsMessage: string
}

export class TipsPopper extends React.PureComponent<Props, State> {
  tipRef: any;

  constructor(props) {
    super(props);
    this.state = {
      isTipOpen: false
    };

    this.tipRef = React.createRef();
  }
  tipPopperToggle = (evt) => {
    evt.stopPropagation();
    const { isTipOpen } = this.state;
    this.setState({
      isTipOpen: !isTipOpen
    });
  }

  getStyle = () => {
    return css`
      .info-btn {
        padding-left: ${polished.rem(6)};
        cursor: pointer;
      }
    `
  }

  render() {
    return (
      <div className="d-inline-block" onClick={(e) => { e.stopPropagation()}} css={this.getStyle()}>
        <div className="d-inline-block info-btn" ref={this.tipRef} onMouseEnter={this.tipPopperToggle} onMouseLeave={this.tipPopperToggle}>
          <Icon icon={require('jimu-ui/lib/icons/info-12.svg')} size={12}></Icon>
        </div>
        <Popper
          placement="left-start"
          reference={this.tipRef.current}
          showArrow={true}
          offset={[0, 5]}
          zIndex={3}
          toggle={this.tipPopperToggle}
          open={this.state.isTipOpen}>
          <div className="p-2" style={{ width: polished.rem(230) }}>
            {this.props.tipsMessage}
          </div>
        </Popper>
      </div>);
  }
}