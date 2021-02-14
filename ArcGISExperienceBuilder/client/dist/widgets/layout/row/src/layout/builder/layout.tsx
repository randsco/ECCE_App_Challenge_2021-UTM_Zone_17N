/** @jsx jsx */
import {
  React,
  ReactRedux,
  classNames,
  jsx,
  css,
  BrowserSizeMode,
  ExtensionManager,
  extensionSpec,
  LayoutTransformFunc,
  IMLayoutJson,
  // polished,
  IMThemeVariables,
  ReactResizeDetector,
  lodash,
} from 'jimu-core';
import { styleUtils } from 'jimu-ui';
import { IMRowConfig } from '../../config';
import {
  LayoutProps,
  StateToLayoutProps,
  PageContext,
  PageContextProps,
  utils,
} from 'jimu-layouts/layout-runtime';
import { TOTAL_COLS } from '../types';
import { Row } from './row';

type RowLayoutProps = LayoutProps & {
  widgetId: string;
  config: IMRowConfig;
  parentLayoutId?: string;
  parentLayoutItemId?: string;
};

class RowLayout extends React.PureComponent<RowLayoutProps & StateToLayoutProps> {
  layoutTransform: LayoutTransformFunc;
  finalLayout: IMLayoutJson;
  ref: HTMLElement;
  numOfRows: number;
  // page env
  inSelectMode: boolean;
  theme: IMThemeVariables;
  builderTheme: IMThemeVariables;
  mainSizeMode: BrowserSizeMode;
  browserSizeMode: BrowserSizeMode;
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
    const viewOnly = layouts[this.browserSizeMode] !== layout.id;
    if (viewOnly && this.layoutTransform) {
      targetLayout = this.layoutTransform(layout, this.mainSizeMode, this.browserSizeMode);
    }
    this.finalLayout = targetLayout;

    const content = targetLayout.order || [];

    const rows = [];
    let row = [];
    let rowIndex = 0;
    rows.push(row);
    content.forEach((itemId) => {
      if (targetLayout.content[itemId].isPending) {
        return;
      }
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
      isMultiRow={this.numOfRows > 1}
    >{this.props.children}</Row>;
  }

  onResize = (width, height) => {
    if (this.browserSizeMode !== this.mainSizeMode) {
      return;
    }
    if (!height) {
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
    const { layout, config } = this.props;
    const layoutStyle: any = config.style || {};

    return (
      <PageContext.Consumer>
        {(pageContext: PageContextProps) => {
          this.theme = pageContext.theme;
          this.browserSizeMode = pageContext.browserSizeMode;
          this.mainSizeMode = pageContext.mainSizeMode;
          this.builderTheme = pageContext.builderTheme;
          this.numOfRows = this.collectRowItems().length;

          const mergedStyle: any = {
            ...styleUtils.toCSSStyle(layoutStyle as any),
          };

          return (<div className={classNames('layout d-flex', classNames)} css={css`
            width: 100%;
          `} style={mergedStyle} data-layoutid={layout.id}
          ref={el => this.ref = el}>
            {this.createRow()}
            <ReactResizeDetector handleHeight onResize={this.debounceResizeHandler}/>
          </div>);
        }}
      </PageContext.Consumer>
    );
  }
}

export default ReactRedux.connect<StateToLayoutProps, unknown, RowLayoutProps>(utils.mapStateToLayoutProps)(
  RowLayout as any,
);
