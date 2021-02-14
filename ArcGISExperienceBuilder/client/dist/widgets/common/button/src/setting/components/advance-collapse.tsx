import {React} from 'jimu-core';
import {Collapse, Switch, Label} from 'jimu-ui';

interface Props{
  title: string;
  isOpen: boolean;
  toggle: () => void;
}
export default class AdvanceCollapse extends React.PureComponent<Props>{

  constructor(props){
    super(props);
  }

  render(){

    return (
      <div className="w-100">
        <div onClick={this.props.toggle} className="d-flex justify-content-between mb-2">
          <div><Label for="open-collapse" className="collapse-label">{this.props.title}</Label></div>
          <div><Switch id="open-collapse" name="open-collapse" onChange={this.props.toggle} checked={this.props.isOpen} /></div>
        </div>
        <Collapse isOpen={this.props.isOpen}>
          {
            this.props.children
          }
        </Collapse>
      </div>
    );
  }
}
