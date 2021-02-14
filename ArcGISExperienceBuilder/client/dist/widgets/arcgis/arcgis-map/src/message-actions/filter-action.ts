import { AbstractMessageAction, MessageType, Message, FieldSchema,
  DataRecordsSelectionChangeMessage, DataSourceManager, FeatureQueryDataSource, ImmutableObject, dataSourceUtils, MutableStoreManager } from 'jimu-core';
import { FeatureLayerDataSource } from 'jimu-arcgis';
import {IMConfig} from '../message-actions/filter-action-setting';

export default class FilterAction extends AbstractMessageAction{
  private lastMessage: Message;
  private lastFilterActionValue: {
    layerDataSourceId: string;
    querySQL: string;
  };

  filterMessageType(messageType: MessageType, messageWidgetId?: string): boolean{
    return messageType === MessageType.DataRecordsSelectionChange;
  }

  filterMessage(message: Message): boolean{
    return true;
  }

  getSettingComponentUri(messageType: MessageType, messageWidgetId?: string): string {
    return 'message-actions/filter-action-setting';
  }

  onRemoveListen(messageType: MessageType, messageWidgetId?: string){
    if(!this.lastMessage){
      return;
    }

    if(this.lastMessage.type === messageType && this.lastMessage.widgetId === messageWidgetId){
      if (this.lastFilterActionValue && this.lastFilterActionValue.querySQL) {
        this.lastFilterActionValue.querySQL = '';
      }

      MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'filterActionValue', this.lastFilterActionValue);
      this.lastMessage = null;
      this.lastFilterActionValue = null;
    }
  }

  onExecute(message: Message, actionConfig?: IMConfig): Promise<boolean> | boolean{
    this.lastMessage = message;

    switch(message.type) {
      case MessageType.DataRecordsSelectionChange:
        let filterActionValue: {layerDataSourceId: string, querySQL: string} = null;
        if (actionConfig) {
          if (actionConfig.messageUseDataSource && actionConfig.actionUseDataSource) {
            if ((message as DataRecordsSelectionChangeMessage).records.length > 0
              && (message as DataRecordsSelectionChangeMessage).records[0].dataSource.getMainDataSource().id !== actionConfig.messageUseDataSource.mainDataSourceId) {
              MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'filterActionValue', null);
              break;
            }

            const messageDataSource = DataSourceManager.getInstance().getDataSource(actionConfig.messageUseDataSource.mainDataSourceId);
            const actionDataSource = DataSourceManager.getInstance().getDataSource(actionConfig.actionUseDataSource.mainDataSourceId);

            if (messageDataSource && actionDataSource) {
              // when ds instances exit
              if (actionConfig.enabledDataRelationShip) {
                // use DataRelationShip
                let messageField: ImmutableObject<FieldSchema> = null;
                let actionField: ImmutableObject<FieldSchema> = null;

                if (actionConfig.messageUseDataSource.mainDataSourceId === actionConfig.actionUseDataSource.mainDataSourceId &&
                  actionConfig.messageUseDataSource.rootDataSourceId === actionConfig.actionUseDataSource.rootDataSourceId) {
                  // if trigger ds is same to action ds
                  const messageDsSchema = messageDataSource.getSchema();
                  const objectIdJimuFieldName = messageDsSchema && messageDsSchema.fields
                    && Object.keys(messageDsSchema.fields).find(jimuFieldName => messageDsSchema.fields[jimuFieldName].esriType === 'esriFieldTypeOID');
                  messageField = messageDsSchema && messageDsSchema.fields && messageDsSchema.fields[objectIdJimuFieldName];
                  actionField = messageField;
                } else {
                  // if trigger ds isn't same to action ds
                  const messageJimuFieldName = actionConfig.messageUseDataSource.fields[0];
                  const actionJimuFieldName = actionConfig.actionUseDataSource.fields[0];
                  messageField = messageDataSource.getSchema().fields[messageJimuFieldName];
                  actionField = actionDataSource.getSchema().fields[actionJimuFieldName];
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

                  if (messageFieldValues.length > 0) {
                    whereSql = whereSql + `(${messageFieldValues.join(', ')})`;
                  } else {
                    whereSql = '';
                  }
                }

                if ((message as DataRecordsSelectionChangeMessage).records.length > 0) {
                  const moreAditionSQL = actionConfig.sqlExprObj ? dataSourceUtils.getArcGISSQL(actionConfig.sqlExprObj, actionDataSource).sql : null;
                  if (moreAditionSQL) {
                    if (whereSql) {
                      whereSql = whereSql + ' AND ' + moreAditionSQL;
                    } else {
                      whereSql = moreAditionSQL;
                    }
                  }
                } else {
                  whereSql = '';
                }

                filterActionValue = {
                  layerDataSourceId: actionDataSource && actionDataSource.id,
                  querySQL: whereSql
                }
              } else {
                // not use DataRelationShip
                let whereSql = '';

                if ((message as DataRecordsSelectionChangeMessage).records.length > 0) {
                  const moreAditionSQL = actionConfig.sqlExprObj ? dataSourceUtils.getArcGISSQL(actionConfig.sqlExprObj, actionDataSource).sql : null;
                  if (moreAditionSQL) {
                    whereSql = moreAditionSQL;
                  }
                } else {
                  whereSql = '';
                }

                filterActionValue = {
                  layerDataSourceId: actionDataSource && actionDataSource.id,
                  querySQL: whereSql
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

        this.lastFilterActionValue = filterActionValue;
        MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'filterActionValue', filterActionValue);
        break;
    }

    return true;
  }

  getLayerIdFromLayerDs(ds: FeatureLayerDataSource | FeatureQueryDataSource) {
    if ((ds as any).layerId) {
      return (ds as FeatureQueryDataSource).layerId;
    } else if ((ds as any).layer) {
      return (ds as FeatureLayerDataSource).layer.id;
    } else {
      return null;
    }
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