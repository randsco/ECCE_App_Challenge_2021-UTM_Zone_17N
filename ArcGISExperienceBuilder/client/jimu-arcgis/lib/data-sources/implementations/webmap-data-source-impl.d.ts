import { DataSourceTypes, WebMapDataSource, MapChildDataSource } from '../arcgis-data-source-interface';
import { MapDataSourceConstructorOptions, MapDataSourceImpl } from './map-data-source-impl';
export interface WebMapDataSourceConstructorOptions extends MapDataSourceConstructorOptions {
    map?: __esri.WebMap;
}
export declare class WebMapDataSourceImpl extends MapDataSourceImpl implements WebMapDataSource {
    type: DataSourceTypes.WebMap;
    map: __esri.WebMap;
    PortalItem: typeof __esri.PortalItem;
    Portal: typeof __esri.Portal;
    WebMap: typeof __esri.WebMap;
    ready(): Promise<MapChildDataSource[]>;
    protected _createMap(): void;
    protected _createChildDataSources(): Promise<MapChildDataSource[]>;
}
