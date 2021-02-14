export interface Version {
    version: string;
    description: string;
    /**
     * @param id this can be a widgetId, an actionConfig Id, or "app"
     */
    upgrader: (oldConfig: any, id: string) => any | Promise<any>;
}
export declare class BaseVersionManager {
    /**
     * versions in the array should be in order, otherwise, error will be reported.
     *
     * If there is no config change, we do not need to put the version in this array
     */
    versions: Version[];
    /**
     * @param config the config is the old version
     * @param oldVersion
     * @param newVersion
     * @param id this can be a widgetId, an actionConfig Id, or "app"
     *
     * we need to run the upgrader function in (oldVersion, newVersion], which means does not run the upgrader of the oldVersion, but run the upgrader of the newVersion
     *
     * @returns return new upgraded config
     */
    upgrade(config: any, oldVersion: string, newVersion: string, id: string): Promise<any>;
    private getVersionIndex;
    private checkVersion;
}
export declare class AppVersionManager extends BaseVersionManager {
    versions: Version[];
}
