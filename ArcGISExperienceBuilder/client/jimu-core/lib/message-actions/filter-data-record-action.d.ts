import { AbstractMessageAction, MessageType, Message } from '../message/message-base-types';
import { UseDataSource } from '../../lib/types/app-config';
import { ImmutableObject } from 'seamless-immutable';
interface Config {
    messageUseDataSource: UseDataSource;
    actionUseDataSource: UseDataSource;
    sqlExprObj?: any;
    enabledDataRelationShip?: boolean;
    enableQueryWithCurrentExtent?: boolean;
}
export declare type IMConfig = ImmutableObject<Config>;
export default class Action extends AbstractMessageAction {
    name: string;
    private lastMessage;
    private lastActionConfig;
    filterMessageType(messageType: MessageType, messageWidgetId?: string): boolean;
    filterMessage(message: Message): boolean;
    getSettingComponentUri(messageType: MessageType, messageWidgetId?: string): string;
    onRemoveListen(messageType: MessageType, messageWidgetId?: string): void;
    onExecute(message: Message, actionConfig?: IMConfig): Promise<boolean>;
    formatValue(value: any, type: string): string;
}
export {};
