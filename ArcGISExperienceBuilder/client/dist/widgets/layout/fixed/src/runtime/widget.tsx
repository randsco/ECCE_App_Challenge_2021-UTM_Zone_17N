/** @jsx jsx */
import {React, AllWidgetProps, jsx } from 'jimu-core';
import {FixedLayoutViewer} from 'jimu-layouts/layout-runtime';
import defaultMessages from './translations/default';
import {WidgetPlaceholder} from 'jimu-ui';

const IconImage = require('./assets/icon.svg');

export default class Widget extends React.PureComponent<AllWidgetProps<unknown>>{
  render(){
    const {layouts, id, intl, builderSupportModules} = this.props;
    const LayoutComponent = !window.jimuConfig.isInBuilder ?
      FixedLayoutViewer : builderSupportModules.widgetModules.LayoutBuilder;

    if (!LayoutComponent) {
      return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        No layout component!
      </div>;
    }
    const layoutName = Object.keys(layouts)[0];

    return <div className="widget-fixed-layout d-flex w-100 h-100">
      <LayoutComponent layouts={layouts[layoutName]} isInWidget={true} style={{
        overflow: 'auto',
        minHeight: 'none'
      }}>
        <WidgetPlaceholder icon={IconImage} widgetId={id}
          style={{
            border: 'none'
          }}
          message={intl.formatMessage({id: 'tips', defaultMessage: defaultMessages.tips})}></WidgetPlaceholder>
      </LayoutComponent>
    </div>;
  }
}