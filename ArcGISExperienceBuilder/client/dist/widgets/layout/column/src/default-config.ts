import { Immutable } from 'jimu-core';
import { IMFlexboxConfig } from './config';

export const defaultConfig: IMFlexboxConfig = Immutable({
  space: 10,
  min: 16,
  style: {
    padding: {
      number: [0],
      unit: 'px',
    },
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});
