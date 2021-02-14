import { DataRecord, DataRecordSet } from '../data-sources/data-source-interface';
import { IntlShape } from 'react-intl';
import { BaseVersionManager } from '../version-manager';
import { AppConfig } from '../types/app-config';
/**
 * This enum defines all supported messages in the framework.
 */
export declare enum MessageType {
    /** @ignore */
    StringSelectionChange = "STRING_SELECTION_CHANGE",
    ExtentChange = "EXTENT_CHANGE",
    DataRecordsSelectionChange = "DATA_RECORDS_SELECTION_CHANGE",
    DataRecordSetCreate = "DATA_RECORD_SET_CREATE",
    DataRecordSetUpdate = "DATA_RECORD_SET_UPDATE",
    /** @ignore */
    SelectDataRecord = "SELECT_DATA_RECORD"
}
/** @ignore */
export declare function getMessageTypeLabel(messageType: MessageType, intl: IntlShape): string;
/**
 * The interface for all messages types.
 */
export interface Message {
    type: MessageType;
    /**
     * The widget id from which the message is from. No widget id means the message is from jimu.
     */
    widgetId?: string;
}
/** @ignore */
export declare class StringSelectionChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    str: string;
    constructor(widgetId: string, str: string);
}
export declare class DataRecordsSelectionChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    records: DataRecord[];
    constructor(widgetId: string, records: DataRecord[]);
}
export declare class ExtentChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    extent: __esri.Extent;
    private relatedWidgetIds?;
    constructor(widgetId: string, extent: __esri.Extent);
    setRelatedWidgetIds(widgetIds: string[]): void;
    getRelatedWidgetIds(): string[];
    addRelatedWidgetId(widgetId: string): void;
}
export declare class DataRecordSetCreateMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataRecordSetId: string;
    dataRecordSet: DataRecordSet;
    constructor(widgetId: string, featureSetId: string, featureSet: DataRecordSet);
}
export declare class DataRecordSetUpdateMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataRecordSetId: string;
    dataRecordSet: DataRecordSet;
    constructor(widgetId: string, dataRecordSetId: string, dataRecordSet: DataRecordSet);
}
/** @ignore */
export declare class SelectDataRecordMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataSourceId: string;
    recordId: string;
    constructor(widgetId: string, dataSourceId: string, recordId: string);
}
/**
 * The interface for all message actions. A message action is a piece of code that executes when a matched message is received.
 */
export interface MessageAction {
    /**
     * The unique id. For actions provided by a widget, the id is: widgetId + actionName.
     */
    id: string;
    name?: string;
    label: string;
    /**
     * The widget id that provides the action. No widget id means the actions is provided by jimu.
     */
    widgetId?: string;
    /**
     * Whether the type of message can trigger this action.
     * This method will be used in builder to filter the available actions.
     * @param messageType
     * @param messageWidgetId the widget id that will publish the message.
     */
    filterMessageType(messageType: MessageType, messageWidgetId?: string): boolean;
    /**
     * Whether a specific message will trigger this action.
     * This method will be used to filter messages in message manager.
     */
    filterMessage(message: Message): boolean;
    /**
     * This is what the action actually does when the message is matched.
     * @param message
     * @param actionConfig
     */
    onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
    /**
     * This component is used to configure the action according to the message.
     */
    getSettingComponentUri?(messageType: MessageType, messageWidgetId?: string): string;
    /**
     * When a widget is removed, actions provided by this widget will be destroyed.
     */
    destroy: () => void;
    /**
     * When an action is removed from a message's listener, this function will be invoked.
     */
    onRemoveListen: (messageType: MessageType, messageWidgetId?: string) => void;
}
/** @ignore */
export interface ActionSettingProps<T> {
    actionId: string;
    widgetId: string;
    messageWidgetId: string;
    config?: T;
    messageType: MessageType;
    intl?: IntlShape;
    onSettingChange: ActionSettingChangeFunction;
    onDisableDoneBtn?: (isDisable: boolean) => void;
}
/** @ignore */
export interface ActionSettingChangeFunction {
    (settingOptions: ActionSettingOptions): void;
}
/** @ignore */
export interface ActionSettingOptions {
    actionId: string;
    config: any;
}
/** @ignore */
export interface MessageActionConstructorOptions {
    id: string;
    name?: string;
    widgetId?: string;
    label: string;
}
/** @ignore */
export interface RegisterMessageActionOptions {
    id: string;
    name?: string;
    uri?: string;
    widgetId?: string;
    label: string;
    ActionClass?: typeof DummyMessageAction;
    appConfig?: AppConfig;
}
export declare abstract class AbstractMessageAction implements MessageAction {
    id: string;
    name?: string;
    widgetId?: string;
    label: string;
    static versionManager: BaseVersionManager;
    constructor(options: MessageActionConstructorOptions);
    destroy(): void;
    onRemoveListen(messageType: MessageType, messageWidgetId?: string): void;
    abstract filterMessageType(messageType: MessageType, messageWidgetId?: string): boolean;
    abstract filterMessage(message: Message): boolean;
    abstract onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
}
/**
 * This class is used for type check.
 */
/** @ignore */
export declare class DummyMessageAction extends AbstractMessageAction {
    filterMessageType(messageType: MessageType, messageWidgetId?: string): boolean;
    filterMessage(message: Message): boolean;
    onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
}
