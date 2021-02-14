import { BaseVersionManager, DataSourceManager, getAppStore } from 'jimu-core';
import { updateSQLExpressionByVersion } from 'jimu-ui/basic/sql-expression-runtime';


const getDs = function(filter, widgetId): Promise<any>{
  let ds;
  const dataSource = getAppStore().getState()?.appConfig?.widgets[widgetId]?.useDataSources[0];
  const dsManager = DataSourceManager.getInstance();
  if(filter && dataSource){
    ds = dsManager.createDataSourceByUseDataSource(Object.assign({}, dataSource, { mainDataSourceId: dataSource.mainDataSourceId }), 'localId')
  }
  return Promise.resolve(ds);
};

class VersionManager extends BaseVersionManager{
  versions = [{
    version: '1.1.0',
    description: '',
    upgrader: (oldConfig, id: string) => {
      const filter = oldConfig.filter;
      return getDs(filter, id).then((ds) => {
        let newConfig = oldConfig;
        const newFItems = filter ? updateSQLExpressionByVersion(filter, '1.1.0', ds) : null

        newConfig = newConfig.set('filter', newFItems);
        return newConfig;
      })
    }
  }]
}

export const versionManager = new VersionManager();