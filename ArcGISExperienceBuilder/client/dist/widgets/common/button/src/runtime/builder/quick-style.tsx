/** @jsx jsx */
import { React, jsx, ThemeButtonType, IntlShape, injectIntl, css, ThemeVariables, themeUtils, SerializedStyles, ImmutableObject, classNames, polished } from 'jimu-core';
import { Link } from 'jimu-ui';
import { QuickStylePopper, QuickStylePopperProps } from 'jimu-ui/advanced/setting-components';
import defaultMessages from '../translations/default';

interface OwnProps extends Omit<QuickStylePopperProps, 'onChange'> {
  onChange: (t: ThemeButtonType) => void;
  selectedType: ThemeButtonType;
}

type ExtraProps = {
  intl: IntlShape;
}

interface State {

}

export class _QuickStyle extends React.PureComponent<OwnProps & ExtraProps, State> {
  THEMETYPES: ThemeButtonType[] = [
    'default',
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'link'
  ];

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  translate = (id: string) => {
    const { intl } = this.props;
    return intl ? intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : '';
  }

  getStyle = (theme: ImmutableObject<ThemeVariables>): SerializedStyles => {
    return css`
      width: ${polished.rem(360)};
      background-color: ${theme.colors.palette.light[300]};
      color: ${theme.colors.dark};
      border: 1px solid ${theme.colors.palette.light[500]};
      box-shadow: 0 4px 20px 4px ${polished.rgba(theme.colors.white, 0.5)};
      .button-item{
        width: 100%;
        font-size: ${polished.rem(13)};
      }
      .quick-style-item-container{
        padding-left: 4px;
        padding-right: 4px;
        padding-bottom: 8px;
      }
      .quick-style-item{
        border: 2px solid transparent;
        &.quick-style-item-selected{
          border: 2px solid ${theme.colors.palette.primary[600]};
        }
        .quick-style-item-inner{
          background-color: ${theme.colors.palette.light[400]};
          cursor: pointer;
        }
      }
    `;
  }

  render() {
    return (
      <QuickStylePopper reference={this.props.reference} open={true} placement="right-start"
        css={this.getStyle(themeUtils.getBuilderThemeVariables())} onClose={this.props.onClose}
      >
        <div className="container-fluid mb-2">
          <div className="row no-gutters">
            {
              this.THEMETYPES.map((t, i) =>
                <div key={i} className="col-4 quick-style-item-container">
                  <div className={classNames('quick-style-item', {'quick-style-item-selected': this.props.selectedType === t})}>
                    <div className="quick-style-item-inner p-2" onClick={() => this.props.onChange(t)}>
                      <Link title={this.translate('_widgetLabel')}
                        className="d-inline-block button-item text-truncate" themeStyle={{type: t}}
                      >
                        {this.translate('_widgetLabel')}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </QuickStylePopper>
    )
  }
}

export const QuickStyle = injectIntl(_QuickStyle);
