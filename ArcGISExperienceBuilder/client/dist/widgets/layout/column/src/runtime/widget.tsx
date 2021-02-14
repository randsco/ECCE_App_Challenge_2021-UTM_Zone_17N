/** @jsx jsx */
import { React, AllWidgetProps, jsx, css } from 'jimu-core';
import { WidgetPlaceholder } from 'jimu-ui';
import { ColumnLayoutViewer } from 'jimu-layouts/layout-runtime';
import { IMFlexboxConfig } from '../config';
import defaultMessages from './translations/default';

const IconImage = require('./assets/icon.svg');

export default class Widget extends React.PureComponent<AllWidgetProps<IMFlexboxConfig>>{
  getStyle() {
    return css`
      & > div.column-layout {
        height: 100%;
        overflow: hidden;
        display: flex;

        & > .trail-container {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
    `;
  }

  render() {
    const { layouts, id, intl, builderSupportModules } = this.props;
    const LayoutComponent = !window.jimuConfig.isInBuilder ?
      ColumnLayoutViewer : builderSupportModules.widgetModules.ColumnLayoutBuilder;

    if (!LayoutComponent) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        No layout component!
      </div>;
    }
    const layoutName = Object.keys(layouts)[0];

    return <div className="widget-column-layout w-100 h-100" css={this.getStyle()} style={{overflow: 'auto'}}>
      <LayoutComponent layouts={layouts[layoutName]}>
        <WidgetPlaceholder icon={IconImage} widgetId={id}
          style={{
            border: 'none',
            height: '100%',
            pointerEvents: 'none',
            position: 'absolute'
          }}
          message={intl.formatMessage({ id: 'tips', defaultMessage: defaultMessages.tips })}></WidgetPlaceholder>
      </LayoutComponent>
    </div>;
  }
}