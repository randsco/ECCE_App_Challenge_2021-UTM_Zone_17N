/** @jsx jsx */
import { React, AllWidgetProps, jsx, css } from 'jimu-core';
import defaultMessages from './translations/default';
import { WidgetPlaceholder } from 'jimu-ui';
import { IMRowConfig } from '../config';
import RowLayout from '../layout/runtime/layout';

const IconImage = require('./assets/icon.svg');

export default class Widget extends React.PureComponent<AllWidgetProps<IMRowConfig>> {
  render() {
    // otherProps may come from Flow Layout
    const { layouts, id, intl, builderSupportModules, ...otherProps } = this.props;
    const LayoutComponent = !window.jimuConfig.isInBuilder
      ? RowLayout
      : builderSupportModules.widgetModules.RowLayoutBuilder;

    if (!LayoutComponent) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No layout component!</div>
      );
    }
    const layoutName = Object.keys(layouts)[0];

    return (
      <div className="widget-row-layout d-flex justify-content-center d-flex w-100" css={
        css`height: 100%;`}>
        <LayoutComponent layouts={layouts[layoutName]} widgetId={id}
          config={this.props.config} {...otherProps}>
          <WidgetPlaceholder
            icon={IconImage}
            widgetId={id}
            style={{
              border: 'none',
              pointerEvents: 'none',
            }}
            message={intl.formatMessage({ id: 'tips', defaultMessage: defaultMessages.tips })}
          />
        </LayoutComponent>
      </div>
    );
  }
}
