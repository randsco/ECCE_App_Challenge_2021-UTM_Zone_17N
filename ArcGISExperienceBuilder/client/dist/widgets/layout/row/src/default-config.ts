import { Immutable } from 'jimu-core';
import { IMRowConfig, RowLayoutItemSetting } from './config';
import { UnitTypes } from 'jimu-ui';

export const defaultConfig: IMRowConfig = Immutable({
  space: 20,
  style: {
    padding: {
      number: [10],
      unit: UnitTypes.PIXEL,
    },
  },
});

export const DEFAULT_ROW_ITEM_SETTING: RowLayoutItemSetting = {
  heightMode: 'fixed',
  aspectRatio: 1,
  offsetX: 0,
  offsetY: 0,
  style: {
    alignSelf: 'flex-start',
  },
};
