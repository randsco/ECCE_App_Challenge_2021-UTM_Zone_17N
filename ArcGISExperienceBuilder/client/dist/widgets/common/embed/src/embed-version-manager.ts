import { BaseVersionManager } from 'jimu-core';
import { EmbedType } from './config';

class VersionManager extends BaseVersionManager{
  versions = [{
    version: '1.0.0',
    description: 'The first release.',
    upgrader: (oldConfig) => {
      const embedType = oldConfig?.functionConfig?.embedType;
      const content = oldConfig?.functionConfig?.content;
      if(embedType){
        oldConfig = oldConfig.set('embedType', embedType);
        if(embedType === EmbedType.Url){
          oldConfig = oldConfig.set('staticUrl', content);
        }else {
          oldConfig = oldConfig.set('embedCode', content);
        }
      }else {
        oldConfig = oldConfig.set('embedType', EmbedType.Url)
      }
      oldConfig = oldConfig.without('functionConfig')
      return oldConfig
    }
  }]
}

export const versionManager = new VersionManager();