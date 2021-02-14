import {React, Immutable, UrlParameters, getAppStore, appActions, lodash} from 'jimu-core';
import ImageWidget from '../src/runtime/widget';
import {shallow, configure} from 'enzyme';
import {mockTheme, wrapWidget, widgetRender, getInitState} from 'jimu-for-test';
import * as Adapter from 'enzyme-adapter-react-16';
import { DynamicUrlType } from '../src/config';
configure({ adapter: new Adapter() });

jest.mock('jimu-ui', () => {
  return {
    ...jest.requireActual('jimu-ui'),
    ImageWithParam: jest.fn(() => <div data-testid="imageWithParamTest"></div>)
  };
});

jest.mock('../src/runtime/components/image-gallery', () => {
  return {
    ...jest.requireActual('../src/runtime/components/image-gallery'),
    ImageGallery: jest.fn(() => <div data-testid="imageGalleryTest"></div>)
  };
});

jest.mock('../src/runtime/components/attachment-component', () => {
  return {
    ...jest.requireActual('../src/runtime/components/attachment-component'),
    AttachmentComponent: jest.fn(() => <div data-testid="attachmentTest"></div>)
  };
});

jest.mock('../src/runtime/components/symbol-component', () => {
  return {
    ...jest.requireActual('../src/runtime/components/symbol-component'),
    SymbolComponent: jest.fn(() => <div data-testid="symbolTest"></div>)
  };
});

const initState = getInitState().merge({ appConfig: {
  widgets: [] as any,
  dataSources: {
    dataSourceId: 'dataSource_2-SampleWorldCities_9384-Cities',
    mainDataSourceId: 'dataSource_2-SampleWorldCities_9384-Cities',
    rootDataSourceId: 'dataSource_2'
  }
}});

getAppStore().dispatch(appActions.updateStoreState(initState));

describe('image widget test', function() {
  let render = null;
  beforeAll(() => {
    render = widgetRender(getAppStore(), mockTheme as any)
  });

  afterAll(() => {
    render = null;
  })

  const useDataSource = {
    dataSourceId: 'dataSource_2-SampleWorldCities_9384-Cities',
    mainDataSourceId: 'dataSource_2-SampleWorldCities_9384-Cities',
    rootDataSourceId: 'dataSource_2'
  };

  const functionConfig = {
    altText: '',
    toolTip: '',
    altTextWithAttachmentName: false,
    toolTipWithAttachmentName: false,
    altTextExpression: undefined,
    toolTipExpression: undefined,
    linkParam: {},
    dynamicUrlType: DynamicUrlType.Attachment,
    isSelectedFromRepeatedDataSourceContext: false,
    useDataSourceForMainDataAndViewSelector: useDataSource,
  }

  const props = {
    config: {
      functionConfig,
      styleConfig: {}
    },
    useDataSources: Immutable([useDataSource]),
    useDataSourcesEnabled: true,
    queryObject: undefined,
  };

  it('should render different component', () => {
    const ref: { current: HTMLElement } = { current: null };
    const Widget = wrapWidget(ImageWidget, { theme : mockTheme, ref } as any);
    const { getByTestId, rerender } = render(<Widget widgetId={'imageTest1'} {...props}/>);
    expect(getByTestId('imageGalleryTest')).toBeInTheDOM();
    expect(getByTestId('attachmentTest')).toBeInTheDOM();

    const newFunctionConfig = lodash.assign({}, functionConfig, { dynamicUrlType:  DynamicUrlType.Symbol });
    const newProps = lodash.assign({}, props, { config: { functionConfig: newFunctionConfig, styleConfig: {} } });
    rerender(<Widget widgetId={'imageTest1'} {...newProps}/>)
    expect(getByTestId('imageWithParamTest')).toBeInTheDOM();
    expect(getByTestId('symbolTest')).toBeInTheDOM();
  });

});

describe('image widget test', function() {

  describe('default config', function() {
    let config, Widget, wrapper;
    const manifest = { name: 'image' } as any;
    beforeAll(function () {
      config = {
        functionConfig: {
          altText: '',
          toolTip: '',
          linkParam: {},
          scale: 'Fit'
        },
        styleConfig: {
        }
      };
      Widget = wrapWidget(ImageWidget, {
        config: config,
        manifest: manifest,
        queryObject: Immutable({} as UrlParameters)
      });
      wrapper = shallow(<Widget/>).shallow();
    });

    it('image widget should be render', () => {
      expect(wrapper.find('.widget-image').length).toEqual(1);
    });

    // it('image widget should be render with WidgetPlaceholder', () => {
    //   expect(wrapper.find('Connect(WithTheme(_WidgetPlaceholder))').length).toEqual(1);
    // });
  });

  describe('test value config', function() {
    let config, Widget, wrapper;
    const manifest = { name: 'image' } as any;
    beforeAll(function () {
      config = {
        functionConfig: {
          altText: 'testAltText',
          toolTip: 'testToolTip',
          linkParam: {
            value: 'detail-page',
            linkType: 'PAGE'
          },
          imageParam: {
            url: 'http://www.rowanpalmsprings.com/images/1700-960/palm-springs-sign-ddc63cf9.jpg'
          },
          scale: 'Fit'
        },
        styleConfig: {
        }
      };
      Widget = wrapWidget(ImageWidget, {
        config: config,
        manifest: manifest,
        queryObject: Immutable({} as UrlParameters)
      });
      wrapper = shallow(<Widget/>).shallow();
    });

    it('image widget should be render', () => {
      expect(wrapper.find('.widget-image').length).toEqual(1);
    });

    it('switch placeHolder', () => {
      expect(wrapper.find('Connect(WithTheme(_WidgetPlaceholder))').length).toEqual(0);
    });

    it('link ok', () => {
      expect(wrapper.find('Styled(WithTheme(_Link))').length).toEqual(1);
    });

    it('use ImageWithParam component', () => {
      expect(wrapper.find('.image-param').length).toEqual(1);
    });
  });
});