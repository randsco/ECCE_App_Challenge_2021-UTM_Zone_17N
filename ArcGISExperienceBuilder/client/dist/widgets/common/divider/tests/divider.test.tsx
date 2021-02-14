import {React, Immutable} from 'jimu-core';
import Divider from '../src/runtime/widget';
import {shallow, configure} from 'enzyme';
import {wrapWidget} from 'jimu-for-test';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('divider widget test', function() {

  describe('default config', function() {
    let config, Widget, wrapper;
    const manifest = { name: 'divider' } as any;
    beforeAll(function () {
      config = Immutable({
        direction: 'Horizontal',
        strokeStyle: {
          type: 'Style0',
          color: '#000',
          size: '2px'
        },
        pointStart: {
          pointStyle: 'Style0',
          pointSize: 2
        },
        pointEnd: {
          pointStyle: 'Style0',
          pointSize: 2
        },
        themeStyle: {
          quickStyleType: 'Default'
        }
      });
      Widget = wrapWidget(Divider, {
        config: config,
        manifest: manifest,
        dispatch: () => {}
      });
      wrapper = shallow(<Widget/>).shallow();
    });

    it('divider widget should be render', () => {
      expect(wrapper.find('.divider-con').length).toEqual(1);
    });

    it('divider point should be render', () => {
      expect(wrapper.find('.point-start').length).toEqual(1);
      expect(wrapper.find('.point-end').length).toEqual(1);
    });

    it('divider line should be render', () => {
      expect(wrapper.find('.divider-line').length).toEqual(1);
    });
  });

});
