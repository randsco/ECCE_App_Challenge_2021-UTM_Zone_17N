import {React, Immutable, UrlParameters} from 'jimu-core';
import ButtonWidget from '../src/runtime/widget';
import {shallow, configure} from 'enzyme';
import {wrapWidget} from 'jimu-for-test';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('button widget test', function() {

  describe('default config', function() {
    let config, Widget, wrapper;
    const manifest = { name: 'button' } as any;
    beforeAll(function () {
      config = Immutable({
        functionConfig: {
          text: 'Please configure link',
          toolTip: '',
          linkParam: {
          }
        },
        styleConfig: {
          themeStyle: {
            quickStyleType: 'default'
          }
        }
      });
      Widget = wrapWidget(ButtonWidget, {
        config: config,
        manifest: manifest,
        queryObject: Immutable({} as UrlParameters),
        dispatch: () => {}
      });
      wrapper = shallow(<Widget/>).shallow();
    });

    it('button widget should be render', () => {
      expect(wrapper.find('.widget-button-link').length).toEqual(1);
    });
  });

  describe('test value config', function() {
    let config, Widget, wrapper;
    const manifest = { name: 'button' } as any;
    beforeAll(function () {
      config = Immutable({
        functionConfig: {
          text: 'textTest',
          toolTip: 'testToolTip',
          linkParam: {
            value: 'detail-page',
            linkType: 'PAGE'
          }
        },
        styleConfig: {
          themeStyle: {
            quickStyleType: 'default'
          }
        }
      });
      Widget = wrapWidget(ButtonWidget, {
        config: config,
        manifest: manifest,
        queryObject: Immutable({} as UrlParameters),
        dispatch: () => {}
      });
      wrapper = shallow(<Widget/>).shallow();
    });

    it('button widget should be render', () => {
      expect(wrapper.find('.widget-button-link').length).toEqual(1);
    });

    it('text ok', () => {
      expect(wrapper.find('.widget-button-link .widget-button-text').prop('children').indexOf('textTest')).not.toEqual(-1);
    });

    it('toolTip ok', () => {
      expect(wrapper.find('.widget-button-link').prop('title')).toEqual('testToolTip');
    });

    it('link ok', () => {
      const linkComponent = wrapper.find('.widget-button-link');
      expect(linkComponent.prop('to')).toEqual({
        linkType: 'PAGE',
        value: 'detail-page'
      });
    });
  });
});
