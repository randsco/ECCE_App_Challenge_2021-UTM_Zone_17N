/** @jsx jsx */
import {
  React,
  ReactRedux,
  classNames,
  jsx,
  css,
  ExtensionManager,
  extensionSpec,
  LayoutTransformFunc,
  IMLayoutJson,
  BrowserSizeMode,
  IMThemeVariables,
  ReactResizeDetector,
  lodash,
} from 'jimu-core';
import { styleUtils } from 'jimu-ui';

import { IMRowConfig } from '../../config';
import { Row } from './row';
import {
  LayoutProps,
  StateToLayoutProps,
  PageContext,
  PageContextProps,
  utils,
} from 'jimu-layouts/layout-runtime';
import { ChildRect, TOTAL_COLS } from '../types';

type FlexboxLayoutProps = LayoutProps & {
  widgetId: string;
  config: IMRowConfig;
};

class RowLayout extends React.PureComponent<FlexboxLayoutProps & StateToLayoutProps> {
  childRects: ChildRect[];
  rows: string[][];
  finalLayout: IMLayoutJson;
  layoutTransform: LayoutTransformFunc;

  browserSizeMode: BrowserSizeMode;
  mainSizeMode: BrowserSizeMode;
  theme: IMThemeVariables;
  debounceResizeHandler;

  constructor(props) {
    super(props);
    this.debounceResizeHandler = lodash.debounce(this.onResize, 200);
  }

  findExtension() {
    const exts = ExtensionManager.getInstance().getExtensions(
      `${extensionSpec.ExtensionPoints.LayoutTransformer}`,
    );
    if (exts && exts.length > 0) {
      const ext = exts.find(item => (item as extensionSpec.LayoutTransformer).layoutType === 'ROW');
      this.layoutTransform = (ext as any)?.transformLayout;
    }
  }

  collectRowItems() {
    const { layout, layouts } = this.props;

    if (!this.layoutTransform) {
      this.findExtension();
    }

    let targetLayout = layout;
    if (layouts[this.browserSizeMode] !== layout.id && this.layoutTransform) {
      targetLayout = this.layoutTransform(layout, this.mainSizeMode, this.browserSizeMode);
    }
    this.finalLayout = targetLayout;

    const content = targetLayout.order || [];
    const rows = [];
    let row = [];
    let rowIndex = 0;
    rows.push(row);
    content.forEach((itemId) => {
      const bbox = targetLayout.content[itemId].bbox;
      const left = parseInt(bbox.left, 10);
      const rowNum = Math.floor(left / TOTAL_COLS);
      if (rowNum > rowIndex) {
        row = [];
        rowIndex = rowNum;
        rows.push(row);
      }
      row.push(itemId);
    });
    return rows;
  }

  createRow() {
    const { layout, config, layouts } = this.props;
    return <Row
      layouts={layouts}
      layout={layout}
      transformedLayout={this.finalLayout}
      config={config}
      theme={this.theme}
      isMultiRow={this.rows.length > 1}
    ></Row>;
  }

  onResize = (width, height) => {
    if (this.browserSizeMode !== this.mainSizeMode) {
      return;
    }
    if (!width && !height) {
      return;
    }

    const { widgetId } = this.props;
    if (window.runtimeInfo.widgets?.[widgetId]) {
      window.runtimeInfo.widgets[widgetId].height = height;
    } else {
      window.runtimeInfo.widgets[widgetId] = { height };
    }
  }

  render() {
    const { layout, className, config } = this.props;

    const layoutStyle: any = config.style || {};

    const mergedStyle: any = {
      ...styleUtils.toCSSStyle(layoutStyle as any),
    };

    return (<PageContext.Consumer>
      {(props: PageContextProps) => {
        this.browserSizeMode = props.browserSizeMode;
        this.mainSizeMode = props.mainSizeMode;
        this.theme = props.theme;

        this.rows = this.collectRowItems();
        return <div className={classNames('layout d-flex', className)} css={css`
          width: 100%;
        `} style={mergedStyle} data-layoutid={layout.id}>
          {this.createRow()}
          <ReactResizeDetector handleHeight onResize={this.debounceResizeHandler}/>
        </div>;
      }}
    </PageContext.Consumer>);
  }
}

export default ReactRedux.connect<StateToLayoutProps, unknown, FlexboxLayoutProps>(utils.mapStateToLayoutProps)(RowLayout);
