import { AbstractLayerFolderDataSource } from '../ds-base-types';
import { DataSourceTypes, MapServiceDataSource } from '../data-source-interface';
/**
 * Data source from a map service, which may contain multiple child data sources.
 */
export declare class MapServiceDataSourceImpl extends AbstractLayerFolderDataSource implements MapServiceDataSource {
    type: DataSourceTypes.MapService;
    layer?: __esri.MapImageLayer | __esri.TileLayer;
}
