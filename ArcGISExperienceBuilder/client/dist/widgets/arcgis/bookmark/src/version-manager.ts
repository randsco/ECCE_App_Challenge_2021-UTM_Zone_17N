import { BaseVersionManager } from 'jimu-core';

class VersionManager extends BaseVersionManager{
  versions = [{
    version: '1.2.0',
    description: '1.2.0',
    upgrader: (oldConfig) => {
      let newConfig = oldConfig;
      if(!newConfig.bookmarks){
        return newConfig;
      }

      newConfig.bookmarks.forEach((bookMark, i) => {
        const layerIds = Object.keys(bookMark.layersConfig || {});
        layerIds.forEach(layerId => {
          const visibility = bookMark.layersConfig[layerId];
          newConfig = newConfig.setIn(['bookmarks', i, 'layersConfig', layerId], {visibility})
        })
      })

      return newConfig;
    }
  }]
}

export const versionManager = new VersionManager();