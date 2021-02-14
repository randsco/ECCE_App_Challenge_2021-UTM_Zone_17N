// import { Immutable } from 'jimu-core';
import { configure } from 'enzyme';

// setup file
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('demo widget', function () {
  beforeAll(() => {
    // let initState = Immutable({
    //   widgetsRuntimeInfo: {},
    //   widgetsPreloadProps: {},

    //   dataSourcesPreloadData: {},
    //   dataSourcesInfo: {},

    //   widgetState: {}
    // });
  });
  /* it("with config", function () {
    const config = {
      surveyItemId: '129132bbedcb490488a162aa996bb693',
      defaultValue: {
        'field_1': 'testewrwerwe'
      },
      isEmbed: true,
      isFullScreen: true,
      isHideNavbar: true
    };
    let Widget = wrapWidget(_Widget, {
      config: config,
      manifest: { name: 'survey123' } as any,
      messages: {},
      queryObject: Immutable({} as UrlParameters)
    });
    let wrapper = shallow(<Widget />).shallow();
    expect(wrapper.find('.survey123').length).toEqual(1);
  }); */
});