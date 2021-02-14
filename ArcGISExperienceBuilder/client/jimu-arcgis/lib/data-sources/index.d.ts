import { DataSource, DataSourceConstructorOptions, DataSourceFactory } from 'jimu-core';
import { MapDataSourceImpl } from './implementations/map-data-source-impl';
import { WebMapDataSourceImpl } from './implementations/webmap-data-source-impl';
import { WebSceneDataSourceImpl } from './implementations/webscene-data-source-impl';
export declare class ArcGISDataSourceFactory implements DataSourceFactory {
    createDataSource(options: DataSourceConstructorOptions): DataSource;
}
export { MapDataSourceImpl, WebMapDataSourceImpl, WebSceneDataSourceImpl };
export * from './arcgis-data-source-interface';
