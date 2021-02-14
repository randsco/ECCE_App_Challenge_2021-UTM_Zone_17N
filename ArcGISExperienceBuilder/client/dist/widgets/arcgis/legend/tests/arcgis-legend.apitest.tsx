//import {React, Immutable, createAppStore, UrlParameters, DataSourceManager} from 'jimu-core';
import {configure} from 'enzyme';
//import MapWidget from '../src/runtime/widget';
import * as Adapter from 'enzyme-adapter-react-16';
//import {wrapWidget, getInitState, initExtensions} from 'jimu-for-test';
//import {Provider} from 'react-redux';

configure({ adapter: new Adapter() });

describe('Layer List', () => {
  it('without config', () => {
    expect(true).toBeTruthy();
  });
});
