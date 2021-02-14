import { React, Immutable, getAppStore, appActions, lodash } from 'jimu-core';
import EmbedWidget from '../src/runtime/widget';
import { wrapWidget, mockTheme, widgetRender, getInitState } from 'jimu-for-test';
import { EmbedType } from '../src/config';
import { ViewVisibilityContext } from 'jimu-layouts/layout-runtime';

const initState = getInitState().merge({
  appConfig: { widgets: [] as any }
});

getAppStore().dispatch(appActions.updateStoreState(initState));

describe('safe url should use iframe without sandbox', function() {
  let render = null;
  beforeAll(() => {
    render = widgetRender(getAppStore(), mockTheme as any)
  });

  afterAll(() => {
    render = null;
  })

  const config = Immutable({
    embedType: EmbedType.Url,
    embedCode: '',
    staticUrl: 'https://nodejs.org/en/',
    expression: '',
  });

  const props = {
    config,
  };

  it.only('should turn off autoPlay', () => {
    const ref: { current: HTMLElement } = { current: null };
    const Widget = wrapWidget(EmbedWidget, { theme : mockTheme, ref } as any);
    const { rerender } = render(
      <ViewVisibilityContext.Provider value={{ isInView: false, isInCurrentView: false }}>
        <Widget widgetId={'embedTest1'} {...props}/>
      </ViewVisibilityContext.Provider>
    );
    expect(ref.current.ifr.getAttribute('sandbox')).toBeDefined();
    const newConfig = lodash.assign({}, config, { staticUrl:  'https://doc.arcgis.com/en/experience-builder/configure-widgets/image-widget.htm' });
    const newProps = lodash.assign({}, props, { config: newConfig });
    rerender(<ViewVisibilityContext.Provider value={{ isInView: false, isInCurrentView: false }}>
      <Widget widgetId={'bookmarkTest1'} {...newProps}/>
    </ViewVisibilityContext.Provider>);
    expect(ref.current.ifr.getAttribute('sandbox')).toBeNull();
  });

  it.only('embed should not render when current view is not active', () => {
    const ref: { current: HTMLElement } = { current: null };
    const Widget = wrapWidget(EmbedWidget, { theme : mockTheme, ref } as any);
    const { queryByTestId, rerender } = render(
      <ViewVisibilityContext.Provider value={{ isInView: true, isInCurrentView: false }}>
        <Widget widgetId={'embedTest2'} {...props}/>
      </ViewVisibilityContext.Provider>
    );
    expect(queryByTestId('embedSandbox')).not.toBeInTheDocument();
    rerender(<ViewVisibilityContext.Provider value={{ isInView: true, isInCurrentView: true }}>
      <Widget widgetId={'embedTest2'} {...props}/>
    </ViewVisibilityContext.Provider>);
    expect(queryByTestId('embedSandbox')).toBeInTheDocument();
  });
});
