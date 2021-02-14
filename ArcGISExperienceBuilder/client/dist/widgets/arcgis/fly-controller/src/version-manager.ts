import { BaseVersionManager } from 'jimu-core';
import { IMConfig } from './config'

class VersionManager extends BaseVersionManager {
  versions = [{
    version: '1.2.0',
    description: 'rename RECORD.records to RECORD.routes',
    upgrader: (oldConfig: IMConfig) => {
      let newConfig: IMConfig = oldConfig;
      const $newItemsList = newConfig.getIn(['itemsList']);
      const newItemsList = $newItemsList.asMutable({ deep: true });

      newItemsList.map((flyModeConfig, index) => {
        if (flyModeConfig.name === 'RECORD') {
          if (flyModeConfig['records']) {
            delete (flyModeConfig['records']);
          }
          flyModeConfig.routes = [];//rename records to routes
        } else {
          //no need to update
        }

        return Object.assign({}, flyModeConfig);
      });
      newConfig = newConfig.set('itemsList', newItemsList);

      return newConfig;
    }
  }]
}

export const versionManager = new VersionManager();
