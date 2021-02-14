import { AbstractMessageAction, MessageType, Message, getAppStore, appActions, FieldSchema,
  DataRecordsSelectionChangeMessage, DataSourceManager, FeatureQueryDataSource, ImmutableObject, dataSourceUtils, ExtentChangeMessage } from 'jimu-core';
import { FeatureLayerDataSource } from 'jimu-arcgis';
import {IMConfig} from './filter-action-setting';

export default class FilterAction extends AbstractMessageAction{
  // Only the last message will have effect
  private lastMessage: Message;

  filterMessageType(messageType: MessageType, messageWidgetId?: string): boolean{
    return messageType === MessageType.DataRecordsSelectionChange ||
      messageType === MessageType.ExtentChange;
  }

  filterMessage(message: Message): boolean{
    return true;
  }

  getSettingComponentUri(messageType: MessageType, messageWidgetId?: string): string {
    return 'message-actions/filter-action-setting';
  }

  onExecute(message: Message, actionConfig?: IMConfig): Promise<boolean> | boolean{
    this.lastMessage = message;
    // let usedFileds = [];
    switch(message.type) {
      case MessageType.DataRecordsSelectionChange:
      {
        let filterActionValue: {querySQL: string} = null;
        if (actionConfig) {
          if (actionConfig.messageUseDataSource && actionConfig.actionUseDataSource) {
            const records = (message as DataRecordsSelectionChangeMessage).records;
            if (!records || records.length < 1 || (records.length > 0
                && records[0].dataSource.id !== actionConfig.messageUseDataSource.dataSourceId)) {
              getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, MessageType.DataRecordsSelectionChange, null));
              break;
            }

            const messageDataSource = DataSourceManager.getInstance().getDataSource(actionConfig.messageUseDataSource.dataSourceId);
            const actionDataSource = DataSourceManager.getInstance().getDataSource(actionConfig.actionUseDataSource.dataSourceId);

            if (messageDataSource && actionDataSource) {
              // when ds instances exit
              if (actionConfig.enabledDataRelationShip) {
                // use DataRelationShip
                let messageField: ImmutableObject<FieldSchema> = null;
                let actionField: ImmutableObject<FieldSchema> = null;

                if (actionConfig.messageUseDataSource.dataSourceId === actionConfig.actionUseDataSource.dataSourceId &&
                    actionConfig.messageUseDataSource.rootDataSourceId === actionConfig.actionUseDataSource.rootDataSourceId) {
                  // if trigger ds is same to action ds
                  const messageDsSchema = messageDataSource.getSchema();
                  const objectIdJimuFieldName = messageDsSchema && messageDsSchema.fields
                      && Object.keys(messageDsSchema.fields).find(jimuFieldName => messageDsSchema.fields[jimuFieldName].esriType === 'esriFieldTypeOID');
                  messageField = messageDsSchema && messageDsSchema.fields && messageDsSchema.fields[objectIdJimuFieldName];
                  actionField = messageField;
                } else {
                  // if trigger ds isn't same to action ds
                  const messageJimuFieldName = actionConfig.messageUseDataSource?.fields?.[0];
                  const actionJimuFieldName = actionConfig.actionUseDataSource?.fields?.[0];
                  messageField = messageDataSource.getSchema()?.fields?.[messageJimuFieldName];
                  actionField = actionDataSource.getSchema()?.fields?.[actionJimuFieldName];
                }

                let whereSql = '';
                if (messageField && actionField) {
                  const messageFieldName = messageField.name;
                  const messageFieldType = messageField.type;

                  const tempMessage: DataRecordsSelectionChangeMessage = message as DataRecordsSelectionChangeMessage;
                  const messageFieldValues = [];

                  for (let i = 0; i < tempMessage.records.length; i++) {
                    const tempFieldValue = tempMessage.records[i].getData()[messageFieldName];
                    if (messageFieldValues.indexOf(`${this.formatValue(tempFieldValue, messageFieldType)}`) > -1) {
                      continue;
                    } else {
                      messageFieldValues.push(`${this.formatValue(tempMessage.records[i].getData()[messageFieldName], messageFieldType)}`);
                    }
                  }

                  whereSql = `${actionField.name} IN `;
                  // usedFileds.push(actionField.name);
                  if (messageFieldValues.length > 0) {
                    whereSql = whereSql + `(${messageFieldValues.join(', ')})`;
                  } else {
                    whereSql = '';
                  }
                }

                //more conditions
                // usedFileds.push(...(actionConfig.sqlExprObj && getJimuFieldNamesBySqlExpression(actionConfig.sqlExprObj) || []));
                whereSql = this.getMoreConditionSql(actionConfig, actionDataSource, whereSql);
                filterActionValue = {
                  querySQL: this.getRealQuerySql(whereSql, actionDataSource),
                  // usedFileds
                }
              } else {
                // not use DataRelationShip
                // usedFileds = actionConfig.sqlExprObj && getJimuFieldNamesBySqlExpression(actionConfig.sqlExprObj) || [];
                const whereSql = this.getMoreConditionSql(actionConfig, actionDataSource, '');
                filterActionValue = {
                  querySQL: whereSql,
                  // usedFileds
                }
                if(actionDataSource.getSelectedRecords().length < 1){
                  filterActionValue = null;
                }
              }
            } else {
              // when ds instances don't exist
              filterActionValue = null;
            }
          } else {
            filterActionValue = null;
          }
        }
        getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, MessageType.DataRecordsSelectionChange, filterActionValue));
        break;
      }
      case MessageType.ExtentChange:
      {
        if(!actionConfig?.actionUseDataSource){
          getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, MessageType.ExtentChange, null));
          return;
        }
        const extent = (message as ExtentChangeMessage)?.extent;
        const extActionDataSource = DataSourceManager.getInstance().getDataSource(actionConfig?.actionUseDataSource?.dataSourceId);
        const extWhereSql = this.getMoreConditionSql(actionConfig, extActionDataSource, undefined);
        // extWhereSql = this.getRealQuerySql(extWhereSql, extActionDataSource);
        getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, MessageType.ExtentChange, {
          querySQL: extWhereSql,
          queryExtent: actionConfig.enableQueryWithCurrentExtent && {
            type: extent?.type,
            ...extent?.toJSON()
          }

        }));
        break;
      }
    }

    return true;
  }

  onRemoveListen(messageType: MessageType, messageWidgetId?: string){
    if(!this.lastMessage){
      return;
    }

    if(this.lastMessage.type === messageType && this.lastMessage.widgetId === messageWidgetId){
      getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, MessageType.DataRecordsSelectionChange, null));
      getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, MessageType.ExtentChange, null));
    }
  }

  getRealQuerySql (whereSql: string, actionDataSource){
    const query = {
      outFields: ['*'],
      where: whereSql,
      returnGeometry: true
    };

    const realQuery = (actionDataSource as FeatureLayerDataSource | FeatureQueryDataSource).getRealQueryParams(query, 'query');

    return realQuery && realQuery.where
  }

  getMoreConditionSql (actionConfig: IMConfig, actionDataSource, whereSql: string): string{
    const moreAditionSQL = actionConfig.sqlExprObj ? dataSourceUtils.getArcGISSQL(actionConfig.sqlExprObj, actionDataSource).sql : null;
    if (moreAditionSQL) {
      if (whereSql && whereSql.trim() !== '') {
        whereSql = whereSql + ' AND ' + moreAditionSQL;
      } else {
        whereSql = moreAditionSQL;
      }
    }
    return whereSql;

  }

  formatValue (value, type: string) {
    if (type === 'STRING') {
      return `'${value}'`;
    } else if (type === 'NUMBER') {
      return `${value}`;
    } else if (type === 'DATE') {
      return `'${value}'`;
    }
  }
}