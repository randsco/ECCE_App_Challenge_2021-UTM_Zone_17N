import { React, Immutable, appActions, lodash } from 'jimu-core';
import BookmarkSetting from '../src/setting/setting';
import { TemplateType, PageStyle } from '../src/config';
import { mockTheme, wrapWidget, widgetRender, getInitState } from 'jimu-for-test';
import { getAppStore } from 'jimu-core';
import { fireEvent } from '@testing-library/react';

jest.mock('jimu-for-builder', () => ({
  ...jest.requireActual('jimu-for-builder'),
  templateUtils: {
    processForTemplate: jest.fn()
  }
}));

jest.mock('jimu-ui', () => {
  return {
    ...jest.requireActual('jimu-ui'),
    NumericInput: (props) => <input className="jimu-input jimu-input-sm jimu-numeric-input jimu-numeric-input-input" {...props} />
  }
})

const initState = getInitState().merge({
  appContext: { isRTL: false },
  appConfig: { widgets: [] as any }
});

getAppStore().dispatch(appActions.updateStoreState(initState));

describe('bookmark setting test', function() {
  let render = null;
  const fixedTooltip = {
    fontSize: '0.875rem',
    maxWidth: '200px',
    color: 'inherit',
    bg: '#fff',
    borderRadius: '0.25rem',
    border: {
      width: '1px',
      color: '#a8a8a8'
    },
    boxShadow: '0 .125rem .5rem rgba(0,0,0,0.2)',
    opacity: 1,
    paddingY: '0.25rem',
    paddingX: '0.5rem',
    margin: '0.375rem',
    arrow: {
      size: '0.375rem',
      color: '#fff',
      border: {
        width: '1px',
        color: '#a8a8a8'
      }
    }
  };
  const fixedComponents = lodash.assign({}, mockTheme.components, { tooltip: fixedTooltip });
  const fixedMockTheme = lodash.assign({}, mockTheme, { components: fixedComponents });
  beforeAll(() => {
    render = widgetRender(getAppStore(), fixedMockTheme as any)
  });

  afterAll(() => {
    render = null;
  })

  const config = Immutable({
    templateType: TemplateType.Slide1,
    isTemplateConfirm: true,
    isInitialed: true,
    bookmarks: [{
      id: 1,
      name: 'SettingTest-1',
      title: 'SettingTest-1',
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
      name: 'SettingTest-2',
      title: 'SettingTest-2',
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
  });

  const props = {
    config,
    dispatch: jest.fn(),
  };

  it.only('click textinput should not trigger the reset', () => {
    const ref: { current: HTMLElement } = { current: null };
    const Setting = wrapWidget(BookmarkSetting, { theme : fixedMockTheme, ref } as any);
    const { getByTitle } = render(<Setting widgetId={'bookmarkSettingTest1'} {...props}/>);
    (ref.current as any).handleSelect = jest.fn();
    fireEvent.click(getByTitle('SettingTest-2'));
    expect((ref.current as any).handleSelect).not.toHaveBeenCalled();
  });
});