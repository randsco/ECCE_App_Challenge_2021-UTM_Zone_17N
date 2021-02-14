import { AbstractMessageAction, MessageType, Message,
  DataRecordsSelectionChangeMessage,
  MutableStoreManager} from 'jimu-core';

export default class ZoomToFeatureAction extends AbstractMessageAction{
  filterMessageType(messageType: MessageType, messageWidgetId?: string): boolean{
    return messageType === MessageType.DataRecordsSelectionChange;
  }

  filterMessage(message: Message): boolean{
    return true;
  }

  //getSettingComponentUri(messageType: MessageType, messageWidgetId?: string): string {
  //}

  onExecute(message: Message): Promise<boolean> | boolean{
    switch(message.type){
      case MessageType.DataRecordsSelectionChange:
        const dataRecordsSelectionChangeMessage = message as DataRecordsSelectionChangeMessage;
        const record = dataRecordsSelectionChangeMessage.records && dataRecordsSelectionChangeMessage.records[0];
        MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'displayFeatureActionValue.record', record);
        break;
    }

    return Promise.resolve(true);
  }
}
