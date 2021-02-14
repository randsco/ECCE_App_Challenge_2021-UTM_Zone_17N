import {React, Immutable, BrowserSizeMode, lodash, appActions, AppMode} from 'jimu-core';
import BookmarkWidget from '../src/runtime/widget';
import { TemplateType, PageStyle, DirectionType } from '../src/config';
import { mockTheme, wrapWidget, widgetRender, getInitState } from 'jimu-for-test';
import { getAppStore } from 'jimu-core';
import { ViewportVisibilityContext } from 'jimu-layouts/layout-runtime';
import { fireEvent } from '@testing-library/react';

jest.mock('jimu-arcgis', () => {
  return {
    loadArcGISJSAPIModules: () => {
      return Promise.resolve([
        {fromJSON: () => {}},
        function() {
          return { fromJSON: () => {} };
        },
        {fromJSON: () => {}},
        {fromJSON: () => {}},
        {fromJSON: () => {}},
      ]);
    },
    JimuMapViewComponent: jest.fn(() => <div data-testid="mapViewTest"></div>)
  };
})

const initState = getInitState().merge({
  appContext: { isRTL: false },
  appConfig: { widgets: [] as any }
});

getAppStore().dispatch(appActions.updateStoreState(initState));

describe('bookmark test', function() {
  let render = null;
  beforeAll(() => {
    render = widgetRender(getAppStore(), mockTheme as any)
  });

  afterAll(() => {
    render = null;
  })

  let config = Immutable({
    templateType: TemplateType.Slide1,
    isTemplateConfirm: true,
    isInitialed: true,
    bookmarks: [{
      id: 1,
      name: 'Test-1',
      title: 'Test-1',
      type: '2d',
      extent: {
        spatialReference: {
          latestWkid: 3857,
          wkid: 102100
        },
        xmin: 12753609.910596116,
        ymin: 4661461.4019647185,
        xmax: 13223239.012380214,
        ymax: 5095012.226398217,
      },
      showFlag: true,
      mapViewId: 'widget_2editor-dataSource_1',
      mapDataSourceId: 'dataSource_1'
    },
    {
      id: 2,
      name: 'Test-2',
      title: 'Test-2',
      type: '2d',
      extent: {
        spatialReference: {
          latestWkid: 3857,
          wkid: 102100
        },
        xmin: 12753609.910596116,
        ymin: 4661461.4019647185,
        xmax: 13223239.012380214,
        ymax: 5095012.226398217,
      },
      showFlag: true,
      mapViewId: 'widget_2editor-dataSource_1',
      mapDataSourceId: 'dataSource_1'
    }],
    autoPlayAllow: true,
    autoInterval: 3,
    autoLoopAllow: true,
    pageStyle: PageStyle.Paging,
    direction: DirectionType.Horizon,
  });

  let props = {
    config,
    browserSizeMode: BrowserSizeMode.Large,
    dispatch: jest.fn(),
    appMode: AppMode.Run,
  };

  it('sizemode change should turn off autoPlay', () => {
    const ref: { current: HTMLElement } = { current: null };
    const Widget = wrapWidget(BookmarkWidget, { theme : mockTheme, ref } as any);
    const { getByTestId, rerender } = render(
      <ViewportVisibilityContext.Provider value={true}>
        <Widget widgetId={'bookmarkTest1'} {...props}/>
      </ViewportVisibilityContext.Provider>
    );
    fireEvent.click(getByTestId('triggerAuto'));
    props = lodash.assign({}, props, { browserSizeMode: BrowserSizeMode.Medium });
    rerender(<ViewportVisibilityContext.Provider value={true}>
      <Widget widgetId={'bookmarkTest1'} {...props}/>
    </ViewportVisibilityContext.Provider>);
    expect((ref.current as any).state.autoPlayStart).toBe(false);
  });

  it('change map ds, showLayersConfig should called with special parameter', () => {
    const ref: { current: HTMLElement } = { current: null };
    const Widget = wrapWidget(BookmarkWidget, { theme : mockTheme, ref } as any);
    const { getByTitle } = render(
      <ViewportVisibilityContext.Provider value={true}>
        <Widget widgetId={'bookmarkTest2'} {...props}/>
      </ViewportVisibilityContext.Provider>
    );
    (ref.current as any).showLayersConfig = jest.fn();
    (ref.current as any).state.jimuMapView = {
      datasourceId: 'dataSource_1',
      mapWidgetId: 'widget_2',
      maxLayerIndex: 2,
      view: {
        goTo: jest.fn(),
        map: {
          add: jest.fn(),
          layers: {toArray: () => {}},
          findLayerById: jest.fn(),
        }
      }
    };
    (ref.current as any).Extent = { fromJSON: () => {} };
    (ref.current as any).GraphicsLayer = function() {
      return { fromJSON: () => {} };
    };
    fireEvent.click(getByTitle('Next'));
    expect((ref.current as any).showLayersConfig).toBeCalledWith(undefined, undefined, undefined, false);
  });

  it('slide should sync with rtl', () => {
    const initState = getInitState().merge({
      appContext: { isRTL: true },
      appConfig: { widgets: [] as any }
    });
    getAppStore().dispatch(appActions.updateStoreState(initState));

    const ref: { current: HTMLElement } = { current: null };
    const Widget = wrapWidget(BookmarkWidget, { theme : mockTheme, ref } as any);
    config = lodash.assign({}, config, { templateType: TemplateType.Gallery });
    props = lodash.assign({}, props, { config });
    const { getByTitle } = render(
      <ViewportVisibilityContext.Provider value={true}>
        <Widget widgetId={'bookmarkTest2'} {...props}/>
      </ViewportVisibilityContext.Provider>
    );
    (ref.current as any).scrollContainer = jest.fn();
    fireEvent.click(getByTitle('Next'));
    expect((ref.current as any).scrollContainer).toBeCalledWith({ behavior: 'smooth', top: 0, left: -210 });
    fireEvent.click(getByTitle('Previous'));
    expect((ref.current as any).scrollContainer).toBeCalledWith({ behavior: 'smooth', top: 0, left: 210 });
  });
});