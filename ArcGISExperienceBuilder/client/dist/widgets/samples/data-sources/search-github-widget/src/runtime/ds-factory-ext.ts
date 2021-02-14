import { extensionSpec } from 'jimu-core';

export default class Ext implements extensionSpec.DataSourceFactoryUri{
  id = 'github-ds-factory';

  getFactoryUri(type){
    if(type === 'GITHUB_REPOSITORY'){
      return 'widgets/samples/data-sources/search-github-widget/dist/runtime/github-data-source';
    }
  }
}