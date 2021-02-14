import {React, Immutable} from 'jimu-core';
import Card from '../src/runtime/widget';
import {shallow, configure} from 'enzyme';
import {wrapWidget} from 'jimu-for-test';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('card widget test', function() {

  describe('default config', function() {
    let config, Widget, wrapper;
    const manifest = { name: 'card' } as any;
    beforeAll(function () {
      config = Immutable({
        REGULAR: {
          enable: true,
          backgroundStyle: {
            border: {
              type: 'solid',
              color: 'var(--dark)',
              width: '0px'
            }
          }
        },
        HOVER: {
          enable: false,
          backgroundStyle: {
            border: {
              type: 'solid',
              color: 'var(--dark)',
              width: '0px'
            }
          }
        },
        itemStyle: 'STYLE1',
        isItemStyleConfirm: false,
        isOpenAdvabceSetting: false,
        direction: 'Horizontal',
        transitionInfo: {
          transition: {
            type: 'None',
            direction: 'H'
          },
          oneByOneEffect: null
        },
        linkParam: {
          expression: null,
          linkType: 'WEB_ADDRESS',
          openType: '_blank',
          value: 'test'
        }
      });
      Widget = wrapWidget(Card, {
        config: config,
        manifest: manifest,
        dispatch: () => {}
      });
      wrapper = shallow(<Widget/>).shallow();
    });

    it('card content widget should be render', () => {
      expect(wrapper.find('.widget-card').length).toEqual(1);
    });

  });

});
