
/** @jsx jsx */
import { React, css, jsx, classNames, IntlShape, polished } from 'jimu-core';
import { Select, Option } from 'jimu-ui';
import defaultMessages from '../translations/default';
import { PointStyle, Direction } from '../../config'
import { getPointStyle, getDividerLineStyle } from '../../common/template-style'
export interface PointStyleSelector {
  value: PointStyle;
  onChange?: (value: PointStyle) => void;
  className?: string;
  style?: any;
  isPointStart?: boolean;
}

interface ExtraProps {
  intl: IntlShape;
}
interface SelectionOption {
  style?: any;
  value: PointStyle
}
interface PointTitle {
  [key: string]: string
}

export class PointStyleSelector extends React.PureComponent<PointStyleSelector & ExtraProps> {

  pointTitle: PointTitle;

  static defaultProps: Partial<PointStyleSelector & ExtraProps> = {
    value: PointStyle.None,
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.pointTitle = {
      None: this.nls('nonePoint'),
      Point0: this.nls('pointCircle'),
      Point1: this.nls('pointCross'),
      Point2: this.nls('pointLine'),
      Point3: this.nls('pointSquare'),
      Point4: this.nls('pointDiamond'),
      Point5: this.nls('pointInverted'),
      Point6: this.nls('pointArrow'),
      Point7: this.nls('pointOpenArrow'),
      Point8: this.nls('pointInvertedArrow')
    };
  }

  _onLineStyleChange(e) {
    const value = e.target.value;
    this.props.onChange(value);
  }

  nls = (id: string) => {
    return this.props.intl ? this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : id;
  };

  getLineStyles = (): Array<SelectionOption> => {
    const {isPointStart} = this.props;
    const styleData: Array<SelectionOption> = [];
    const pointStyle = getPointStyle('11px', '#fff', Direction.Horizontal, isPointStart);
    for(const key in pointStyle){
      const style = pointStyle[key];
      const point = key == PointStyle.None ? {value: key} : { style: style, value: key as PointStyle }
      styleData.push(point)
    }
    return styleData;
  };

  getStyle = () => {
    return css`
      & {
        width: ${polished.rem(68)};
      }
      &>div {
        width: 100%;
      }
    `
  }

  getOptionStyle = () => {
    return css`
      & {
        display: block;
        width: 100%;
      }
      &.divider-line-con {
        margin: ${polished.rem(8)} 0 ${polished.rem(8)} ${polished.rem(2)};
        height: ${polished.rem(2)};
      }
      .points {
        /* left: 0;
        top: 50%;
        transform: translateY(-50%); */
      }
    `
  }
  getSelectStyle = () => {
    return css`
      .dropdown-menu--inner {
        width: ${polished.rem(94)};
      }
      & {
        width: ${polished.rem(94)};
      }
    `
  }

  getDividerLineStyle = () => {
    const {isPointStart} = this.props;
    return getDividerLineStyle(true, isPointStart, !isPointStart, 11, 11);
  }

  render() {
    const { value, className, style, isPointStart } = this.props;
    const dividerLineClass = isPointStart ? 'point-start-' : 'point-end-'
    return (
      <div className={classNames(className, 'style-setting--line-style-selector')} style={style} css={this.getStyle()}>
        <Select size="sm" name="lineType" value={value} title={this.pointTitle[value]} onChange={this._onLineStyleChange.bind(this)} css={this.getSelectStyle()}>
          {this.getLineStyles().map((ls, index) => (
            <Option key={index}  value={ls.value} title={this.pointTitle[ls.value]}>
              <div className="w-100 pl-1 pr-1">
                {ls.value == PointStyle.None && <div className="position-relative" css={this.getOptionStyle()}>
                  <span>{this.nls('nonePoint')}</span>
                </div>}
                {ls.value != PointStyle.None && <div className="position-relative divider-line-con" css={this.getOptionStyle()}>
                  <div className={classNames('position-absolute divider-line', `${dividerLineClass}${ls.value}`)} css={this.getDividerLineStyle()} style={{border: '1px solid #fff'}}></div>
                  <span className="position-absolute points" css={ls.style}></span>
                </div>}
              </div>
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}



