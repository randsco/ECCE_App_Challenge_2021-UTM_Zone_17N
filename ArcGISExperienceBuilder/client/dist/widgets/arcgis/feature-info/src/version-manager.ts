import { BaseVersionManager } from 'jimu-core';

class VersionManager extends BaseVersionManager{
  versions = [{
    version: '1.1.0',
    description: 'added [styleType] and [fontSizeType]',
    upgrader: (oldConfig) => {
      let newConfig = oldConfig;

      //// update maxGraphics
      //if(newConfig.getIn(['maxGraphics']) === 0) {
      //  newConfig = newConfig.setIn(['maxGraphics'], 1000);
      //}

      // update style
      //if(newConfig.getIn(['style', 'fontSize', 'distance']) || newConfig.getIn(['style', 'textColor'])){
      newConfig = newConfig.set('styleType', 'usePopupDefined');
      if(newConfig.getIn(['style', 'fontSize', 'distance']) || newConfig.getIn(['style', 'textColor'])) {
        newConfig = newConfig.setIn(['style', 'fontSizeType'], 'custom');
      } else {
        newConfig = newConfig.setIn(['style', 'fontSizeType'], 'auto');
        newConfig = newConfig.setIn(['style', 'fontSize', 'distance'], 14);
      }
      //} else {
      //  newConfig = newConfig.set('styleType', 'syncWithTheme');
      //  newConfig = newConfig.setIn(['style', 'fontSize', 'distance'], 14);
      //}

      return newConfig;
    }
  }]
}

export const versionManager = new VersionManager();
