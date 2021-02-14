import {React, Immutable} from 'jimu-core';
import {_CardEditor as CardEditor} from '../src/runtime/components/card-editor';
import {shallow, configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('card widget test', function() {

  describe('default config', function() {
    let props, wrapper;
    beforeAll(function () {
      const config = {
        REGULAR: {
          enable: true,
          backgroundStyle: Immutable({
            background: {
              color: '#f30',
              fillType: null,
              image: null,
            },
            border: {
              type: 'solid',
              color: 'var(--dark)',
              width: '1px'
            }
          })
        },
        HOVER: {
          enable: true,
          backgroundStyle: Immutable({
            background: {
              color: '#000',
              fillType: null,
              image: null,
            },
            border: {
              type: 'solid',
              color: 'var(--dark)',
              width: '2px'
            }
          })
        },
        itemStyle: 'STYLE1',
        isItemStyleConfirm: false,
        isOpenAdvabceSetting: false,
        direction: 'Horizontal',
        transitionInfo: {
          transition: {
            type: 'BOX',
            direction: 'H'
          },
          oneByOneEffect: null
        },
        widgetHeight: 340,
        widgetWidth: 300
      };
      props = {
        appMode: 'RUN',
        browserSizeMode: 'LARGE',
        cardConfigs: config,
        isHeightAuto: false,
        isRTL: false,
        isWidthAuto: false,
        builderStatus: 'REGULAR',
        layouts: {
          HOVER: {LARGE: 'layout_5'},
          REGULAR: {LARGE: 'layout_4'}
        },
        widgetId: 'widget_1'
      };

      wrapper = shallow(<CardEditor {...props}/>);
    });

    it('card content widget should be render', () => {
      expect(wrapper.find('.card-widget_1').length).toEqual(1);
    });

    it('card animation content should be render', () => {
      expect(wrapper.find('.card-content').length).toEqual(2);
    });

    it('regular border style should be set', () => {
      expect(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).prop('style').border).toEqual('1px solid var(--dark)');
    });

    it('hover border style should be set', () => {
      expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(0).prop('style').border).toEqual('2px solid var(--dark)');
    });

    it('regular background color style should be set', () => {
      expect(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).prop('style').backgroundColor).toEqual('#f30');
      expect(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).prop('style').backgroundPosition).toEqual('center');
    });

    it('hover background color style should be set', () => {
      expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(0).prop('style').backgroundColor).toEqual('#000');
      expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(0).prop('style').backgroundPosition).toEqual('center');
    });

  });

});
