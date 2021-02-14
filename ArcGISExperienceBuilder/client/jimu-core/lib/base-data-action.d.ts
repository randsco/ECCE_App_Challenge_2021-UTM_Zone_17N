import { DataRecord, DataSource } from './data-sources/data-source-interface';
export interface DataAction {
    /**
     * the unique id
     */
    id: string;
    index?: number;
    name?: string;
    /**
     * The widget id that provides the action.  No widget id means the actions is provide by jimu.
     */
    widgetId?: string;
    destroy: () => void;
    isSupported: (dataSource: DataSource, records: DataRecord[]) => boolean | Promise<boolean>;
    onExecute: (dataSource: DataSource, records: DataRecord[]) => Promise<boolean>;
}
export interface DataActionConstructorOptions {
    id: string;
    name?: string;
    index?: number;
    widgetId?: string;
}
export interface RegisterDataActionOptions {
    id: string;
    name?: string;
    uri?: string;
    widgetId?: string;
    label: string;
    ActionClass?: typeof DummnyDataAction;
}
export declare abstract class AbstractDataAction implements DataAction {
    /**
     * The unique id
     */
    id: string;
    name: string;
    index: number;
    /**
     * The widget id that provides the action
     */
    widgetId: string;
    constructor(options: DataActionConstructorOptions);
    destroy(): void;
    abstract isSupported(dataSource: DataSource, records: DataRecord[]): boolean;
    abstract onExecute(dataSource: DataSource, records: DataRecord[]): Promise<boolean>;
}
export declare class DummnyDataAction extends AbstractDataAction {
    isSupported(dataSource: DataSource, records: DataRecord[]): boolean;
    onExecute(dataSource: DataSource, records: DataRecord[]): Promise<boolean>;
}
