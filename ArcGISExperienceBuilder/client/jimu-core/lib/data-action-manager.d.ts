import { DataAction, DummnyDataAction, RegisterDataActionOptions } from './base-data-action';
import { DataSource, DataRecord } from './data-sources/data-source-interface';
import { IMWidgetJson } from './types/app-config';
export default class DataActionManager {
    static instance: DataActionManager;
    static getInstance(): DataActionManager;
    private actions;
    private actionClassPromises;
    getActions(): DataAction[];
    getSupportedActions(dataSource: DataSource, records?: DataRecord[]): Promise<DataAction[]>;
    testActionSupportData(action: DataAction, dataSource: DataSource, records: DataRecord[]): Promise<boolean>;
    registerAction(options: RegisterDataActionOptions): Promise<DataAction>;
    registerWidgetActions(widgetJson: IMWidgetJson): Promise<DataAction[]>;
    destroyWidgetActions(widgetId: string): void;
    getActionsByWidgetId(widgetId: string): DataAction[];
    loadActionClass(uri: string): Promise<typeof DummnyDataAction>;
}
